/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ─── DATA MASTER ───────────────────────────────────────────────────────────────
const CUSTOMERS = ["DIKICHI BANDUNG FRESH", "GACOAN BANDUNG FRESH", "BENFARM BANDUNG FRESH"];
const ITEMS = [
  { customer: "DIKICHI BANDUNG FRESH", item: "BEEF PATTY DKC 70 G", sku: "110193" },
  { customer: "DIKICHI BANDUNG FRESH", item: "BONELESS PAHA DKC 70 G REG", sku: "110206" },
  { customer: "DIKICHI BANDUNG FRESH", item: "BUN 4 INCH NON WIJEN", sku: "110116" },
  { customer: "DIKICHI BANDUNG FRESH", item: "FRENCH FRIES SNOW VALLEY", sku: "110192" },
  { customer: "DIKICHI BANDUNG FRESH", item: "LUMPIA UDANG FROZEN", sku: "110199" },
  { customer: "DIKICHI BANDUNG FRESH", item: "SIOMAY AYAM FROZEN", sku: "110197" },
  { customer: "DIKICHI BANDUNG FRESH", item: "SIOMAY NUCLEAR FROZEN", sku: "110198" },
  { customer: "DIKICHI BANDUNG FRESH", item: "SUNDAE SOFT MIX VANILLA 10L", sku: "110161" },
  { customer: "DIKICHI BANDUNG FRESH", item: "UDANG KEJU FROZEN", sku: "110196" },
  { customer: "DIKICHI BANDUNG FRESH", item: "AYAM BIC CUT BAGIAN BESAR REG (DADA/PATAS)", sku: "120043" },
  { customer: "DIKICHI BANDUNG FRESH", item: "AYAM BIC CUT BAGIAN KECIL REG (PABA/SAYAP)", sku: "120044" },
  { customer: "DIKICHI BANDUNG FRESH", item: "AYAM BIC CUT BAGIAN BESAR HOT (DADA/PATAS)", sku: "120045" },
  { customer: "DIKICHI BANDUNG FRESH", item: "AYAM BIC CUT BAGIAN KECIL HOT (PABA/SAYAP)", sku: "120046" },
  { customer: "GACOAN BANDUNG FRESH", item: "AYAM CINCANG (V20)", sku: "100211" },
  { customer: "GACOAN BANDUNG FRESH", item: "ADONAN PANGSIT (V20)", sku: "100209" },
  { customer: "GACOAN BANDUNG FRESH", item: "LUMPIA UDANG (V20)", sku: "100244" },
  { customer: "GACOAN BANDUNG FRESH", item: "SIOMAY DIMSUM (V20)", sku: "100256" },
  { customer: "GACOAN BANDUNG FRESH", item: "KULIT PANGSIT (V.20)", sku: "100239" },
  { customer: "GACOAN BANDUNG FRESH", item: "MIE (V.20)", sku: "100245" },
  { customer: "GACOAN BANDUNG FRESH", item: "KRUPUK MIE (V.30)", sku: "100238" },
  { customer: "GACOAN BANDUNG FRESH", item: "SURAI NAGA (V.30)", sku: "100274" },
  { customer: "GACOAN BANDUNG FRESH", item: "UDANG KEJU FROZEN", sku: "100294" },
  { customer: "GACOAN BANDUNG FRESH", item: "UDANG RAMBUTAN (PENTOL) (V20)", sku: "100286" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM CHICKEN KARAAGE 400 GR", sku: "BEN-00000049" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM FRANKFURTER SOSIS ORI 300GR", sku: "BEN-00000077" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM FRANKFURTER SOSIS KEJU 300GR", sku: "BEN-00000078" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM SPICY CHICKEN POPCORN 400GR", sku: "BEN-00000115" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM CHICKEN NUGGET PREMIUM 400 GR", sku: "BEN-00000111" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM HONEY CHICKEN WINGS 400 GR", sku: "BEN-00000112" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM CHICKEN NUGGET STICK PREMIUM 300GR", sku: "BEN-00000117" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM SPICY CHICKEN WINGS 400 GR", sku: "BEN-00000120" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM MAC & CHEESE BITES 180GR", sku: "BEN-00000103" },
  { customer: "BENFARM BANDUNG FRESH", item: "DEBEZ MAKARONI KEJU GORENG 450GR", sku: "BEN-00000114" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM MAC & CHEESE BOLOGNESE 180GR", sku: "BEN-00000121" },
  { customer: "BENFARM BANDUNG FRESH", item: "DEBEZ MAKARONI PEDAS GORENG 300GR", sku: "BEN-00000126" },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────────
const getTodayDate = () => {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
};

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'Pilih Tanggal';
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${parseInt(d)} ${months[parseInt(m)-1]} ${y}`;
};

const getDriveDirectUrl = (driveUrl) => {
  if (!driveUrl) return '';
  const match = driveUrl.match(/\/d\/(.+?)\//);
  if (match && match[1]) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  return driveUrl;
};

// ─── CUSTOM SELECT (Bottom Sheet style — GoPay/DANA approach) ──────────────────
const CustomSelect = ({ value, onChange, options, placeholder, disabled, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const accent     = themeColor === 'blue' ? '#3b82f6' : '#ef4444';
  const accentSoft = themeColor === 'blue' ? '#eff6ff' : '#fef2f2';
  const gradFrom   = themeColor === 'blue' ? '#2563eb' : '#dc2626';
  const gradTo     = themeColor === 'blue' ? '#1d4ed8' : '#991b1b';

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  const open  = () => { if (!disabled) { setSearch(''); setIsOpen(true);  } };
  const close = () => { setIsOpen(false); setSearch(''); };
  const pick  = (opt) => { onChange(opt); close(); };

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={open}
        disabled={disabled}
        className="press-scale w-full bg-white border-2 border-gray-100 rounded-2xl px-4 py-4 text-left flex items-center justify-between shadow-sm transition-all"
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <span className="font-semibold text-sm" style={{ color: value ? '#1f2937' : '#9ca3af' }}>
          {value || placeholder}
        </span>
        <svg width="18" height="18" fill="none" stroke={accent} strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* ── Bottom Sheet Portal ── */}
      {isOpen && ReactDOM.createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {/* Overlay */}
          <div
            onClick={close}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          />
          {/* Sheet */}
          <div
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: '28px 28px 0 0',
              maxHeight: '75vh',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideUp 0.3s cubic-bezier(.22,.68,0,1.2) both',
            }}
          >
            {/* Handle & header */}
            <div style={{ padding: '16px 20px 12px', flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: '#e5e7eb', borderRadius: 99, margin: '0 auto 16px' }} />
              <p style={{ fontSize: 16, fontWeight: 900, color: '#111827', marginBottom: 12 }}>{placeholder}</p>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Cari..."
                  style={{
                    width: '100%', boxSizing: 'border-box', border: '2px solid #f3f4f6',
                    borderRadius: 16, padding: '12px 12px 12px 44px', fontSize: 14,
                    fontWeight: 600, outline: 'none', background: '#f9fafb', caretColor: accent,
                  }}
                />
                <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
            </div>

            {/* List */}
            <ul style={{ overflowY: 'auto', flex: 1, paddingBottom: 24 }}>
              {filtered.length > 0 ? filtered.map((opt, i) => (
                <li
                  key={i}
                  onClick={() => pick(opt)}
                  style={{
                    padding: '15px 20px',
                    fontSize: 14,
                    fontWeight: 600,
                    color: opt === value ? accent : '#374151',
                    background: opt === value ? accentSoft : 'transparent',
                    borderBottom: '1px solid #f9fafb',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {opt}
                  {opt === value && (
                    <svg width="16" height="16" fill="none" stroke={accent} strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </li>
              )) : (
                <li style={{ padding: '20px', textAlign: 'center', color: '#9ca3af', fontSize: 13, fontStyle: 'italic' }}>
                  Tidak ditemukan
                </li>
              )}
            </ul>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// ─── DATE PICKER BUTTON ─────────────────────────────────────────────────────────
const DatePickerBtn = ({ value, onChange, themeColor, label = 'Tanggal', placeholder = 'Pilih Tanggal' }) => {
  const ref = useRef(null);
  const accent = themeColor === 'blue' ? '#3b82f6' : '#ef4444';
  const bgSoft = themeColor === 'blue' ? '#eff6ff' : '#fef2f2';
  return (
    <div
      className="relative w-full flex items-center gap-3 bg-white border-2 border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm cursor-pointer press-scale"
      onClick={() => { try { ref.current.showPicker(); } catch(e) { ref.current.click(); } }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bgSoft }}>
        <svg width="18" height="18" fill="none" stroke={accent} strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="3" ry="3"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm font-bold" style={{ color: value ? '#1f2937' : '#9ca3af' }}>
          {value ? formatDisplayDate(value) : placeholder}
        </p>
      </div>
      <input
        ref={ref}
        type="date"
        value={value}
        onChange={onChange}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
      />
    </div>
  );
};

// ─── TOAST ──────────────────────────────────────────────────────────────────────
const Toast = ({ msg, type }) => (
  <div className="animate-toast fixed top-5 left-1/2 z-[999] w-11/12 max-w-sm pointer-events-none" style={{ transform: 'translateX(-50%)' }}>
    <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white ${type === 'success' ? 'bg-gray-900' : 'bg-red-500'}`}>
      <span className="text-xl">{type === 'success' ? '✅' : '❌'}</span>
      <p className="text-sm font-bold">{msg}</p>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {

  useEffect(() => {
    let meta = document.querySelector("meta[name='viewport']");
    if (!meta) { meta = document.createElement('meta'); meta.name = 'viewport'; document.head.appendChild(meta); }
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
  }, []);

  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [date, setDate] = useState(getTodayDate());
  const [nopol, setNopol] = useState('');
  const [supplier, setSupplier] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [mainPhoto, setMainPhoto] = useState(null);
  const [defectPhoto, setDefectPhoto] = useState(null);

  const [resto, setResto] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState('');
  const [expDate, setExpDate] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [cart, setCart] = useState([]);

  const [historyData, setHistoryData] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [searchHistory, setSearchHistory] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const mainPhotoRef = useRef(null);
  const defectPhotoRef = useRef(null);

  const isOutbound = role === 'outbound';
  const themeColor = isOutbound ? 'blue' : 'red';
  const accent     = isOutbound ? '#3b82f6' : '#ef4444';
  const accentDark = isOutbound ? '#1d4ed8' : '#b91c1c';
  const accentSoft = isOutbound ? '#eff6ff' : '#fef2f2';
  const gradFrom   = isOutbound ? '#2563eb' : '#dc2626';
  const gradTo     = isOutbound ? '#1d4ed8' : '#991b1b';
  const title      = isOutbound ? 'Outbound Hub' : 'Inbound Hub';
  const icon       = isOutbound ? '🚚' : '📦';

  const filteredItems = ITEMS.filter(i => i.customer === selectedCustomer);
  const itemOptions   = filteredItems.map(i => i.item);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const resetForm = () => {
    setDate(getTodayDate()); setNopol(''); setSupplier('');
    setSelectedCustomer(''); setResto(''); setSelectedItem('');
    setSku(''); setQty(''); setExpDate(''); setKeterangan('');
    setMainPhoto(null); setDefectPhoto(null); setCart([]);
    setSearchHistory('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === (isOutbound ? '4321' : '1234')) {
      setIsAuthenticated(true); setPinError(false); setPinInput('');
    } else {
      setPinError(true); setPinInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); setShowLogoutConfirm(false);
    setRole(null); resetForm();
  };

  const handleItemSelect = (name) => {
    setSelectedItem(name);
    const found = ITEMS.find(i => i.item === name);
    setSku(found ? found.sku : '');
  };

  const triggerCamera = (ref) => {
    if (!nopol.trim()) { showToast('Isi NOPOL terlebih dahulu!', 'error'); return; }
    ref.current.click();
  };

  const handlePhotoCapture = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 1024;
        let w = img.width, h = img.height;
        if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const barH = 90;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, h - barH, w, barH);
        ctx.textAlign = 'left';
        ctx.fillStyle = isOutbound ? '#60a5fa' : '#f87171';
        ctx.font = 'bold 20px Arial';
        const label = isOutbound
          ? (type === 'main' ? 'FOTO MUAT TRUK' : 'FOTO SEGEL')
          : (type === 'main' ? 'FOTO MOBIL KOSONG' : 'FOTO BAD STOCK');
        ctx.fillText(`B-LOG ${role.toUpperCase()} - ${label}`, 16, h - 54);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 30px Arial';
        ctx.fillText(nopol.toUpperCase(), 16, h - 18);
        ctx.textAlign = 'right'; ctx.fillStyle = '#ddd'; ctx.font = 'bold 16px monospace';
        const d = new Date();
        ctx.fillText(`${d.toLocaleDateString('id-ID')} ${d.toLocaleTimeString('id-ID')}`, w - 16, h - 18);
        const b64 = canvas.toDataURL('image/jpeg', 0.65);
        type === 'main' ? setMainPhoto(b64) : setDefectPhoto(b64);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (isOutbound) {
      if (!resto || !selectedCustomer || !selectedItem || !qty || !expDate) {
        showToast('Lengkapi semua data barang!', 'error'); return;
      }
      setCart([...cart, { resto, customer: selectedCustomer, item: selectedItem, sku, qty, expDate }]);
    } else {
      if (!selectedItem || !qty || !expDate) {
        showToast('Lengkapi data barang!', 'error'); return;
      }
      setCart([...cart, { item: selectedItem, sku, qty, expDate }]);
    }
    setSelectedItem(''); setSku(''); setQty(''); setExpDate('');
    showToast('Ditambah ke keranjang 🛒');
  };

  const handleRemoveFromCart = (idx) => {
    const c = [...cart]; c.splice(idx, 1); setCart(c);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = isOutbound
      ? (date && nopol && cart.length > 0 && mainPhoto)
      : (date && nopol && supplier && selectedCustomer && cart.length > 0 && mainPhoto);
    if (!ok) { showToast('Lengkapi data, keranjang, & foto!', 'error'); return; }
    setIsLoading(true);
    const payload = { type: role, date, nopol, supplier: role==='inbound'?supplier:'', customer: role==='inbound'?selectedCustomer:'', keterangan, mainPhoto, defectPhoto, items: cart };
    try {
      const url = 'https://script.google.com/macros/s/AKfycbxeoOK8BxfrT2Guk3GGh70v15IITYZYQCOA4K_ek3c8n3BkQ080z4Buqyp0DT9prNi6Mw/exec';
      const res = await fetch(url, { method:'POST', body:JSON.stringify(payload), headers:{'Content-Type':'text/plain;charset=utf-8'} });
      const result = await res.json();
      if (result.status === 'success') {
        showToast('Truk berhasil diproses! 🚀');
        setNopol(''); setSupplier(''); setSelectedCustomer(''); setResto('');
        setKeterangan(''); setMainPhoto(null); setDefectPhoto(null); setCart([]);
        setDate(getTodayDate());
      } else { showToast('Gagal: ' + result.message, 'error'); }
    } catch { showToast('Koneksi terputus.', 'error'); }
    finally { setIsLoading(false); }
  };

  const fetchHistory = useCallback(async () => {
    setIsLoadingHistory(true); setHistoryError('');
    try {
      const url = `https://script.google.com/macros/s/AKfycbxeoOK8BxfrT2Guk3GGh70v15IITYZYQCOA4K_ek3c8n3BkQ080z4Buqyp0DT9prNi6Mw/exec?action=getHistory&type=${role}`;
      const res = await fetch(url);
      const result = await res.json();
      if (result.status === 'success') {
        const grouped = [], map = new Map();
        result.data.forEach(row => {
          const key = row.timestamp + '_' + row.nopol;
          if (!map.has(key)) {
            map.set(key, { timestamp:row.timestamp, date:row.date, nopol:row.nopol, supplier:row.supplier, customer:row.customer, keterangan:row.keterangan, mainPhotoUrl:row.mainPhotoUrl, defectPhotoUrl:row.defectPhotoUrl, items:[] });
            grouped.push(map.get(key));
          }
          map.get(key).items.push(
            isOutbound
              ? { resto:row.resto, customer:row.customer, item:row.item, sku:row.sku, qty:row.qty }
              : { item:row.item, sku:row.sku, qty:row.qty }
          );
        });
        setHistoryData(grouped);
      } else { setHistoryError('Gagal tarik data.'); }
    } catch { setHistoryError('Sinyal lemah.'); }
    finally { setIsLoadingHistory(false); }
  }, [role]);

  useEffect(() => {
    if (activeTab === 'history' && isAuthenticated) fetchHistory();
  }, [activeTab, isAuthenticated, fetchHistory]);

  const handleShareWA = (group) => {
    let text = `*${role.toUpperCase()} REPORT - B-LOG*\n\n*Waktu:* ${group.timestamp}\n*Nopol:* ${group.nopol}\n`;
    if (role === 'inbound') {
      text += `*Supplier:* ${group.supplier||'-'}\n*Customer:* ${group.customer}\n\n*BARANG MASUK:*\n`;
      group.items.forEach((it,i) => { text += `${i+1}. ${it.item} - *${it.qty} CTN*\n`; });
    } else {
      text += `\n*MULTI-DROP:*\n`;
      const rm = {};
      group.items.forEach(it => { if(!rm[it.resto]) rm[it.resto]=[]; rm[it.resto].push(it); });
      Object.keys(rm).forEach(r => {
        text += `\n📍 *${r}*\n`;
        rm[r].forEach(it => { text += `- ${it.item} (*${it.qty} CTN*)\n`; });
      });
    }
    text += `\n*Ket:* ${group.keterangan||'-'}\n*Foto 1:* ${group.mainPhotoUrl?getDriveDirectUrl(group.mainPhotoUrl):'-'}\n*Foto 2:* ${group.defectPhotoUrl?getDriveDirectUrl(group.defectPhotoUrl):'-'}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredHistory = historyData.filter(g => {
    const t = searchHistory.toLowerCase();
    if (!t) return true;
    if (role === 'inbound') return g.nopol.toLowerCase().includes(t) || g.customer.toLowerCase().includes(t) || (g.supplier&&g.supplier.toLowerCase().includes(t));
    return g.nopol.toLowerCase().includes(t) || g.items.some(it => it.resto&&it.resto.toLowerCase().includes(t));
  });

  // ─── INPUT FIELD STYLE ───
  const inputCls = `w-full bg-white border-2 border-gray-100 rounded-2xl px-4 py-4 text-sm font-semibold text-gray-800 outline-none transition-all duration-200 focus:border-current shadow-sm`;

  // ══════════════════════════════════════════════
  // PAGE 1: PORTAL — Premium Splash
  // ══════════════════════════════════════════════
  if (!role) return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: 'linear-gradient(160deg, #c0392b 0%, #7f1d1d 55%, #1c0a00 100%)' }}>
      {toast && <Toast {...toast} />}

      {/* ── Decorative blobs ── */}
      <div className="absolute" style={{ top: '-60px', right: '-60px', width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}/>
      <div className="absolute" style={{ top: '60px', right: '40px', width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>
      <div className="absolute" style={{ bottom: '-80px', left: '-60px', width: 260, height: 260, borderRadius: '50%', background: 'rgba(239,68,68,0.15)' }}/>
      <div className="absolute" style={{ top: '35%', left: '-30px', width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>

      {/* ── Hero Section ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4">
        {/* Glow rings + logo */}
        <div className="relative mb-8 animate-scale-in">
          <div className="absolute rounded-3xl animate-pulse" style={{ inset: -20, background: 'rgba(255,255,255,0.06)', borderRadius: 36 }}/>
          <div className="absolute rounded-3xl" style={{ inset: -10, background: 'rgba(255,255,255,0.09)', borderRadius: 30 }}/>
          <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl shadow-2xl relative z-10"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1.5px solid rgba(255,255,255,0.25)' }}>
            🚛
          </div>
        </div>

        <h1 className="text-5xl font-black text-white text-center tracking-tight animate-slide-up" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          B-Log
        </h1>
        <p className="text-white/50 text-sm font-semibold text-center mt-2 tracking-wider uppercase animate-slide-up">
          Sistem Operasional Logistik
        </p>

        {/* Tagline pills */}
        <div className="flex gap-2 mt-6 animate-fade-in">
          {['📦 Inbound', '🚚 Outbound', '📊 Realtime'].map(t => (
            <div key={t} className="px-3 py-1.5 rounded-full text-xs font-bold text-white/80"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom card area ── */}
      <div className="px-5 pb-10 animate-slide-up">
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest text-center mb-4">Pilih Modul</p>

        {/* Inbound */}
        <button
          onClick={() => setRole('inbound')}
          className="press-scale w-full mb-3 flex items-center gap-4 p-5 rounded-3xl text-left"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.15)' }}>
            📦
          </div>
          <div className="flex-1">
            <h3 className="font-black text-white text-base">Inbound</h3>
            <p className="text-white/50 text-xs font-medium mt-0.5">Penerimaan Barang Masuk</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>

        {/* Outbound */}
        <button
          onClick={() => setRole('outbound')}
          className="press-scale w-full flex items-center gap-4 p-5 rounded-3xl text-left"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.12)' }}>
            🚚
          </div>
          <div className="flex-1">
            <h3 className="font-black text-white text-base">Outbound</h3>
            <p className="text-white/50 text-xs font-medium mt-0.5">Pengiriman Multi-Drop</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>

        <p className="text-center text-white/20 text-xs font-medium mt-6">B-Log Operasional © 2025</p>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════
  // PAGE 2: LOGIN PIN
  // ══════════════════════════════════════════════
  if (!isAuthenticated) return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f8fafc' }}>
      {toast && <Toast {...toast} />}
      {/* Header Wave */}
      <div className="relative w-full flex flex-col items-center justify-center pb-10 pt-16" style={{ background: `linear-gradient(160deg, ${gradFrom} 0%, ${gradTo} 100%)`, minHeight: 280 }}>
        {/* Decorative circles */}
        <div className="absolute top-6 right-8 w-24 h-24 rounded-full opacity-10" style={{ background: '#fff' }}/>
        <div className="absolute top-16 right-16 w-12 h-12 rounded-full opacity-10" style={{ background: '#fff' }}/>
        <div className="absolute bottom-4 left-6 w-16 h-16 rounded-full opacity-10" style={{ background: '#fff' }}/>

        <button onClick={() => setRole(null)} className="absolute top-5 left-5 flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-sm font-bold press-scale">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Batal
        </button>

        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-2xl animate-slide-up" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)' }}>
          {icon}
        </div>
        <h1 className="text-2xl font-black text-white animate-slide-up">{title}</h1>
        <p className="text-white/70 text-sm font-medium mt-1 animate-slide-up">Masukkan PIN untuk lanjut</p>

        {/* Wave bottom */}
        <svg className="absolute -bottom-1 left-0 w-full" height="40" viewBox="0 0 400 40" preserveAspectRatio="none">
          <path d="M0,40 C100,0 300,0 400,40 L400,40 L0,40 Z" fill="#f8fafc"/>
        </svg>
      </div>

      {/* PIN Form */}
      <div className="flex-1 flex flex-col justify-center px-6 -mt-4 animate-slide-up">
        <div className="bg-white rounded-3xl shadow-xl p-7 border border-gray-50 max-w-sm w-full mx-auto">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-center mb-5">PIN Akses</p>

          <form onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                className="w-full text-center font-black text-4xl py-5 rounded-2xl bg-gray-50 border-2 outline-none transition-all duration-300 tracking-[0.5em]"
                style={{ borderColor: pinError ? '#ef4444' : 'transparent', color: pinError ? '#ef4444' : '#1f2937', caretColor: accent }}
                placeholder="••••"
                maxLength={4}
              />
            </div>
            {pinError && (
              <p className="text-red-500 text-xs font-bold text-center mt-3 animate-slide-down">
                ❌ PIN Salah! Coba lagi.
              </p>
            )}
            <button
              type="submit"
              className="press-scale w-full mt-5 text-white font-black text-base py-4 rounded-2xl shadow-lg transition-all"
              style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
            >
              Masuk →
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════
  // PAGE 3: MAIN APP
  // ══════════════════════════════════════════════
  return (
    <div className="fixed inset-0 flex justify-center" style={{ background: '#f0f2f5' }}>
      <div className="w-full max-w-md bg-gray-50 flex flex-col" style={{ height: '100%', overflow: 'hidden' }}>

        {/* TOAST */}
        {toast && <Toast {...toast} />}

        {/* ── HEADER (compact) ── */}
        <div className="relative flex-shrink-0" style={{ background: `linear-gradient(135deg, ${gradFrom} 0%, ${gradTo} 100%)` }}>
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10" style={{ background: '#fff' }}/>
          <div className="absolute top-2 right-16 w-8 h-8 rounded-full opacity-10" style={{ background: '#fff' }}/>

          <div className="relative z-10 px-5 pt-10 pb-4 flex items-center justify-between">
            <div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">B-Log Operasional</p>
              <h1 className="text-xl font-black text-white leading-tight">{title}</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-white/60 text-[10px] font-semibold">Online</span>
                {cart.length > 0 && (
                  <span className="ml-2 text-[10px] font-black text-white/80">🛒 {cart.length} item</span>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="press-scale w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>

          <svg className="w-full block" style={{ marginTop: -1 }} height="18" viewBox="0 0 400 18" preserveAspectRatio="none">
            <path d="M0,18 C150,0 250,0 400,18 L400,18 L0,18 Z" fill="#f0f2f5"/>
          </svg>
        </div>

        {/* ── SCROLL CONTENT ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-3 pb-4">

          {activeTab === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* CARD: Info Truk */}
              <div className="card-1 bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Info Truk</p>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <DatePickerBtn value={date} onChange={e => setDate(e.target.value)} themeColor={themeColor} />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Nopol</p>
                    <input
                      type="text"
                      placeholder="D 1234 AB"
                      value={nopol}
                      onChange={e => setNopol(e.target.value.toUpperCase())}
                      className={inputCls + ' uppercase'}
                      style={{ caretColor: accent }}
                    />
                  </div>
                </div>

                {!isOutbound && (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Supplier Asal</p>
                      <input
                        type="text"
                        placeholder="Nama Vendor..."
                        value={supplier}
                        onChange={e => setSupplier(e.target.value.toUpperCase())}
                        disabled={cart.length > 0}
                        className={inputCls + ' uppercase disabled:opacity-50'}
                        style={{ caretColor: accent }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Customer Origin</p>
                      <CustomSelect themeColor={themeColor} value={selectedCustomer} options={CUSTOMERS} placeholder="Pilih Customer..." disabled={cart.length > 0} onChange={v => setSelectedCustomer(v)} />
                    </div>
                  </div>
                )}
              </div>

              {/* CARD: Tambah Barang */}
              <div className="card-2 rounded-3xl p-5 shadow-sm border" style={{ background: accentSoft, borderColor: 'transparent' }}>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accent }}>
                  {isOutbound ? 'Detail Pengiriman' : 'Tambah Barang'}
                </p>

                <div className="space-y-3">
                  {isOutbound && (
                    <>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Resto Tujuan</p>
                        <input type="text" value={resto} onChange={e => setResto(e.target.value)} placeholder="Contoh: Gacoan Dago" className={inputCls} style={{ caretColor: accent }} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Customer / Prinsipal</p>
                        <CustomSelect themeColor={themeColor} value={selectedCustomer} options={CUSTOMERS} placeholder="Pilih Prinsipal..." onChange={v => setSelectedCustomer(v)} />
                      </div>
                    </>
                  )}

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Nama Item</p>
                    <CustomSelect themeColor={themeColor} value={selectedItem} options={itemOptions} placeholder="Pilih Barang..." disabled={!isOutbound && !selectedCustomer} onChange={v => handleItemSelect(v)} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">SKU</p>
                      <input type="text" value={sku} readOnly className="w-full bg-black/5 border-2 border-transparent rounded-2xl px-4 py-4 text-sm font-mono text-gray-400 outline-none" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">QTY (CTN)</p>
                      <input type="number" value={qty} onChange={e => setQty(e.target.value)} placeholder="0" className={inputCls} style={{ caretColor: accent }} />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Expired Date</p>
                    <DatePickerBtn
                      value={expDate}
                      onChange={e => setExpDate(e.target.value)}
                      themeColor={themeColor}
                      placeholder="Pilih Exp. Date"
                      label="Expired Date"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="press-scale w-full py-4 rounded-2xl font-black text-sm text-white shadow-md transition-all"
                    style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
                  >
                    + Tambah ke Keranjang
                  </button>
                </div>
              </div>

              {/* KERANJANG ITEMS */}
              {cart.length > 0 && (
                <div className="card-3 bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Keranjang ({cart.length})</p>
                  <div className="space-y-2">
                    {cart.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100 animate-slide-up">
                        <div className="flex-1 min-w-0">
                          {isOutbound && <span className="text-xs font-black uppercase block truncate mb-0.5" style={{ color: accent }}>📍 {c.resto}</span>}
                          <p className="font-bold text-sm text-gray-800 truncate">{c.item}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            <span className="font-black" style={{ color: accent }}>{c.qty} CTN</span>
                            {c.expDate && <span> · Exp: {formatDisplayDate(c.expDate)}</span>}
                          </p>
                        </div>
                        <button type="button" onClick={() => handleRemoveFromCart(i)} className="press-scale w-8 h-8 bg-red-50 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CARD: Foto */}
              <div className="card-3 bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                  {isOutbound ? 'Foto Muatan' : 'Foto Kendaraan'} <span className="text-red-500">*</span>
                </p>
                {mainPhoto ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-md">
                    <img src={mainPhoto} alt="main" className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
                    <button type="button" onClick={() => setMainPhoto(null)} className="press-scale absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    <span className="absolute bottom-3 left-3 text-white text-xs font-bold">✅ Foto tersimpan</span>
                  </div>
                ) : (
                  <button type="button" onClick={() => triggerCamera(mainPhotoRef)}
                    className="press-scale w-full h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all"
                    style={{ borderColor: accent, background: accentSoft }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accent }}>
                      <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-bold" style={{ color: accent }}>Ambil Foto</span>
                  </button>
                )}
                <input type="file" accept="image/*" capture="environment" ref={mainPhotoRef} onChange={e => handlePhotoCapture(e,'main')} className="hidden" />
              </div>

              <div className="card-4 bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                  {isOutbound ? 'Foto Segel' : 'Bad Stock'} <span className="text-gray-300 font-medium normal-case">(Opsional)</span>
                </p>
                {defectPhoto ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-md">
                    <img src={defectPhoto} alt="defect" className="w-full h-40 object-cover" />
                    <button type="button" onClick={() => setDefectPhoto(null)} className="press-scale absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => triggerCamera(defectPhotoRef)}
                    className="press-scale w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center gap-2 text-gray-400 font-bold text-sm transition-all hover:border-gray-300">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                    Tambah Foto
                  </button>
                )}
                <input type="file" accept="image/*" capture="environment" ref={defectPhotoRef} onChange={e => handlePhotoCapture(e,'defect')} className="hidden" />
              </div>

              {/* KETERANGAN */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Keterangan</p>
                <textarea
                  value={keterangan}
                  onChange={e => setKeterangan(e.target.value)}
                  placeholder="Catatan tambahan (opsional)..."
                  rows={3}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 outline-none resize-none transition-all"
                  style={{ caretColor: accent }}
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isLoading}
                className="press-scale w-full py-5 rounded-3xl font-black text-white text-base shadow-xl transition-all disabled:opacity-70"
                style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin-custom inline-block"/>
                    Memproses...
                  </span>
                ) : `Submit Data (${cart.length} Item) →`}
              </button>
              <div className="h-2" />
            </form>

          ) : (
            // ── TAB HISTORY ──
            <div className="space-y-3 animate-fade-in">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari nopol, resto, customer..."
                  value={searchHistory}
                  onChange={e => setSearchHistory(e.target.value)}
                  className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold outline-none shadow-sm"
                  style={{ caretColor: accent }}
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                </svg>
              </div>

              {isLoadingHistory ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-10 h-10 border-4 border-gray-100 rounded-full animate-spin-custom" style={{ borderTopColor: accent }}/>
                  <p className="text-sm text-gray-400 font-semibold">Memuat data...</p>
                </div>
              ) : historyError ? (
                <div className="text-center py-16">
                  <p className="text-4xl mb-3">📡</p>
                  <p className="text-sm text-gray-400 font-semibold">{historyError}</p>
                  <button onClick={fetchHistory} className="press-scale mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: accent }}>Coba Lagi</button>
                </div>
              ) : filteredHistory.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="text-sm text-gray-400 font-semibold">Belum ada data</p>
                </div>
              ) : filteredHistory.map((g, i) => (
                <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50 animate-slide-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">{g.timestamp}</p>
                      <h4 className="font-black text-lg text-gray-900 mt-0.5">{g.nopol}</h4>
                      {!isOutbound && g.supplier && (
                        <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-lg mt-1 inline-block">Dari: {g.supplier}</span>
                      )}
                    </div>
                    <button onClick={() => handleShareWA(g)}
                      className="press-scale w-10 h-10 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </button>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-gray-100">
                    {g.items.map((it, j) => (
                      <div key={j} className="flex justify-between items-center px-4 py-3 border-b border-gray-50 last:border-0 bg-gray-50/50">
                        <div>
                          {it.resto && <p className="text-xs font-black uppercase mb-0.5" style={{ color: accent }}>📍 {it.resto}</p>}
                          <p className="text-xs font-bold text-gray-800">{it.item}</p>
                        </div>
                        <span className="text-xs font-black px-2.5 py-1 rounded-xl ml-2" style={{ color: accent, background: accentSoft }}>{it.qty} CTN</span>
                      </div>
                    ))}
                  </div>

                  {(g.mainPhotoUrl || g.defectPhotoUrl) && (
                    <div className="mt-3 flex gap-2">
                      {g.mainPhotoUrl && (
                        <button onClick={() => setPreviewImage({ url: getDriveDirectUrl(g.mainPhotoUrl) })}
                          className="press-scale flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
                          style={{ color: accent, background: accentSoft }}>
                          📷 Foto Utama
                        </button>
                      )}
                      {g.defectPhotoUrl && (
                        <button onClick={() => setPreviewImage({ url: getDriveDirectUrl(g.defectPhotoUrl) })}
                          className="press-scale flex-1 py-2.5 rounded-xl text-xs font-bold bg-orange-50 text-orange-500">
                          ⚠️ Bad Stock
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="h-2"/>
            </div>
          )}
        </div>

        {/* ── BOTTOM NAVIGATION (slim, GoPay style) ── */}
        <div className="flex-shrink-0 px-3 py-2" style={{ background: '#fff', borderTop: '1px solid #f3f4f6' }}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('form')}
              className="nav-pill flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl font-black text-sm press-scale"
              style={{
                background: activeTab === 'form' ? `linear-gradient(135deg, ${gradFrom}, ${gradTo})` : 'transparent',
                color: activeTab === 'form' ? '#fff' : '#9ca3af',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span className="text-xs">Form Input</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className="nav-pill flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl font-black text-sm press-scale"
              style={{
                background: activeTab === 'history' ? `linear-gradient(135deg, ${gradFrom}, ${gradTo})` : 'transparent',
                color: activeTab === 'history' ? '#fff' : '#9ca3af',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-xs">Riwayat</span>
            </button>
          </div>
        </div>

        {/* ── MODAL LOGOUT ── */}
        {showLogoutConfirm && (
          <div className="absolute inset-0 z-50 flex items-end justify-center animate-fade-in" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
            <div className="bg-white rounded-t-3xl p-7 w-full animate-slide-up">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6"/>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: accentSoft }}>
                <svg width="24" height="24" fill="none" stroke={accent} strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </div>
              <h3 className="text-xl font-black text-gray-900 text-center mb-2">Ganti Portal?</h3>
              <p className="text-sm text-gray-400 text-center mb-6">Keluar dari {title} dan pilih ulang modul operasional.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="press-scale flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-sm">
                  Batal
                </button>
                <button onClick={handleLogout} className="press-scale flex-1 py-4 text-white rounded-2xl font-bold text-sm shadow-lg" style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}>
                  Keluar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL PREVIEW FOTO ── */}
        {previewImage && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center animate-fade-in" style={{ background: 'rgba(0,0,0,0.95)' }}>
            <button onClick={() => setPreviewImage(null)} className="press-scale absolute top-8 right-6 w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-white">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <img src={previewImage.url} alt="Preview" className="w-full max-w-md object-contain rounded-2xl px-4" />
          </div>
        )}

      </div>
    </div>
  );
}