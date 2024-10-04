import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nauryzbekdias2:Barcelona2603@disa.giygccp.mongodb.net/'),
    TasksModule,
  ],
})
export class AppModule {}
