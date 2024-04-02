import { PartialType } from '@nestjs/mapped-types';
import { PrivateChat } from '../entities/private-chat.entity';

export class CreatePrivateChatDto extends PartialType(PrivateChat) {}
