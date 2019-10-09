import { fetchGenres } from '../services/api'

export const LOAD_GENRES_BEGIN = 'cooksys/whos-who/Home/LOAD_GENRES_BEGIN'
export const LOAD_GENRES_FAILURE = 'cooksys/whos-who/Home/LOAD_GENRES_FAILURE'
export const LOAD_GENRES_DONE = 'cooksys/whos-who/Home/LOAD_GENRES_DONE'
export const SELECT_GENRE = 'cooksys/whos-who/Home/SELECT_GENRE'
export const SELECT_NUM_SONGS = 'SELECT_NUM_SONGS'
export const SELECT_NUM_ARTISTS = 'SELECT_NUM_ARTISTS'

const initialState = {
  genres: [],
  selectedNumSongs: 1,
  selectedNumArtists: 2,
  errorLoadingGenres: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_GENRES_DONE:
      return {
        ...state,
        errorLoadingGenres: false,
        genres: action.payload.genres
      }
    case LOAD_GENRES_FAILURE:
      return {
        ...state,
        errorLoadingGenres: true,
        genres: initialState.genres
      }
    case SELECT_GENRE:
      return {
        ...state,
        selectedGenre: action.payload.genre
      }
    case SELECT_NUM_SONGS:
      return {
        ...state,
        selectedNumSongs: action.payload.selectedNumSongs
      }
    case SELECT_NUM_ARTISTS:
      return {
        ...state,
        selectedNumArtists: action.payload.selectedNumArtists
      }
    default:
      return state
  }
}

export const selectGenre = genre => ({
  type: SELECT_GENRE,
  payload: {
    genre
  }
})

export const selectNumSongs = selectedNumSongs => ({
  type: SELECT_NUM_SONGS,
  payload: {
    selectedNumSongs
  }
})

export const selectNumArtists = selectedNumArtists => ({
  type: SELECT_NUM_ARTISTS,
  payload: {
    selectedNumArtists
  }
})

const loadGenresBegin = () => ({
  type: LOAD_GENRES_BEGIN
})

const loadGenresDone = genres => ({
  type: LOAD_GENRES_DONE,
  payload: {
    genres
  }
})

const loadGenresFailed = () => ({
  type: LOAD_GENRES_FAILURE
})

export const loadGenres = () => dispatch => {
  dispatch(loadGenresBegin())
  fetchGenres()
    .then(({ genres }) => {
      return dispatch(loadGenresDone(genres))
    })
    .catch(err => dispatch(loadGenresFailed(err)))
}
