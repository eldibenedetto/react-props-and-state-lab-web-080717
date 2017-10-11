import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  onChangeType = (value) => {
    this.setState({
      filters: {
        type: value
      }
    })
  }

  onFindPetsClick = () => {
    let url = this.state.filters.type !== 'all' ? `/api/pets?type=${this.state.filters.type}` : '/api/pets'
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        pets: res
      })
    })
  }

  onAdoptPet = (petID) => {
    this.setState({
      adoptedPets: [...this.state.adoptedPets, petID]
    })
  }



  render() {
    console.log(this.state)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters} onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} adoptedPets={this.state.adoptedPets} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
