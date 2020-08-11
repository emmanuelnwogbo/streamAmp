import Vuex from "vuex";
import axios from "axios";

import audioStore from "./audio";

const createStore = () => {
  return new Vuex.Store({
    state: {
      artist_from_spotify: {},
      id_from_spotify: null,
      tracks_from_spotify: [],
      search_term: "bruno",
      ...audioStore.state
    },
    mutations: {
      setSpotData(state, data) {
        state.artist_from_spotify = data;
      },
      setSpotArtistID(state, data) {
        state.id_from_spotify = data;
      },
      setSpotTracks(state, data) {
        state.tracks_from_spotify = data;
      },
      ...audioStore.mutations
    },
    actions: {
      ...audioStore.actions,
      nuxtServerInit(vuexContext, context) {
        return axios
          .get("https://spotify-api-wrapper.appspot.com/artist/bruno")
          .then(res => {
            const spotify_data = res.data.artists;
            const artistID = res.data.artists.items[0].id;
            vuexContext.commit("setSpotData", spotify_data);
            vuexContext.commit("setSpotArtistID", artistID);

            return {
              artists: res.data.artists
            };
          })
          .catch(e => context.error(e));
      },
      getArtist(vuexContext, search_term) {
        return axios
          .get(`https://spotify-api-wrapper.appspot.com/artist/${search_term}`)
          .then(res => {
            const spotify_data = res.data.artists;
            const artistID = res.data.artists.items[0].id;
            vuexContext.commit("setSpotData", spotify_data);
            vuexContext.commit("setSpotArtistID", artistID);

            return {
              artists: res.data.artists
            };
          })
          .catch(e => context.error(e));
      },
      getArtistSongs(vuexContext, artistID) {
        return axios
          .get(
            `https://spotify-api-wrapper.appspot.com/artist/${artistID}/top-tracks`
          )
          .then(res => {
            const spotify_tracks = res.data.tracks;
            vuexContext.commit("setSpotTracks", spotify_tracks);
            return spotify_tracks;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getters: {
      spotify_artist(state) {
        return state.artist_from_spotify;
      },
      spotify_artistID(state) {
        return state.id_from_spotify;
      },
      spotify_tracks(state) {
        return state.tracks_from_spotify;
      },
      ...audioStore.getters
    }
  });
};

export default createStore;
