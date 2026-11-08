# Bio Smart

Aplikasi belajar biologi SMA berbasis React dan Vite. Konten saat ini mencakup 8 modul, 38 subtopik, dan 8 kuis formatif, dengan diagram interaktif, simulasi osmosis, dan atlas anatomi 3D lokal.

## Menjalankan proyek

Gunakan Node.js 22.12+ atau Node.js 24+, kemudian:

```sh
npm ci
npm run dev
```

Materi, kuis, dan lab dapat digunakan tanpa konfigurasi akun. Untuk mengaktifkan autentikasi, salin `.env.example` ke `.env` dan isi URL Supabase serta publishable key atau anon key. Kunci `sb_secret_` dan JWT dengan peran `service_role` ditolak saat server/build dimulai.

Autentikasi mengakses tabel `public.profiles`. Repositori belum menyediakan migrasi skema dan kebijakan RLS untuk tabel tersebut. Hasil kuis dan kemajuan membaca belum disimpan lintas sesi atau disinkronkan ke akun.

## Perintah

```sh
npm run dev      # server pengembangan
npm run build    # bundle produksi dan service worker
npm run preview  # pratinjau hasil build
npm run lint     # pemeriksaan kode dengan oxlint
npm test         # tes pencarian, data, media lokal, dan konfigurasi akun
```

## Struktur utama

- `src/pages`: halaman beranda, materi, kuis, lab, anatomi, dan akun.
- `src/components/common`: navigasi, dialog pencarian, dan penanganan kegagalan halaman.
- `src/data/materiData.json`: modul, subtopik, dan glosarium.
- `src/data/quizData.json`: kuis dan pembahasannya.
- `src/styles`: token desain dan stylesheet aplikasi.
- `public/images`: diagram pembelajaran dan catatan atribusi.
- `public/human-atlas`: aplikasi atlas, aset, model 3D, dan atribusinya.
- `tests`: tes regresi dengan test runner bawaan Node.js.

Rute utama menggunakan HashRouter agar dapat dibuka di GitHub Pages: `/#/materi`, `/#/materi/mod-1?topik=sub-1-2`, `/#/kuis?quizId=quiz-sel`, `/#/laboratorium`, `/#/anatomi`, dan `/#/login`.

## Desain dan build

`DESIGN.md` memuat arah visual proyek. Tailwind CSS dikompilasi melalui PostCSS, sehingga styling aplikasi tidak bergantung pada skrip CDN. Font judul dan Material Symbols masih dimuat dari Google Fonts; font isi Geist disertakan di bundle.

Pemindaian Tailwind dibatasi ke komponen aktif. Folder `src/components/ui` berisi komponen lama yang belum digunakan, dengan sintaks Tailwind berbeda dan beberapa impor dependensi yang belum tersedia. Audit dan sesuaikan komponen tersebut sebelum menggunakannya.

Manifest PWA dihasilkan dari `vite.config.js`. Cache awal mencakup shell aplikasi dan diagram; model anatomi `.bin`/`.gltf` belum dicache untuk penggunaan luring. Dukungan pemasangan PWA dengan ikon SVG dapat berbeda antarplatform.

GitHub Actions membangun dan menerbitkan `dist` ketika ada push ke `main`. Variabel Supabase dibaca dari GitHub Secrets saat build. Perubahan lokal tidak otomatis menerbitkan situs sampai di-push.

Lihat [analisis dan arah pengembangan](docs/reports/project-review-2026-11-08.md) serta [hasil pemeriksaan antislop](docs/reports/antislop-delivery-2026-11-08.md).
