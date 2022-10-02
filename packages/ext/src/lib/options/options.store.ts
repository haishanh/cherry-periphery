import { writable } from 'svelte/store';

import type ServerEditModal from '$lib/options/ServerEditModal.svelte';
import { ext } from '$lib/shared/browser';
import { createLogger, makeId } from '$lib/shared/common.util';

import type { ServerItemConfig } from './type';

export const serverEditModal = writable<ServerEditModal>(null);

let extensionOptionsLoaded = false;

const logger = createLogger('options');

export const extensionOptions = writable<{
  servers: ServerItemConfig[];
  activeServerKey: string;
}>({ servers: [], activeServerKey: '' });

extensionOptions.subscribe(async (value) => {
  if (!import.meta.env.DEV) {
    if (!extensionOptionsLoaded) return;
    if (value) {
      await ext.storage.local.set({ options: value });
    }
  }
});

///// actions

export async function loadExtensionOptions() {
  if (!import.meta.env.DEV) {
    const data = await ext.storage.local.get(['options']);
    const options = data.options;
    logger.info('loadExtensionOptions %s', options);
    extensionOptionsLoaded = true;
    if (!options || !options.servers || options.servers.length === 0) {
      extensionOptions.set({ servers: [], activeServerKey: '' });
    } else {
      extensionOptions.set(options);
    }
  } else {
    extensionOptions.set({
      servers: [
        {
          apiBase: 'http://localhost:5173',
          key: '01',
          user: {
            username: 'hello@cherry.haishan.me',
          },
        },
        { apiBase: `https://${makeLongWord(80)}.example.com`, key: '1' },
      ],
      activeServerKey: '01',
    });
  }
}

function makeLongWord(n: number) {
  let c = 'l';
  for (let count = 0; count < n; count++) {
    c += 'o';
  }
  return c + 'ng';
}

export function selectServerItem(key: string) {
  extensionOptions.update((o) => {
    o.activeServerKey = key;
    return o;
  });
}

export function deleteServerItem(key: string) {
  extensionOptions.update((o) => {
    o.servers = o.servers.filter((s) => s.key !== key);
    return o;
  });
}

export function updateOrAddServerItem(value: ServerItemConfig) {
  extensionOptions.update((o) => {
    const currentActiveServerKey = o.activeServerKey;
    const server = o.servers.find((s) => s.key === value.key);
    if (!server) {
      const key = makeId();
      o.servers.push({ ...value, key });
      if (!currentActiveServerKey) o.activeServerKey = key;
    } else {
      for (const prop in value) server[prop] = value[prop];
      if (!currentActiveServerKey) o.activeServerKey = value.key;
    }
    return o;
  });
}
