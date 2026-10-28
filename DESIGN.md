# Design System: Bio Smart (BioSMA)

## 1. Visual Theme & Atmosphere
Bio Smart adalah platform web pembelajaran biologi interaktif berbasis Kurikulum Merdeka Fase F (Kelas XI & XII SMA). 
Atmosfer desain berakar pada karakter **"Clinical yet warm — modern biomolecular lab studio"**:
- **Density:** Daily App Balanced (skala 5/10) — visual lapang dengan keterbacaan tinggi, pernapasan layout optimal untuk fokus belajar.
- **Variance:** Offset Asymmetric (skala 6/10) — layout bento grid dinamis, split-hero terstruktur tanpa kekacauan visual.
- **Motion:** Fluid Spring (skala 6/10) — responsif dengan fisika pegas bobot terukur (`stiffness: 100, damping: 20`), mikromosi halus pada status aktif.

---

## 2. Color Palette & Roles
Palet warna menggunakan basis netral absolut (Zinc & Slate) dengan aksen tunggal hijau pinus botani (*Botanical Pine / Emerald*). Saturasi aksen terjaga di bawah 80%.

- **Canvas White** (`#fcfdfc` / `#f8faf9`) — Permukaan dasar aplikasi (light background).
- **Pure Surface** (`#ffffff`) — Kontainer kartu, modal dialog, dan popover.
- **Botanical Pine Primary** (`#004331` / `#0d5c46`) — Aksen tunggal untuk elemen interaktif utama, badge aktif, dan header brand.
- **Pine Container Light** (`#ecfdf5` / `#d1fae5`) — Latar belakang badge status, chip materi, dan kontainer sekunder.
- **Deep Slate Ink** (`#0d1c2f` / `#0f172a`) — Teks judul dan hierarki utama (kontras tinggi tanpa menggunakan pure black `#000000`).
- **Muted Steel** (`#475569` / `#64748b`) — Teks pendukung, deskripsi modul, dan metadata.
- **Whisper Border** (`rgba(226, 232, 240, 0.8)`) — Garis batas kartu dan pemisah struktural 1px.
- **Subtle Surface Tint** (`#f1f5f9` / `#e2e8f0`) — Latar belakang elemen form, search bar, dan hover state.

> **Catatan Pembatasan:**
> - Banned: Neon gradient, purple button glows, saturated outer glows.
> - Banned: Pure black `#000000`.

---

## 3. Typography Architecture
- **Display & Headlines:** `Plus Jakarta Sans` — Tight letter-spacing (`tracking-tight`), bobot `600`, `700`, dan `800`. Skala proporsional berbobot tanpa ukuran raksasa berlebihan.
- **Body & Paragraphs:** `Geist` — Tipografi sans kontemporer dengan leading rileks (`leading-relaxed`), panjang baris optimal maksimal 65 karakter per baris (`max-w-[65ch]`).
- **Monospace & Data:** `Geist Mono` / `ui-monospace` — Digunakan untuk parameter lab, rumus reaksi, kode spesimen, nilai pH/suhu, dan timestamp.
- **Banned:** Penggunaan font `Inter` untuk headline premium, dan font serif generik pada antarmuka dashboard.

---

## 4. Component Stylings
- **Buttons:**
  - Tombol primer: Flat background Pine (`#004331`), teks putih, transisi `active:scale-[0.98]` atau `active:translate-y-px` memberikan umpan balik taktil.
  - Tombol sekunder / outline: Border `1px solid rgba(226, 232, 240, 0.9)`, hover latar slate lembut (`#f8fafc`).
  - Dilarang: Efek glow neon berlebihan atau cursor kustom aneh.
- **Cards & Bento Grid:**
  - Radius sudut melengkung proporsional (`1rem` - `1.5rem` / `rounded-2xl` - `rounded-3xl`).
  - Shadow lembut menyatu (*whisper shadow*): `0 1px 3px rgba(0,0,0,0.04), 0 8px 16px -4px rgba(13, 92, 70, 0.05)`.
  - Divider atas (*accent top bar*) 2px untuk modul terfokus.
- **Badges & Chips:**
  - Gaya pil (*pill shape* / `rounded-full`) dengan padding `px-2.5 py-1 text-xs font-semibold`.
  - Warna kontras lembut berbasis Pine Container (`#ecfdf5` teks `#065f46`).
- **Search & Input:**
  - Label jelas, placeholder netral (`#94a3b8`), ring fokus aksen Pine (`focus:ring-2 focus:ring-pine-800/20 focus:border-pine-800`).
  - Indikator pintasan keyboard taktil (`Ctrl K` / `Enter`).

---

## 5. Layout Principles
- **Grid-First & Max-Width:** Seluruh kontainer dibatasi pada `max-w-7xl` (`1280px` - `1400px`) dengan padding horizontal responsif (`px-4 sm:px-6 lg:px-8`).
- **Asymmetric Structure:** Tata letak Split Hero (7:5) dengan preview kartu interaktif mikroskop di kanan dan call-to-action di kiri.
- **Katalog Terhubung 100% Valid:** Setiap kartu materi dan fitur terhubung ke rute nyata (`/materi/mod-1` s/d `/materi/mod-4`, `/laboratorium`, `/anatomi`, `/kuis`). Tidak ada link mati atau modul fiktif.
- **Mobile-First Collapse:**
  - Semua layout multi-kolom beralih ke 1 kolom pada viewport `< 768px`.
  - Menu navigasi mobile drawer yang responsif dan dapat dibuka-tutup dengan lancar.
  - Target sentuhan minimal `44px` untuk tombol dan navigasi touch.
  - Zero horizontal overflow (`overflow-x: hidden`).

---

## 6. Motion Philosophy
- **Spring Physics:** Transisi antarmuka menggunakan kurva pegas alami: `cubic-bezier(0.16, 1, 0.3, 1)` dengan durasi 180ms - 260ms.
- **Perpetual Micro-Interactions:** 
  - Status aktif berdenyut lembut (*gentle status pulse* 2s infinite).
  - Hover lift kartu: `translate-y-[-2px]` dengan penyesuaian bayangan lembut.
  - Indikator live mikroskop dengan animasi rotasi presisi CSS.
- **Hardware Acceleration:** Animasi dibatasi secara ketat pada properti `transform` dan `opacity` untuk menjamin rendering 60fps tanpa layout-shift.

---

## 7. Anti-Patterns (Banned)
- ❌ Tidak ada emoji yang menggantikan icon fungsional (gunakan icon SVG atau Material Symbols).
- ❌ Tidak ada teks header dengan gradien neon yang berlebihan.
- ❌ Tidak ada pure black (`#000000`).
- ❌ Tidak ada angka statistik fiktif atau persentase palsu (`99.99% UPTIME`, dsb.).
- ❌ Tidak ada tautan rusak atau kartu materi palsu (`mod-5`, `mod-6` yang tidak ada datanya).
- ❌ Tidak ada kalimat copywriting klise AI ("Unleash", "Next-Gen", "Seamless Experience").

