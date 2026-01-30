import React, { useState } from "react";
import {
    CreditCard,
    Smartphone,
    CheckCircle2,
    ShieldCheck,
    Receipt,
    Clock,
    Download,
    Eye,
    XCircle,
    Info,
    AlertTriangle,
    History,
    CalendarDays,
    Lock,
    ExternalLink
} from "lucide-react";
import "./Payments.css";
import Header from "../header/Header.jsx";
import ParentFooter from "../footer/ParentsFooter";

export default function Payments() {
    const [selectedFee, setSelectedFee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [activeTab, setActiveTab] = useState("structure");

    const students = [
        { id: 1, name: "Abhimanyu", grade: "Grade 4-A", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhimanyu" },
        { id: 2, name: "Siddharth", grade: "Grade 2-B", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth" },
    ];

    const [selectedStudent, setSelectedStudent] = useState(students[0]);
    const months = ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR"];

    const feeStructure = [
        { id: 1, desc: "I-TERM TUITION", monthly: { JUN: 4100, JUL: 4200, AUG: 4200 }, total: 12500, status: "paid", dueDate: "Settled" },
        { id: 2, desc: "CULTURAL EVENT", monthly: { JUN: 1200 }, total: 1200, status: "pending", dueDate: "Jun 30" },
        { id: 3, desc: "II-TERM TUITION", monthly: { SEP: 4100, OCT: 4200, NOV: 4200 }, total: 12500, status: "pending", dueDate: "Oct 15" },
        { id: 4, desc: "III-TERM TUITION", monthly: { DEC: 4100, JAN: 4200, FEB: 4200 }, total: 12500, status: "upcoming", dueDate: "Feb 15" },
        { id: 5, desc: "ADMISSION KIT", monthly: { JUN: 2500 }, total: 2500, status: "paid", dueDate: "Settled" },
        { id: 6, desc: "ANNUAL DAY", monthly: { AUG: 1500 }, total: 1500, status: "pending", dueDate: "Aug 15" },
        { id: 7, desc: "TRANSPORT", monthly: { JUN: 1200, JUL: 1200, AUG: 1200, SEP: 1200 }, total: 4800, status: "pending", dueDate: "Monthly" },
    ];

    const paymentHistory = [
        { id: "TXN1029", item: "I-TERM TUITION", date: "05 Jun 2025", amount: 12500, method: "Google Pay", status: "Success" },
        { id: "TXN1028", item: "ADMISSION KIT", date: "01 Jun 2025", amount: 2500, method: "PhonePe", status: "Success" },
        { id: "TXN1027", item: "ADMIN FEE", date: "25 May 2025", amount: 500, method: "Paytm", status: "Success" },
    ];

    const pendingAmount = feeStructure.filter(f => f.status === 'pending').reduce((acc, curr) => acc + curr.total, 0);
    const nextDue = feeStructure.find(f => f.status === 'pending');

    const instructions = [
        "All transactions are processed through encrypted gateways.",
        "Kindly verify the student ID before proceeding with UPI deep-links.",
        "Cultural event fees are non-refundable after participation starts.",
        "Late fees apply for settlements after the 20th of the month."
    ];

    const upiApps = [
        { name: "Google Pay", id: "gpay", icon: "G", color: "#4285F4", deepLink: "upi://pay?pa=school@upi&pn=KiddoShadow&am=" },
        { name: "Paytm", id: "paytm", icon: "PT", color: "#00baf2", deepLink: "paytmmp://pay?pa=school@upi&pn=KiddoShadow&am=" },
        { name: "PhonePe", id: "phonepe", icon: "PP", color: "#5f259f", deepLink: "phonepe://pay?pa=school@upi&pn=KiddoShadow&am=" },
    ];

    const handlePayClick = (fee) => {
        setSelectedFee(fee);
        setIsModalOpen(true);
    };

    const handleUPIPayment = (app) => {
        const link = `${app.deepLink}${selectedFee.total}&cu=INR&tn=Fee_${selectedFee.desc}`;
        window.location.href = link;
    };

    return (
        <div className="payments-page">
            <Header
                students={students}
                selectedStudent={selectedStudent}
                onSwitch={setSelectedStudent}
            />

            <main className="scroll-wrapper">
                <div className="fee-brief-grid">
                    <div className="brief-card pending">
                        <div className="b-icon"><Receipt size={16} /></div>
                        <div className="b-info">
                            <span>Pending</span>
                            <strong>₹{pendingAmount.toLocaleString()}</strong>
                        </div>
                    </div>
                    <div className="brief-card due">
                        <div className="b-icon"><Clock size={16} /></div>
                        <div className="b-info">
                            <span>Next: {nextDue?.dueDate}</span>
                            <strong>₹{nextDue?.total.toLocaleString()}</strong>
                            <small>{nextDue?.desc}</small>
                        </div>
                    </div>
                </div>

                <div className="tab-switcher">
                    <button className={activeTab === 'structure' ? 'active' : ''} onClick={() => setActiveTab('structure')}>
                        <CalendarDays size={14} /> Fees Plan
                    </button>
                    <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>
                        <History size={14} /> History
                    </button>
                </div>

                {activeTab === 'structure' ? (
                    <div className="excel-table-section">
                        <div className="table-header-box">
                            <h3>MONTHLY GRID (2025)</h3>
                            <button className="download-btn"><Download size={12} /> CSV</button>
                        </div>
                        <div className="table-scroll-container">
                            <table className="fees-excel-table">
                                <thead>
                                    <tr>
                                        <th className="sticky-col">HEAD</th>
                                        {months.map(m => <th key={m}>{m}</th>)}
                                        <th className="total-col">TOTAL</th>
                                        <th className="mark-col">MARK</th>
                                        <th className="action-col">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feeStructure.map((row) => (
                                        <tr key={row.id}>
                                            <td className="sticky-col font-bold">{row.desc}</td>
                                            {months.map(m => <td key={m} className={row.monthly[m] ? '' : 'empty-cell'}>{row.monthly[m] ? `₹${row.monthly[m]}` : '-'}</td>)}
                                            <td className="total-col font-bold">₹{row.total.toLocaleString()}</td>
                                            <td className="mark-col">
                                                {row.status === 'paid' ? <CheckCircle2 size={14} className="mark-icon check" /> : row.status === 'pending' ? <XCircle size={14} className="mark-icon wrong" /> : <Clock size={14} opacity={0.3} />}
                                            </td>
                                            <td className="action-col">
                                                {row.status === 'pending' ? <button className="pay-btn-mini" onClick={() => handlePayClick(row)}>SETTLE</button> : <span className={row.status === 'upcoming' ? 'upcoming-txt' : 'settled-txt'}>{row.status.toUpperCase()}</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="history-section">
                        <div className="history-list">
                            {paymentHistory.map((log) => (
                                <div key={log.id} className="history-card">
                                    <div className="h-main">
                                        <div className="h-icon"><CheckCircle2 size={16} /></div>
                                        <div className="h-info">
                                            <strong>{log.item}</strong>
                                            <p>{log.date} • {log.method}</p>
                                        </div>
                                    </div>
                                    <div className="h-side">
                                        <div className="h-amount">₹{log.amount.toLocaleString()}</div>
                                        <small className="txn-id">{log.id}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="parent-instructions-section">
                    <div className="instr-header"><Info size={14} /> <h4>OFFICIAL GUIDELINES</h4></div>
                    <ul className="instr-list">
                        {instructions.map((text, i) => (<li key={i}><div className="instr-dot" /><p>{text}</p></li>))}
                    </ul>
                </div>
            </main>

            {isModalOpen && (
                <div className="payment-modal-overlay active" onClick={() => setIsModalOpen(false)}>
                    <div className="payment-bottom-sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-handle" />
                        <div className="modal-header">
                            <div className="header-left">
                                <h3>Checkout</h3>
                                <p>Settle your fees securely</p>
                            </div>
                            <button className="close-x" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>

                        <div className="checkout-summary-card">
                            <div className="cs-row">
                                <span className="cs-label">STUDENT</span>
                                <span className="cs-value">{selectedStudent.name} ({selectedStudent.grade})</span>
                            </div>
                            <div className="cs-row">
                                <span className="cs-label">FEE HEAD</span>
                                <span className="cs-value">{selectedFee?.desc}</span>
                            </div>
                            <div className="cs-divider" />
                            <div className="cs-row total">
                                <span className="cs-label">TOTAL PAYABLE</span>
                                <span className="cs-value">₹{selectedFee?.total.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="payment-selector">
                            <div className="selector-title">SELECT UPI PROVIDER</div>
                            <div className="upi-grid">
                                {upiApps.map((app) => (
                                    <button key={app.id} className="upi-tile" onClick={() => handleUPIPayment(app)}>
                                        <div className="upi-tile-icon" style={{ backgroundColor: app.color }}>{app.icon}</div>
                                        <span>{app.name}</span>
                                        <ExternalLink size={10} className="ext-icon" />
                                    </button>
                                ))}
                            </div>

                            <div className="selector-title">OTHER OPTIONS</div>
                            <button className="card-payment-btn" onClick={() => setIsModalOpen(false)}>
                                <CreditCard size={14} />
                                <span>Pay via Credit / Debit Card</span>
                            </button>
                        </div>

                        <div className="modal-security">
                            <Lock size={12} />
                            <span>128-bit SSL Secured Gateway</span>
                        </div>
                    </div>
                </div>
            )}

            <ParentFooter />
        </div>
    );
}
