# Pemeriksaan antislop Bio Smart

Tanggal: 8 November 2026. Mode during, dipilih pengguna untuk sesi ini.

Status: **PASS untuk lingkup perubahan** pada beranda, katalog, navigasi bersama, dialog pencarian, perbaikan alur materi/kuis, form akun, dan informasi model lab. Ini bukan sertifikasi aksesibilitas seluruh konten lama atau aplikasi atlas di dalam iframe.

## Arah dan alasan desain

Design Read: ruang belajar biologi SMA dengan bahasa visual studio laboratorium yang tenang, mengikuti `DESIGN.md`. Dials: ENERGY 2 / RHYTHM 2 / MOTION 1.

| Keputusan | Alasan |
| --- | --- |
| Hijau pinus dengan permukaan putih dan putih kehijauan | Melanjutkan identitas botani proyek; bidang pinus menandai materi awal sebagai fokus utama. |
| Plus Jakarta Sans untuk judul dan Geist untuk isi | Mengikuti arsitektur tipografi yang sudah ditetapkan pemilik proyek; judul ringkas dan paragraf terpisah secara hierarki. |
| Satu shell navigasi untuk halaman belajar | Mengurangi perubahan konteks ketika siswa berpindah antara materi, kuis, dan alat belajar. |
| Bidang materi sel berdampingan dengan diagram | Mempertemukan pertanyaan belajar dengan objek pengamatan yang benar-benar tersedia di repositori. |
| Daftar topik memakai baris, alat praktik memakai dua panel dan satu baris kuis | Bentuk mengikuti jenis isi: topik untuk dipilih, alat untuk digunakan, kuis sebagai evaluasi. |
| Jarak antarseksi lebih besar daripada jarak di dalam kontrol | Memisahkan pengantar, pemilihan materi, dan kegiatan pengamatan tanpa membingkai semua isi sebagai kartu. |
| Diagram membran dan ikon navigasi yang sudah ada | Diagram relevan dengan modul pertama; ikon buku, lab, atlas, dan kuis menjelaskan tujuan navigasi. Tidak membuat aset atau logo baru. |
| Panah hanya pada perpindahan ke materi/alat | Menandai tujuan navigasi; tombol pencarian, form, dan kontrol dialog memakai teks tindakan. |
| Kartu modul memakai border; bayangan hanya pada modal | Modul berada pada satu tingkat permukaan; modal memerlukan penanda elevasi. |
| Transisi hover dan pressed yang singkat | Memberi umpan balik tindakan tanpa gerakan berulang yang mengganggu proses membaca. |
| Tema terang yang sudah dipakai proyek | Mempertahankan canvas yang ditetapkan dalam `DESIGN.md` dan perilaku ThemeProvider yang mengunci tema terang. Tidak menambahkan toggle yang tidak bekerja. |

## Hard Gate

- R-02 PASS: copy baru pada beranda, katalog, dialog, dan laporan tidak menggunakan em dash. Isi materi lama dipertahankan.
- R-03 PASS: beranda diperiksa pada 320/390/768/1440 px, katalog pada 320 px; tidak ada overflow isi. Target baru minimal 44 px; preset dan slider lab juga disesuaikan.
- R-17 PASS: jumlah modul/subtopik/kuis dihitung dari data sumber. Progres contoh tidak dipakai pada beranda.
- R-18 PASS: tidak membuat testimoni atau identitas siswa fiktif.
- R-23 PASS: memakai ulang diagram dan identitas yang sudah ada; tujuan navigasi utama tetap memakai halaman aplikasi yang tersedia.
- R-24 PASS: seluruh tujuan navigasi bersama dibuka; katalog, lab, atlas, kuis, dan akun tersedia.
- R-25 PASS: pemeriksaan warna DOM beranda dan katalog tidak menemukan teks di bawah ambang AA. Sampel minimum beranda 5,72:1 dan katalog desktop 5,25:1; border input terhadap putih 3,53:1 untuk batas kontrol.
- R-26 PASS: tautan beranda/katalog menuju halaman nyata; pencarian, pemulihan, kuis, dialog, dan kontrol lab menghasilkan perubahan yang diamati.
- R-27 PASS: route memiliki loading berteks, ErrorBoundary memiliki tindakan muat ulang/beranda, dan pencarian memiliki keadaan kosong serta pemulihan. Fallback render gagal diperiksa dari kode.
- R-28 PASS: tidak menambah FAQ.
- R-32 PASS: skip link memfokuskan main tanpa mengubah hash rute; Shift+Tab pada awal menu berputar ke kontrol terakhir; Escape mengembalikan fokus ke tombol menu/pencarian. Outline global dipertahankan.
- R-33 PASS: implementasi dilakukan langsung di file sumber melalui patch; tidak ada skrip yang menulis ulang CSS atau source aplikasi.
- R-34 PASS: tidak menambah toggle tema; mode terang yang dikirim diperiksa pada halaman yang berubah.
- R-35 PASS: build produksi berhasil dan daftar click-through tercatat di bawah. Log browser yang diperiksa tidak mencatat error.
- R-36 PASS: tidak membuat klaim performa, sertifikasi, atau pengguna. Nilai MPa yang tidak dihitung secara fisik dihapus dari lab.
- R-37 PASS: `DESIGN.md` dibaca sebelum implementasi; Design Read dan dials dinyatakan sebelum perubahan.
- R-38 PASS: copy membahas fitur yang tersedia. Tidak membuat metrik hasil belajar, review, atau identitas pengganti.
- R-39 PASS: kontrol baru memakai elemen native, label terlihat, nama aksesibel, cursor pointer, serta status hover/fokus/pressed. Motion global menghormati prefers-reduced-motion; tidak ada animasi dekoratif berulang pada beranda baru.
- R-40 PASS: gambar utama memakai img dengan dimensi 800×600 dan fetchPriority high; iframe diberi dimensi; skrip Tailwind CDN di head dihapus. Skor Lighthouse dan Web Vitals tidak diklaim.

## Purpose-Gate

- R-01 PASS: pinus menandai fokus materi; permukaan lain netral. Tidak menambah gradient/glow dekoratif.
- R-04 PASS: mempertahankan ikon fungsional yang sesuai tujuan menu, tanpa ikon sparkle atau magic baru.
- R-06 PASS: font mengikuti DESIGN.md, dengan body untuk pembacaan dan judul untuk hierarki; tidak menambah tipografi terminal atau label dengan tracking lebar.
- R-07 PASS: tidak membuat latar grid, blueprint, atau pola titik dekoratif.
- R-08 PASS: panah menunjukkan perpindahan halaman, dengan alasan di tabel keputusan.
- R-09 PASS: label Fase F menjelaskan sasaran materi; tidak menambah badge klaim teknologi atau performa.
- R-10 PASS: shell, katalog, dan dialog baru memakai permukaan solid, tanpa backdrop blur berlapis.
- R-12 PASS: modal memakai bayangan untuk elevasi; daftar topik/modul berada pada permukaan datar.
- R-13 PASS: tidak menambahkan efek glow.
- R-14 PASS: daftar topik, objek pengamatan, dua alat praktik, dan baris evaluasi mempunyai komposisi sesuai fungsi; keseragaman kartu katalog menjaga pemilihan materi yang setara.
- R-19 PASS: transisi menyampaikan hover/pressed; animasi berulang dari hero lama dihapus.
- R-22 PASS: diagram lokal berkaitan langsung dengan modul sel; tidak memakai ilustrasi karakter generik.

## Liveliness dan Quality Locks

- Dials PASS: ENERGY 2, RHYTHM 2, MOTION 1 dinyatakan dan diterapkan.
- Focal point PASS: bidang hijau materi sel menjadi pusat perhatian beranda; input dan daftar hasil menjadi fokus katalog.
- Whitespace PASS: jarak membedakan materi awal, pencarian, dan kegiatan pengamatan; jarak mobile diperkecil.
- Accent PASS: pinus dipakai pada materi unggulan, navigasi aktif, dan tindakan utama.
- Identity PASS: penomoran modul dan bingkai objek pengamatan menghubungkan UI dengan kegiatan belajar biologi.
- Design Read PASS: dinyatakan sebelum implementasi dan dicatat di atas.
- C-1/R-31 PASS: setiap keputusan utama memiliki alasan tertulis.
- C-2 PASS: seluruh kontrol yang dibangun memiliki tindakan nyata, dengan hasil browser dicatat.
- C-3/R-05 PASS: komposisi mengikuti pemilihan materi, pengamatan, dan evaluasi; tidak menambah seksi pemasaran pengisi.
- C-4 PASS: perubahan diperiksa pada keadaan data normal/kosong, ukuran ponsel/desktop, dan input keyboard; fallback kegagalan tersedia.
- C-5 PASS: angka berasal dari dataset atau hasil pemeriksaan; batas pemeriksaan dijelaskan.
- R-11 PASS: bidang materi beradius besar, input/tombol beradius lebih kecil; tidak semua komponen berbentuk pil.
- R-15 PASS: CTA menyebut tindakan, seperti Pelajari biologi sel, Cari materi, dan Tampilkan semua modul.
- R-16 PASS: copy baru menjelaskan apa yang dipelajari atau dilakukan, tanpa buzzword pemasaran.
- R-20 PASS: objek membran dan pengurutan materi membentuk identitas aplikasi biologi.
- R-21 PASS: mempertahankan tema terang proyek dengan alasan canvas belajar; tidak mengirim toggle kosong.
- R-29 PASS: permukaan netral dengan aksen pinus; warna diagram lama dipertahankan karena menjelaskan komponen biologis.
- R-30 PASS: tidak menyalin produk lain sebagai template.

## Click-through browser

| Elemen | Hasil yang diamati |
| --- | --- |
| Brand sidebar, Beranda, brand header | Membuka beranda. |
| Materi, Lihat semua 8 modul, Katalog Modul | Membuka katalog. |
| Laboratorium, Mulai praktikum, Buka lab osmosis, panel praktikum, Lab Virtual footer | Membuka simulasi. |
| Anatomi 3D sidebar/footer, panel pengamatan 3D | Membuka atlas. Model tubuh selesai dimuat; tombol front view mengubah aria-pressed menjadi true. |
| Kuis, panel evaluasi, Bank Kuis footer | Membuka daftar kuis. |
| Masuk akun | Membuka form akun. |
| Pelajari biologi sel, Amati bagian-bagiannya | Membuka modul sel. |
| Empat baris topik beranda | Membuka modul 1, 2, 3, dan 4 sesuai label. |
| Delapan kartu katalog | Dibuka satu per satu; judul halaman sesuai judul kartu. |
| Pencarian beranda “genetika” | URL q diteruskan dan katalog menyempit sesuai hasil. |
| Filter katalog “mosaik cair” | Menampilkan modul sel saja. |
| Filter “materi-tidak-ada” | Keadaan kosong muncul; Tampilkan semua modul mengembalikan 8 modul. |
| Pencarian global “Organel Sel” + Enter | Membuka mod-1 dengan topik sub-1-2 yang aktif. |
| Pencarian global tanpa hasil | Pesan tidak ada hasil muncul. |
| Ctrl+K, Escape, Tutup | Dialog terbuka, fokus di input; ditutup melalui Escape/kontrol tutup dan fokus kembali ke pemicu. |
| Menu ponsel, Escape, link Beranda | Drawer terbuka/tertutup dan navigasi berpindah halaman. Shift+Tab dari awal membungkus ke akhir; fokus kembali ke tombol menu. |
| Lewati ke isi utama | Fokus menuju elemen main; hash rute tidak berubah. |
| Subtopik 6 modul sel, Kerjakan Kuis Modul | Menuju /kuis?quizId=quiz-sel. |
| Pilihan jawaban dan Selanjutnya | Lima soal dapat diisi dan dinavigasi. |
| Kirim Jawaban | Hasil dan pembahasan tampil. |
| Ulangi Kuis Formatif, Kembali ke Daftar Kuis | Jawaban direset dan daftar kembali muncul. |
| Form masuk kosong | Browser menandai email wajib dan memfokuskannya; tidak mengirim kredensial. |
| Tampilkan kata sandi, Daftar Baru, Masuk | Tipe input berubah, form daftar ditampilkan, dan tab masuk dapat dibuka kembali. |
| Preset lab, jenis sel, slider keyboard | Status berubah ke krenasi/plasmolisis/turgid sesuai kontrol model; ArrowRight mengubah nilai slider. |

Pemeriksaan ini tidak mengirim login atau pendaftaran sungguhan, mengaudit database, menguji setiap hotspot atlas, atau mengukur Web Vitals. Kontras aset SVG/atlas dan materi lama memerlukan audit tersendiri. Pengujian ponsel memakai viewport browser, bukan perangkat fisik dengan keyboard virtual.
