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
    fakeAxios.get('some fake url').then(response => {
      console.log('inside promise')
      this.setState({ data: response.data })
    }).catch(error => {
      console.error('error happened', error)
    })
    console.log('after promise')
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
