import { Injectable, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import {  MulterModule, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterOptions {
    return {
      storage: diskStorage({
        destination: './uploads', // Папка для сохранения загружаемых файлов
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, uniqueSuffix + extname(file.originalname)); // Создание уникального имени файла
        },
      }),
    };
  }
}
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nauryzbekdias2:Barcelona2603@disa.giygccp.mongodb.net/'),
    TasksModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
})
export class AppModule {}
