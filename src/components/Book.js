import React, { Component } from 'react'

export default class Book extends Component {
  render() {
    const { book, handleCategoryChange } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book && book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => handleCategoryChange(book,event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && book.authors.map((name, i) => (<div className="book-authors" key={i}>{name}</div>))}
      </div>
    </li>
    )
  }
}