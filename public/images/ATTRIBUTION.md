# Atribusi & Lisensi Aset Visual Bio Smart SMA

Dokumen ini mencatat status lisensi, atribusi, dan asal-usul seluruh aset visual yang digunakan pada aplikasi `Bio Smart (Weinssy/biosmart-sma)`.

---

## 1. Diagram Vektor Edukasi Lokal (100% Local-First & Offline Capable)

Seluruh diagram interaktif disimpan langsung di dalam repositori (`public/images/diagrams/`) dan diprecache secara otomatis oleh Service Worker (`vite-plugin-pwa` / Workbox) sehingga **100% dapat diakses secara luring (offline)** tanpa ketergantungan runtime ke server eksternal:

### A. Anatomi & Struktur Sel / Organ (Variant: `anatomy`)
1. **Model Mosaik Cair Membran Sel**
   * **File Lokal**: `public/images/diagrams/sel/membran-sel.svg`
   * **Status Karya**: *Adapted / Inspired Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 800 480"`), menggambarkan dwilapis fosfolipid, protein integral, glikoprotein, glikolipid, dan kolesterol.
   * **Referensi Asal**: Terinspirasi oleh skema *Cell membrane detailed diagram* karya Mariana Ruiz Villarreal (LadyofHats) di Wikimedia Commons (Public Domain).

2. **Anatomi Jantung Manusia**
   * **File Lokal**: `public/images/diagrams/sistem-organ/anatomi-jantung.svg`
   * **Status Karya**: *Adapted / Inspired Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 800 620"`) dengan empat ruang jantung dan panah penunjuk aliran darah.
   * **Referensi Asal**: Disesuaikan dari diagram jantung manusia oleh Wapcaplet di Wikimedia Commons (CC BY-SA 3.0).

3. **Sistem Pernapasan Manusia**
   * **File Lokal**: `public/images/diagrams/sistem-organ/sistem-pernapasan.svg`
   * **Status Karya**: *Adapted / Inspired Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 800 620"`) dengan trakea, bronkus, paru-paru, pembesaran alveolus, dan diafragma.
   * **Referensi Asal**: Terinspirasi oleh diagram respirasi karya Mariana Ruiz Villarreal (LadyofHats) di Wikimedia Commons (Public Domain).

### B. Diagram Alur & Proses Biologis (Variant: `process`)
4. **Tahapan Pembelahan Sel (Mitosis)**
   * **File Lokal**: `public/images/diagrams/sel/mitosis.svg`
   * **Status Karya**: *Original Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 960 590"`) dengan urutan pembelahan sel dari interfase hingga sitokinesis.
   * **Referensi Konseptual**: Kurikulum Biologi SMA (Campbell Biology & materi pembelajaran nasional). Bebas dari elemen pihak ketiga berhak cipta tertutup.

5. **Proses Perjalanan & Fertilisasi Manusia**
   * **File Lokal**: `public/images/diagrams/reproduksi/fertilisasi.svg`
   * **Status Karya**: *Original Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 960 670"`) dengan skema organ reproduksi dan pembesaran pembuahan, morula, serta implantasi.
   * **Referensi Konseptual**: Konsep fisiologi reproduksi manusia Biologi SMA.

### C. Diagram Berlapis / Berjenjang (Variant: `layered`)
6. **Piramida Makanan & Gizi Seimbang**
   * **File Lokal**: `public/images/diagrams/ekologi/piramida-makanan.svg`
   * **Status Karya**: *Original Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG berjenjang (`viewBox="0 0 800 580"`) dengan contoh makanan pokok, sayur dan buah, lauk-pauk, serta gula, garam, dan minyak.
   * **Referensi Konseptual**: Panduan Gizi Seimbang Kementerian Kesehatan RI & materi nutrisi biologi SMA.

---

### D. Ilustrasi modul tambahan

Enam ilustrasi ini dibuat sebagai vektor edukasi orisinal berdasarkan konsep dalam materi Bio Smart.

| Ilustrasi | Aset lokal |
| --- | --- |
| Kotak Punnett untuk persilangan ercis | `diagrams/genetika/persilangan-ercis.svg` |
| Tingkat organisasi di ekosistem kolam | `diagrams/ekologi/ekosistem-kolam.svg` |
| Peran miselium dalam pembentukan tempe | `diagrams/bioteknologi/fermentasi-tempe.svg` |
| Struktur neuron bermielin | `diagrams/regulasi/struktur-neuron.svg` |
| Pertahanan bawaan saat kulit terluka | `diagrams/imunologi/pertahanan-bawaan.svg` |
| Model kecocokan terinduksi pada enzim | `diagrams/metabolisme/kecocokan-enzim.svg` |

---

## 2. Ketergantungan Eksternal Runtime

* **Status:** **0% (NIHIL)**. Seluruh materi visual pembelajaran pada modul Biologi Sel, Genetika, Sistem Organ, dan Ekologi telah sepenuhnya dimigrasikan ke vektor lokal berkecepatan tinggi.
* Tidak ada permintaan HTTP/HTTPS runtime ke Wikimedia, Unsplash, maupun CDN gambar eksternal saat aplikasi dijalankan.

---

## 3. Kompatibilitas Deployment & PWA

* Seluruh berkas SVG terdaftar dalam Workbox precache (`dist/sw.js`) dan otomatis di-cache saat Service Worker terinstal.
* Kompatibel penuh dengan subpath base GitHub Pages: `/biosmart-sma/`.
