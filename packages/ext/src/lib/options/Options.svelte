<script lang="ts">
  import AddServerButton from '$lib/options/AddServerButton.svelte';
  import { extensionOptions } from '$lib/options/options.store';
  import OptionsLayout from '$lib/options/OptionsLayout.svelte';
  import ServerList from '$lib/options/ServerList.svelte';
</script>

<OptionsLayout>
  {#if $extensionOptions.servers.length === 0}
    <div class="no-server">
      <p>No servers available</p>
      <AddServerButton />
    </div>
  {:else}
    <div class="server-list">
      <ServerList />
    </div>
    <AddServerButton />
  {/if}
</OptionsLayout>

<style lang="scss">
  .no-server {
    text-align: center;
    margin: 30px 0;
  }
  .server-list {
    margin: 20px 0;
  }
</style>
