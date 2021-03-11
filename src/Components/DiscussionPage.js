import './DiscussionPage.css';
import renderHTML from 'react-render-html';
import React from 'react';
import { Button, Container } from 'react-bootstrap';

import Prism from 'prismjs';
import './prism.css';

class DiscussionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postId: this.getId(),
      posts: [],
      post_replies: [{
        post_id: '',
        post_body: '',
        post_code: '',
        post_codeLanguage: '',
        post_author: '',
      }],
    }
  }

  componentDidMount() {
    this.getPosts();
    this.getId();

    Prism.highlightAll();
  }
  componentDidUpdate() {
    Prism.highlightAll();
  }

  getPosts = () => {
    this.setState({
      posts: JSON.parse(localStorage.getItem("post")),
    })
  }

  getId = () => {
    this.setState({ 
      postId: this.props.match.params.id 
    }, async () => {
      this.getReplies();
      console.log(this.state.post_replies);
    })

    
  }

  getReplies = () => {
    var post_array = JSON.parse(localStorage.getItem("post"))
    post_array.map((x) => {
        if(x.post_id === this.state.postId){
          this.setState({ post_replies: post_array[post_array.indexOf(x)].post_replies})
        }
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
                  <p key={item.post_title} id="post-title"> {item.post_title}  </p>
                  <p id="post-author"> Posted by: {item.post_author} </p>
                  <p> {renderHTML(item.post_body)}</p>
                  <p> </p>
                  <pre id="code-preview">
                    <code className={item.post_codeLanguage}>
                      {item.post_code}
                    </code>
                  </pre>
                  {this.state.post_replies ? (
                    this.state.post_replies.map((reply) => {
                      return (
                        <>
                          <p id="post-author"> Reply from: {reply.post_author} </p>
                          <p> {renderHTML(reply.post_body)}</p>
                          <pre id="code-preview">
                            <code className={reply.post_codeLanguage}>
                              {reply.post_code}
                            </code>
                          </pre>
                        </>
                      );
                    })
                  ) : (
                    <p> There are no replies to this question. Be the first one! </p>
                  )}
                  <Button variant="secondary" href={`/reply/${item.post_id}`}> Post Reply</Button>
                </>
              );
            }
            else {
              // Do nothing
            }
          })}


        </Container>
      </div>
    );
  }
}


export default DiscussionPage;