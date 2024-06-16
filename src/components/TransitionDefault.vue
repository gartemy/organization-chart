<template>
    <transition
        appear
        :enter-active-class="enter"
        :leave-active-class="leave"
        :mode="mode"
    >
        <slot name="default" />
    </transition>
</template>

<script setup>
const props =  defineProps({
    enter: {
        type:    String,
        default: 'animated fadeIn',
    },
    leave: {
        type:    String,
        default: 'animated fadeOut',
    },
    mode:  {
        type:    String,
        default: 'out-in',
    },
})
</script>

<style scoped>
</style>
