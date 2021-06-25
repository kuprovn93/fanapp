import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import "../App.css";
import background from "../image/img_bg.jpg";

export default class HomePage extends Component {
  render() {
    return (
        
      
          
          // <div style={{ backgroundImage: `url(${background})` }}>
          <div className="App">
          <Header className="App-header"></Header>
            <div  style = {{}}>
              <h1 class = "form-element">Welcome to FanApp &#128512;</h1>
              <h2 class="form-element" variant="contained" color="primary">Where Support Gets Creepy</h2>
              <div class="form-element">
                <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New Account</Link>
                
              </div>
              <div class="form-element">
                
                <Link className="btn px-5" to="/login">Login to Your Account</Link>
              </div>
            </div>
            <Footer></Footer>
          </div>
          // </div>
        
        
    
    )
  }
}