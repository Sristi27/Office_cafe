import React,{useEffect, useState} from "react";
import { Button, Jumbotron,Spinner } from "react-bootstrap";
import { Link,useParams } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import './successStyles.css'
import success from './images/success.jpg'
import {connect} from 'react-redux'




const Success=({items})=>{

const {id}=useParams();
console.log(items)

const [userImg,setUserImg]=useState('');
const [userData,setUserData]=useState('');

//fetch data passed from home using state in history.push 
useEffect(() => {
    fetch(`http://localhost:8000/add/fetchDetails/${id}`,
          {
            method:'GET',

          }).then(res=>res.json())
          .then(res=>
            {
                //fetched user data is saved to the corresponding fields 
                setUserData(res.data);
                setUserImg(res.data.image.replace("public", ""));
            })
          .catch(err=>{
            alert(err.error);
          })
}, [])



//displays user data in jumbotron
return(
  <div className="success-container">
    {userData?
    <div
    className="success-div">
    <div className="success-vector">
      <img src={success}></img>
    </div>
    <br/>
    <div className="success-text">
    <div className="reg-title">
      <h3>Great!</h3>
      <p className="reg-details">
      <p>You have successfully completed your registration.
       <br></br>Your Registration ID :<span style={{
        fontSize:'1.4em',
        color:'white',
        fontWeight:'bolder'
      }}>
        {userData._id.substr(0,8)}
      </span>
      <span>(Kindly do not share this with anyone!)</span></p>
      </p>
      
    </div>
    <p className="link">
        <Link to=
        {{
          pathname:`/cafepage/${id}`,
          state:
          {
            items:{items}
          }}}>
        <Button className="browse-button"
        >Browse Cafe Menu</Button>
        </Link>
        
    </p>
    </div>
    </div>:<Spinner animation="border" 
    role="status" className="spinner"/>}
    
    </div>
    

)

}




const mapStatetoProps=(state)=>
{

  
  return {
    items: state.cart
     }

}

export default  connect(mapStatetoProps)(Success)