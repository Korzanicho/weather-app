<script setup lang="ts"></script>

<template>
  <div class="TheBox">
    <h2 class="TheBox__header">
      <slot name="header"></slot>
    </h2>
    <div class="TheBox__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.TheBox
	border: 1px solid #FFFFFF
	border-radius: 22px
	padding: .5rem
	position: relative

	&__header
		color: grey
		font-size: .8rem
		font-weight: 600
		text-transform: uppercase
		padding: 0
		text-align: center
		margin: 0

	&__content
		top: 0
		left: 0
		width: 100%
		height: 100%
		display: flex
		padding: .5rem
		text-align: center
		position: absolute
		align-items: center
		justify-content: center
</style>
