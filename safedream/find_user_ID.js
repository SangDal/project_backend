const BASE_API_URL = 'http://localhost:3000/user';

window.onload = function() {
    document.getElementById('findIdBtn').addEventListener('click', findUserID);
}

function findUserID() {
    const username = document.getElementById('username').value;
    const HP = document.getElementById('HP').value;

    fetch(`${BASE_API_URL}/findUserID`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, HP })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server Error');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('noticeBoxID').style.display = "block";
        if (data.error) {
            document.getElementById('userIDMessage').textContent = "이름과 전화번호가 맞지 않습니다.";
            document.getElementById('loginButton').style.display = "none";
        } else {
            document.getElementById('userIDMessage').innerHTML = "아이디 : " + data.foundUserID + "<br> 이 메세지는 5초뒤에 사라집니다";
        }
        // 5초 후에 메시지 숨기기
        setTimeout(() => {
            document.getElementById('noticeBoxID').style.display = 'none';
        }, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}