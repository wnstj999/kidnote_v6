function loadPage(page) {
  fetch(page)
    .then(r => r.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
    })
    .catch(e => console.error(e));
}
