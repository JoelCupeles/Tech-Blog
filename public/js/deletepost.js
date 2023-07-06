const deletePostHandler = async (event) => {
  event.preventDefault();

  const post = document.querySelector('.post');
  const postID = post.dataset.post;

  
  const response = await fetch('/dashboard/delete', {
    method: 'DELETE',
    body: JSON.stringify({ postID }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert('Failed to delete post.');
  }
};

document.querySelectorAll('.delete').forEach(item => {
  item.addEventListener('click', deletePostHandler);
});