import React, { Component } from 'react'

export default class Book extends Component {
  handleOnChange = (event) => {
    const { book, category, handleCategoryChange } = this.props
    handleCategoryChange(book, category, event.target.value)
  }

  render() {
    const { book, category } = this.props
    const value = category ? category : 'none';
    return (
      <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
        <div className="book-shelf-changer">
          <select value={value} onChange={this.handleOnChange}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors[0]}</div>
    </div>
    )
  }
}