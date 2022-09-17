<script lang="ts">
  // XXX change this list into a radio group for better a11y
  export let servers = [];
  export let activeServerIdx = 0;

  import CheckCircle from '@hsjs/svelte-icons/feather/CheckCircle.svelte';
  import Circle from '@hsjs/svelte-icons/feather/Circle.svelte';

  import ServerItem from '$lib/options/ServerItem.svelte';

  import { selectServerItem } from './options.store';
</script>

<ul class="server-list">
  {#each servers as server, i (server.apiBase)}
    <li class:active={i === activeServerIdx} on:click={() => selectServerItem(i)}>
      {#if i === activeServerIdx}
        <div class="tick"><CheckCircle size={18} /></div>
      {:else}
        <div class="tick"><Circle size={18} /></div>
      {/if}
      <div class="cnt">
        <ServerItem {server} />
      </div>
    </li>
  {/each}
</ul>

<style lang="scss">
  .server-list {
    list-style: none;
    padding: 0;
    li {
      --color-active: #49a501;
      @media (prefers-color-scheme: dark) {
        --bg-card-hover: hsl(0deg 0% 21%);
      }
      @media (prefers-color-scheme: light) {
        --bg-card-hover: hsl(0deg 0% 92%);
      }
      display: flex;
      align-items: center;
      cursor: pointer;
      margin: 10px 0;
      border: 1px solid var(--bo-default);
      background-color: var(--bg-card);
      border-radius: 10px;
      padding: 10px;
      &:hover {
        background-color: var(--bg-card-hover);
      }
      .cnt {
        min-width: 0;
      }
      .tick {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        color: var(--color-text2);
      }
      &.active {
        border-color: var(--color-active);
        .tick {
          color: var(--color-active);
        }
      }
    }
  }
</style>
