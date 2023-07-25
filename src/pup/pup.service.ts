import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

const prefix = `data:image/png;base64,`;

@Injectable()
export class PupService {
  async extractContent(contentHTML: string) {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.setContent(contentHTML);
    const element = await page.waitForSelector('div.teste');
    return await element
      .screenshot({
        optimizeForSpeed: true,
        type: 'png',
        path: './teste.png',
      })
      .then((resp) => {
        if (typeof resp === 'string') {
          return null;
        }
        return `${prefix}${resp.toString('base64')}`;
      });
  }
}
