import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player'

import { selectArtist } from '../ducks/game.duck'

class Game extends React.Component {
  render () {
    const songs = this.props.songs.map(song => (
      <div key={song.id}>
        <AudioPlayer src={song.preview} onPlay={e => console.log('onPlay')} />
      </div>
    ))

    const artists = this.props.artists.map(artist => (
      <div key={artist.id}>
        <label>
          <input
            name='artistChoices'
            type='radio'
            value={artist.name}
            onChange={event => this.props.selectArtist(event.target.value)}
          />
          {artist.name}
        </label>
        <br />
      </div>
    ))

    return (
      <div>
        Click the play button to listen:
        {songs}
        <br />
        <br />
        Choose the correct artist:
        {artists}
      </div>
    )
  }
}

Game.propTypes = {
  artists: PropTypes.array,
  songs: PropTypes.array,
  selectArtist: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  artists: state.game.artists,
  songs: state.game.songs
})

const mapDispatchToProps = dispatch => ({
  selectArtist: artist => dispatch(selectArtist(artist))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
