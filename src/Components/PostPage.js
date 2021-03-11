import './PostPage.css';
import React from 'react';
import nextId from 'react-id-generator';

import { Row, Col, Button, Form } from 'react-bootstrap';

import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';


import Prism from 'prismjs';
import './prism.css';


class PostPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      title: '',
      contentState: null,
      code: '',
      codeLanguage: '',
      post: [{
        post_id: '',
        post_title: '',
        post_body: '',
        post_code: '',
        post_codeLanguage: '',
        post_author: this.props.author,
        post_replies: [],
      }],
    }

    this.addPostToStorage = this.addPostToStorage.bind(this);
    this.getUserSuggestions = this.getUserSuggestions.bind(this);

  }

  componentDidMount() {
    Prism.highlightAll();
    this.getUserSuggestions();
    document.addEventListener("title-input", this.handleTitleInput)
    document.addEventListener("body-input", this.onContentStateChange)
    document.addEventListener("code-input", this.handleCodeInput)
    document.addEventListener("code-language", this.handleLanguageSelect)
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  componentWillUnmout() {
    document.removeEventListener("title-input", this.handleTitleInput)
    document.removeEventListener("body-input", this.onContentStateChange)
    document.removeEventListener("code-input", this.handleCodeInput)
    document.removeEventListener("code-language", this.handleLanguageSelect)
  }


  getUserSuggestions = () => {
    var currentPosts = JSON.parse(localStorage.getItem("post"))

    var currentUsers = [];
    currentPosts.map((x) => {
      currentUsers.push({ text: x.post_author, value: x.post_author})
    })
    
    this.setState({ userList: currentUsers});
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState: contentState,
    });

    console.log(this.state.userList);
  };

  handleTitleInput = (event) => {
    this.setState({
      title: event.target.value
    })
  }

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

  addPostToStorage(){
    var post_array = JSON.parse(localStorage.getItem("post")) || []
    post_array.push(this.state.post);


    localStorage.setItem("post", JSON.stringify(post_array))

    // For checking submitted data.
    // var i = JSON.parse(localStorage.getItem("post"));
    // console.log(i);
  }

  handleSubmit = () => {
    this.setState({
      post: {
        post_id: nextId(),
        post_title: this.state.title,
        post_body: draftToHtml(this.state.contentState),
        post_code: this.state.code,
        post_codeLanguage: this.state.codeLanguage,
        post_author: this.props.author,
        post_replies: [],
      }
    }, async () => {
      this.addPostToStorage();
      this.setState({
        title: '',
        contentState: null,
        code: '',
        codeLanguage: '',
      })

      //Redirects to home once submitted.
      window.location.replace('/');
    });

    // For clearing data: localStorage.clear();
  }

  render() {
    return (
      <div className="user-page">
        <Row>
          <Col lg="4" md="4" sm="12" xs="12" id="text-form">
            <h2> Share your thoughts (or struggles) </h2>
            <Form>
              <Form.Group>
                <Form.Label> Title </Form.Label>
                <Form.Control id="title-form" as="textarea" rows={1} onChange={this.handleTitleInput} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Body </Form.Label>
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
          </Col>
          <Col lg="4" md="4" sm="12" xs="12">
            <Form>
              <h2> Share your code (optional)</h2>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Select Language
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
          </Col>
          <Col lg="4" md="4" sm="12" xs="12">
            <h2> Code Preview </h2>
            <pre id="code-preview">
              <code className={this.state.codeLanguage}>
                {this.state.code}
              </code>
            </pre>
          </Col>
        </Row>
        <Button variant="secondary" id="form-submit-button" onClick={this.handleSubmit}> Submit </Button>
      </div>
    );
  }
}

export default PostPage;