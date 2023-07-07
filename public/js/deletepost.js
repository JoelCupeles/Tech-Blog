document.querySelectorAll('.delete-post').forEach(button => {
  button.addEventListener('click', function(event) {
      const postId = this.getAttribute('data-id');
      
      fetch(`/dashboard/post/${postId}`, {
          method: 'DELETE',
      })
      .then(response => {
          if (response.ok) {
              document.location.reload();
          } else {
              alert('Failed to delete post');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});