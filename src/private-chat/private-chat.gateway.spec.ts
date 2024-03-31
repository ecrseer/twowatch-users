import { Test, TestingModule } from '@nestjs/testing';
import { PrivateChatGateway } from './private-chat.gateway';
import { PrivateChatService } from './private-chat.service';

describe('PrivateChatGateway', () => {
  let gateway: PrivateChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateChatGateway, PrivateChatService],
    }).compile();

    gateway = module.get<PrivateChatGateway>(PrivateChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
