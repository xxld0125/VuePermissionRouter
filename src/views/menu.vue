<template>
  <div class="home">
    <router-link v-for="(item, k) in state.routes" :key="k">{{
      item.name
    }}</router-link>
  </div>
</template>

<script>
export default {
  name: "MenuPage",
};
</script>
