import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExportController } from './export/export.controller';
import { ExportService } from './export/export.service';

@Module({
  imports: [],
  controllers: [AppController, ExportController],
  providers: [AppService, ExportService],
})
export class AppModule {}
