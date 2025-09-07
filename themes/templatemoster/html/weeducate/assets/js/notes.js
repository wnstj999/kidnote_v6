// 저장
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveNote");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const note = {
        date: document.getElementById("date").value,
        className: document.getElementById("class").value,
        title: document.getElementById("title").value || "제목 없음",
        content: document.getElementById("contentInput").value || ""
      };

      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
      window.location.href = "/pages/note/notes.html";
    });
  }

  // 불러오기
  const container = document.getElementById("notesContainer");
  if (container) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    container.innerHTML = notes.length
      ? notes.map(n => `
        <div class="note-card">
          <h5>${n.title}</h5>
          <p class="note-meta">${n.date} | ${n.className}</p>
          <p>${n.content}</p>
        </div>
      `).join("")
      : "<p>작성된 알림장이 없습니다.</p>";
  }
});
