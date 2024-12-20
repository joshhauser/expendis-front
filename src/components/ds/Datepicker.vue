<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { Utils } from '@/shared/utils';

  // selectedDate is current date by default
  const selectedDate = new Date();

  const calendar = ref<(number | undefined)[][]>([]);
  const selectedYear = ref<number>(selectedDate.getFullYear());
  const selectedMonth = ref<number>(selectedDate.getMonth());
  const selectedDay = ref<number>(selectedDate.getDate());

  const setCalendar = () => {
    // Reset calendar value
    calendar.value = [];
    const daysInSelectedMonth =
      32 - new Date(selectedYear.value, selectedMonth.value, 32).getDate();

    let calendarDayIndex = -1;
    let calendarWeekIndex = 0;

    calendar.value.push([]);
    for (let i = 1; i <= daysInSelectedMonth + 1; i++) {
      const date = new Date(selectedYear.value, selectedMonth.value, i);
      const day = date.getDate();
      calendarDayIndex = date.getDay();

      calendar.value[calendarWeekIndex][calendarDayIndex] = day;

      if (calendarDayIndex == 6) {
        calendarWeekIndex++;
        calendar.value.push([]);
      }
    }

    if (calendarDayIndex < 6) {
      for (let i = calendarDayIndex; i <= 6; i++) {
        calendar.value[calendarWeekIndex][i] = undefined;
      }
    }
  };

  const selectPreviousMonth = () => {
    if (selectedMonth.value == 0) {
      selectedYear.value--;
      selectedMonth.value = 11;
    } else {
      selectedMonth.value--;
    }
  };

  const selectNextMonth = () => {
    if (selectedMonth.value == 11) {
      selectedYear.value++;
      selectedMonth.value = 0;
    } else {
      selectedMonth.value++;
    }
  };

  const selectDay = (day: number) => {
    selectedDay.value = day;
  };

  watch(
    () => [selectedMonth.value, selectedYear.value],
    () => {
      setCalendar();
    }
  );

  onMounted(() => {
    setCalendar();
  });
</script>

<template>
  <div class="col-3 datepicker-container">
    <div class="flex flex-column">
      <div class="flex justify-content-between">
        <button @click="selectPreviousMonth()">&lt;</button>
        <div>{{ Utils.months[selectedMonth] }} {{ selectedYear }}</div>
        <button @click="selectNextMonth()">&gt;</button>
      </div>
      <div class="flex gap-1">
        <div class="col day-label">Sun</div>
        <div class="col day-label">Mon</div>
        <div class="col day-label">Tue</div>
        <div class="col day-label">Wed</div>
        <div class="col day-label">Thu</div>
        <div class="col day-label">Fri</div>
      </div>
      <div class="flex" v-for="(week, weekIndex) in calendar" :key="weekIndex">
        <div
          class="col day"
          :class="{ selected: day == selectedDay, selectable: day != undefined }"
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          @click="day ? selectDay(day) : null"
        >
          <template v-if="day != undefined">{{ day }}</template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/styles/colors';

  .datepicker-container {
    max-height: 100%;
  }

  button {
    &:hover {
      cursor: pointer;
    }
  }

  .col {
    user-select: none;
    text-align: center;
  }

  .day {
    &.selectable:not(.selected) {
      cursor: pointer;
    }

    &.selected {
      background: $e-green;
      color: white;
    }
  }
</style>
