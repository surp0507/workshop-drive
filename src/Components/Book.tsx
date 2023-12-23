import React, { Component } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { title } from "process";

const getDataFromLs = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
interface MyComponentState {
  books: Array<BookData>;
  title: string;
  author: string;
  Isbn: string;

  currentIndex: number;
  show: boolean;
}

interface BookData {
  title: string;
  author: string;
  Isbn: string;
}
export default class Book extends Component<{}, MyComponentState> {
  state = {
    books: getDataFromLs(),
    title: "",
    author: "",
    Isbn: "",
    currentIndex: 0,
    show: false,
  };

  handleSubmit = () => {
    const { title, author, Isbn, books } = this.state;
    const book = { title, author, Isbn };
    this.setState({ books: [...books, book], author: "", title: "", Isbn: "" });
  };
  componentDidUpdate() {
    const { books } = this.state;
    localStorage.setItem("books", JSON.stringify(books));
  }

  deleteBook = (id: string) => {
    const { books } = this.state;
    const filterBook = books.filter((item: BookData) => {
      return item.Isbn !== id;
    });
    this.setState({ books: filterBook });
  };

  editeBook = (data: BookData, index: number) => {
    const { title, author, Isbn } = data;
    this.setState({ title, author, Isbn, show: true,currentIndex:index });
  };

  updateBook = () => {
    const { title, author, Isbn } = this.state;

    this.state.books[this.state.currentIndex].title = title;
    this.state.books[this.state.currentIndex].author = author;
    this.state.books[this.state.currentIndex].Isbn = Isbn;
    this.setState({
      books: this.state.books,
      author: "",
      title: "",
      Isbn: "",

      show: false,
    });
  };

  render() {
    const { books, title, author, Isbn, show } = this.state;
    return (
      <div>
        <h2 className="heading">Book List App</h2>
        <div className="main">
          <div className="form-container">
            <form onSubmit={(e) => e.preventDefault()} className="form-group">
              <label>Title</label>
              <input
                value={title}
                type="text"
                className="form-control"
                onChange={(e) =>
                  this.setState({
                    title: e.target.value,
                  })
                }
              />
              <label>Author</label>
              <input
                value={author}
                type="text"
                className="form-control"
                onChange={(e) =>
                  this.setState({
                    author: e.target.value,
                  })
                }
              />
              <label>Isbn#</label>
              <input
                value={Isbn}
                type="text"
                className="form-control"
                onChange={(e) =>
                  this.setState({
                    Isbn: e.target.value,
                  })
                }
              />
              {show ? (
                <button
                  onClick={() => this.updateBook()}
                  className="btn btn-md"
                  style={{ backgroundColor: "green" }}
                >
                  Update book
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-md"
                  onClick={() => this.handleSubmit()}
                >
                  Add book
                </button>
              )}
            </form>
          </div>
          <div className="veiw-container">
            <h5 className="text-center heading my-4">view books</h5>
            {books.map((book: BookData, index: number) => (
              <Table className="table" key={book.Isbn}>
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Isbn#</th>
                    <th scope="col"> Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.Isbn}</td>
                    <td>
                      <FaTrashAlt onClick={() => this.deleteBook(book.Isbn)} />
                    </td>
                    <td>
                      <button
                        className="btn-sm btn-success"
                        onClick={() => this.editeBook(book, index)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
