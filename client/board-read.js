const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const post_id = urlParams.get('post_id');

document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:3000/board-read1?post_id=${post_id}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      const category = document.getElementById('board-category');
      const title = document.getElementById('board-title');
      const userid = document.getElementById('upload-name');
      const date = document.getElementById('upload-date');
      const content = document.getElementById('board-content');
      category.style.color = 'blue'
      date.style.color = 'gray'
      category.textContent = data.data[0].category;
      title.textContent = data.data[0].title;
      userid.textContent = data.data[0].userid;
      date.textContent = data.data[0].created_At;
      content.textContent = data.data[0].content;
      })
    }
  )

 const DeleteBtn = document.getElementById("btn-delete-board")
 DeleteBtn.addEventListener('click', () => {
  fetch(`http://localhost:3000/board-read1?post_id=${post_id}`,
  {
    method: 'DELETE'
  }).then(
        window.location.href = './board.html')
    .catch(error => {
      // 오류 처리
      console.error(error);
      alert('데이터 전송에 실패했습니다.');
    })
 })
