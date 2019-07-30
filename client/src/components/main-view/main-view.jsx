import React from 'react'
import axios from 'axios'

import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'

export class MainView extends React.Component {

  constructor () {
    super()

    this.state = {
      movies: null,
      selectedMovie: null
    }
  }

  componentDidMount () {
    var BASE_URL = 'http://localhost:3000'

    axios.get(BASE_URL + '/animes')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  onMovieClick (movie) {
    this.setState({
      selectedMovie: movie
    })
  }

  onBackButton () {
    console.log('back button pressed');
    // this.componentDidMount();
  };

  render () {
    const { movies, selectedMovie } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className='main-view' />

    return (
     <div className='main-view'>
      {selectedMovie
         ? <MovieView onClick={movie => this.onMovieClick(movie)} movie={selectedMovie} />
         : movies.map(movie => (
           <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}>
           </MovieCard>
         ))
      }
     </div>
    );
  }
}
