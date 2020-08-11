<template>
  <div class="maincontent">
    <NewReleases />
    <Sections />
  </div>
</template>

<script>
import NewReleases from "@/components/NewReleases";
import Sections from "@/components/Sections";

export default {
  name: "MainContent",
  components: {
    NewReleases,
    Sections,
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.maincontent {
  position: relative;
  width: 86vw;
  padding: 11.5rem 3rem 0 3rem;
  overflow: scroll;

  transform: translateX(10px);
}
</style>