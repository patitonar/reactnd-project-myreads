import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReads from './components/MyReads'
import Search from './components/Search'
import { shelves, NONE_VALUE } from './config'

class BooksApp extends Component {
  state = {
    shelves: shelves,
    listOfBooks: []
  };

  handleShelfChange = (book, newShelf) => {
    const listOfBooks = this.state.listOfBooks;
    book.shelf = newShelf;
    BooksAPI.update(book, newShelf).then(() => {
      const newListOfBooks = listOfBooks.filter(b => b.id !== book.id);
      if (newShelf !== NONE_VALUE) {
        newListOfBooks.push(book);
      }
      this.setState({listOfBooks: newListOfBooks});
    })
  };

  componentDidMount() {
    BooksAPI.getAll().then((result) => {
      this.setState({listOfBooks: result});
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads
            handleShelfChange={this.handleShelfChange}
            {...this.state}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search
            handleShelfChange={this.handleShelfChange}
            listOfBooks={this.state.listOfBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
