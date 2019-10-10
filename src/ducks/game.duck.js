import { fetchArtists, fetchSongs } from '../services/api'
// import chooseRandom from '../utils/chooseRandom'

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

// const songs = (tracks) => {
//   let arr = []
//   for (let track of tracks) {

//     arr.push(track.preview_url)
//   }
//   return arr
// }

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

export const loadArtistsSongs = () => dispatch => {
  dispatch(loadArtistsSongsBegin())
  Promise.all([
    fetchArtists('"anime"', randomOffset, 1),
    fetchSongs('246dkjvS1zLTtiykXe5h60')
  ])
    .then(([{ artists }, songs]) => {
      console.log(artists.total)
      console.log(artists)
      let { items } = artists
      let { tracks } = songs
      // console.log(artistsArr(items))
      // console.log(items[1].id)
      // console.log(items[1].name)
      // console.log(tracks)
      // console.log(tracks[1])
      // console.log(tracks[1].preview_url)
      // findPreviewUrl(tracks)
      return dispatch(loadArtistsSongsDone(artistsArr(items), tracks))
    })
    .catch(err => dispatch(loadArtistsSongsFailed(err)))
}
