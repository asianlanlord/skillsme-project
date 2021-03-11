import './DiscussionPage.css';
import { useState } from 'react';
import renderHTML from 'react-render-html';
import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

import Prism from 'prismjs';
import './prism.css';

class DiscussionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postId: "id3",
      posts: [],
    }
  }

  componentDidMount() {
    this.getPosts();
    Prism.highlightAll();
  }
  componentDidUpdate() {
    Prism.highlightAll();
    console.log(this.state.posts);
  }

  getPosts = () => {
    this.setState({
      posts: JSON.parse(localStorage.getItem("post")),
    })   
  }


  render() {
    return (
      <div className="discussion-page" >
        <Container>
          {this.state.posts.map((item) => {
            if (item.post_id === this.state.postId) {
              return (
                <>
                  <p><a key={item.post_title} id="post-title"> {item.post_title} </a> </p>
                  <p id="post-author"> Posted by: {item.post_author} </p>
                  <p> {renderHTML(item.post_body)}</p>
                  <pre id="code-preview">
                    <code className={item.post_codeLanguage}>
                      {item.post_code}
                    </code>
                  </pre>
                </>
              );
            }
            else {
            }
          })}

          <Button variant="secondary" href="/post"> Post Reply</Button>
        </Container>
      </div>
    );
  }
}


export default DiscussionPage;