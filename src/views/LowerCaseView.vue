<template>
    <div class="lowercase">
        <h1>This is an about page</h1>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const input = ref('')
const copySuccess = ref(false)
const lowercaseResult = computed((): string => {
    return input.value.toUpperCase()
})

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(lowercaseResult.value)
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 2000)
    } catch (err) {
        console.error('Failed to copy text: ', err)
    }
}
</script>

<style>
@media (min-width: 1024px) {
    .lowercase {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
