import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { useApiData } from "../hooks/useApiData";

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

const useForm = (initialState: MyComponentState) => {
  const [formState, setFormState] = useState<MyComponentState>(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return [formState, setFormState, handleInputChange, resetForm] as const;
};

export default function BookHook() {
  const [bookInfo, setBookInfo, handleInputChange] = useForm({
    books: getDataFromLs(),
    title: "",
    author: "",
    Isbn: "",
    currentIndex: 0,
    show: false,
  });

  //   const apiUrl = "https://jsonplaceholder.typicode.com/posts?_limit=10";
  //   const { data, loading, error } = useApiData(apiUrl);

  //   if (loading) {
  //     return <p>Loading...</p>;
  //   }

  //   if (error) {
  //     return <p>Error: {error}</p>;
  //   }
  //   if (data) {
  //     return (
  //       <div>
  //         <h1>Data from API</h1>
  //         <pre>{JSON.stringify(data, null, 2)}</pre>
  //       </div>
  //     );
  //   }

  const handleSubmit = () => {
    const { title, author, Isbn, books } = bookInfo;
    const book = { title, author, Isbn };

    setBookInfo({
      ...bookInfo,
      books: [...books, book],
      author: "",
      title: "",
      Isbn: "",
    });
  };

  useEffect(() => {
    const { books } = bookInfo;
    localStorage.setItem("books", JSON.stringify(books));
  }, [bookInfo]);

  const deleteBook = (id: string) => {
    const { books } = bookInfo;
    const filterBook = books.filter((item: BookData) => {
      return item.Isbn !== id;
    });
    setBookInfo({ ...bookInfo, books: filterBook });
  };

  const editeBook = (data: BookData, index: number) => {
    const { title, author, Isbn } = data;
    setBookInfo({
      ...bookInfo,
      title,
      author,
      Isbn,
      show: true,
      currentIndex: index,
    });
  };

  const updateBook = () => {
    const { title, author, Isbn } = bookInfo;
    bookInfo.books[bookInfo.currentIndex].title = title;
    bookInfo.books[bookInfo.currentIndex].author = author;
    bookInfo.books[bookInfo.currentIndex].Isbn = Isbn;

    setBookInfo({
      ...bookInfo,
      author: "",
      title: "",
      Isbn: "",

      show: false,
    });
  };

  return (
    <div>
      <h2 className="heading">Book List App</h2>
      <div className="main">
        <div className="form-container">
          <form onSubmit={(e) => e.preventDefault()} className="form-group">
            <label>Title</label>
            <input
              value={bookInfo.title}
              name="title"
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Author</label>
            <input
              value={bookInfo.author}
              type="text"
              name="author"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Isbn#</label>
            <input
              value={bookInfo.Isbn}
              type="text"
              name="Isbn"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
            {bookInfo.show ? (
              <button
                onClick={() => updateBook()}
                className="btn btn-md"
                style={{ backgroundColor: "green" }}
              >
                Update book
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-md"
                onClick={() => handleSubmit()}
              >
                Add book
              </button>
            )}
          </form>
        </div>
        <div className="veiw-container">
          <h5 className="text-center heading my-4">view books</h5>
          {bookInfo.books.map((book: BookData, index: number) => (
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
                    <FaTrashAlt onClick={() => deleteBook(book.Isbn)} />
                  </td>
                  <td>
                    <button
                      className="btn-sm btn-success"
                      onClick={() => editeBook(book, index)}
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
