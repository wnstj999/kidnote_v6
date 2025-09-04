document.addEventListener("DOMContentLoaded", () => {
  const notes = [
    {
      student: "김민준",
      content: "오늘은 마지막 여름을 마무리하며 바닷가 소풍을 다녀왔습니다.",
      image: "/assets/img/we-educate/new-student-1.jpg",
      comments: 2,
      date: "2025-09-04"
    },
    {
      student: "이지아",
      content: "야외 체험학습을 진행했어요. 아이들이 흥미롭게 참여했습니다.",
      image: "/assets/img/we-educate/new-student-4.jpg",
      comments: 5,
      date: "2025-09-03"
    },
    {
      student: "박서준",
      content: "실내 만들기 수업을 했습니다. 아이들이 집중해서 결과물이 좋았습니다.",
      image: "/assets/img/we-educate/new-student-5.jpg",
      comments: 1,
      date: "2025-09-02"
    }
  ];

  const notesList = document.getElementById("notes-list");

  notes.forEach(note => {
    const card = document.createElement("div");
    card.style.flex = "0 0 auto";
    card.style.width = "200px"; // 카드 폭
    card.style.margin = "4px";  // 카드 간격

    card.innerHTML = `
      <div class="card shadow-sm" style="border-radius: 10px; overflow: hidden; height: 280px;">
        <img src="${note.image}" class="card-img-top" alt="학생 사진"
             style="height:140px; object-fit:cover;">
        <div class="card-body d-flex flex-column" style="padding:10px;">
          <h6 class="card-title mb-1 fw-bold" style="font-size:14px;">${note.student}</h6>
          <p class="card-text text-muted flex-grow-1" style="font-size:12px; line-height:1.3; margin-bottom:6px;">
            ${note.content.substring(0, 40)}...
          </p>
          <div class="d-flex justify-content-between align-items-center" style="font-size:11px;">
            <small class="text-muted">💬 ${note.comments}</small>
            <small class="text-muted">${note.date}</small>
          </div>
        </div>
      </div>
    `;

    notesList.appendChild(card);
  });
});
