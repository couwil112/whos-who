import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  loadGenres,
  selectGenre,
  selectNumSongs,
  selectNumArtists
} from '../ducks/config.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadGenres()
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
            onChange={event => this.props.selectNumSongs(event.target.value)}
            defaultChecked={this.props.selectNumSongs('1')}
          />
          1 song
        </label>
        <br />
        <label>
          <input
            name='numSongChoices'
            type='radio'
            value='2'
            onChange={event => this.props.selectNumSongs(event.target.value)}
          />
          2 songs
        </label>
        <br />
        <label>
          <input
            name='numSongChoices'
            type='radio'
            value='3'
            onChange={event => this.props.selectNumSongs(event.target.value)}
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
            onChange={event => this.props.selectNumArtists(event.target.value)}
            defaultChecked={this.props.selectNumArtists('2')}
          />
          2 artists
        </label>
        <br />
        <label>
          <input
            name='numArtistChoices'
            type='radio'
            value='3'
            onChange={event => this.props.selectNumArtists(event.target.value)}
          />
          3 artists
        </label>
        <br />
        <label>
          <input
            name='numArtistChoices'
            type='radio'
            value='4'
            onChange={event => this.props.selectNumArtists(event.target.value)}
          />
          4 artists
        </label>
        <br />
        <br />
        <button value='playGame' onClick=''>
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
  selectNumSongs: PropTypes.func.isRequired,
  selectNumArtists: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  genres: state.config.genres,
  numSongs: state.config.numSongs,
  numArtists: state.config.numArtists
})

const mapDispatchToProps = dispatch => ({
  loadGenres: () => dispatch(loadGenres()),
  selectGenre: genre => dispatch(selectGenre(genre)),
  selectNumSongs: numSongs => dispatch(selectNumSongs(numSongs)),
  selectNumArtists: numArtists => dispatch(selectNumArtists(numArtists))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
