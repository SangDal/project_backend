function loginSrv() {
  const userid = document.getElementById('userid').value;
  const password = document.getElementById('userpw').value;
  
  const data = {
    userid: userid,
    password: password
  };

  fetch('http://localhost:3000/safedream/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
        if (response.ok) {
            // 로그인 성공 시 페이지 리디렉션
            location.href = './Main_1.html';
        } else {
            alert('로그인 실패 :  아이디 또는 패스워드를 확인해주세요.');
            // 로그인 실패 시 에러 처리 등의 동작 수행
        }
    })
    .catch(function(error) {
        console.error(error);
        alert('로그인 요청에 실패했습니다.');
    });
}
