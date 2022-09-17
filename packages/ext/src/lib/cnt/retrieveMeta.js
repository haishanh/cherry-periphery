(() => {
  const ret = { title: '', desc: '', url: '' };
  let e = document.querySelector('meta[property="og:title"]');
  if (e) {
    ret.title = e.getAttribute('content');
  }
  if (!ret.title) {
    const e = document.querySelector('title');
    if (e) {
      ret.title = e.innerText;
    }
  }

  e = document.querySelector('meta[property="og:description"]');
  if (e) {
    ret.desc = e.getAttribute('content');
  }
  if (!ret.desc) {
    const e = document.querySelector('meta[name="description"]');
    if (e) {
      ret.desc = e.getAttribute('content');
    }
  }

  e = document.querySelector('meta[property="og:url"]');
  if (e) {
    const u = e.getAttribute('content');
    if (u.startsWith('http')) ret.url = u;
  }
  if (!ret.url) {
    ret.url = location.href;
  }
  return ret;
})();
