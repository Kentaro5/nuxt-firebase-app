<script setup lang="ts">
import { useSignOut } from '~/composables/auth'
console.log('ログイン後のページ')
const { signOut } = useSignOut()
</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <div class="shadow-md max-360-none space-y-2 p-4">
        <p>ログイン後のページ</p>
        <form class="" @submit.prevent="signOut">
          <button class="bg-green-400 block text-white rounded-sm px-4 py-2" type="submit">ログアウト</button>
        </form>
      </div>
    </div>
  </div>
</template>
