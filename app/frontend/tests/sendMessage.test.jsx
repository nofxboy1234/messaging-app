import { vi, describe, it, expect } from 'vitest';
import sendMessage from '../pages/Chat/Buttons/sendMessage';
import api from '../pathHelpers';

vi.mock('../pathHelpers', () => ({
  default: { messages: { create: vi.fn() } },
}));

describe('sendMessage', () => {
  describe('when the message is not blank', () => {
    it('should send a message to a chat', () => {
      const chat = { id: 19 };
      sendMessage('hello', chat);
      expect(api.messages.create).toHaveBeenCalled();
    });
  });
});
