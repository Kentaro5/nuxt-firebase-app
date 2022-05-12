<script setup lang="ts">
import {useSignOut} from '~/composables/auth'

const {signOut} = useSignOut(() => {
  const url = '/sign-in'
  window.location.href = url.toString()
})

await signOut()
</script>
<template>
  <div>
  </div>
</template>
