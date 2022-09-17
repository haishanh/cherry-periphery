<script lang="ts">
  export let server: ServerItemConfig;

  import Edit from '@hsjs/svelte-icons/feather/Edit.svelte';
  import Trash from '@hsjs/svelte-icons/feather/Trash.svelte';
  import Button from 'cherry/components/base/Button.svelte';
  import VisuallyHidden from 'cherry/components/base/VisuallyHidden.svelte';

  import { extensionOptions, serverEditModal } from './options.store';
  import type { ServerItemConfig } from './type';

  function handleClickEdit() {
    $serverEditModal.open({ item: server });
  }
  function handleClickDelete() {
    extensionOptions.update((o) => {
      const servers = o.servers.filter((s) => s.key !== server.key);
      o.servers = servers;
      return o;
    });
  }
</script>

<div class="item">
  <div class="info">
    <h3>{server.apiBase}</h3>
    {#if server.user && server.user.username}
      <p>{server.user.username}</p>
    {/if}
  </div>
  <div class="actions">
    <Button modifier={['icon']} title="View and Edit" on:click={handleClickEdit}>
      <VisuallyHidden>View and Edit</VisuallyHidden><Edit size={14} />
    </Button>
    <Button modifier={['icon']} title="Delete" on:click={handleClickDelete}>
      <VisuallyHidden>Delete</VisuallyHidden><Trash size={14} />
    </Button>
  </div>
</div>

<style lang="scss">
  .item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 6px 0;
    .info {
      overflow: hidden;
    }
    h3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }
    p {
      margin: 5px 0;
      font-size: 0.9em;
    }
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  }
</style>
