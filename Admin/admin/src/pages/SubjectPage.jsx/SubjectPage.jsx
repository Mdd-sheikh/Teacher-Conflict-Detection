import { useState, useCallback } from "react";
import "./EduSched.css";

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const IcoDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const IcoTimetable = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IcoTeachers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IcoSubjects = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IcoRooms = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);
const IcoConflicts = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IcoSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IcoPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IcoBlock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
  </svg>
);
const IcoInfo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IcoSend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 2 11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IcoStar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M5.34 5.34l-1.41-1.41M12 20v2M12 2v2"/>
  </svg>
);

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const INIT_SUBJECTS = [
  { id:1, code:"CS-101",   name:"Introduction to Computer Science", dept:"Computer Science", teacher:"Dr. Jane Doe",    init:"JD", cls:"" },
  { id:2, code:"MATH-202", name:"Advanced Linear Algebra",          dept:"Mathematics",      teacher:"Prof. Alan Smith", init:"AS", cls:"ta-green" },
  { id:3, code:"PHY-301",  name:"Quantum Physics Foundations",      dept:"Physics",          teacher:null,               init:"",   cls:"" },
  { id:4, code:"ENG-105",  name:"Technical Communication",          dept:"English",          teacher:"Emily Brown",      init:"EB", cls:"ta-orange" },
  { id:5, code:"BIO-201",  name:"Molecular Biology",                dept:"Biology",          teacher:"Robert Wilson",    init:"RW", cls:"ta-blue" },
];

const INIT_ROOMS = [
  { id:1, number:"101-A",      type:"Classroom", capacity:"35 Students",     status:"available" },
  { id:2, number:"CS-LAB-1",   type:"Lab",       capacity:"25 Workstations", status:"conflict" },
  { id:3, number:"Grand Hall", type:"Hall",       capacity:"250 Seats",       status:"available" },
  { id:4, number:"204-B",      type:"Classroom", capacity:"40 Students",     status:"maintenance" },
  { id:5, number:"Bio-Lab-2",  type:"Lab",       capacity:"20 Workstations", status:"available" },
];

const INIT_TEACHERS = [
  { id:1, name:"Dr. Jane Smith",   tid:"T-2024-001", email:"jane.smith@edu.com", phone:"+1 234-567-8901", subjects:["Physics","Math"],  status:"active",   init:"JS", color:"linear-gradient(135deg,#667eea,#764ba2)" },
  { id:2, name:"Prof. Mark Brown", tid:"T-2024-002", email:"m.brown@edu.com",    phone:"+1 234-567-8902", subjects:["Chemistry"],       status:"active",   init:"MB", color:"linear-gradient(135deg,#f093fb,#f5576c)" },
  { id:3, name:"Lucy White",       tid:"T-2023-115", email:"l.white@edu.com",    phone:"+1 234-567-8915", subjects:["History"],         status:"inactive", init:"LW", color:"linear-gradient(135deg,#B0BEC5,#90A4AE)" },
];

const CONFLICT_DATA = {
  teacher: [
    { id:1, name:"Rahul Sharma",    init:"RS", color:"linear-gradient(135deg,#667eea,#764ba2)", time:"Monday, 10:00 AM – 11:00 AM",  tag:"DOUBLE BOOKING", tagCls:"tag-double",   sessA:{name:"Advanced Physics II",room:"Room 402, Block B"},    sessB:{name:"Intro to Quantum",     room:"Auditorium 1"},    warn:"Teacher cannot be in two locations at once." },
    { id:2, name:"Dr. Anjali Pathak",init:"AP",color:"linear-gradient(135deg,#11998e,#38ef7d)", time:"Tuesday, 02:00 PM – 03:30 PM", tag:"OVERLOAD",       tagCls:"tag-overload", sessA:{name:"Organic Chemistry",    room:"Lab 3, Science Wing"}, sessB:{name:"Department Meeting",room:"Boardroom 2"},        warn:"Meeting overlaps with laboratory session." },
  ],
  room: [
    { id:3, name:"CS-LAB-1",   init:"CS", color:"linear-gradient(135deg,#f093fb,#f5576c)", time:"Monday, All Day",               tag:"ROOM CLASH",     tagCls:"tag-double",   sessA:{name:"CS-201 Lab Session",   room:"9:00 AM – 10:30 AM"},  sessB:{name:"Data Structures Practical",room:"10:00 AM – 11:30 AM"}, warn:"Overlapping bookings for this room." },
  ],
  class: [
    { id:4, name:"Class 10-A", init:"10", color:"linear-gradient(135deg,#FBBF24,#F59E0B)", time:"Wednesday, 11:00 AM – 12:30 PM",tag:"DUPLICATE",      tagCls:"tag-overload", sessA:{name:"Mathematics",          room:"Room 101"},             sessB:{name:"Advanced Math",         room:"Room 203"},           warn:"Duplicate subject scheduled for same class." },
  ],
};

const AVATAR_COLORS = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#11998e,#38ef7d)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
];

const NAV = [
  { id:"dashboard", label:"Dashboard", Icon:IcoDashboard },
  { id:"timetable", label:"Timetable", Icon:IcoTimetable },
  { id:"teachers",  label:"Teachers",  Icon:IcoTeachers  },
  { id:"subjects",  label:"Subjects",  Icon:IcoSubjects  },
  { id:"rooms",     label:"Rooms",     Icon:IcoRooms     },
  { id:"conflicts", label:"Conflicts", Icon:IcoConflicts },
];

const PAGE_TITLE = {
  dashboard:"Dashboard",
  timetable:"Timetable Overview",
  teachers: "Teacher Management",
  subjects: "Subjects Overview",
  rooms:    "Rooms Overview",
  conflicts:"Conflict Resolution",
};

// ─── SHARED SMALL COMPONENTS ──────────────────────────────────────────────────
function Modal({ open, onClose, title, onSubmit, submitLabel="Save", children }) {
  return (
    <div className={`modal-overlay${open ? " open" : ""}`}
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary"   onClick={onSubmit}><IcoPlus />{submitLabel}</button>
        </div>
      </div>
    </div>
  );
}

function FGroup({ label, children }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

function SelectWrap({ children }) {
  return <div className="form-select-wrapper">{children}</div>;
}

function Pager({ info }) {
  return (
    <div className="table-footer">
      <div className="table-info">{info}</div>
      <div className="pagination">
        <button className="page-btn">‹</button>
        {[1,2,3].map(n => <button key={n} className={`page-btn${n===1?" active":""}`}>{n}</button>)}
        <button className="page-btn">›</button>
      </div>
    </div>
  );
}

function Toast({ msg, type, onClose }) {
  return (
    <div className={`toast${msg?" show":""}${type==="error"?" error":""}`}>
      <span>{msg}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage() {
  const activity = [
    { color:"#10B981", text:<>New teacher <strong>Dr. Jane Smith</strong> added to Physics</>,   time:"2m ago"  },
    { color:"#EF4444", text:<>Conflict detected in <strong>CS-LAB-1</strong> on Monday</>,        time:"18m ago" },
    { color:"#2563EB", text:<>Room <strong>204-B</strong> set to maintenance</>,                   time:"1h ago"  },
    { color:"#F59E0B", text:<>Subject <strong>PHY-301</strong> is unassigned</>,                   time:"3h ago"  },
    { color:"#10B981", text:<>Timetable for <strong>Class 10-A</strong> updated</>,                time:"5h ago"  },
  ];
  const quickStats = [
    { label:"Faculty Coverage", val:"94%",  color:"#10B981" },
    { label:"Room Utilization",  val:"84%",  color:"#F59E0B" },
    { label:"Active Teachers",   val:"118",  color:"var(--text)" },
    { label:"On Leave",          val:"6",    color:"#EF4444" },
    { label:"Departments",       val:"12",   color:"var(--text)" },
  ];
  return (
    <>
      <div className="stat-grid stat-grid-4">
        <div className="stat-card"><div className="stat-label">Total Teachers</div><div className="stat-value">124</div></div>
        <div className="stat-card"><div className="stat-label">Total Subjects</div><div className="stat-value">42</div></div>
        <div className="stat-card"><div className="stat-label">Total Rooms</div><div className="stat-value">42</div></div>
        <div className="stat-card danger"><div className="stat-label">Conflicts Detected</div><div className="stat-value">3</div></div>
      </div>
      <div className="dash-grid">
        <div className="activity-card">
          <div className="activity-title">Recent Activity <span>Today</span></div>
          {activity.map((a,i) => (
            <div key={i} className="activity-item">
              <div className="act-dot" style={{background:a.color}}/>
              <div className="act-text">{a.text}</div>
              <div className="act-time">{a.time}</div>
            </div>
          ))}
        </div>
        <div className="activity-card">
          <div className="activity-title">Quick Stats</div>
          {quickStats.map((s,i) => (
            <div key={i} className="summary-row">
              <div className="summary-label">{s.label}</div>
              <div style={{fontWeight:600,color:s.color}}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── SUBJECTS PAGE ────────────────────────────────────────────────────────────
function SubjectsPage({ toast }) {
  const [rows, setRows]     = useState(INIT_SUBJECTS);
  const [search, setSearch] = useState("");
  const [open, setOpen]     = useState(false);
  const [f, setF]           = useState({ code:"", name:"", dept:"", teacher:"" });

  const filtered = rows.filter(r =>
    r.code.toLowerCase().includes(search.toLowerCase()) ||
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const submit = () => {
    if (!f.code || !f.name || !f.dept) { toast("Please fill all required fields.", "error"); return; }
    const init = f.teacher
      ? f.teacher.split(" ").filter((_,i,a)=>i===0||i===a.length-1).map(w=>w[0]).join("").substring(0,2).toUpperCase()
      : "";
    setRows([{ id:Date.now(), code:f.code, name:f.name, dept:f.dept, teacher:f.teacher||null, init, cls:"ta-green" }, ...rows]);
    setF({ code:"", name:"", dept:"", teacher:"" });
    setOpen(false);
    toast(`✅ Subject ${f.code} added successfully!`);
  };

  return (
    <>
      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-box">
            <IcoSearch/>
            <input type="text" placeholder="Search by name or code..."
              value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <button className="btn-primary" onClick={()=>setOpen(true)}><IcoPlus/>Add Subject</button>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Subject Code</th><th>Subject Name</th><th>Department</th><th>Assigned Teacher</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td><span className="code-link">{r.code}</span></td>
                <td>{r.name}</td>
                <td>{r.dept}</td>
                <td>
                  {r.teacher
                    ? <div className="teacher-chip"><div className={`teacher-avatar ${r.cls}`}>{r.init}</div>{r.teacher}</div>
                    : <span className="unassigned">Unassigned</span>}
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn">✏️</button>
                    <button className="icon-btn del" onClick={()=>setRows(rows.filter(x=>x.id!==r.id))}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager info={`Showing ${filtered.length} of ${rows.length} subjects`}/>
      </div>

      <div className="stat-grid" style={{marginTop:18}}>
        <div className="stat-card"><div className="stat-label">Total Subjects <span className="stat-icon">📚</span></div><div className="stat-value">{rows.length}</div></div>
        <div className="stat-card"><div className="stat-label">Faculty Coverage <span className="stat-icon">👤</span></div><div className="stat-value">94%</div></div>
        <div className="stat-card danger"><div className="stat-label">Conflicts Detected <span className="stat-icon danger-icon">⚠️</span></div><div className="stat-value">3</div></div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="📚 Add New Subject" onSubmit={submit} submitLabel="Add Subject">
        <div className="form-row">
          <FGroup label="Subject Code">
            <input className="form-input" placeholder="e.g. CS-101" value={f.code} onChange={e=>setF({...f,code:e.target.value})}/>
          </FGroup>
          <FGroup label="Subject Name">
            <input className="form-input" placeholder="e.g. Data Structures" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
          </FGroup>
        </div>
        <FGroup label="Department">
          <SelectWrap>
            <select className="form-select" value={f.dept} onChange={e=>setF({...f,dept:e.target.value})}>
              <option value="">Select department...</option>
              {["Computer Science","Mathematics","Physics","Chemistry","Biology","English","History","Economics"].map(d=><option key={d}>{d}</option>)}
            </select>
          </SelectWrap>
        </FGroup>
        <FGroup label="Assign Teacher">
          <SelectWrap>
            <select className="form-select" value={f.teacher} onChange={e=>setF({...f,teacher:e.target.value})}>
              <option value="">Select teacher...</option>
              {["Dr. Jane Doe","Prof. Alan Smith","Emily Brown","Robert Wilson","Prof. Mark Brown","Dr. Jane Smith"].map(t=><option key={t}>{t}</option>)}
            </select>
          </SelectWrap>
        </FGroup>
      </Modal>
    </>
  );
}

// ─── ROOMS PAGE ───────────────────────────────────────────────────────────────
const BADGE = { available:"badge-available", conflict:"badge-conflict", maintenance:"badge-maintenance" };
const BADGE_LABEL = { available:"AVAILABLE", conflict:"CONFLICT", maintenance:"MAINTENANCE" };

function RoomsPage({ toast }) {
  const [rows, setRows] = useState(INIT_ROOMS);
  const [open, setOpen] = useState(false);
  const [f, setF]       = useState({ number:"", type:"", capacity:"", building:"" });

  const submit = () => {
    if (!f.number || !f.type || !f.capacity) { toast("Please fill all required fields.", "error"); return; }
    const cap = f.type==="Lab" ? `${f.capacity} Workstations` : f.type==="Hall" ? `${f.capacity} Seats` : `${f.capacity} Students`;
    setRows([{ id:Date.now(), number:f.number, type:f.type, capacity:cap, status:"available" }, ...rows]);
    setF({ number:"", type:"", capacity:"", building:"" });
    setOpen(false);
    toast(`✅ Room ${f.number} added successfully!`);
  };

  return (
    <>
      <div className="stat-grid stat-grid-4">
        <div className="stat-card"><div className="stat-label">Total Rooms</div><div className="stat-value">42</div></div>
        <div className="stat-card"><div className="stat-label">Classrooms</div><div className="stat-value">28</div></div>
        <div className="stat-card"><div className="stat-label">Labs</div><div className="stat-value">12</div></div>
        <div className="stat-card"><div className="stat-label">Capacity Utilization</div><div className="stat-value" style={{color:"#F59E0B"}}>84%</div></div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-box"><IcoSearch/><input type="text" placeholder="Search rooms by number or type..."/></div>
          <button className="btn-primary" onClick={()=>setOpen(true)}><IcoPlus/>Add Room</button>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Room Number</th><th>Type</th><th>Capacity</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td><strong>{r.number}</strong></td>
                <td>{r.type}</td>
                <td>{r.capacity}</td>
                <td><span className={`badge ${BADGE[r.status]}`}>{BADGE_LABEL[r.status]}</span></td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn">✏️</button>
                    <button className="icon-btn del" onClick={()=>setRows(rows.filter(x=>x.id!==r.id))}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager info={`Showing 1-${rows.length} of 42 rooms`}/>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="🏠 Add New Room" onSubmit={submit} submitLabel="Add Room">
        <FGroup label="Room Number">
          <input className="form-input" placeholder="e.g. 101-A, CS-LAB-3" value={f.number} onChange={e=>setF({...f,number:e.target.value})}/>
        </FGroup>
        <div className="form-row">
          <FGroup label="Room Type">
            <SelectWrap>
              <select className="form-select" value={f.type} onChange={e=>setF({...f,type:e.target.value})}>
                <option value="">Select type...</option>
                {["Classroom","Lab","Hall","Seminar Room","Conference Room"].map(t=><option key={t}>{t}</option>)}
              </select>
            </SelectWrap>
          </FGroup>
          <FGroup label="Capacity">
            <input className="form-input" type="number" placeholder="e.g. 35" value={f.capacity} onChange={e=>setF({...f,capacity:e.target.value})}/>
          </FGroup>
        </div>
        <FGroup label="Building / Block">
          <input className="form-input" placeholder="e.g. Block A, Science Wing" value={f.building} onChange={e=>setF({...f,building:e.target.value})}/>
        </FGroup>
      </Modal>
    </>
  );
}

// ─── TIMETABLE PAGE ───────────────────────────────────────────────────────────
const TT_DAYS  = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"];
const TT_HOURS = ["08:00","09:00","10:00"];

// type: avail | unavail-gray | your-class | conflict-red | selected(handled by state)
const CELL_MAP = {
  "08:00-MONDAY":    { type:"avail" },
  "08:00-TUESDAY":   { type:"your-class", label:"You have another class", sub:"Class 12-C" },
  "08:00-WEDNESDAY": { type:"avail" },
  "08:00-THURSDAY":  { type:"unavail-gray", sub:"Room Booked" },
  "08:00-FRIDAY":    { type:"avail" },
  "09:00-MONDAY":    { type:"unavail-gray", sub:"Class Busy" },
  "09:00-TUESDAY":   { type:"avail" },
  "09:00-WEDNESDAY": { type:"your-class", label:"You have another class" },
  "09:00-THURSDAY":  { type:"avail" },
  "09:00-FRIDAY":    { type:"avail" },
  "10:00-MONDAY":    { type:"avail" },
  "10:00-TUESDAY":   { type:"avail" },
  "10:00-WEDNESDAY": { type:"avail" },
  "10:00-THURSDAY":  { type:"unavail-gray" },
  "10:00-FRIDAY":    { type:"conflict-red", sub:"Conflict" },
};

function TimetablePage() {
  const [selected, setSelected] = useState("10:00-MONDAY");

  const toggle = key => {
    const c = CELL_MAP[key];
    if (!c || ["unavail-gray","conflict-red","your-class"].includes(c.type)) return;
    setSelected(prev => prev===key ? null : key);
  };

  const renderCell = (h, d) => {
    const key = `${h}-${d}`;
    const c   = CELL_MAP[key] || { type:"avail" };
    const sel = selected === key;

    if (c.type === "your-class") return (
      <div className="tt-cell your-class">
        <div style={{fontSize:11,fontWeight:600,color:"#EF4444"}}>{c.label}</div>
        {c.sub && <div style={{fontSize:10,color:"#94A3B8",marginTop:3}}>{c.sub}</div>}
      </div>
    );
    if (c.type === "unavail-gray") return (
      <div className="tt-cell unavail-gray"><IcoBlock/>{c.sub && <div className="tt-small">{c.sub}</div>}</div>
    );
    if (c.type === "conflict-red") return (
      <div className="tt-cell conflict-red"><div style={{fontSize:11.5,fontWeight:600}}>{c.sub||"Conflict"}</div></div>
    );
    if (sel) return (
      <div className="tt-cell selected" onClick={()=>toggle(key)}>
        <IcoCheck/><div className="tt-small" style={{color:"rgba(255,255,255,0.8)"}}>SELECTED</div>
      </div>
    );
    return (
      <div className="tt-cell avail" onClick={()=>toggle(key)}>
        <div className="tt-plus">+</div><div className="tt-small">SELECT</div>
      </div>
    );
  };

  const hintLabel = selected
    ? `Submit ${selected.split("-")[1]} ${selected.split("-")[0]} for approval? — Additional slots continue until 16:00`
    : "Select a slot to submit for approval — Additional slots continue until 16:00";

  return (
    <>
      <div className="timetable-header">
        <div className="assignment-info">
          <div className="assign-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            Class: 10-A
          </div>
          <div className="assign-divider"/>
          <div className="assign-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Subject: Math
          </div>
          <div className="assign-divider"/>
          <div className="assign-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Room: 101
          </div>
        </div>
        <button className="btn-primary"><IcoSend/>Submit Request</button>
      </div>

      <div className="legend">
        <div className="leg-item"><div className="leg-dot avail"/>Available</div>
        <div className="leg-item"><div className="leg-dot your"/>Your Other Class</div>
        <div className="leg-item"><div className="leg-dot unavail"/>Unavailable (Room/Class)</div>
      </div>

      <div className="tt-grid">
        <table className="tt-table">
          <thead>
            <tr><th/>{TT_DAYS.map(d=><th key={d}>{d}</th>)}</tr>
          </thead>
          <tbody>
            {TT_HOURS.map(h => (
              <tr key={h}>
                <td>{h}</td>
                {TT_DAYS.map(d => <td key={d}>{renderCell(h,d)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="submit-hint"><IcoInfo/>{hintLabel}</div>
    </>
  );
}

// ─── CONFLICTS PAGE ───────────────────────────────────────────────────────────
function ConflictsPage({ toast }) {
  const [tab, setTab]           = useState("teacher");
  const [resolved, setResolved] = useState(new Set());

  const items = CONFLICT_DATA[tab] || [];

  const resolve = id => {
    setResolved(prev => new Set([...prev, id]));
    toast("✅ Conflict marked as resolved.");
  };

  return (
    <>
      <div className="alert-banner">
        <div className="alert-icon">🔴</div>
        <div>
          <div className="alert-title">Critical Overlaps Detected</div>
          <div className="alert-desc">8 scheduling conflicts require immediate attention before the timetable can be published for the Fall semester.</div>
        </div>
      </div>

      <div className="conflict-layout">
        {/* LEFT */}
        <div>
          <div className="conflict-tabs">
            {[
              { id:"teacher", label:"Teacher Conflicts", dot:"#EF4444" },
              { id:"room",    label:"Room Conflicts",    dot:"#F59E0B" },
              { id:"class",   label:"Class Conflicts",   dot:"#FBBF24" },
            ].map(t => (
              <div key={t.id} className={`ctab${tab===t.id?" active":""}`} onClick={()=>setTab(t.id)}>
                <div className="ctab-dot" style={{background:t.dot}}/>{t.label}
              </div>
            ))}
          </div>

          {items.map(c => (
            <div key={c.id} className={`conflict-card${resolved.has(c.id)?" resolved":""}`}>
              <div className="cc-header">
                <div className="cc-person">
                  <div className="cc-avatar" style={{background:c.color}}>{c.init}</div>
                  <div>
                    <div className="cc-name">{c.name}</div>
                    <div className="cc-time">📅 {c.time}</div>
                  </div>
                </div>
                <div className={`conflict-tag ${c.tagCls}`}>{c.tag}</div>
              </div>
              <div className="sessions">
                <div className="session-box">
                  <div className="session-label">Session A</div>
                  <div className="session-name">{c.sessA.name}</div>
                  <div className="session-room">📍 {c.sessA.room}</div>
                </div>
                <div className="session-box">
                  <div className="session-label">Session B</div>
                  <div className="session-name">{c.sessB.name}</div>
                  <div className="session-room">📍 {c.sessB.room}</div>
                </div>
              </div>
              <div className="cc-footer">
                <div className="cc-warning">⚠️ {c.warn}</div>
                <div className="cc-actions">
                  <button className="btn-outline">Reschedule</button>
                  <button className="btn-resolve" onClick={()=>resolve(c.id)}><IcoCheck/>Mark Resolved</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div>
          <div className="summary-card">
            <div className="summary-title">Conflict Summary</div>
            <div className="summary-row"><div className="summary-label">Teacher Overlaps</div><div className="summary-count sc-red">3</div></div>
            <div className="summary-row"><div className="summary-label">Room Clashes</div><div className="summary-count sc-orange">2</div></div>
            <div className="summary-row"><div className="summary-label">Subject Duplicates</div><div className="summary-count sc-yellow">3</div></div>
            <button className="btn-auto" style={{marginTop:14}}><IcoStar/>Auto-Resolve Minor Clashes</button>
            <div className="btn-auto-hint">Uses AI to shift slots by +30 mins where possible</div>
          </div>
          <div className="critical-banner">
            <span style={{fontSize:16}}>⚠️</span>
            <div className="cb-text">8 Critical Actions Pending</div>
            <div className="cb-count">8</div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TEACHERS PAGE ────────────────────────────────────────────────────────────
function TeachersPage({ toast }) {
  const [rows, setRows]         = useState(INIT_TEACHERS);
  const [open, setOpen]         = useState(false);
  const [filter, setFilter]     = useState("all");
  const [f, setF]               = useState({ first:"", last:"", email:"", phone:"", dept:"", subject:"" });

  const visible = rows.filter(r => filter==="all" || r.status===filter);

  const submit = () => {
    if (!f.first || !f.last || !f.email) { toast("Please fill all required fields.", "error"); return; }
    const color = AVATAR_COLORS[Math.floor(Math.random()*AVATAR_COLORS.length)];
    const tid   = `T-2024-${100+Math.floor(Math.random()*900)}`;
    setRows([{
      id:Date.now(), name:`${f.first} ${f.last}`, tid,
      email:f.email, phone:f.phone||"—",
      subjects: f.subject ? [f.subject] : [],
      status:"active",
      init:(f.first[0]+(f.last[0]||"")).toUpperCase(),
      color,
    }, ...rows]);
    setF({ first:"", last:"", email:"", phone:"", dept:"", subject:"" });
    setOpen(false);
    toast(`✅ Teacher ${f.first} ${f.last} added!`);
  };

  return (
    <>
      <div className="teacher-stats">
        <div className="t-stat"><div className="t-stat-label">Total Teachers</div><div className="t-stat-value">124</div><div className="t-stat-sub">↑ +4 this month</div></div>
        <div className="t-stat"><div className="t-stat-label">Active Now</div><div className="t-stat-value">118</div><div className="t-stat-muted">95% Activity Rate</div></div>
        <div className="t-stat"><div className="t-stat-label">On Leave</div><div className="t-stat-value" style={{color:"#EF4444"}}>6</div><div className="t-stat-muted">Scheduled Returns: 2</div></div>
        <div className="t-stat"><div className="t-stat-label">Departments</div><div className="t-stat-value">12</div><div className="t-stat-muted">Average 10/dept</div></div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-box" style={{maxWidth:340}}>
            <IcoSearch/><input type="text" placeholder="Search by Name or Teacher ID..."/>
          </div>
          <div className="toolbar-right">
            <div className="form-select-wrapper">
              <select className="filter-select" value={filter} onChange={e=>setFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button className="btn-primary" onClick={()=>setOpen(true)}><IcoPlus/>Add Teacher</button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Teacher ID</th><th>Email</th><th>Phone</th><th>Subjects</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {visible.map(r => (
              <tr key={r.id}>
                <td>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div className="teacher-avatar lg" style={{background:r.color}}>{r.init}</div>
                    <div style={{fontWeight:500}}>{r.name}</div>
                  </div>
                </td>
                <td style={{color:"var(--text-muted)",fontSize:12.5}}>{r.tid}</td>
                <td style={{color:"var(--primary)",fontSize:13}}>{r.email}</td>
                <td style={{fontSize:13,color:"var(--text-muted)"}}>{r.phone}</td>
                <td>
                  {r.subjects.map(s=>(
                    <span key={s} className={`subject-tag${s==="Chemistry"?" chem":s==="History"?" hist":""}`}>{s}</span>
                  ))}
                </td>
                <td><span className={`badge badge-${r.status}`}>● {r.status.toUpperCase()}</span></td>
                <td>
                  <div className="teacher-row-actions">
                    <button className="icon-action">👁️</button>
                    <button className="icon-action">✏️</button>
                    <button className="icon-action">🔄</button>
                    <button className="icon-action del" onClick={()=>setRows(rows.filter(x=>x.id!==r.id))}>🚫</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager info={`Showing 1 to ${visible.length} of 124 teachers`}/>
      </div>

      <button className="fab" onClick={()=>setOpen(true)}>+</button>

      <Modal open={open} onClose={()=>setOpen(false)} title="👤 Add New Teacher" onSubmit={submit} submitLabel="Add Teacher">
        <div className="form-row">
          <FGroup label="First Name">
            <input className="form-input" placeholder="First name" value={f.first} onChange={e=>setF({...f,first:e.target.value})}/>
          </FGroup>
          <FGroup label="Last Name">
            <input className="form-input" placeholder="Last name" value={f.last} onChange={e=>setF({...f,last:e.target.value})}/>
          </FGroup>
        </div>
        <FGroup label="Email Address">
          <input className="form-input" type="email" placeholder="e.g. john.doe@edu.com" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
        </FGroup>
        <div className="form-row">
          <FGroup label="Phone Number">
            <input className="form-input" type="tel" placeholder="+1 234-567-8900" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})}/>
          </FGroup>
          <FGroup label="Department">
            <SelectWrap>
              <select className="form-select" value={f.dept} onChange={e=>setF({...f,dept:e.target.value})}>
                <option value="">Select...</option>
                {["Computer Science","Mathematics","Physics","Chemistry","Biology","English"].map(d=><option key={d}>{d}</option>)}
              </select>
            </SelectWrap>
          </FGroup>
        </div>
        <FGroup label="Primary Subject">
          <SelectWrap>
            <select className="form-select" value={f.subject} onChange={e=>setF({...f,subject:e.target.value})}>
              <option value="">Select subject...</option>
              {["Physics","Mathematics","Chemistry","Biology","English","History","Computer Science"].map(s=><option key={s}>{s}</option>)}
            </select>
          </SelectWrap>
        </FGroup>
      </Modal>
    </>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function EduSchedAdmin() {
  const [page, setPage]   = useState("subjects");
  const [toastState, setToastState] = useState({ msg:"", type:"" });

  const showToast = useCallback((msg, type="") => {
    setToastState({ msg, type });
    setTimeout(() => setToastState({ msg:"", type:"" }), 3200);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardPage />;
      case "subjects":  return <SubjectsPage  toast={showToast}/>;
      case "rooms":     return <RoomsPage     toast={showToast}/>;
      case "timetable": return <TimetablePage />;
      case "conflicts": return <ConflictsPage toast={showToast}/>;
      case "teachers":  return <TeachersPage  toast={showToast}/>;
      default: return null;
    }
  };

  return (
    <div className="app-shell">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>EduSched Admin</h1>
          <span>Management System</span>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(({ id, label, Icon }) => (
            <div key={id}
                 className={`nav-item${page===id?" active":""}`}
                 onClick={() => setPage(id)}>
              <Icon/>{label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">AD</div>
          <div>
            <div className="footer-name">Admin User</div>
            <div className="footer-email">admin@school.edu</div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="main">
        <div className="topbar">
          <h2>{PAGE_TITLE[page]}</h2>
          <div className="topbar-right">
            <button className="avatar-btn">AD</button>
          </div>
        </div>
        <div className="content">
          {renderPage()}
        </div>
      </div>

      {/* ── TOAST ── */}
      <Toast msg={toastState.msg} type={toastState.type}
             onClose={() => setToastState({ msg:"", type:"" })}/>
    </div>
  );
}