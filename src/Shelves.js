import React from 'react';
import { Link } from 'react-router-dom';

class Shelves extends React.Component {
  render() {
    const {books, onUpdateBookShelf} = this.props;
    const booksGroupBy = books.reduce(function (groups, item) {
      let val = item['shelf'];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(booksGroupBy).map(shelf => (
              <div key={shelf} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.replace(/([A-Z])/g, ' $1')}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {booksGroupBy[shelf].map(book => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select
                                defaultValue={book.shelf}
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
                          <div className="book-authors">{book.authors.join(', ')}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Shelves;
