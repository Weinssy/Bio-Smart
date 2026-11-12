# Audit Bio Smart dengan modern-web-guidance

Tanggal: 13 November 2026 (Asia/Jakarta).

## Kesimpulan

Fondasi project cukup baik: halaman dipisah melalui lazy loading, konten dan kuis tersedia secara lokal, navigasi memiliki landmark dan skip link, serta dialog pencarian/menu menggunakan dialog native. Lima tes unit dan build produksi lulus. Namun, pemeriksaan browser berhasil mereproduksi bug pergantian diagram, kekurangan aksesibilitas kuis, dan kegagalan atlas ketika offline.

Audit ini tidak mengubah source aplikasi. Laporan ini adalah satu-satunya perubahan pada file project yang dilacak Git. Temuan berikut diprioritaskan berdasarkan dampak terhadap alur belajar, bukan hanya hasil pemindai.

## Lingkup dan metode

- Membaca routing, halaman utama, materi, kuis, simulasi, komponen diagram, dialog, tema, konfigurasi PWA, dan tes yang ada.
- Menjalankan `modern-web-guidance search` dan mengambil panduan `accessibility`, `html`, dan `forms` melalui CLI skill.
- Menjalankan `legacy-scan src --json`. Pemindai memeriksa 33 panduan/35 aturan deterministik, sekitar 20% katalog, sehingga hasilnya bukan audit lengkap.
- Menjalankan `npm test`, `npm run lint`, dan `npm run build`.
- Memeriksa build produksi di Chromium melalui agent-browser: beranda, kuis, materi, pergantian subtopik, pencarian, menu ponsel, dan atlas offline.
- Menjalankan axe-core 4.12.1 pada beranda, soal kuis, serta materi mitosis setelah reproduksi bug. Menguji viewport materi dengan lebar 390 CSS px.

P2 berarti masalah yang layak diperbaiki dalam pekerjaan berikutnya; tidak ditemukan blocker build dalam pemeriksaan ini.

## Temuan

### 1. [P2] Kuis diagram mempertahankan pertanyaan dari subtopik sebelumnya

Lokasi: `src/components/materi/MateriDetail.jsx:161` dan `src/components/visual/InteractiveDiagram.jsx:25`.

Langkah reproduksi:

1. Buka `/#/materi/mod-1` pada subtopik membran sel.
2. Aktifkan mode **Kenali Bagian**.
3. Pilih subtopik **Pembelahan Sel (Mitosis & Meiosis)** tanpa keluar dari halaman materi.

Hasil aktual: judul dan gambar berubah menjadi mitosis, tetapi target kuis tetap **Glikoprotein & Glikolipid**, dengan penghitung **Soal 1 dari 4**. Mitosis mempunyai enam bagian dan ID hotspot yang berbeda, sehingga pertanyaan yang tertinggal tidak bisa dijawab dengan benar.

Penyebab: wrapper menggunakan `key={index}`. Dua subtopik menempatkan diagram pada indeks yang sama, sehingga React memakai instance `InteractiveDiagram` yang sama. Perubahan prop `diagram` memperbarui `parts`, tetapi tidak mereset `questions`, mode, skor, feedback, atau state error gambar.

Rekomendasi: beri identitas diagram yang mencakup ID subtopik, atau reset seluruh sesi saat identitas diagram berubah. Pastikan posisi zoom dan error gambar ikut direset. Tambahkan tes integrasi yang berpindah langsung dari kuis membran ke diagram mitosis.

### 2. [P2] Status jawaban terpilih tidak tersedia bagi pembaca layar

Lokasi: `src/components/quiz/QuizEngine.jsx:114`.

Pilihan merupakan tombol biasa. `isSelected` hanya mengubah border, latar, warna, dan bayangan. Setelah opsi B dipilih, accessibility tree tetap menampilkan tombol yang sama tanpa status checked/pressed. Pengguna pembaca layar tidak mempunyai informasi programatis tentang jawaban yang tersimpan.

Rekomendasi: gunakan radio native dengan `name` yang sama, `checked`, label, serta `fieldset`/`legend` untuk setiap soal. Ini sesuai panduan `forms`: **"Expose 2 to 5 mutually exclusive options as visible radio buttons"**. Tampilan kartu pilihan dapat dipertahankan. Jika memakai kontrol ARIA khusus, implementasikan juga pola keyboard radio secara utuh.

### 3. [P2] Pergantian langkah kuis tidak memindahkan fokus ke soal baru

Lokasi: `src/components/quiz/QuizEngine.jsx:31`, `:37`, dan `:43`.

Di browser, setelah **Selanjutnya** ditekan, soal berubah tetapi `document.activeElement` tetap tombol tersebut. Soal baru berada sebelum fokus dalam urutan DOM, sehingga pengguna keyboard harus kembali ke atas untuk mencapai opsi. Tidak ada mekanisme fokus atau pengumuman yang memperkenalkan soal baru. Transisi submit ke hasil juga tidak mengarahkan fokus ke ringkasan hasil.

Rekomendasi: arahkan fokus ke heading soal baru dengan `tabIndex={-1}`, lalu ke heading hasil saat submit; terapkan pula pada pengulangan kuis. Gunakan indikator progres semantik jika diperlukan. Panduan `forms` meminta **"move focus to the new step's heading"** untuk wizard dinamis. Mengganti label atau menambah animasi saja tidak menyelesaikan masalah ini.

### 4. [P2] Definisi glosarium hanya bisa dibuka dengan hover

Lokasi: `src/components/materi/MateriDetail.jsx:33`.

Istilah dirender sebagai `<span className="glossary-term" title={definition}>`. Span tidak dapat menerima fokus keyboard, tidak mempunyai aksi klik/tap, dan definisi hanya disediakan melalui tooltip browser. Pengguna keyboard tidak dapat membuka penjelasan tersebut; akses pada perangkat sentuh juga tidak konsisten.

Rekomendasi: sediakan kontrol yang dapat difokuskan dan diaktifkan dengan keyboard/tap, atau tampilkan definisi sebagai teks/disclosure yang dapat dibaca. Bila memilih popover/tooltip modern, tentukan dukungan browser dan fallback terlebih dahulu. Panduan `html` menyatakan **"DON'T use the `title` attribute to create tooltip effects"**.

### 5. [P2] Kerangka atlas tersedia offline, tetapi data modelnya tidak

Lokasi: `vite.config.js:31`.

Reproduksi: biarkan service worker aktif setelah membuka aplikasi, matikan jaringan pada browser, lalu buka `/#/anatomi`. Halaman dan kontrol atlas muncul, tetapi viewer menampilkan alert **Failed to fetch**. Halaman induk telah dikendalikan service worker saat pemeriksaan.

Konfigurasi Workbox hanya mencakup `js,css,html,ico,png,svg,json`. Manifest precache hasil build memuat HTML, JS, CSS, dan `atlas.json`, tetapi tidak memuat model `.bin`/`.bin.gz`. Tidak ada strategi runtime caching yang menangani model tersebut. Font lokal `.woff2` juga tidak masuk precache, meskipun kegagalan font pada kunjungan offline bersih belum diuji.

Rekomendasi: tetapkan cakupan offline secara eksplisit. Bila atlas harus tersedia offline, sediakan pengunduhan model sesuai permintaan dengan cache terbatas, indikator kesiapan, dan pemulihan kegagalan. Bila atlas memerlukan jaringan, tampilkan penjelasan dan aksi coba lagi yang sesuai. Jangan memasukkan seluruh binary ke precache awal tanpa mempertimbangkan ukuran: total semua file di `public` sekitar 96,8 MB desimal, termasuk salinan model terkompresi dan tidak terkompresi. Angka tersebut adalah ukuran file di disk, bukan ukuran transfer awal pengguna.

## Rekomendasi tambahan

- `InteractiveDiagram.jsx:365`: legenda memakai `li` dengan `onClick`, tanpa kontrol keyboard. Hotspot sudah berupa tombol, sehingga fungsi eksplorasi masih mempunyai alternatif keyboard; tetap ubah isi legenda menjadi tombol agar kontrol yang terlihat dapat dioperasikan secara konsisten.
- `MateriDetail.jsx:145` dan `InteractiveDiagram.jsx:218`: gambar materi/diagram tidak mempunyai `width`/`height` intrinsik atau rasio khusus yang menyimpan ruang sebelum gambar dimuat. Panduan `html` meminta **"specify `width` and `height` on all `<img>` tags"**. Ini potensi layout shift; audit ini tidak mengukur CLS dan tidak mengklaim ambang Core Web Vitals terlampaui.
- `CommandPalette.jsx:32` dan `Sidebar.jsx:63`: dialog native sudah dibuka dengan `showModal()`, tetapi masih memakai focus trap manual. Panduan `accessibility` menyatakan **"Don't implement focus traps for native modal dialogs"**. Ini peluang penyederhanaan, bukan bug penutupan dialog yang terbukti: Escape dan pengembalian fokus lulus pemeriksaan.
- Axe menemukan satu peringatan best-practice `landmark-unique` pada materi: sidebar aplikasi dan navigasi subtopik sama-sama menggunakan `aside` tanpa nama pembeda. Beri nama sesuai tujuan landmark.
- Lima tes yang ada mencakup pencarian, relasi data, keberadaan media, validitas jawaban, dan helper konfigurasi. Belum ada tes UI yang mencegah regresi perpindahan diagram, fokus wizard, atau offline atlas.

## Hal yang sudah terverifikasi baik

| Pemeriksaan | Hasil |
| --- | --- |
| Tes unit | 5/5 lulus |
| Lint | 0 error, 8 warning: satu escape tidak diperlukan dan tujuh peringatan Fast Refresh |
| Build produksi | Lulus; PWA menghasilkan 34 entri precache, 4.285,42 KiB menurut keluaran build |
| Axe beranda | 0 violation; satu aturan kontras memerlukan pemeriksaan manual pada enam node SVG |
| Axe soal kuis | 0 violation otomatis, meskipun pemeriksaan interaksi menemukan masalah state/fokus |
| Axe materi mitosis | 1 violation best-practice: landmark tanpa nama pembeda |
| Materi pada viewport 390 px | Lebar dokumen 390 px; tidak ada overflow horizontal tingkat dokumen pada state yang diperiksa |
| Dialog pencarian | Escape menutup dialog; fokus kembali ke tombol pencarian |
| Menu ponsel | Escape menutup dialog; fokus kembali ke tombol buka menu |

Pemindai legacy menghasilkan satu kandidat pada `ThemeContext.jsx:8`. Kandidat ini **ditolak sebagai false positive**: aplikasi dikunci ke mode terang, `toggleTheme` tidak melakukan apa pun, dan penyimpanan tema lama justru dihapus. Kondisi aturan tentang toggle override tema tersimpan tidak terpenuhi. Tidak ada alasan dari hasil scan ini untuk menambahkan dark mode.

## Urutan tindak lanjut

1. Perbaiki identitas/reset diagram dan tambahkan reproduksi sebagai tes integrasi.
2. Perbaiki semantik pilihan dan fokus pergantian langkah kuis.
3. Buat definisi glosarium dapat dibuka lewat keyboard dan sentuhan.
4. Tentukan cakupan offline atlas, lalu sesuaikan caching dan error state.
5. Rapikan legenda, reservasi ruang gambar, landmark, serta focus trap yang berlebih.

## Batas pemeriksaan

Tidak dilakukan validasi isi biologi secara ilmiah, audit keamanan menyeluruh, pengukuran performa perangkat nyata, pengujian screen reader nyata, pemeriksaan semua route/state, maupun pengujian lintas browser. Bundle atlas siap pakai diperiksa dari integrasi dan perilaku offline, bukan seluruh kode minified-nya. Lulus axe tidak berarti seluruh aksesibilitas sudah benar.

## Modern Web Guidance

Saya menggunakan `accessibility`, `html`, dan `forms` sebagai acuan audit dan rekomendasi. Saya juga mencari panduan offline caching; katalog pencarian tidak memberi panduan khusus service worker, sehingga temuan offline didasarkan pada konfigurasi, manifest build, dan reproduksi browser. Tidak ada perubahan implementasi yang diterapkan karena permintaan saat ini adalah analisis.
