const noop = () => {
  /* ignore */
};
// @ts-ignore
const mockedBrowser = {
  runtime: {
    getManifest: () => {
      return {
        manifest_version: 3,
      };
    },
  },

  storage: {
    local: {
      get: async () => {
        return {
          pat: 'pat',
          apiBase: 'https://location:1111/test',
        };
      },
    },
  },
  tabs: {
    create: noop,
  },
};

// @ts-ignore
export const ext: typeof chrome = import.meta.env.DEV
  ? mockedBrowser
  : // @ts-ignore
  typeof browser !== 'undefined' && typeof browser.runtime.getManifest !== 'undefined'
  ? // @ts-ignore
    browser
  : chrome;

export const isManifestV3 = ext.runtime.getManifest().manifest_version === 3;
