<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label for="email">
      <slot name="label">メールアドレス</slot>
    </label>
    <input
        id="email"
        type="email"
        class="rounded-md border border-gray-500\/50"
        autocomplete="email"
        required
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
    />
    <slot name="small"></slot>
  </div>
</template>
