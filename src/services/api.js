import toPairs from 'lodash/toPairs'

import request from '../utils/request'
import { getAccessTokenFromLocalStorage } from './auth'

const SPOTIFY_ROOT = 'https://api.spotify.com/v1'

export function fetchGenres () {
  return fetchFromSpotify({
    endpoint: 'recommendations/available-genre-seeds'
  })
}

export function fetchArtists () {
  return fetchFromSpotify({
    endpoint: 'search?q=genre:%22pop%22&type=artist&limit=50'
    // params: {
    // randomize offset
    // }
  })
}

export function fetchSongs () {
  return fetchFromSpotify({
    endpoint: 'artists/246dkjvS1zLTtiykXe5h60/top-tracks?country=US'
    // params:
  })
}

// export function fetchArtistsSongs () {
//   // return fetchArtists()
//   return fetchSongs()
// }

export function fetchFromSpotify ({ endpoint, params }) {
  const spotifyToken = getAccessTokenFromLocalStorage()
  let url = [SPOTIFY_ROOT, endpoint].join('/')

  if (params) {
    const paramString = toPairs(params)
      .map(param => param.join('='))
      .join('&')
    url += `?${paramString}`
  }

  const options = { headers: { Authorization: `Bearer ${spotifyToken}` } }
  return request(url, options)
}
