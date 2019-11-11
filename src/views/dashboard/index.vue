<style scoped lang="scss">
</style>

<template>
  <div class="home-container">
    dashboard
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class dashboard extends Vue {

  created() {
    console.log(123);
  }
  
  private activated() {
    console.log(2);
  }

  private deactivated() {console.log(4);}
}
</script>


