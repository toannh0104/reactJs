// increment
export function increment(index, id) {
  return {
    type: 'INCREMENT_LIKES',
    index: index,
    id
  }
}

// add comment
export function addComment(postId, author, comment) {
    console.log("Add comment");
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  }
}

// remove comment

export function removeComment(postId, i) {
    console.log("Remove comment");
  return {
    type: 'REMOVE_COMMENT',
    i,
    postId
  }
}