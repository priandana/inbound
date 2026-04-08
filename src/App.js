import React, { useState, useEffect } from 'react';
import { Camera, History, Box, LogIn, Upload, FileWarning, CheckCircle, Package, Truck, Calendar, Key, User, Hash, ClipboardList, Loader2, ArrowLeft } from 'lucide-react';

// --- KONFIGURASI ---
// Ganti URL ini dengan URL Web App dari Google Apps Script Anda nanti!
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxeoOK8BxfrT2Guk3GGh70v15IITYZYQCOA4K_ek3c8n3BkQ080z4Buqyp0DT9prNi6Mw/exec"; 
const APP_PIN = "123456"; // PIN untuk masuk aplikasi

// Data Master
const CUSTOMERS = [
  "DIKICHI BANDUNG FRESH",
  "GACOAN BANDUNG FRESH",
  "BENFARM BANDUNG FRESH"
];

const ITEMS = [
  { name: "Ayam Broiler Utuh Grade A", sku: "BR-A-001" },
  { name: "Ayam Karkas Grade B", sku: "BR-B-002" },
  { name: "Sayap Ayam (Wings)", sku: "PR-W-010" },
  { name: "Dada Ayam Fillet (Boneless)", sku: "PR-B-015" },
  { name: "Paha Atas", sku: "PR-T-020" }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'history'
  
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans text-slate-800 selection:bg-blue-200">
      {/* Header */}
      <div className="bg-blue-600 text-white pt-8 pb-6 px-6 rounded-b-[2.5rem] shadow-lg sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Inbound Hub</h1>
            <p className="text-blue-200 text-sm mt-1">Gudang Utama Bandung</p>
          </div>
          <div className="bg-blue-500 p-2 rounded-full border border-blue-400 shadow-inner cursor-pointer" onClick={() => setIsLoggedIn(false)}>
            <User size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 -mt-4 relative z-0">
        {activeTab === 'form' ? <InboundForm /> : <HistoryScreen />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around py-3 px-6 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <button 
          onClick={() => setActiveTab('form')}
          className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${activeTab === 'form' ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Box size={24} strokeWidth={activeTab === 'form' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold mt-1">Terima Barang</span>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${activeTab === 'history' ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <History size={24} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold mt-1">Riwayat</span>
        </button>
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
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-20%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-20%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] w-full max-w-sm shadow-2xl relative z-10 flex flex-col items-center">
        <div className="bg-blue-500 text-white p-4 rounded-2xl mb-6 shadow-lg shadow-blue-500/30">
          <Package size={40} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Masuk Logistik</h2>
        <p className="text-slate-300 text-sm mb-8 text-center">Masukkan PIN rahasia untuk mengakses sistem inbound.</p>

        <form onSubmit={handleLogin} className="w-full">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Key size={20} className="text-slate-400" />
            </div>
            <input
              type="password"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="Masukkan PIN"
              className={`w-full bg-slate-800/50 border ${error ? 'border-red-500 text-red-100' : 'border-slate-600 text-white'} rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500 font-mono tracking-widest text-lg`}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Masuk <LogIn size={20} />
          </button>
        </form>
      </div>
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
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto fill SKU when Item changes
    if (name === 'item') {
      const selectedItem = ITEMS.find(i => i.name === value);
      setFormData(prev => ({ ...prev, sku: selectedItem ? selectedItem.sku : '' }));
    }
  };

  // Watermark Image Processor
  const processImage = (file, label) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Max dimension for optimization
          const MAX_WIDTH = 1280;
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw Original Image
          ctx.drawImage(img, 0, 0, width, height);
          
          // Draw Awesome Timestamp Background
          const now = new Date();
          const timeStr = now.toLocaleTimeString('id-ID');
          const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
          const textBlockHeight = 120;
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; // Semi-transparent black
          ctx.fillRect(0, height - textBlockHeight, width, textBlockHeight);
          
          ctx.fillStyle = '#1e40af'; // Blue accent bar
          ctx.fillRect(0, height - textBlockHeight, 10, textBlockHeight);

          // Draw Text
          ctx.fillStyle = '#facc15'; // Yellow label
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText(`LOGISTIK INBOUND - ${label}`, 30, height - 80);
          
          ctx.fillStyle = '#ffffff'; // White date/time
          ctx.font = '20px sans-serif';
          ctx.fillText(`📅 ${dateStr}`, 30, height - 45);
          ctx.fillText(`⏰ ${timeStr} WIB`, 30, height - 15);
          
          // Convert back to Base64 (compress to JPEG quality 0.7)
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
    if (!mainPhoto) {
      alert("Foto mobil kosong (After Loading) wajib dilampirkan!");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      mainPhoto: mainPhoto,
      defectPhoto: defectPhoto
    };

    try {
      if (APPS_SCRIPT_URL === "") {
        // DEMO MODE (Jika URL belum di set)
        console.log("DEMO MODE PAYLOAD:", payload);
        await new Promise(r => setTimeout(r, 2000)); // Simulasi loading
      } else {
        // REAL API CALL
        const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (result.status !== "success") throw new Error(result.message);
      }

      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        // Reset form
        setFormData({ ...formData, nopol: '', customer: '', item: '', sku: '', qty: '', expDate: '' });
        setMainPhoto(null);
        setDefectPhoto(null);
      }, 3000);

    } catch (error) {
      alert("Gagal menyimpan data: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMsg) {
    return (
      <div className="mt-10 bg-white p-8 rounded-[2rem] shadow-xl flex flex-col items-center text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={50} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Sukses!</h2>
        <p className="text-slate-500 mb-6">Data kedatangan barang dan foto berhasil disimpan ke sistem.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2rem] shadow-xl space-y-5 animate-fade-in">
      
      {/* Tanggal & Nopol */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><Calendar size={12}/> Tgl Kedatangan</label>
          <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><Truck size={12}/> No. Polisi</label>
          <input type="text" name="nopol" required placeholder="D 1234 ABC" value={formData.nopol} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
        </div>
      </div>

      {/* Customer */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><User size={12}/> Customer Origin</label>
        <select name="customer" required value={formData.customer} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
          <option value="" disabled>Pilih Customer...</option>
          {CUSTOMERS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Item & SKU */}
      <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><Package size={12}/> Nama Item</label>
          <select name="item" required value={formData.item} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="" disabled>Pilih Item...</option>
            {ITEMS.map(i => <option key={i.sku} value={i.name}>{i.name}</option>)}
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><Hash size={12}/> SKU</label>
            <input type="text" readOnly value={formData.sku} placeholder="Auto Fill" className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-500 font-mono" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><ClipboardList size={12}/> Qty (Carton)</label>
            <input type="number" name="qty" required min="1" value={formData.qty} onChange={handleInputChange} placeholder="0" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
      </div>

      {/* Exp Date */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 flex items-center gap-1"><Calendar size={12}/> Exp Date Barang</label>
        <input type="date" name="expDate" required value={formData.expDate} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>

      <hr className="border-slate-100 border-dashed border-2" />

      {/* Foto Utama (After Loading) */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 block">Wajib: Foto Mobil Kosong</label>
        <p className="text-xs text-slate-400 leading-tight mb-2">Ambil foto dalam box mobil setelah semua barang diturunkan.</p>
        
        {!mainPhoto ? (
          <label className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition">
            <Camera size={32} className="text-blue-500 mb-2" />
            <span className="text-sm text-blue-600 font-semibold">Buka Kamera</span>
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handlePhotoCapture(e, 'main')} />
          </label>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm group">
            <img src={mainPhoto} alt="Mobil Kosong" className="w-full h-auto" />
            <button type="button" onClick={() => setMainPhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg">
              <ArrowLeft size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Foto Cacat (Optional) */}
      <div className="space-y-2 pt-2">
         <label className="text-sm font-bold text-slate-700 flex items-center gap-2 block"><FileWarning size={16} className="text-amber-500"/> Opsional: Foto Barang Cacat</label>
         <p className="text-xs text-slate-400 leading-tight mb-2">Lampirkan foto jika ditemukan bad stock / kemasan rusak.</p>
         
         {!defectPhoto ? (
          <label className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-2xl p-4 flex gap-3 items-center cursor-pointer hover:bg-slate-100 transition">
            <div className="bg-amber-100 p-2 rounded-full"><Camera size={20} className="text-amber-600" /></div>
            <span className="text-sm text-slate-600 font-medium">Tambah Foto Bad Stock</span>
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handlePhotoCapture(e, 'defect')} />
          </label>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border-2 border-amber-200 shadow-sm w-1/2">
            <img src={defectPhoto} alt="Barang Cacat" className="w-full h-auto" />
            <button type="button" onClick={() => setDefectPhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg">
              <ArrowLeft size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full py-4 mt-6 rounded-2xl font-bold text-white text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-600/30'}`}
      >
        {isSubmitting ? <><Loader2 className="animate-spin" /> Mengunggah Data...</> : <><Upload /> Submit Inbound</>}
      </button>

    </form>
  );
}

// ==========================================
// HISTORY SCREEN
// ==========================================
function HistoryScreen() {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      if (APPS_SCRIPT_URL === "") {
        // DEMO DATA
        setTimeout(() => {
          setHistoryData([
            { timestamp: '08/04/2026 10:30', nopol: 'D 1992 XYZ', customer: 'DIKICHI BANDUNG FRESH', item: 'Ayam Broiler Utuh Grade A', qty: '150' },
            { timestamp: '08/04/2026 09:15', nopol: 'B 1234 BQ', customer: 'GACOAN BANDUNG FRESH', item: 'Sayap Ayam (Wings)', qty: '80' },
            { timestamp: '07/04/2026 15:45', nopol: 'D 9988 AA', customer: 'BENFARM BANDUNG FRESH', item: 'Paha Atas', qty: '200' },
          ]);
          setIsLoading(false);
        }, 1500);
      } else {
        const response = await fetch(APPS_SCRIPT_URL + "?action=getHistory");
        const data = await response.json();
        setHistoryData(data.data || []);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="text-blue-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Memuat Riwayat...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in pb-10">
      <div className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-slate-800">Riwayat Terkini</h2>
          <p className="text-xs text-slate-500">20 Transaksi terakhir</p>
        </div>
        <button onClick={fetchHistory} className="bg-blue-50 text-blue-600 p-2 rounded-xl text-sm font-semibold hover:bg-blue-100">Refresh</button>
      </div>

      {historyData.map((item, index) => (
        <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-md mb-2 inline-block">
                {item.timestamp}
              </span>
              <h3 className="font-bold text-slate-800 text-sm leading-tight">{item.customer}</h3>
            </div>
            <div className="bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg text-center">
              <p className="text-[10px] text-blue-500 font-semibold uppercase">Nopol</p>
              <p className="font-bold text-blue-700 text-sm">{item.nopol}</p>
            </div>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                <Package size={16} className="text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">{item.item}</p>
                <p className="text-[10px] text-slate-500">QTY: <span className="font-bold text-slate-700">{item.qty} CTN</span></p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {historyData.length === 0 && (
         <div className="text-center py-10">
           <ClipboardList size={48} className="text-slate-300 mx-auto mb-3" />
           <p className="text-slate-500">Belum ada data Inbound.</p>
         </div>
      )}
    </div>
  );
}