import { defineStore } from 'pinia';

export const useIconsStore = defineStore('iconsStore', {
  state: (): { [key: string]: any } => {
    return { icons: {} };
  },
  getters: {
    getIcon(state) {
      return (iconKey: string) => state.icons[iconKey];
    },
  },
  actions: {
    addIcon(newIcons: { iconKey: string; iconObject: any }[]) {
      for (const icon of newIcons) {
        this.icons[icon.iconKey] = icon.iconObject;
      }
    },
  },
});
