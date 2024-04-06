import { defineStore } from 'pinia';

export const useTooltipStore = defineStore('tooltip-store', {
  state: (): {
    tooltipText: string;
    targetSize: { width: number; height: number };
  } => ({ tooltipText: '', targetSize: { width: 0, height: 0 } }),
  actions: {
    setTooltipText(tooltipText: string) {
      this.tooltipText = tooltipText;
    },
    resetTooltipText() {
      this.tooltipText = '';
    },
  },
  getters: {},
});
