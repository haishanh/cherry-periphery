import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  // Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

// Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
const FeatureList: FeatureItem[] = [
  {
    title: 'Open source and self-hostable',
    description: (
      <>Your data is in your own hands</>
    ),
  },
  {
    title: 'Feature Complete',
    description: (
      <>Tags, groups, full text search and browser extensions</>
    ),
  },
  {
    title: 'Simple UI but rich UX',
    description: (
      <>It's a self-hostable bookmark service with experience that doesn't suck</>
    ),
  },
  // {
  //   title: 'Use SQLite',
  //   description: (
  //     <>Management and backup is a breeze</>
  //   ),
  // },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
