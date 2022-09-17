import * as React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import s0 from "./save.module.scss";
import cx from "clsx";

import ChromeLogo from "@browser-logos/chrome/chrome.svg";
import firefoxLogoUrl from "@browser-logos/firefox/firefox.svg";

export default function Save() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`How to Save`} description={siteConfig.tagline}>
      <main className={s0.main}>
        <h2>Browser Extensions</h2>
        <div className={s0.ext}>
          <ExtensionScreenshot />
          <div>
            <a
              href="https://chrome.google.com/webstore/detail/cherry-chrome-extension/klpbmdnmnbcabnaammeinopljnmdnili"
              className={cx("button button--secondary", s0.extLink)}
            >
              <ChromeLogo width={36} />
              <span>Chrome</span>
            </a>
          </div>
        </div>
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
          style={{ height: "auto", width }}
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
          style={{ height: "auto", width }}
        />
      </picture>
    </div>
  );
}
