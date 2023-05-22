let postIds = []
document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('categorySelect');
    const boardList = document.getElementById("boardList");
    // 이전에 추가된 데이터 삭제
    while (boardList.firstChild) {
      boardList.firstChild.remove();
    }
    // 첫 페이지에 전체 리스트 뿌리기
    fetch(`http://localhost:3000/board?category=전체`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      for (let i in data.result) {
        let tableRow = document.createElement('tr');
        let tableData0 = document.createElement('td');
        let tableData1 = document.createElement('td');
        let tableData2 = document.createElement('td');
        let tableData3 = document.createElement('td');
        let tableData4 = document.createElement('td');
        
        // checkbox 생성
        tableData0.className = 'dt-body-center';
        let checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'dt-checkbox';
        let checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.name = 'id[]';
        let checkboxLabel = document.createElement('span');
        checkboxLabel.className = 'dt-checkbox-label';
        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(checkboxLabel);
        tableData0.appendChild(checkboxDiv);
        checkboxInput.addEventListener('change', ()=>{
          const post_id = data.result[i].post_id
          postIds.push(post_id)
        }
        )
        tableRow.appendChild(tableData0);
        tableData1.textContent = data.result[i].category;
        tableRow.appendChild(tableData1);
        tableData2.textContent = data.result[i].userid;
        tableRow.appendChild(tableData2);
        tableData3.textContent = data.result[i].title;
        tableData3.addEventListener('click', () => {
          // 클릭 이벤트 핸들러 내에서 새로운 페이지로 이동하는 코드 작성
          const post_id = data.result[i].post_id; // 게시판 ID 또는 해당하는 식별자
          location.href = `./board-read1.html?post_id=${post_id}`; // 새로운 페이지로 이동 및 게시판 ID 전달
          
        })
        tableData3.style.cursor = 'pointer';
        tableRow.appendChild(tableData3);
        tableData4.textContent = data.result[i].created_At;
        tableRow.appendChild(tableData4);
        boardList.appendChild(tableRow);
      }
    })
    .catch(function(error) {
      console.error(error);
      alert('게시판 데이터 요청에 실패했습니다.'); // 게시판 데이터 가져오기 실패 시 알림 표시
    })

    // 카테고리 변경 시 해당되는 리스트 뿌리기
    categorySelect.addEventListener('change', () => {
      let selectedCategory = categorySelect.value;
      // 이전에 추가된 데이터 삭제
      while (boardList.firstChild) {
        boardList.firstChild.remove();
      }
      fetch(`http://localhost:3000/board?category=${selectedCategory}`, {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'category': selectedCategory}
        // --> headers에는 변수를 담을 수 없고 문자열만 담을 수 있음. 따라서 url에 직접 넣어줌..
      })
        .then(response => response.json())
        .then(data => {
          for (let i in data.result) {
            let tableRow = document.createElement('tr');
            let tableData0 = document.createElement('td');
            let tableData1 = document.createElement('td');
            let tableData2 = document.createElement('td');
            let tableData3 = document.createElement('td');
            let tableData4 = document.createElement('td');
            // checkbox 생성
            tableData0.className = 'dt-body-center';
            let checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'dt-checkbox';
            let checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.name = 'id[]';
            let checkboxLabel = document.createElement('span');
            checkboxLabel.className = 'dt-checkbox-label';
            checkboxDiv.appendChild(checkboxInput);
            checkboxDiv.appendChild(checkboxLabel);
            tableData0.appendChild(checkboxDiv);
            checkboxInput.addEventListener('change', ()=>{
              const post_id = data.result[i].post_id
              postIds.push(post_id)
            }
            )
            // tableData0.classList().add(" dt-body-center");
            tableRow.appendChild(tableData0);
            tableData1.textContent = data.result[i].category;
            tableRow.appendChild(tableData1);
            tableData2.textContent = data.result[i].userid;
            tableRow.appendChild(tableData2);
            tableData3.textContent = data.result[i].title;
            tableData3.addEventListener('click', () => {
              // 클릭 이벤트 핸들러 내에서 새로운 페이지로 이동하는 코드 작성
              const post_id = data.result[i].post_id; // 게시판 ID 또는 해당하는 식별자
              location.href = `./board-read1.html?post_id=${post_id}`; // 새로운 페이지로 이동 및 게시판 ID 전달
            })
            tableData3.style.cursor = 'pointer';
            tableRow.appendChild(tableData3);
            tableData4.textContent = data.result[i].created_At;
            tableRow.appendChild(tableData4);
            boardList.appendChild(tableRow);
          }
        })
        .catch(function(error) {
          console.error(error);
          alert('게시판 데이터 요청에 실패했습니다.'); // 게시판 데이터 가져오기 실패 시 알림 표시
        })
      })
      const deleteButton = document.getElementById('btn-delete-a');
      deleteButton.addEventListener('click', () => deletePosts());
      function deletePosts() {
        postIds.forEach((postId) => {
          fetch(`http://localhost:3000/board?post_id=${postId}`, {
            method: 'DELETE',
          })
            .then((response) => {
              if (response.ok) {
                console.log(`Post with post_id ${postId} deleted successfully.`);
              } else {
                console.log(`Failed to delete post with post_id ${postId}.`);
              }
            })
            .catch((error) => {
              console.error(`An error occurred while deleting post with post_id ${postId}.`, error);
            });
        })
        location.href = './board.html';
      }
    }
  )

