import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from "moment";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import APIConstants from '../constant/baseURL';

const Todo = (props) => {
  const [tododata, settododata] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  // const [status,setstatus]=useState()
  // const [important, setimportant]=useState()

  // useEffect(()=>{
  //     fetchtodos();

  // },[]);
  useEffect(() => {
    fetchtodos();
  }, [props])

  const deletetodo = async (id) => {
    console.log('id', id)
    fetch(`${APIConstants.base_url}/api/todos/deletetask/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the 'Authorization' header
        'Content-Type': 'application/json', // Set the content type if required by your server
      },
    })
      .then(() => fetchtodos(),
        console.log({ status: 'Delete successful' }));

  }
  const deleteconfirm = async (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this task.',
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
  const fetchtodos = async () => {
    //const token = localStorage.getItem('token');
    //console.log(token,'token')
    fetch(`${APIConstants.base_url}/api/todos/gettask`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "accepts": "application/json",
        "access-control-allow-origin": "*",
        authorization: `Bearer ${localStorage.getItem('token')}`,
        //"Content-type": "application/json; charset=UTF-8"
      },
      //body: JSON.stringify(data),
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        //console.log('data', data.data)
        settododata(data.data)
      })
  }
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filterdata = tododata.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filterdata)
    }
    else {
      setFilteredResults(tododata)
    }

  }
  const changeTaskStatus = (id) => {
   // e.preventDefault();
    const jsonData = {status:true};
    axios.patch(`${APIConstants.base_url}/api/todos/edittask/${id}`, jsonData,
    {headers: {
      "accepts":"application/json",
      "access-control-allow-origin" : "*",
      "Content-type": "application/json; charset=UTF-8",
      'authorization':`Bearer ${localStorage.getItem('token')}`
    },}
    )
      
      .then((response) =>{fetchtodos(); response.json()})
      .then((data) => {
        fetchtodos();
        // Handle response data here if needed
        console.log('Response:', data);        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const handleComplete=async(id)=>{
    confirmAlert({
      title: 'Confirm to submit',
      message: 'After mark as complete you cannot revert this change. Are you sure to mark this task as complete.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => changeTaskStatus(id)
        },
        {
          label: 'No',
        }
      ]
    })
  }
  const handleImp = async (id,indiData)=>{
    // e.preventDefault();
    let jsonData={important:!indiData};
    console.log('jsonData',jsonData)  
    if(jsonData.important===true){
      confirmAlert({
        message: 'Selected task added to the top of the list',
        buttons: [
          {
            label: 'OK',
          },
        ]
      }) 
    }  
    axios.patch(`${APIConstants.base_url}/api/todos/edittask/${id}`, jsonData,
    {headers: {
      "accepts":"application/json",
      "access-control-allow-origin" : "*",
      "Content-type": "application/json; charset=UTF-8",
      'authorization':`Bearer ${localStorage.getItem('token')}`
    },}
    )
      
      .then(() =>{fetchtodos();})
      .then((data) => {
        // Handle response data here if needed
        console.log('Response:', data);       
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <div className='container py-3' style={{ paddingTop: "50px" }}>
        <Form.Control style={{ border: '2px solid rgba(58, 166, 179, 0.8)', height: '30px', width: '30%' }} className=' rounded-pill' icon='search'
          placeholder='Search...'
          onChange={(e) => searchItems(e.target.value)}
        />
        {searchInput.length > 1 ? (
          (filteredResults.map((data) => (
            <div className='container py-2'>
              <Card >
                <Card.Header as="h5">Due Date: {moment(data.dueDate).utc().format('DD-MM-YYYY')}</Card.Header>
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>
                    {data.description}
                  </Card.Text>
                  <Button variant="danger" onClick={() => deleteconfirm(data._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          )))) : (tododata.slice()
          .sort((a, b) => (b.important === true ? 1 : -1)).map((data) => (
            <div className='container py-2'>
              <Card >
                <Card.Header as="h5">Due date: {moment(data.dueDate).utc().format('DD-MM-YYYY')}</Card.Header>
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>
                    {data.description}
                  </Card.Text>
                  <div style={{ display: 'flex' }}>
                    <Button variant="danger" onClick={() => deleteconfirm(data._id)}>Delete</Button>
                    <div className="form-check" style={{ marginLeft: "60%" }}>
                      <input className="form-check-input"
                      style={{ border: "2px solid #ccc", borderRadius: "2px" }}
                       type="checkbox"              
                        name="important"                      
                        checked={data.important===true}
                        onClick={() =>{handleImp(data._id,data.important)}}
                      />
                      <label className="form-check-label"><h5 style={{ color: "green" }}>Important</h5></label>
                    </div>
                    <div className="form-check" style={{ marginLeft: "5%", }}>
                      <input className="form-check-input"
                       style={{ border: "2px solid #ccc", borderRadius: "2px" }} 
                       type="checkbox"                        
                        name="status"                     
                        checked={data.status===true}
                        disabled={data.status===true}
                        onClick={() =>{handleComplete(data._id)}}
                      />
                      <label className="form-check-label"><h5 style={{ color: "#ff4b44" }}>Completed</h5></label>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )))}
      </div>
    </>
  )
}

export default Todo
