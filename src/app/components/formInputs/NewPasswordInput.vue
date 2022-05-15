<script setup lang="ts">
const props = defineProps({
  password: {
    type: String,
    required: true,
  },
  confirm: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:password', 'update:confirm'])

const onInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  if (!target.validity.customError && props.password !== target.value) {
    target.setCustomValidity('再入力されたパスワードが一致しません')
  }
  if (target.validity.customError && props.password === target.value) {
    target.setCustomValidity('')
  }
  emit('update:confirm', target.value)
}
</script>

<template>
  <div>
    <label>パスワード</label>
    <input
        class="rounded-md border border-gray-500\/50"
        type="password"
        autocomplete="password"
        required
        minlength="8"
        :value="password"
        @input="emit('update:password', $event.target.value)"
    />
  </div>
  <div>
    <label>パスワード(再入力)</label>
    <input
        class="rounded-md border border-gray-500\/50"
        type="password"
        autocomplete="password"
        required
        minlength="8"
        :value="confirm"
        @input="onInput"
    />
  </div>
</template>
