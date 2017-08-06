import React, { Component } from 'react'

export default class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectValue: props.book.shelf
    }
  }

  handleOnchange(book, newValue) {
    const { handleCategoryChange } = this.props
    const displayValue = newValue === 'none' ? 'noneDisabled' : newValue
    
    this.setState({selectValue: displayValue})
    handleCategoryChange(book,newValue)
  }

  render() {
    const { book } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book && book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.selectValue} onChange={(event) => this.handleOnchange(book,event.target.value)}>
                <option value="noneDisabled" disabled>Move to...</option>
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