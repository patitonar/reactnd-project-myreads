import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bookOptions, NONE_DISABLED, NONE_VALUE } from '../config'

export default class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  };

  state = {
    selectValue: this.props.book.shelf
  };

  handleOnChange(book, newValue) {
    const { handleShelfChange } = this.props;
    const displayValue = newValue === NONE_VALUE ? NONE_DISABLED : newValue;

    this.setState({selectValue: displayValue});
    handleShelfChange(book,newValue);
  }

  render() {
    const { book } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book && book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.selectValue} onChange={(event) => this.handleOnChange(book,event.target.value)}>
                {bookOptions.map((opt,i)=> (
                  <option
                    key={i}
                    value={opt.id}
                    disabled={opt.id === NONE_DISABLED}>{opt.name}</option>
                ))}
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