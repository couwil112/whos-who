import { fetchArtists, fetchSongs } from '../services/api'

export const LOAD_ARTISTS_SONGS_BEGIN = 'LOAD_ARTISTS_SONGS_BEGIN'
export const LOAD_ARTISTS_SONGS_FAILURE = 'LOAD_ARTISTS_SONGS_FAILURE'
export const LOAD_ARTISTS_SONGS_DONE = 'LOAD_ARTISTS_SONGS_DONE'
export const SELECT_ARTIST = 'SELECT_ARTIST'
export const SELECT_SONG = 'PLAY_SONG'

const initialState = () => ({
  artists: [],
  songs: [],
  errorLoadingArtistsSongs: false
})

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTISTS_SONGS_DONE:
      return {
        ...state,
        errorLoadingArtistsSongs: false,
        artists: action.payload.artists,
        songs: action.payload.songs
      }
    case LOAD_ARTISTS_SONGS_FAILURE:
      return {
        ...state,
        errorLoadingArtistsSongs: true,
        artists: initialState.artists,
        songs: initialState.songs
      }
    case SELECT_ARTIST:
      return {
        ...state,
        selectedArtist: action.payload.artist
      }
    case SELECT_SONG:
      return {
        ...state,
        selectedSong: action.payload.song
      }
    default:
      return state
  }
}

export const selectArtist = artist => ({
  type: SELECT_ARTIST,
  payload: {
    artist
    // artist: {
    //   id,
    //   name,
    //   isCorrect
    // }
  }
})

export const selectSong = song => ({
  type: SELECT_SONG,
  payload: {
    song
  }
})

const loadArtistsSongsBegin = () => ({
  type: LOAD_ARTISTS_SONGS_BEGIN
})

const loadArtistsSongsDone = (artists, songs) => ({
  type: LOAD_ARTISTS_SONGS_DONE,
  payload: {
    artists,
    songs
  }
})

const loadArtistsSongsFailed = () => ({
  type: LOAD_ARTISTS_SONGS_FAILURE
})

export const loadArtistsSongs = () => dispatch => {
  dispatch(loadArtistsSongsBegin())
  Promise.all([
    fetchArtists('"pop"', 51, 4),
    fetchSongs('246dkjvS1zLTtiykXe5h60')
  ])
    .then(([{ artists }, songs]) => {
      let { items } = artists
      let { tracks } = songs
      console.log(items)
      console.log(tracks)
      return dispatch(loadArtistsSongsDone(items, tracks))
    })
    .catch(err => dispatch(loadArtistsSongsFailed(err)))
}
