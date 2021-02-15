import { InternalMessage, Message } from './types';

export function isInternalMessage(
  message: Message
): message is InternalMessage {
  return message.hasOwnProperty('internalType');
}
