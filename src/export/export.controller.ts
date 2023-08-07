import { Body, Controller, Post } from '@nestjs/common';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private exportService: ExportService) {}

  @Post()
  async getData(@Body() body: { contentHTML: string }) {
    return this.exportService.generatePDF();
  }
}
