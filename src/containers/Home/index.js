import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadGenres, selectGenre } from '../../ducks/config.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadGenres()
  }

  render () {
    const genres = this.props.genres.map(
      genre => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      )
    )

    return (
      <div>
        <select onChange={(event) => this.props.selectGenre(event.target.value)}>
          {genres}
        </select>
      </div>
    )
  }
}

Home.propTypes = {
  loadGenres: PropTypes.func.isRequired,
  selectGenre: PropTypes.func.isRequired,
  genres: PropTypes.array
}

const mapStateToProps = (state) => ({
  genres: state.config.genres
})

const mapDispatchToProps = (dispatch) => ({
  loadGenres: () => dispatch(loadGenres()),
  selectGenre: genre => dispatch(selectGenre(genre))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
