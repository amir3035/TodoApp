import React, { useEffect, useState } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import APIConstants from '../constant/baseURL'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
const Profile = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const [image, setimage]=useState();
    const [editMode,seteditMode]=useState(false);
    let [userdata,setuserdata]=useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        phone_Number:'',
        image:null,

    })
    let [confirmpass,setconfirmpass]=useState('')
    let [Newpass,setNewpass]=useState('')
    useEffect(()=>{
        setuserdata(location.state)
        
    },[location.state])
    useEffect(()=>{
        var imageURL = `${APIConstants.base_url}/${userdata.image}`;
            setimage(imageURL)
    },[userdata])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setuserdata((prevdata) => ({
          ...prevdata,
          [name]: value,
        }));      

    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        console.log(selectedImage,"selectedImage")
        // Check if a file was selected
        if (!selectedImage) {
          return;
        }
    
        // Check if the selected file is an image
        if (!selectedImage.type.startsWith('image/')) {
          alert('Please select an image file.');
          return;
        }
    
        // Update the 'image' field in userdata with the selected image file
        console.log(selectedImage,'selectedImage')
        setuserdata({ ...userdata, image: selectedImage });
        console.log('userdata',userdata)
      };

    const handleSave=async()=>{
        if(Newpass===confirmpass){
            try {
                // Replace 'your-api-endpoint' with your actual API endpoint
                const url = `/api/todos/edituser`;
                
                // Replace 'your-patch-data' with the data you want to send in the PATCH request
                
                const formData = new FormData();

                // Append the userdata fields to the FormData
                formData.append('email', userdata.email);
                formData.append('first_name', userdata.first_name);
                formData.append('last_name', userdata.last_name);
                formData.append('password', Newpass);
                formData.append('phone_Number', userdata.phone_Number);
            
                // Append the image file to the FormData
                formData.append('image', userdata.image);
                
                // Replace 'your-authorization-token' with the authorization token if required
                const token = localStorage.getItem('token');
                
                const headers = {
                  //'Content-Type': 'application/json',
                  'Content-Type': 'multipart/form-data',
                  // Include the authorization token if required
                  Authorization: `Bearer ${token}`,
                };
                
                // Send the PATCH request
                const response = await axios.patch(url, formData, { headers });
                
                // Handle the response
                console.log(response.data); // Log the response data or do something else with it
                confirmAlert({
                  message:'User details updated',
                  buttons: [
                    {
                      label: 'OK',
                      //onClick: () => alert('Click No')
                    }
                  ]
                })
                  navigate('/dashboard')
            } catch (error) {
                // Handle any errors that occurred during the PATCH request
                console.error('Error:', error);
                confirmAlert({
                  message:'Something went wrong.',
                  buttons: [
                    {
                      label: 'OK',
                      //onClick: () => alert('Click No')
                    }
                  ]
                })
              }
        }else{
            confirmAlert({
              title:'Password does not match',
              message:'Please enter password again',
              buttons: [
                {
                  label: 'OK',
                  //onClick: () => alert('Click No')
                }
              ]
            })
        }
    }
    const deleteProfile=async()=>{
      axios.delete(`/api/todos/deleteuser`,
    {headers: {
      "accepts":"application/json",
      "access-control-allow-origin" : "*",
      "Content-type": "application/json; charset=UTF-8",
      'authorization':`Bearer ${localStorage.getItem('token')}`
    },}
    )
      
      .then(() =>{  localStorage.removeItem('token');
      navigate('/')})
      .then((data) => {
        // Handle response data here if needed
        console.log('Response:', data);        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    const handleEdit=async()=>{
        seteditMode(true)
    }
    const handleDelete=async()=>{
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to delete your Account!!!',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteProfile()
          },
          {
            label: 'No',
          }
        ]
      })
  }
 
   return (
    <div>
    
    <div className="profile-container" style={styles.profileContainer}>
        {userdata && (
    <div style={styles.profileContent}>
    {editMode===true ? (
      <div className="profile-edit" style={styles.profileEdit}>
        <div className="profile-image-edit" style={styles.profileImageEdit}>
          <label>Edit Profile Image:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <div className="profile-fields" style={styles.profileFields}>
          <div className="input-field" style={styles.inputField}>
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={userdata.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field" style={styles.inputField}>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={userdata.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field" style={styles.inputField}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userdata.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field" style={styles.inputField}>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone_Number"
              value={userdata.phone_Number}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field" style={styles.inputField}>
            <label>New Password:</label>
            <input
              type="password"
              name="password"
              value={Newpass}
              onChange={(e)=>setNewpass(e.target.value)}
            />
          </div>
          <div className="input-field" style={styles.inputField}>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmpass"
              value={confirmpass}
              onChange={(e)=>setconfirmpass(e.target.value)} 
            />
          </div >
          <button style={styles.saveButton} className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    ) : (
      <div className="profile-read-only" style={styles.profileReadOnly}>
        <div className="profile-image-container" style={styles.profileImageContainer}>
          <img
            src={image}
            alt="Profile"
            style={styles.profileImage}
            // style={{
            //     paddingTop:'5%',
            //     paddingBottom:'5%',
            //     marginLeft:'5%',
            //     width: '20%',
            //     height: '20%',
            //     borderRadius: '30%',
            //     cursor: 'pointer'

            // }}
            className="profile-image"
          />
        </div>
        <div className="profile-fields"
        style={styles.profileFields}
        // style={{
        //     position:'absolute',
        //     alignItems:'right',
        //     marginLeft:'5%',
            
        // }}
        >
          <div className="field" style={styles.inputField}>
            <label>First Name: </label>
            <span>{userdata.first_name}</span>
          </div>
          <div className="field" style={styles.inputField}>
            <label>Last Name:</label>
            <span>{userdata.last_name}</span>
          </div>
          <div className="field" style={styles.inputField}>
            <label>Email:</label>
            <span>{userdata.email}</span>
          </div>
          <div className="field" style={styles.inputField}>
            <label>Phone Number:</label>
            <span>{userdata.phone_Number}</span>
          </div>
          {/* <div className="field">
            <label>Password:</label>
            <span>{userdata.password}</span>
          </div> */}
          <button style={styles.editButton} className="edit-button" onClick={handleEdit}>
            Edit
          </button>
          <button style={styles.editButtondel} className="edit-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    )}
    </div>
    )}
  </div>
  </div>
  )
}

const styles = {
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px',
  },
  profileContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  profileEdit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileImageEdit: {
    paddingBottom:'5%',
    paddingTop:'10%'
  },
  profileFields: {
    flex: 1,
  },
  inputField: {
    marginBottom: '20px',
  },
  profileImageContainer: {
    flex: '0 0 150px',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  saveButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4caf50',
    color: '#fff',
    cursor: 'pointer',
  },
  editButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  editButtondel:{
    padding: '10px 20px',
    marginLeft:'12%',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#EA4E4E',
    color: '#fff',
    cursor: 'pointer',
  },
  profileReadOnly:{
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
    maxWidth: '1000px',
    margin: '20px auto',
    padding: '20px',
    border: '5px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  }
};

export default Profile
