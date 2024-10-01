import { Body, Controller, Get, Post, Param, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  minifyUrl(@Body() body: { url: string }): {
    url: string;
  } {
    return this.appService.minifyUrl(body.url);
  }

  @Get(':url')
  @Redirect()
  deminifyUrl(@Param() params: { url: string }) {
    return {
      url: this.appService.deminifyUrl(params.url).url,
    };
  }
}
