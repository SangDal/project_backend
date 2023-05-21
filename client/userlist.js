
// 회원 정보 조회 및 출력
function fetchAndRenderMembers() {
  fetch('http://localhost:3000/user/')
    .then(response => response.json())
    .then(data => {
      const membersTable = document.getElementById('userList');
      const tbody = membersTable.querySelector('tbody');

      console.log(data);
      data.forEach(member => {
        const tr = document.createElement('tr');
        tr.innerHTML = `										
        <th>
          <div class="dt-checkbox">
          <input
            type="checkbox"
          />
          <span class="dt-checkbox-label"></span>
        </div>
      </th>
          <td>${member.userid}</td>
          <td>${member.username}</td>
          <td>${member.hp}</td>
          <td>${member.guardianHp}</td>
          <td>${member.guardianHp2}</td>
          <td>
            <button class="delete-button" data-member-id="${member.userid}">
              삭제
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => console.error('회원 정보 조회 실패:', error));
}

// DOM 로딩이 완료되면 실행
document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderMembers();
});


// 회원 삭제
function deleteMember(memberId) {
  fetch(`http://localhost:3000/user/${memberId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      console.log('회원 삭제 성공');
      // 회원 삭제 후, 다시 회원 정보를 조회하여 출력
      fetchAndRenderMembers();
    } else {
      console.error('회원 삭제 실패');
    }
  })
  .catch(error => console.error('회원 삭제 실패:', error));
}

// 삭제 버튼 클릭 시 이벤트 처리
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const memberId = event.target.dataset.memberId;
    deleteMember(memberId);
  }
});