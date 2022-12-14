import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { fetch } from 'undici';

const targetDir = './images';

const items = [
  {
    url: 'https://i1.haishan.me/file/pelican/01/lgis2dQHHOF.png',
    filename: `${targetDir}/cherry-16.png`,
  },
  {
    url: 'https://i1.haishan.me/file/pelican/01/GCnxE5jFDJB.png',
    filename: `${targetDir}/cherry-32.png`,
  },
  {
    url: 'https://i1.haishan.me/file/pelican/01/pk6JdYgiySR.png',
    filename: `${targetDir}/cherry-48.png`,
  },
  {
    url: 'https://i1.haishan.me/file/pelican/01/X5mxjtpk_Qd.png',
    filename: `${targetDir}/cherry-128.png`,
  },
  {
    url: 'https://i1.haishan.me/file/pelican/01/vYi_IMAz6Wh.png',
    filename: `${targetDir}/leaf-16.png`,
  },
  {
    url: 'https://i1.haishan.me/file/pelican/01/XGq0-02Bty0.png',
    filename: `${targetDir}/leaf-32.png`,
  },
  {
    url: 'https://i1.haishan.me/file/pelican/01/g1FATks3LOD.png',
    filename: `${targetDir}/leaf-48.png`,
  },
  {
    url: 'https://i1.haishan.me/file/pelican/01/rHBVPWYKhZy.png',
    filename: `${targetDir}/leaf-128.png`,
  },
];

async function download(url, name) {
  const res = await fetch(url);
  const ws = fs.createWriteStream(name);
  await pipeline(res.body, ws);
}

(async () => {
  const works = items.map((item) => download(item.url, item.filename));
  await Promise.all(works);
})();
