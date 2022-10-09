import React from 'react';
import cx from 'clsx';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={cx('hero', styles.heroBanner)}>
      <div className={cx('container', styles.container)}>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className={cx('button button--secondary button--lg', styles.cta)} to="/docs/intro">
            Get Started
          </Link>
        </div>
        <BigShot />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <OpenGraphImage />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

function BigShot() {
  return (
    <div className={styles.BigShot}>
      <picture>
        <source
          type="image/avif"
          srcSet="https://i1.haishan.me/file/pelican/00/PX9VBubL_9-zgvNIhwr8c-300.avif 300w, https://i1.haishan.me/file/pelican/00/PX9VBubL_9-zgvNIhwr8c-2970.avif 2970w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <source
          type="image/png"
          srcSet="https://i1.haishan.me/file/pelican/00/PX9VBubL_9-zgvNIhwr8c-300.png 300w, https://i1.haishan.me/file/pelican/00/PX9VBubL_9-zgvNIhwr8c-2970.png 2970w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <img
          data-img="dark"
          loading="lazy"
          decoding="async"
          src="https://i1.haishan.me/file/pelican/00/PX9VBubL_9-zgvNIhwr8c-300.png"
          width="2970"
          height="1744"
          style={{ height: 'auto' }}
        />
      </picture>
      <picture>
        <source
          type="image/avif"
          srcSet="https://i1.haishan.me/file/pelican/00/Y1yuNq52OZvDC01GxkXHq-300.avif 300w, https://i1.haishan.me/file/pelican/00/Y1yuNq52OZvDC01GxkXHq-2970.avif 2970w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <source
          type="image/png"
          srcSet="https://i1.haishan.me/file/pelican/00/Y1yuNq52OZvDC01GxkXHq-300.png 300w, https://i1.haishan.me/file/pelican/00/Y1yuNq52OZvDC01GxkXHq-2970.png 2970w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <img
          data-img="light"
          loading="lazy"
          decoding="async"
          src="https://i1.haishan.me/file/pelican/00/Y1yuNq52OZvDC01GxkXHq-300.png"
          width="2970"
          height="1744"
          style={{ height: 'auto' }}
        />
      </picture>
    </div>
  );
}

function OpenGraphImage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Head>
      <meta name="twitter:image:src" content="https://i1.haishan.me/file/pelican/00/RAyOr08o-sScNJGqk9lQT-1200.png" />
      <meta property="og:image" content="https://i1.haishan.me/file/pelican/00/RAyOr08o-sScNJGqk9lQT-1200.png" />
      <meta property="og:image:alt" content={siteConfig.tagline} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
    </Head>
  );
}
