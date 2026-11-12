# Implementasi hasil audit modern-web-guidance

Tanggal: 13 November 2026 (Asia/Jakarta).

Acuan: [audit project](modern-web-guidance-review-2026-11-13.md).

Dokumentasi perubahan di GitHub: [issue #1](https://github.com/Weinssy/Bio-Smart/issues/1).

## Perubahan

| Temuan audit | Implementasi |
| --- | --- |
| Sesi diagram terbawa ke subtopik berikutnya | Identitas wrapper mencakup modul, subtopik, dan indeks diagram. Pergantian diagram membuat instance baru sehingga mode, pertanyaan, skor, error gambar, dan zoom direset. |
| Jawaban terpilih hanya dibedakan visual | Pilihan menjadi radio native dengan nama grup, label, state checked, dan fieldset yang terhubung ke pertanyaan. Tombol panah dan Space mengikuti perilaku radio browser. |
| Fokus tertinggal pada navigasi kuis | Fokus diarahkan ke judul soal ketika maju/mundur, ringkasan hasil saat submit, dan soal pertama saat mengulang. Progres memakai elemen progress native. |
| Glosarium hanya memakai title | Istilah menjadi tombol disclosure inline dengan aria-expanded, aria-controls, dan definisi yang muncul di alur teks. Dapat dibuka/tutup dengan Enter, Space, atau tap tanpa API eksperimental. |
| Atlas gagal tanpa penjelasan saat offline | Halaman mengenali status koneksi, menampilkan penjelasan, coba lagi, dan tautan materi saat offline. Viewer dimuat kembali ketika koneksi tersedia; pesan percobaan offline dibersihkan. |
| Legenda tidak dapat dioperasikan keyboard | Isi setiap item legenda menjadi tombol native. |
| Gambar tidak menyimpan ruang sebelum selesai dimuat | Enam diagram diberi metadata lebar/tinggi sesuai viewBox SVG; atribut tersebut diteruskan ke img. |
| Landmark materi tidak dibedakan | Sidebar aplikasi dan navigasi subtopik diberi nama yang berbeda. |
| Focus trap manual pada dialog native | Helper dihapus. Pencarian dan menu tetap menggunakan showModal, Escape, dan pemulihan fokus ke pemicu. |

Gaya kartu pilihan jawaban dipindahkan ke stylesheet. Radio yang dicentang mempunyai indikator native selain perubahan warna; border mempunyai ketebalan tetap agar pergantian pilihan tidak menggeser isi kartu.

## Batas offline atlas

Atlas ditetapkan sebagai fitur yang memerlukan internet. Model binary tidak diunduh sebagai bagian dari cache awal. Materi, kuis, diagram, simulasi, dan font Geist lokal tersedia offline setelah cache aplikasi produksi selesai disimpan. Font judul dan ikon dari Google Fonts masih memerlukan jaringan pada kunjungan pertama, sebagaimana dijelaskan di README.

Aset atlas dan decoder Draco dikeluarkan dari precache. Navigasi ke human-atlas dikecualikan dari fallback SPA agar iframe tetap menerima dokumen atlas aslinya. Cache awal hasil build berubah dari 34 entri/4.285,42 KiB menjadi 30 entri/654,44 KiB. Ini ukuran precache dari keluaran build, bukan pengukuran transfer atau Core Web Vitals.

Status online/offline browser menunjukkan konektivitas perangkat, bukan jaminan bahwa seluruh layanan jaringan bisa dijangkau. Saat online, viewer masih menyediakan penanganan error dan reload bawaannya; halaman induk juga menyediakan tombol muat ulang atlas.

## Verifikasi

- `npm test`: 5/5 tes unit lulus.
- `npm run test:browser`: build produksi dan 6/6 tes Playwright lulus.
- `npm run lint`: tidak ada error; delapan warning lama tetap ada, tanpa warning baru.
- `git diff --check`: lulus.
- Lebar/tinggi keenam diagram diperiksa dan cocok dengan viewBox file SVG masing-masing.
- Axe-core pada kuis ponsel, materi mitosis desktop, dan atlas offline: nol violation otomatis. Beberapa pemeriksaan kontras tetap berstatus incomplete pada motif banner dan angka hotspot, sehingga hasil ini bukan klaim kepatuhan aksesibilitas menyeluruh.
- Screenshot kuis diperiksa pada viewport 390 × 844 px. Pemeriksaan browser juga membuktikan masalah landmark sebelumnya sudah tidak muncul.

Enam regresi browser mencakup reset diagram/zoom dan pertanyaan mitosis yang dapat dijawab; radio serta fokus maju/mundur/hasil/ulang; glosarium keyboard; legenda keyboard; dialog ponsel dan pemulihan fokus; serta navigasi offline, coba lagi, pemulihan atlas tanpa meninggalkan halaman, dan kuis yang tetap dapat dibuka offline.

Tes dapat diulang dengan `npm run test:browser`. Pasang Chromium sekali menggunakan `npx playwright install chromium`, atau tentukan browser lokal melalui `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. Output dan trace pengujian diabaikan oleh Git. Build tidak diterbitkan ke layanan eksternal.

## Modern Web Guidance

- **forms**: Saya memakai radio native untuk pilihan eksklusif dan memindahkan fokus pada langkah kuis, mengikuti aturan "move focus to the new step's heading".
- **html**: Saya menambahkan dimensi sesuai aset untuk menyimpan ruang gambar, mengikuti aturan "specify `width` and `height` on all `<img>` tags".
- **accessibility**: Saya menghapus helper yang menduplikasi perilaku showModal, mengikuti aturan "Don't implement focus traps for native modal dialogs".
