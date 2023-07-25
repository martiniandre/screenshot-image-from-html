import { Body, Controller, Post, Res } from '@nestjs/common';
import { PupService } from './pup.service';
import { Response } from 'express';

@Controller('pup')
export class PupController {
  constructor(private pupService: PupService) {}

  @Post()
  async getData(
    @Body() body: { contentHTML: string },
    @Res() response: Response,
  ) {
    const data = await this.pupService.extractContent(body.contentHTML);
    return response.send(data).status(200);
  }
}
