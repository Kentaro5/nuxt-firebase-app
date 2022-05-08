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
    <label for="password">
      <slot name="label">パスワード</slot>
    </label>
    <input
        id="password"
        type="password"
        class="rounded-md border border-gray-500\/50"
        autocomplete="password"
        required
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
    />
    <slot name="small"></slot>
  </div>
</template>
