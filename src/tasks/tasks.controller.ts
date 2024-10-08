import { Controller, Get, Post, Param, Body, UseInterceptors, UploadedFiles, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { TaskResponse } from './schemas/taskResponse.schema';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
    destination: './uploads', // Папка, в которую будут сохраняться файлы
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + extname(file.originalname)); // Уникальное имя файла
    },
  });
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photos', maxCount: 5 },
      { name: 'videos', maxCount: 3 },
    ],{storage}),
)
  async createTask(
    @UploadedFiles() files: { photos?: Express.Multer.File[]; videos?: Express.Multer.File[] }, 
    @Body() createTaskDto: CreateTaskDto): Promise<Task> {
        console.log('Uploaded Files:', files);
        const photoPaths = files.photos ? files.photos.map(file => file.path) : [];
        const videoPaths = files.videos ? files.videos.map(file => file.path) : [];
        if (files.photos) {
            for (const file of files.photos) {
              console.log(`Uploaded Photo: ${file.originalname}, Path: ${file.path}`);
            }
          } else {
            console.log('No photos uploaded.');
          }
          
          if (files.videos) {
            for (const file of files.videos) {
              console.log(`Uploaded Video: ${file.originalname}, Path: ${file.path}`);
            }
          } else {
            console.log('No videos uploaded.');
          }
    console.log(photoPaths); 
    console.log(videoPaths);

    const createTaskWithFilesDto: CreateTaskDto = {
        ...createTaskDto,
        photos: photoPaths,
        videos: videoPaths,
      };

    return await this.tasksService.createTask(createTaskWithFilesDto);
  }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') taskId: string): Promise<Task> {
    return await this.tasksService.getTaskById(taskId);
  }

  @Get(':id/results')
  async getTaskResultsById(@Param('id') taskId: string): Promise<TaskResponse[]> {
    return await this.tasksService.getTaskResultsById(taskId);
  }
  
  @Delete(':id')
  async deleteTask(@Param('id') taskId: string): Promise<void> {
    return await this.tasksService.deleteTaskById(taskId);
  }
}