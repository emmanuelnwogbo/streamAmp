<template>
  <div class="sections">
    <Videos />
    <NewPlayed />
  </div>
</template>

<script>
import HomeSideBar from "@/components/NewPlayed";
import Videos from "@/components/Videos";
export default {
  name: "Sections",
  components: {
    HomeSideBar,
    Videos,
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