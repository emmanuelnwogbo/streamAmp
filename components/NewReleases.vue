<template>
  <div class="newreleases">
    <div class="newreleases__top">
      <div class="newreleases__headers">
        <h2 class="newreleases__headers--h2">New Releases</h2>
        <span class="newreleases__headers--sub">{{artists.length}} Songs</span>
      </div>

      <div class="newreleases__navigation">
        <span>
          <svg>
            <use xlink:href="~assets/sprite.svg#icon-keyboard_arrow_left" />
          </svg>
        </span>
        <span>
          <svg>
            <use xlink:href="~assets/sprite.svg#icon-keyboard_arrow_right" />
          </svg>
        </span>
      </div>
    </div>
    <div class="newreleases__songs">
      <div class="newreleases__slide" v-for="(slide, index) in songSlides" :key="index">
        <div
          @click="pick_song(artist, index)"
          class="newreleases__card"
          v-for="(artist, index) in organise_slides(slide)"
          :key="index"
        >
          <figure class="newreleases__card--figure">
            <img :src="artist.artist_albumart_link" :alt="artist.artist_songname" />
          </figure>
        </div>
      </div>
    </div>
    <div class="newreleases__audios">
      <audio
        preload="auto"
        @ended="play_next"
        @timeupdate="update_time"
        v-for="(artist, index) in artists"
        :key="index"
        :src="artist.artist_songlink"
        :id="artist.artist_songlink"
        class="newreleases__audios--audio"
      ></audio>
    </div>
  </div>
</template>

<script>
import artists from "@/assets/artists.js";
import audioMixin from "@/mixins/audio.js";

export default {
  name: "NewReleases",
  data() {
    return {
      artists,
      artistsLength: artists.length,
      limitCardSlide: 10,
      currentSongLink: null,
      currentSongIndex: null,
      playing: false,
    };
  },
  computed: {
    currentItem() {
      const item = this.$store.getters.current_item;

      return item;
    },
    songSlides() {
      const numOfSlides = this.artistsLength / this.limitCardSlide;
      const songsSlidesArr = Array.from(Array(numOfSlides).keys());

      const songSlides = songsSlidesArr.map((item) => {
        if (item === 0) {
          return (item += this.limitCardSlide);
        } else {
          return item * 2 * this.limitCardSlide;
        }
      });

      return songSlides;
    },
  },
  methods: {
    organise_slides(limit) {
      const slide = [];
      this.artists.forEach((artist) => {
        this.artists.indexOf(artist) < limit &&
        this.artists.indexOf(artist) > limit - this.limitCardSlide
          ? slide.push(artist)
          : "";
      });

      return slide;
    },
  },
  mixins: [audioMixin],
  mounted() {},
};
</script>

<style lang="scss" scoped>
.newreleases {
  position: relative;
  overflow: hidden;
  z-index: 1;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__headers {
    line-height: 2.5rem;

    &--h2 {
      font-size: 2.5rem;
      color: rgba(45, 52, 54, 1);
    }
    &--sub {
      color: rgba(45, 52, 54, 0.5);
      font-weight: 600;
      font-size: 1.5rem;
    }
  }

  &__navigation {
    & span {
      cursor: pointer;

      & svg {
        height: 2.5rem;
        width: 2.5rem;
        fill: #4b7bec;
      }

      &:nth-child(1) {
        & svg {
          fill: rgba(45, 52, 54, 0.5);
        }
      }
    }
  }

  &__songs {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    overflow: hidden;
    width: 82vw;
  }

  &__slide {
    width: 85vw;
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    height: 27rem;
  }

  &__card {
    margin-right: 2.3rem;
    position: relative;
    height: 8vw;
    width: 7.7vw;
    border-radius: 2rem;
    overflow: hidden;
    cursor: pointer;

    &:not(:last-child) {
      -webkit-box-shadow: 1px 50px 50px -16px rgba(0, 0, 0, 0.43);
      box-shadow: 1px 50px 50px -16px rgba(0, 0, 0, 0.43);
    }

    &:nth-child(1) {
      -webkit-box-shadow: 33px 50px 50px -16px rgba(0, 0, 0, 0.43);
      box-shadow: 33px 50px 50px -16px rgba(0, 0, 0, 0.43);
    }

    &:nth-last-child(1) {
      -webkit-box-shadow: -37px 50px 50px -16px rgba(0, 0, 0, 0.43);
      box-shadow: -37px 50px 50px -16px rgba(0, 0, 0, 0.43);
    }

    &--figure {
      position: absolute;
      top: 0;
      left: 0;
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
}
</style>