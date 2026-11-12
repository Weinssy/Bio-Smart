# Perbaikan visual laboratorium osmosis

Dokumentasi perubahan: [GitHub issue #2](https://github.com/Weinssy/Bio-Smart/issues/2).

## Masalah dan hasil

Sebelumnya ilustrasi memakai seluruh lebar halaman dan kontrol konsentrasi berada di bawahnya. Pengguna desktop harus menggulir untuk mengatur percobaan, lalu kembali ke atas untuk melihat respons sel. Banner dan judul simulasi juga mengulang informasi yang sama.

Halaman kini menempatkan ruang pengamatan dan kontrol berdampingan pada desktop. Pada layar sempit susunannya menjadi satu kolom. Heading diperpendek, dan tautan teori langsung menuju materi Transport Membran.

## Perubahan

- Ilustrasi SVG diperbarui menjadi bidang pengamatan melingkar dengan eritrosit atau sel tumbuhan, panah berujung untuk aliran air, dan penjelasan tekstual yang mengikuti kondisi sel.
- Bentuk eritrosit membedakan kondisi stabil, membengkak, krenasi, dan hemolisis. Pada sel tumbuhan, dinding tetap berada di tempatnya sementara protoplas menyusut saat plasmolisis. Model tumbuhan tidak lagi membesar melampaui dindingnya pada kondisi hipotonik.
- Panel kontrol memuat radio spesimen, nilai konsentrasi besar, slider native, preset hipotonik/isotonik/hipertonik, dan Reset.
- Slider menggunakan label, satuan melalui aria-valuetext, area interaksi 44 px, indikator fokus, dan track/thumb terpisah untuk Blink/WebKit serta Firefox. Nilai fill dihitung dari state sehingga tidak bergantung pada typed attr atau progress CSS yang belum tersedia luas.
- Animasi aliran air bersifat opt-in, dapat dijeda, dan dinonaktifkan ketika pengguna memilih reduced motion. Panah dan keterangan tetap tersedia saat gambar statis.
- Status pengamatan diumumkan secara polite melalui role status. Nilai konsentrasi mempunyai output visual tanpa pengumuman ganda pada setiap langkah slider.
- Gaya laboratorium dipisahkan ke stylesheet khusus halaman. Tidak ada dependensi baru atau aset eksternal baru.

## Arah visual

Desain mengikuti DESIGN.md: permukaan terang, teks slate, dan aksen pine. Warna merah muda digunakan untuk eritrosit, hijau untuk struktur tumbuhan, dan teal untuk aliran air agar informasi biologis dapat dibedakan. Gradasi terbatas pada eritrosit untuk menggambarkan bentuk bikonkaf, bukan dekorasi halaman. Lingkar pengamatan membingkai spesimen tanpa menyiratkan ukuran terkalibrasi; ilustrasi diberi keterangan tidak berskala.

Kepadatan dikurangi dengan menghapus banner berulang. Hierarki utama adalah pengamatan, pengaturan, lalu penjelasan. ENERGY 2 / RHYTHM 2 / MOTION 1: gerakan hanya dipakai untuk menunjukkan arah air setelah diaktifkan pengguna.

## Verifikasi

- [x] `npm test`: 5/5 tes unit lulus.
- [x] `npm run test:browser`: build produksi dan 10/10 tes browser lulus, termasuk empat regresi baru untuk laboratorium.
- [x] `npm run lint`: 0 error; delapan warning lama tetap ada, tanpa warning baru.
- [x] `git diff --check`: lulus.
- [x] Screenshot desktop 1440 × 1000 dan ponsel 390 × 844 diperiksa.
- [x] Tidak ada overflow horizontal pada lebar 320, 390, dan 768 px.
- [x] Preset, pergantian spesimen, slider keyboard Home/End/panah, animasi, jeda, Reset, dan tautan teori diuji.
- [x] Reduced motion menjaga partikel tetap statis meskipun tombol animasi diaktifkan.
- [x] Axe-core pada eritrosit isotonik desktop dan tumbuhan hipertonik ponsel menghasilkan nol violation otomatis. Label dalam SVG masih memerlukan pemeriksaan kontras manual.
- [x] Kontras label H₂O pada putih: 5,80:1. Label Vakuola pada latarnya: 6,05:1.

Empat regresi baru tersimpan dalam `e2e/laboratory.pw.js`. Pemeriksaan otomatis dan inspeksi visual ini bukan pengujian screen reader atau lintas browser penuh.

## Batas model

Acuan NaCl 0,9%, rentang klasifikasi hipotonik/isotonik/hipertonik, dan ambang hemolisis mengikuti model pembelajaran sebelumnya. Simulasi tidak menyatakan bahwa angka tersebut adalah batas fisiologis universal untuk semua jenis sel; keterangan penyederhanaan tersedia di halaman.

## Modern Web Guidance

- **slider**: Saya mempertahankan input range native dan menggunakan custom property untuk fill agar tetap berjalan tanpa typed attr/progress CSS. Aturan yang diikuti: "Do not combine WebKit and Firefox pseudo-selectors into a single comma-separated list".
- **motion**: Saya membuat animasi opt-in dengan tombol putar/jeda dan membatasi gerak ke preferensi no-preference. Aturan yang diikuti: "Default to static views" dan "Provide a pause mechanism".
