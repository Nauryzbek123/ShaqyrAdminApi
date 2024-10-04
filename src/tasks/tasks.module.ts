import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskResponse, TaskResponseSchema } from './schemas/taskResponse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: TaskResponse.name, schema: TaskResponseSchema }]), // Подключение схемы TaskResponse

  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
