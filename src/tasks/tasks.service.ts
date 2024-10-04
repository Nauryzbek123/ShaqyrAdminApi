import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/CreateTask.dto';
import * as moment from 'moment-timezone';
import { TaskResponse } from './schemas/taskResponse.schema';

@Injectable()
export class TasksService {
  constructor(
  @InjectModel(Task.name) private taskModel: Model<Task>,
  @InjectModel(TaskResponse.name) private taskResponseModel: Model<TaskResponse> 
) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const startTime = new Date();
    const startTimeAlmaty = moment().tz("Asia/Almaty").toDate();  // Время с учетом Алматы
    const formattedAlmatyTime = moment(startTimeAlmaty).format("YYYY-MM-DD HH:mm:ss"); // Локальное время Алматы в читаемом виде
    const formattedUTCTime = moment(startTime).format("YYYY-MM-DD HH:mm:ss"); // UTC время в читаемом виде
  
    console.log("startTimeAlmaty (Алматы): ", formattedAlmatyTime);
    console.log('start (UTC):', formattedUTCTime);
    const slots = this.generateTimeSlots(startTimeAlmaty, 24 * 60, 30);

    const newTask = new this.taskModel({
      ...createTaskDto,
      slots,
      expirationDate: moment(startTimeAlmaty).add(24, 'hours').toDate(), 
    //   expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000), 
    });
    return await newTask.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async getTaskById(taskId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }
    return task;
  }

  async getTaskResultsById(taskId: string): Promise<TaskResponse[]> {
    const tasks = await this.taskModel.find().exec();
    const taskResult = await this.taskResponseModel.find().exec();
    console.log(tasks);
    console.log(taskResult);
    const taskResults = await this.taskResponseModel.find({ taskId: taskId }).exec();
    console.log("Matching Task Responses:", taskResults);
    if (!taskResults || taskResults.length === 0) {
      throw new NotFoundException(`No responses found for task with ID ${taskId}`);
    }
    return taskResults;
  }

  private generateTimeSlots(startTime: Date, durationMinutes: number, intervalMinutes: number) {
    const slots = [];
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

    for (let time = startTime; time < endTime; time = new Date(time.getTime() + intervalMinutes * 60000)) {
      slots.push({
        time: new Date(time),
        isBooked: false,
        bookedBy: null,
        status: '',
      });
    }
    return slots;
  }
}

