<template>
    <div class="max-w-md p-6 mx-auto space-y-4">
        <!-- Input section -->
        <div class="space-y-2">
            <label for="input" class="block text-sm font-medium"> Input Text </label>
            <input id="input" type="text" v-model="input" class="w-full p-2 border rounded-md"
                placeholder="Type something..." />
        </div>

        <!-- Result section -->
        <div class="space-y-2">
            <label for="result" class="block text-sm font-medium"> Result </label>
            <div class="relative">
                <input id="result" type="text" :value="uppercaseResult" readonly
                    class="w-full p-2 border rounded-md bg-gray-50" />
                <button @click="copyToClipboard"
                    class="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-md"
                    title="Copy to clipboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <span v-if="copySuccess"
                        class="absolute -top-8 right-0 text-xs bg-black text-white px-2 py-1 rounded">
                        Copied!
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const input = ref('')
const copySuccess = ref(false)

const uppercaseResult = computed(() => {
    return input.value.toUpperCase() + "="
})

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(uppercaseResult.value)
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 2000)
    } catch (err) {
        console.error('Failed to copy text: ', err)
    }
}
</script>

<style scoped>
/* Any additional custom styles can go here */
</style>
