const deletePostHandler = async (event) => {
    const postId = event.target.getAttribute('data-id');
  
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  };
  
  document
    .querySelector('.delete-post-btn')
    .addEventListener('click', deletePostHandler);