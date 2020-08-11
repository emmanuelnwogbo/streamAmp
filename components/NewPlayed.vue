<template>
  <div class="newplayed">
    <div class="newplayed__header">
      <h2 class="newplayed__header--h2">New Played</h2>
      <span class="newplayed__header--times" v-for="(time, index) in times" :key="index">{{ time }}</span>
    </div>
    <div class="newplayed__header--lengthofSongs">
      <span>
        {{ searchedTracks.length ? searchedTracks.length : "" }} {{ searchedTracks.length ? "Songs from" : "" }}
        <span>{{ searchedTracks.length ? searchedTracks[0].artists[0].name : "" }}</span>
      </span>
    </div>

    <div class="newplayed__tiles">
      <div
        class="newplayed__tile"
        v-for="(track, index) in searchedTracks"
        :key="index"
        @click="pick_song(track, index)"
      >
        <div class="newplayed__tile--section newplayed__tile--left">
          <span class="newplayed__tile--playpause">
            <svg>
              <use xlink:href="~assets/sprite.svg#icon-pause" />
            </svg>
          </span>
          <figure class="newplayed__tile--figure">
            <img :src="track.album.images[2].url" alt class="newplayed__tile--img" />
          </figure>
          <div class="newplayed__tile--names">
            <span>{{ track.album.name }}</span>
            <span>{{ track.name }}</span>
          </div>
        </div>
        <div class="newplayed__tile--section newplayed__tile--right">
          <div
            class="newplayed__tile--time"
          >{{ audio === track.preview_url ? current_time.currentTime : '2:57' }}</div>
          <div class="newplayed__tile--heart">
            <span>
              <svg>
                <use xlink:href="~assets/sprite.svg#icon-heart2" />
              </svg>
            </span>
          </div>
          <div class="newplayed__tile--breadcrumb">
            <span>
              <svg>
                <use xlink:href="~assets/sprite.svg#icon-keyboard_control" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="newplayed__audios">
      <audio
        preload="auto"
        @ended="play_next"
        @timeupdate="update_time"
        v-for="(track, index) in searchedTracks"
        :key="index"
        :src="track.preview_url"
        :id="track.preview_url"
        class="newplayed__audios--audio"
      ></audio>
    </div>
  </div>
</template>

<script>
import audioMixin from "@/mixins/audio.js";

export default {
  name: "NewPlayed",
  data() {
    return {
      times: ["Today", "Week", "Month"],
    };
  },
  computed: {
    searchedTracks() {
      const tracks = this.$store.getters.spotify_tracks;
      return tracks.filter((item) => item.preview_url !== null);
    },
  },
  mixins: [audioMixin],
};
</script>

<style lang="scss" scoped>
.newplayed {
  flex-basis: 60%;

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    &--h2 {
      font-size: 2rem;
      color: rgba(45, 52, 54, 1);
      margin-right: 3rem;
    }

    &--times {
      padding: 0.3rem 1.1rem;
      border-radius: 3rem;
      margin-left: 1rem;
      font-weight: 500;
      background: rgba(#4b7bec, 0.1);
      color: rgba(45, 52, 54, 0.7);
      font-size: 1.2rem;
      cursor: pointer;

      &:nth-child(2) {
        color: #4b7bec;
      }
    }

    &--lengthofSongs {
      color: rgba(45, 52, 54, 0.5);
      font-weight: 700;
      font-size: 1.4rem;

      & span span {
        color: #2d3436;
      }
    }
  }

  &__tiles {
    display: flex;
    flex-direction: column;
    margin-top: 3.5rem;
  }

  &__tile {
    height: 7.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 1.5rem;
    background: rgba(99, 110, 114, 0.1);
    padding: 0 2rem;
    margin-bottom: 1rem;
    cursor: pointer;

    &--section {
      display: flex;
      align-items: center;
    }

    &--left {
    }

    &--playpause {
      display: inline-block;
      margin-right: 1.5rem;
      cursor: pointer;
      & svg {
        height: 2rem;
        width: 2rem;
        fill: rgba(30, 39, 46, 0.5);
      }
    }

    &--figure {
      height: 5rem;
      width: 5rem;
      overflow: hidden;
      border-radius: 1rem;
      margin-right: 1.5rem;

      & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &--names {
      display: flex;
      flex-direction: column;
      text-align: left;
      justify-content: center;
      font-weight: 500;
      line-height: 2.2rem;

      & span:nth-child(1) {
        font-weight: 700;
        font-size: 1.5rem;
      }

      & span:nth-child(2) {
        font-size: 1.2rem;
      }
    }

    &--time {
      font-weight: 500;
      margin-right: 4rem;
      font-size: 1.3rem;
      transform: translateY(-0.2rem);
    }

    &--heart {
      margin-right: 2rem;
      cursor: pointer;
      & span {
        & svg {
          height: 1.3rem;
          width: 1.3rem;
          fill: #4b7bec;
        }
      }
    }

    &--breadcrumb {
      & span {
        & svg {
          height: 2rem;
          width: 2rem;
          fill: black;
          cursor: pointer;
        }
      }
    }
  }
}
</style>