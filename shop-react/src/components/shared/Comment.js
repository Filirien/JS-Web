import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      text: this.props.comment.text,
      date: '',
      comment: this.props.comment
    };
  }

  formatTime = (date) => {
    let dateFormat = new Date(date);
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    let day = dateFormat.getDate();
    let monthIndex = dateFormat.getMonth();
    let year = dateFormat.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  editClick = () => {
    if (this.state.isEditing) {
      let comment = this.state.comment;
      comment.text = this.state.text;
      this.props.createNotification('info', 'Comment updated');
      this.props.updateComment(comment);
    }
    this.setState({ isEditing: !this.state.isEditing });
  }

  deleteClick = id => {
    this.props.createNotification('info', 'Comment deleted');
    this.props.deleteComment(id);
  }

  inputChange = (e, key) => {
    let state = this.state;
    state[key] = e.target.value;
    this.setState(state);
  }

  render() {
    let isAdmin = JSON.parse(localStorage.getItem('user')).roles[0] === 'Admin';
    let btnText = this.state.isEditing ? 'Save' : 'Edit';
    let commentText = this.state.isEditing
      ? <p><input type='text' value={this.state.text} onChange={(e) => this.inputChange(e, 'text')} required /></p>
      : <p>{' - ' + this.state.comment.text}</p>;

    let authorBtns = isAdmin || this.props.isCreator
      ? <div>
        <button onClick={this.editClick}>
          {btnText}
        </button>
        <button onClick={() => this.deleteClick(this.props.comment._id)}>
          Remove
        </button>
      </div>
      : '';

    return (
      <div>
        <div>
          <span>{this.state.comment.author}</span>
          <span>{this.formatTime(this.state.comment.date)}</span>
          {commentText}
        </div>
        {authorBtns}
        <hr />
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  isCreator: PropTypes.bool.isRequired,
  deleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired
}

export default Comment
