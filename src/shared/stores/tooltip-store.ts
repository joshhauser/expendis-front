import { defineStore } from 'pinia';

export const useTooltipStore = defineStore('tooltip-store', {
  state: (): {
    tooltipText: string;
    targetSize: { width: number; height: number };
  } => ({ tooltipText: '', targetSize: { width: 0, height: 0 } }),
  actions: {
    setTooltip(tooltipText: string) {
      this.tooltipText = tooltipText;
    },
  },
  getters: {},
});
