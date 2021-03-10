import './HomePage.css';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import React from 'react';
import renderHTML from 'react-render-html';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {
        post_title: '',
        post_body: '',
        post_code: '',
        post_codeLanguage: '',
      }
    }
  }

  componentDidMount() {
  }
  componentDidUpdate() {
  }

  getLocalItem = () => {
    var i = JSON.parse(localStorage.getItem("post"));
    console.log(i.post_title)
    console.log(i.post_body)
    console.log(i.post_code)
    console.log(i.post_codeLanguage)

    return i;
  }

  getPosts = () => {
    var localPosts = this.getLocalItem();
    this.setState({ post: {
      post_title: localPosts.post_title,
      post_body: localPosts.post_body,
      post_code: localPosts.post_code,
      post_codeLanguage: localPosts.post_codeLanguage
    }})

    console.log(this.state.post.post_title);
  }

  render() {
    return (
      <div className="home-page" >
        <p onClick={this.getPosts}> Get posts</p>
        {renderHTML(this.state.post.post_body)}
      </div>
    );
  }
}


export default HomePage;