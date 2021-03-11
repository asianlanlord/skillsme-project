import './HomePage.css';
import { useState } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';

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
          <>
          <p><a key={item.post_title} href="/discussion" id="post-title"> {item.post_title} </a> </p>
          <p id="post-author"> Posted by: {item.post_author} </p>
          </>
        ))}

        <Button variant="secondary" href="/post"> Post New Discussion</Button>
      </div>
    );
  }
}


export default HomePage;