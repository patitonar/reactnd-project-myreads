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
        name: 'Currently Reading'
      },
      {
        id: 'wantToRead',
        name: 'Want to Read'
      },
      {
        id: 'read',
        name: 'Read'
      }
    ],
    listOfBooks: []
  }

  handleBookChange = (book, newCategory) => {
    const listOfBooks = this.state.listOfBooks
    book.shelf = newCategory
    BooksAPI.update(book, newCategory).then(() => {
      const newListOfBooks = listOfBooks.filter(b => b.id !== book.id)
      if (newCategory !== 'none') {
        newListOfBooks.push(book)
      }
      this.setState({listOfBooks: newListOfBooks})
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((result) => {
      this.setState({listOfBooks: result})
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads
            handleCategoryChange={this.handleBookChange}
            {...this.state}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search
            handleCategoryChange={this.handleBookChange}
            listOfBooks={this.state.listOfBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
