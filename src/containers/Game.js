import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadArtistsSongs, selectArtist, selectSong } from '../ducks/game.duck'

// import Header from '../components/Header'
class Game extends React.Component {
  componentDidMount () {
    this.props.loadArtistsSongs()
  }

  render () {
    return (
      <div>
        {/* <Header name='Guess The Artist' /> */}
        <button onClick={event => console.log('Play Song')}>Play Song</button>
      </div>
    )
  }
}

Game.propTypes = {
  loadArtistsSongs: PropTypes.func.isRequired
  //   artists: PropTypes.array,
  //   songs: PropTypes.array,
  //   selectArtist: PropTypes.func.isRequired,
  //   selectSong: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  artists: state.config.artists,
  songs: state.config.songs
})

const mapDispatchToProps = dispatch => ({
  loadArtistsSongs: () => dispatch(loadArtistsSongs()),
  selectArtist: artist => dispatch(selectArtist(artist)),
  selectSong: song => dispatch(selectSong(song))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
