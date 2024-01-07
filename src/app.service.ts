import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log('🚀 ~ AppService initialized ~ a:');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
