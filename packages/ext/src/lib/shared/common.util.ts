import type { Options } from '$lib/options/type';

import { ext } from './browser';

export const isManifestV3 = ext.runtime.getManifest().manifest_version === 3;

let id = 0;
export function genId() {
  return id++;
}

export async function retrieveInfoFromCurrentTab() {
  const item = { title: '', desc: '', url: '' };

  // XXX this seems is the only API which not working properly in Firefox use `chrome.*` namespaced API, not sure why ¯\_(ツ)_/¯
  const [tab] = await ext.tabs.query({ active: true, currentWindow: true });

  // Note: This method is available in Manifest V3 or higher in Chrome and Firefox 101. In Safari and Firefox 102+, this method is also available in Manifest V2.
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript
  let results: any[];
  if (isManifestV3) {
    results = await ext.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['/retrieveMeta.js'],
    });
  } else {
    results = await ext.tabs.executeScript(tab.id, { file: '/retrieveMeta.js' });
  }

  function copyProps(info: typeof item) {
    if (info.title) item.title = info.title;
    if (info.desc) item.desc = info.desc;
    if (info.url) item.url = info.url;
  }

  // tabs.executeScript results =>  [ret, ret]
  // scripting.executeScript results => [{result:ret}, {result:ret}]
  if (isManifestV3) {
    for (const r of results) {
      if (!r || !r.result) continue;
      copyProps(r.result);
      break;
    }
  } else {
    for (const r of results) {
      if (!r) continue;
      copyProps(r);
      break;
    }
  }
  if (!item.url) item.url = tab.url;
  return item;
}

function format(fmt: string, ...params: any[]) {
  let s = '';
  let idx = 0;
  let start = 0;
  const len = fmt.length;
  let paramIdx = 0;
  for (; idx < len;) {
    const c = fmt[idx];
    if (c === '%') {
      if (fmt[idx + 1] === 's') {
        const value = params[paramIdx++];
        const valueStr = typeof value === 'string' ? value : JSON.stringify(value);
        s = s + fmt.substring(start, idx) + valueStr;
        idx += 2;
        start = idx;
      } else {
        idx++;
      }
    } else {
      idx++;
    }
  }
  if (start !== len) {
    s += fmt.substring(start);
  }
  return s;
}

export function createLogger(name: string) {
  const print = (fmt: string, ...params: any[]) => {
    console.log(name + ':', format(fmt, ...params));
  };
  return {
    info: print,
    error: print,
  };
}

export async function getServerConfig() {
  const data = (await ext.storage.local.get(['options'])) as { options: Options };
  const options = data.options;
  if (!options || !options.servers || options.servers.length <= 0) {
    return null;
  } else {
    const servers = options.servers;
    return servers[options.activeServerIdx];
  }
}

export function makeId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
