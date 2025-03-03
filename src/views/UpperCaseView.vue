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

        <!-- Getenv section -->
        <div class="space-y-2">
            <label for="result2" class="block text-sm font-medium"> Result </label>
            <div class="relative">
                <input id="result2" type="text" :value="getenvResult" readonly
                    class="w-full p-2 border rounded-md bg-gray-50" />
                <button @click="copyToClipboard2"
                    class="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-md"
                    title="Copy to clipboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <span v-if="copySuccess2"
                        class="absolute -top-8 right-0 text-xs bg-black text-white px-2 py-1 rounded">
                        Copied!
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const input = ref('')
const copySuccess = ref(false)
const copySuccess2 = ref(false)

const uppercaseResult = computed(() => {
    return input.value.toUpperCase() + "="
})

const getenvResult = computed(() => {
    return `getenv('${input.value.toUpperCase()}')`
})

const keydownEvent = (event: KeyboardEvent) => {
    if (event.key == 'C' && event.shiftKey) {
        event.preventDefault()
        copyToClipboard()
    } else if (event.key == 'V' && event.shiftKey) {
        event.preventDefault()
        pasteToInput()
    } else if (event.key == 'B' && event.shiftKey) {
        event.preventDefault()
        copyToClipboard2()
    }
}

onMounted(() => {
    document.addEventListener('keydown', keydownEvent)
})

onUnmounted(() => {
    document.removeEventListener('keydown', keydownEvent)
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

const copyToClipboard2 = async () => {
    try {
        await navigator.clipboard.writeText(getenvResult.value)
        copySuccess2.value = true
        setTimeout(() => {
            copySuccess2.value = false
        }, 2000)
    } catch (err) {
        console.error('Failed to copy getenv: ', err)
    }
}

const pasteToInput = async () => {
    const inputElement = document.querySelector<HTMLInputElement>('#input')
    if (!inputElement) {
        throw new Error('input box is not found')
    }
    
    // Focus the input element if it's not already focused
    if (document.activeElement !== inputElement) {
        inputElement.focus();
    }
    
    // Create and dispatch a clipboard paste event
    navigator.clipboard.readText()
        .then(clipboardText => {
            // Option 1: Set the value directly
            inputElement.value = clipboardText;
            
            // Option 2: Trigger input event so any listeners know the value changed
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            
            // console.log('Text pasted via Shift+V:', clipboardText);
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
}
</script>

<style scoped>
/* Any additional custom styles can go here */
</style>
