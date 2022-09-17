<script lang="ts">
  import Modal from 'cherry/components/base/Modal.svelte';
  import { createEventDispatcher } from 'svelte';

  import ServerEditForm from './ServerEditForm.svelte';
  import type { ServerItemConfig } from './type';

  const EVENT = { open: 'open', close: 'close' };

  let modal: Modal;
  let item: ServerItemConfig;

  const dispatch = createEventDispatcher();

  export const open = (data: { item: ServerItemConfig }) => {
    item = { ...data.item };
    modal.open();
    dispatch(EVENT.open);
  };

  export const close = () => {
    modal.close();
    dispatch(EVENT.close);
  };
</script>

<Modal bind:this={modal}>
  <ServerEditForm {item} on:updatecompleted={close} />
</Modal>
