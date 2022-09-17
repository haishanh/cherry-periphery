<script lang="ts">
  import Button from 'cherry/components/base/Button.svelte';

  import { serverEditModal } from './options.store';
  function handleClick() {
    $serverEditModal.open({ item: { apiBase: '' } });
  }
</script>

<Button on:click={handleClick}>Add new server</Button>
