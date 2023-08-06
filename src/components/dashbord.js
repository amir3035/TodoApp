import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Todo from './todo';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Header from './header';

//import {fetchtodos} from './todo'
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

export default function Dashbord() {
  var [comp,setcomp]= useState(true)
  var [btnClass,setbtnClass]=useState("#ff4b44")
  var [hide,sethide]=useState('Hide')
  const [title, settitle]=useState()
  const [desc, setdesc]=useState()

  // const handleChange = (e) => {
  //   var { name, value } = e.target.value;
  //   setformdata({
  //     ...formdata,
  //     [name]: value,
  //   });
  // };
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
    const jsonData = {title:title,description:desc};

    axios.post('/api/todos', jsonData)
      // fetch("/api/todos",{
      //   method:'POST',
      //   headers: {
      //     "accepts":"application/json",
      //     "access-control-allow-origin" : "*",
      //     //"Content-type": "application/json; charset=UTF-8"
      //   },
      //   body:jsonData
      // })
      
      .then((response) =>{settitle(""); setdesc(""); response.json();})
      .then((data) => {
        // Handle response data here if needed
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
    setbtnClass("#ff4b44")}
  }
  return (
    <>
    <Header></Header>
    <div className='container mt-5'>
      <Form onSubmit={handelesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><h5>Title</h5></Form.Label>
        <Form.Control 
        required
        type="text" 
        value={title}
        onChange={(e) => settitle(e.target.value)}
        placeholder="Enter Title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label><h5>Description</h5></Form.Label>
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
