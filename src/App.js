import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelves from './Shelves';
import SearchBook from './SearchBook';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      console.log(res);
      // const newBooks = this.state.books.map((bookElem) => (
      //   book.id === bookElem.id ? bookElem.shelf = shelf : bookElem
      // ));
      const newBooks = this.state.books.map((bookElem) => {
        if (book.id === bookElem.id) {
          bookElem.shelf = shelf
          return bookElem;
        } else {
          return bookElem;
        }
      });
      console.log(newBooks);
      this.setState({ books: newBooks });
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelves
            books = {this.state.books}
            onUpdateBookShelf = {this.updateBookShelf}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBook
            books = {this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
