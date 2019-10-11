import { fetchArtists, fetchSongs } from '../services/api'
import { chooseRandom } from '../utils/chooseRandom'

export const LOAD_ARTISTS_BEGIN = 'LOAD_ARTISTS_BEGIN'
export const LOAD_ARTISTS_FAILURE = 'LOAD_ARTISTS_FAILURE'
export const LOAD_ARTISTS_DONE = 'LOAD_ARTISTS_DONE'
export const LOAD_SONGS_BEGIN = 'LOAD_SONGS_BEGIN'
export const LOAD_SONGS_FAILURE = 'LOAD_SONGS_FAILURE'
export const LOAD_SONGS_DONE = 'LOAD_SONGS_DONE'
export const SELECT_ARTIST = 'SELECT_ARTIST'
export const RANDOMIZE_CORRECT_ARTIST = 'RANDOMIZE_CORRECT_ARTIST'

const initialState = {
  artists: [],
  songs: [],
  correctArtist: '',
  errorLoadingArtists: false,
  errorLoadingSongs: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTISTS_DONE:
      return {
        ...state,
        errorLoadingArtists: false,
        artists: action.payload.artists
      }
    case LOAD_ARTISTS_FAILURE:
      return {
        ...state,
        errorLoadingArtists: true,
        artists: initialState.artists
      }
    case LOAD_SONGS_DONE:
      return {
        ...state,
        errorLoadingSongs: false,
        songs: action.payload.songs
      }
    case LOAD_SONGS_FAILURE:
      return {
        ...state,
        errorLoadingSongs: true,
        songs: initialState.songs
      }
    case SELECT_ARTIST:
      return {
        ...state,
        selectedArtist: action.payload.artist
      }
    case RANDOMIZE_CORRECT_ARTIST:
      return {
        ...state,
        correctArtist: action.payload.artist
      }
    default:
      return state
  }
}

export const selectArtist = artist => ({
  type: SELECT_ARTIST,
  payload: {
    artist
  }
})

export const randomizeCorrectArtist = correctArtist => ({
  type: RANDOMIZE_CORRECT_ARTIST,
  payload: {
    correctArtist
  }
})

const loadArtistsBegin = () => ({
  type: LOAD_ARTISTS_BEGIN
})

const loadArtistsDone = artists => ({
  type: LOAD_ARTISTS_DONE,
  payload: {
    artists
  }
})

const loadArtistsFailed = () => ({
  type: LOAD_ARTISTS_FAILURE
})

const loadSongsBegin = () => ({
  type: LOAD_SONGS_BEGIN
})

const loadSongsDone = songs => ({
  type: LOAD_SONGS_DONE,
  payload: {
    songs
  }
})

const loadSongsFailed = () => ({
  type: LOAD_SONGS_FAILURE
})

const artist = (id, name, isCorrect) => ({
  id: id,
  name: name,
  isCorrect: isCorrect
})

const artistsArr = items => {
  let arr = []
  for (let item of items) {
    arr.push(artist(item.id, item.name, false))
  }
  return arr
}

const songsArr = tracks => {
  let arr = []
  for (let track of tracks) {
    let song = {
      id: track.id,
      preview: track.preview_url
    }
    arr.push(song)
  }
  return arr
}

const randomOffset = Math.floor(Math.random() * 1000)

export const loadArtists = (genre, numArtists) => dispatch => {
  dispatch(loadArtistsBegin())
  fetchArtists(`"${genre}"`, randomOffset, numArtists)
    .then(({ artists }) => {
      let { items } = artists
      return dispatch(loadArtistsDone(artistsArr(items)))
    })
    .catch(err => dispatch(loadArtistsFailed(err)))
}

export const loadSongs = numSongs => dispatch => {
  dispatch(loadSongsBegin())
  fetchSongs('246dkjvS1zLTtiykXe5h60')
    .then(songs => {
      let { tracks } = songs
      let trackArr = songsArr(tracks)
      let arr = chooseRandom(trackArr, numSongs)
      return dispatch(loadSongsDone(arr))
    })
    .catch(err => dispatch(loadSongsFailed(err)))
}
