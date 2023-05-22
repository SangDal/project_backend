function submitForm() {

  const userid = document.getElementById('userid').value;
  const password = document.getElementById('password').value;

  const data = {
    userid: userid,
    password: password
  };

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
      console.log(response.statusText); // 서버로부터 받은 응답 출력
      console.log(response.ok);
      if (response.ok) {
        window.location.href = 'index.html'; // 로그인 성공 시 index.html로 리디렉션
      } else {
        response.json().then(function(data) {
          alert('로그인 실패: ' + data.message); // 로그인 실패 시 알림 표시
        });
      }
    })
    .catch(function(error) {
      console.error(error);
      alert('로그인 요청에 실패했습니다.'); // 로그인 요청 실패 시 알림 표시
    })
  }