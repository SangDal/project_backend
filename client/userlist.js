fetch('http://localhost:3000/user/', {
  method: 'GET',

})
.then(response => response.json())
.then(result => {
  const userList = document.getElementById("userList");
  for (let i in result) {
    let tableRow = document.createElement('tr');
    let tableData0 = document.createElement('td');
    let tableData1 = document.createElement('td');
    let tableData2 = document.createElement('td');
    let tableData3 = document.createElement('td');
    let tableData4 = document.createElement('td');
    let tableData5 = document.createElement('td');

    // tableData0.classList().add(" dt-body-center");
    tableRow.appendChild(tableData0);
    tableData1.textContent = result[i].userid;

    tableRow.appendChild(tableData1);
    tableData2.textContent = result[i].username;

    tableRow.appendChild(tableData2);
    tableData3.textContent = result[i].hp;

    tableRow.appendChild(tableData3);
    tableData4.textContent = result[i].guardianHp;

    tableRow.appendChild(tableData4);
    tableData5.textContent = result[i].guardianHp2;
    
    tableRow.appendChild(tableData5);
    
    userList.appendChild(tableRow);
  }
})
.catch(function(error) {
  console.error(error);
  alert('데이터 요청에 실패했습니다.'); // 로그인 요청 실패 시 알림 표시
}); 
