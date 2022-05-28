<script setup lang="ts">
import {useSendSignLink, useTwitterSignUp} from '~/composables/auth'
import EmailInput from '~/components/formInputs/EmailInput.vue'
import {FirebaseAuthSignInWithPopupErrors} from "~/composables/enums/firebase";

const { email, sendSignInLink } = useSendSignLink()
const {twitterSignUp} = useTwitterSignUp(
    () => {
      // ログイン後のページへ遷移させる
      navigateTo('/')
    },
    (error) => {
      if (FirebaseAuthSignInWithPopupErrors.PopUpClosedByUser === error.code) {
        alert('ユーザーによって閉じられました。');
      }
      console.log(error);
    }
)
</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <div class="shadow-md max-360-none space-y-2 p-4">
        <p class="text-center">新規登録フォーム</p>
        <form @submit.prevent="sendSignInLink">
          <EmailInput v-model="email" />
          <button class="bg-green-400 block text-white rounded-sm px-4 py-2" type="submit">登録</button>
        </form>
        <form @submit.prevent="twitterSignUp">
          <button class="bg-blue-400 block text-white rounded-sm px-4 py-2" type="submit">Twitterログインポップアップ</button>
        </form>
      </div>
    </div>
  </div>
</template>
