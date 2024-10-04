import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { TaskResponse } from './schemas/taskResponse.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
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
}