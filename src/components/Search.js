import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { search } from '../BooksAPI'
import { Link } from 'react-router-dom'
import Book from "./Book";
import { NONE_DISABLED } from '../config'

export default class Search extends Component {

  static propTypes = {
    listOfBooks: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  };

  state = {
    query: '',
    list: []
  };

  updateQuery = (query) => {
    this.setState({ query: query });

    if (query) {
      search(query, 20).then((result) => {
        if (!result.error) {
          const currentQuery = this.state.query;
          //  If current query on the input is different from the one that
          //  triggered the search, then another search was performed and
          //  the state shouldn't be updated with an older search result
          if(query === currentQuery) {
            const { listOfBooks } = this.props;
            const list = result.map((book) => {
              const ArrayBook = listOfBooks.filter(b => b.id === book.id);
              if(ArrayBook.length > 0) {
                book.shelf = ArrayBook[0].shelf;
              } else {
                book.shelf = NONE_DISABLED;
              }
              return book;
            });
            this.setState({ list });
          }
        } else {
          this.setState({ list: []});
        }
      })
    } else {
      this.setState({ list: []})
    }
  };

  render() {
    const { handleShelfChange } = this.props;
    const { query, list } = this.state;

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
            {list.length > 0 && list.map((book) => (
              <Book
                key={book.id}
                book={book}
                handleShelfChange={handleShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}