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
const CustomSelect = ({ value, onChange, options, placeholder, disabled, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const wrapperRef = useRef(null);

  const focusColor = role === 'outbound' ? 'focus:ring-blue-400' : 'focus:ring-red-400';
  const bgColor = role === 'outbound' ? 'bg-blue-50/50 border-blue-100' : 'bg-red-50/50 border-red-100';
  const iconColor = disabled ? 'text-gray-300' : (role === 'outbound' ? 'text-blue-400' : 'text-red-400');
  const hoverColor = role === 'outbound' ? 'hover:bg-blue-50' : 'hover:bg-red-50';

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
        <input 
          type="text" 
          value={search} 
          onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }} 
          onFocus={() => setIsOpen(true)} 
          placeholder={placeholder} 
          disabled={disabled} 
          className={`w-full ${bgColor} rounded-xl px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 ${focusColor} min-h-[50px] disabled:bg-gray-100 disabled:text-gray-400 pr-10 transition-all`} 
        />
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      
      {isOpen && !disabled && (
        <ul className="absolute z-50 w-full bg-white border border-gray-100 rounded-xl shadow-2xl max-h-56 overflow-y-auto mt-2 top-full custom-scrollbar py-1">
          {filtered.length > 0 ? filtered.map((opt, idx) => (
            <li 
              key={idx} 
              onClick={() => { onChange(opt); setIsOpen(false); }} 
              className={`px-4 py-3 ${hoverColor} cursor-pointer text-sm font-medium text-gray-700 transition-colors border-b border-gray-50 last:border-0`}
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
  const [keterangan, setKeterangan] = useState(''); 
  const [mainPhoto, setMainPhoto] = useState(null);
  const [defectPhoto, setDefectPhoto] = useState(null);
  
  // FITUR BARU: SUPPLIER
  const [supplier, setSupplier] = useState(''); 

  const [selectedCustomer, setSelectedCustomer] = useState(''); 
  const [resto, setResto] = useState(''); 
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
      showToast('Mohon isi NOPOL terlebih dahulu untuk Watermark!', 'error');
      return;
    }
    inputRef.current.click();
  };

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
        ctx.fillStyle = role === 'outbound' ? '#3b82f6' : '#ff4d4d'; 
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
        showToast('Lengkapi semua field barang!', 'error'); 
        return;
      }
      setCart([...cart, { resto, customer: selectedCustomer, item: selectedItem, sku, qty, expDate }]);
    } else {
      if (!selectedItem || !qty || !expDate) {
        showToast('Lengkapi data barang!', 'error'); 
        return;
      }
      setCart([...cart, { item: selectedItem, sku, qty, expDate }]);
    }
    
    setSelectedItem(''); 
    setSku(''); 
    setQty(''); 
    setExpDate(''); 
    showToast('Berhasil ditambah!', 'success');
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart]; 
    newCart.splice(index, 1); 
    setCart(newCart);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isReady = role === 'outbound' 
      ? (date && nopol && cart.length > 0 && mainPhoto)
      : (date && nopol && supplier && selectedCustomer && cart.length > 0 && mainPhoto);

    if (!isReady) {
      showToast('Lengkapi data utama, minimal 1 barang, dan foto!', 'error');
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
        showToast(`Sukses terkirim!`, 'success');
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
      showToast('Server Error.', 'error'); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const fetchHistory = async () => {
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
              supplier: row.supplier, // FITUR BARU
              customer: row.customer, 
              keterangan: row.keterangan, 
              mainPhotoUrl: row.mainPhotoUrl, 
              defectPhotoUrl: row.defectPhotoUrl, 
              items: [] 
            });
            grouped.push(map.get(key));
          }
          if (role === 'outbound') {
            map.get(key).items.push({ 
              resto: row.resto, 
              customer: row.customer, 
              item: row.item, 
              sku: row.sku, 
              qty: row.qty 
            });
          } else {
            map.get(key).items.push({ 
              item: row.item, 
              sku: row.sku, 
              qty: row.qty 
            });
          }
        });
        setHistoryData(grouped);
      } else {
        setHistoryError('Gagal ambil data.');
      }
    } catch (error) { 
      setHistoryError('Offline/Error.'); 
    } finally { 
      setIsLoadingHistory(false); 
    }
  };

  useEffect(() => { 
    if (activeTab === 'history' && isAuthenticated) fetchHistory(); 
  }, [activeTab, isAuthenticated]);

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
        if(!restoMap[it.resto]) restoMap[it.resto] = []; 
        restoMap[it.resto].push(it); 
      });
      Object.keys(restoMap).forEach(restoName => {
        text += `\n📍 *${restoName}*\n`;
        restoMap[restoName].forEach(it => { 
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
       const matchNopol = group.nopol.toLowerCase().includes(term);
       const matchCust = group.customer.toLowerCase().includes(term);
       const matchSupp = group.supplier && group.supplier.toLowerCase().includes(term);
       return matchNopol || matchCust || matchSupp;
    } else {
       const matchNopol = group.nopol.toLowerCase().includes(term);
       const matchResto = group.items.some(it => it.resto && it.resto.toLowerCase().includes(term));
       const matchCust = group.customer && group.customer.toLowerCase().includes(term);
       return matchNopol || matchResto || matchCust;
    }
  });

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-200 flex justify-center items-center font-sans p-4">
         <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 text-center relative overflow-hidden h-[800px] flex flex-col justify-center">
            <h1 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">B-Log Portal</h1>
            <p className="text-gray-500 mb-10 font-medium">Pilih modul kerja</p>
            <div className="space-y-4">
               <button 
                onClick={() => setRole('inbound')} 
                className="w-full bg-white hover:bg-red-50 border-2 border-red-100 hover:border-red-600 text-gray-800 hover:text-red-600 font-black text-xl py-6 rounded-3xl transition-all active:scale-95 flex flex-col items-center gap-2 group"
               >
                 <span className="text-4xl">📦</span> INBOUND
               </button>
               <button 
                onClick={() => setRole('outbound')} 
                className="w-full bg-white hover:bg-blue-50 border-2 border-blue-100 hover:border-blue-600 text-gray-800 hover:text-blue-600 font-black text-xl py-6 rounded-3xl transition-all active:scale-95 flex flex-col items-center gap-2 group"
               >
                 <span className="text-4xl">🚚</span> OUTBOUND
               </button>
            </div>
         </div>
      </div>
    );
  }

  const isOutbound = role === 'outbound';
  const theme = isOutbound 
    ? { 
        bgGradient: 'from-blue-600 to-blue-800', 
        textMain: 'text-blue-600', 
        bgLight: 'bg-blue-50', 
        borderMain: 'border-blue-600', 
        borderLight: 'border-blue-100', 
        bgMain: 'bg-blue-600', 
        ringFocus: 'focus:ring-blue-400', 
        title: 'Outbound Hub', 
        icon: '🚚', 
        shadow: 'shadow-blue-600/30' 
      }  
    : { 
        bgGradient: 'from-red-600 to-red-700', 
        textMain: 'text-red-600', 
        bgLight: 'bg-red-50', 
        borderMain: 'border-red-600', 
        borderLight: 'border-red-100', 
        bgMain: 'bg-red-600', 
        ringFocus: 'focus:ring-red-400', 
        title: 'Inbound Hub', 
        icon: '📦', 
        shadow: 'shadow-red-600/30' 
      };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-200 flex justify-center items-center font-sans text-gray-800 md:p-4">
        <div className="w-full max-w-md bg-white md:rounded-[40px] shadow-2xl p-8 text-center relative overflow-hidden h-screen md:h-[800px] flex flex-col justify-center">
          <div className={`absolute top-0 left-0 w-full h-40 bg-gradient-to-b ${theme.bgGradient} rounded-b-[40px]`}></div>
          <button onClick={() => setRole(null)} className="absolute top-6 left-6 text-white/80 z-20 flex items-center gap-1 text-sm font-bold">
            Batal
          </button>
          
          <div className="relative z-10 mt-6 mb-8">
            <div className="w-20 h-20 bg-white rounded-full mx-auto shadow-lg flex items-center justify-center text-3xl">
              {theme.icon}
            </div>
            <h1 className="text-2xl font-black text-gray-800">{theme.title}</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <input 
              type="password" 
              pattern="[0-9]*" 
              inputMode="numeric" 
              value={pinInput} 
              onChange={(e) => setPinInput(e.target.value)} 
              className={`w-full text-center tracking-[0.5em] font-bold text-2xl py-4 rounded-2xl border-2 focus:outline-none transition-all ${pinError ? 'bg-red-50 border-red-400 text-red-600' : 'bg-gray-50'}`} 
              placeholder="••••" 
              maxLength={4}
            />
            {pinError && <p className="text-red-500 text-xs font-bold animate-bounce">PIN invalid!</p>}
            <button type="submit" className={`w-full ${theme.bgMain} text-white font-black text-lg py-4 rounded-2xl shadow-xl active:scale-[0.98]`}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center font-sans text-gray-800 md:p-4 relative">
      <div className="w-full max-w-md bg-gray-50 md:rounded-[40px] shadow-2xl overflow-hidden relative h-screen md:h-[800px] flex flex-col">
        
        {/* TOAST NOTIFICATION */}
        {toast && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-[100] animate-fade-in">
            <div className={`p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-white ${toast.type === 'success' ? 'bg-gray-900' : 'bg-red-600'}`}>
              <p className="text-sm font-bold">{toast.msg}</p>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className={`bg-gradient-to-b ${theme.bgGradient} px-6 pt-10 pb-6 rounded-b-[30px] shadow-sm relative z-20 flex-shrink-0`}>
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">B-Log Storage</p>
              <h1 className="text-2xl font-black">{theme.title}</h1>
            </div>
            <button onClick={() => setShowLogoutConfirm(true)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              Out
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-24 custom-scrollbar relative z-10">
          
          {/* TAB FORM INPUT */}
          {activeTab === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* BOX INFO TRUK & SUPPLIER/CUSTOMER */}
              <div className={`bg-white rounded-[24px] p-5 shadow-sm border ${theme.borderLight} relative z-30`}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Tanggal</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-gray-50 rounded-xl px-3 py-3 text-base outline-none"/>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Nopol</label>
                    <input type="text" placeholder="D 1234 ABC" value={nopol} onChange={(e) => setNopol(e.target.value.toUpperCase())} className="w-full bg-gray-50 rounded-xl px-3 py-3 text-base outline-none uppercase"/>
                  </div>
                </div>
                
                {/* JIKA INBOUND, TAMPILKAN SUPPLIER & CUSTOMER ORIGIN */}
                {!isOutbound && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Supplier Asal</label>
                      <input 
                        type="text" 
                        placeholder="Nama Supplier/Vendor" 
                        value={supplier} 
                        onChange={(e) => setSupplier(e.target.value.toUpperCase())} 
                        disabled={cart.length > 0}
                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-base outline-none uppercase focus:ring-2 focus:ring-red-400 disabled:bg-gray-100 disabled:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Customer Origin</label>
                      <CustomSelect role={role} value={selectedCustomer} options={CUSTOMERS} placeholder="Pilih Customer..." disabled={cart.length > 0} onChange={(v) => setSelectedCustomer(v)}/>
                    </div>
                    {cart.length > 0 && <p className="text-[10px] text-orange-500 mt-1 italic">*Kosongkan keranjang jika ingin mengganti data di atas.</p>}
                  </div>
                )}
              </div>

              {/* BOX KERANJANG */}
              <div className={`bg-white rounded-[24px] p-5 shadow-sm border ${theme.borderLight} relative z-20`}>
                
                {/* FORM ISI KERANJANG */}
                <div className={`space-y-4 p-4 border-2 border-dashed ${theme.borderLight} rounded-xl bg-gray-50/50`}>
                  {isOutbound && (
                    <>
                      <div>
                        <label className={`block text-[10px] font-bold ${theme.textMain} uppercase`}>Resto Tujuan</label>
                        <input type="text" value={resto} onChange={(e) => setResto(e.target.value)} placeholder="Nama Resto..." className="w-full bg-white rounded-xl px-4 py-3 text-base outline-none border border-gray-100"/>
                      </div>
                      <div>
                        <label className={`block text-[10px] font-bold ${theme.textMain} uppercase`}>Customer</label>
                        <CustomSelect role={role} value={selectedCustomer} options={CUSTOMERS} placeholder="Prinsipal..." onChange={(v) => setSelectedCustomer(v)}/>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className={`block text-[10px] font-bold ${theme.textMain} uppercase`}>Item</label>
                    <CustomSelect role={role} value={selectedItem} options={itemOptions} placeholder="Pilih Barang..." disabled={!isOutbound && !selectedCustomer} onChange={(v) => handleItemSelect(v)}/>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-[10px] font-bold ${theme.textMain} uppercase`}>SKU</label>
                      <input type="text" value={sku} readOnly className="w-full bg-gray-100 rounded-xl px-3 py-3 text-base font-mono outline-none" />
                    </div>
                    <div>
                      <label className={`block text-[10px] font-bold ${theme.textMain} uppercase`}>QTY</label>
                      <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} className="w-full bg-white rounded-xl px-3 py-3 text-base border border-gray-100 outline-none font-bold"/>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-[10px] font-bold ${theme.textMain} uppercase`}>Expired</label>
                    <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="w-full bg-white rounded-xl px-3 py-3 text-base border border-gray-100 outline-none"/>
                  </div>
                  
                  <button type="button" onClick={handleAddToCart} className={`w-full bg-white border-2 ${theme.borderMain} ${theme.textMain} font-bold text-sm py-3 rounded-xl`}>
                    Tambah ke Truk
                  </button>
                </div>

                {/* DAFTAR ITEM DI KERANJANG */}
                {cart.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {cart.map((c, i) => (
                      <div key={i} className="flex justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex-1">
                          {isOutbound && <span className={`text-[9px] font-black ${theme.textMain} block uppercase`}>📍 {c.resto}</span>}
                          <p className="font-bold text-sm">{c.item}</p>
                          <p className="text-xs">{c.qty} CTN</p>
                        </div>
                        <button type="button" onClick={() => handleRemoveFromCart(i)} className="text-red-400">Hapus</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* BOX FOTO UTAMA */}
              <div className={`bg-white rounded-[24px] p-5 shadow-sm border ${theme.borderLight}`}>
                <h3 className="font-bold text-sm mb-3">{isOutbound ? 'Foto Muatan Penuh' : 'Foto Mobil Kosong'}</h3>
                {mainPhoto ? (
                  <div className="relative">
                    <img src={mainPhoto} alt="Foto Utama" className="w-full h-32 object-cover rounded-xl"/>
                    <button type="button" onClick={() => setMainPhoto(null)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1">X</button>
                  </div> 
                ) : (
                  <button type="button" onClick={() => triggerCamera(mainPhotoInputRef)} className={`w-full h-24 border-2 border-dashed ${theme.borderLight} rounded-xl text-center font-bold ${theme.textMain}`}>
                    Ambil Foto Utama
                  </button>
                )}
                <input type="file" accept="image/*" capture="environment" ref={mainPhotoInputRef} onChange={(e) => handlePhotoCapture(e, 'main')} className="hidden" />
              </div>

              {/* BOX FOTO PENDUKUNG */}
              <div className={`bg-white rounded-[24px] p-5 shadow-sm border ${theme.borderLight}`}>
                <h3 className="font-bold text-sm mb-3">{isOutbound ? 'Foto Segel Pintu' : 'Bad Stock (Ops)'}</h3>
                {defectPhoto ? (
                  <div className="relative">
                    <img src={defectPhoto} alt="Foto Pendukung" className="w-full h-32 object-cover rounded-xl"/>
                    <button type="button" onClick={() => setDefectPhoto(null)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1">X</button>
                  </div> 
                ) : (
                  <button type="button" onClick={() => triggerCamera(defectPhotoInputRef)} className="w-full py-3 border border-dashed rounded-xl font-bold text-gray-400">
                    Tambah Foto Pendukung
                  </button>
                )}
                <input type="file" accept="image/*" capture="environment" ref={defectPhotoInputRef} onChange={(e) => handlePhotoCapture(e, 'defect')} className="hidden" />
              </div>

              {/* TOMBOL SUBMIT */}
              <button type="submit" disabled={isLoading} className={`w-full ${theme.bgMain} text-white font-black py-4 rounded-2xl shadow-xl active:scale-95`}>
                {isLoading ? 'Loading...' : 'Submit Seluruh Data'}
              </button>
            </form>
          ) : (

            /* TAB HISTORY */
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Cari Nopol/Supplier/Resto..." 
                value={searchHistory} 
                onChange={(e) => setSearchHistory(e.target.value)} 
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 outline-none"
              />
              
              {isLoadingHistory ? (
                <div className="text-center py-10">Memuat...</div>
              ) : (
                filteredHistoryData.map((g, i) => (
                  <div key={i} className={`bg-white p-4 rounded-2xl shadow-sm border ${theme.borderLight} relative overflow-hidden`}>
                    <div className={`absolute top-0 left-0 w-1 h-full ${theme.bgMain}`}></div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block">{g.timestamp}</span>
                        <h4 className="font-black text-gray-800">{g.nopol}</h4>
                        {!isOutbound && g.supplier && (
                          <p className="text-[10px] text-gray-500 mt-1 font-medium italic">Asal: {g.supplier}</p>
                        )}
                      </div>
                      <button onClick={() => handleShareWA(g)} className="text-green-600 text-xs font-bold">Share WA</button>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-3 mt-2">
                      {g.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between border-b last:border-0 py-1">
                          <span className="text-xs font-bold">{it.resto ? `📍 ${it.resto} - ` : ''}{it.item}</span>
                          <span className="text-xs">{it.qty} CTN</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      {g.mainPhotoUrl && (
                        <button onClick={() => setPreviewImage({url: getDriveDirectUrl(g.mainPhotoUrl)})} className={`flex-1 ${theme.bgLight} ${theme.textMain} text-[10px] font-bold py-2 rounded-lg`}>
                          Foto Utama
                        </button>
                      )}
                      {g.defectPhotoUrl && (
                        <button onClick={() => setPreviewImage({url: getDriveDirectUrl(g.defectPhotoUrl)})} className="flex-1 bg-orange-50 text-orange-600 text-[10px] font-bold py-2 rounded-lg">
                          Foto Pendukung
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="absolute bottom-4 left-5 right-5 z-40">
          <div className="bg-white/95 p-1.5 rounded-2xl shadow-xl flex border border-gray-100">
            <button onClick={() => setActiveTab('form')} className={`flex-1 py-2 font-bold text-[10px] rounded-xl ${activeTab === 'form' ? `${theme.bgLight} ${theme.textMain}` : 'text-gray-400'}`}>Form Input</button>
            <button onClick={() => setActiveTab('history')} className={`flex-1 py-2 font-bold text-[10px] rounded-xl ${activeTab === 'history' ? `${theme.bgLight} ${theme.textMain}` : 'text-gray-400'}`}>Riwayat</button>
          </div>
        </div>

        {/* MODAL LOGOUT */}
        {showLogoutConfirm && (
          <div className="absolute inset-0 z-50 bg-gray-900/40 flex items-center justify-center p-6">
            <div className="bg-white rounded-[30px] p-6 shadow-2xl w-full max-w-[320px] text-center">
              <h3 className="text-lg font-black mb-1">Ganti Portal?</h3>
              <p className="text-xs text-gray-500 mb-6">Keluar dari {theme.title}?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 bg-gray-100 rounded-xl font-bold">Batal</button>
                <button onClick={handleLogout} className={`flex-1 py-2.5 ${theme.bgMain} text-white rounded-xl font-bold`}>Keluar</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL PREVIEW FOTO */}
        {previewImage && (
          <div className="absolute inset-0 z-[60] bg-gray-900/95 flex flex-col items-center justify-center p-4">
            <button onClick={() => setPreviewImage(null)} className="absolute top-6 right-6 text-white text-3xl">×</button>
            <img src={previewImage.url} alt="Preview" className="w-full max-w-sm max-h-[70vh] object-contain rounded-2xl border border-gray-800" />
          </div>
        )}

      </div>
    </div>
  );
}