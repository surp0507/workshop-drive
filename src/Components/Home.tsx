import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { Table ,Button} from 'react-bootstrap'
import  useCustom  from './useCustom';

type state = {
  title: string;
  author: string;
  price: string;
}
 interface Books {
  id?: number,
  title: string;
  author: string;
  price: string;
}

const Home:React.FC = () => {

  const [books, setBooks] = useCustom<Books[]>("books",[]);
  const [value, setValue] = useState<state>({ title: "", author: "", price: "" })
  // const [show, setShow] = useState<boolean>(false)
  const [isEditId, setIsEditId] = useState<number>()



 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditId) {
      const updatedBooks = books?.map((item: Books) =>{ 
        if(item.id === isEditId){
         return { 
          ...item,
           title: value.title , 
          author: value.author, 
          price: value.price }
        }
       return item
      })??[]
     
      setBooks(updatedBooks)
      setValue({ title: "", author: "", price: "" })
      setIsEditId(undefined)
    } else {
      const { title, author, price } = value
      if (title !== "" && author !== "" && price !== "") {
        setBooks((prevBook)=>[...(prevBook??[]), { id: Math.random(), title: title, author: author, price: price }])
        setValue({ title: "", author: "", price: "" })
        setIsEditId(undefined)
      }
      else {
        alert("please enter the value!")
      }
    }
  };

  const deleteBook = (id: number) => {
    setBooks(books?.filter((item: Books) => {
      return item.id !== id
    }))
    alert("deleted successfully")
  }

  const editeBook = (data: { title: string, author: string, price: string, id: number }) => {
    const { title, author, price, id } = data
    setValue({ ...value, title: title, author: author, price: price })
    setIsEditId(id)
  }

  return (
    <div>
      <h2 className="heading">Book List App</h2>
      <div className="main">
        <div className="form-container">

          <form onSubmit={(e) => handleSubmit(e)} className="form-group">
            <label >Title</label>
            <input value={value?.title} type="text" className="form-control" onChange={(e) => setValue({ ...value, title: e.target.value })} />
            <label >Author</label>
            <input value={value?.author} type="text" className="form-control" onChange={(e) => setValue({ ...value, author: e.target.value })} />
            <label >price</label>
            <input value={value?.price} type="text" className="form-control" onChange={(e) => setValue({ ...value, price: e.target.value })} />
            {isEditId ?
              <Button
                type="submit"
                variant="outline-primary"
                className="btn btn-md"
              >
                Update book
              </Button>

              :
              <Button type="submit" variant="outline-primary" className="btn btn-md">Add book</Button>
            }
          </form>

        </div>
        <div className="veiw-container">
          <h5 className="text-center heading my-4" >view books</h5>
          {books?.length  ? books?.map((book: any) => (
            <Table className="table" key={book.id}>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">price</th>
                  <th scope="col"> Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr >

                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td><Button onClick={() => deleteBook(book.id)} size="sm" disabled={isEditId!==undefined}> Delete</Button></td>
                  <td>
                    <Button variant="outline-primary" size="sm" onClick={() => editeBook(book)}>
                      Edite
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          )):<span style={{textAlign:"center"}}>No Data!</span>}
        </div>

      </div>
    </div>
  )

}

export default Home;
