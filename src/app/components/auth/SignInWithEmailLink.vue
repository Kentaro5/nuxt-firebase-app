<script setup lang="ts">
import EmailInput from "~/components/formInputs/EmailInput.vue";
import PasswordInput from "~/components/formInputs/PasswordInput.vue";
import {useSignUp} from "~/composables/auth";

const { email, password, userName, signUp } = useSignUp(
  async (user) => {
    const idToken = await user.getIdToken()
    const url = new URL(window.location.origin)
    url.pathname = '/'
    url.searchParams.append('idToken', idToken)
    const redirectUrl = new URLSearchParams(window.location.search).get('redirectUrl')
    if (redirectUrl !== null) {
      url.searchParams.append('redirectUrl', redirectUrl)
    }
    const continueUrl = new URLSearchParams(window.location.search).get('continueUrl')
    if (continueUrl !== null) {
      const redirectUrl = new URL(continueUrl).searchParams.get('redirectUrl')
      if (redirectUrl !== null) {
        url.searchParams.append('redirectUrl', redirectUrl)
      }
    }
    window.location.href = url.toString()
  }
);

</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <form class="shadow-md max-360-none space-y-2 p-4" @submit.prevent="signUp">
        <p class="text-center">ユーザー情報登録</p>
        <label for="name">
          <slot name="label">ユーザー名</slot>
        </label>
        <input
            id="name"
            type="text"
            class="rounded-md border border-gray-500\/50"
            required
            :value="userName"
        />
        <EmailInput v-model="email">
          <template #small>
            <p>確認のため、メールアドレスを再入力してください</p>
          </template>
        </EmailInput>
        <PasswordInput v-model="password"/>
        <button class="bg-green-400 block text-white rounded-sm px-4 py-2" type="submit">登録</button>
      </form>
    </div>
  </div>
</template>
