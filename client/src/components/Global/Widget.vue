<template>
  <v-layout class="white elevation-2" column>
    <v-flex class="pl-4 pr-4 pt-2 pb-2">
      <slot>No slot content defined.</slot>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
};
</script>

<style scoped>
.v-toolbar {
  opacity: 0.8;
}

.v-flex {
  background-color: #ddd7e5;
}
</style>
