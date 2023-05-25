// 작성취소 버튼 클릭시 동작
document.getElementById('btn_bottom1').addEventListener('click', function(){
    // 입력 필드 초기화
    document.getElementById('username').value = '';
    document.getElementById('userpw').value = '';
    document.getElementById('userpw_a').value = '';
    document.getElementById('HP').value = '';
    document.getElementById('protector1').value = '';
    document.getElementById('protector2').value = '';
});

// 회원정보 삭제 버튼 클릭 시 동작
document.getElementById('del_btn').addEventListener('click', function(){
    const confirmDelete = confirm("정말 탈퇴 하시겠습니까?");
    if(confirmDelete) {
        // 사용자 ID를 알아야 함 - 여기서는 prompt를 사용하여 직접 입력받음
        const userid = prompt("Please enter your User ID", "");
        if (userid) {
            handleDelete(userid);
        } else {
            alert("User ID is required to delete the account.");
        }
    }
});
// 회원정보 삭제 함수
function handleDelete(userid) {
    fetch(`${BASE_API_URL}/${userid}`, {
        method: 'DELETE',
    })
        .then(function(response) {
            if (response.ok) {
                alert('회원정보가 성공적으로 삭제되었습니다.');
                // 페이지 리디렉션 또는 로그아웃 수행
            } else {
                alert('회원정보 삭제에 실패했습니다.');
            }
        })
        .catch(function(error) {
            console.error(error);
            alert('회원정보 삭제 요청에 실패했습니다.');
        });
}