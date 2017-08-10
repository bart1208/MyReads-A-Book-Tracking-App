import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class SearchBook extends React.Component {
  state = {
    booksApiReturns: []
  }

  searchAPI = (event) => {
    const query = event.target.value.trim();
    BooksAPI.search(query, 15).then(books => {
      this.setState({booksApiReturns: Array.isArray(books) ? books : []});
    })
  }

  render() {
    const {books, onUpdateBookShelf} = this.props;
    const {booksApiReturns} = this.state;

    booksApiReturns.forEach(bookSearch => {
      books.forEach(bookSchelves => {
        if (bookSearch.id === bookSchelves.id) {
          bookSearch.shelf = bookSchelves.shelf;
        }
      })
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => (
                this.searchAPI(event)
              )}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksApiReturns.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`
                      }}>
                    </div>
                    <div className="book-shelf-changer">
                      <select
                        defaultValue={book.shelf ? book.shelf : 'none'}
                        onChange={(e) => onUpdateBookShelf(book, e.target.value)}
                      >
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors ? book.authors.join(', ') : "None"}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook;
