import '$lib/styles/app.scss';

import Popup from '$lib/popup/Popup.svelte';

const app = new Popup({
  target: document.getElementById('popup'),
});

export default app;
