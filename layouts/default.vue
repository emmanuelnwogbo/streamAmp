<template>
  <div class="main">
    <Header />
    <Nuxt />
    <BottomBar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import BottomBar from "@/components/BottomBar";
export default {
  components: {
    Header,
    BottomBar,
  },
};
</script>

<style lang="scss">
// MEDIA QUERY MANAGER
/*
0 - 600px:      Phone
600 - 900px:    Tablet portrait
900 - 1200px:   Tablet landscape
[1200 - 1800] is where our normal styles apply
1800px + :      Big desktop
$breakpoint arguement choices:
- phone
- tab-port
- tab-land
- big-desktop
ORDER: Base + typography > general layout + grid > page layout > components
1em = 16px
*/
@keyframes moveInLeft {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@mixin respond($breakpoint) {
  @if $breakpoint == phone {
    @media only screen and (max-width: 37.5em) {
      @content;
    } //600px
  }
  @if $breakpoint == tab-port {
    @media only screen and (max-width: 56.25em) {
      @content;
    } //900px
  }
  @if $breakpoint == tab-land {
    @media only screen and (max-width: 75em) {
      @content;
    } //1200px
  }
  @if $breakpoint == big-desktop {
    @media only screen and (min-width: 112.5em) {
      @content;
    } //1800
  }
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;

  box-sizing: border-box;
  font-size: 62%;

  @include respond(tab-land) {
    // width < 1200?
    font-size: 56.25%; //1 rem = 9px, 9/16 = 50%
  }

  @include respond(tab-port) {
    // width < 900?
    font-size: 50%; //1 rem = 8px, 8/16 = 50%
  }

  @include respond(big-desktop) {
    font-size: 75%; //1rem = 12, 12/16
  }
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  word-spacing: 0.1rem;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.main {
  overflow: hidden;
  height: 96vh;
  width: 98vw;
  margin: 0 auto;
  position: relative;
  margin-top: 2rem;
  border-radius: 2.5rem;
  background: #fff;
}

audio {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  transform: translateX(-400vw);
  opacity: 0;
  display: none;
}

.playing {
  transform: scale(0.9) translateY(-10px);
  border: none;
  border-radius: 50% !important;
  backface-visibility: hidden;
  box-shadow: 1px 50px 50px -16px rgba(#4b7bec, 0.6) !important;

  &::after {
    content: "";
    clear: both;
    display: table;
  }
}

.spinning {
  animation: 3s linear 0s infinite normal none running spin;
  &::after {
    content: "";
    clear: both;
    display: table;
  }
}

.newconstraints {
  height: 8vw !important;
  width: 8vw !important;

  & figure {
    position: relative !important;
    height: 7.6vw !important;
    width: 7.6vw !important;
    border-radius: 50%;
  }
}

.invisible {
  display: none !important;
}
</style>
