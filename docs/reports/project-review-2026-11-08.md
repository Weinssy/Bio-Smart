# Analisis proyek Bio Smart

Tanggal: 8 November 2026. Pemeriksaan kode, data lokal, build produksi, dependensi, dan alur browser.

## Kondisi proyek

Bio Smart sudah memiliki fondasi aplikasi belajar mandiri: 8 modul, 38 subtopik, 8 kuis dengan masing-masing 5 soal, diagram interaktif, simulasi osmosis, dan atlas anatomi 3D. React Router memakai hash sehingga rute sesuai untuk hosting statis GitHub Pages. Halaman dimuat melalui lazy import. Supabase digunakan untuk autentikasi dan profil.

Kesenjangan terpenting ada pada kesinambungan belajar. Jawaban kuis hanya berada dalam state komponen; belum ada riwayat nilai atau status membaca yang dipersistenkan. Login belum membuat kemajuan belajar tersimpan. `initialProgress.js` serta komponen dashboard lama masih berisi data contoh, tetapi tidak dipakai beranda baru.

## Perbaikan yang diterapkan

| Temuan | Perubahan |
| --- | --- |
| Beranda panjang dan mengulang banyak ajakan; navigasinya berbeda dari halaman materi | Beranda menggunakan shell aplikasi yang sama, dengan fokus belajar sel, pencarian materi, daftar topik, dan pilihan kegiatan praktikum/atlas/kuis. |
| Pencarian beranda mengirim `q` tanpa filter katalog | Katalog membaca URL sebagai sumber state; pencarian mencakup judul, deskripsi, dan subtopik. Keadaan kosong memiliki tindakan pemulihan. |
| Pencarian global mengarahkan semua hasil ke awal modul | Hasil subtopik membawa `?topik=...`; materi membaca parameter ini dan tombol sebelumnya/selanjutnya memperbaruinya. |
| Kuis akhir modul menuju `/quiz`, rute yang tidak terdaftar | Tautan diperbaiki ke `/kuis?quizId=...`. Pemilihan kuis memakai URL; ID salah menampilkan daftar dengan pemberitahuan. Kuis di-remount saat ID berubah. |
| Styling mengandalkan Tailwind CDN dan konfigurasi build lama belum dapat digunakan | Tailwind 3.4.19 dan PostCSS ditambahkan ke build. Sintaks lama yang tidak dipakai di `components/ui` tidak ikut pemindaian. |
| Manifest ganda dan ikon PWA tidak tersedia | Manifest dihasilkan satu kali oleh plugin, memakai favicon SVG yang sudah ada. |
| Drawer dan pencarian belum membatasi fokus keyboard | Keduanya memakai dialog native. Escape menutup dialog, fokus pencarian diarahkan ke input, dan body tidak bergulir saat dialog terbuka. |
| Ancestor overflow membuat header sticky tidak bekerja sesuai harapan | Area layout memakai clipping tanpa membuat scroll container tambahan; perpindahan halaman mengembalikan posisi ke atas. |
| Validasi native form akun dinonaktifkan | `noValidate` dihapus, pesan kesalahan memakai alert, dan keadaan layanan akun tidak tersedia menjelaskan pilihan belajar yang tetap bisa dibuka. |
| Kunci server Supabase hanya diberi peringatan tetapi tetap diinisialisasi | Kunci `sb_secret_` dan JWT `service_role` ditolak saat konfigurasi Vite dimuat dan pada konfigurasi client. URL rusak dan placeholder tidak menginisialisasi client. Ini tidak menggantikan RLS. |
| Selisih konsentrasi pada simulasi diberi satuan MPa tanpa perhitungan tekanan | Angka tersebut dihapus. Tampilan menyebut acuan model NaCl 0,9% dan keterbatasan model yang dipakai untuk kedua jenis sel. |
| README menjelaskan situs biodata dan teknologi yang berbeda | README ditulis ulang berdasarkan aplikasi yang berjalan, termasuk setup, struktur, batasan akun/PWA, dan pengujian. |

Vite di lockfile diperbarui dari 8.3.2 ke 8.3.6 melalui pembaruan kompatibel. Batas minimum manifest paket juga dinaikkan ke 8.3.6. `npm audit --omit=dev` setelah pembaruan melaporkan nol temuan pada dependensi produksi.

## Arah pengembangan berikutnya

### 1. Simpan kemajuan dan hasil evaluasi

Tambahkan tabel `learning_progress` dan `quiz_attempts`, lengkap dengan migrasi, kebijakan RLS per `auth.uid()`, serta tipe payload yang jelas. Simpan subtopik terakhir dan status selesai; jangan menyamakan membuka halaman dengan menguasai materi. Untuk tamu, sediakan penyimpanan perangkat dan kebijakan penggabungan yang jelas ketika masuk akun.

Kriteria selesai: siswa kembali ke subtopik terakhir setelah memuat ulang, riwayat kuis tetap tersedia, dan pengguna lain tidak bisa membaca atau menulis riwayat tersebut. Jangan menampilkan dashboard contoh sebagai progres siswa.

### 2. Jadikan konten mudah ditinjau dan diterbitkan

Pisahkan JSON besar berdasarkan modul, tambahkan metadata sumber, tanggal peninjauan, dan versi konten. Libatkan peninjau materi biologi untuk memvalidasi cakupan Fase F, pembahasan soal, serta asumsi simulasi. Label model sederhana pada lab sudah ditambahkan; perhitungan kuantitatif memerlukan model dan parameter yang terpisah.

Kriteria selesai: setiap modul memiliki sumber dan peninjau, setiap kuis mengacu versi materi, dan pemeriksaan data otomatis tetap lolos.

### 3. Optimalkan atlas dan pengalaman koneksi terbatas

Atlas saat ini merupakan aplikasi hasil build yang disertakan sebagai iframe. Direktori model berisi 31 file, total 93.838.190 byte termasuk `.bin`, salinan `.gz`, dan metadata. Angka ini adalah ukuran direktori, bukan pengukuran unduhan pengguna. Simpan source atlas dan prosedur build-nya agar perubahan dapat direproduksi, lalu muat sistem organ sesuai kebutuhan, tinjau kompresi hosting, dan tambahkan pilihan bahasa Indonesia.

Model `.bin` dan `.gz` tidak masuk precache saat ini. Font judul dan ikon masih memakai Google Fonts. Uji instalasi, pembaruan service worker, dan mode luring di perangkat sasaran sebelum mempromosikan aplikasi sebagai sepenuhnya luring. Ikon PWA PNG yang sesuai platform dapat ditambahkan melalui pekerjaan aset tersendiri.

### 4. Rapikan fondasi komponen dan otomatisasi validasi

Folder `src/components/ui` belum dipakai dan masih mencampur sintaks Tailwind baru dengan impor seperti `lucide-react`, `class-variance-authority`, dan `sonner` yang belum tersedia di manifest. Tentukan satu versi sistem styling sebelum mengaktifkannya. Komponen dashboard dan data progres contoh perlu dipisahkan sebagai demo atau diganti dengan data nyata.

Tambahkan `npm run lint`, `npm test`, dan build ke pemeriksaan pull request sebelum deployment. Lanjutkan dengan tes browser yang dapat diulang untuk pencarian, materi ke kuis, dialog, serta ukuran ponsel.

Audit penuh masih menyisakan 6 temuan pada rantai tool build Workbox/PWA: 2 rendah dan 4 sedang. Perbaikan otomatis yang ditawarkan npm memerlukan pergantian mayor/downgrade plugin PWA. Tinjau kompatibilitas dan uji migrasi secara terpisah. Tidak ada temuan tinggi atau kritis pada audit terakhir setelah pembaruan kompatibel.

## Validasi dan batas pemeriksaan

- Build produksi berhasil dengan Vite 8.3.6; service worker dan manifest dihasilkan.
- Lima tes Node lulus: pencarian, URL subtopik, konsistensi modul/kuis, media lokal dan jawaban, serta konfigurasi Supabase.
- Lint selesai tanpa error; 9 warning tersisa pada ekspor fast refresh di komponen lama/context dan satu escape pada `convert.cjs`.
- Browser: seluruh 24 tautan beranda selain skip link dibuka ke tujuan yang nyata; delapan kartu modul juga dibuka satu per satu.
- Browser: pencarian beranda, filter katalog, hasil kosong, pemulihan, pencarian subtopik, materi ke kuis, pengisian lima soal, hasil, pengulangan, dan kembali ke daftar berhasil.
- Browser: drawer ponsel dibuka/ditutup dengan Escape dan dipakai berpindah halaman. Pencarian memakai dialog dan input mendapatkan fokus.
- Form masuk kosong memicu validasi native sebelum pengiriman; tombol visibilitas kata sandi dan tab daftar/masuk bekerja. Login, pendaftaran, email verifikasi, serta akses database tidak diuji dengan akun nyata.
- Lab: preset hipertonik/hipotonik/isotonik, pergantian jenis sel, dan slider keyboard mengubah tampilan. Atlas selesai memuat model; tombol tampak depan mengubah status kamera.
- Beranda diuji pada viewport CSS 320, 390, 768, dan 1440 px; tidak ada elemen isi yang meluber. Katalog juga diperiksa pada 320 px.
- Pemeriksaan kontras teks DOM pada beranda dan katalog tidak menemukan pasangan di bawah batas AA. Pemeriksaan ini tidak mengaudit semua teks dalam aset SVG, atlas, atau konten materi lama.
- Tidak ada pengukuran Lighthouse, Core Web Vitals, uji jaringan seluler nyata, keyboard virtual perangkat fisik, atau audit aksesibilitas menyeluruh. Fallback kegagalan halaman diperiksa dari kode; pemaksaan kegagalan unduhan chunk belum diuji di browser.

Lihat [laporan antislop](antislop-delivery-2026-11-08.md) untuk keputusan desain dan bukti interaksi yang lebih rinci.
