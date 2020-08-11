<template>
  <div class="videos">
    <div class="videos__header">
      <h2 class="videos__header--h2">Videos of the Week</h2>
      <span class="videos__header--sub">10 videos</span>
      <div class="videos__header--navigation">
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
  </div>
</template>

<script>
export default {
  name: "Videos",
};
</script>

<style lang="scss" scoped>
.videos {
  flex-basis: 40%;
  padding-right: 8rem;

  &__header {
    position: relative;
    &--h2 {
      font-size: 2rem;
      color: #2d3436;
      margin-right: 3rem;
      margin-bottom: 0.7rem;
    }

    &--sub {
      color: rgba(45, 52, 54, 0.5);
      font-weight: 700;
      font-size: 1.4rem;
    }

    &--navigation {
      position: absolute;
      top: .5rem;
      right: 0;
      display: flex;
      align-items: center;

      & span {
        cursor: pointer;
        & svg {
          height: 2rem;
          width: 2rem;
          fill: #4b7bec;
        }

        &:nth-child(1) {
          & svg {
            fill: rgba(45, 52, 54, 0.5);
          }
        }
      }
    }
  }
}
</style>