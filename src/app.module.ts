import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from 'report/report.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://suppawich:moszaa55@demo.hqefncd.mongodb.net/report',
    ),
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
