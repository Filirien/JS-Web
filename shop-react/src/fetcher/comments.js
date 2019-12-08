export async function getProductComments (productId) {
  let comments = [];
  await fetch('http://localhost:1337/api/comments/' + productId)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      comments = response
    })
  return comments;
}

export async function createComment (comment) {
  let newComment = {};
  await fetch('http://localhost:1337/api/comments/', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      newComment = response
    })
  return newComment;
}

export async function updateComment (comment) {
  await fetch('http://localhost:1337/api/comments/', {
    method: 'PUT',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then()
}

export async function deleteComment (commentId) {
  await fetch('http://localhost:1337/api/comments/commentId=' + commentId, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then()
}
