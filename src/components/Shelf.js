import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from "./Book";

export default class Shelf extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  };

  render() {
    const { name, list, handleShelfChange } = this.props;
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {list.map((book) => (
                      <Book
                        key={book.id}
                        book={book}
                        handleShelfChange={handleShelfChange}
                      />
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
