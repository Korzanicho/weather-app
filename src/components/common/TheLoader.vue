<script setup lang="ts"></script>

<template>
  <div class="TheLoader">
    <div class="TheLoader__spinner"></div>
  </div>
</template>

<style lang="sass" scoped>
.TheLoader
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  width: 100%
  position: absolute
  top: 0
  left: 0
  z-index: 1000

  &__spinner
    border: 16px solid #1C1B33
    border-top: 16px solid #2E3358
    border-radius: 50%
    width: 120px
    height: 120px
    animation: spin 2s linear infinite

    @keyframes spin
      0%
        transform: rotate(0deg)
      100%
        transform: rotate(360deg)
</style>
