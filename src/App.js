import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const fakeAxios = {
  get() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ data: 7}), 1000)
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

  componentDidMount() {
    // fakeAxios.get(`getcoords.com/api`).then(response => {
    //   const coords = response.data.coords
    //   fakeAxios.get(`zipcode.com/api/${coords}`).then(response => {
    //     const zipCode = response.data.zipCode
    //     fakeAxios.get(`getweather.com/api/${zipCode}`).then(response => {
    //       this.setState({ data: response.data })
    //     })
    //   })
    // })
    fakeAxios.get(`getcoords.com/api`).then(response => {
      const coords = response.data.coords
      return fakeAxios.get(`zipcode.com/api/${coords}`)
    }).then(response => {
      const zipCode = response.data.zipCode
      return fakeAxios.get(`getweather.com/api/${zipCode}`)
    }).then(response => {
      this.setState({ data: response.data })
    })
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
