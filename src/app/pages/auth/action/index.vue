<script setup lang="ts">
import SignInWithEmailLink from '~/components/SignInWithEmailLink.vue'
import {useRoute} from "vue-router";
const route = useRoute()

const mode = route.query?.mode
</script>

<template>
  <SignInWithEmailLink v-if="mode === 'signIn'" />
</template>
