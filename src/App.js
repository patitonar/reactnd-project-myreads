import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReads from './components/MyReads'
import Search from './components/Search'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads />
        )}/>
        <Route exact path='/search' render={() => (
          <Search/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
