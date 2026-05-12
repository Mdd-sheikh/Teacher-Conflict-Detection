import { useState, useEffect, useRef } from "react";
import './DashboardPage.css'

/* ─── Recharts ──────────────────────────────────────────── */
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ─── Design tokens ─────────────────────────────────────── */
const T = {
  primary: "#1a56e8",
  primaryDark: "#1342c4",
  primaryLight: "#e8effe",
  accent: "#f97316",
  danger: "#e53e3e",
  dangerLight: "#fff5f5",
  warning: "#d97706",
  warningLight: "#fffbeb",
  success: "#16a34a",
  successLight: "#f0fdf4",
  bg: "#f1f5fb",
  surface: "#ffffff",
  border: "#e2e8f0",
  text: "#0f172a",
  text2: "#475569",
  text3: "#94a3b8",
};

const S = {
  shadow: "0 2px 12px rgba(15,23,42,.07)",
  shadowMd: "0 4px 24px rgba(15,23,42,.11)",
  radius: 12,
  radiusSm: 8,
};

/* ─── Initial data ──────────────────────────────────────── */
const CHART_DATA = [
  { day: "MON", conflicts: 5 },
  { day: "TUE", conflicts: 8 },
  { day: "WED", conflicts: 3 },
  { day: "THU", conflicts: 11 },
  { day: "FRI", conflicts: 6 },
  { day: "SAT", conflicts: 2 },
  { day: "SUN", conflicts: 4 },
];

const INITIAL_ALERTS = [
  { dot: "#e53e3e", name: "Teacher Overlap", sub: "Dr. Aris – Room 102 (10:00 AM)", time: "2m ago" },
  { dot: "#f97316", name: "Slot Request", sub: "Prof. Smith requested MON → FRI", time: "15m ago" },
  { dot: "#d97706", name: "Double Booking", sub: "Lab A – Chem 101 & Bio 202", time: "1h ago" },
  { dot: "#16a34a", name: "Leave Application", sub: "Ms. Clara – Next Wed", time: "3h ago" },
  { dot: "#e53e3e", name: "Room Maintenance", sub: "Room 404 blocked for 48h", time: "5h ago" },
];

const INITIAL_CONFLICTS = [
  { id: 1, issue: "Dr. Aris & Room 302", location: "Room 302", time: "10:00 AM MON", status: "urgent" },
  { id: 2, issue: "Science Lab Double-book", location: "Science Lab", time: "11:00 AM TUE", status: "urgent" },
  { id: 3, issue: "Chem 101 & Bio 202", location: "Lab A", time: "2:00 PM WED", status: "pending" },
  { id: 4, issue: "Prof. Khan – 3 classes", location: "Room 205", time: "MON / WED", status: "pending" },
  { id: 5, issue: "Room 110 – no free slot", location: "Room 110", time: "All Day FRI", status: "review" },
];

const INITIAL_REQUESTS = [
  { id: 1, faculty: "Prof. Smith", change: "MON 9am → FRI 9am", reason: "Personal", status: "pending" },
  { id: 2, faculty: "Dr. Meera", change: "TUE 11am → THU 11am", reason: "Lab Booking", status: "review" },
  { id: 3, faculty: "Mr. Ravi", change: "WED 2pm → MON 2pm", reason: "Medical", status: "pending" },
  { id: 4, faculty: "Ms. Priya", change: "FRI 10am → WED 10am", reason: "Conference", status: "review" },
  { id: 5, faculty: "Dr. Liu", change: "THU 1pm → FRI 1pm", reason: "Admin Duty", status: "pending" },
  { id: 6, faculty: "Prof. Ahmed", change: "MON 3pm → TUE 3pm", reason: "Personal", status: "pending" },
  { id: 7, faculty: "Ms. Johnson", change: "WED 9am → THU 9am", reason: "Lab Prep", status: "review" },
  { id: 8, faculty: "Dr. Sharma", change: "FRI 2pm → MON 2pm", reason: "Examination", status: "pending" },
];

const INITIAL_LEAVES = [
  { id: 1, teacher: "Ms. Clara", date: "Next Wednesday", duration: "1 Day", status: "pending" },
  { id: 2, teacher: "Prof. David", date: "Jun 15–17", duration: "3 Days", status: "review" },
  { id: 3, teacher: "Dr. Patel", date: "Jun 20", duration: "Half Day", status: "pending" },
];

const NAV = [
  {
    group: "Main", items: [
      { icon: "⊞", label: "Dashboard" },
      { icon: "📅", label: "Schedule" },
      { icon: "👤", label: "Teachers" },
      { icon: "🏛", label: "Classes" },
      { icon: "📚", label: "Subjects" },
      { icon: "🚪", label: "Rooms" },
    ]
  },
  {
    group: "Management", items: [
      { icon: "⚠️", label: "Conflicts", badge: 14 },
      { icon: "🔁", label: "Slot Requests", badge: 8 },
      { icon: "📋", label: "Leave" },
      { icon: "📊", label: "Reports" },
    ]
  },
  {
    group: "System", items: [
      { icon: "⚙️", label: "Settings" },
      { icon: "❓", label: "Help & Support" },
    ]
  },
];

/* ─── Small helpers ─────────────────────────────────────── */
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

const statusColors = {
  urgent: { bg: "#fee2e2", color: T.danger },
  pending: { bg: "#fef3c7", color: T.warning },
  review: { bg: T.primaryLight, color: T.primary },
};

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type = "") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  };
  return { toasts, show };
}

function ToastLayer({ toasts }) {
  return (
    <div style={{
      position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
      zIndex: 600, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none", alignItems: "center"
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === "success" ? T.success : t.type === "danger" ? T.danger : t.type === "warning" ? T.warning : T.text,
          color: "#fff", padding: "10px 20px", borderRadius: 99, fontSize: 13, fontWeight: 500,
          boxShadow: S.shadowMd, animation: "toastIn .3s ease", whiteSpace: "nowrap",
        }}>{t.msg}</div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════ */
function Modal({ open, onClose, title, children, onSave, saveLabel = "Save" }) {
  if (!open) return null;
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: "fixed", inset: 0, background: "rgba(15,23,42,.45)", backdropFilter: "blur(4px)",
      zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        background: T.surface, borderRadius: 16, padding: 28, width: "100%", maxWidth: 440,
        boxShadow: S.shadowMd, animation: "modalIn .25s cubic-bezier(.4,0,.2,1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>{title}</span>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: "50%", border: "none",
            background: "none", cursor: "pointer", fontSize: 16, color: T.text3, display: "grid", placeItems: "center"
          }}>✕</button>
        </div>
        {children}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
          <button onClick={onClose} style={{
            padding: "9px 20px", borderRadius: S.radiusSm, border: `1px solid ${T.border}`,
            background: T.bg, color: T.text2, fontWeight: 600, fontSize: 13, cursor: "pointer"
          }}>Cancel</button>
          <button onClick={onSave} style={{
            padding: "9px 20px", borderRadius: S.radiusSm, border: "none",
            background: T.primary, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer"
          }}>{saveLabel}</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Form helpers ── */
const FormGroup = ({ label, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: T.text2, display: "block", marginBottom: 6 }}>{label}</label>
    {children}
  </div>
);
const Input = props => (
  <input {...props} style={{
    width: "100%", padding: "9px 13px", border: `1px solid ${T.border}`,
    borderRadius: S.radiusSm, fontFamily: "inherit", fontSize: 14, background: T.bg, color: T.text, outline: "none",
    boxSizing: "border-box", ...props.style
  }} />
);
const Select = ({ options, ...props }) => (
  <select {...props} style={{
    width: "100%", padding: "9px 13px", border: `1px solid ${T.border}`,
    borderRadius: S.radiusSm, fontFamily: "inherit", fontSize: 14, background: T.bg, color: T.text, outline: "none",
    boxSizing: "border-box", cursor: "pointer"
  }}>
    {options.map(o => <option key={o}>{o}</option>)}
  </select>
);

/* ══════════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════
   TOPBAR
══════════════════════════════════════════════════════════ */
function Topbar({ pageTitle, onMenuClick, showToast }) {
  const [q, setQ] = useState("");
  const search = () => {
    if (q.trim()) showToast(`Searching for "${q.trim()}"`, "");
  };
  return (
    <header style={{
      height: 64, background: T.surface, borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", gap: 16, padding: "0 24px", position: "sticky", top: 0, zIndex: 100
    }}>
      <button onClick={onMenuClick} style={{
        display: "none", width: 34, height: 34, borderRadius: S.radiusSm,
        border: "none", background: "none", cursor: "pointer", fontSize: 18, color: T.text2,
        // shown via media query workaround — we handle via isMobile prop
      }} className="mob-menu">☰</button>

      <h1 style={{ fontSize: 17, fontWeight: 700, letterSpacing: -.3, whiteSpace: "nowrap" }}>{pageTitle}</h1>

      {/* Search */}
      <div style={{ marginLeft: "auto", position: "relative", width: 260 }}>
        <span style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: T.text3, fontSize: 13, pointerEvents: "none"
        }}>🔍</span>
        <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && search()}
          placeholder="Search teachers, classes…"
          style={{
            width: "100%", padding: "8px 14px 8px 36px", border: `1px solid ${T.border}`,
            borderRadius: 99, fontFamily: "inherit", fontSize: 13, background: T.bg, color: T.text, outline: "none",
            boxSizing: "border-box"
          }} />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => showToast("No new notifications", "warning")}
          style={{
            width: 36, height: 36, borderRadius: "50%", border: "none", background: "none",
            cursor: "pointer", fontSize: 16, position: "relative", color: T.text2
          }}>
          🔔
          <span style={{
            position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%",
            background: T.danger, border: `2px solid ${T.surface}`
          }} />
        </button>
        <button onClick={() => showToast("Settings coming soon")}
          style={{
            width: 36, height: 36, borderRadius: "50%", border: "none", background: "none",
            cursor: "pointer", fontSize: 16, color: T.text2
          }}>⚙️</button>
        <div onClick={() => showToast("Profile options")}
          style={{
            width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1a56e8,#7c3aed)",
            color: "#fff", fontSize: 12, fontWeight: 700, display: "grid", placeItems: "center", cursor: "pointer"
          }}>AD</div>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════════════ */
function StatCard({ label, value, icon }) {
  const [disp, setDisp] = useState(0);
  useEffect(() => {
    const target = parseInt(String(value).replace(/,/g, ""));
    let cur = 0;
    const step = Math.ceil(target / 40);
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setDisp(cur);
      if (cur >= target) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [value]);
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: S.radius,
      padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "box-shadow .2s, transform .2s", cursor: "default"
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = S.shadowMd; e.currentTarget.style.transform = "translateY(-2px)" }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)" }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.text3, marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, color: T.text, fontFamily: "monospace" }}>
          {disp.toLocaleString()}
        </div>
      </div>
      <div style={{
        width: 48, height: 48, borderRadius: 12, background: T.primaryLight,
        display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0
      }}>{icon}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CUSTOM TOOLTIP
══════════════════════════════════════════════════════════ */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8,
      padding: "8px 14px", boxShadow: S.shadow
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.text3, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: T.primary }}>{payload[0].value} conflicts</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PENDING TABLE
══════════════════════════════════════════════════════════ */
function Tag({ color, bg, children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "3px 9px",
      borderRadius: 99, fontSize: 11, fontWeight: 700, background: bg, color
    }}>{children}</span>
  );
}
function StatusBadge({ status }) {
  const c = statusColors[status] || { bg: T.bg, color: T.text2 };
  return <span style={{ padding: "3px 9px", borderRadius: 99, fontSize: 11, fontWeight: 700, ...c }}>{cap(status)}</span>;
}
function RowBtn({ label, variant, onClick }) {
  const styles = {
    approve: { bg: T.successLight, color: T.success },
    reject: { bg: "#fee2e2", color: T.danger },
    view: { bg: T.bg, color: T.text2 },
  };
  const s = styles[variant];
  return (
    <button onClick={onClick} style={{
      padding: "5px 10px", borderRadius: S.radiusSm, border: "none",
      fontSize: 11, fontWeight: 600, cursor: "pointer", background: s.bg, color: s.color
    }}>{label}</button>
  );
}

function ConflictsTable({ rows, onResolve, showToast }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>{["Issue", "Location", "Time", "Status", "Actions"].map(h => (
            <th key={h} style={{
              textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: ".06em", color: T.text3, padding: "8px 12px", borderBottom: `1px solid ${T.border}`
            }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={{ transition: "background .12s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px", fontSize: 13, borderBottom: `1px solid ${T.border}` }}>{r.issue}</td>
              <td style={{ padding: "12px", fontSize: 13, borderBottom: `1px solid ${T.border}` }}>{r.location}</td>
              <td style={{ padding: "12px", fontSize: 12, fontFamily: "monospace", color: T.text2, borderBottom: `1px solid ${T.border}` }}>{r.time}</td>
              <td style={{ padding: "12px", borderBottom: `1px solid ${T.border}` }}><StatusBadge status={r.status} /></td>
              <td style={{ padding: "12px", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <RowBtn label="Resolve" variant="approve" onClick={() => onResolve(r.id)} />
                  <RowBtn label="Details" variant="view" onClick={() => showToast(`Viewing: ${r.issue}`)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RequestsTable({ rows, onApprove, onReject }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>{["Faculty", "Change", "Reason", "Status", "Actions"].map(h => (
            <th key={h} style={{
              textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: ".06em", color: T.text3, padding: "8px 12px", borderBottom: `1px solid ${T.border}`
            }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={{ transition: "background .12s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px", fontSize: 13, fontWeight: 600, borderBottom: `1px solid ${T.border}` }}>{r.faculty}</td>
              <td style={{ padding: "12px", fontSize: 12, fontFamily: "monospace", color: T.text2, borderBottom: `1px solid ${T.border}` }}>{r.change}</td>
              <td style={{ padding: "12px", fontSize: 13, borderBottom: `1px solid ${T.border}` }}>{r.reason}</td>
              <td style={{ padding: "12px", borderBottom: `1px solid ${T.border}` }}><StatusBadge status={r.status} /></td>
              <td style={{ padding: "12px", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <RowBtn label="Approve" variant="approve" onClick={() => onApprove(r.id)} />
                  <RowBtn label="Reject" variant="reject" onClick={() => onReject(r.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeavesTable({ rows, onApprove, onReject }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>{["Teacher", "Date", "Duration", "Status", "Actions"].map(h => (
            <th key={h} style={{
              textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: ".06em", color: T.text3, padding: "8px 12px", borderBottom: `1px solid ${T.border}`
            }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={{ transition: "background .12s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px", fontSize: 13, fontWeight: 600, borderBottom: `1px solid ${T.border}` }}>{r.teacher}</td>
              <td style={{ padding: "12px", fontSize: 13, borderBottom: `1px solid ${T.border}` }}>{r.date}</td>
              <td style={{ padding: "12px", fontSize: 13, borderBottom: `1px solid ${T.border}` }}>{r.duration}</td>
              <td style={{ padding: "12px", borderBottom: `1px solid ${T.border}` }}><StatusBadge status={r.status} /></td>
              <td style={{ padding: "12px", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <RowBtn label="Approve" variant="approve" onClick={() => onApprove(r.id)} />
                  <RowBtn label="Reject" variant="reject" onClick={() => onReject(r.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ADD MODALS
══════════════════════════════════════════════════════════ */
function TeacherModal({ open, onClose, onSave }) {
  const [f, setF] = useState({ first: "", last: "", email: "", dept: "Science", hours: 24 });
  return (
    <Modal open={open} onClose={onClose} title="Add New Teacher"
      onSave={() => { onSave(f); setF({ first: "", last: "", email: "", dept: "Science", hours: 24 }); }} saveLabel="Save Teacher">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormGroup label="First Name"><Input placeholder="e.g. John" value={f.first} onChange={e => setF({ ...f, first: e.target.value })} /></FormGroup>
        <FormGroup label="Last Name"><Input placeholder="e.g. Smith" value={f.last} onChange={e => setF({ ...f, last: e.target.value })} /></FormGroup>
      </div>
      <FormGroup label="Email Address"><Input type="email" placeholder="teacher@school.edu" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></FormGroup>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormGroup label="Department"><Select options={["Science", "Mathematics", "Humanities", "Arts", "Commerce"]} value={f.dept} onChange={e => setF({ ...f, dept: e.target.value })} /></FormGroup>
        <FormGroup label="Max Weekly Hours"><Input type="number" placeholder="24" value={f.hours} onChange={e => setF({ ...f, hours: e.target.value })} /></FormGroup>
      </div>
    </Modal>
  );
}

function SubjectModal({ open, onClose, onSave }) {
  const [f, setF] = useState({ name: "", code: "", credits: 4, dept: "Science" });
  return (
    <Modal open={open} onClose={onClose} title="Add New Subject"
      onSave={() => { onSave(f); setF({ name: "", code: "", credits: 4, dept: "Science" }); }} saveLabel="Save Subject">
      <FormGroup label="Subject Name"><Input placeholder="e.g. Physics" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></FormGroup>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormGroup label="Code"><Input placeholder="PHY-101" value={f.code} onChange={e => setF({ ...f, code: e.target.value })} /></FormGroup>
        <FormGroup label="Credits"><Input type="number" placeholder="4" value={f.credits} onChange={e => setF({ ...f, credits: e.target.value })} /></FormGroup>
      </div>
      <FormGroup label="Department"><Select options={["Science", "Mathematics", "Humanities", "Arts"]} value={f.dept} onChange={e => setF({ ...f, dept: e.target.value })} /></FormGroup>
    </Modal>
  );
}

function RoomModal({ open, onClose, onSave }) {
  const [f, setF] = useState({ num: "", cap: 40, type: "Classroom", block: "" });
  return (
    <Modal open={open} onClose={onClose} title="Add New Room"
      onSave={() => { onSave(f); setF({ num: "", cap: 40, type: "Classroom", block: "" }); }} saveLabel="Save Room">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormGroup label="Room Number"><Input placeholder="e.g. 303" value={f.num} onChange={e => setF({ ...f, num: e.target.value })} /></FormGroup>
        <FormGroup label="Capacity"><Input type="number" placeholder="40" value={f.cap} onChange={e => setF({ ...f, cap: e.target.value })} /></FormGroup>
      </div>
      <FormGroup label="Room Type"><Select options={["Classroom", "Lab", "Lecture Hall", "Seminar Room"]} value={f.type} onChange={e => setF({ ...f, type: e.target.value })} /></FormGroup>
      <FormGroup label="Building / Block"><Input placeholder="e.g. Block A" value={f.block} onChange={e => setF({ ...f, block: e.target.value })} /></FormGroup>
    </Modal>
  );
}

function ClassModal({ open, onClose, onSave }) {
  const [f, setF] = useState({ name: "", grade: "Grade 10", strength: 35, teacher: "" });
  return (
    <Modal open={open} onClose={onClose} title="Add New Class"
      onSave={() => { onSave(f); setF({ name: "", grade: "Grade 10", strength: 35, teacher: "" }); }} saveLabel="Save Class">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormGroup label="Class Name"><Input placeholder="e.g. 10-A" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></FormGroup>
        <FormGroup label="Grade"><Select options={["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]} value={f.grade} onChange={e => setF({ ...f, grade: e.target.value })} /></FormGroup>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormGroup label="Strength"><Input type="number" placeholder="35" value={f.strength} onChange={e => setF({ ...f, strength: e.target.value })} /></FormGroup>
        <FormGroup label="Class Teacher"><Input placeholder="Search teacher…" value={f.teacher} onChange={e => setF({ ...f, teacher: e.target.value })} /></FormGroup>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const { toasts, show: showToast } = useToast();

  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [activeTab, setActiveTab] = useState("conflicts");

  const [modal, setModal] = useState(null); // "teacher"|"subject"|"room"|"class"

  const [counts, setCounts] = useState({ teachers: 142, subjects: 86, rooms: 32, classes: 1204 });
  const [conflicts, setConflicts] = useState(INITIAL_CONFLICTS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [leaves, setLeaves] = useState(INITIAL_LEAVES);

  const pendingRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── handlers ─ */
  const resolveConflict = id => {
    setConflicts(p => p.filter(c => c.id !== id));
    showToast("Conflict resolved ✓", "success");
  };
  const approveRequest = id => { setRequests(p => p.filter(r => r.id !== id)); showToast("Request approved ✓", "success"); };
  const rejectRequest = id => { setRequests(p => p.filter(r => r.id !== id)); showToast("Request rejected", "danger"); };
  const approveLeave = id => { setLeaves(p => p.filter(l => l.id !== id)); showToast("Leave approved ✓", "success"); };
  const rejectLeave = id => { setLeaves(p => p.filter(l => l.id !== id)); showToast("Leave rejected", "danger"); };

  const saveTeacher = () => { setCounts(c => ({ ...c, teachers: c.teachers + 1 })); setModal(null); showToast("Teacher added ✓", "success"); };
  const saveSubject = () => { setCounts(c => ({ ...c, subjects: c.subjects + 1 })); setModal(null); showToast("Subject added ✓", "success"); };
  const saveRoom = () => { setCounts(c => ({ ...c, rooms: c.rooms + 1 })); setModal(null); showToast("Room added ✓", "success"); };
  const saveClass = () => { setCounts(c => ({ ...c, classes: c.classes + 1 })); setModal(null); showToast("Class added ✓", "success"); };

  const scrollToPending = (tab) => {
    setActiveTab(tab);
    pendingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  

  /* ── render ─ */
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:99px; }
        @keyframes toastIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes modalIn { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @media (max-width:768px) { .mob-menu { display:flex !important; } .topbar-search { display:none !important; } }
      `}</style>

      

      <div style={{  flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar pageTitle={activeNav === "Dashboard" ? "Dashboard Overview" : activeNav}
          onMenuClick={() => setSidebarOpen(p => !p)} showToast={showToast} />

        <main style={{ padding: isMobile ? 16 : 24, flex: 1 }}>

          {/* Action Buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 24 }}>
            {[
              { icon: "👤", label: "Add Teacher", type: "teacher" },
              { icon: "📚", label: "Add Subject", type: "subject" },
              { icon: "🚪", label: "Add Room", type: "room" },
              { icon: "🏛", label: "Add Class", type: "class" },
            ].map(b => (
              <button key={b.type} onClick={() => setModal(b.type)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px 16px", borderRadius: S.radius, background: T.primary, color: "#fff",
                  border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(26,86,232,.2)", transition: "background .15s, transform .1s"
                }}
                onMouseEnter={e => { e.currentTarget.style.background = T.primaryDark; e.currentTarget.style.transform = "translateY(-1px)" }}
                onMouseLeave={e => { e.currentTarget.style.background = T.primary; e.currentTarget.style.transform = "translateY(0)" }}>
                <span>{b.icon}</span>{b.label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 24 }}>
            <StatCard label="Total Teachers" value={counts.teachers} icon="🎓" />
            <StatCard label="Total Subjects" value={counts.subjects} icon="📘" />
            <StatCard label="Total Rooms" value={counts.rooms} icon="🏫" />
            <StatCard label="Total Classes" value={counts.classes} icon="👥" />
          </div>

          {/* Alert Banners */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12, marginBottom: 24 }}>
            {/* Conflicts */}
            <div style={{
              borderRadius: S.radius, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16,
              background: T.dangerLight, border: "1px solid #fca5a5"
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", background: "#fee2e2",
                display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0
              }}>🚨</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.danger, marginBottom: 3 }}>Active Conflicts</div>
                <div style={{ fontSize: 12, color: T.text2 }}>
                  {conflicts.length > 0 ? `${conflicts.length} unscheduled overlap${conflicts.length > 1 ? "s" : ""} detected.` : "All conflicts resolved!"}
                </div>
              </div>
              <button onClick={() => scrollToPending("conflicts")}
                style={{
                  padding: "8px 16px", borderRadius: S.radiusSm, border: "none", background: T.danger,
                  color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0
                }}>Resolve</button>
            </div>
            {/* Requests */}
            <div style={{
              borderRadius: S.radius, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16,
              background: T.warningLight, border: "1px solid #fcd34d"
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", background: "#fef3c7",
                display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0
              }}>📨</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.warning, marginBottom: 3 }}>Slot Requests</div>
                <div style={{ fontSize: 12, color: T.text2 }}>{requests.length} faculty requests for slot changes are pending approval.</div>
              </div>
              <button onClick={() => scrollToPending("requests")}
                style={{
                  padding: "8px 16px", borderRadius: S.radiusSm, border: "none", background: T.warning,
                  color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0
                }}>Review</button>
            </div>
          </div>

          {/* Chart + Recent Alerts */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: 20, marginBottom: 24 }}>
            {/* Chart */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: S.radius, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Conflicts per Day</span>
                <span style={{ fontSize: 12, color: T.text3 }}>Last 7 Days</span>
              </div>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={T.primary} stopOpacity={0.15} />
                        <stop offset="95%" stopColor={T.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: "monospace", fill: T.text3 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fontFamily: "monospace", fill: T.text3 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="conflicts" stroke={T.primary} strokeWidth={2}
                      fill="url(#cGrad)" dot={{ fill: T.primary, r: 4 }} activeDot={{ r: 7 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Alerts */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: S.radius, padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Recent Alerts</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {INITIAL_ALERTS.map((a, i) => (
                  <div key={i} onClick={() => showToast(`${a.name}: ${a.sub}`)}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 12, padding: 10,
                      borderRadius: S.radiusSm, cursor: "pointer", transition: "background .12s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: a.dot, marginTop: 4, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: T.text2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.sub}</div>
                    </div>
                    <div style={{ fontSize: 11, color: T.text3, whiteSpace: "nowrap", fontFamily: "monospace" }}>{a.time}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => showToast("All notifications panel coming soon")}
                style={{
                  display: "block", width: "100%", textAlign: "center", marginTop: 12, padding: 9,
                  borderRadius: S.radiusSm, border: "none", background: "none", fontSize: 13, fontWeight: 600,
                  color: T.primary, cursor: "pointer", transition: "background .15s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = T.primaryLight}
                onMouseLeave={e => e.currentTarget.style.background = "none"}>
                View All Notifications →
              </button>
            </div>
          </div>

          {/* Pending Operations */}
          <div ref={pendingRef} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: S.radius, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Pending Operations</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { key: "conflicts", label: "Conflicts", count: conflicts.length },
                  { key: "requests", label: "Requests", count: requests.length },
                  { key: "leaves", label: "Leaves", count: leaves.length },
                ].map(t => (
                  <button key={t.key} onClick={() => setActiveTab(t.key)}
                    style={{
                      padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: "pointer",
                      border: "none", background: activeTab === t.key ? T.primary : T.bg,
                      color: activeTab === t.key ? "#fff" : T.text2, transition: "background .15s"
                    }}>
                    {t.label} <span style={{ fontFamily: "monospace" }}>{t.count}</span>
                  </button>
                ))}
              </div>
            </div>
            {activeTab === "conflicts" && <ConflictsTable rows={conflicts} onResolve={resolveConflict} showToast={showToast} />}
            {activeTab === "requests" && <RequestsTable rows={requests} onApprove={approveRequest} onReject={rejectRequest} />}
            {activeTab === "leaves" && <LeavesTable rows={leaves} onApprove={approveLeave} onReject={rejectLeave} />}
          </div>

        </main>
      </div>

      {/* FAB */}
      <button onClick={() => setModal("teacher")}
        style={{
          position: "fixed", bottom: 28, right: 28, width: 52, height: 52, borderRadius: "50%",
          background: T.primary, color: "#fff", border: "none", fontSize: 22, cursor: "pointer",
          boxShadow: "0 4px 20px rgba(26,86,232,.4)", zIndex: 300, display: "grid", placeItems: "center",
          transition: "transform .2s, box-shadow .2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1) rotate(45deg)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(26,86,232,.5)" }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(26,86,232,.4)" }}>
        +
      </button>

      {/* Modals */}
      <TeacherModal open={modal === "teacher"} onClose={() => setModal(null)} onSave={saveTeacher} />
      <SubjectModal open={modal === "subject"} onClose={() => setModal(null)} onSave={saveSubject} />
      <RoomModal open={modal === "room"} onClose={() => setModal(null)} onSave={saveRoom} />
      <ClassModal open={modal === "class"} onClose={() => setModal(null)} onSave={saveClass} />

      {/* Toasts */}
      <ToastLayer toasts={toasts} />
    </div>
  );
}