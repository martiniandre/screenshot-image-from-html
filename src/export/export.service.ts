import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as PDF from 'pdf-creator-node';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFImageConverter from 'pdf-img-convert';

const prefix = `data:image/png;base64,`;
const pdfName = 'output.pdf';

@Injectable()
export class ExportService {
  private async readFile() {
    try {
      const fileName = path.resolve('src', 'templates', 'export.html');
      console.log(fileName);
      return fs.readFileSync(fileName);
    } catch (error) {
      console.log('erro ao ler arquivo', error);
    }
  }

  async generatePDF() {
    try {
      const html = await this.readFile();
      const document = {
        html: html.toString(),
        data: {},
        path: `./${pdfName}`,
      };

      const options = {
        format: 'A4',
        orientation: 'landscape',
        border: '10mm',
        header: {
          height: '45mm',
          contents:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
        },
        footer: {
          height: '28mm',
          contents:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
        },
      };

      await PDF.create(document, options)
        .then((res) => {
          console.log(res);
          return this.createImages(res.filename);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log('erro ao ler arquivo', error);
    }
  }

  private createImages(path: string) {
    const outputImages = PDFImageConverter.convert(path);
    outputImages.then(function (outputImage) {
      for (let i = 0; i < outputImage.length; i++)
        fs.writeFile('page' + i + '.png', outputImage[i], function (error) {
          if (error) {
            console.error('failed to save image: ' + error.message);
          }
        });
    });
  }

  /* private async extractContent(contentHTML: string) {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.setContent(contentHTML);
    const element = await page.waitForSelector('div.teste');
    return await element
      .screenshot({
        optimizeForSpeed: true,
        type: 'png',
      })
      .then((resp) => {
        if (typeof resp === 'string') {
          return null;
        }
        return `${prefix}${resp.toString('base64')}`;
      });
  } */
}
