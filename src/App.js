import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReads from './components/MyReads'
import Search from './components/Search'

class BooksApp extends Component {
  state = {
    categories: [
      {
        id: 'currentlyReading',
        name: 'Currently Reading',
        list: []
      },
      {
        id: 'wantToRead',
        name: 'Want to Read',
        list: []
      },
      {
        id: 'read',
        name: 'Read',
        list: []
      }
    ]
  }

  handleCategoryChange = (book, currentCategory, newCategory) => {
    const categories = this.state.categories
    const newCategories = categories.map(category => {
      if(category.id === currentCategory) {
        category.list = category.list.filter((b)=> b.id !== book.id)
      } else if(category.id === newCategory) {
        category.list = category.list.concat([book])
      }
      return category
    })

    this.setState({categories: newCategories})
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads handleCategoryChange={this.handleCategoryChange} {...this.state}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
