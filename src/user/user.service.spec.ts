import { UserService } from './user.service';
import { createTestNestApp } from '../../test/helpers';

import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const { module } = await createTestNestApp();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find one user', async () => {
    const MOCK_CREATED_USER = '6611fb16d8f8391dbd01ec76';
    const user: User = await service.find_one_user(MOCK_CREATED_USER);
    expect(user).toBeDefined();
    expect(user.name?.length > 2).toBe(true);
  });
  it('should edit a user', async () => {
    const MOCK_USER: Partial<User & { _id: string }> = {
      _id: '6611fb16d8f8391dbd01ec76',
      name: 'test',
      email: 'gab@el.com',
    };
    const updated = await service.update_user(MOCK_USER);
    console.log(updated);
    expect(updated).toBeTruthy();
  });
});
