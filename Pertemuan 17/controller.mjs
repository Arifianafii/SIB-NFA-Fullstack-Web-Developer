import users from "./data.mjs";

const index = () => {
    console.log("\n+-------------------------------------------+");
    console.log("|             DAFTAR PENGGUNA             |");
    console.log("+-------------------------------------------+");
    
    const displayUsers = users.map((user, index) => {
        return `| User ${index + 1}:
| Nama   : ${user.nama}
| Umur   : ${user.umur} tahun
| Alamat : ${user.alamat}
| Email  : ${user.email}
+-------------------------------------------+`;
    });
    
    displayUsers.forEach(userInfo => console.log(userInfo));
    console.log(`| Total Pengguna: ${users.length}`);
    console.log("+-------------------------------------------+\n");
};

const store = (userArray) => {
    userArray.forEach(user => {
        users.push(user);
        console.log(`\n+ Pengguna baru ditambahkan: ${user.nama}`);
    });
    return users;
};

const destroy = (nama) => {
    const initialLength = users.length;
    const filteredUsers = users.filter(user => user.nama !== nama);
    
    if (filteredUsers.length < initialLength) {
        console.log(`\n- Pengguna ${nama} berhasil dihapus`);
        users.length = 0;
        users.push(...filteredUsers);
        return users;
    } else {
        console.log(`\n! Pengguna ${nama} tidak ditemukan`);
        return users;
    }
};

const main = () => {
    console.log("\n=== Menampilkan Data Awal ===");
    index();
    
    const newUsers = [
        {
            nama: 'New User 1',
            umur: 30,
            alamat: 'Jl. Baru No. 99',
            email: 'newuser1@example.com'
        },
        {
            nama: 'New User 2',
            umur: 25,
            alamat: 'Jl. No. 88',
            email: 'newuser2@example.com'
        }
    ];
    store(newUsers);
    
    console.log("\n=== Menampilkan Data Setelah Penambahan ===");
    index();
    
    destroy('Data 3');
    
    console.log("\n=== Menampilkan Data Setelah Penghapusan ===");
    index();
};

export { index, store, destroy };
export default main;
