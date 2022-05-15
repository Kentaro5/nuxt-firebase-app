<script setup lang="ts">
import SignInWithEmailLink from '~/components/auth/SignInWithEmailLink.vue'
import ResetPassword from '~/components/auth/ResetPassword.vue'
import {useRoute} from "vue-router";
const route = useRoute()

const mode = route.query?.mode
</script>

<template>
  <SignInWithEmailLink v-if="mode === 'signIn'" />
  <ResetPassword v-else-if="mode === 'resetPassword'" />
</template>
