<template>
  <div class="bottombar">
    <div class="bottombar__details">
      <div class="bottombar__details--image">
        <figure>
          <img :src="currentItem.artist_albumart_link || currentItem.album.images[2].url" alt />
        </figure>
      </div>
      <div class="bottombar__details--names">
        <span
          v-bind:class="{
          showcaseText: true,
          invisible: !isPlaying
        }"
        >{{ currentItem.artist_name || currentItem.artists[0].name }}</span>
        <span
          v-bind:class="{
          showcaseText: true,
          invisible: !isPlaying
        }"
        >{{ currentItem.artist_songname || currentItem.name}}</span>

        <span
          v-bind:class="{
          invisible: isPlaying
        }"
        >{{ currentItem.artist_name || currentItem.artists[0].name }}</span>
        <span
          v-bind:class="{
          invisible: isPlaying
        }"
        >{{ currentItem.artist_songname || currentItem.name}}</span>
      </div>
    </div>

    <div class="bottombar__nav">
      <div class="bottombar__nav--area bottombar__nav--left" @click="play_previous">
        <span></span>
      </div>
      <div class="bottombar__nav--area bottombar__nav--middle" @click="play_pause">
        <span :class="{
            invisible: isPlaying
          }"></span>
        <svg :class="{
            invisible: !isPlaying
          }">
          <use xlink:href="~assets/sprite.svg#icon-pause" />
        </svg>
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
        <div class="bottombar__track--line" ref="timeline">
          <input
            type="range"
            name="audio_seek"
            id="audio_seek"
            min="0"
            :max="max_range"
            v-model="seek_value"
            class="bottombar__track--input"
          />
          <span
            class="bottombar__track--knob"
            ref="timelineknob"
            v-bind:style="{
            transform: `translateY(-0.5rem) translateX(${play_percent_knob}px`
          }"
          ></span>
          <div
            class="bottombar__track--progress"
            v-bind:style="{
            width: `${play_percent}px`
          }"
          ></div>
        </div>
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
  data() {
    return {
      play_percent: 0,
      play_percent_knob: 0,
      seek_value: 0,
    };
  },
  computed: {
    timelineWidth() {
      const timelineWidth = this.$refs.timeline.offsetWidth;

      return timelineWidth;
    },
    knobWidth() {
      const knobWidth = this.$refs.timelineknob.offsetWidth;

      return knobWidth;
    },
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
    min_range() {
      return this.$store.getters.range_min;
    },
    max_range() {
      return this.$store.getters.range_max;
    },
  },
  watch: {
    audioInDOM: function (new_val, old_val) {
      if (old_val !== null && old_val != undefined) {
        old_val.load();
        old_val.pause();
      }
    },
    min_range: function (new_val, old_val) {
      if (new_val !== old_val) {
        this.play_percent =
          this.timelineWidth * (this.min_range / this.max_range);

        this.play_percent_knob =
          (this.timelineWidth - this.knobWidth) *
          (this.min_range / this.max_range);
      }
    },
    seek_value: function (new_val, old_val) {
      this.audioInDOM.currentTime = new_val;
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
    transform: translateY(0.8rem);
    width: 25rem;
    overflow: hidden;
    margin-right: 4rem;

    &--image {
      height: 6.7rem;
      width: 7rem;
      border-radius: 1rem;
      overflow: hidden;
      margin-right: 1.5rem;
      flex-shrink: 0;

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
      overflow: hidden;
      line-height: 2.1rem;
      flex-shrink: 0;

      &:hover > span.showcaseText {
        animation: none;
      }

      & span.showcaseText {
        animation: 5s linear 0s infinite normal none running moveInLeft;
      }

      & span.invisible {
        opacity: 0;
        display: none;
      }

      & span {
        display: block;
        transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
        backface-visibility: hidden;

        &::after {
          content: "";
          clear: both;
          display: table;
        }

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

        &:nth-child(3) {
          font-weight: 700;
          font-size: 1.7rem;
          text-transform: uppercase;
          margin-bottom: 0.1rem;
        }

        &:nth-child(4) {
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
    width: 11rem;
    margin-right: 4rem;
    transform: translateY(0.8rem);

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

      & svg {
        fill: #fff;
        height: 2rem;
        width: 2rem;
      }

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
    transform: translateY(0.8rem);

    &--time {
      margin: 0 1rem;
      width: 2rem;
    }
  }

  &__track {
    display: flex;
    align-items: center;
    transform: translateY(0.1rem);
    border-radius: 30rem;
    cursor: pointer;

    &--input {
      transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    &--line {
      position: relative;
      background: rgba(#4b7bec, 0.3);
      height: 0.4rem;
      width: 50rem;
      border-radius: 30rem;
      transition: all 0.3s ease;
    }

    &--knob {
      display: inline-block;
      border-radius: 50%;
      height: 1.5rem;
      width: 1.5rem;
      border: 0.3rem solid #4b7bec;
      background: #fff;
      cursor: pointer;
      position: absolute;
      transition: all 0.3s ease;
      top: 0;
      left: 0;
      transform: translateY(-0.5rem);
      z-index: 1;
      backface-visibility: hidden;

      &::after {
        content: "";
        clear: both;
        display: table;
      }
    }

    &--progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #4b7bec;
      transition: all 0.3s ease;
      border-radius: 30rem;
      z-index: 1;
    }
  }
}

input[type="range"] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: red; //transparent; /* Otherwise white in Chrome */
  background: transparent;
  //transform: translateY(-1rem);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 0.3rem solid #4b7bec;
  background: red;
  height: 1.5rem;
  width: 1.5rem;
  //opacity: 0;
}

input[type="range"]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type="range"]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
  transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  border: 0.3rem solid #4b7bec;
  background: #fff;
  cursor: pointer;
  //opacity: 0;
  transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-top: -0.5rem; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 0.3rem solid #4b7bec;
  background: #fff;
  //opacity: 0;
}

/* All the same stuff for IE */
input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 0.3rem solid #4b7bec;
  background: #fff;
  //opacity: 0;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 0.4rem;
  cursor: pointer;
  background: transparent; //rgba(255, 255, 255,.4);
  border-radius: 3rem;
  background: red;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: transparent; //rgba(255, 255, 255,.4);
  background: red;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 0.4rem;
  cursor: pointer;
  background: transparent; //rgba(255, 255, 255,.4);
  border-radius: 3rem;
  background: red;
}

input[type="range"]::-ms-track {
  width: 100%;
  height: 0.4rem;
  cursor: pointer;
  background: transparent; //rgba(255, 255, 255,.4);
  border-radius: 3rem;
  border-color: transparent;
  background: red;
}
</style>