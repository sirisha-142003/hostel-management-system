/* ============================================
   SIRI GIRLS HOSTEL — Shared JS
   Data store (localStorage), utilities, toast
   ============================================ */

/* -------- SEED DATA -------- */
const SEED = {
  students: [
    { id:'SGH2024001', name:'Priya Sharma', room:'A-101', type:'Single', floor:'1st', college:'JNTU Hyderabad', phone:'9876543201', email:'priya@jntu.edu', dob:'2002-05-14', joinDate:'2024-06-01', feeStatus:'Paid', guardianName:'Rajesh Sharma', guardianPhone:'9876500001', password:'priya123' },
    { id:'SGH2024002', name:'Ananya Reddy', room:'A-102', type:'Double', floor:'1st', college:'Osmania University', phone:'9876543202', email:'ananya@ou.edu', dob:'2003-01-22', joinDate:'2024-07-10', feeStatus:'Pending', guardianName:'Suresh Reddy', guardianPhone:'9876500002', password:'ananya123' },
    { id:'SGH2024003', name:'Kavya Nair', room:'B-201', type:'Double', floor:'2nd', college:'BITS Hyderabad', phone:'9876543203', email:'kavya@bits.edu', dob:'2002-09-05', joinDate:'2024-06-15', feeStatus:'Paid', guardianName:'Mohan Nair', guardianPhone:'9876500003', password:'kavya123' },
    { id:'SGH2024004', name:'Deepika Patel', room:'B-202', type:'Triple', floor:'2nd', college:'CBIT', phone:'9876543204', email:'deepika@cbit.edu', dob:'2003-03-18', joinDate:'2024-08-01', feeStatus:'Overdue', guardianName:'Vijay Patel', guardianPhone:'9876500004', password:'deepika123' },
    { id:'SGH2024005', name:'Sneha Menon', room:'C-301', type:'Single', floor:'3rd', college:'Hyderabad Central University', phone:'9876543205', email:'sneha@hcu.edu', dob:'2002-11-30', joinDate:'2024-06-01', feeStatus:'Paid', guardianName:'Arun Menon', guardianPhone:'9876500005', password:'sneha123' },
    { id:'SGH2024006', name:'Riya Singh', room:'C-302', type:'Double', floor:'3rd', college:'JNTU Hyderabad', phone:'9876543206', email:'riya@jntu.edu', dob:'2003-07-12', joinDate:'2024-09-01', feeStatus:'Pending', guardianName:'Amit Singh', guardianPhone:'9876500006', password:'riya123' },
    { id:'SGH2024007', name:'Meera Iyer', room:'A-103', type:'Triple', floor:'1st', college:'ISB', phone:'9876543207', email:'meera@isb.edu', dob:'2001-12-08', joinDate:'2024-05-15', feeStatus:'Paid', guardianName:'Srinivas Iyer', guardianPhone:'9876500007', password:'meera123' },
    { id:'SGH2024008', name:'Pooja Verma', room:'B-203', type:'Single', floor:'2nd', college:'NALSAR', phone:'9876543208', email:'pooja@nalsar.edu', dob:'2002-04-25', joinDate:'2024-07-20', feeStatus:'Paid', guardianName:'Rakesh Verma', guardianPhone:'9876500008', password:'pooja123' },
  ],
  rooms: [
    { num:'A-101', type:'Single', floor:'1st', status:'occupied', rent:9000, amenities:'AC, Attached Bath, Wi-Fi, Wardrobe' },
    { num:'A-102', type:'Double', floor:'1st', status:'occupied', rent:6500, amenities:'AC, Wi-Fi, Wardrobe, Desk' },
    { num:'A-103', type:'Triple', floor:'1st', status:'occupied', rent:4800, amenities:'Fan, Wi-Fi, Wardrobe' },
    { num:'A-104', type:'Single', floor:'1st', status:'vacant',   rent:9000, amenities:'AC, Attached Bath, Wi-Fi, Wardrobe' },
    { num:'A-105', type:'Double', floor:'1st', status:'vacant',   rent:6500, amenities:'AC, Wi-Fi, Wardrobe, Desk' },
    { num:'B-201', type:'Double', floor:'2nd', status:'occupied', rent:7000, amenities:'AC, Attached Bath, Wi-Fi, Wardrobe, Desk' },
    { num:'B-202', type:'Triple', floor:'2nd', status:'occupied', rent:5000, amenities:'Fan, Wi-Fi, Wardrobe' },
    { num:'B-203', type:'Single', floor:'2nd', status:'occupied', rent:9500, amenities:'AC, Attached Bath, Wi-Fi, Wardrobe, TV' },
    { num:'B-204', type:'Double', floor:'2nd', status:'maintenance', rent:7000, amenities:'AC, Wi-Fi' },
    { num:'B-205', type:'Single', floor:'2nd', status:'vacant',   rent:9500, amenities:'AC, Attached Bath, Wi-Fi, Wardrobe, TV' },
    { num:'C-301', type:'Single', floor:'3rd', status:'occupied', rent:9000, amenities:'AC, Attached Bath, Wi-Fi, Wardrobe' },
    { num:'C-302', type:'Double', floor:'3rd', status:'occupied', rent:6500, amenities:'AC, Wi-Fi, Wardrobe' },
    { num:'C-303', type:'Triple', floor:'3rd', status:'vacant',   rent:4800, amenities:'Fan, Wi-Fi, Wardrobe' },
    { num:'C-304', type:'Single', floor:'3rd', status:'vacant',   rent:9000, amenities:'AC, Wi-Fi, Wardrobe' },
  ],
  complaints: [
    { id:'CMP001', studentId:'SGH2024001', studentName:'Priya Sharma', room:'A-101', title:'Water Leakage in Bathroom', category:'Plumbing', desc:'Water is leaking from the overhead pipe in the attached bathroom since yesterday morning. The floor remains wet.', date:'2024-12-10', status:'Open', priority:'High' },
    { id:'CMP002', studentId:'SGH2024003', studentName:'Kavya Nair', room:'B-201', title:'AC Not Cooling Properly', category:'Electrical', desc:'The AC runs but does not cool the room. Temperature feels the same with it on or off. Needs a technician.', date:'2024-12-08', status:'In Progress', priority:'Medium' },
    { id:'CMP003', studentId:'SGH2024006', studentName:'Riya Singh', room:'C-302', title:'Slow Internet Speed', category:'Internet', desc:'Wi-Fi speed in the 3rd floor rooms has been very slow for the past week. Cannot attend online lectures.', date:'2024-12-11', status:'Open', priority:'High' },
    { id:'CMP004', studentId:'SGH2024002', studentName:'Ananya Reddy', room:'A-102', title:'Broken Study Chair', category:'Furniture', desc:'One of the two study chairs in the room has a broken leg and is unsafe to sit on. Please replace.', date:'2024-12-05', status:'Resolved', priority:'Low' },
    { id:'CMP005', studentId:'SGH2024005', studentName:'Sneha Menon', room:'C-301', title:'Washroom Light Fused', category:'Electrical', desc:'The washroom bulb has fused and needs replacement.', date:'2024-12-09', status:'Resolved', priority:'Low' },
  ],
  notices: [
    { id:'N001', title:'Annual Hostel Day – Dec 20', body:'All residents are warmly invited to the Annual Hostel Day celebrations on December 20th at 5:00 PM in the Common Hall. Cultural performances, games, and prizes await!', date:'2024-12-12', priority:'High', author:'Admin' },
    { id:'N002', title:'January 2025 Fee Reminder', body:'Monthly fees for January 2025 must be paid by December 31st. A late fee of ₹200 per day will be charged after the due date. Please pay via the Fees section of your portal.', date:'2024-12-10', priority:'Medium', author:'Admin' },
    { id:'N003', title:'Wi-Fi Maintenance – Dec 14', body:'Internet services will be temporarily unavailable on December 14th between 2:00 AM and 5:00 AM for scheduled network maintenance.', date:'2024-12-09', priority:'Low', author:'Tech Team' },
    { id:'N004', title:'Winter Curfew Timings', body:'As per hostel policy, effective from December 1st, residents must return to the hostel premises by 9:30 PM. Entry after curfew requires prior permission from the warden.', date:'2024-12-01', priority:'Medium', author:'Warden' },
  ],
  visitors: [
    { id:'V001', studentId:'SGH2024001', studentName:'Priya Sharma', room:'A-101', visitorName:'Rajesh Sharma', relation:'Father', phone:'9876500001', purpose:'Parent Visit', date:'2024-12-11', inTime:'10:00', outTime:'13:30', status:'Completed' },
    { id:'V002', studentId:'SGH2024003', studentName:'Kavya Nair', room:'B-201', visitorName:'Lakshmi Nair', relation:'Mother', phone:'9876500003', purpose:'Parent Visit', date:'2024-12-11', inTime:'15:00', outTime:'', status:'Inside' },
    { id:'V003', studentId:'SGH2024005', studentName:'Sneha Menon', room:'C-301', visitorName:'Preethi Menon', relation:'Sister', phone:'9876500099', purpose:'Personal Visit', date:'2024-12-10', inTime:'11:00', outTime:'13:00', status:'Completed' },
  ],
  maintenance: [
    { id:'MT001', room:'B-204', task:'AC Compressor Repair', assignee:'Ravi Electricals', priority:'High', status:'In Progress', date:'2024-12-10', note:'Parts ordered' },
    { id:'MT002', room:'A-101', task:'Pipe Leakage Fix', assignee:'Suresh Plumbing', priority:'High', status:'Pending', date:'2024-12-10', note:'' },
    { id:'MT003', room:'C-303', task:'Window Hinge Replace', assignee:'Unassigned', priority:'Low', status:'Open', date:'2024-12-08', note:'' },
    { id:'MT004', room:'A-105', task:'Door Lock Repair', assignee:'Ravi Electricals', priority:'Medium', status:'Completed', date:'2024-12-06', note:'Done' },
  ],
  messMenu: {
    Monday:    { breakfast:'Idli (4), Sambar, Coconut Chutney, Tea/Coffee', lunch:'Rice, Dal Tadka, Aloo Sabzi, Salad, Curd, Pickle', dinner:'Chapati (3), Paneer Butter Masala, Jeera Rice, Raita' },
    Tuesday:   { breakfast:'Poha, Green Chutney, Banana, Tea', lunch:'Chole Rice, Raita, Papad, Salad', dinner:'Roti (3), Dal Makhni, Veg Pulao, Kheer' },
    Wednesday: { breakfast:'Upma, Coconut Chutney, Mixed Fruit Juice', lunch:'South Indian Thali — Rice, Rasam, Kootu, Papad, Pickle', dinner:'Chapati (3), Mixed Veg Curry, Steamed Rice, Dahi' },
    Thursday:  { breakfast:'Bread (4 slices), Butter & Jam, Sprouts, Tea', lunch:'Rajma Chawal, Salad, Curd, Papad', dinner:'Poori (4), Chana Masala, Vermicelli Kheer' },
    Friday:    { breakfast:'Masala Dosa (2), Sambar, Chutneys, Coffee', lunch:'Veg Biryani, Mirchi Salan, Raita, Salad', dinner:'Special Paneer Dish, Naan (2), Gulab Jamun' },
    Saturday:  { breakfast:'Aloo Paratha (2), Pickle, Curd, Tea', lunch:'Pav Bhaji, Salad, Buttermilk', dinner:'Choice of: Pasta / Noodles / Fried Rice, Soup, Ice Cream (Sunday special)' },
    Sunday:    { breakfast:'Poori (4), Chole Bhatura, Halwa, Juice', lunch:'Full Thali — Rice, Dal, 3 Sabzis, Papad, Salad, Curd, Sweet', dinner:'Chapati (3), Dal Tadka, Jeera Rice, Halwa / Payasam' },
  },
  admin: { id:'ADMIN001', password:'admin123', name:'Mrs. Sudha Rani', role:'Warden & Admin' }
};

/* -------- INIT STORE -------- */
function initStore() {
  if (!localStorage.getItem('sgh_students'))    localStorage.setItem('sgh_students',    JSON.stringify(SEED.students));
  if (!localStorage.getItem('sgh_rooms'))       localStorage.setItem('sgh_rooms',       JSON.stringify(SEED.rooms));
  if (!localStorage.getItem('sgh_complaints'))  localStorage.setItem('sgh_complaints',  JSON.stringify(SEED.complaints));
  if (!localStorage.getItem('sgh_notices'))     localStorage.setItem('sgh_notices',     JSON.stringify(SEED.notices));
  if (!localStorage.getItem('sgh_visitors'))    localStorage.setItem('sgh_visitors',    JSON.stringify(SEED.visitors));
  if (!localStorage.getItem('sgh_maintenance')) localStorage.setItem('sgh_maintenance', JSON.stringify(SEED.maintenance));
  if (!localStorage.getItem('sgh_mess'))        localStorage.setItem('sgh_mess',        JSON.stringify(SEED.messMenu));
  if (!localStorage.getItem('sgh_admin'))       localStorage.setItem('sgh_admin',       JSON.stringify(SEED.admin));
}

/* -------- GET / SET -------- */
function getData(key) { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } }
function setData(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
function getStudents()    { return getData('sgh_students'); }
function getRooms()       { return getData('sgh_rooms'); }
function getComplaints()  { return getData('sgh_complaints'); }
function getNotices()     { return getData('sgh_notices'); }
function getVisitors()    { return getData('sgh_visitors'); }
function getMaintenance() { return getData('sgh_maintenance'); }
function getMessMenu()    { return getData('sgh_mess'); }
function getAdmin()       { return getData('sgh_admin'); }

/* -------- SESSION -------- */
function setSession(role, id) { sessionStorage.setItem('sgh_role', role); sessionStorage.setItem('sgh_id', id); }
function getSession()          { return { role: sessionStorage.getItem('sgh_role'), id: sessionStorage.getItem('sgh_id') }; }
function clearSession()        { sessionStorage.clear(); }
function requireAuth(role) {
  const s = getSession();
  if (!s.role) { window.location.href = '../index.html'; return null; }
  if (role && s.role !== role) { window.location.href = '../index.html'; return null; }
  return s;
}

/* -------- TOAST -------- */
let toastContainer = null;
function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}
function showToast(icon, message, type='info') {
  ensureToastContainer();
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-text">${message}</span><button class="toast-close" onclick="this.parentElement.remove()">✕</button>`;
  toastContainer.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.4s'; setTimeout(()=>t.remove(),400); }, 3500);
}

/* -------- MODAL -------- */
function openModal(html, large=false) {
  const ov = document.createElement('div');
  ov.className = 'modal-overlay'; ov.id = 'activeModal';
  ov.innerHTML = `<div class="modal-box ${large?'modal-lg':''}">${html}</div>`;
  ov.addEventListener('click', e => { if(e.target===ov) closeModal(); });
  document.body.appendChild(ov);
}
function closeModal() { const m = document.getElementById('activeModal'); if(m) m.remove(); }

/* -------- UTILS -------- */
function generateId(prefix, list) {
  const nums = list.map(x => parseInt(x.id.replace(/\D/g,''))).filter(n=>!isNaN(n));
  const next = nums.length ? Math.max(...nums)+1 : 1;
  return prefix + String(next).padStart(4,'0');
}
function fmtDate(d) { if(!d) return '—'; const dt=new Date(d); return dt.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}); }
function today() { return new Date().toISOString().slice(0,10); }
function feeColor(s) { return s==='Paid'?'badge-green':s==='Pending'?'badge-gold':'badge-red'; }
function priorityColor(p) { return p==='High'?'badge-red':p==='Medium'?'badge-gold':'badge-green'; }
function statusColor(s) { return s==='Open'||s==='Pending'?'badge-rose':s==='In Progress'||s==='Inside'?'badge-blue':s==='Resolved'||s==='Completed'?'badge-green':'badge-muted'; }
function dayName() { return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()]; }

/* -------- SIDEBAR ACTIVE -------- */
function markActiveNav() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes(path)) link.classList.add('active');
  });
}

/* -------- SET SIDEBAR USER -------- */
function setSidebarUser(name, role) {
  const el = document.getElementById('sidebarUserName');
  const rl = document.getElementById('sidebarUserRole');
  const av = document.getElementById('sidebarAvatar');
  if(el) el.textContent = name;
  if(rl) rl.textContent = role;
  if(av) av.textContent = name ? name[0].toUpperCase() : '?';
}

/* -------- RUN INIT -------- */
initStore();
