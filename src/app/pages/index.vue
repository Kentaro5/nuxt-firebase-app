<script setup lang="ts">
import {onMounted} from 'vue';
import {
  collection, query,
  getDocs,
  getFirestore,
} from 'firebase/firestore'

definePageMeta({
  middleware: 'auth',
})

onMounted(() => {
  getTests()
})

async function getTests() {
  const db = getFirestore()
  console.log(db);
  const querySnapshot = await getDocs(query(collection(db, "tests")));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
</script>
<template>
  <div>
    <div>ログイン後のページ</div>
    <nuxt-link to="/signUp">新規登録</nuxt-link>
  </div>
</template>
