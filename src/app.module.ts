import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PupController } from './pup/pup.controller';
import { PupService } from './pup/pup.service';

@Module({
  imports: [],
  controllers: [AppController, PupController],
  providers: [AppService, PupService],
})
export class AppModule {}
