// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cherry',
  tagline: 'A open source self-hostable bookmark service',
  url: 'https://cherry.haishan.me',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://i1.haishan.me/file/pelican/00/ZwhXba4c5ladhwcKD76hw-100.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'haishanh', // Usually your GitHub org/user name.
  projectName: 'cherry-periphery', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/haishanh/cherry-periphery/tree/main/packages/site/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/haishanh/cherry-periphery/tree/main/packages/site/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Cherry',
        hideOnScroll: true,
        logo: { alt: 'Cherry Logo', src: 'img/logo.svg' },
        items: [
          { type: 'doc', docId: 'intro', position: 'right', label: 'Docs' },
          { to: '/save', label: 'How to Save', position: 'right' },
          {
            href: 'https://github.com/haishanh/cherry',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Source Code',
            items: [
              // { label: "Cherry", to: "/docs" },
              { label: 'Cherry', href: 'https://github.com/haishanh/cherry' },
              { label: 'Cherry Peripheries', href: 'https://github.com/haishanh/cherry-periphery' },
            ],
          },
          {
            title: 'Browser Extensions',
            items: [
              {
                label: 'Chrome',
                href: 'https://chrome.google.com/webstore/detail/cherry-chrome-extension/klpbmdnmnbcabnaammeinopljnmdnili',
              },
              {
                label: 'Firefox',
                href: 'https://addons.mozilla.org/en-US/firefox/addon/cherry-browser-extension/',
              },
            ],
          },
        ],
        copyright:
          'Crafted By <a href="https://github.com/haishanh"><figure class="avatar-haishan"></figure><span>Haishan</span></a> in Shanghai',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
