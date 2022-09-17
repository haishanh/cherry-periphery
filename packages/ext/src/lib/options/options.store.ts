import { writable } from 'svelte/store';

import type ServerEditModal from '$lib/options/ServerEditModal.svelte';
import { ext } from '$lib/shared/browser';

import type { ServerItemConfig } from './type';

export const serverEditModal = writable<ServerEditModal>(null);

let extensionOptionsLoaded = false;

export const extensionOptions = writable<{
  servers: ServerItemConfig[];
  activeServerIdx: number;
}>({ servers: [], activeServerIdx: 0 });

extensionOptions.subscribe(async (value) => {
  if (!import.meta.env.DEV) {
    console.log('extensionOptions subscribe', value);
    console.log(JSON.stringify({ value, extensionOptionsLoaded }));
    if (!extensionOptionsLoaded) return;
    if (value) {
      console.log('set storage');
      await ext.storage.local.set({ options: value });
      console.log('Value is set to ' + JSON.stringify(value));
    }
  }
});

///// actions

export async function loadExtensionOptions() {
  if (!import.meta.env.DEV) {
    const data = await ext.storage.local.get(['options']);
    console.log('loadExtensionOptions loaded', JSON.stringify(data));
    const options = data.options;
    console.log('loadExtensionOptions', JSON.stringify(options));
    extensionOptionsLoaded = true;
    if (!options || !options.servers || options.servers.length === 0) {
      extensionOptions.set({ servers: [], activeServerIdx: 0 });
    } else {
      extensionOptions.set(options);
    }
  } else {
    extensionOptions.set({
      servers: [
        {
          apiBase: 'http://localhost:5173',
          key: '0',
          user: {
            username: 'hello@cherry.haishan.me',
          },
        },
        { apiBase: `https://${makeLongWord(80)}.example.com`, key: '1' },
      ],
      activeServerIdx: 0,
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

export function selectServerItem(idx: number) {
  extensionOptions.update((n) => {
    n.activeServerIdx = idx;
    return n;
  });
}
