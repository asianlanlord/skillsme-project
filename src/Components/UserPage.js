import './UserPage.css';
import Prism from 'prismjs';
import './prism.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { Row, Col, Button, Form } from 'react-bootstrap';
import React from 'react';


class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      userSuggestions: '',
      title: '',
      contentState: null,
      code: '',
      codeLanguage: '',
      post: {
        post_title: ' ',
        post_body: ' ',
        post_code: ' ',
        post_codeLanguage: '',
      },
    }

  }

  componentDidMount() {
    Prism.highlightAll();
  }
  componentDidUpdate() {
    Prism.highlightAll();
  }

  onContentStateChange = (contentState) => {
    console.log('as HTML: ', draftToHtml(contentState))
    this.setState({
      contentState: contentState,
    });
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

  handleSubmit = () => {
    this.setState({
      post: {
        post_title: this.state.title,
        post_body: draftToHtml(this.state.contentState),
        post_code: this.state.code,
        post_codeLanguage: this.state.codeLanguage,
      }
    })

    localStorage.setItem("post", JSON.stringify(this.state.post))

    var i = JSON.parse(localStorage.getItem("post"));
    console.log(i);
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
                <Form.Control id="title-form" as="textarea" rows={1} onChange={this.handleTitleInput}/>
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
                    suggestions: [
                      { text: 'APPLE', value: 'apple', url: 'apple' },
                      { text: 'BANANA', value: 'banana', url: 'banana' },
                      { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                      { text: 'DURIAN', value: 'durian', url: 'durian' },
                      { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                      { text: 'FIG', value: 'fig', url: 'fig' },
                      { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                      { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                    ],
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
              <code  className={this.state.post.codeLanguage}>
                {this.state.post.code}
              </code>
            </pre>
          </Col>
        </Row>
        <Button variant="secondary" id="form-submit-button" onClick={this.handleSubmit}> Submit </Button>
      </div>
    );
  }
}

export default UserPage;