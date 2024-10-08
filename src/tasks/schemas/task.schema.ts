import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({default: false}) 
  sendedToUser: boolean;

  @Prop()
  expirationDate: Date;

  @Prop([
    {
      time: { type: Date, required: true },
      isBooked: { type: Boolean, default: false },
      bookedBy: { type: String, default: null },
      status: { type: String, default: '' },
    },
  ])
  slots: Record<string, any>[];

  @Prop([String]) 
  photos: string[];

  @Prop([String]) 
  videos: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
