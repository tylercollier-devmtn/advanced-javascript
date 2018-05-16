import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const fakeAxios = {
  get() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ data: 7 }), 1000)
      // setTimeout(() => reject(new Error('my error message')), 1000)
    })
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  async componentDidMount() {
    const { data: coords } = await fakeAxios.get(`getcoords.com/api`)
    console.log('hello')
    const { data: zipCode } = await fakeAxios.get(`getZipcode.com/${coords}`)
    const { data: weatherData } = await fakeAxios.get(`getWeather.com/${zipCode}`)
    this.setState({ data: weatherData })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <div>
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        </div>

      </div>
    );
  }
}

export default App;
