<template>
  <div class="sections">
    <NewPlayed />
  </div>
</template>

<script>
import HomeSideBar from "@/components/NewPlayed";
export default {
  name: "Sections",
  components: {
    HomeSideBar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.sections {
  position: relative;
  transform: translateY(-9rem);
  display: flex;
  min-height: 42rem;
  z-index: 2;
  width: 100%;
}
</style>