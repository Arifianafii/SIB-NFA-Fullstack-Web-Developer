let dataPegawai = [
    {
        nama: "Dodi Prayodi",
        umur: 25,
        jabatan: "Manajer",
        status: "Menikah"
    },
    {
        nama: "Sinta Wijaya",
        umur: 28,
        jabatan: "Asisten Manajer",
        status: "Menikah"
    },
    {
        nama: "Budi Santoso",
        umur: 23,
        jabatan: "Staff",
        status: "Belum Menikah"
    },
    {
        nama: "Ratna Dewi",
        umur: 30,
        jabatan: "Manajer",
        status: "Belum Menikah"
    }
];

let hitungGajiDariJabatan = jabatan => {
    let baseMap = {
        "Manajer": 15000000,
        "Asisten Manajer": 10000000,
        "Staff": 5000000
    };
    
    return baseMap[jabatan] || 0; 
};

let keRupiah = nominal => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(nominal);
};

let hitungKomponenGaji = (pegawai) => {
    let gapok = hitungGajiDariJabatan(pegawai.jabatan);
    
    let tunjJabatan = gapok * 0.15;
    let potonganBPJS = gapok * 0.1;
    let tunjKeluarga = pegawai.status === "Menikah" ? gapok * 0.2 : 0;
   
    let takeHomePay = gapok + tunjJabatan + tunjKeluarga - potonganBPJS;
    
    return {
        gajiPokok: gapok,
        tunjanganJabatan: tunjJabatan,
        bpjs: potonganBPJS, 
        tunjanganKeluarga: tunjKeluarga,
        totalGaji: takeHomePay
    };
};

let renderTabelPegawai = () => {
    let strukturTabel = `
        <table>
            <thead>
                <tr>
                    <th>Nama Pegawai</th>
                    <th>Umur</th>
                    <th>Jabatan</th>
                    <th>Status</th>
                    <th>Gaji Pokok</th>
                    <th>Tunjangan Jabatan</th>
                    <th>BPJS</th>
                    <th>Tunjangan Keluarga</th>
                    <th>Total Gaji</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    let totalSemuaGaji = 0;
    
    // Loop untuk setiap pegawai
    dataPegawai.forEach(pegawai => {
        let komponen = hitungKomponenGaji(pegawai);
        totalSemuaGaji += komponen.totalGaji;
        
        strukturTabel += `
            <tr>
                <td>${pegawai.nama}</td>
                <td>${pegawai.umur} tahun</td>
                <td>${pegawai.jabatan}</td>
                <td>${pegawai.status}</td>
                <td>${keRupiah(komponen.gajiPokok)}</td>
                <td>${keRupiah(komponen.tunjanganJabatan)}</td>
                <td>${keRupiah(komponen.bpjs)}</td>
                <td>${keRupiah(komponen.tunjanganKeluarga)}</td>
                <td>${keRupiah(komponen.totalGaji)}</td>
            </tr>
        `;
    });
    
    strukturTabel += `
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="8" style="text-align: right;"><strong>Total Gaji Semua Pegawai:</strong></td>
                    <td><strong>${keRupiah(totalSemuaGaji)}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;
    
    document.getElementById("tabelData").innerHTML = strukturTabel;
};

let tambahPegawai = (nama, umur, jabatan, status) => {
    dataPegawai.push({
        nama: nama,
        umur: umur,
        jabatan: jabatan,
        status: status
    });
    
    renderTabelPegawai();
};

window.addEventListener('DOMContentLoaded', () => {
    renderTabelPegawai();
});