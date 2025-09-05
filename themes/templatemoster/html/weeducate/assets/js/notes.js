
// 버튼 active 토글
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-group").forEach(group => {
    group.querySelectorAll(".btn").forEach(btn => {
      btn.addEventListener("click", () => {
        group.querySelectorAll(".btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  });

  // 임시저장
  document.getElementById("draftBtn").addEventListener("click", () => {
    saveNote(true);
  });

  // 저장하기
  document.getElementById("saveBtn").addEventListener("click", () => {
    saveNote(false);
  });
});

function saveNote(isDraft) {
  const note = {
    date: document.getElementById("noteDate").value,
    children: document.getElementById("selectedChildren").innerText,
    content: document.getElementById("noteContent").value,
    condition: getSelected("condition"),
    health: getSelected("health"),
    temperature: getSelected("temperature"),
    sleep: getSelected("sleep"),
    bowel: getSelected("bowel"),
    bowelTime: document.getElementById("bowelTime").value,
    draft: isDraft
  };

  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));

  alert(isDraft ? "임시저장 되었습니다." : "저장 완료!");
}

function getSelected(groupName) {
  const group = document.querySelector(`.btn-group[data-group="${groupName}"]`);
  if (!group) return "";
  const active = group.querySelector(".btn.active");
  return active ? active.innerText : "";
}
