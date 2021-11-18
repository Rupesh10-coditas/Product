import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';

@Module({
  imports: [ProductsModule,
  MongooseModule.forRoot(
    'mongodb+srv://Coditas:coditas123@cluster0.t3usa.mongodb.net/nestjs-intro?retryWrites=true&w=majority'
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
