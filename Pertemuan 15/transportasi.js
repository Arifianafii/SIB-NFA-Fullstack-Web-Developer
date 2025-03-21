// Class untuk kendaraan
class Kendaraan {
    constructor(nama, tipe) {
        this.nama = nama;
        this.tipe = tipe;
    }

    getInfo() {
        return `${this.nama} (${this.tipe})`;
    }
}

// Class untuk pelanggan
class Pelanggan {
    constructor(nama, nomorTelepon, kendaraanDisewa = null) {
        this.nama = nama;
        this.nomorTelepon = nomorTelepon;
        this.kendaraanDisewa = kendaraanDisewa;
    }

    sewaKendaraan(kendaraan) {
        if (this.kendaraanDisewa) {
            console.log(`${this.nama} sudah menyewa kendaraan.`);
        } else {
            this.kendaraanDisewa = kendaraan;
            console.log(`${this.nama} menyewa ${kendaraan.getInfo()}`);
        }
    }

    getInfo() {
        return `Nama: ${this.nama}, Nomor Telepon: ${this.nomorTelepon}, Kendaraan: ${this.kendaraanDisewa ? this.kendaraanDisewa.getInfo() : "Tidak ada"}`;
    }
}

// Class untuk sistem manajemen transportasi
class SistemManajemenTransportasi {
    constructor() {
        this.pelangganList = [];
    }

    tambahPelanggan(pelanggan) {
        this.pelangganList.push(pelanggan);
    }

    tampilkanPelanggan() {
        console.log("\nDaftar Pelanggan yang Sedang Menyewa Kendaraan:");
        this.pelangganList.forEach((pelanggan, index) => {
            console.log(`${index + 1}. ${pelanggan.getInfo()}`);
        });
    }
}

// Membuat objek kendaraan
const kendaraan1 = new Kendaraan("Toyota Avanza", "Mobil");
const kendaraan2 = new Kendaraan("Honda Beat", "Motor");

// Membuat objek pelanggan dan mencatat transaksi penyewaan kendaraan
const pelanggan1 = new Pelanggan("Arief", "081234567890");
const pelanggan2 = new Pelanggan("Rafiq", "089876543210");

const sistemTransportasi = new SistemManajemenTransportasi();

console.log("Transaksi penyewaan kendaraan oleh pelanggan.");
pelanggan1.sewaKendaraan(kendaraan1);
pelanggan2.sewaKendaraan(kendaraan2);

// Menambahkan pelanggan ke dalam daftar sistem tanpa menampilkan penyewaan lagi
sistemTransportasi.tambahPelanggan(new Pelanggan("Fatah", "08123456789", new Kendaraan("Mobil Avanza", "Mobil")));
sistemTransportasi.tambahPelanggan(new Pelanggan("Mohan", "08987654321", new Kendaraan("Mobil Toyota", "Mobil")));

// Menampilkan daftar pelanggan yang menyewa kendaraan
sistemTransportasi.tampilkanPelanggan();
