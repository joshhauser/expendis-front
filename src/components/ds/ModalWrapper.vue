<script setup lang="ts">
  import { useModalStore } from '@/shared/stores/modal-store';

  const store = useModalStore();
</script>

<template>
  <Teleport to="body">
    <Transition
      name="custom-classes"
      leave-to-class="animate__animated animate__fadeOut"
      enter-active-class="animate__animated animate__fadeIn"
    >
      <div
        class="modal-mask"
        v-if="store.modalState?.component"
        @click.self="store.modalState?.clickOutsideToClose ? store.closeModal() : null"
      >
        <div class="modal-container">
          <!--          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">OK</button>
            </slot>
          </div>-->

          <component :is="store.modalState?.component" v-bind="store.modalState?.props" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
  }

  .modal-container {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter-from {
    opacity: 0;
  }

  .animate__animated {
    &.animate__fadeIn,
    &.animate__fadeOut {
      --animate-duration: 0.3s;
    }
  }

  .modal-leave-to .modal-container {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
</style>
