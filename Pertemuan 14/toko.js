
let produkToko = [
    { id: 1, nama: "Laptop", harga: 7000000, stok: 5 },
    { id: 2, nama: "Mouse", harga: 200000, stok: 10 },
    { id: 3, nama: "Keyboard", harga: 350000, stok: 7 }
  ];
  
  let pelanggan = [
    { id: 101, nama: "Budi Santoso", email: "budi@example.com", alamat: "Jl. Merdeka No. 123, Jakarta" },
    { id: 102, nama: "Ani Wijaya", email: "ani@example.com", alamat: "Jl. Pahlawan No. 45, Bandung" }
  ];
  
  let pesanan = [];

  let pesananIdCounter = 1;
  
  function tambahProduk(nama, harga, stok) {
    let newId = 1;
  
    for (let i = 0; i < produkToko.length; i++) {
      if (produkToko[i].id >= newId) {
        newId = produkToko[i].id + 1;
      }
    }

    const produkBaru = {
      id: newId,
      nama: nama,
      harga: harga,
      stok: stok
    };
    
    produkToko.push(produkBaru);
    return produkBaru;
  }
  
  function tampilkanDaftarProduk() {
    console.log("====== DAFTAR PRODUK ======");
    console.log("ID\tNama Produk\t\tHarga\t\tStok");
    console.log("-----------------------------");
    
    for (let i = 0; i < produkToko.length; i++) {
      const produk = produkToko[i];
      console.log(`${produk.id}\t${produk.nama}\t\tRp ${produk.harga.toLocaleString()}\t${produk.stok}`);
    }
    
    console.log("============================");
  }
  
  function hapusProduk(id) {
    let ditemukan = false;
    let index = -1;
    let namaProduk = "";
    
    for (let i = 0; i < produkToko.length; i++) {
      if (produkToko[i].id === id) {
        ditemukan = true;
        index = i;
        namaProduk = produkToko[i].nama;
        break;
      }
    }
    
    if (!ditemukan) {
      return { sukses: false, pesan: `Produk dengan ID ${id} tidak ditemukan.` };
    }
 
    produkToko.splice(index, 1);
    
    return { 
      sukses: true, 
      pesan: `Produk "${namaProduk}" berhasil dihapus.` 
    };
  }
  
  function tambahPelanggan(nama, email, alamat) {
    let newId = 101;

    for (let i = 0; i < pelanggan.length; i++) {
      if (pelanggan[i].id >= newId) {
        newId = pelanggan[i].id + 1;
      }
    }
    
    const pelangganBaru = {
      id: newId,
      nama: nama,
      email: email,
      alamat: alamat
    };
    
    pelanggan.push(pelangganBaru);
    return pelangganBaru;
  }
  
  function cariPelanggan(id) {
    for (let i = 0; i < pelanggan.length; i++) {
      if (pelanggan[i].id === id) {
        return pelanggan[i];
      }
    }
    return null; 
  }
  
  function cariProduk(id) {
    for (let i = 0; i < produkToko.length; i++) {
      if (produkToko[i].id === id) {
        return produkToko[i];
      }
    }
    return null;
  }
 
  function buatPesanan(pelangganId, items) {
    const pelangganData = cariPelanggan(pelangganId);
    
    if (!pelangganData) {
      return { sukses: false, pesan: `Pelanggan dengan ID ${pelangganId} tidak ditemukan.` };
    }
    
    const itemPesanan = [];
    let totalHarga = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const produk = cariProduk(item.produkId);
      
      if (!produk) {
        return { sukses: false, pesan: `Produk dengan ID ${item.produkId} tidak ditemukan.` };
      }
      
      if (produk.stok < item.jumlah) {
        return { 
          sukses: false, 
          pesan: `Stok produk "${produk.nama}" tidak mencukupi. Tersedia: ${produk.stok}, Diminta: ${item.jumlah}` 
        };
      }
      
      produk.stok -= item.jumlah;
      
      const subtotal = produk.harga * item.jumlah;
      totalHarga += subtotal;

      itemPesanan.push({
        produkId: produk.id,
        namaProduk: produk.nama,
        hargaSatuan: produk.harga,
        jumlah: item.jumlah,
        subtotal: subtotal
      });
    }
    
    const pesananBaru = {
      id: pesananIdCounter,
      tanggal: new Date(),
      pelangganId: pelangganData.id,
      namaPelanggan: pelangganData.nama,
      alamatPengiriman: pelangganData.alamat,
      items: itemPesanan,
      totalHarga: totalHarga,
      status: "menunggu pembayaran"
    };

    pesanan.push(pesananBaru);
    
    pesananIdCounter++;
    
    return { 
      sukses: true, 
      pesan: `Pesanan berhasil dibuat dengan ID: ${pesananBaru.id}`,
      pesanan: pesananBaru
    };
  }
  
  function tampilkanDetailPesanan(pesananId) {
    let pesananData = null;

    for (let i = 0; i < pesanan.length; i++) {
      if (pesanan[i].id === pesananId) {
        pesananData = pesanan[i];
        break;
      }
    }
    
    if (!pesananData) {
      console.log(`Pesanan dengan ID ${pesananId} tidak ditemukan.`);
      return;
    }
    
    console.log("\n====== DETAIL PESANAN ======");
    console.log(`ID Pesanan: ${pesananData.id}`);
    console.log(`Tanggal: ${pesananData.tanggal.toLocaleString()}`);
    console.log(`Pelanggan: ${pesananData.namaPelanggan} (ID: ${pesananData.pelangganId})`);
    console.log(`Alamat Pengiriman: ${pesananData.alamatPengiriman}`);
    console.log(`Status: ${pesananData.status}`);
    console.log("\n--- Item Pesanan ---");
    console.log("Produk\t\tHarga Satuan\tJumlah\tSubtotal");
    
    for (let i = 0; i < pesananData.items.length; i++) {
      const item = pesananData.items[i];
      console.log(`${item.namaProduk}\tRp ${item.hargaSatuan.toLocaleString()}\t${item.jumlah}\tRp ${item.subtotal.toLocaleString()}`);
    }
    
    console.log(`\nTotal Harga: Rp ${pesananData.totalHarga.toLocaleString()}`);
    console.log("============================");
  }
  
  function ubahStatusPesanan(pesananId, statusBaru) {
    let pesananData = null;
    
    for (let i = 0; i < pesanan.length; i++) {
      if (pesanan[i].id === pesananId) {
        pesananData = pesanan[i];
        break;
      }
    }
    
    if (!pesananData) {
      return { sukses: false, pesan: `Pesanan dengan ID ${pesananId} tidak ditemukan.` };
    }
    
 
    pesananData.status = statusBaru;
    
    return { 
      sukses: true, 
      pesan: `Status pesanan ID ${pesananId} berhasil diubah menjadi "${statusBaru}".` 
    };
  }

  function cariPesananPelanggan(pelangganId) {
    const pesananPelanggan = [];
    
    for (let i = 0; i < pesanan.length; i++) {
      if (pesanan[i].pelangganId === pelangganId) {
        pesananPelanggan.push(pesanan[i]);
      }
    }
    
    return pesananPelanggan;
  }
  
  console.log("=== SISTEM MANAJEMEN TOKO ONLINE ===");
  console.log("Inisialisasi data...");
 
  console.log("\n> Menambahkan produk baru:");
  const produkBaru = tambahProduk("Monitor LG 24 inch", 2000000, 10);
  console.log(produkBaru);
  
  console.log("\n> Menampilkan daftar produk:");
  tampilkanDaftarProduk();
  
  console.log("\n> Menambahkan pelanggan baru:");
  const pelangganBaru = tambahPelanggan("Rini Susanti", "rini@example.com", "Jl. Mawar No. 78, Surabaya");
  console.log(pelangganBaru);
 
  console.log("\n> Membuat pesanan baru:");
  const hasilPesanan = buatPesanan(101, [
    { produkId: 1, jumlah: 1 },
    { produkId: 3, jumlah: 2 }
  ]);
  console.log(hasilPesanan);
  
  if (hasilPesanan.sukses) {
    console.log("\n> Detail pesanan yang dibuat:");
    tampilkanDetailPesanan(hasilPesanan.pesanan.id);
  }
  
  console.log("\n> Mengubah status pesanan:");
  const hasilUbahStatus = ubahStatusPesanan(1, "diproses");
  console.log(hasilUbahStatus);
 
  console.log("\n> Daftar produk setelah pesanan dibuat (stok berkurang):");
  tampilkanDaftarProduk();
  
  console.log("\n=== PROGRAM SELESAI ===");