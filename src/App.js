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
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      })
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
            onUpdateBookShelf = {this.updateBookShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
