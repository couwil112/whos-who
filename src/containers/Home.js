import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  loadGenres,
  selectGenre,
  selectNumSongs,
  selectNumArtists
} from '../ducks/config.duck'

import { loadArtists, loadSongs } from '../ducks/game.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadGenres()
  }

  onClick = () => {
    const { genre, numSongs, numArtists, loadArtists, loadSongs } = this.props
    Promise.all([loadArtists(genre, numArtists), loadSongs(numSongs)])
    this.props.history.push('/game')
  }

  render () {
    const genres = this.props.genres.map(genre => (
      <option key={genre} value={genre}>
        {genre}
      </option>
    ))

    return (
      <div>
        Pick a Genre
        <br />
        <select onChange={event => this.props.selectGenre(event.target.value)}>
          {genres}
        </select>
        <br />
        <br />
        How many songs?
        <br />
        <label>
          <input
            name='numSongChoices'
            type='radio'
            value='1'
            onChange={event => this.props.selectNumSongs(1)}
            defaultChecked
          />
          1 song
        </label>
        <br />
        <label>
          <input
            name='numSongChoices'
            type='radio'
            value='2'
            onChange={event => this.props.selectNumSongs(2)}
          />
          2 songs
        </label>
        <br />
        <label>
          <input
            name='numSongChoices'
            type='radio'
            value='3'
            onChange={event => this.props.selectNumSongs(3)}
          />
          3 songs
        </label>
        <br />
        <br />
        How many artists?
        <br />
        <label>
          <input
            name='numArtistChoices'
            type='radio'
            value='2'
            onChange={event => this.props.selectNumArtists(2)}
            defaultChecked
          />
          2 artists
        </label>
        <br />
        <label>
          <input
            name='numArtistChoices'
            type='radio'
            value='3'
            onChange={event => this.props.selectNumArtists(3)}
          />
          3 artists
        </label>
        <br />
        <label>
          <input
            name='numArtistChoices'
            type='radio'
            value='4'
            onChange={event => this.props.selectNumArtists(4)}
          />
          4 artists
        </label>
        <br />
        <br />
        <button value='playGame' onClick={this.onClick}>
          Play Game
        </button>
      </div>
    )
  }
}

Home.propTypes = {
  loadGenres: PropTypes.func.isRequired,
  selectGenre: PropTypes.func.isRequired,
  genres: PropTypes.array,
  genre: PropTypes.string,
  numArtists: PropTypes.number,
  numSongs: PropTypes.number,
  selectNumSongs: PropTypes.func.isRequired,
  selectNumArtists: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  loadSongs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  genres: state.config.genres,
  genre: state.config.genre,
  numArtists: state.config.numArtists,
  numSongs: state.config.numSongs
})

const mapDispatchToProps = dispatch => ({
  loadGenres: () => dispatch(loadGenres()),
  selectGenre: genre => dispatch(selectGenre(genre)),
  selectNumSongs: numSongs => dispatch(selectNumSongs(numSongs)),
  selectNumArtists: numArtists => dispatch(selectNumArtists(numArtists)),
  loadArtists: (genre, numArtists) => dispatch(loadArtists(genre, numArtists)),
  loadSongs: numSongs => dispatch(loadSongs(numSongs))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
