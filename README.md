# Bio Smart

Aplikasi pembelajaran biologi SMA tanpa akun. Seluruh materi, diagram, kuis, laboratorium virtual, dan atlas anatomi dapat langsung digunakan tanpa login atau konfigurasi Supabase. Rute lama `/#/login` diarahkan ke beranda.

## Menjalankan

Gunakan Node.js 22.12+ atau 24+. Jalankan `npm ci` lalu `npm run dev`. Untuk produksi gunakan `npm run build`; pemeriksaan kode memakai `npm run lint` dan `npm test`.

Konten tersimpan di `src/data`, diagram di `public/images`, dan atlas di `public/human-atlas`. Arah visual mengikuti `DESIGN.md`. Hasil kuis masih berada di sesi halaman dan belum disimpan lintas sesi.

Materi, diagram, kuis, dan simulasi dapat digunakan offline setelah service worker produksi selesai menyimpan cache aplikasi. Atlas anatomi 3D memerlukan internet; data modelnya tidak diunduh sebagai bagian dari cache awal. Saat perangkat offline, halaman atlas menyediakan penjelasan, tombol coba lagi, dan tautan kembali ke materi. Font antarmuka Geist disimpan lokal; font judul dan ikon dari Google Fonts tetap memerlukan koneksi pada kunjungan pertama.

Tes regresi browser: jalankan `npx playwright install chromium` sekali, kemudian `npm run test:browser`. Tes membangun aplikasi produksi dan menjalankan preview sendiri untuk memeriksa service worker. Jika menggunakan Chromium yang sudah tersedia, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` ke path executable browser tersebut.

GitHub Actions menerbitkan build ke GitHub Pages setiap push ke main. Deployment tidak memerlukan kredensial akun atau Supabase. Berkas `.env` lokal tidak digunakan oleh alur belajar dan tidak diunggah.
