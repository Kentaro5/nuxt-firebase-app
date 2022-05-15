<script setup lang="ts">
import {useResetPasswordLink} from "~/composables/auth";
import EmailInput from '~/components/formInputs/EmailInput.vue'
import {navigateTo} from "#app";

const { email, sendResetPasswordLink } = useResetPasswordLink(
    () => {
      navigateTo()
    }
)
</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <form class="shadow-md max-360-none space-y-2 p-4" @submit.prevent="sendResetPasswordLink">
        <p class="text-center">パスワード変更フォーム</p>
        <EmailInput v-model="email"/>
        <button class="bg-green-400 block text-white rounded-sm px-4 py-2" type="submit">パスワード変更</button>
      </form>
    </div>
  </div>
</template>
