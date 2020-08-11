import artists from "@/assets/artists.js";

const audioStore = {
  state: {
    artists,
    currentItem: artists[0],
    currentSongIndex: null,
    playing: false,
    audio: artists[0].artist_songlink,
    audioInDOM: null,
    currentTime: "0:00",
    duration: "2:57"
  },
  mutations: {
    set_time(state, data) {
      const { current_time, duration } = data;
      state.currentTime = current_time;
      state.duration = duration;
    },
    set_audio(state, data) {
      const audio = document.getElementById(data);

      if (data === state.audio && state.audioInDOM !== null && state.playing) {
        state.audioInDOM.pause();
        state.playing = false;
        return;
      }

      state.audio = data;
      state.audioInDOM = audio;
      state.audioInDOM.play();
      state.playing = true;
    },
    set_next_audio(state, data) {
      const audio = document.getElementById(data);

      state.audio = data;
      state.audioInDOM = audio;

      if (state.playing) {
        state.audioInDOM.play();
        return;
      }
    },
    set_current_item(state, data) {
      state.currentItem = data;
    }
  },
  actions: {
    pick_song(vuexContext, item) {
      const audio_link = item.artist_songlink || item.preview_url;
      vuexContext.commit("set_audio", audio_link);
      vuexContext.commit("set_current_item", item);
    },
    pick_next_song(vuexContext, item) {
      const audio_link = item.artist_songlink || item.preview_url;
      vuexContext.commit("set_next_audio", audio_link);
      vuexContext.commit("set_current_item", item);
    },
    update_time(vuexContext, item) {
      vuexContext.commit("set_time", item);
    }
  },
  getters: {
    current_item(state) {
      return state.currentItem;
    },
    db_artists(state) {
      return state.artists;
    },
    audio_item(state) {
      return state.audio;
    },
    audio_in_dom(state) {
      return state.audioInDOM;
    },
    is_audio_playing(state) {
      return state.playing;
    },
    duration_current_time(state) {
      const currentTime = state.currentTime;
      const duration = state.duration;
      return {
        currentTime,
        duration
      };
    }
  }
};

export default audioStore;
