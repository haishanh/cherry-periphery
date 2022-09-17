import { writable } from 'svelte/store';

import type { ServerItemConfig } from '$lib/options/type';
import { ext } from '$lib/shared/browser';

export const config = writable<ServerItemConfig>(null);

async function loadConfig() {
  let c: ServerItemConfig;
  if (!import.meta.env.DEV) {
    try {
      const data = await ext.storage.local.get(['options']);
      const options = data.options;
      if (!options || !options.servers || options.servers.length === 0) {
        c = null;
      } else {
        const servers = options.servers;
        c = servers[options.activeServerIdx];
      }
    } catch (e) {
      c = null;
    }
  } else {
    c = { apiBase: 'https://example.codddddddddddddddddddddddddddddddddm' };
  }

  config.set(c);
  return c;
}

let wipLoadConfig: ReturnType<typeof loadConfig>;
export async function loadConfigOnce() {
  if (!wipLoadConfig) wipLoadConfig = loadConfig();
  return await wipLoadConfig;
}
