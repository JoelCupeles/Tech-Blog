const createCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#content-comment').value.trim();
    const post = document.querySelector('.post');
    const postID = post.dataset.post;
  
    if (content) {
      const response = await fetch('/api/users/comment', {
        method: 'POST',
        body: JSON.stringify({ content, postID }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${postID}`);
      } else {
        alert('Failed to create comment.');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', createCommentFormHandler);