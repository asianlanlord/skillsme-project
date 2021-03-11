import './HomePage.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { Button, Container} from 'react-bootstrap';

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
        <h1 id="page-header"> Discussions </h1>
        {this.props.user ? (
          [
            (!this.state.post ? this.state.posts.map((item) => (
              <Container>
              <div id="post-card">
                <p key={item.post_id}><Link to={`/discussion/${item.post_id}`} id="post-title"> {item.post_title} </Link> </p>
                <p id="post-author"> Posted by: {item.post_author} </p>
              </div>
              </Container>
            )) : (
              <p> There are no posts on the site</p>
            )),
            <Button variant="secondary" href="/post"> Post New Discussion</Button>
          ]
        ) : (
          <p id="page-header">  Log in to view and post discussions </p>
        )}
        
      </div>
    );
  }
}


export default HomePage;