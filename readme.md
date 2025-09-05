로그인, 회원가입 창 한글화 작업 중\

구조 싹 갈아엎기
중앙 컨텐츠를 제외한 나머지 UI layout.html,js 파일로 만들었음 이제 페이지 만들때마다 layout 이용하면 됨
layout 을 기반한 notes.html, note-add.html 만들기 해야함


layout 불러오는 코드
<script>
  // layout.html 가져오기
  fetch('/layout.html')              // layout.html 파일을 가져옴
    .then(r => r.text())             // 내용을 text로 변환
    .then(html => {
      document.write(html);          // layout.html 전체를 현재 문서에 삽입
    })
    .then(() => {
      // layout이 삽입된 뒤에 #content 영역에 note-add 전용 중앙 컨텐츠 꽂기
      document.getElementById("content").innerHTML = ` ... 중앙 컨텐츠 ... `;

      // 중앙 컨텐츠 기능 실행을 위해 notes.js 불러오기
      const script = document.createElement("script");
      script.src = "/assets/js/notes.js";
      document.body.appendChild(script);
    });
</script>


넣을거 지도 넣기 (원 위치) , 알림장에 기상청 api 를 넣어서 날씨가 자동으로 선택되게 해보자.