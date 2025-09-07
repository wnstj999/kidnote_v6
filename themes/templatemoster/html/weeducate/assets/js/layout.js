function loadPage(page) {
  fetch(page)
    .then(r => r.text())
    .then(html => {
      const root = document.getElementById("content");
      if (root) root.innerHTML = html;
      initLayoutUI(); // 페이지 교체 후 외곽 UI 재초기화
    })
    .catch(console.error);
}

function initLayoutUI() {
  // 사이드바 토글
  document.querySelectorAll('[data-toggle="sidebar"], #sidebarToggle, .sidebar-toggle').forEach(btn => {
    btn.onclick = () => document.body.classList.toggle('sidebar-open');
  });

  // 퀵바 토글
  document.querySelectorAll('.ms-quick-bar-item a, [data-toggle="quickbar"]').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const target = btn.getAttribute('href') || btn.dataset.target;
      if (!target) return;
      document.querySelectorAll('.ms-quick-bar-item').forEach(i => i.classList.remove('active'));
      btn.closest('.ms-quick-bar-item')?.classList.add('active');
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active', 'show'));
      document.querySelector(target)?.classList.add('active', 'show');
      document.body.classList.add('quickbar-open');
    };
  });

  // 드롭다운 토글
  document.querySelectorAll('[data-toggle="dropdown"], .dropdown-toggle').forEach(drop => {
    drop.onclick = e => {
      e.preventDefault();
      const wrap = drop.closest('.dropdown, .btn-group');
      if (!wrap) return;
      const isOpen = wrap.classList.contains('show');
      document.querySelectorAll('.dropdown.show, .btn-group.show').forEach(d => d.classList.remove('show'));
      if (!isOpen) wrap.classList.add('show');
    };
  });

  // 바깥 클릭 시 드롭다운 닫기
  document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown.show, .btn-group.show')) {
      document.querySelectorAll('.dropdown.show, .btn-group.show').forEach(d => d.classList.remove('show'));
    }
  });

  console.log('외곽 UI 초기화 완료');
}

// 페이지 첫 로드 시 실행
document.addEventListener('DOMContentLoaded', initLayoutUI);