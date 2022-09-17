<script lang="ts">
  const EVENT = {
    updatecompleted: 'updatecompleted',
  };

  import { validate } from 'cherry/client/form.util';
  import Button from 'cherry/components/base/Button.svelte';
  import Field from 'cherry/components/base/Field.svelte';
  import Spinner from 'cherry/components/feedback/Spinner.svelte';
  import { createEventDispatcher } from 'svelte';

  import { fetchUserFromServer } from '$lib/shared/backend.util';
  import { createLogger, makeId } from '$lib/shared/common.util';

  import { extensionOptions } from './options.store';
  import type { ServerItemConfig } from './type';

  export let item: ServerItemConfig;
  const dispatch = createEventDispatcher();

  const logger = createLogger('options');

  function validateUrl(v: string) {
    try {
      new URL(v);
      return true;
    } catch (err) {
      return false;
    }
  }

  const rule = {
    apiBase: [{ validate: validateUrl, msg: 'Invalid Cherry API base URL' }],
    pat: [{ validate: (v: string) => v?.length > 10, msg: 'Invalid access token' }],
  };

  let error = {
    apiBase: '',
    pat: '',
  };

  let isLoading = false;

  async function onSubmit() {
    logger.info('onSubmit');
    const result = validate(rule, { apiBase: item.apiBase, pat: item.pat });
    if (result.error) {
      // @ts-ignore
      error = result.error;
      return;
    }

    // @ts-ignore
    let apiBase = result.value.apiBase as string;

    let u = new URL(apiBase);
    // we don't support deploy Cherry under sub-path of a domain
    // keep "origin" here only
    apiBase = u.origin;
    const value = { ...result.value, apiBase } as ServerItemConfig;
    try {
      isLoading = true;
      // we can do cross site request on "options" page
      const res = await fetchUserFromServer(value);
      // res.data.token res.data.user
      value.user = res.data.user;
    } catch (e) {
      error = { apiBase: '', pat: 'Invalid token' };
      return;
    } finally {
      isLoading = false;
    }

    extensionOptions.update((o) => {
      const server = o.servers.find((s) => s.key === item.key);
      if (!server) {
        const key = makeId();
        o.servers.push({ ...value, key });
      } else {
        for (let key in value) server[key] = value[key];
      }
      return o;
    });

    dispatch(EVENT.updatecompleted);
  }

  $: submitDisabled = !!error.apiBase || !!error.pat || item.apiBase === '' || item.pat === '';

  $: if (item.apiBase && item.pat) error.apiBase = '';
  $: if (item.apiBase && item.pat) error.pat = '';
</script>

<form on:submit|preventDefault={onSubmit}>
  <Field
    name="API base URL"
    bind:value={item.apiBase}
    placeholder="https://example.com"
    bind:error={error.apiBase}
  />
  <Field name="Personal Access Token" bind:value={item.pat} placeholder="" bind:error={error.pat} />
  <div class="action">
    <Button type="submit" disabled={submitDisabled}>
      {#if isLoading}
        <Spinner slot="icon" size={18} />
      {/if}
      <span>Save</span>
    </Button>
  </div>
</form>

<style lang="scss">
  .action {
    margin-top: 12px;
  }
</style>
