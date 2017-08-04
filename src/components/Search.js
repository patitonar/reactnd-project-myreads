import React, { Component } from 'react'
import { search } from '../BooksAPI'
import { Link } from 'react-router-dom'
import Book from "./Book";

export default class Search extends Component {

  state = {
    query: '',
    listOfBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trimRight() })

    if (query) {
      search(query, 20).then((result) => {
        console.log(result)
        this.setState({ listOfBooks: result})
      })
    } else {
      this.setState({ listOfBooks: []})
    }
  }

  render() {
    const { handleCategoryChange } = this.props
    const { query, listOfBooks } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to='/'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {listOfBooks.length > 0 && listOfBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                handleCategoryChange={handleCategoryChange}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}