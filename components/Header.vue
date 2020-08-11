<template>
  <div class="header">
    <div class="header__search">
      <span class="header__search--icon">
        <svg>
          <use xlink:href="~assets/sprite.svg#icon-search1" />
        </svg>
      </span>
      <input
        type="text"
        class="header__search--input"
        id="search-bar"
        placeholder="Find an artist"
        @keypress="search_spotify"
      />
    </div>
    <div class="header__menu">
      <div class="header__menu--area" v-for="(item, index) in menuItems" :key="index">
        <span>{{ item }}</span>
        <span></span>
      </div>
    </div>
    <div class="header__darkmode">
      <span class="header__darkmode--btn">
        <svg>
          <use xlink:href="~assets/sprite.svg#icon-brightness_medium" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuItems: ["New Music", "Library", "Categories", "Advertise", "Genres"],
    };
  },
  computed: {
    artistID() {
      const artistID = this.$store.getters.spotify_artistID;
      return artistID;
    },
  },
  watch: {
    artistID: function (new_val, old_val) {
      if (old_val !== new_val) {
        this.$store.dispatch("getArtistSongs", new_val);
      }
    },
  },
  methods: {
    search_spotify(event) {
      const { key } = event;
      if (key === "Enter") {
        const search_term = event.target.value.trim().toLowerCase();
        event.target.value = "";
        this.$store.dispatch("getArtist", search_term);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  right: 0;
  height: 11rem;
  width: 85vw;
  padding: 1.2rem 3rem;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  align-items: center;
  background: #f5f6fa;

  &__search {
    border-radius: 3rem;
    background: #fff;
    overflow: hidden;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    height: 4.5rem;

    box-shadow: -1rem 0rem 9rem 1rem rgba(0, 0, 0, 0.1);

    &--icon {
      display: inline-block;
      margin-right: 1rem;

      & svg {
        height: 1.5rem;
        width: 1.5rem;
        fill: rgba(0, 0, 0, 0.4);
      }
    }

    &--input {
      height: 4.5rem;
      width: 45rem;
      font-size: 1.5rem;
      border: none;

      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
        font-weight: 500;
      }

      &:focus {
        border: none;
        outline: none;
      }
    }
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    width: 48rem;
    cursor: pointer;

    &--area {
      position: relative;
      font-size: 1.5rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.7);
      transition: all 0.3s ease-in;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:nth-child(1) {
        color: #4b7bec;

        & span {
          &:nth-child(2) {
            background: #4b7bec;
            bottom: 0;
            display: inline-block;
            left: 0;
            width: 40%;
            height: 0.22rem;
            border-radius: 70rem;
            transform: translateY(8px);
          }
        }
      }

      & span {
        transition: all 0.3s ease-in;
      }
    }
  }

  &__darkmode {
    &--btn {
      cursor: pointer;

      & svg {
        height: 2.5rem;
        width: 2.5rem;
      }
    }
  }
}
</style>