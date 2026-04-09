import React, { useState, useEffect, useRef } from 'react';
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

// FUNGSI MENDAPATKAN TANGGAL HARI INI OTOMATIS (FORMAT: YYYY-MM-DD)
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
  if (match && match[1]) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  return driveUrl; 
};

// --- KOMPONEN DROPDOWN CUSTOM ---
const CustomSelect = ({ value, onChange, options, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const wrapperRef = useRef(null);

  useEffect(() => { setSearch(value); }, [value]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch(value); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  const filtered = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }} onFocus={() => setIsOpen(true)} placeholder={placeholder} disabled={disabled} className="w-full bg-red-50/50 border border-red-100 rounded-xl px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 min-h-[50px] disabled:bg-gray-50 disabled:text-gray-400 pr-10 transition-all" />
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className={`w-5 h-5 ${disabled ? 'text-gray-300' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
      {isOpen && !disabled && (
        <ul className="absolute z-50 w-full bg-white border border-gray-100 rounded-xl shadow-2xl max-h-56 overflow-y-auto mt-2 top-full custom-scrollbar py-1">
          {filtered.length > 0 ? filtered.map((opt, idx) => (
            <li key={idx} onClick={() => { onChange(opt); setIsOpen(false); }} className="px-4 py-3 hover:bg-red-50 cursor-pointer text-sm font-medium text-gray-700 transition-colors border-b border-gray-50 last:border-0">{opt}</li>
          )) : <li className="px-4 py-3 text-sm text-gray-400 italic text-center">Data tidak ditemukan</li>}
        </ul>
      )}
    </div>
  );
};

export default function App() {
  
  // ANTI-ZOOM iOS SAFARI
  useEffect(() => {
    let meta = document.querySelector("meta[name='viewport']");
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('form'); 
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null); 

  // KINI TANGGAL OTOMATIS TERISI HARI INI
  const [date, setDate] = useState(getTodayDate());
  const [nopol, setNopol] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [keterangan, setKeterangan] = useState(''); 
  const [mainPhoto, setMainPhoto] = useState(null);
  const [defectPhoto, setDefectPhoto] = useState(null);
  
  const [selectedItem, setSelectedItem] = useState('');
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState('');
  const [expDate, setExpDate] = useState('');

  const [cart, setCart] = useState([]); 
  
  const [historyData, setHistoryData] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [searchHistory, setSearchHistory] = useState('');

  const [previewImage, setPreviewImage] = useState(null); 
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
    if (pinInput === '1234') { 
      setIsAuthenticated(true); setPinError(false); setPinInput('');
    } else { setPinError(true); setPinInput(''); }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); setShowLogoutConfirm(false);
    setDate(getTodayDate()); setNopol(''); setSelectedCustomer(''); 
    setSelectedItem(''); setSku(''); setQty(''); setExpDate(''); setKeterangan('');
    setMainPhoto(null); setDefectPhoto(null); setCart([]); setSearchHistory('');
  };

  const handleItemSelect = (itemName) => {
    setSelectedItem(itemName);
    const foundItem = ITEMS.find(i => i.item === itemName);
    if (foundItem) setSku(foundItem.sku); else setSku('');
  };

  // FITUR: CEK NOPOL SEBELUM BUKA KAMERA
  const triggerCamera = (inputRef) => {
    if (!nopol || nopol.trim() === '') {
      showToast('Mohon isi NOPOL terlebih dahulu untuk Watermark!', 'error');
      return;
    }
    inputRef.current.click();
  };

  // FITUR: WATERMARK PERMANEN (DIBURN-IN KE GAMBAR)
  const handlePhotoCapture = (e, type) => {
    const file = e.target.files[0];
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
        ctx.fillStyle = '#ff4d4d'; 
        ctx.font = 'bold 22px Arial';
        const title = type === 'main' ? 'FOTO MOBIL' : 'FOTO BAD STOCK';
        ctx.fillText(`B-LOG INBOUND - ${title}`, 20, height - 60);

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
    if (!selectedItem || !qty || !expDate) {
      showToast('Pilih Item, isi QTY, dan Expired Date!', 'error');
      return;
    }
    setCart([...cart, { item: selectedItem, sku, qty, expDate }]);
    setSelectedItem(''); setSku(''); setQty(''); setExpDate(''); 
    showToast('Barang ditambahkan ke truk!', 'success');
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !nopol || !selectedCustomer || cart.length === 0 || !mainPhoto) {
      showToast('Data Utama, Minimal 1 Barang di Keranjang & Foto Wajib Diisi!', 'error');
      return;
    }

    setIsLoading(true);
    const payload = { date, nopol, customer: selectedCustomer, keterangan, mainPhoto, defectPhoto, items: cart };

    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxeoOK8BxfrT2Guk3GGh70v15IITYZYQCOA4K_ek3c8n3BkQ080z4Buqyp0DT9prNi6Mw/exec';
      const response = await fetch(scriptUrl, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
      const result = await response.json();

      if (result.status === 'success') {
        showToast('Sukses! Data seluruh barang berhasil disimpan.', 'success');
        // RESET DATE KEMBALI KE TANGGAL HARI INI
        setDate(getTodayDate()); setNopol(''); setSelectedCustomer(''); setKeterangan(''); setMainPhoto(null); setDefectPhoto(null); setCart([]);
      } else {
        showToast('Gagal menyimpan: ' + result.message, 'error');
      }
    } catch (error) {
      showToast('Gagal terhubung ke server. Pastikan internet lancar.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    setHistoryError('');
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxeoOK8BxfrT2Guk3GGh70v15IITYZYQCOA4K_ek3c8n3BkQ080z4Buqyp0DT9prNi6Mw/exec?action=getHistory';
      const response = await fetch(scriptUrl);
      const result = await response.json();
      
      if (result.status === 'success') {
        const grouped = [];
        const map = new Map();

        result.data.forEach(row => {
          const key = row.timestamp + "_" + row.nopol;
          if (!map.has(key)) {
            map.set(key, {
              timestamp: row.timestamp, date: row.date, nopol: row.nopol, customer: row.customer,
              keterangan: row.keterangan, mainPhotoUrl: row.mainPhotoUrl, defectPhotoUrl: row.defectPhotoUrl,
              items: [] 
            });
            grouped.push(map.get(key));
          }
          map.get(key).items.push({ item: row.item, sku: row.sku, qty: row.qty });
        });
        
        setHistoryData(grouped);
      } else setHistoryError('Gagal mengambil data: ' + result.message);
    } catch (error) {
      setHistoryError('Gagal memuat riwayat. Cek koneksi Anda.');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history' && isAuthenticated) fetchHistory();
  }, [activeTab, isAuthenticated]);

  const handleShareWA = (group) => {
    let text = `*INBOUND REPORT - B-LOG*\n\n*Waktu:* ${group.timestamp}\n*Nopol:* ${group.nopol}\n*Customer Origin:* ${group.customer}\n\n*DAFTAR BARANG MASUK:*\n`;
    group.items.forEach((it, idx) => { text += `${idx + 1}. ${it.item} (SKU: ${it.sku}) - *${it.qty} CTN*\n`; });
    text += `\n*Keterangan Reject:* ${group.keterangan || '-'}\n\n*Link Foto Mobil:* ${group.mainPhotoUrl ? getDriveDirectUrl(group.mainPhotoUrl) : '-'}\n*Link Foto Defect:* ${group.defectPhotoUrl ? getDriveDirectUrl(group.defectPhotoUrl) : '-'}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredHistoryData = historyData.filter(group => {
    const term = searchHistory.toLowerCase();
    return group.nopol.toLowerCase().includes(term) || group.customer.toLowerCase().includes(term);
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-200 flex justify-center items-center font-sans text-gray-800 md:p-4">
        <div className="w-full max-w-md bg-white md:rounded-[40px] shadow-2xl p-8 text-center relative overflow-hidden h-screen md:h-[800px] flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-red-600 to-red-700 rounded-b-[40px]"></div>
          <div className="relative z-10 mt-6 mb-8">
            <div className="w-20 h-20 bg-white rounded-full mx-auto shadow-lg flex items-center justify-center border-4 border-red-50 mb-4">
              <svg className="w-10 h-10 text-red-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h1 className="text-2xl font-black text-gray-800">Inbound Hub</h1>
            <p className="text-sm text-gray-500 font-medium">B-Log Cold Storage</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-2 tracking-widest uppercase">Masukkan PIN Akses</label>
              <input type="password" pattern="[0-9]*" inputMode="numeric" value={pinInput} onChange={(e) => setPinInput(e.target.value)} className={`w-full text-center tracking-[0.5em] font-bold text-2xl py-4 rounded-2xl border-2 focus:outline-none transition-all ${pinError ? 'bg-red-50 border-red-400 text-red-600' : 'bg-gray-50 border-gray-100 focus:border-red-500 focus:bg-white text-gray-800'}`} placeholder="••••••" maxLength={6}/>
              {pinError && <p className="text-red-500 text-xs font-bold mt-2 animate-bounce">PIN tidak valid!</p>}
            </div>
            <button type="submit" className="w-full bg-red-600 text-white font-black text-lg py-4 rounded-2xl shadow-xl shadow-red-600/30 active:scale-[0.98] transition-transform">Masuk Aplikasi</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center font-sans text-gray-800 md:p-4 relative">
      <div className="w-full max-w-md bg-gray-50 md:rounded-[40px] shadow-2xl overflow-hidden relative h-screen md:h-[800px] flex flex-col">
        
        {toast && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-[100] animate-fade-in">
            <div className={`p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-white ${toast.type === 'success' ? 'bg-gray-900 border border-gray-700' : 'bg-red-600'}`}>
              {toast.type === 'success' ? (
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0"><svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></div>
              )}
              <p className="text-sm font-bold leading-tight">{toast.msg}</p>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-b from-red-600 to-red-700 px-6 pt-10 pb-6 rounded-b-[30px] shadow-sm relative z-20 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-red-200 text-[10px] font-bold tracking-wider mb-1 flex items-center gap-1 uppercase"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> B-Log Cold</p>
              <h1 className="text-2xl font-black text-white tracking-tight">Inbound Hub</h1>
            </div>
            <button onClick={() => setShowLogoutConfirm(true)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition shadow-sm border border-white/10"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-24 custom-scrollbar relative z-10">
          {activeTab === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-red-50 relative z-30">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 tracking-wider uppercase">Tanggal</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-red-50/50 border border-red-100 rounded-xl px-3 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 block min-h-[46px] appearance-none"/>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 tracking-wider uppercase">Nopol</label>
                    <input type="text" placeholder="D 1234 ABC" value={nopol} onChange={(e) => setNopol(e.target.value.toUpperCase())} className="w-full bg-red-50/50 border border-red-100 rounded-xl px-3 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 uppercase block min-h-[46px]"/>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1 tracking-wider uppercase">Customer Origin</label>
                  <CustomSelect value={selectedCustomer} options={CUSTOMERS} placeholder="Ketik / Pilih Customer..." disabled={cart.length > 0} onChange={(val) => { setSelectedCustomer(val); setSelectedItem(''); setSku(''); }}/>
                  {cart.length > 0 && <p className="text-[10px] text-orange-500 mt-1 italic">*Kosongkan keranjang jika ingin mengganti customer.</p>}
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-red-50 relative z-20 overflow-visible">
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div>
                    <h3 className="font-bold text-gray-800 text-sm">Keranjang Truk</h3>
                  </div>
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg">{cart.length} Item</span>
                </div>

                <div className="space-y-4 relative z-20 p-4 border-2 border-dashed border-red-100 rounded-xl bg-gray-50/50">
                  <div>
                    <label className="block text-[10px] font-bold text-red-400 mb-1 tracking-wider uppercase">Nama Item</label>
                    <CustomSelect value={selectedItem} options={itemOptions} placeholder={selectedCustomer ? "Pilih Item..." : "Pilih Customer Dulu"} disabled={!selectedCustomer} onChange={handleItemSelect}/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-red-400 mb-1 tracking-wider uppercase">SKU</label>
                      <input type="text" value={sku} readOnly placeholder="Otomatis" className="w-full bg-red-50 border border-transparent rounded-xl px-3 py-3 text-base font-mono text-gray-500 block min-h-[46px]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-red-400 mb-1 tracking-wider uppercase">QTY (CTN)</label>
                      <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" className="w-full bg-white border border-red-100 rounded-xl px-3 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 font-bold block min-h-[46px]"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-red-400 mb-1 tracking-wider uppercase">Expired Date</label>
                    <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="w-full bg-white border border-red-100 rounded-xl px-3 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 block min-h-[46px] appearance-none"/>
                  </div>
                  
                  <button type="button" onClick={handleAddToCart} className="w-full mt-2 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold text-sm py-3 rounded-xl active:scale-95 transition-transform flex justify-center items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg> Tambah ke Truk
                  </button>
                </div>

                {cart.length > 0 && (
                  <div className="mt-4 border-t border-gray-100 pt-4 space-y-2">
                    {cart.map((c, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-xl">
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-sm leading-tight">{c.item}</p>
                          <p className="text-xs text-gray-500 mt-1"><span className="font-bold text-red-600">{c.qty} CTN</span> • Exp: {c.expDate}</p>
                        </div>
                        <button type="button" onClick={() => handleRemoveFromCart(idx)} className="p-2 text-red-400 hover:text-red-600 bg-red-50 rounded-lg ml-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-red-50 relative z-10">
                <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Foto Mobil <span className="text-red-500">*</span>
                </h3>
                <input type="file" accept="image/*" capture="environment" ref={mainPhotoInputRef} onChange={(e) => handlePhotoCapture(e, 'main')} className="hidden" />
                {mainPhoto ? (
                  <div className="relative rounded-xl overflow-hidden group">
                    <img src={mainPhoto} alt="Mobil" className="w-full h-32 object-cover" />
                    <button type="button" onClick={() => setMainPhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-90"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                  </div>
                ) : (
                  <button type="button" onClick={() => triggerCamera(mainPhotoInputRef)} className="w-full h-24 border-2 border-dashed border-red-200 rounded-xl flex flex-col items-center justify-center text-red-400 hover:bg-red-50/50 transition"><svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg><span className="text-xs font-bold">Ketuk untuk Foto</span></button>
                )}
              </div>

              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-red-50 relative z-10">
                <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  Bad Stock (Opsional)
                </h3>
                <input type="file" accept="image/*" capture="environment" ref={defectPhotoInputRef} onChange={(e) => handlePhotoCapture(e, 'defect')} className="hidden" />
                {defectPhoto ? (
                  <div className="relative rounded-xl overflow-hidden group">
                    <img src={defectPhoto} alt="Cacat" className="w-full h-32 object-cover" />
                    <button type="button" onClick={() => setDefectPhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-90"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                  </div>
                ) : (
                  <button type="button" onClick={() => triggerCamera(defectPhotoInputRef)} className="w-full py-3 border border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 transition text-xs font-medium"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg> Tambah Foto Cacat</button>
                )}
              </div>

              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-red-50 relative z-10 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  <h3 className="font-bold text-gray-800 text-sm">Keterangan (Opsional)</h3>
                </div>
                <textarea value={keterangan} onChange={(e) => setKeterangan(e.target.value)} placeholder="Contoh: Kemasan sobek, ayam berbau..." className="w-full bg-red-50/50 border border-red-100 rounded-xl px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 min-h-[70px]"/>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white font-black text-base py-4 rounded-2xl shadow-lg shadow-red-600/20 active:scale-[0.98] transition-transform disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 relative z-10 mb-6">
                {isLoading ? (
                  <><svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Mengunggah...</>
                ) : (
                  <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> Submit Truk ({cart.length} Item)</>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-2 px-1">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Log Terkini</h2>
                  <p className="text-gray-400 text-xs font-medium">Data Dikelompokkan per Truk</p>
                </div>
                <button onClick={fetchHistory} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1 active:scale-95 transition-transform"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Refresh</button>
              </div>

              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Cari Nopol atau Customer..." 
                  value={searchHistory} 
                  onChange={(e) => setSearchHistory(e.target.value)} 
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>

              {isLoadingHistory ? (
                <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>
              ) : historyError ? (
                <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center text-sm font-bold border border-red-200">{historyError}</div>
              ) : filteredHistoryData.length === 0 ? (
                <div className="text-center py-10 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200"><svg className="w-10 h-10 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg><p className="text-sm">Data tidak ditemukan.</p></div>
              ) : (
                filteredHistoryData.map((group, index) => (
                  <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-red-50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block">{group.date} • {group.timestamp}</span>
                        <h4 className="font-black text-gray-800 text-base mt-0.5">{group.nopol}</h4>
                        <p className="text-[10px] text-gray-400">{group.customer}</p>
                      </div>
                      <button onClick={() => handleShareWA(group)} className="bg-green-50 text-green-600 p-2 rounded-lg hover:bg-green-100 transition shadow-sm border border-green-100 flex items-center gap-1" title="Share ke WA">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> <span className="text-[10px] font-black">Share WA</span>
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-2 mt-2">
                       {group.items.map((it, i) => (
                         <div key={i} className="flex justify-between items-start border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                           <span className="text-xs font-bold text-gray-700 leading-tight pr-2">{it.item}</span>
                           <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold whitespace-nowrap">{it.qty} CTN</span>
                         </div>
                       ))}
                    </div>

                    {group.keterangan && (
                      <div className="mt-2.5 bg-yellow-50 border border-yellow-200 p-2.5 rounded-xl flex items-start gap-1.5">
                        <svg className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        <p className="text-[11px] font-medium text-yellow-700 italic">"{group.keterangan}"</p>
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-gray-50 flex gap-2">
                      {group.mainPhotoUrl && (
                        <button type="button" onClick={() => setPreviewImage({ url: getDriveDirectUrl(group.mainPhotoUrl) })} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold py-1.5 rounded-lg text-center transition">Lihat Mobil</button>
                      )}
                      {group.defectPhotoUrl && (
                        <button type="button" onClick={() => setPreviewImage({ url: getDriveDirectUrl(group.defectPhotoUrl) })} className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-600 text-[10px] font-bold py-1.5 rounded-lg text-center transition">Bad Stock</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-5 right-5 z-40">
          <div className="bg-white/95 backdrop-blur-xl p-1.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex border border-gray-100">
            <button onClick={() => setActiveTab('form')} className={`flex-1 py-2 flex flex-col items-center gap-0.5 rounded-xl font-bold text-[10px] transition-all ${activeTab === 'form' ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg> Terima Barang
            </button>
            <button onClick={() => setActiveTab('history')} className={`flex-1 py-2 flex flex-col items-center gap-0.5 rounded-xl font-bold text-[10px] transition-all ${activeTab === 'history' ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Riwayat
            </button>
          </div>
        </div>

        {showLogoutConfirm && (
          <div className="absolute inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white rounded-[30px] p-6 shadow-2xl w-full max-w-[320px] scale-100 transition-transform">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-7 h-7 text-red-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></div>
              <h3 className="text-lg font-black text-center text-gray-800 mb-1">Keluar Aplikasi?</h3>
              <p className="text-center text-xs text-gray-500 mb-6 px-4">Anda harus memasukkan PIN lagi untuk masuk.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition">Batal</button>
                <button onClick={handleLogout} className="flex-1 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-600/30 hover:bg-red-700 transition">Keluar</button>
              </div>
            </div>
          </div>
        )}

        {previewImage && (
          <div className="absolute inset-0 z-[60] bg-gray-900/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in">
            <button onClick={() => setPreviewImage(null)} className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition z-10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <div className="w-full max-w-sm bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-gray-800">
               <img src={previewImage.url} alt="Preview" className="w-full h-auto max-h-[70vh] object-contain" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}