import React,{  Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, TextField } from '@material-ui/core';
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import firebase from 'firebase';
import PostListItem from "../components/Post"



export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      post: '',
      posts:[],
      readError: null,
      writeError: null,
      loadingPosts: false,
      userRole:null
    
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.myRef = React.createRef();
  }

  
  async componentDidMount() {
    auth().onAuthStateChanged(function(u) {
      console.log(u);
			if (u) {
				
			console.log(u );
			} else {
				this.setState({ user: null });
			}
			
		});
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    console.log(this.state.user.uid);
    var docRef = db.collection("Users").doc(this.state.user.uid);

    docRef.get().then((doc) => {
    if (doc.exists) {
        this.setState({userRole: doc.data().UserRole});
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
    console.log("Error getting document:", error);
    });

    try {
      db.collection("Posts").onSnapshot( snapshot => {

        let posts = [];
        snapshot.forEach((snap) => {
          posts.push(snap.data());
        });
        console.log(posts);
        posts.sort(function (a, b) { return b.CreatedAt - a.CreatedAt })
        this.setState({ posts });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }
  

  handleChange(event) {
    this.setState({
      post: event.target.value
    });
    
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.post);
    this.setState({ writeError: null });
    
    // const chatArea = this.myRef.current;
    try {
      if (this.state.post === ""){
        throw ("Post Cannot be empty")
      }
      db.collection("Posts").add({
        PostData: this.state.post,
        CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        Author: this.state.user.email
      });
      
      console.log("post save successfully");
      // chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      console.log(error.message);
      this.setState({ writeError: error.message });
    }
    this.setState({post: '' });
  }

  async formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      
      <div className = "App">
        
        <Header />

        <h1>Your FanApp Page </h1>
        <div>
        <div className="chat-area form-element" ref={this.myRef}>
          {/* loading indicator */}
          {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}
          {/* chat area */}
          {this.state.posts.map(chat => {
            return <PostListItem post={chat.PostData} author={chat.Author} timestamp={chat.CreatedAt.seconds}>
            <br/>
            </PostListItem>
          })}
        </div>
        </div>
        <br></br>

        
        {/* if (db.collection("Users").doc(auth().currentUser.uid.UserRole.localeCompare("Admin") === 0)) {
          classes.push("admin-user")
        }
        else {
        classes.push("customer-user")
        } */}

       
        
        <form onSubmit={this.handleSubmit} className={this.state.userRole === "Customer" ? "customer-user": "admin-user"}>
          <TextField  className="form-element" label="How are you feeling today? " name="post" onChange={this.handleChange} value={this.state.post}></ TextField >
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
          <Button variant="contained" type="submit" className="btn btn-submit px-5 mt-4">Post </Button>
        </form>

       


      <Footer></Footer>
      </div>
      
     
    );
  }
}