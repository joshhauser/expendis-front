<script setup lang="ts"></script>

<template>
  <div class="col card">
    <div class="card-title w-full">
      <slot name="title"></slot>
    </div>
    <div class="card-content w-full">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/assets/styles/colors';

  .card {
    border: 1px solid lightgray;
    border-radius: 10px;
    overflow: scroll;
    height: 100%;

    .card-title {
      color: $e-green;
      border-bottom: 4px solid lightgray;
      font-weight: 500;
    }
  }
</style>
