/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

// --- DATA MASTER ASLI ---
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
  { customer: "BENFARM BANDUNG FRESH", item: "DEBEZ MAKARONI PEDAS GORENG 300GR", sku: "BEN-00000126" }
];

const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const getDriveDirectUrl = (driveUrl) => {
  if (!driveUrl) return '';
  const match = driveUrl.match(/\/d\/(.+?)\//);
  if (match && match) return `https://drive.google.com/thumbnail?id=${match}&sz=w1000`;
  return driveUrl;
};

// --- KOMPONEN DROPDOWN CUSTOM (SUPER APP STYLE) ---
const CustomSelect = ({ value, onChange, options, placeholder, disabled, role }) => {
  const = useState(false);
  const = useState(value);
  const wrapperRef = useRef(null);

  const focusRing = role === 'outbound' ? 'focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200' : 'focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200';
  const iconColor = disabled ? 'text-gray-300' : 'text-gray-400';
  const hoverBg = role === 'outbound' ? 'hover:bg-blue-50' : 'hover:bg-red-50';

  useEffect(() => {
    setSearch(value);
  },);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch(value);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },);

  const filtered = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full bg-gray-50 border-2 border-transparent rounded-xl px-4 py-3.5 text-sm font-bold text-gray-800 outline-none transition-all duration-200 ${focusRing} disabled:bg-gray-100 disabled:text-gray-400 pr-10`}
        />
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className={`w-4 h-4 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {isOpen && !disabled && (
        <ul className="absolute z-50 w-full bg-white border border-gray-100 rounded-xl shadow-xl max-h-56 overflow-y-auto mt-2 top-full custom-scrollbar py-2 animate-fade-in origin-top">
          {filtered.length > 0 ? filtered.map((opt, idx) => (
            <li
              key={idx}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`px-4 py-3 ${hoverBg} cursor-pointer text-sm font-bold text-gray-700 transition-colors border-b border-gray-50 last:border-0`}
            >
              {opt}
            </li>
          )) : (
            <li className="px-4 py-3 text-sm text-gray-400 italic text-center">Data tidak ditemukan</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default function App() {

  useEffect(() => {
    let meta = document.querySelector("meta");
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
  }, []);

  const = useState(null);
  const = useState(false);
  const = useState('');
  const = useState(false);
  const = useState('form');
  const = useState(false);
  const = useState(false);
  const = useState(null);

  const = useState(getTodayDate());
  const = useState('');
  const = useState('');
  const = useState('');
  const = useState(null);
  const = useState(null);

  const = useState('');
  const = useState('');
  const = useState('');
  const = useState('');
  const = useState('');
  const = useState('');
  const = useState([]);

  const = useState([]);
  const = useState(false);
  const = useState('');
  const = useState('');
  const = useState(null);

  const mainPhotoInputRef = useRef(null);
  const defectPhotoInputRef = useRef(null);

  const filteredItems = ITEMS.filter(i => i.customer === selectedCustomer);
  const itemOptions = filteredItems.map(i => i.item);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPin = role === 'outbound' ? '4321' : '1234';
    if (pinInput === correctPin) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogoutConfirm(false);
    setRole(null);
    setDate(getTodayDate());
    setNopol('');
    setSupplier('');
    setSelectedCustomer('');
    setResto('');
    setSelectedItem('');
    setSku('');
    setQty('');
    setExpDate('');
    setKeterangan('');
    setMainPhoto(null);
    setDefectPhoto(null);
    setCart([]);
    setSearchHistory('');
  };

  const handleItemSelect = (itemName) => {
    setSelectedItem(itemName);
    const foundItem = ITEMS.find(i => i.item === itemName);
    if (foundItem) {
      setSku(foundItem.sku);
    } else {
      setSku('');
    }
  };

  const triggerCamera = (inputRef) => {
    if (!nopol || nopol.trim() === '') {
      showToast('Isi NOPOL terlebih dahulu!', 'error');
      return;
    }
    inputRef.current.click();
  };

  const handlePhotoCapture = (e, type) => {
    const file = e.target.files;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1024;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const barHeight = 100;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, height - barHeight, width, barHeight);

        ctx.textAlign = 'left';
        ctx.fillStyle = role === 'outbound' ? '#60a5fa' : '#f87171';
        ctx.font = 'bold 22px Arial';

        let titleStr = '';
        if (role === 'outbound') {
          titleStr = type === 'main' ? 'FOTO MUAT TRUK' : 'FOTO SEGEL';
        } else {
          titleStr = type === 'main' ? 'FOTO MOBIL KOSONG' : 'FOTO BAD STOCK';
        }

        ctx.fillText(`B-LOG ${role.toUpperCase()} - ${titleStr}`, 20, height - 60);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 34px Arial';
        ctx.fillText(nopol.toUpperCase(), 20, height - 20);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#dddddd';
        ctx.font = 'bold 20px monospace';
        const dateObj = new Date();
        const timestampStr = `${dateObj.toLocaleDateString('id-ID')} ${dateObj.toLocaleTimeString('id-ID')}`;
        ctx.fillText(timestampStr, width - 20, height - 25);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
        if (type === 'main') setMainPhoto(compressedBase64);
        if (type === 'defect') setDefectPhoto(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (role === 'outbound') {
      if (!resto || !selectedCustomer || !selectedItem || !qty || !expDate) {
        showToast('Lengkapi semua data barang!', 'error');
        return;
      }
      setCart();
    } else {
      if (!selectedItem || !qty || !expDate) {
        showToast('Lengkapi data barang!', 'error');
        return;
      }
      setCart();
    }

    setSelectedItem('');
    setSku('');
    setQty('');
    setExpDate('');
    showToast('Dimasukkan ke keranjang 🛒', 'success');
  };

  const handleRemoveFromCart = (index) => {
    const newCart =;
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isReady = role === 'outbound'
      ? (date && nopol && cart.length > 0 && mainPhoto)
      : (date && nopol && supplier && selectedCustomer && cart.length > 0 && mainPhoto);

    if (!isReady) {
      showToast('Lengkapi data utama, keranjang, & foto!', 'error');
      return;
    }

    setIsLoading(true);
    const payload = {
      type: role,
      date,
      nopol,
      supplier: role === 'inbound' ? supplier : '',
      customer: role === 'inbound' ? selectedCustomer : '',
      keterangan,
      mainPhoto,
      defectPhoto,
      items: cart
    };

    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxeoOK8BxfrT2Guk3GGh70v15IITYZYQCOA4K_ek3c8n3BkQ080z4Buqyp0DT9prNi6Mw/exec';
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      const result = await response.json();

      if (result.status === 'success') {
        showToast(`Truk berhasil diproses! 🚀`, 'success');
        setDate(getTodayDate());
        setNopol('');
        setSupplier('');
        setSelectedCustomer('');
        setResto('');
        setKeterangan('');
        setMainPhoto(null);
        setDefectPhoto(null);
        setCart([]);
      } else {
        showToast('Gagal: ' + result.message, 'error');
      }
    } catch (error) {
      showToast('Koneksi terputus.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    setHistoryError('');
    try {
      const scriptUrl = `https://script.google.com/macros/s/AKfycbxeoOK8BxfrT2Guk3GGh70v15IITYZYQCOA4K_ek3c8n3BkQ080z4Buqyp0DT9prNi6Mw/exec?action=getHistory&type=${role}`;
      const response = await fetch(scriptUrl);
      const result = await response.json();

      if (result.status === 'success') {
        const grouped = [];
        const map = new Map();

        result.data.forEach(row => {
          const key = row.timestamp + "_" + row.nopol;
          if (!map.has(key)) {
            map.set(key, {
              timestamp: row.timestamp,
              date: row.date,
              nopol: row.nopol,
              supplier: row.supplier,
              customer: row.customer,
              keterangan: row.keterangan,
              mainPhotoUrl: row.mainPhotoUrl,
              defectPhotoUrl: row.defectPhotoUrl,
              items: []
            });
            grouped.push(map.get(key));
          }
          if (role === 'outbound') {
            map.get(key).items.push({ resto: row.resto, customer: row.customer, item: row.item, sku: row.sku, qty: row.qty });
          } else {
            map.get(key).items.push({ item: row.item, sku: row.sku, qty: row.qty });
          }
        });
        setHistoryData(grouped);
      } else {
        setHistoryError('Gagal tarik data.');
      }
    } catch (error) {
      setHistoryError('Sinyal lemah.');
    } finally {
      setIsLoadingHistory(false);
    }
  },);

  useEffect(() => {
    if (activeTab === 'history' && isAuthenticated) {
      fetchHistory();
    }
  },);

  const handleShareWA = (group) => {
    let text = `*${role.toUpperCase()} REPORT - B-LOG*\n\n*Waktu:* ${group.timestamp}\n*Nopol:* ${group.nopol}\n`;
    if (role === 'inbound') {
      text += `*Supplier Asal:* ${group.supplier || '-'}\n*Customer Origin:* ${group.customer}\n\n*DAFTAR BARANG MASUK:*\n`;
      group.items.forEach((it, idx) => {
        text += `${idx + 1}. ${it.item} - *${it.qty} CTN*\n`;
      });
    } else {
      text += `\n*PENGIRIMAN MULTI-DROP:*\n`;
      const restoMap = {};
      group.items.forEach(it => {
        if (!restoMap) {
          restoMap = [];
        }
        restoMap.push(it);
      });
      Object.keys(restoMap).forEach(restoName => {
        text += `\n📍 *${restoName}*\n`;
        restoMap.forEach(it => {
          text += `- ${it.item} (*${it.qty} CTN*)\n`;
        });
      });
    }
    text += `\n*Ket:* ${group.keterangan || '-'}\n\n*Foto Utama:* ${group.mainPhotoUrl ? getDriveDirectUrl(group.mainPhotoUrl) : '-'}\n*Foto Pendukung:* ${group.defectPhotoUrl ? getDriveDirectUrl(group.defectPhotoUrl) : '-'}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredHistoryData = historyData.filter(group => {
    const term = searchHistory.toLowerCase();
    if (role === 'inbound') {
      return group.nopol.toLowerCase().includes(term) || group.customer.toLowerCase().includes(term) || (group.supplier && group.supplier.toLowerCase().includes(term));
    } else {
      return group.nopol.toLowerCase().includes(term) || group.items.some(it => it.resto && it.resto.toLowerCase().includes(term)) || (group.customer && group.customer.toLowerCase().includes(term));
    }
  });

  // TEMA DINAMIS SUPER APP
  const isOutbound = role === 'outbound';
  const theme = isOutbound
    ? { gradient: 'from-blue-600 to-blue-800', bgButton: 'bg-blue-600', text: 'text-blue-600', bgSoft: 'bg-blue-50', ring: 'focus:border-blue-500 focus:bg-white', shadow: 'shadow-blue-500/30', title: 'Outbound Hub', icon: '🚚' }
    : { gradient: 'from-red-600 to-red-800', bgButton: 'bg-red-600', text: 'text-red-600', bgSoft: 'bg-red-50', ring: 'focus:border-red-500 focus:bg-white', shadow: 'shadow-red-500/30', title: 'Inbound Hub', icon: '📦' };

  // =========================================================
  // 1. RENDER: HALAMAN PORTAL
  // =========================================================
  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center font-sans p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center animate-fade-in">
          <h1 className="text-3xl font-black text-gray-800 mb-2">B-Log App</h1>
          <p className="text-gray-500 text-sm mb-10 font-medium">Pilih modul operasional</p>

          <div className="space-y-4">
            <button onClick={() => setRole('inbound')} className="w-full relative overflow-hidden bg-white border border-gray-200 hover:border-red-400 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg group flex items-center gap-4">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">📦</div>
              <div className="text-left"><h3 className="font-black text-gray-800 text-lg group-hover:text-red-600 transition-colors">Inbound</h3><p className="text-xs text-gray-400 font-medium">Penerimaan Barang</p></div>
            </button>
            <button onClick={() => setRole('outbound')} className="w-full relative overflow-hidden bg-white border border-gray-200 hover:border-blue-400 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg group flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🚚</div>
              <div className="text-left"><h3 className="font-black text-gray-800 text-lg group-hover:text-blue-600 transition-colors">Outbound</h3><p className="text-xs text-gray-400 font-medium">Pengiriman Multi-Drop</p></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // 2. RENDER: HALAMAN LOGIN PIN
  // =========================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center font-sans md:p-4">
        <div className="w-full max-w-md bg-white md:rounded-3xl shadow-2xl text-center relative overflow-hidden h-screen md:h- flex flex-col animate-fade-in">
          {/* Header Melengkung OVO/DANA Style */}
          <div className={`w-full h-64 bg-gradient-to-b ${theme.gradient} rounded-b-3xl relative flex flex-col items-center justify-center`}>
            <button onClick={() => setRole(null)} className="absolute top-6 left-6 text-white/80 hover:text-white z-20 flex items-center gap-1 text-sm font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg> Batal
            </button>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl mb-3 shadow-inner">{theme.icon}</div>
            <h1 className="text-2xl font-black text-white tracking-wide">{theme.title}</h1>
          </div>

          <form onSubmit={handleLogin} className="flex-1 flex flex-col justify-center px-8 -mt-10 relative z-10">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-50">
              <p className="text-sm text-gray-500 font-bold mb-6 uppercase tracking-wider">Masukkan PIN Anda</p>
              <input
                type="password"
                pattern="*"
                inputMode="numeric"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className={`w-full text-center tracking- font-black text-3xl py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white outline-none transition-all duration-300 ${pinError ? 'border-red-400 text-red-600 animate-pulse' : theme.ring}`}
                placeholder="••••"
                maxLength={4}
              />
              {pinError && <p className="text-red-500 text-xs font-bold mt-4">PIN Salah!</p>}
              <button type="submit" className={`w-full mt-6 ${theme.bgButton} text-white font-black text-lg py-4 rounded-2xl shadow-lg ${theme.shadow} active:scale-95 transition-all`}>
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================
  // 3. RENDER: HALAMAN APLIKASI UTAMA (SUPER APP UI)
  // =========================================================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans md:p-4 relative">
      <div className="w-full max-w-md bg-gray-50 md:rounded-3xl shadow-2xl overflow-hidden relative h-screen md:h- flex flex-col animate-fade-in">

        {/* TOAST */}
        {toast && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-">
            <div className={`p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-white ${toast.type === 'success' ? 'bg-gray-900' : 'bg-red-600'}`}>
              <p className="text-sm font-bold tracking-wide">{toast.msg}</p>
            </div>
          </div>
        )}

        {/* HEADER DANA/GOPAY STYLE */}
        <div className={`bg-gradient-to-r ${theme.gradient} px-5 pt-12 pb-6 rounded-b-3xl shadow-md relative z-20 overflow-hidden`}>
          <div className="flex justify-between items-center text-white relative z-10">
            <div>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-0.5">B-Log Operasional</p>
              <h1 className="text-2xl font-black">{theme.title}</h1>
            </div>
            <button onClick={() => setShowLogoutConfirm(true)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 active:scale-90 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>

        {/* KONTEN */}
        <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24 custom-scrollbar relative z-10">
          {activeTab === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* CARD 1: INFO TRUK */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Tanggal</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`w-full bg-gray-50 border-2 border-transparent rounded-xl px-3 py-3.5 text-sm font-bold text-gray-800 outline-none transition-all appearance-none min-h- ${theme.ring} focus:bg-white`} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Nopol</label>
                    <input type="text" placeholder="D 1234 ABC" value={nopol} onChange={(e) => setNopol(e.target.value.toUpperCase())} className={`w-full bg-gray-50 border-2 border-transparent rounded-xl px-3 py-3.5 text-sm font-bold text-gray-800 outline-none uppercase transition-all min-h- ${theme.ring} focus:bg-white`} />
                  </div>
                </div>

                {!isOutbound && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Supplier Asal</label>
                      <input type="text" placeholder="Ketik Nama Vendor..." value={supplier} onChange={(e) => setSupplier(e.target.value.toUpperCase())} disabled={cart.length > 0} className={`w-full bg-gray-50 border-2 border-transparent rounded-xl px-4 py-3.5 text-sm font-bold text-gray-800 outline-none uppercase transition-all min-h- ${theme.ring} focus:bg-white disabled:opacity-60`} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Customer Origin</label>
                      <CustomSelect role={role} value={selectedCustomer} options={CUSTOMERS} placeholder="Pilih Customer..." disabled={cart.length > 0} onChange={(v) => setSelectedCustomer(v)} />
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 2: KERANJANG */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className={`space-y-4 p-4 rounded-2xl ${theme.bgSoft}`}>
                  {isOutbound && (
                    <>
                      <div>
                        <label className={`block text-xs font-black ${theme.text} uppercase tracking-wide mb-1.5`}>Resto Tujuan</label>
                        <input type="text" value={resto} onChange={(e) => setResto(e.target.value)} placeholder="Contoh: Gacoan Dago" className={`w-full bg-white border-2 border-transparent rounded-xl px-4 py-3.5 text-sm font-bold outline-none transition-all min-h- ${theme.ring}`} />
                      </div>
                      <div>
                        <label className={`block text-xs font-black ${theme.text} uppercase tracking-wide mb-1.5`}>Customer</label>
                        <CustomSelect role={role} value={selectedCustomer} options={CUSTOMERS} placeholder="Pilih Prinsipal..." onChange={(v) => setSelectedCustomer(v)} />
                      </div>
                    </>
                  )}

                  <div>
                    <label className={`block text-xs font-black ${theme.text} uppercase tracking-wide mb-1.5`}>Nama Item</label>
                    <CustomSelect role={role} value={selectedItem} options={itemOptions} placeholder="Pilih Barang..." disabled={!isOutbound && !selectedCustomer} onChange={(v) => handleItemSelect(v)} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-xs font-black ${theme.text} uppercase tracking-wide mb-1.5`}>SKU</label>
                      <input type="text" value={sku} readOnly className="w-full bg-black/5 border-2 border-transparent rounded-xl px-3 py-3.5 text-sm font-mono text-gray-500 outline-none min-h-" />
                    </div>
                    <div>
                      <label className={`block text-xs font-black ${theme.text} uppercase tracking-wide mb-1.5`}>QTY (CTN)</label>
                      <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" className={`w-full bg-white border-2 border-transparent rounded-xl px-3 py-3.5 text-sm font-bold text-gray-800 outline-none transition-all min-h- ${theme.ring}`} />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-black ${theme.text} uppercase tracking-wide mb-1.5`}>Expired Date</label>
                    <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className={`w-full bg-white border-2 border-transparent rounded-xl px-3 py-3.5 text-sm font-bold text-gray-800 outline-none transition-all min-h- appearance-none ${theme.ring}`} />
                  </div>

                  <button type="button" onClick={handleAddToCart} className={`w-full mt-2 bg-white ${theme.text} border-2 border-transparent hover:border-current font-black text-sm py-3.5 rounded-xl transition-all shadow-sm active:scale-95`}>
                    + Tambah
                  </button>
                </div>

                {cart.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {cart.map((c, i) => (
                      <div key={i} className="flex justify-between items-center bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                        <div className="flex-1">
                          {isOutbound && <span className={`text-xs font-black ${theme.text} block uppercase mb-1`}>📍 {c.resto}</span>}
                          <p className="font-bold text-sm text-gray-800">{c.item}</p>
                          <p className="text-xs text-gray-500 mt-0.5"><span className={`font-black ${theme.text}`}>{c.qty} CTN</span> • Exp: {c.expDate}</p>
                        </div>
                        <button type="button" onClick={() => handleRemoveFromCart(i)} className="bg-red-100 text-red-600 p-2.5 rounded-lg ml-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CARD 3: FOTO */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-sm text-gray-800 mb-3">{isOutbound ? 'Foto Muatan Penuh' : 'Foto Mobil Kosong'} <span className="text-red-500">*</span></h3>
                {mainPhoto ? (
                  <div className="relative rounded-xl overflow-hidden shadow-sm">
                    <img src={mainPhoto} alt="Utama" className="w-full h-36 object-cover" />
                    <button type="button" onClick={() => setMainPhoto(null)} className="absolute top-2 right-2 bg-red-600/90 text-white rounded-full p-2 backdrop-blur-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                  </div>
                ) : (
                  <button type="button" onClick={() => triggerCamera(mainPhotoInputRef)} className={`w-full h-24 bg-gray-50 rounded-xl flex flex-col items-center justify-center font-bold ${theme.text} transition-all active:scale-95`}>
                    <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
                    Ambil Foto
                  </button>
                )}
                <input type="file" accept="image/*" capture="environment" ref={mainPhotoInputRef} onChange={(e) => handlePhotoCapture(e, 'main')} className="hidden" />
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-sm text-gray-800 mb-3">{isOutbound ? 'Foto Segel (Opsional)' : 'Bad Stock (Opsional)'}</h3>
                {defectPhoto ? (
                  <div className="relative rounded-xl overflow-hidden shadow-sm">
                    <img src={defectPhoto} alt="Pendukung" className="w-full h-36 object-cover" />
                    <button type="button" onClick={() => setDefectPhoto(null)} className="absolute top-2 right-2 bg-red-600/90 text-white rounded-full p-2 backdrop-blur-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                  </div>
                ) : (
                  <button type="button" onClick={() => triggerCamera(defectPhotoInputRef)} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl font-bold text-gray-400 flex justify-center items-center gap-2 active:scale-95 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg> Tambah Foto
                  </button>
                )}
                <input type="file" accept="image/*" capture="environment" ref={defectPhotoInputRef} onChange={(e) => handlePhotoCapture(e, 'defect')} className="hidden" />
              </div>

              <button type="submit" disabled={isLoading} className={`w-full ${theme.bgButton} text-white font-black text-base py-4 rounded-xl shadow-lg ${theme.shadow} active:scale-95 transition-all`}>
                {isLoading ? 'Memproses...' : `Submit Data (${cart.length} Item)`}
              </button>
            </form>

          ) : (

            /* TAB HISTORY */
            <div className="space-y-4">
              <div className="relative">
                <input type="text" placeholder="Cari Nopol, Resto..." value={searchHistory} onChange={(e) => setSearchHistory(e.target.value)} className={`w-full bg-white shadow-sm border border-gray-100 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold outline-none ${theme.ring}`} />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>

              {isLoadingHistory ? (
                <div className="flex justify-center py-10"><div className={`animate-spin rounded-full h-8 w-8 border-b-4 ${theme.text}`}></div></div>
              ) : filteredHistoryData.map((g, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-bold text-gray-400 block mb-0.5">{g.timestamp}</span>
                      <h4 className="font-black text-lg text-gray-800">{g.nopol}</h4>
                      {!isOutbound && g.supplier && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold uppercase mt-1 inline-block">Dari: {g.supplier}</span>}
                    </div>
                    <button onClick={() => handleShareWA(g)} className="bg-green-50 text-green-600 p-2.5 rounded-xl flex items-center justify-center"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></button>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">
                    {g.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-gray-200 last:border-0 py-1.5">
                        <div className="flex flex-col">
                          {it.resto && <span className={`text-xs font-black ${theme.text} uppercase`}>📍 {it.resto}</span>}
                          <span className="text-xs font-bold text-gray-800">{it.item}</span>
                        </div>
                        <span className={`text-xs font-black ${theme.text} ${theme.bgSoft} px-2 py-1 rounded`}>{it.qty} CTN</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2">
                    {g.mainPhotoUrl && <button onClick={() => setPreviewImage({ url: getDriveDirectUrl(g.mainPhotoUrl) })} className={`flex-1 ${theme.bgSoft} ${theme.text} text-xs font-bold py-2 rounded-lg`}>📷 Foto 1</button>}
                    {g.defectPhotoUrl && <button onClick={() => setPreviewImage({ url: getDriveDirectUrl(g.defectPhotoUrl) })} className="flex-1 bg-orange-50 text-orange-600 text-xs font-bold py-2 rounded-lg">⚠️ Foto 2</button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DOCKED BOTTOM NAVIGATION (NATIVE APP STYLE) */}
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 pb-safe">
          <div className="flex justify-around items-center px-2 py-2">
            <button onClick={() => setActiveTab('form')} className={`flex flex-col items-center justify-center w-full py-2 ${activeTab === 'form' ? theme.text : 'text-gray-400'} transition-colors`}>
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              <span className="text-xs font-bold">Input Data</span>
            </button>
            <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center justify-center w-full py-2 ${activeTab === 'history' ? theme.text : 'text-gray-400'} transition-colors`}>
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-xs font-bold">Riwayat</span>
            </button>
          </div>
        </div>

        {/* MODAL LOGOUT */}
        {showLogoutConfirm && (
          <div className="absolute inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center">
              <div className={`w-16 h-16 ${theme.bgSoft} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <svg className={`w-8 h-8 ${theme.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">Ganti Portal?</h3>
              <p className="text-sm text-gray-500 mb-6">Keluar dari {theme.title} dan pilih ulang modul.</p>
              <div className="flex gap-4">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">Batal</button>
                <button onClick={handleLogout} className={`flex-1 py-3 ${theme.bgButton} text-white rounded-xl font-bold`}>Keluar</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL PREVIEW FOTO */}
        {previewImage && (
          <div className="absolute inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
            <button onClick={() => setPreviewImage(null)} className="absolute top-8 right-8 text-white bg-white/20 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img src={previewImage.url} alt="Preview" className="w-full max-w-md object-contain rounded-xl" />
          </div>
        )}

      </div>
    </div>
  );
}