import * as React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import s0 from './save.module.scss';
import cx from 'clsx';

import ChromeLogo from '@browser-logos/chrome/chrome.svg';
// we are suppose to use the svg one but the svgo breaks the display of the svg
// svgo is enabled in the svgr/webpack included in docusaurus
import FirefoxLogoPng from '@browser-logos/firefox/firefox_128x128.png';

export default function Save() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`How to Save`} description={siteConfig.tagline}>
      <main className={s0.main}>
        <h2>Browser Extensions</h2>
        <div className={s0.ext}>
          <ExtensionScreenshot />
          <div className={s0.extLinkGroup}>
            <a
              href="https://chrome.google.com/webstore/detail/cherry-chrome-extension/klpbmdnmnbcabnaammeinopljnmdnili"
              className={cx('button button--secondary', s0.extLink)}
            >
              <ChromeLogo width={36} />
              <span>Chrome</span>
            </a>
            <a
              href="https://addons.mozilla.org/en-US/firefox/addon/cherry-browser-extension/"
              className={cx('button button--secondary', s0.extLink)}
            >
              <figure className={s0.icon} style={{ backgroundImage: `url(${FirefoxLogoPng})` }} />
              <span>Firefox</span>
            </a>
          </div>
        </div>
        <h2>Browser Bookmarklet</h2>
        <p>You can find the bookmarklet on your Settings / Account page. Drag the bookmarklet to your browser's bookmarks bar. When browing a web page, simply click the bookmarklet to save it to Cherry.</p>
        <p>You should still use the browser extension whenever possible. A bunch of websites, like GitHub, have Content Security Policy applied that can prevent you from using the bookmarklet.</p>
      </main>
    </Layout>
  );
}

function ExtensionScreenshot(props: { width?: number }) {
  const width = props.width || 700;
  return (
    <div>
      <picture>
        <source
          type="image/avif"
          srcSet="https://i1.haishan.me/file/pelican/00/tX_GlPCLsJvFLNM5cThAM-300.avif 300w, https://i1.haishan.me/file/pelican/00/tX_GlPCLsJvFLNM5cThAM-1436.avif 1436w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <source
          type="image/png"
          srcSet="https://i1.haishan.me/file/pelican/00/tX_GlPCLsJvFLNM5cThAM-300.png 300w, https://i1.haishan.me/file/pelican/00/tX_GlPCLsJvFLNM5cThAM-1436.png 1436w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <img
          loading="lazy"
          decoding="async"
          data-img="light"
          src="https://i1.haishan.me/file/pelican/00/tX_GlPCLsJvFLNM5cThAM-300.png"
          width="1436"
          height="974"
          style={{ height: 'auto', width }}
        />
      </picture>

      <picture>
        <source
          type="image/avif"
          srcSet="https://i1.haishan.me/file/pelican/00/nQeuBAoOi5G-bbB3DdGQ7-300.avif 300w, https://i1.haishan.me/file/pelican/00/nQeuBAoOi5G-bbB3DdGQ7-1436.avif 1436w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <source
          type="image/png"
          srcSet="https://i1.haishan.me/file/pelican/00/nQeuBAoOi5G-bbB3DdGQ7-300.png 300w, https://i1.haishan.me/file/pelican/00/nQeuBAoOi5G-bbB3DdGQ7-1436.png 1436w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <img
          loading="lazy"
          decoding="async"
          data-img="dark"
          src="https://i1.haishan.me/file/pelican/00/nQeuBAoOi5G-bbB3DdGQ7-300.png"
          width="1436"
          height="974"
          style={{ height: 'auto', width }}
        />
      </picture>
    </div>
  );
}
