import React from 'react';
import cx from 'clsx';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';

import styles from './index.module.css';

const LinkComponent = Link as React.ComponentType<{
  children?: React.ReactNode;
  className?: string;
  to?: string;
}>;

const HeadComponent = Head as React.ComponentType<{
  children?: React.ReactNode;
}>;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={cx('hero', styles.heroBanner)}>
      <div className={cx('container', styles.container)}>
        <FallingLeaves />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <LinkComponent className={cx('button button--secondary button--lg', styles.cta)} to="/docs/intro">
            Get Started
          </LinkComponent>
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

const LEAVES = [
  { left: '19%', top: '4%', size: 40, speed: 0.16, drift: 22, phase: 0.2, tilt: -12, spin: 0.04 },
  { left: '41%', top: '14%', size: 40, speed: 0.12, drift: 28, phase: 1.4, tilt: 10, spin: -0.05 },
  { left: '70%', top: '5%', size: 50, speed: 0.14, drift: 24, phase: 2.3, tilt: -8, spin: 0.03 },
  { left: '0%', top: '50%', size: 40, speed: 0.18, drift: 18, phase: 3.1, tilt: 16, spin: -0.04 },
  { left: '99%', top: '60%', size: 30, speed: 0.15, drift: 16, phase: 4.2, tilt: -20, spin: 0.05 },
  { left: '60%', top: '40%', size: 50, speed: 0.13, drift: 30, phase: 5.1, tilt: 8, spin: -0.03 },
  { left: '80%', top: '80%', size: 45, speed: 0.17, drift: 20, phase: 0.9, tilt: -14, spin: 0.04 },
  { left: '12%', top: '28%', size: 34, speed: 0.14, drift: 20, phase: 2.8, tilt: 12, spin: -0.04 },
  { left: '52%', top: '68%', size: 36, speed: 0.11, drift: 26, phase: 4.8, tilt: -10, spin: 0.03 },
  { left: '88%', top: '22%', size: 32, speed: 0.16, drift: 18, phase: 1.9, tilt: 18, spin: -0.05 },
  { left: '28%', top: '74%', size: 30, speed: 0.13, drift: 16, phase: 3.7, tilt: -16, spin: 0.04 },
  { left: '74%', top: '32%', size: 38, speed: 0.15, drift: 22, phase: 5.6, tilt: 9, spin: -0.03 },
] as const;

function FallingLeaves() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrollY(window.scrollY || 0);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.leaves} aria-hidden="true">
      {LEAVES.map((leaf, index) => {
        const fall = scrollY * leaf.speed;
        const sway = Math.sin(scrollY / 140 + leaf.phase) * leaf.drift;
        const wobble = Math.cos(scrollY / 110 + leaf.phase) * 10;
        const rotate = leaf.tilt + wobble + scrollY * leaf.spin;

        return (
          <span
            key={index}
            className={styles.leaf}
            style={{
              left: leaf.left,
              top: leaf.top,
              width: `${leaf.size}px`,
              height: `${leaf.size}px`,
              transform: `translate3d(${sway}px, ${fall}px, 0) rotate(${rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

function BigShot() {
  return (
    <div className={styles.BigShot}>
      <picture>
        <source
          type="image/avif"
          srcSet="/img/site/home-hero-dark-300.avif 300w, /img/site/home-hero-dark-2970.avif 2970w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <source
          type="image/png"
          srcSet="/img/site/home-hero-dark-300.png 300w, /img/site/home-hero-dark-2970.png 2970w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <img
          data-img="dark"
          decoding="async"
          src="/img/site/home-hero-dark-300.png"
          width="2970"
          height="1744"
          style={{ height: 'auto' }}
        />
      </picture>
      <picture>
        <source
          type="image/avif"
          srcSet="/img/site/home-hero-light-300.avif 300w, /img/site/home-hero-light-2970.avif 2970w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <source
          type="image/png"
          srcSet="/img/site/home-hero-light-300.png 300w, /img/site/home-hero-light-2970.png 2970w"
          sizes="(min-width: 30em) 50vw, 100vw"
        />
        <img
          data-img="light"
          decoding="async"
          src="/img/site/home-hero-light-300.png"
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
    <HeadComponent>
      <meta name="twitter:image:src" content="https://cherry.haishan.me/img/site/og-image-1200.png" />
      <meta property="og:image" content="https://cherry.haishan.me/img/site/og-image-1200.png" />
      <meta property="og:image:alt" content={siteConfig.tagline} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
    </HeadComponent>
  );
}
