import type { ServerItemConfig } from '$lib/options/type';
import { deleteBookmarkServerSide, saveBookmarkToServer } from '$lib/shared/backend.util';
import { ext } from '$lib/shared/browser';
import { createLogger, getServerConfig } from '$lib/shared/common.util';
import { request, RequestError } from '$lib/shared/http.util';

const logger = createLogger('background');

let server: ServerItemConfig;

async function getConfig() {
  return await getServerConfig();
}

function reply(message: { type: string }, payload: any) {
  const type = message.type + ':reply';
  ext.runtime.sendMessage({ type, payload });
}

// (message: any, sender: MessageSender, sendResponse: function) => boolean | undefined
ext.runtime.onMessage.addListener(async (message, __sender) => {
  logger.info('<- type=%s payload=%s', message.type, message.payload);

  const onApiSuccess = (ret: Awaited<ReturnType<typeof request>>) => {
    return { data: ret.data };
  };

  const onApiFailure = (err: RequestError) => {
    logger.info('error %o', err);
    if (err instanceof RequestError) {
      if (err.error) {
        return { error: err };
      } else {
        return { error: err.result };
      }
    } else {
      return { error: err };
    }
  };

  if (message.type === 'init') {
    server = await getConfig();
    if (!server) {
      reply(message, { error: { code: 'require_server_config' } });
    } else {
      reply(message, { data: { server } });
    }
  } else if (message.type === 'save_bookmark') {
    const { item } = message.payload;
    saveBookmarkToServer(server, item)
      .then(onApiSuccess, onApiFailure)
      .then((payload) => reply(message, payload));
  } else if (message.type === 'delete_bookmark') {
    const { id } = message.payload;
    deleteBookmarkServerSide(server, id)
      .then(onApiSuccess, onApiFailure)
      .then((payload) => reply(message, payload));
  }
});
