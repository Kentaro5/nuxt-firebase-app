<script setup lang="ts">
import { useSignOut } from '~/composables/auth'
console.log('ログイン後のページ')
const { signOut } = useSignOut()
</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <div class="shadow-md max-360-none space-y-2 p-4">
        <p>マイページ</p>
        <nuxt-link to="/">top</nuxt-link>
      </div>
    </div>
  </div>
</template>
