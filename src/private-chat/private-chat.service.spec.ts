import { PrivateChatService } from './private-chat.service';
import { createMyRealDBTestNestApp } from '../../test/helpers';
import { PrivateChat } from './entities/private-chat.entity';

describe('PrivateChatService', () => {
  let service: PrivateChatService;

  beforeEach(async () => {
    const { module } = await createMyRealDBTestNestApp();

    service = module.get<PrivateChatService>(PrivateChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.find_one).toBeDefined();
  });

  it('should find all chats from one user that has chats', async () => {
    const USER_ID_THAT_HAS_CHATS: string = '6609e7cef6ba6b0fe97d7a1a';
    expect(service.find_all_chats_from_user).toBeDefined();

    const all_chats = await service.find_all_chats_from_user(
      USER_ID_THAT_HAS_CHATS,
    );
    // console.log(all_chats);
    expect(all_chats).toBeTruthy();
  });

  it('should add message to private room', async () => {
    const MOCK_ROOM = '6611fb2bd8f8391dbd01ec7a';
    const MOCK_USER = '6611fb16d8f8391dbd01ec76';
    const updated = await service.add_message(MOCK_ROOM, {
      content: 'ola mundo?2',
      sender_user_id: MOCK_USER,
    });

    console.log(updated);

    expect(updated).toBeTruthy();
    expect(updated.messages?.length > 0).toBeTruthy();
  });

  it('should append user names to private room', async () => {
    const MOCK_ROOM: PrivateChat & { _id: any } = {
      _id: '6611fb2bd8f8391dbd01ec7a',
      users: ['6611fb09d8f8391dbd01ec73', '6611fb16d8f8391dbd01ec76'],
      messages: [
        {
          content: 'ola',
          sender_user_id: '6611fb09d8f8391dbd01ec73',
        },
        {
          content: 'como vai',
          sender_user_id: '6611fb16d8f8391dbd01ec76',
        },
      ],
    };

    const room = await service.get_room_with_user_names(MOCK_ROOM);

    console.log(room);
    if (room?.messages?.length > 0) {
      expect(room?.messages[0]?.sender_user_id).toBeTruthy();
      expect(room?.messages[0]?.sender_user_name).toBeTruthy();
    }
  });
});
