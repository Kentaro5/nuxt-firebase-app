<script setup lang="ts">
import EmailInput from "~/components/formInputs/EmailInput.vue";
import NewPasswordInput from "~/components/formInputs/NewPasswordInput.vue";
import {useResetPassword, useSignUp} from "~/composables/auth";
import {navigateTo, useRoute} from "#app";

const route = useRoute()
const oobCode = route.query?.oobCode
if (typeof oobCode !== 'string') {
  throw new Error()
}

const { email, password, confirm, resetPassword } = useResetPassword(
    oobCode,
    () => {
      navigateTo('/sign-in')
    },
    (error) => {
      window.alert(error.message)
    }
);

</script>
<template>
  <div>
    <div class="flex place-content-center items-center">
      <form class="shadow-md max-360-none space-y-2 p-4" @submit.prevent="resetPassword">
        <EmailInput v-model="email">
          <template #small>
            <p>確認のため、メールアドレスを再入力してください</p>
          </template>
        </EmailInput>
        <NewPasswordInput v-model:password="password" v-model:confirm="confirm"/>
        <button class="bg-green-400 block text-white rounded-sm px-4 py-2" type="submit">登録</button>
      </form>
    </div>
  </div>
</template>
