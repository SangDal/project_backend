

Kakao.init('2c74fcda8af80bc5d6aa0e623b906071'); // 사용하려는 앱의 JavaScript 키 입력

function loginWithKakao() {
    Kakao.Auth.authorize({
    redirectUri: 'http://skckdeo.dothome.co.kr/team/Main_1.html',
    state: 'userme',
    });
    }

function requestUserInfo() {
    Kakao.API.request({
    url: '/v2/user/me',
    })
    .then(function(res) {
        alert(JSON.stringify(res));
    })
    .catch(function(err) {
        alert(
        'failed to request user information: ' + JSON.stringify(err)
        );
    });
}

function kakaoLogout() {
    Kakao.Auth.logout()
    .then(function() {
        alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
        deleteCookie();
    })
    .catch(function() {
        alert('Not logged in');
    });
}

  // 아래는 데모를 위한 UI 코드입니다.
displayToken()

function displayToken() {
    var token = getCookie('authorize-access-token');

    if(token) {
    Kakao.Auth.setAccessToken(token);
    document.querySelector('#token-result').innerText = 'login success, ready to request API';
    document.querySelector('button.api-btn').style.visibility = 'visible';
    }
}

//토큰을 정리해서 받는곳 
function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    console.log(parts);
    if (parts.length === 2) { return parts[1].split(';')[0]; }
}
function deleteCookie() {
    document.cookie = 'authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}