import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Category from "./Category";

export default class MyReads extends Component {

  filterShelf = (shelfId) => {
    const { listOfBooks } = this.props
    return listOfBooks.filter(book => book.shelf === shelfId)
  }

  render() {
    const { categories, handleCategoryChange } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {categories.map((category) => (
            <Category
              key={category.id}
              handleCategoryChange={handleCategoryChange}
              list={this.filterShelf(category.id)}
              {...category}
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
