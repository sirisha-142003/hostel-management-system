/* ============================================
   SIRI GIRLS HOSTEL — Sidebar Builder
   Builds admin or student sidebar dynamically
   ============================================ */

function buildAdminSidebar(activePage) {
  const sess = getSession();
  const admin = getAdmin();
  return `
  <div class="sidebar" id="appSidebar">
    <div class="sidebar-brand">
      <div class="brand-logo">
        <div class="brand-icon">🌸</div>
        <div>
          <div class="brand-name"><span>Siri</span> Girls Hostel</div>
          <div class="brand-tagline">Admin Panel</div>
        </div>
      </div>
    </div>
    <div class="sidebar-user">
      <div class="s-avatar" id="sidebarAvatar">A</div>
      <div>
        <div class="s-uname" id="sidebarUserName">${admin.name}</div>
        <div class="s-urole">${admin.role}</div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section">Overview</div>
      <a href="admin-dashboard.html" class="nav-link ${activePage==='dashboard'?'active':''}"><span class="nav-icon">📊</span> Dashboard</a>
      <div class="nav-section">Management</div>
      <a href="admin-students.html" class="nav-link ${activePage==='students'?'active':''}"><span class="nav-icon">🎓</span> Students</a>
      <a href="admin-rooms.html" class="nav-link ${activePage==='rooms'?'active':''}"><span class="nav-icon">🏠</span> Rooms</a>
      <a href="admin-allocations.html" class="nav-link ${activePage==='allocations'?'active':''}"><span class="nav-icon">🔑</span> Allocations</a>
      <a href="admin-fees.html" class="nav-link ${activePage==='fees'?'active':''}"><span class="nav-icon">💰</span> Fees &amp; Billing</a>
      <div class="nav-section">Operations</div>
      <a href="admin-complaints.html" class="nav-link ${activePage==='complaints'?'active':''}"><span class="nav-icon">📋</span> Complaints <span class="nav-badge complaint-count">0</span></a>
      <a href="admin-maintenance.html" class="nav-link ${activePage==='maintenance'?'active':''}"><span class="nav-icon">🔧</span> Maintenance</a>
      <a href="admin-visitors.html" class="nav-link ${activePage==='visitors'?'active':''}"><span class="nav-icon">👥</span> Visitors</a>
      <a href="admin-mess.html" class="nav-link ${activePage==='mess'?'active':''}"><span class="nav-icon">🍽️</span> Mess Menu</a>
      <div class="nav-section">Reports</div>
      <a href="admin-reports.html" class="nav-link ${activePage==='reports'?'active':''}"><span class="nav-icon">📈</span> Reports</a>
      <a href="admin-notices.html" class="nav-link ${activePage==='notices'?'active':''}"><span class="nav-icon">📢</span> Notices</a>
    </nav>
    <div class="sidebar-footer">
      <button class="btn btn-ghost btn-full" onclick="doLogout()">🚪 Logout</button>
    </div>
  </div>`;
}

function buildStudentSidebar(activePage) {
  const sess = getSession();
  const students = getStudents();
  const student = students.find(s => s.id === sess.id) || {};
  return `
  <div class="sidebar" id="appSidebar">
    <div class="sidebar-brand">
      <div class="brand-logo">
        <div class="brand-icon">🌸</div>
        <div>
          <div class="brand-name"><span>Siri</span> Girls Hostel</div>
          <div class="brand-tagline">Student Portal</div>
        </div>
      </div>
    </div>
    <div class="sidebar-user">
      <div class="s-avatar">${student.name ? student.name[0] : 'S'}</div>
      <div>
        <div class="s-uname">${student.name || 'Student'}</div>
        <div class="s-urole">Resident · Room ${student.room || '—'}</div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section">My Portal</div>
      <a href="student-home.html" class="nav-link ${activePage==='home'?'active':''}"><span class="nav-icon">🏠</span> Home</a>
      <a href="student-profile.html" class="nav-link ${activePage==='profile'?'active':''}"><span class="nav-icon">👤</span> My Profile</a>
      <a href="student-room.html" class="nav-link ${activePage==='room'?'active':''}"><span class="nav-icon">🛏️</span> My Room</a>
      <div class="nav-section">Services</div>
      <a href="student-fees.html" class="nav-link ${activePage==='fees'?'active':''}"><span class="nav-icon">💳</span> Fees &amp; Payment</a>
      <a href="student-mess.html" class="nav-link ${activePage==='mess'?'active':''}"><span class="nav-icon">🍽️</span> Mess Schedule</a>
      <a href="student-complaints.html" class="nav-link ${activePage==='complaints'?'active':''}"><span class="nav-icon">📋</span> My Complaints</a>
      <a href="student-visitors.html" class="nav-link ${activePage==='visitors'?'active':''}"><span class="nav-icon">👥</span> Visitor Pass</a>
      <div class="nav-section">Info</div>
      <a href="student-notices.html" class="nav-link ${activePage==='notices'?'active':''}"><span class="nav-icon">📢</span> Notices</a>
      <a href="student-amenities.html" class="nav-link ${activePage==='amenities'?'active':''}"><span class="nav-icon">✨</span> Amenities</a>
    </nav>
    <div class="sidebar-footer">
      <button class="btn btn-ghost btn-full" onclick="doLogout()">🚪 Logout</button>
    </div>
  </div>`;
}

function doLogout() {
  clearSession();
  window.location.href = '../index.html';
}

function updateComplaintBadge() {
  const open = getComplaints().filter(c => c.status === 'Open' || c.status === 'In Progress').length;
  const el = document.querySelector('.complaint-count');
  if (el) { el.textContent = open; el.style.display = open ? 'inline' : 'none'; }
}
