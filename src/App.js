import React, { useState, useEffect, useRef } from 'react';
import { Camera, History, Box, Upload, FileWarning, CheckCircle, Package, Truck, Calendar, Key, User, ClipboardList, Loader2, ArrowLeft, ChevronRight, Sparkles, ChevronDown } from 'lucide-react';

// --- KONFIGURASI ---
// GANTI URL DI BAWAH INI DENGAN URL WEB APP ANDA!
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxeoOK8BxfrT2Guk3GGh70v15IITYZYQCOA4K_ek3c8n3BkQ080z4Buqyp0DT9prNi6Mw/exec"; 
const APP_PIN = "123456";

// Data Master
const CUSTOMERS = [
  "DIKICHI BANDUNG FRESH",
  "GACOAN BANDUNG FRESH",
  "BENFARM BANDUNG FRESH"
];

// MENGGUNAKAN DATA ASLI DARI SPREADSHEET ANDA (FULL LIST)
const ITEMS = [
  // DIKICHI BANDUNG FRESH
  { name: "BEEF PATTY DKC 70 G", sku: "110193", customer: "DIKICHI BANDUNG FRESH" },
  { name: "BONELESS PAHA DKC 70 G REG", sku: "110206", customer: "DIKICHI BANDUNG FRESH" },
  { name: "BUN 4 INCH NON WIJEN", sku: "110116", customer: "DIKICHI BANDUNG FRESH" },
  { name: "FRENCH FRIES SNOW VALLEY", sku: "110192", customer: "DIKICHI BANDUNG FRESH" },
  { name: "LUMPIA UDANG FROZEN", sku: "110199", customer: "DIKICHI BANDUNG FRESH" },
  { name: "SIOMAY AYAM FROZEN", sku: "110197", customer: "DIKICHI BANDUNG FRESH" },
  { name: "SIOMAY NUCLEAR FROZEN", sku: "110198", customer: "DIKICHI BANDUNG FRESH" },
  { name: "SUNDAE SOFT MIX VANILLA 10L", sku: "110161", customer: "DIKICHI BANDUNG FRESH" },
  { name: "UDANG KEJU FROZEN", sku: "110196", customer: "DIKICHI BANDUNG FRESH" },
  { name: "AYAM BIC CUT BAGIAN BESAR REG (DADA/PATAS)", sku: "120043", customer: "DIKICHI BANDUNG FRESH" },
  { name: "AYAM BIC CUT BAGIAN KECIL REG (PABA/SAYAP)", sku: "120044", customer: "DIKICHI BANDUNG FRESH" },
  { name: "AYAM BIC CUT BAGIAN BESAR HOT (DADA/PATAS)", sku: "120045", customer: "DIKICHI BANDUNG FRESH" },
  { name: "AYAM BIC CUT BAGIAN KECIL HOT (PABA/SAYAP)", sku: "120046", customer: "DIKICHI BANDUNG FRESH" },

  // GACOAN BANDUNG FRESH
  { name: "AYAM CINCANG (V20)", sku: "100211", customer: "GACOAN BANDUNG FRESH" },
  { name: "ADONAN PANGSIT (V20)", sku: "100209", customer: "GACOAN BANDUNG FRESH" },
  { name: "LUMPIA UDANG (V20)", sku: "100244", customer: "GACOAN BANDUNG FRESH" },
  { name: "SIOMAY DIMSUM (V20)", sku: "100256", customer: "GACOAN BANDUNG FRESH" },
  { name: "KULIT PANGSIT (V.20)", sku: "100239", customer: "GACOAN BANDUNG FRESH" },
  { name: "MIE (V.20)", sku: "100245", customer: "GACOAN BANDUNG FRESH" },
  { name: "KRUPUK MIE (V.30)", sku: "100238", customer: "GACOAN BANDUNG FRESH" },
  { name: "SURAI NAGA (V.30)", sku: "100274", customer: "GACOAN BANDUNG FRESH" },
  { name: "UDANG KEJU FROZEN", sku: "100294", customer: "GACOAN BANDUNG FRESH" },
  { name: "UDANG RAMBUTAN (PENTOL) (V20)", sku: "100286", customer: "GACOAN BANDUNG FRESH" },

  // BENFARM BANDUNG FRESH
  { name: "BENFARM CHICKEN KARAAGE 400 GR", sku: "BEN-00000049", customer: "BENFARM BANDUNG FRESH" },
  { name: "BENFARM FRANKFURTER SOSIS ORI 300GR", sku: "BEN-00000077", customer: "BENFARM BANDUNG FRESH" },
  { name: "BENFARM FRANKFURTER SOSIS KEJU 300GR", sku: "BEN-00000078", customer: "BENFARM BANDUNG FRESH" },
  { name: "BENFARM SPICY CHICKEN POPCORN 400GR", sku: "BEN-00000115", customer: "BENFARM BANDUNG FRESH" },
  { name: "BENFARM CHICKEN NUGGET PREMIUM 400 GR", sku: "BEN-00000111", customer: "BENFARM BANDUNG FRESH" },
  { name: "BENFARM HONEY CHICKEN WINGS 400 GR", sku: "BEN-00000112", customer: "BENFARM BANDUNG FRESH" },
  { name: "BENFARM CHICKEN NUGGET STICK PREMIUM 300GR", sku: "BEN-00000117", customer: "BENFARM BANDUNG FRESH" },
  { name: "BENFARM SPICY CHICKEN WINGS 400 GR", sku: "BEN-00000120", customer: "BENFARM BANDUNG FRESH" },
  { name: "BENFARM MAC & CHEESE BITES 180GR", sku: "BEN-00000103", customer: "BENFARM BANDUNG FRESH" },
  { name: "DEBEZ MAKARONI KEJU GORENG 450GR", sku: "BEN-00000114", customer: "BENFARM BANDUNG FRESH" },
  { name: "BENFARM MAC & CHEESE BOLOGNESE 180GR", sku: "BEN-00000121", customer: "BENFARM BANDUNG FRESH" },
  { name: "DEBEZ MAKARONI PEDAS GORENG 300GR", sku: "BEN-00000126", customer: "BENFARM BANDUNG FRESH" }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  
  // Inject Custom CSS Animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
      @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
      .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-blob { animation: blob 7s infinite; }
      .animation-delay-2000 { animation-delay: 2s; }
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-200/50 sm:py-8 flex justify-center items-center font-sans selection:bg-red-200">
      {/* Mobile Frame (Tampil seperti HP di Desktop) */}
      <div className="w-full sm:w-[400px] h-screen sm:h-[850px] bg-slate-50 sm:rounded-[3rem] sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] sm:border-[8px] sm:border-slate-800 relative overflow-hidden flex flex-col transform transition-all">
        
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-red-700 via-red-600 to-rose-500 opacity-90 rounded-b-[3rem] z-0 animate-fade-in"></div>
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/20 rounded-full blur-2xl z-0 animate-blob"></div>

        {/* Header */}
        <div className="pt-12 pb-6 px-6 relative z-10 animate-slide-up">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-rose-100 text-xs font-semibold tracking-wider uppercase mb-1 flex items-center gap-1"><Sparkles size={12}/> Gudang Utama</p>
              <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">Inbound Hub</h1>
            </div>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg cursor-pointer hover:bg-white/30 transition-all active:scale-90 group"
            >
              <User size={22} className="text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-28 relative z-10 -mt-2">
          {activeTab === 'form' ? <InboundForm /> : <HistoryScreen />}
        </div>

        {/* Floating Bottom Navigation */}
        <div className="absolute bottom-6 left-6 right-6 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex justify-between p-2 z-50 border border-slate-100 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={() => setActiveTab('form')}
            className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-500 relative ${activeTab === 'form' ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {activeTab === 'form' && <div className="absolute inset-0 bg-red-50/80 rounded-2xl -z-10"></div>}
            <Box size={22} strokeWidth={activeTab === 'form' ? 2.5 : 2} className={`transition-transform duration-500 ${activeTab === 'form' ? 'scale-110 mb-1' : ''}`} />
            <span className={`text-[10px] font-bold transition-all duration-500 ${activeTab === 'form' ? 'opacity-100' : 'opacity-0 h-0'}`}>Terima Barang</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-500 relative ${activeTab === 'history' ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {activeTab === 'history' && <div className="absolute inset-0 bg-red-50/80 rounded-2xl -z-10"></div>}
            <History size={22} strokeWidth={activeTab === 'history' ? 2.5 : 2} className={`transition-transform duration-500 ${activeTab === 'history' ? 'scale-110 mb-1' : ''}`} />
            <span className={`text-[10px] font-bold transition-all duration-500 ${activeTab === 'history' ? 'opacity-100' : 'opacity-0 h-0'}`}>Riwayat</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// LOGIN SCREEN
// ==========================================
function LoginScreen({ onLogin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === APP_PIN) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 sm:py-8 flex justify-center items-center font-sans">
      <div className="w-full sm:w-[400px] h-screen sm:h-[850px] bg-slate-900 sm:rounded-[3rem] sm:border-[8px] sm:border-slate-800 relative overflow-hidden flex flex-col justify-center items-center p-8 shadow-2xl">
        
        {/* Animated Background */}
        <div className="absolute top-[-10%] left-[-20%] w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-96 h-96 bg-rose-600 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob animation-delay-2000"></div>

        <div className="bg-slate-800 p-8 rounded-[2.5rem] w-full max-w-sm shadow-2xl relative z-10 border border-slate-700 flex flex-col items-center animate-scale-in">
          <div className="bg-gradient-to-br from-red-400 to-red-600 p-5 rounded-[1.5rem] mb-6 shadow-[0_0_30px_rgba(220,38,38,0.5)] animate-float">
            <Package size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Access Control</h2>
          <p className="text-red-200 text-sm mb-8 text-center font-medium">Masukkan PIN rahasia logistik.</p>

          <form onSubmit={handleLogin} className="w-full space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key size={20} className={`transition-colors ${error ? 'text-red-400' : 'text-red-400 group-focus-within:text-red-300'}`} />
              </div>
              <input
                type="password"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="• • • • • •"
                className={`w-full bg-slate-900 border-2 ${error ? 'border-red-500 text-red-100 ring-4 ring-red-500/20' : 'border-slate-700 text-white focus:border-red-500 focus:ring-4 focus:ring-red-500/20'} rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-all placeholder-slate-600 font-mono tracking-[0.5em] text-xl text-center`}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-4 rounded-2xl shadow-[0_10px_25px_-5px_rgba(220,38,38,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Autentikasi <ChevronRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CUSTOM SEARCHABLE DROPDOWN
// ==========================================
function DropdownSearch({ name, options, value, onChange, placeholder, icon: Icon, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="relative">
      {/* Hidden input untuk validasi form bawaan HTML5 */}
      <input type="text" name={name} required value={value} readOnly className="absolute opacity-0 w-0 h-0 pointer-events-none" />
      
      {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />}
      <div 
        className={`w-full flex items-center justify-between rounded-2xl py-3.5 pr-4 transition-all cursor-text ${Icon ? 'pl-11' : 'pl-4'} ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <input
          type="text"
          placeholder={value || placeholder}
          value={isOpen ? search : value}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          className="w-full bg-transparent outline-none font-medium text-slate-700 placeholder-slate-400"
        />
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl max-h-56 overflow-y-auto py-2 animate-slide-up hide-scrollbar">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, i) => (
              <div
                key={i}
                className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                onClick={() => {
                  onChange({ target: { name, value: opt } });
                  setIsOpen(false);
                  setSearch("");
                }}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-slate-400 italic text-center">Data tidak ditemukan</div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// INBOUND FORM SCREEN
// ==========================================
function InboundForm() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    nopol: '',
    customer: '',
    item: '',
    sku: '',
    qty: '',
    expDate: '',
  });

  const [mainPhoto, setMainPhoto] = useState(null);
  const [defectPhoto, setDefectPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'customer') {
      // Jika customer dipilih/berubah, kosongkan Item dan SKU
      setFormData(prev => ({ 
        ...prev, 
        customer: value,
        item: '', 
        sku: '' 
      }));
    } else if (name === 'item') {
      // Cari SKU dari Item yang dipilih (yang sesuai dengan Customer saat ini)
      const selectedItem = ITEMS.find(i => i.name === value && i.customer === formData.customer);
      setFormData(prev => ({ 
        ...prev, 
        item: value,
        sku: selectedItem ? selectedItem.sku : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const processImage = (file, label) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 1280;
          let width = img.width, height = img.height;
          
          if (width > MAX_WIDTH) { height = Math.round((height * MAX_WIDTH) / width); width = MAX_WIDTH; }
          canvas.width = width; canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const now = new Date();
          const timeStr = now.toLocaleTimeString('id-ID');
          const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
          
          ctx.fillStyle = 'rgba(15, 23, 42, 0.75)'; 
          ctx.fillRect(0, height - 130, width, 130);
          
          // Red accent on image watermark
          ctx.fillStyle = '#dc2626'; 
          ctx.fillRect(0, height - 130, 12, 130);

          ctx.fillStyle = '#fca5a5'; 
          ctx.font = 'bold 26px sans-serif';
          ctx.fillText(`[ INBOUND ] ${label}`, 35, height - 85);
          
          ctx.fillStyle = '#f8fafc'; 
          ctx.font = '22px sans-serif';
          ctx.fillText(`📅 ${dateStr}  |  ⏰ ${timeStr} WIB`, 35, height - 40);
          
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoCapture = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const label = type === 'main' ? 'KONDISI MOBIL KOSONG' : 'BARANG CACAT/BAD STOCK';
    const processedBase64 = await processImage(file, label);
    if (type === 'main') setMainPhoto(processedBase64);
    else setDefectPhoto(processedBase64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainPhoto) { alert("Foto mobil kosong wajib dilampirkan!"); return; }
    setIsSubmitting(true);

    try {
      if (APPS_SCRIPT_URL === "") {
        await new Promise(r => setTimeout(r, 1500)); 
      } else {
        const response = await fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify({...formData, mainPhoto, defectPhoto}) });
        const result = await response.json();
        if (result.status !== "success") throw new Error(result.message);
      }
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        setFormData({ ...formData, nopol: '', customer: '', item: '', sku: '', qty: '', expDate: '' });
        setMainPhoto(null); setDefectPhoto(null);
      }, 2500);
    } catch (error) { alert("Gagal: " + error.message); } finally { setIsSubmitting(false); }
  };

  if (successMsg) {
    return (
      <div className="bg-white p-8 rounded-[2.5rem] shadow-lg flex flex-col items-center text-center animate-scale-in border border-slate-100 mt-10">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-[2rem] flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(16,185,129,0.3)] rotate-3">
          <CheckCircle size={50} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Berhasil!</h2>
        <p className="text-slate-500 font-medium leading-relaxed">Data dan foto kedatangan telah tersimpan di sistem.</p>
      </div>
    );
  }

  // Filter daftar Item berdasarkan Customer yang sudah dipilih
  const availableItems = formData.customer 
    ? ITEMS.filter(i => i.customer === formData.customer).map(i => i.name)
    : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      
      {/* SECTION: INFO KEDATANGAN */}
      <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-red-100 p-1.5 rounded-lg text-red-600"><Truck size={16}/></div>
          <h3 className="font-bold text-slate-800 text-sm">Info Armada</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">Tanggal</label>
            <div className="relative">
              <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-red-500/10 focus:border-red-400 outline-none transition-all font-medium text-slate-700" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">Nopol</label>
            <input type="text" name="nopol" required placeholder="D 1234 ABC" value={formData.nopol} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-red-500/10 focus:border-red-400 outline-none transition-all uppercase font-bold text-slate-700" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">Customer Origin</label>
          <DropdownSearch 
            name="customer"
            options={CUSTOMERS}
            value={formData.customer}
            onChange={handleInputChange}
            placeholder="Ketik / Pilih Customer..."
            icon={User}
            className="bg-slate-50 border border-slate-200 focus-within:ring-4 focus-within:ring-red-500/10 focus-within:border-red-400"
          />
        </div>
      </div>

      {/* SECTION: INFO BARANG */}
      <div className="bg-gradient-to-br from-red-50 to-rose-50 p-5 rounded-[2rem] border border-red-100 shadow-inner space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5"><Package size={100} /></div>
        <div className="flex items-center gap-2 mb-2 relative z-10">
          <div className="bg-white p-1.5 rounded-lg text-red-600 shadow-sm"><Box size={16}/></div>
          <h3 className="font-bold text-slate-800 text-sm">Detail Barang</h3>
        </div>

        <div className="space-y-1.5 relative z-20">
          <label className="text-[11px] font-bold text-red-500 uppercase tracking-wider pl-1">Nama Item</label>
          <DropdownSearch 
            name="item"
            options={availableItems}
            value={formData.item}
            onChange={handleInputChange}
            placeholder={formData.customer ? "Ketik / Pilih Item..." : "Pilih Customer dahulu..."}
            className="bg-white border border-red-100 shadow-sm focus-within:ring-4 focus-within:ring-red-500/20 focus-within:border-red-400"
          />
        </div>
        
        <div className="grid grid-cols-5 gap-3 relative z-10">
          <div className="col-span-3 space-y-1.5">
            <label className="text-[11px] font-bold text-red-500 uppercase tracking-wider pl-1">SKU Code</label>
            <input type="text" readOnly value={formData.sku} placeholder="Otomatis" className="w-full bg-red-100/50 border border-transparent rounded-2xl px-4 py-3.5 text-sm text-red-700 font-mono font-bold" />
          </div>
          <div className="col-span-2 space-y-1.5">
            <label className="text-[11px] font-bold text-red-500 uppercase tracking-wider pl-1">Qty (CTN)</label>
            <input type="number" name="qty" required min="1" value={formData.qty} onChange={handleInputChange} placeholder="0" className="w-full bg-white border border-red-100 rounded-2xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-red-500/20 outline-none shadow-sm font-bold text-slate-700 text-center" />
          </div>
        </div>

        <div className="space-y-1.5 relative z-10">
          <label className="text-[11px] font-bold text-red-500 uppercase tracking-wider pl-1 flex items-center gap-1"><Calendar size={12}/> Expired Date</label>
          <input type="date" name="expDate" required value={formData.expDate} onChange={handleInputChange} className="w-full bg-white border border-red-100 rounded-2xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-red-500/20 outline-none shadow-sm font-medium text-slate-700" />
        </div>
      </div>

      {/* SECTION: FOTO */}
      <div className="space-y-4">
        {/* Foto Utama */}
        <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-3 px-1">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2"><Camera size={16} className="text-red-500"/> Foto Mobil Kosong <span className="text-red-500">*</span></label>
          </div>
          {!mainPhoto ? (
            <label className="h-32 border-2 border-dashed border-red-200 bg-red-50/50 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-red-50 transition-colors group">
              <div className="bg-white p-3 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                <Camera size={24} className="text-red-500" />
              </div>
              <span className="text-xs text-red-600 font-bold">Ketuk untuk Foto</span>
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handlePhotoCapture(e, 'main')} />
            </label>
          ) : (
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-md group">
              <img src={mainPhoto} alt="Mobil Kosong" className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <button type="button" onClick={() => setMainPhoto(null)} className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform">
                <ArrowLeft size={16} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>

        {/* Foto Cacat */}
        <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-3 px-1">
             <label className="text-sm font-bold text-slate-800 flex items-center gap-2"><FileWarning size={16} className="text-amber-500"/> Bad Stock (Opsional)</label>
          </div>
          {!defectPhoto ? (
            <label className="h-16 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl flex gap-3 items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors group">
              <Camera size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
              <span className="text-xs text-slate-500 font-semibold group-hover:text-amber-600 transition-colors">Tambah Foto Cacat</span>
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handlePhotoCapture(e, 'defect')} />
            </label>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-200 shadow-sm w-32">
              <img src={defectPhoto} alt="Barang Cacat" className="w-full h-24 object-cover" />
              <button type="button" onClick={() => setDefectPhoto(null)} className="absolute top-1.5 right-1.5 bg-red-500 text-white p-1.5 rounded-full shadow-lg">
                <ArrowLeft size={12} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-4 rounded-2xl font-extrabold text-white text-lg flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden ${isSubmitting ? 'bg-slate-400 scale-[0.98]' : 'bg-gradient-to-r from-red-600 to-rose-600 hover:shadow-[0_15px_30px_-5px_rgba(220,38,38,0.4)] active:scale-[0.97]'}`}
        >
          {isSubmitting ? (
             <><Loader2 className="animate-spin" /> MENGUNGGAH...</>
          ) : (
             <><Upload size={20} className="mb-0.5" /> SUBMIT DATA</>
          )}
        </button>
      </div>

    </form>
  );
}

// ==========================================
// HISTORY SCREEN
// ==========================================
function HistoryScreen() {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      if (APPS_SCRIPT_URL === "") {
        setTimeout(() => {
          setHistoryData([
            { timestamp: '08/04/2026 10:30', nopol: 'D 1992 XYZ', customer: 'DIKICHI BANDUNG FRESH', item: 'BEEF PATTY DKC 70 G', qty: '150' },
            { timestamp: '08/04/2026 09:15', nopol: 'B 1234 BQ', customer: 'GACOAN BANDUNG FRESH', item: 'AYAM CINCANG (V20)', qty: '80' },
          ]);
          setIsLoading(false);
        }, 1000);
      } else {
        const response = await fetch(APPS_SCRIPT_URL + "?action=getHistory");
        const data = await response.json();
        setHistoryData(data.data || []);
        setIsLoading(false);
      }
    } catch (error) { setIsLoading(false); }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
        <div className="bg-white p-4 rounded-3xl shadow-lg shadow-red-500/10 mb-4 animate-bounce">
           <Loader2 size={32} className="text-red-500 animate-spin" />
        </div>
        <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">Menyinkronkan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex justify-between items-end mb-6 px-1 mt-2">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Log Terkini</h2>
          <p className="text-xs text-slate-500 font-medium">20 Inbound terakhir</p>
        </div>
        <button onClick={fetchHistory} className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-red-600 shadow-sm border border-slate-200 hover:bg-red-50 active:scale-95 transition-all">Refresh</button>
      </div>

      {historyData.map((item, index) => (
        <div key={index} className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-red-300 transition-colors animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-red-400 to-rose-500"></div>
          
          <div className="flex justify-between items-start mb-4 pl-2">
            <div>
              <span className="bg-red-50 text-red-600 text-[9px] font-extrabold tracking-wider px-2.5 py-1 rounded-full mb-2 inline-block border border-red-100">
                {item.timestamp}
              </span>
              <h3 className="font-extrabold text-slate-800 text-sm leading-tight pr-2">{item.customer}</h3>
            </div>
            <div className="bg-slate-800 text-white px-3 py-1.5 rounded-xl text-center shadow-md">
              <p className="text-[8px] text-slate-300 font-bold uppercase tracking-wider">Armada</p>
              <p className="font-black text-sm">{item.nopol}</p>
            </div>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between ml-2">
            <div className="flex items-center gap-3">
              <div className="bg-white shadow-sm border border-slate-100 p-2.5 rounded-xl text-red-500">
                <Package size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 leading-tight">{item.item}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Jumlah: <span className="font-extrabold text-red-600 bg-red-50 px-1.5 rounded text-[11px] ml-1">{item.qty} CTN</span></p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {historyData.length === 0 && (
         <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-300 mt-4">
           <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-100">
             <ClipboardList size={28} className="text-slate-300" />
           </div>
           <p className="text-slate-500 font-medium text-sm">Belum ada data masuk hari ini.</p>
         </div>
      )}
    </div>
  );
}