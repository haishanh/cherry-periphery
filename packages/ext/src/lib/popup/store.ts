import { writable } from 'svelte/store';

import type { ServerItemConfig } from '$lib/options/type';
import { getServerConfig } from '$lib/shared/common.util';

export const config = writable<ServerItemConfig>(null);

async function loadConfig() {
  let c: ServerItemConfig;
  if (!import.meta.env.DEV) {
    try {
      c = await getServerConfig();
    } catch (e) {
      c = null;
    }
  } else {
    c = {
      apiBase: 'https://example.codddddddddddddddddddddddddddddddddm',
      pat: 'test',
      key: 'test',
    };
  }

  config.set(c);
  return c;
}

let wipLoadConfig: ReturnType<typeof loadConfig>;
export async function loadConfigOnce() {
  if (!wipLoadConfig) wipLoadConfig = loadConfig();
  return await wipLoadConfig;
}
