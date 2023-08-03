import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from "moment";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Todo = (props) => {
    const [tododata, settododata]=useState([])
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(()=>{
        fetchtodos();
        
    },[]);
    useEffect(()=>{
      fetchtodos();
    },[props])
    //'https://jsonplaceholder.typicode.com/todos/2/comments'

    const deletetodo=async(id)=>{
      console.log('id',id)
      fetch(`api/todos/${id}`, { method: 'DELETE' })
        .then(() => fetchtodos(),
        console.log({ status: 'Delete successful' }));
        
    }
    const deleteconfirm=async(id)=>{
      confirmAlert({
        title:'Confirm to submit',
        message:'Are you sure to delete this task.',
        buttons: [

          {
            label: 'Yes',
            onClick: () => deletetodo(id)
          },
          {
            label: 'No',
            //onClick: () => alert('Click No')
          }
        ]
      })
    }

    const fetchtodos=async ()=>{
        fetch('api/todos', {
          method: 'GET',
          mode: 'cors',
          headers: {
            "accepts":"application/json",
            "access-control-allow-origin" : "*",
            //"Content-type": "application/json; charset=UTF-8"
          },
          //body: JSON.stringify(data),
        })
        .then(response => {
          return response.json()
        })
        .then(data => {
          settododata(data.data)
        })
    }
    const searchItems = (searchValue) => {
      setSearchInput(searchValue)
      console.log('searchinput',searchInput)
      if(searchInput!==''){
      const filterdata=tododata.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filterdata)
    }
    else{
      setFilteredResults(tododata)
    }

    }

  return (
    
<div className='container py-3' style={{paddingTop:"50px"}}>
<Form.Control style={{border: '2px solid rgba(58, 166, 179, 0.8)', width: '20%'}} className=' rounded-pill' icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
            {searchInput.length > 1?(
    (filteredResults.map((data)=>(
         <div className='container py-2'>
    <Card >
      <Card.Header as="h5">created on: {moment(data.createdAt).utc().format('DD-MM-YYYY')}</Card.Header>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>
         {data.description}
        </Card.Text>
        <Button variant="danger" onClick={() => deleteconfirm(data._id)}>Delete</Button>
      </Card.Body>
    </Card>
     </div>
     )))):(tododata.map((data)=>(
      <div className='container py-2'>
 <Card >
   <Card.Header as="h5">created on: {moment(data.createdAt).utc().format('DD-MM-YYYY')}</Card.Header>
   <Card.Body>
     <Card.Title>{data.title}</Card.Title>
     <Card.Text>
      {data.description}
     </Card.Text>
     <Button variant="danger" onClick={() => deleteconfirm(data._id)}>Delete</Button>
   </Card.Body>
 </Card>
  </div>
  )))}
    </div>
    
  )
}

export default Todo
