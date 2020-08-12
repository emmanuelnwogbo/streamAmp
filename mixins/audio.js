export default {
  computed: {
    currentItem() {
      const item = this.$store.getters.current_item;

      return item;
    },
    playList() {
      const playlist = [
        ...this.$store.getters.db_artists,
        ...this.$store.getters.spotify_tracks.filter(
          item => item.preview_url !== null
        )
      ];

      return playlist;
    },
    audio() {
      return this.$store.getters.audio_item;
    },
    audioInDOM() {
      return this.$store.getters.audio_in_dom;
    },
    current_time() {
      return this.$store.getters.duration_current_time;
    },
    song_playing() {
      return this.$store.getters.playing;
    }
  },
  methods: {
    convertSeconds(sec) {
      let hrs = Math.floor(sec / 3600);
      let min = Math.floor((sec - hrs * 3600) / 60);
      let seconds = sec - hrs * 3600 - min * 60;
      seconds = Math.round(seconds * 100) / 100;

      let result = min < 10 ? min : min;
      if (seconds < 10) {
        result += ":0" + (seconds < 10 ? seconds : seconds);
      } else {
        result += ":" + (seconds < 10 ? seconds : seconds);
      }
      return result;
    },
    next_selected() {
      const current_item = this.playList.filter(item => {
        const item_link = item.preview_url || item.artist_songlink;
        return item_link === this.audio;
      })[0];

      return current_item;
    },
    play_next() {
      const current_item = this.next_selected();

      const next_item_index = this.playList.indexOf(current_item) + 1;
      const next_item = this.playList[next_item_index];
      this.$store.dispatch("pick_next_song", next_item);
    },
    pick_song(track, index) {
      this.$store.dispatch("pick_song", track);
    },
    update_time(e) {
      const { audioInDOM, convertSeconds } = this;

      if (
        audioInDOM != null &&
        !isNaN(audioInDOM.currentTime) &&
        !isNaN(audioInDOM.duration)
      ) {
        const time_object = {
          current_time: isNaN(audioInDOM.currentTime)
            ? "0:01"
            : `${convertSeconds(Math.floor(audioInDOM.currentTime))}`,
          duration: isNaN(audioInDOM.duration)
            ? "2:57"
            : `${convertSeconds(Math.floor(audioInDOM.duration))}`
        };
        this.$store.dispatch("update_time", time_object);
        this.$store.dispatch("set_min_range", `${audioInDOM.currentTime}`);
        this.$store.dispatch("set_max_range", `${audioInDOM.duration}`);
      }
    }
  }
};
