<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <div class="" @submit.prevent="signIn">
        <p>ログイン後のページ</p>
        <button class="bg-green-400 block text-white rounded-sm px-4 py-2" type="submit">ログアウト</button>
      </div>
    </div>
  </div>
</template>
