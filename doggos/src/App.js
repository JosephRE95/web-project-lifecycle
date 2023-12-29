import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm'; // Corrected import name
import './styles.css';

const fetchDogs = (breed) => {
  return axios.get(`https://dog.ceo/api/breed/${breed}/images`)
    .then(resp => resp.data) // Simplified the return statement
    .catch(err => console.log('Error fetching dogs:', err)); // Improved error handling
}

class App extends React.Component {
  state = {
    doggos: [],
    currentBreed: 'husky'
  }

  componentDidMount() {
    this.fetchDogsByBreed(this.state.currentBreed); // Fetch dogs on mount
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentBreed !== this.state.currentBreed) {
      this.fetchDogsByBreed(this.state.currentBreed); // Fetch dogs if breed changes
    }
  }

  fetchDogsByBreed = (breed) => {
    fetchDogs(breed)
      .then(data => {
        this.setState({
          doggos: data.message,
          currentBreed: breed
        });
      });
  }

  searchDogs = (dogName) => {
    this.fetchDogsByBreed(dogName); // Fetch dogs based on search
  };

  render() {
    return (
      <div className="App">
        <h1>Hello Doggos</h1>
        <SearchForm searchDogs={this.searchDogs} />
        <div className="doggos">
          {this.state.doggos.map(doggo => (
            <img width="200" src={doggo} key={doggo} alt={doggo} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
