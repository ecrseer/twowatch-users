import { Test } from '@nestjs/testing';
import { AppModule } from "../src/app.module";



export async function createTestNestApp() {
  const testingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  return {
    nestApp: testingModule.createNestApplication(),
    module: testingModule,
  };
}
