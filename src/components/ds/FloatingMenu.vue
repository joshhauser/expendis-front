<script setup lang="ts">
  import { Utils } from '@/shared/utils';
  import { ref } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { useIconsStore } from '@/shared/stores/icons-store';
  import Tooltip from '@/components/ds/Tooltip.vue';
  import { useModalStore } from '@/shared/stores/modal-store';

  const props = withDefaults(
    defineProps<{
      actionButtonColor: string;
      menuItems: {
        label: string;
        backgroundColor: string;
        action: Function;
        iconKey: string;
        tooltip: string;
      }[];
      openingAnimation?: string;
      closingAnimation?: string;
    }>(),
    {
      openingAnimation: 'bounceIn',
      closingAnimation: 'bounceOut',
    }
  );

  const iconsStore = useIconsStore();
  const modalStore = useModalStore();

  const opened = ref(false);
  const animated = ref(false);
  let sleepTime = 900;

  function toggleMenu(animation: string, reverse: boolean, prefix = 'animate__') {
    return new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const animatedClassName = `${prefix}animated`;
      const reversedNodes = Array.from(document.querySelectorAll('.menu-btn'));
      let nodes = reverse ? reversedNodes : [];

      if (animated.value) {
        return;
      } else {
        animated.value = true;
      }

      if (reverse) {
        for (let node of nodes) {
          node.classList.add(animatedClassName, animationName);
          Utils.sleep(sleepTime);
        }
      } else {
        for (let node of reversedNodes) nodes.unshift(node);
        for (let node of nodes) {
          node.classList.add('visible');
          node.classList.add(`${prefix}animated`, animationName);
          Utils.sleep(sleepTime);
        }
      }

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event: Event) {
        event.stopPropagation();
        for (let node of nodes) {
          node.classList.remove(animatedClassName, animationName);
          if (reverse) node.classList.remove('visible');
        }
        resolve('Animation ended');
      }

      document.addEventListener('animationend', handleAnimationEnd, {
        once: true,
      });
    });
  }

  function openMenu() {
    toggleMenu(props.openingAnimation, false).then(() => {
      opened.value = true;
      animated.value = false;
    });
  }

  function closeMenu() {
    toggleMenu(props.closingAnimation, true).then(() => {
      opened.value = false;
      animated.value = false;
    });
  }

  function handleMenu() {
    if (opened.value) closeMenu();
    else openMenu();
  }

  const vClickOutside = {
    beforeMount: (el: any, binding: any) => {
      el.clickOutsideEvent = (event: any) => {
        // here I check that click was outside the el and his children
        if (!(el == event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          if (opened.value && !modalStore.isOpen) {
            binding.value.fct();
          }
        }
      };
      document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted: (el: any) => {
      document.removeEventListener('click', el.clickOutsideEvent);
    },
  };
</script>

<template>
  <!-- add animate css -->
  <div class="floating-menu" v-click-outside="{ fct: closeMenu }">
    <div class="menu-btns">
      <Tooltip v-for="item in menuItems" :text="item.tooltip">
        <button
          class="menu-btn"
          :style="{ backgroundColor: item.backgroundColor }"
          @click="item.action"
        >
          <span v-if="item.label">{{ item.label }}</span>
          <FontAwesomeIcon v-else :icon="item.iconKey" />
        </button>
      </Tooltip>
    </div>
    <button class="action-btn" @click="handleMenu">
      <FontAwesomeIcon class="text-base" :icon="iconsStore.getIcon('fas fa-bars')" />
    </button>
  </div>
</template>

<style scoped lang="scss">
  .floating-menu {
    width: max-content;
    position: fixed;
    bottom: 30px;
    right: 30px;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow:
        0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);

      &:hover {
        cursor: pointer;
      }
    }

    .action-btn {
      height: 50px;
      width: 50px;
      background-color: v-bind(actionButtonColor);
      border-radius: 100%;
      color: white;
      font-size: 1.5rem;
      border: none;
    }

    .menu-btns {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1rem;
      width: 100%;
      margin-bottom: 15px;
      gap: 10px;

      .menu-btn {
        display: none;

        &.visible {
          display: block;
          min-width: 35px;
          height: 35px;
          border-radius: 35px;
          color: white;
          border: none;
        }
      }
    }
  }
</style>
