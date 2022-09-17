<script lang="ts">
  import Button from 'cherry/components/base/Button.svelte';
  import { onMount } from 'svelte';

  import Options from '$lib/options/Options.svelte';
  import Popup from '$lib/popup/Popup.svelte';

  let screen = '';

  onMount(() => {
    const u = new URL(window.location.href);
    const qs = u.searchParams;
    screen = qs.get('screen');
  });

  const screens = ['FormOptions', 'Popup'];
  function switchToScreen(s: string) {
    return () => {
      const q = new URLSearchParams({ screen: s });
      window.location.href = `/?${q}`;
    };
  }
</script>

<div class="btns">
  {#each screens as scr (scr)}
    <Button on:click={switchToScreen(scr)}>{scr}</Button>
  {/each}
</div>

{#if screen === 'FormOptions'}
  <div class="options">
    <Options />
  </div>
{:else if screen === 'Popup'}
  <main>
    <Popup />
  </main>
{/if}

<style lang="scss">
  .btns {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .options {
    max-width: 1000px;
    margin: 0 auto;
    border: 1px dashed #ccc;
    padding: 10px;
  }
  main {
    min-width: 300px;
    margin: 0 auto;
    border: 1px dashed #ccc;
  }
</style>
