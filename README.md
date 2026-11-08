# Bio Smart

Aplikasi pembelajaran biologi SMA tanpa akun. Seluruh materi, diagram, kuis, laboratorium virtual, dan atlas anatomi dapat langsung digunakan tanpa login atau konfigurasi Supabase. Rute lama `/#/login` diarahkan ke beranda.

## Menjalankan

Gunakan Node.js 22.12+ atau 24+. Jalankan `npm ci` lalu `npm run dev`. Untuk produksi gunakan `npm run build`; pemeriksaan kode memakai `npm run lint` dan `npm test`.

Konten tersimpan di `src/data`, diagram di `public/images`, dan atlas di `public/human-atlas`. Arah visual mengikuti `DESIGN.md`. Hasil kuis masih berada di sesi halaman dan belum disimpan lintas sesi.

GitHub Actions menerbitkan build ke GitHub Pages setiap push ke main. Deployment tidak memerlukan kredensial akun atau Supabase. Berkas `.env` lokal tidak digunakan oleh alur belajar dan tidak diunggah.
