<template>
  <div class="searchedsongs"></div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchedSongs",
  computed: {
    artist() {
      const artist = this.$store.getters.spotify_artist;
      return artist;
    },
    tracks() {
      const tracks = this.$store.getters.spotify_tracks;
      return tracks;
    },
    artistID() {
      const artistID = this.$store.getters.spotify_artistID;
      return artistID;
    },
  },
  mounted() {},
};
</script>