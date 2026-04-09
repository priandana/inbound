import React, { useState, useEffect, useRef } from 'react';
// Pastikan nama file CSS di bawah ini sesuai dengan milik Anda (index.css atau globals.css)
import './index.css'; 

// --- DATA SEMENTARA (Sesuai Spreadsheet Anda) ---
const CUSTOMERS = ["DIKICHI BANDUNG FRESH", "GACOAN BANDUNG FRESH", "BENFARM BANDUNG FRESH"];
const ITEMS = [
  { customer: "DIKICHI BANDUNG FRESH", item: "BEEF PATTY DKC 70 G", sku: "110193" },
  { customer: "DIKICHI BANDUNG FRESH", item: "BONELESS PAHA DKC 70 G REG", sku: "110206" },
  { customer: "DIKICHI BANDUNG FRESH", item: "BUN 4 INCH NON WIJEN", sku: "110116" },
  { customer: "GACOAN BANDUNG FRESH", item: "AYAM CINCANG (V20)", sku: "100211" },
  { customer: "GACOAN BANDUNG FRESH", item: "ADONAN PANGSIT (V20)", sku: "100209" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM CHICKEN KARAAGE 400 GR", sku: "BEN-00000049" },
  { customer: "BENFARM BANDUNG FRESH", item: "BENFARM FRANKFURTER SOSIS ORI 300GR", sku: "BEN-00000077" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('form'); // 'form' atau 'history'
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- STATE FORM ---
  const [date, setDate] = useState('');
  const [nopol, setNopol] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState('');
  const [expDate, setExpDate] = useState('');
  const [keterangan, setKeterangan] = useState(''); 

  // --- STATE FOTO ---
  const [mainPhoto, setMainPhoto] = useState(null);
  const [defectPhoto, setDefectPhoto] = useState(null);
  
  // --- STATE HISTORY ---
  const [historyData, setHistoryData] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState('');

  // Referensi untuk input file tersembunyi
  const mainPhotoInputRef = useRef(null);
  const defectPhotoInputRef = useRef(null);

  // Filter Item berdasarkan Customer yang dipilih
  const filteredItems = ITEMS.filter(i => i.customer === selectedCustomer);

  const handleItemChange = (itemName) => {
    setSelectedItem(itemName);
    const foundItem = ITEMS.find(i => i.item === itemName);
    if (foundItem) setSku(foundItem.sku);
  };

  const handlePhotoCapture = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'main') setMainPhoto(reader.result);
        if (type === 'defect') setDefectPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !nopol || !selectedCustomer || !selectedItem || !qty || !mainPhoto) {
      alert('Mohon lengkapi semua data wajib dan Foto Mobil Kosong!');
      return;
    }

    setIsLoading(true);

    const payload = {
      date,
      nopol,
      customer: selectedCustomer,
      item: selectedItem,
      sku,
      qty,
      expDate,
      keterangan, 
      mainPhoto,
      defectPhoto
    };

    try {
      // GANTI DENGAN URL WEB APP GOOGLE APPS SCRIPT ANDA
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxeoOK8BxfrT2Guk3GGh70v15IITYZYQCOA4K_ek3c8n3BkQ080z4Buqyp0DT9prNi6Mw/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert('Sukses! Data dan foto berhasil disimpan ke Gudang Utama.');
        setDate(''); setNopol(''); setSelectedCustomer(''); setSelectedItem('');
        setSku(''); setQty(''); setExpDate(''); setKeterangan('');
        setMainPhoto(null); setDefectPhoto(null);
      } else {
        alert('Gagal menyimpan: ' + result.message);
      }
    } catch (error) {
      alert('Gagal terhubung ke server. Pastikan internet lancar.');
      console.error(error);
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
        setHistoryData(result.data);
      } else {
        setHistoryError('Gagal mengambil data: ' + result.message);
      }
    } catch (error) {
      setHistoryError('Gagal memuat riwayat. Cek koneksi Anda.');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start md:py-10 font-sans text-gray-800">
      <div className="w-full max-w-md bg-gray-50 md:rounded-[40px] md:shadow-2xl overflow-hidden relative min-h-screen md:min-h-[850px] flex flex-col">
        
        {/* HEADER */}
        <div className="bg-gradient-to-b from-red-600 to-red-700 px-6 pt-12 pb-16 rounded-b-[40px] shadow-lg relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-red-200 text-xs font-bold tracking-wider mb-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                GUDANG UTAMA
              </p>
              <h1 className="text-3xl font-black text-white tracking-tight">Inbound Hub</h1>
            </div>
            <button onClick={() => setShowLogoutConfirm(true)} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition shadow-sm border border-white/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </button>
          </div>

          {activeTab === 'form' ? (
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-red-50 mt-4 absolute w-[calc(100%-3rem)] top-28 left-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1 tracking-wider">TANGGAL</label>
                  {/* Perbaikan text-[16px] dan text-gray-800 untuk menghindari zoom dan warna putih di iOS */}
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-red-50/50 border border-red-100 rounded-xl px-3 py-3 text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 block min-h-[50px] appearance-none"/>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-1 tracking-wider">NOPOL</label>
                  <input type="text" placeholder="D 1234 ABC" value={nopol} onChange={(e) => setNopol(e.target.value.toUpperCase())} className="w-full bg-red-50/50 border border-red-100 rounded-xl px-3 py-3 text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 uppercase block min-h-[50px]"/>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-1 tracking-wider">CUSTOMER ORIGIN</label>
                <select value={selectedCustomer} onChange={(e) => { setSelectedCustomer(e.target.value); setSelectedItem(''); setSku(''); }} className="w-full bg-red-50/50 border border-red-100 rounded-xl px-4 py-3 text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none min-h-[50px]">
                  <option value="">Pilih Customer...</option>
                  {CUSTOMERS.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex justify-between items-end absolute w-[calc(100%-3rem)] top-28 left-6">
              <div>
                <h2 className="text-xl font-bold text-white">Log Terkini</h2>
                <p className="text-red-200 text-xs">20 Inbound terakhir</p>
              </div>
              <button onClick={fetchHistory} className="bg-white text-red-600 px-4 py-2 rounded-xl text-[16px] font-bold shadow-sm flex items-center gap-2">
                Refresh
              </button>
            </div>
          )}
        </div>

        {/* AREA KONTEN */}
        <div className="flex-1 overflow-y-auto px-6 pb-32 pt-36 bg-gray-50 custom-scrollbar">
          
          {activeTab === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-50 relative overflow-hidden">
                <svg className="absolute -right-6 -top-6 w-32 h-32 text-red-50 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                
                <div className="flex items-center gap-2 mb-5 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                  </div>
                  <h3 className="font-bold text-gray-800">Detail Barang</h3>
                </div>

                <div className="space-y-4 relative z-10">
                  <div>
                    <label className="block text-[10px] font-bold text-red-400 mb-1 tracking-wider">NAMA ITEM</label>
                    <select value={selectedItem} onChange={(e) => handleItemChange(e.target.value)} disabled={!selectedCustomer} className="w-full bg-white border border-red-100 rounded-xl px-4 py-3 text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none min-h-[50px] disabled:bg-gray-50 disabled:text-gray-400">
                      <option value="">{selectedCustomer ? "Pilih Item..." : "Pilih Customer Dulu"}</option>
                      {filteredItems.map((i, idx) => <option key={idx} value={i.item}>{i.item}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-red-400 mb-1 tracking-wider">SKU CODE</label>
                      <input type="text" value={sku} readOnly placeholder="Otomatis" className="w-full bg-red-50/50 border border-transparent rounded-xl px-3 py-3 text-[16px] font-mono text-gray-500 block min-h-[50px]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-red-400 mb-1 tracking-wider">QTY (CTN)</label>
                      <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" className="w-full bg-white border border-red-100 rounded-xl px-3 py-3 text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 font-bold block min-h-[50px]"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-red-400 mb-1 tracking-wider">EXPIRED DATE</label>
                    {/* Perbaikan text-[16px] dan text-gray-800 */}
                    <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="w-full bg-white border border-red-100 rounded-xl px-3 py-3 text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 block min-h-[50px] appearance-none"/>
                  </div>
                </div>
              </div>

              {/* Box Foto Mobil */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-50">
                <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Foto Mobil Kosong <span className="text-red-500">*</span>
                </h3>
                <input type="file" accept="image/*" capture="environment" ref={mainPhotoInputRef} onChange={(e) => handlePhotoCapture(e, 'main')} className="hidden" />
                
                {mainPhoto ? (
                  <div className="relative rounded-2xl overflow-hidden group">
                    <img src={mainPhoto} alt="Mobil" className="w-full h-40 object-cover" />
                    <button type="button" onClick={() => setMainPhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-90">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => mainPhotoInputRef.current.click()} className="w-full h-32 border-2 border-dashed border-red-200 rounded-2xl flex flex-col items-center justify-center text-red-400 hover:bg-red-50/50 transition">
                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
                    <span className="text-sm font-bold">Ketuk untuk Foto</span>
                  </button>
                )}
              </div>

              {/* Box Foto Cacat */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-50">
                <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  Bad Stock (Opsional)
                </h3>
                <input type="file" accept="image/*" capture="environment" ref={defectPhotoInputRef} onChange={(e) => handlePhotoCapture(e, 'defect')} className="hidden" />
                
                {defectPhoto ? (
                  <div className="relative rounded-2xl overflow-hidden group">
                    <img src={defectPhoto} alt="Cacat" className="w-full h-32 object-cover" />
                    <button type="button" onClick={() => setDefectPhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-90">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => defectPhotoInputRef.current.click()} className="w-full py-4 border border-dashed border-gray-300 rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 transition text-sm font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
                    Tambah Foto Cacat
                  </button>
                )}
              </div>

              {/* Box Keterangan */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-50 mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  <h3 className="font-bold text-gray-800 text-sm">Keterangan (Opsional)</h3>
                </div>
                <textarea
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder="Contoh: Kemasan sobek, ayam berbau..."
                  className="w-full bg-red-50/50 border border-red-100 rounded-xl px-4 py-3 text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 min-h-[80px]"
                />
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white font-black text-lg py-5 rounded-2xl shadow-xl shadow-red-600/30 active:scale-[0.98] transition-transform disabled:opacity-70 disabled:cursor-not-allowed mt-8 flex justify-center items-center gap-3">
                {isLoading ? (
                  <><svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> MENGUNGGAH...</>
                ) : (
                  <><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> SUBMIT DATA</>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4 pt-10">
              {isLoadingHistory ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
              ) : historyError ? (
                <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center text-[16px] font-bold border border-red-200">
                  {historyError}
                </div>
              ) : historyData.length === 0 ? (
                <div className="text-center py-10 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                  <p>Belum ada data masuk.</p>
                </div>
              ) : (
                historyData.map((data, index) => (
                  <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-red-50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-bold text-gray-400 block">{data.date}</span>
                        <h4 className="font-black text-gray-800 mt-1">{data.nopol}</h4>
                      </div>
                      <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold border border-red-100">{data.qty} CTN</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600">{data.item}</p>
                    <p className="text-xs text-gray-400 mt-1">{data.customer}</p>

                    {data.keterangan && (
                      <div className="mt-3 bg-yellow-50 border border-yellow-200 p-3 rounded-xl flex items-start gap-2">
                        <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        <p className="text-xs font-medium text-yellow-700 italic">"{data.keterangan}"</p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                      {data.mainPhotoUrl && (
                        <a href={data.mainPhotoUrl} target="_blank" rel="noreferrer" className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-2 rounded-xl text-center transition">Lihat Mobil</a>
                      )}
                      {data.defectPhotoUrl && (
                        <a href={data.defectPhotoUrl} target="_blank" rel="noreferrer" className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-bold py-2 rounded-xl text-center transition">Bad Stock</a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/90 backdrop-blur-xl p-2 rounded-3xl shadow-2xl flex border border-gray-100">
            <button onClick={() => setActiveTab('form')} className={`flex-1 py-3 flex flex-col items-center gap-1 rounded-2xl font-bold text-[11px] transition-all ${activeTab === 'form' ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              Terima Barang
            </button>
            <button onClick={() => setActiveTab('history')} className={`flex-1 py-3 flex flex-col items-center gap-1 rounded-2xl font-bold text-[11px] transition-all ${activeTab === 'history' ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Riwayat
            </button>
          </div>
        </div>

        {/* Modal Logout */}
        {showLogoutConfirm && (
          <div className="absolute inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm scale-100 transition-transform">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </div>
              <h3 className="text-xl font-black text-center text-gray-800 mb-2">Keluar Aplikasi?</h3>
              <p className="text-center text-sm text-gray-500 mb-6">Pastikan semua data sudah ter-submit sebelum Anda keluar.</p>
              
              <div className="flex gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Batal</button>
                <button onClick={() => { alert('Anda berhasil keluar!'); setShowLogoutConfirm(false); }} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 hover:bg-red-700 transition">Keluar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}