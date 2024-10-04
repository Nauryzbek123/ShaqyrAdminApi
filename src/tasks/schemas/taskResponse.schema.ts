// src/schemas/taskResponse.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TaskResponse extends Document {
  @Prop()
  taskId: string;

  @Prop()
  userId: string;

  @Prop()
  responseText: string;

  @Prop()
  photo: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TaskResponseSchema = SchemaFactory.createForClass(TaskResponse);
