import './HomePage.css';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import React from 'react';
import renderHTML from 'react-render-html';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.getPosts();
  }
  componentDidUpdate() {
  }

  getPosts = () => {
    this.setState({
      posts: JSON.parse(localStorage.getItem("post")),
    })
  }


  render() {
    return (
      <div className="home-page" >
        {this.state.posts.map( (item) => (
          <p><a key={item.post_title} href="/user" id="post-title"> Title: {item.post_title} </a> </p>
        ))}
      </div>
    );
  }
}


export default HomePage;