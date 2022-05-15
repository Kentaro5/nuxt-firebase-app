<script setup lang="ts">
import {useSendSignLink, useSignIn} from "~/composables/auth"
import EmailInput from "~/components/formInputs/EmailInput.vue";
import PasswordInput from "~/components/formInputs/PasswordInput.vue";


const {email, password, signIn} = useSignIn(
    async (user) => {
      navigateTo('/')
    },
    (error) => {
      window.alert(error.message)
    }
);
</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <form class="shadow-md max-360-none space-y-2 p-4" @submit.prevent="signIn">
        <p class="text-center">ログインフォーム</p>
        <EmailInput v-model="email" />
        <PasswordInput v-model="password"/>
        <button class="bg-green-400 block text-white rounded-sm px-4 py-2" type="submit">ログイン</button>
        <NuxtLink to="/sign-up" class="block">新規登録</NuxtLink>
        <NuxtLink to="/reset-password" class="block">パスワード変更</NuxtLink>
      </form>
    </div>
  </div>
</template>
