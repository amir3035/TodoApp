import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Todo from './todo';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';


export default function Dashbord() {
  var [comp,setcomp]= useState(true)
  var [btnClass,setbtnClass]=useState("#EA4E4E")
  var [hide,sethide]=useState('Hide')
  const [title, settitle]=useState()
  const [desc, setdesc]=useState()
  let [date, setdate]=useState()


  useEffect(()=>{
    
});
// const fetchapi = async () => {
//   const apiData = await fetchtodos();
//   if (apiData) {
//     console.log('apidata',apiData);
//   }
// };
  
  const handelesubmit = async(e)=>{
    e.preventDefault();
    const jsonData = {title:title,description:desc,dueDate:date};

    axios.post('/api/todos/createtask', jsonData,
    {headers: {
      "accepts":"application/json",
      "access-control-allow-origin" : "*",
      "Content-type": "application/json; charset=UTF-8",
      'authorization':`Bearer ${localStorage.getItem('token')}`
    },}
    )
      // fetch("/api/todos",{
      //   method:'POST',
        // headers: {
        //   "accepts":"application/json",
        //   "access-control-allow-origin" : "*",
        //   //"Content-type": "application/json; charset=UTF-8"
        // },
      //   body:jsonData
      // })
      
      .then((response) =>{settitle(""); setdesc("");setdate("");})
      .then((data) => {
        // Handle response data here if needed
        confirmAlert({
          message:<div>
          Task added successfully.<br />
          We will notify you by email if you haven't completed it before the due date.<br />
          Happy tasking!!
        </div>,
          buttons: [
  
            {
              label: 'OK',
            },
          ]
        })
        console.log('Response:', data);
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const showhide=()=>{
    if (comp===true){
      setcomp(false)
      sethide('Show')
      setbtnClass("blue")
    }
    else{ setcomp(true)
    sethide('Hide')
    setbtnClass("#EA4E4E")}
  }
  return (
    <>
    <div className='container mt-5 pt-2'>
      <Form onSubmit={handelesubmit}>

      <Form.Group className="mb-3" controlId="formBasicEmail" style={{ display: 'flex' }}>
  
        <Form.Control 
        required
        type="Date" 
        value={date}
        onChange={(e) => setdate(e.target.value)}
        style={{ width: '20%' }}
        />
        <Form.Label style={{paddingLeft:'10px',color:'#ff4b44'}}><h6>Due date</h6></Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {/* <Form.Label><h5>Title</h5></Form.Label> */}
        <Form.Control 
        required
        type="text" 
        value={title}
        onChange={(e) => settitle(e.target.value)}
        placeholder="Enter Title"
        style={{ width: '50%' }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        {/* <Form.Label><h5>Description</h5></Form.Label> */}
        <Form.Control 
        required
        type="text"
        value={desc}
        onChange={(e) => setdesc(e.target.value)}
        placeholder="Enter Description" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Add Task
      </Button>
      
    
      <Button onClick={showhide}  style={{marginLeft:"5%",backgroundColor:btnClass}}>
        {hide} Tasks
      </Button>
    </Form>
    
    </div>
    {
    comp?
    (<div>
      <Todo callBack={true} ></Todo>
    </div>): (<h2 className='container py-5 my-5'>Press show button to display</h2>)
}
    </>
  )
}
