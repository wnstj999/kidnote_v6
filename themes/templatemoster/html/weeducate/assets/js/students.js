let students = [
  {
    name: "Chihoo Hwang",
    teacher: "Joan",
    admit_iso: "2021-05-27",
    recommend: "O",
    age: 21,
    image: "assets/img/we-educate/topper-1.jpg",
  },
  {
    name: "Ajay Suryavanash",
    teacher: "Moxely",
    admit_iso: "2021-06-11",
    recommend: "X",
    age: 22,
    image: "assets/img/we-educate/topper-3.jpg",
  },
  {
    name: "Johny martin",
    teacher: "Rich Flair",
    admit_iso: "2021-05-26",
    recommend: "O",
    age: 23,
    image: "assets/img/we-educate/topper-5.jpg",
  },
  {
    name: "Noxin Lee",
    teacher: "Tony",
    admit_iso: "2021-07-20",
    recommend: "X",
    age: 20,
    image: "assets/img/we-educate/topper-6.jpg",
  },
  {
    name: "Jackey",
    teacher: "Bilgates",
    admit_iso: "2021-04-11",
    recommend: "O",
    age: 22,
    image: "assets/img/we-educate/topper-2.jpg",
  },
  {
    name: "Rocky",
    teacher: "Stephan",
    admit_iso: "2021-06-24",
    recommend: "X",
    age: 24,
    image: "assets/img/we-educate/topper-5.jpg",
  },
];

/* ---------- 유틸 ---------- */
// ISO(YYYY-MM-DD) → YY/MM/DD
function isoToDisplay(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${y.slice(-2)}/${m}/${d}`; // 연도 2자리만
}

/* ---------- 렌더링 ---------- */
function renderStudents() {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="width:40px; text-align:center">
        <input type="checkbox" class="row-check" data-index="${index}">
      </td>
      <td data-field="name" class="ms-table-f-w">
        <img src="${student.image}" alt="people"
             style="width:30px; height:30px; border-radius:50%; margin-right:5px;">
        ${student.name}
      </td>
      <td data-field="teacher">${student.teacher}</td>
      <td data-field="admit_date">${isoToDisplay(student.admit_iso)}</td>
      <td data-field="recommend">${student.recommend}</td>
      <td data-field="age">${student.age}</td>
    `;

    tr.querySelectorAll("td[data-field]").forEach((td) => {
      td.ondblclick = () => makeEditable(td, index);
    });

    tbody.appendChild(tr);
  });
}

/* ---------- 인라인 수정 ---------- */
function makeEditable(td, index) {
  const field = td.getAttribute("data-field");
  td.innerHTML = "";
  let input;

  if (field === "age") {
    input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 120;
    input.value = students[index].age;
    input.style.width = "60px";
  } else if (field === "teacher") {
    input = document.createElement("input");
    input.type = "text";
    input.pattern = "^[가-힣]+$";
    input.value = students[index].teacher;
    input.style.width = "120px";
  } else if (field === "admit_date") {
    input = document.createElement("input");
    input.type = "date";
    input.style.width = "150px";
    input.value = students[index].admit_iso; // 내부 ISO 그대로
  } else {
    input = document.createElement("input");
    input.type = "text";
    input.value = students[index][field];
    input.style.width = "150px";
  }

  td.appendChild(input);
  input.focus();

  function save() {
    let v = input.value.trim();

    if (field === "teacher") {
      if (!/^[가-힣]+$/.test(v)) {
        alert("담당 선생님은 한글만 입력 가능합니다.");
        v = students[index].teacher;
      }
      students[index].teacher = v;
    } else if (field === "age") {
      students[index].age = parseInt(v, 10) || students[index].age;
    } else if (field === "name") {
      students[index].name = v || students[index].name;
    } else if (field === "recommend") {
      students[index].recommend = v.toUpperCase() === "O" ? "O" : "X";
    } else if (field === "admit_date") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
        students[index].admit_iso = v; // 내부는 ISO
      }
    }

    renderStudents();
  }

  input.onblur = save;
  input.onkeydown = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") renderStudents();
  };
}

/* ---------- 추가/삭제 기능 ---------- */
function addStudent() {
  const today = new Date();
  const iso = today.toISOString().split("T")[0]; // YYYY-MM-DD
  students.push({
    name: "새 학생",
    teacher: "담당자",
    admit_iso: iso,
    recommend: "O",
    age: 20,
    image: "assets/img/we-educate/topper-1.jpg",
  });
  renderStudents();
}

function deleteSelected() {
  const checked = document.querySelectorAll(".row-check:checked");
  const indexes = Array.from(checked).map((cb) => parseInt(cb.dataset.index));
  indexes.sort((a, b) => b - a).forEach((i) => students.splice(i, 1));
  renderStudents();
}

function toggleAll(e) {
  document
    .querySelectorAll(".row-check")
    .forEach((cb) => (cb.checked = e.target.checked));
}

/* ---------- 초기화 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderStudents();
  document.getElementById("addStudentBtn").onclick = addStudent;
  document.getElementById("deleteSelectedBtn").onclick = deleteSelected;
  document.getElementById("selectAll").onclick = toggleAll;
});
