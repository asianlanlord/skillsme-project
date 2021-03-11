import './PostPage.css';
import React from 'react';

import { Row, Col, Button, Form, Container } from 'react-bootstrap';

import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';


import Prism from 'prismjs';
import './prism.css';


class ReplyPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      contentState: null,
      code: '',
      codeLanguage: 'language-js',
      id: window.location.pathname.slice(7, 15),
      post: [{
        post_id: '',
        post_body: '',
        post_code: '',
        post_codeLanguage: '',
        post_author: '',
      }],
    }

    this.addReplyToStorage = this.addReplyToStorage.bind(this);
    this.getUserSuggestions = this.getUserSuggestions.bind(this);

  }

  componentDidMount() {
    Prism.highlightAll();
    this.getUserSuggestions();
    console.log(this.state.id);
    document.addEventListener("body-input", this.onContentStateChange)
    document.addEventListener("code-input", this.handleCodeInput)
    document.addEventListener("code-language", this.handleLanguageSelect)
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  componentWillUnmout() {
    document.removeEventListener("body-input", this.onContentStateChange)
    document.removeEventListener("code-input", this.handleCodeInput)
    document.removeEventListener("code-language", this.handleLanguageSelect)
  }

  // Get list of users and return as array for use in react-draftjs-wysiwyg component.
  getUserSuggestions = () => {
    var currentPosts = JSON.parse(localStorage.getItem("post"))

    if (!currentPosts) {
      console.log("There are no posts");
    } else {
      var currentUsers = [];
      currentPosts.map((x) => {
        currentUsers.push({ text: x.post_author, value: x.post_author })
      })

      this.setState({ userList: currentUsers });
    }
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState: contentState,
    });

    console.log(this.state.userList);
  };

  handleCodeInput = (event) => {
    this.setState({
      code: event.target.value
    });
  }

  handleLanguageSelect = (event) => {
    this.setState({
      codeLanguage: event.target.value
    });
  }

  // Add reply to the post_replies object of post with the same id.
  addReplyToStorage() {
    if (!this.state.contentState || !this.state.code) {
      alert("Replies must contain a proper message and some code!")
    } else {
      var post_array = JSON.parse(localStorage.getItem("post"))
      post_array.map((x) => {
        if (x.post_id === this.state.id) {
          x.post_replies.push(this.state.post);
        }
      })

      console.log(post_array);
      localStorage.setItem("post", JSON.stringify(post_array))
    }

    // For checking submitted data.
    // var i = JSON.parse(localStorage.getItem("post"));
    // console.log(i);
  }

  handleSubmit = () => {
    this.setState({
      post: {
        post_id: this.state.id,
        post_body: draftToHtml(this.state.contentState),
        post_code: this.state.code,
        post_codeLanguage: this.state.codeLanguage,
        post_author: this.props.author,
      }
    }, async () => {
      this.addReplyToStorage();
      this.setState({
        contentState: null,
        code: '',
        codeLanguage: '',
      })

      //Redirects to discussion page with same id when submitted.
      window.location.replace(`/discussion/${this.state.post.post_id}`);
    });
    // For clearing data: localStorage.clear();
  }

  render() {
    return (
      <div className="user-page">
        <Row>
          <Col lg="4" md="4" sm="12" xs="12" id="column">
            <Container id="text-form">
              <h3> Share your answer: </h3>
              <Form>
                <Form.Group>
                  <Form.Label> Answer </Form.Label>
                  <Editor
                    editorContent={this.state.contentState}
                    wrapperClassName="form-wrapper"
                    editorClassName="editor-container"
                    mention={{
                      separator: ' ',
                      trigger: '@',
                      suggestions: this.state.userList,
                    }}
                    hashtag={{}}
                    onContentStateChange={this.onContentStateChange}
                  />
                </Form.Group>
              </Form>
            </Container>
          </Col>
          <Col lg="4" md="4" sm="12" xs="12" id="column">
            <Container id="code-editor">
              <Form>
                <h3> Step 2: </h3>
                <h4> Share your code </h4>
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={2}>
                    Select
              </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="HTML"
                      name="language-selector"
                      id="HTML-language-selector"
                      value="language-html"
                      onChange={this.handleLanguageSelect}
                    />
                    <Form.Check
                      type="radio"
                      label="CSS"
                      name="language-selector"
                      id="CSS-language-selector"
                      value="language-css"
                      onChange={this.handleLanguageSelect}
                    />
                    <Form.Check
                      type="radio"
                      label="Javascript (default)"
                      name="language-selector"
                      id="javascript-language-selector"
                      value="language-js"
                      onChange={this.handleLanguageSelect}
                    />
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Your code: </Form.Label>
                  <Form.Control id="code-form" as="textarea" placeholder="Write or paste your code here" rows={3} onChange={this.handleCodeInput} />
                </Form.Group>
              </Form>
            </Container>
          </Col>
          <Col lg="4" md="4" sm="12" xs="12">
            <Container id="code-editor">
              <h3> Step 3: </h3>
              <h4> Preview code and submit</h4> 
              <pre id="code-preview">
                <code className={this.state.codeLanguage}>
                  {this.state.code}
                </code>
              </pre>
            </Container>
          </Col>
        </Row>
        <Button variant="secondary" id="form-submit-button" onClick={this.handleSubmit}> Submit </Button>
      </div>
    );
  }
}

export default ReplyPage;