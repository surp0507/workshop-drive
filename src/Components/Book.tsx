import React, { Component } from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import {Table} from 'react-bootstrap'

const getDataFromLs=()=>{
  const data=localStorage.getItem('books');
  if(data){
    return JSON.parse(data)
  }
 else{
   return []
 }
}
export default class Book extends Component {
  state={
   books:getDataFromLs(),
   title:"",
   author:"",
   Isbn:'',
   updateTitle:"",
   updateAuthor:"",
   updateIsbn:"",
   show:false
  }

 
  handleSubmit=(e:any)=>{
    alert("i am handle submit")

    e.preventDefault()
    const {title,author,Isbn,books}=this.state
    const book={title,author,Isbn}
    this.setState({books:[...books,book]})
   }
componentDidUpdate(){
  const {books}=this.state
  localStorage.setItem('books',JSON.stringify(books));
}

deleteBook=(id:any)=>{
  alert("deleted successfully")
  const {books}=this.state
  const filterBook=books.filter((item:any)=>{
    return item.Isbn!==id
  })
  this.setState({books:filterBook});

}

editeBook=(data:any)=>{
const {title,author,Isbn}=data
this.setState({updateTitle:title});
this.setState({updateAuthor:author});
this.setState({updateIsbn:Isbn});
this.setState({show:true})
}

updateBook=()=>{

} 
 
render() {
  const {books,updateAuthor,updateTitle,updateIsbn,show}=this.state
  return (
      <div>
       <h2 className="heading">Book List App</h2>
       <div className="main">
       <div className="form-container">
         
       <form onSubmit={this.handleSubmit} className="form-group">
          <label >Title</label>
          <input value={updateTitle} type="text" className="form-control" onChange={(e)=>this.setState({title:e.target.value,updateTitle:e.target.value})} />
          <label >Author</label>
          <input value={updateAuthor}type="text" className="form-control" onChange={(e)=>this.setState({author:e.target.value,updateAuthor:e.target.value})}/>
          <label >Isbn#</label>
          <input value={updateIsbn} type="text" className="form-control" onChange={(e)=>this.setState({Isbn:e.target.value,updateIsbn:e.target.value})}/>
            {show?
              <button 
                onClick={()=>this.updateBook()}
                className="btn btn-md" 
                style={{backgroundColor:"green"}} >
                Update book 
              </button>
          
           :
           <button type="submit" className="btn btn-md">Add book</button>
             }
          </form>
       
         </div>
         <div className="veiw-container">
            <h5 className="text-center heading my-4" >view books</h5>
            {books.map((book:any)=>(
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
              <tr >
            
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.Isbn}</td>
                 <td><FaTrashAlt onClick={()=>this.deleteBook(book.Isbn)}/></td>
                 <td>
                   <button className="btn-sm btn-success" onClick={()=>this.editeBook(book)}>
                     Edite
                  </button>
                </td>
              </tr>
           </tbody>
          </Table>
            ))}
         </div>
      
       </div>
      </div>
    )
  }
}
