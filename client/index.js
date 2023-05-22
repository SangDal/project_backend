
function fetchDataWithToken() {
    const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옴
    
  
    fetch('http://localhost:3000/index', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token // 가져온 토큰을 헤더에 추가
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error loading user count');
        }
      })
      .then(data => {
        document.getElementById('user-count').innerText = data.countUser;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('user-count').innerText = 'Error loading user count';
      });
  }
  
  window.addEventListener('load', fetchDataWithToken);