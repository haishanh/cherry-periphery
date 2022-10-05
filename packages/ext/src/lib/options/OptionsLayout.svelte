<script lang="ts">
  import Cherry from 'cherry/components/base/Cherry.svelte';
  import { onMount } from 'svelte';

  import { loadExtensionOptions, serverEditModal } from './options.store';
    import OptionsAbout from './OptionsAbout.svelte';
  import ServerEditModal from './ServerEditModal.svelte';

  let sem: ServerEditModal;

  onMount(() => {
    serverEditModal.set(sem);
    loadExtensionOptions();
  });
</script>

<main>
  <div><Cherry /></div>
  <slot />
  <ServerEditModal bind:this={sem} />
  <OptionsAbout />
</main>

<style>
  main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 15px;
  }
</style>
