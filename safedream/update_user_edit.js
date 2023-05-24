// API 경로
const BASE_API_URL = 'http://localhost:3000/safedream';

// 개인정보 수정 변경완료 버튼 클릭 이벤트
document.getElementById("btn_bottom2").addEventListener("click", function() {
    const userid = prompt("Please enter your User ID", "");
    if (userid) {
        handleUpdate(userid);
    } else {
        alert("User ID is required to update the information.");
    }
});

// 개인정보 수정 함수
function handleUpdate(userid) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('userpw').value;
    const passwordConfirm = document.getElementById('userpw_a').value;
    const hp = document.getElementById('hp').value;
    const guardianHp = document.getElementById('guardianHp').value;


    if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        return;
    }

    const data = {
        userid: userid,
        username: username,
        password: password,
        hp: hp,
        guardianHp: guardianHp
    };

    fetch(`${BASE_API_URL}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function(response) {
            if (response.ok) {
                alert('정보가 성공적으로 수정되었습니다.');
                // 페이지 리디렉션 또는 다른 작업 수행
            } else {
                alert('정보 수정에 실패했습니다.');
                // 에러 처리 등의 동작 수행
            }
        })
        .catch(function(error) {
            console.error(error);
            alert('정보 수정 요청에 실패했습니다.');
        });
}