import React, { Component } from "react";
import BookContainer from "../container/book/book.container";
export default class Book extends Component {
  render() {
    return (
      <div className="p-0">
        <BookContainer />
      </div>
    );
  }
}
