<script setup lang="ts">
import {useSendSignLink} from "~/composables/auth"
import EmailInput from "~/components/formInputs/EmailInput.vue";
definePageMeta({
  middleware: 'auth',
})

const {email, sendSignInLink} = useSendSignLink();
</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <form class="shadow-md max-360-none space-y-2 p-4" @submit.prevent="sendSignInLink">
        <p class="text-center">新規登録フォーム</p>
        <EmailInput v-model="email" />
        <button class="bg-green-400 block text-white rounded-sm px-4 py-2" type="submit">登録</button>
      </form>
    </div>
  </div>
</template>
