import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import Comment from './shared/Comment'
import './Comments.css'

class Comments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      text: '',
      comments: this.props.comments
    };
  }

  inputChange = (e, key) => {
    let state = this.state;
    state[key] = e.target.value;
    this.setState(state);
  }

  handleBtnOnClick = () => {
    if (this.state.isEditing) {
      let comment = {
        text: this.state.text,
        productId: this.props.productId,
        author: JSON.parse(localStorage.getItem('user')).username
      };
      if (comment.text !== '') {
        this.props.createNotification('success', 'Comment created');
        this.props.addComment(comment);
      } else {
        this.props.createNotification('warning', 'You cannot post an empty comment');
      }
    }
    this.setState({ isEditing: !this.state.isEditing, text: '' });
  }

  render() {
    let comments = this.props.comments.map((comment, index) => {
      return (        
        
        <Comment
          key={comment._id}
          comment={comment}
          isCreator={this.props.author === comment.author}
          deleteComment={this.props.deleteComment}
          updateComment={this.props.updateComment}
          createNotification={this.props.createNotification}
        />
      );
    });

    let button = this.state.isEditing ? 'Post new comment' : 'Add new comment';
    let input = this.state.isEditing 
    ?
     <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text >Your comment:</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="Edit your comment" value={this.state.text} onChange={(e) => this.inputChange(e, 'text')} isRequired/>
  </InputGroup>
    
    //<input type='text-area' value={this.state.text} onChange={(e) => this.inputChange(e, 'text')} required /> 
    : '';

    return (
      <Card border="primary">
        <Card.Header className="App-title">Comments</Card.Header>
        <Card.Body>
          {comments}
          {input}
        </Card.Body>
        <Card.Footer>
          <Button variant="success" onClick={this.handleBtnOnClick}>{button}</Button>
        </Card.Footer>
      </Card>
    )
  }
}

Comments.propTypes = {
  productId: PropTypes.string,
  comments: PropTypes.array.isRequired,
  author: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired
}

export default Comments;
