<script setup lang="ts">
</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <div class="shadow-md max-360-none space-y-2 p-4">
        <p>ログイン後のページ</p>
        <nuxt-link to="/sign-out" class="bg-green-400 block text-white rounded-sm px-4 py-2">ログアウト</nuxt-link>
        <nuxt-link to="/mypage">マイページ</nuxt-link>
      </div>
    </div>
  </div>
</template>
