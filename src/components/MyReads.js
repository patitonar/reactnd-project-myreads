import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from "./Shelf";

export default class MyReads extends Component {

  filterShelf = (shelfId) => {
    const { listOfBooks } = this.props
    return listOfBooks.filter(book => book.shelf === shelfId)
  }

  render() {
    const { shelves, handleShelfChange } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {shelves.map((shelf) => (
            <Shelf
              key={shelf.id}
              handleShelfChange={handleShelfChange}
              list={this.filterShelf(shelf.id)}
              {...shelf}
            />
        ))}
        <div className="open-search">
          <Link
            to='/search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}
