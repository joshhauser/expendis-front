import { defineStore } from 'pinia';

// eslint-disable-next-line vue/prefer-import-from-vue
import { extend } from '@vue/shared';
import { markRaw } from 'vue';

const component = extend({});
type VueComponent = InstanceType<typeof component>;

export interface ModalProps {
  component: null | VueComponent;
  props?: object;
  clickOutsideToClose?: boolean;
}

export interface ModalState {
  modalState: ModalProps;
  isOpen: boolean;
}

const defaultState = { component: null, props: {} };

export const useModalStore = defineStore('modal-store', {
  state: (): ModalState => ({ modalState: defaultState, isOpen: false }),
  actions: {
    openModal(payload: ModalProps) {
      const { props, component, clickOutsideToClose } = payload;
      this.modalState = {
        component: markRaw(component),
        props: props || {},
        clickOutsideToClose: clickOutsideToClose || true,
      };
      this.isOpen = true;
    },

    closeModal() {
      this.modalState = defaultState;
      this.isOpen = false;
    },
  },
  getters: {},
});
