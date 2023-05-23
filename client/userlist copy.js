document.addEventListener('DOMContentLoaded', function () {
  const addUserForm = document.createElement('form');
  const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옴
  addUserForm.innerHTML = `
  <h3>회원 정보 수정</h3>
  <div>
    <label for="username">이름:</label>
    <input type="text" id="username" name="username" required>
  </div>
  <div>
    <label for="guardianHp">보호자 휴대폰 <h2>회원 추가</h2>
    <form id="addUserForm">
      <div>
        <label for="userid">ID:</label>
        <input type="text" id="userid" name="userid" required>
      </div>
      <div>
        <label for="username">이름:</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div>
        <label for="guardianHp">보호자 휴대폰 번호:</label>
        <input type="text" id="guardianHp" name="guardianHp" required>
      </div>
      <div>
        <label for="guardianHp2">보호자 휴대폰 번호2:</label>
        <input type="text" id="guardianHp2" name="guardianHp2" required>
      </div>
      <div>
        <label for="hp">휴대폰 번호:</label>
        <input type="text" id="hp" name="hp" required>
      </div>
      <button type="submit">추가</button>
    </form> 번호:</label>
    <input type="text" id="guardianHp" name="guardianHp" required>
  </div>
  <div>
    <label for="guardianHp2">보호자 휴대폰 번호2:</label>
    <input type="text" id="guardianHp2" name="guardianHp2" required>
  </div>
  <div>
    <label for="hp">휴대폰 번호:</label>
    <input type="text" id="hp" name="hp" required>
  </div>
  <button type="submit">수정</button>
`;
  addUserForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const userid = document.getElementById('userid').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const guardianHp = document.getElementById('guardianHp').value;
    const guardianHp2 = document.getElementById('guardianHp2').value;
    const hp = document.getElementById('hp').value;

    const newUser = {
      userid: userid,
      username: username,
      password: password,
      guardianHp: guardianHp,
      guardianHp2: guardianHp2,
      hp: hp
    };

    fetch('http://localhost:3000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token // 가져온 토큰을 헤더에 추가
      },
      body: JSON.stringify(newUser)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('회원 추가에 실패했습니다.');
        }
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data.message);
        console.log(data);
        // TODO: 추가한 회원 정보를 화면에 표시하거나 다른 작업 수행
        const userInfoElement = document.getElementById('userInfo');
        const { userid, username, password, guardianHp, guardianHp2, hp } = data;

        const userInfoHTML = `
            <p><strong>ID:</strong> ${userid}</p>
            <p><strong>이름:</strong> ${username}</p>
            <p><strong>비밀번호:</strong> ${password}</p>
            <p><strong>보호자 휴대폰 번호:</strong> ${guardianHp}</p>
            <p><strong>보호자 휴대폰 번호2:</strong> ${guardianHp2}</p>
            <p><strong>휴대폰 번호:</strong> ${hp}</p>
            `;

        userInfoElement.innerHTML = userInfoHTML;
        fetchAndRenderMembers(); // 회원 정보 갱신
      })
      .catch(function (error) {
        console.error(error);
        // TODO: 오류 처리
      });
  });

  // 회원 정보 조회 및 출력
  function fetchAndRenderMembers() {
    fetch('http://localhost:3000/user/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token // 가져온 토큰을 헤더에 추가
      }
    })
      .then(response => response.json())
      .then(data => {
        const membersTable = document.getElementById('userList');
        const tbody = membersTable.querySelector('tbody');
        tbody.innerHTML = '';

        console.log(data);
        data.forEach(member => {
          const tr = document.createElement('tr');
          tr.innerHTML = `										
          <th></th>
            <td>${member.userid}</td>
            <td>${member.username}</td>
            <td>${member.guardianHp}</td>
            <td>${member.guardianHp2}</td>
            <td>${member.hp}</td>
            <td>
            <div class="dropdown">
              <button class="btn btn-primary edit-button" data-member-id="${member.userid}" type="button">
                수정
              </button>
              <button class="btn btn-primary" id="btn-delete-a" data-member-id="${member.userid}" type="button" data-toggle="dropdown">
                삭제
              </button>
              <div id="editContainer"></div>
              <div class="dropdown-menu">
                <a class="dropdown-item delete-button" href="#" data-member-id="${member.userid}">확인</a>
              </div>
            </div> 

            </td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(error => console.error('회원 정보 조회 실패:', error));
  }

  // 회원 정보 수정 함수
  function updateMember(memberId) {
    const updateForm = document.createElement('form');
    updateForm.innerHTML = `
      <h3>회원 정보 수정</h3>
      <div>
        <label for="username">이름:</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div>
        <label for="guardianHp">보호자 휴대폰 번호:</label>
        <input type="text" id="guardianHp" name="guardianHp" required>
      </div>
      <div>
        <label for="guardianHp2">보호자 휴대폰 번호2:</label>
        <input type="text" id="guardianHp2" name="guardianHp2" required>
      </div>
      <div>
        <label for="hp">휴대폰 번호:</label>
        <input type="text" id="hp" name="hp" required>
      </div>
      <button type="submit">수정</button>
    `;

    function MemberData(memberId) {
      fetch(`http://localhost:3000/user/${memberId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token // 가져온 토큰을 헤더에 추가
        }
      })
        .then(response => response.json())
        .then(data => {
          const { username, guardianHp, guardianHp2, hp } = data;
          updateForm.elements.username.value = username;
          updateForm.elements.guardianHp.value = guardianHp;
          updateForm.elements.guardianHp2.value = guardianHp2;
          updateForm.elements.hp.value = hp;
        })
        .catch(error => console.error('회원 정보 조회 실패:', error));
    }
    MemberData(memberId); // memberId를 이용하여 회원정보내용 불러 오는 함수

    updateForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const updatedData = {
        username: updateForm.elements.username.value,
        guardianHp: updateForm.elements.guardianHp.value,
        guardianHp2: updateForm.elements.guardianHp2.value,
        hp: updateForm.elements.hp.value,
      };

      fetch(`http://localhost:3000/user/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token // 가져온 토큰을 헤더에 추가
        },
        body: JSON.stringify(updatedData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          updateForm.remove(); // 수정 폼 제거
          fetchAndRenderMembers(); // 회원정보내용 불러 오는 함수
        })
        .catch(error => {
          console.error('회원 정보 수정 실패:', error);
          // TODO: 회원 정보 수정 실패 처리 작업 수행
        });
    });

    // 수정 폼을 해당 회원의 데이터로 채운 뒤 화면에 표시
    const editContainer = document.getElementById('editContainer');
    editContainer.innerHTML = '';
    editContainer.appendChild(updateForm);
  }

  // 이벤트 위임을 사용하여 삭제 버튼 클릭 이벤트 처리
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
      const memberId = event.target.dataset.memberId;
      const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옴

      // 서버로 회원 삭제 요청
      fetch(`http://localhost:3000/user/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token // 가져온 토큰을 헤더에 추가
        }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('회원 삭제에 실패했습니다.');
          }
          return response.json();
        })
        .then(function (data) {
          console.log(data.message);
          fetchAndRenderMembers();
        })
        .catch(function (error) {
          console.error(error);
          // TODO: 오류 처리
        });
    }

    if (event.target.classList.contains('edit-button')) {
      const memberId = event.target.dataset.memberId;
      updateMember(memberId);
    }
  });

  fetchAndRenderMembers();
});
