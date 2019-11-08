<style scoped lang="scss">
</style>

<template>
  <div class="home-container">
    edit
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class UserEdit extends Vue {

  created() {
    console.log(1);
  }
  
  private activated() {
    console.log(2);
  }
  private deactivated() {
    console.log(4);
  }
}
</script>


