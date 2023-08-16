import React, { useEffect, useState, useCallback} from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APIConstants from '../constant/baseURL'
import axios from 'axios';

const ProfileIcon = (props) => {

    let [userData, setuserData] = useState('')
    const [image, setimage]=useState();
    useEffect(()=>{
        fetchuser();
      },[props])
      const fetchuser=useCallback (async()=>{
          try {
              const response = await axios.get(`/api/todos/getuser`,{
                  headers: {
                  "accepts": "application/json",
                  "access-control-allow-origin": "*",
                  "Content-type": "application/json; charset=UTF-8",
                  'authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }) 
            const userData = response.data.data; // Extract the user data from the response
            setuserData(userData);
            var imageURL = `${APIConstants.base_url}/${userData.image}`;
            setimage(imageURL)
          }
          catch(error){
            console.log('error when fetching userData for profile',error)
          }
      }, [])  
       

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    };

    const profileClick = () => {
        navigate('/profile',{state:userData}) // Redirect to profile page
    };


    return (
        <Dropdown style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '30px',
            paddingRight: '30px',
        }}>
            <Dropdown.Toggle style={{ background: '#282626' }} variant="success" id="profile-dropdown">
                <img src={image}
                    alt="Profile"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        cursor: 'pointer'

                    }}
                    className="profile-image" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={profileClick}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileIcon;
