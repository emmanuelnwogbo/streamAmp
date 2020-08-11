<template>
  <div class="container">
    <HomeSideBar />
    <MainContent />
    <div class="container__middle">
      <SearchedSongs />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HomeSideBar from "@/components/HomeSideBar";
import MainContent from "@/components/MainContent";
import SearchedSongs from "@/components/SearchedSongs";

export default {
  components: {
    HomeSideBar,
    MainContent,
    SearchedSongs,
  },
  computed: {
    artistID() {
      const artistID = this.$store.getters.spotify_artistID;
      return artistID;
    },
  },
  mounted() {
    this.$store.dispatch("getArtistSongs", this.artistID);
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: rgba(245, 246, 250,1.0);

  &::before {
    position: absolute;
    content: '';
    background: #f5f6fa;
    top: 0;
    right: 0;
    height: 100%;
    width: 2rem;
    z-index: 1;
  }
}
</style>
