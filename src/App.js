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


  handleCategoryChange = (book, newCategory) => {
    const categories = this.state.categories
    book.shelf = newCategory
    BooksAPI.update(book, newCategory).then((response) => {
      console.log(response)
      const newCategories = categories.map(category => {
        category.list = category.list.filter((b)=> b.shelf === category.id)
        if(category.id === newCategory) {
          category.list = category.list.concat([book])
        }
        return category
      })

      this.setState({categories: newCategories})
    })
  }

  handleBookChange = (book, newCategory) => {
    const listOfBooks = this.state.listOfBooks
    book.shelf = newCategory
    BooksAPI.update(book, newCategory).then((response) => {
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
          <MyReads handleCategoryChange={this.handleBookChange} {...this.state}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search handleCategoryChange={this.handleBookChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
