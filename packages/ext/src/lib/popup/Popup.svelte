<script lang="ts">
  import ArrowLeft from '@hsjs/svelte-icons/feather/ArrowLeft.svelte';
  import Edit from '@hsjs/svelte-icons/feather/Edit.svelte';
  import Plus from '@hsjs/svelte-icons/feather/Plus.svelte';
  import Settings from '@hsjs/svelte-icons/feather/Settings.svelte';
  import Trash from '@hsjs/svelte-icons/feather/Trash.svelte';
  import Button from 'cherry/components/base/Button.svelte';
  import Cherry from 'cherry/components/base/Cherry.svelte';
  import CherryLeaf from 'cherry/components/base/CherryLeaf.svelte';
  import VisuallyHidden from 'cherry/components/base/VisuallyHidden.svelte';
  import BookmarkEditForm, {
    type Event0 as BEFEvent0,
    Event0Type as BEFEvent0Type,
  } from 'cherry/components/bookmark/BookmarkEditForm.svelte';
  import LeafSpinner from 'cherry/components/feedback/LeafSpinner.svelte';
  import type { BookmarkFromDb } from 'cherry/type';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import type { ServerItemConfig } from '$lib/options/type';
  import { ext } from '$lib/shared/browser';
  import { createLogger, retrieveInfoFromCurrentTab } from '$lib/shared/common.util';

  type ScreenType =
    | 'Init' // Init probable is not needed
    | 'Picking'
    | 'AfterSave'
    | 'Dropped'
    | 'ConfigRequired'
    | 'PickFailed'
    | 'Editing';

  let screen: ScreenType = 'Init';
  let bookmark: BookmarkFromDb;

  let errMsg: string;

  let server: ServerItemConfig;

  const logger = createLogger('popup');

  function sendMessage(type: string, payload?: any) {
    ext.runtime.sendMessage({ type, payload });
  }

  // @ts-ignore
  async function unused__launchWebAuthFlow(apiBase: string) {
    const redirect_uri = ext.identity.getRedirectURL();
    const u = new URLSearchParams({ client_id: 'cherry.ext', redirect_uri, response_type: 'code' });
    const url = `${apiBase}/authorize?${u}`;
    // @ts-ignore ts is complain this is not promise
    const res = await ext.identity.launchWebAuthFlow({ url, interactive: true });
    logger.info('launchWebAuthFlow res %s', res);
  }

  function addListener() {
    ext.runtime.onMessage.addListener(async (message, __callback) => {
      const type = message.type;
      const payload = message.payload;
      logger.info('<- type=%s payload=%s', type, payload);
      if (type === 'init:reply') {
        if (payload.error) {
          switchScreen('ConfigRequired');
        } else {
          server = payload.data.server;
          switchScreen('Picking');
          // save bookmark
          retrieveInfoFromCurrentTab().then(
            (item) => {
              sendMessage('save_bookmark', { item });
            },
            (error) => {
              logger.info('%s', error);
              errMsg = error?.message || 'Unknown Error';
              switchScreen('PickFailed');
            }
          );
        }
      } else if (type === 'save_bookmark:reply') {
        if (payload.error) {
          // to optimize this
          errMsg = JSON.stringify(payload.error);
          switchScreen('PickFailed');
        } else {
          bookmark = payload.data;
          switchScreen('AfterSave');
        }
      } else if (type === 'delete_bookmark:reply') {
        if (payload.error) {
          // ignore
        } else if (payload.data) {
          switchScreen('Dropped');
        }
      }
    });
  }

  onMount(async () => {
    addListener();
    sendMessage('init');
  });

  const sleep = (t: number) => new Promise((r) => setTimeout(r, t));
  async function unused__initMock() {
    await sleep(200000);
    switchScreen('AfterSave');
  }

  function switchScreen(target: ScreenType) {
    screen = target;
  }

  async function unused__saveBookmark(item: { title?: string; desc?: string; url: string }) {
    // const server = await loadConfigOnce();
    try {
      sendMessage('save_bookmark', { server, item });
    } catch (e) {
      errMsg = e?.message || 'Unknown Error';
      switchScreen('PickFailed');
    }
  }

  function handleClickEdit() {
    switchScreen('Editing');
  }

  async function handleClickDelete() {
    if (!bookmark || !bookmark.id) {
      logger.error('Attempt to delete a bookmark without saving it');
      return;
    }
    sendMessage('delete_bookmark', { id: bookmark.id });
  }

  function handleClickSettings() {
    if (ext.runtime.openOptionsPage) {
      ext.runtime.openOptionsPage();
    } else {
      window.open(ext.runtime.getURL('options.html'));
    }
  }

  function handleBookmarkEditFormEv0(e: BEFEvent0) {
    const type = e.detail?.type;
    switch (type) {
      case BEFEvent0Type.UpdateCompleted:
      case BEFEvent0Type.CreateCompleted:
        bookmark = e.detail.payload;
        switchScreen('AfterSave');
        break;
      // case BookmarkEditFormEvent.UpdateFailed:
      //   addToast({ description: 'Something went wrong', status: 'error' });
      //   break;
    }
  }
</script>

<main>
  {#if screen === 'Editing' && bookmark}
    <div class="edit">
      <div class="toolbar">
        <Button modifier={['icon']} title="Back" on:click={() => switchScreen('AfterSave')}>
          <VisuallyHidden>Back</VisuallyHidden><ArrowLeft size={20} />
        </Button>
      </div>
      <BookmarkEditForm {bookmark} {server} on:ev0={handleBookmarkEditFormEv0} />
    </div>
  {:else}
    <div class="settings">
      {#if server?.apiBase}
        <div>
          <div class="api-info">{server.apiBase}</div>
          {#if server.user && server.user.username}
            <div class="api-info">{server.user.username}</div>
          {/if}
        </div>
      {:else}
        <div />
      {/if}
      <Button modifier={['icon']} title="Settings" on:click={handleClickSettings}>
        <VisuallyHidden>Settings</VisuallyHidden><Settings size={14} />
      </Button>
    </div>

    {#if screen === 'Init' || screen === 'Picking' || screen === 'Dropped' || screen === 'PickFailed' || screen === 'AfterSave'}
      <div class="logo-wrap">
        {#if screen === 'AfterSave'}
          <div class="center100" in:fade={{ duration: 200 }}>
            <Cherry size={100} />
          </div>
        {:else if screen === 'Picking'}
          <div class="center100" out:fade={{ duration: 200 }}>
            <LeafSpinner size={100} />
          </div>
        {:else}
          <div class="center100">
            <CherryLeaf size={100} />
          </div>
        {/if}
      </div>
    {/if}

    {#if screen === 'Picking'}
      <h2>Picking...</h2>
    {:else if screen === 'AfterSave'}
      <h2>Cherry picked!</h2>
    {:else if screen === 'PickFailed'}
      <h2>{errMsg || 'Something went wrong'}</h2>
    {:else if screen === 'Dropped'}
      <h2>Cherry dropped</h2>
    {:else if screen === 'ConfigRequired'}
      <div class="ConfigRequired">
        <div class="btns">
          <Button on:click={handleClickSettings}>
            <Plus size={14} /><span class="btn-label">Add server</span>
          </Button>
        </div>
      </div>
    {/if}

    {#if screen === 'AfterSave'}
      <div class="btns">
        <Button on:click={handleClickEdit}>
          <Edit size={14} /><span class="btn-label">Edit</span>
        </Button>
        <Button on:click={handleClickDelete}>
          <Trash size={14} /><span class="btn-label">Delete</span>
        </Button>
      </div>
    {/if}
  {/if}
</main>

<style lang="scss">
  main {
    padding: 10px;
  }
  .edit {
    min-width: 550px;
    .toolbar {
      padding: 10px 0;
    }
  }
  .logo-wrap {
    height: 100px;
    position: relative;
  }
  .settings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3px;
    .api-info {
      min-width: 0;
      font-size: 0.7em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--color-text3);
      line-height: 1.3;
    }
  }
  .center100 {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
  }
  h2 {
    text-align: center;
  }
  .btns {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    .btn-label {
      margin-left: 5px;
    }
  }
  .ConfigRequired {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
