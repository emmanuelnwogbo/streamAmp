<template>
  <div class="homesidebar">
    <div class="homesidebar__profile">
      <figure>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/602f4731226337.5646928c3633f.jpg"
          alt
        />
      </figure>
      <h2>Marta Hudson</h2>
      <span>mhudson@yahoo.com</span>
    </div>

    <div class="homesidebar__menu">
      <div class="homesidebar__menu--area">
        <span>
          <svg>
            <use xlink:href="~assets/sprite.svg#icon-radio" />
          </svg>
        </span>
        <span>Radio</span>
      </div>
      <div class="homesidebar__menu--area">
        <span>
          <svg>
            <use xlink:href="~assets/sprite.svg#icon-library_music" />
          </svg>
        </span>
        <span>My music</span>
      </div>
      <div class="homesidebar__menu--area">
        <span>
          <svg>
            <use xlink:href="~assets/sprite.svg#icon-profile-male" />
          </svg>
        </span>
        <span>Artists</span>
      </div>
      <div class="homesidebar__menu--area">
        <span>
          <svg>
            <use xlink:href="~assets/sprite.svg#icon-ondemand_video" />
          </svg>
        </span>
        <span>Video</span>
      </div>
      <div class="homesidebar__menu--area">
        <span>
          <svg>
            <use xlink:href="~assets/sprite.svg#icon-mic" />
          </svg>
        </span>
        <span>Podcast</span>
      </div>
      <div class="homesidebar__menu--area">
        <span>
          <svg>
            <use xlink:href="~assets/sprite.svg#icon-settings" />
          </svg>
        </span>
        <span>Settings</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeSideBar",
};
</script>

<style lang="scss" scoped>
.homesidebar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 12vw;
  //padding: 1.2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  text-align: center;
  border-right: 1px rgba(0, 0, 0, 0.1) solid;

  padding: 5.5rem 0;

  &__profile {
    display: flex;
    flex-direction: column;
    align-items: center;

    & figure {
      height: 7rem;
      width: 7rem;
      overflow: hidden;
      border-radius: 50%;
      margin-bottom: 1.2rem;

      & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    & h2 {
      color: rgba(45, 52, 54, 1);
    }

    & span {
      color: rgba(30, 39, 46, 0.8);
      font-weight: 500;
    }
  }

  &__menu {
    margin-top: 3rem;
    font-size: 1.48rem;
    padding-right: 1.5rem;
    width: 100%;

    &--area {
      width: 100%;
      border-radius: 0 0.3rem 0.3rem 0;
      margin: 2rem 0;
      padding: 1.3rem 0;
      color: #000000;
      font-weight: 500;
      cursor: pointer;
      text-align: start;
      padding-left: 3rem;
      display: flex;
      align-items: center;

      & span {
        &:nth-child(1) {
          display: inline-block;
          margin-right: 1.2rem;
        }

        &:nth-child(3) {
          padding: 0.1rem 1.1rem;
          border-radius: 3rem;
          margin-left: 1rem;
          color: #4b7bec;
          background: rgba(#4b7bec, 0.1);
        }
      }

      & svg {
        fill: rgba(209, 216, 224, 0.8);
        height: 2rem;
        width: 2rem;
      }

      &:nth-child(1) {
        background: #4b7bec;
        font-weight: 400;
        color: #fff;
        box-shadow: 0rem 1rem 3rem 0rem rgba(75, 123, 236, 0.4);
      }

      &:nth-child(6) {
        margin-top: 7vh;
      }
    }
  }
}
</style>