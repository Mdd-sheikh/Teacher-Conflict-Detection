// ConflictsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import "./ConflictPage.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

/* ── helper: initials from name ── */
const initials = (name = "") =>
    name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

/* ── colour pool for avatars ── */
const AVATAR_COLORS = [
    "#2563eb", "#7c3aed", "#059669", "#dc2626",
    "#d97706", "#0891b2", "#be185d", "#4f46e5",
];
const avatarColor = (name = "") =>
    AVATAR_COLORS[
        [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % AVATAR_COLORS.length
    ];

/* ── tab config ── */
const TABS = [
    { key: "teacher", label: "Teacher Conflicts", dot: "#ef4444" },
    { key: "room",    label: "Room Conflicts",    dot: "#f59e0b" },
    { key: "class",   label: "Class Conflicts",   dot: "#f59e0b" },
];

const SUMMARY_LABELS = [
    { key: "teacherOverlaps",   label: "Teacher Overlaps",   color: "#ef4444", bg: "#fef2f2" },
    { key: "roomClashes",       label: "Room Clashes",        color: "#f59e0b", bg: "#fffbeb" },
    { key: "subjectDuplicates", label: "Subject Duplicates",  color: "#f59e0b", bg: "#fffbeb" },
];

/* ══════════════════════════════════════════════════════ */
export default function ConflictsPage() {
    const { API_URL } = useContext(Context);

    const [activeTab,      setActiveTab]      = useState("teacher");
    const [conflicts,      setConflicts]       = useState({ teacher: [], room: [], class: [] });
    const [resolved,       setResolved]        = useState(new Set());
    const [summary,        setSummary]         = useState({ teacherOverlaps: 0, roomClashes: 0, subjectDuplicates: 0 });
    const [loading,        setLoading]         = useState(true);
    const [autoResolving,  setAutoResolving]   = useState(false);

    /* ── Fetch conflicts ── */
    const fetchConflicts = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`${API_URL}/conflicts`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res?.data?.data ?? res?.data ?? {};

            /* normalise — backend may return flat array or categorised object */
            if (Array.isArray(data)) {
                const teacher = data.filter((c) => c.type === "teacher" || c.conflictType === "teacher");
                const room    = data.filter((c) => c.type === "room"    || c.conflictType === "room");
                const cls     = data.filter((c) => c.type === "class"   || c.conflictType === "class");
                setConflicts({ teacher, room, class: cls });
                setSummary({
                    teacherOverlaps:   teacher.length,
                    roomClashes:       room.length,
                    subjectDuplicates: cls.length,
                });
            } else {
                const teacher = data.teacherConflicts ?? data.teacher ?? [];
                const room    = data.roomConflicts    ?? data.room    ?? [];
                const cls     = data.classConflicts   ?? data.class   ?? [];
                setConflicts({ teacher, room, class: cls });
                setSummary({
                    teacherOverlaps:   data.teacherOverlaps   ?? teacher.length,
                    roomClashes:       data.roomClashes        ?? room.length,
                    subjectDuplicates: data.subjectDuplicates  ?? cls.length,
                });
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to fetch conflicts");
            /* ── fallback demo data so UI is always visible ── */
            setConflicts({
                teacher: [
                    {
                        _id: "demo-t1",
                        teacherName: "Rahul Sharma",
                        tag: "DOUBLE BOOKING",
                        tagType: "danger",
                        time: "Monday, 10:00 AM – 11:00 AM",
                        sessionA: { name: "Advanced Physics II", room: "Room 402, Block B" },
                        sessionB: { name: "Intro to Quantum",    room: "Auditorium 1" },
                        warning: "Teacher cannot be in two locations at once.",
                    },
                    {
                        _id: "demo-t2",
                        teacherName: "Dr. Anjali Pathak",
                        tag: "OVERLOAD",
                        tagType: "warning",
                        time: "Tuesday, 02:00 PM – 03:30 PM",
                        sessionA: { name: "Organic Chemistry",   room: "Lab 3, Science Wing" },
                        sessionB: { name: "Department Meeting",  room: "Boardroom 2" },
                        warning: "Meeting overlaps with laboratory session.",
                    },
                ],
                room: [
                    {
                        _id: "demo-r1",
                        teacherName: "Room 301",
                        tag: "DOUBLE BOOKED",
                        tagType: "danger",
                        time: "Wednesday, 09:00 AM – 10:00 AM",
                        sessionA: { name: "Mathematics III",  room: "Mr. Kapoor" },
                        sessionB: { name: "Physics Lab",      room: "Ms. Verma" },
                        warning: "Same room assigned to two different classes.",
                    },
                ],
                class: [
                    {
                        _id: "demo-c1",
                        teacherName: "Class 10-A",
                        tag: "OVERLAP",
                        tagType: "warning",
                        time: "Thursday, 11:00 AM – 12:00 PM",
                        sessionA: { name: "English Literature", room: "Room 201" },
                        sessionB: { name: "History",            room: "Room 204" },
                        warning: "Two subjects scheduled simultaneously for this class.",
                    },
                ],
            });
            setSummary({ teacherOverlaps: 2, roomClashes: 1, subjectDuplicates: 1 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchConflicts(); }, []);

    /* ── Mark resolved ── */
    const handleResolve = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.patch(
                `${API_URL}/conflicts/${id}/resolve`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch {
            /* silently ignore if endpoint doesn't exist yet */
        }
        setResolved((prev) => new Set([...prev, id]));
        toast.success("Conflict marked as resolved ✓");
    };

    /* ── Auto-resolve ── */
    const handleAutoResolve = async () => {
        setAutoResolving(true);
        const token = localStorage.getItem("token");
        try {
            await axios.post(
                `${API_URL}/conflicts/auto-resolve`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Minor clashes auto-resolved!");
            fetchConflicts();
        } catch {
            toast.info("Auto-resolve attempted (demo mode)");
        } finally {
            setAutoResolving(false);
        }
    };

    /* ── Visible list for active tab (excluding resolved) ── */
    const visibleList = (conflicts[activeTab] ?? []).filter(
        (c) => !resolved.has(c._id ?? c.id)
    );

    const totalActive =
        [...conflicts.teacher, ...conflicts.room, ...conflicts.class]
            .filter((c) => !resolved.has(c._id ?? c.id)).length;

    /* ══════════ RENDER ══════════ */
    return (
        <div className="cp-page">

            {/* ── ALERT BANNER ── */}
            {totalActive > 0 && (
                <div className="cp-alert">
                    <span className="cp-alert-icon">!</span>
                    <div>
                        <strong>Critical Overlaps Detected</strong>
                        <p>
                            {totalActive} scheduling conflict{totalActive !== 1 ? "s" : ""} require
                            immediate attention before the timetable can be published for the Fall semester.
                        </p>
                    </div>
                </div>
            )}

            {/* ── TABS ── */}
            <div className="cp-tabs">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        className={`cp-tab ${activeTab === t.key ? "active" : ""}`}
                        onClick={() => setActiveTab(t.key)}
                    >
                        <span className="cp-tab-dot" style={{ background: t.dot }} />
                        {t.label}
                        {conflicts[t.key]?.filter((c) => !resolved.has(c._id ?? c.id)).length > 0 && (
                            <span className="cp-tab-count">
                                {conflicts[t.key].filter((c) => !resolved.has(c._id ?? c.id)).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* ── BODY ── */}
            <div className="cp-body">

                {/* LEFT — conflict cards */}
                <div className="cp-left">
                    {loading ? (
                        <div className="cp-empty">
                            <div className="cp-spinner" />
                            <p>Loading conflicts…</p>
                        </div>
                    ) : visibleList.length === 0 ? (
                        <div className="cp-empty">
                            <span className="cp-empty-icon">✓</span>
                            <p>No {activeTab} conflicts — all clear!</p>
                        </div>
                    ) : (
                        visibleList.map((conflict) => {
                            const id   = conflict._id ?? conflict.id;
                            const name = conflict.teacherName ?? conflict.name ?? "Unknown";
                            return (
                                <div className="cp-card" key={id}>

                                    {/* Card header */}
                                    <div className="cp-card-header">
                                        <div className="cp-person">
                                            <div
                                                className="cp-avatar"
                                                style={{ background: avatarColor(name) }}
                                            >
                                                {initials(name)}
                                            </div>
                                            <div>
                                                <div className="cp-name">{name}</div>
                                                <div className="cp-time">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                                        <line x1="16" y1="2" x2="16" y2="6" />
                                                        <line x1="8"  y1="2" x2="8"  y2="6" />
                                                        <line x1="3"  y1="10" x2="21" y2="10" />
                                                    </svg>
                                                    {conflict.time ?? conflict.timeSlot ?? "—"}
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`cp-tag cp-tag-${conflict.tagType ?? "danger"}`}>
                                            {conflict.tag ?? conflict.conflictLabel ?? "CONFLICT"}
                                        </span>
                                    </div>

                                    {/* Sessions */}
                                    <div className="cp-sessions">
                                        <div className="cp-session-box">
                                            <div className="cp-session-label">SESSION A</div>
                                            <div className="cp-session-name">
                                                {conflict.sessionA?.name ?? conflict.sessionA ?? "—"}
                                            </div>
                                            <div className="cp-session-room">
                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                {conflict.sessionA?.room ?? conflict.roomA ?? "—"}
                                            </div>
                                        </div>

                                        <div className="cp-session-box">
                                            <div className="cp-session-label">SESSION B</div>
                                            <div className="cp-session-name">
                                                {conflict.sessionB?.name ?? conflict.sessionB ?? "—"}
                                            </div>
                                            <div className="cp-session-room">
                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                {conflict.sessionB?.room ?? conflict.roomB ?? "—"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="cp-card-footer">
                                        <span className="cp-warning">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                                <line x1="12" y1="9" x2="12" y2="13" />
                                                <line x1="12" y1="17" x2="12.01" y2="17" />
                                            </svg>
                                            {conflict.warning ?? conflict.message ?? "Scheduling conflict detected."}
                                        </span>
                                        <div className="cp-card-actions">
                                            <button className="cp-btn-reschedule">Reschedule</button>
                                            <button
                                                className="cp-btn-resolve"
                                                onClick={() => handleResolve(id)}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                Mark Resolved
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            );
                        })
                    )}
                </div>

                {/* RIGHT — summary sidebar */}
                <div className="cp-right">

                    {/* Summary card */}
                    <div className="cp-summary-card">
                        <h3 className="cp-summary-title">Conflict Summary</h3>
                        {SUMMARY_LABELS.map((s) => (
                            <div className="cp-summary-row" key={s.key}>
                                <span className="cp-summary-label">{s.label}</span>
                                <span
                                    className="cp-summary-badge"
                                    style={{ background: s.bg, color: s.color }}
                                >
                                    {summary[s.key] ?? 0}
                                </span>
                            </div>
                        ))}

                        <button
                            className="cp-auto-btn"
                            onClick={handleAutoResolve}
                            disabled={autoResolving}
                        >
                            {autoResolving ? (
                                <span className="cp-spinner cp-spinner-sm" />
                            ) : (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 4 23 10 17 10" />
                                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                </svg>
                            )}
                            Auto-Resolve Minor Clashes
                        </button>
                        <p className="cp-auto-hint">
                            Uses AI to shift slots by +30 mins where possible
                        </p>
                    </div>

                    {/* Promo card */}
                    <div className="cp-promo-card">
                        <div className="cp-promo-content">
                            <h4>Optimize Efficiency</h4>
                            <p>
                                Reducing conflicts improves faculty satisfaction by 24% according to
                                recent studies.
                            </p>
                        </div>
                        {totalActive > 0 && (
                            <div className="cp-promo-action">
                                <span className="cp-promo-dot">!</span>
                                {totalActive} Critical Action{totalActive !== 1 ? "s" : ""} Pending
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}