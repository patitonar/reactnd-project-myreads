import React, { Component } from 'react'
import Book from "./Book";

export default class Category extends Component {

  render() {
    const { name, list, handleCategoryChange } = this.props
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
                        handleCategoryChange={handleCategoryChange}
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
