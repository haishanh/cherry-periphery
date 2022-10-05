/**
 * background(or service worker) script is not used anymore in this ext
 * this file is for reference only
 */
import { ext } from '$lib/shared/browser';
import { createLogger } from '$lib/shared/common.util';

const logger = createLogger('background');

function reply(message: { type: string }, payload: any) {
  const type = message.type + ':reply';
  ext.runtime.sendMessage({ type, payload });
}

// (message: any, sender: MessageSender, sendResponse: function) => boolean | undefined
ext.runtime.onMessage.addListener(async (message, __sender) => {
  logger.info('<- type=%s payload=%s', message.type, message.payload);

  reply(message, { data: { ok: 1 } });
  reply(message, { error: { code: 'ERR_01' } });
});
