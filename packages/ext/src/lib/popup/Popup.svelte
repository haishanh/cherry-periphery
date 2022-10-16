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
  import { deleteBookmarkServerSide, saveBookmarkToServer } from '$lib/shared/backend.util';
  import { ext, isManifestV3 } from '$lib/shared/browser';
  import {
    createLogger,
    getServerConfig,
    retrieveInfoFromCurrentTab,
  } from '$lib/shared/common.util';
  import { RequestError } from '$lib/shared/http.util';

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
  const print = (x: any) => {
    console.log(x);
  };

  const onApiFailure = (err: RequestError) => {
    // logger.info('error %o', err);
    if (err instanceof RequestError) {
      if (err.error) {
        return { error: err };
      } else {
        return { error: err.result };
      }
    } else {
      return { error: err };
    }
  };

  async function init() {
    // TODO throw?
    server = await getServerConfig();
    if (!server) {
      switchScreen('ConfigRequired');
    } else {
      switchScreen('Picking');

      let item: Awaited<ReturnType<typeof retrieveInfoFromCurrentTab>>;
      try {
        item = await retrieveInfoFromCurrentTab();
      } catch (error) {
        logger.info('%s', error);
        errMsg = error?.message || 'Unknown Error';
        switchScreen('PickFailed');
      }

      let ret: Awaited<ReturnType<typeof saveBookmarkToServer>>;
      try {
        ret = await saveBookmarkToServer(server, item);
      } catch (err) {
        let ret = onApiFailure(err);
        // to optimize this
        errMsg = JSON.stringify(ret.error);
        switchScreen('PickFailed');
      }

      bookmark = ret.data;
      switchScreen('AfterSave');
      updateIcon(true).catch(print);
    }
  }

  async function updateIcon(picked: boolean) {
    const [tab] = await ext.tabs.query({ active: true, currentWindow: true });
    const pickedIconPath = {
      16: '/images/cherry-16.png',
      32: '/images/cherry-32.png',
      48: '/images/cherry-48.png',
      128: '/images/cherry-128.png',
    };
    const defaultIconPath = {
      16: '/images/leaf-16.png',
      32: '/images/leaf-32.png',
      48: '/images/leaf-48.png',
      128: '/images/leaf-128.png',
    };
    const path = picked ? pickedIconPath : defaultIconPath;
    const tabId = tab.id;
    if (isManifestV3) {
      ext.action.setIcon({ path, tabId });
    } else {
      ext.browserAction.setIcon({ path, tabId });
    }
  }

  onMount(() => {
    init();
  });

  const sleep = (t: number) => new Promise((r) => setTimeout(r, t));
  async function unused__initMock() {
    await sleep(200000);
    switchScreen('AfterSave');
  }

  function switchScreen(target: ScreenType) {
    screen = target;
  }

  function handleClickEdit() {
    switchScreen('Editing');
  }

  async function handleClickDelete() {
    if (!bookmark || !bookmark.id) {
      logger.error('Attempt to delete a bookmark without saving it');
      return;
    }

    deleteBookmarkServerSide(server, bookmark.id).then(
      (__ret) => {
        switchScreen('Dropped');
        updateIcon(false).catch(print);
      },
      (__err) => {
        // ignore
      }
    );
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
