<template>
  <div class="bottombar">
    <div class="bottombar__details">
      <div class="bottombar__details--image">
        <figure>
          <img :src="currentItem.artist_albumart_link || currentItem.album.images[2].url" alt />
        </figure>
      </div>
      <div class="bottombar__details--names">
        <span>{{ currentItem.artist_name || currentItem.artists[0].name }}</span>
        <span>{{ currentItem.artist_songname || currentItem.name}}</span>
      </div>
    </div>

    <div class="bottombar__nav">
      <div class="bottombar__nav--area bottombar__nav--left" @click="play_previous">
        <span></span>
      </div>
      <div class="bottombar__nav--area bottombar__nav--middle" @click="play_pause">
        <span></span>
      </div>
      <div class="bottombar__nav--area bottombar__nav--right" @click="play_next">
        <span></span>
      </div>
    </div>

    <div class="bottombar__timetrack">
      <div class="bottombar__timetrack--time">
        <p>{{ current_time.currentTime }}</p>
      </div>
      <div class="bottombar__track">
        
      </div>
      <div class="bottombar__timetrack--time">
        <p>{{ current_time.duration }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  computed: {
    currentItem() {
      const item = this.$store.getters.current_item;

      return item;
    },
    playList() {
      const playlist = [
        ...this.$store.getters.db_artists,
        ...this.$store.getters.spotify_tracks.filter(
          (item) => item.preview_url !== null
        ),
      ];

      return playlist;
    },
    audio() {
      return this.$store.getters.audio_item;
    },
    audioInDOM() {
      return this.$store.getters.audio_in_dom;
    },
    isPlaying() {
      return this.$store.getters.is_audio_playing;
    },
    current_time() {
      return this.$store.getters.duration_current_time;
    },
  },
  watch: {
    audioInDOM: function (new_val, old_val) {
      if (old_val !== null && old_val != undefined) {
        old_val.load();
        old_val.pause();
      }
    },
  },
  methods: {
    next_selected() {
      const current_item = this.playList.filter((item) => {
        const item_link = item.preview_url || item.artist_songlink;
        return item_link === this.audio;
      })[0];

      return current_item;
    },
    play_pause() {
      this.$store.dispatch("pick_song", this.currentItem);
    },
    play_next() {
      const current_item = this.next_selected();

      const next_item_index = this.playList.indexOf(current_item) + 1;
      const next_item = this.playList[next_item_index];
      this.$store.dispatch("pick_next_song", next_item);
    },
    play_previous() {
      const current_item = this.next_selected();

      const next_item_index = this.playList.indexOf(current_item) - 1;
      const next_item = this.playList[next_item_index];
      this.$store.dispatch("pick_next_song", next_item);
    },
  },
};
</script>

<style lang="scss" scoped>
.bottombar {
  position: absolute;
  bottom: 0;
  background: #fff;
  width: 100%;
  height: 8rem;
  left: 0;

  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.3);
  z-index: 2;

  &__details {
    display: flex;
    align-items: center;
    background: deepskyblue;
    min-width: 20rem;

    &--image {
      height: 6.7rem;
      width: 7rem;
      border-radius: 1rem;
      overflow: hidden;
      margin-right: 1.5rem;

      & figure {
        height: 100%;
        width: 100%;
        overflow: hidden;

        & img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
    }

    &--names {
      line-height: 2.1rem;
      & span {
        display: block;

        &:nth-child(1) {
          font-weight: 700;
          font-size: 1.7rem;
          text-transform: uppercase;
          margin-bottom: 0.1rem;
        }

        &:nth-child(2) {
          font-weight: 500;
          font-size: 1.4rem;
        }
      }
    }
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: midnightblue;
    width: 11rem;

    &--area {
      height: 3rem;
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    &--left {
      & span {
        transform: rotate(180deg);
        width: 0;
        height: 0;
        border-top: 0.7rem solid transparent;
        border-left: 1rem solid rgba(30, 39, 46, 0.3);
        border-bottom: 0.7rem solid transparent;
        display: block;
        transition: all 0.3s ease;
      }
    }

    &--middle {
      border-radius: 100%;
      background: rgba(87, 95, 207, 1);
      padding-top: 1.433px;

      & span {
        transform: translateX(0.1rem) rotate(1deg);
        width: 0;
        height: 0;
        border-top: 0.7rem solid transparent;
        border-left: 1rem solid #fff;
        border-bottom: 0.7rem solid transparent;
        display: block;
        transition: all 0.3s ease;
      }
    }

    &--right {
      & span {
        width: 0;
        height: 0;
        border-top: 0.7rem solid transparent;
        border-left: 1rem solid rgba(30, 39, 46, 0.3);
        border-bottom: 0.7rem solid transparent;
        display: block;
        transition: all 0.3s ease;
      }
    }
  }

  &__timetrack {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 1.3rem;
  }
}
</style>