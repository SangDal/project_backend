document.addEventListener('DOMContentLoaded', function () {
    const addUserForm = document.getElementById('addUserForm');
  
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
            'Content-Type': 'application/json'
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
            const { userid, username, password, guardianHp, guardianHp2, hp } = data.user;
        
            const userInfoHTML = `
            <p><strong>ID:</strong> ${userid}</p>
            <p><strong>이름:</strong> ${username}</p>
            <p><strong>비밀번호:</strong> ${password}</p>
            <p><strong>보호자 휴대폰 번호:</strong> ${guardianHp}</p>
            <p><strong>보호자 휴대폰 번호2:</strong> ${guardianHp2}</p>
            <p><strong>휴대폰 번호:</strong> ${hp}</p>
            `;
        
            userInfoElement.innerHTML = userInfoHTML;
        })
        .catch(function (error) {
            console.error(error);
          // TODO: 오류 처리
        });
    });
});
