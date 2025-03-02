<template>
    <div class="max-w-md p-6 mx-auto space-y-4">
        <!-- Input section -->
        <div class="space-y-2">
            <label for="inputTextArea" class="block text-sm font-medium"> Input Text </label>
            <textarea id="inputTextArea" type="text" v-model="input" class="w-full p-2 border rounded-md"
                placeholder="Type something..."></textarea>
        </div>

        <!-- Result section -->
        <div class="space-y-2">
            <label for="result" class="block text-sm font-medium"> Result </label>
            <div class="relative">
                <input id="result" type="text" :value="flattenResult" readonly
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
import { computed, onMounted, onUnmounted, ref } from 'vue'

const input = ref('')
const copySuccess = ref(false)

const flattenResult = computed(() => {
    return input.value.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/g, ' ')
})
const keydownEvent = (event: KeyboardEvent) => {
    if (event.key == 'C' && event.shiftKey) {
        event.preventDefault()
        copyToClipboard()
    } else if (event.key == 'V' && event.shiftKey) {
        event.preventDefault()
        pasteToInput()
    }
}

onMounted(() => document.addEventListener('keydown', keydownEvent))
onUnmounted(() => document.removeEventListener('keydown', keydownEvent))

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(flattenResult.value)
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 2000)
    } catch (err) {
        console.error('Failed to copy text: ', err)
    }
}

const pasteToInput = async () => {
    const inputElement = document.querySelector<HTMLInputElement>('#inputTextArea')
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