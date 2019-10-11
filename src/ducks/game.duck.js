import { fetchArtists, fetchSongs } from '../services/api'
import { chooseRandom } from '../utils/chooseRandom'

export const LOAD_ARTISTS_BEGIN = 'LOAD_ARTISTS_BEGIN'
export const LOAD_ARTISTS_FAILURE = 'LOAD_ARTISTS_FAILURE'
export const LOAD_ARTISTS_DONE = 'LOAD_ARTISTS_DONE'
export const LOAD_SONGS_BEGIN = 'LOAD_SONGS_BEGIN'
export const LOAD_SONGS_FAILURE = 'LOAD_SONGS_FAILURE'
export const LOAD_SONGS_DONE = 'LOAD_SONGS_DONE'
export const SELECT_ARTIST = 'SELECT_ARTIST'

const initialState = {
  artists: [],
  songs: [],
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

// const findPreviewUrl = songs => {
//   console.log('Finding Preview URLs')
//   for (let song of songs) {
//     if (song.preview_url) {
//       console.log(song.preview_url)
//     } else {
//       console.log('no preview url')
//     }
//   }
// }

const randomOffset = Math.floor(Math.random() * 1000)

export const loadArtists = numArtists => dispatch => {
  dispatch(loadArtistsBegin())
  fetchArtists('"pop"', randomOffset, numArtists)
    .then(({ artists }) => {
      //   console.log(artists.total)
      //   console.log(artists)

      let { items } = artists
      // console.log(artistsArr(items))
      // console.log(items[1].id)
      // console.log(items[1].name)
      return dispatch(loadArtistsDone(artistsArr(items)))
    })
    .catch(err => dispatch(loadArtistsFailed(err)))
}

export const loadSongs = numSongs => dispatch => {
  dispatch(loadSongsBegin())
  //   fetchSongs('246dkjvS1zLTtiykXe5h60')
  fetchSongs('3utxjLheHaVEd9bPjQRsy8')
    .then(songs => {
      let { tracks } = songs
      // console.log(`numSongs: ${numSongs}`)
      //   console.log(tracks)
      // console.log(tracks[1])
      // console.log(tracks[1].preview_url)
      // findPreviewUrl(tracks)
      let trackArr = songsArr(tracks)
      // console.log(trackArr)
      let arr = chooseRandom(trackArr, numSongs)
      // console.log(`After chooseRandom ${arr}`)
      return dispatch(loadSongsDone(arr))
    })
    .catch(err => dispatch(loadSongsFailed(err)))
}
