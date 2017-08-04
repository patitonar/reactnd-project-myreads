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

  getPersistedBooks = (list) => {
    const categories = this.state.categories
    const persistedBooks = categories.map(category => {
      const filteredList = list.filter((book) => book.shelf === category.id)
      category.list = category.list.concat(filteredList)
      return category
    })
    this.setState({categories: persistedBooks})
  }

  handleCategoryChange = (book, newCategory) => {
    const categories = this.state.categories
    book.shelf = newCategory
    const newCategories = categories.map(category => {
        category.list = category.list.filter((b)=> b.shelf === category.id)
      if(category.id === newCategory) {
        category.list = category.list.concat([book])
      }
      return category
    })

    this.setState({categories: newCategories})
  }

  componentDidMount() {
    BooksAPI.getAll().then((result) => {
      this.getPersistedBooks(result)
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads handleCategoryChange={this.handleCategoryChange} {...this.state}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search handleCategoryChange={this.handleCategoryChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
