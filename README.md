# 🕌 Lazismu Lengkong - Landing Page

> Landing Page untuk Lembaga Amil Zakat Infaq Sedekah Muhammadiyah (Lazismu) Kecamatan Lengkong, Kota Bandung.

![Lazismu Lengkong](https://img.shields.io/badge/Lazismu-Lengkong-F7941D?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyMWMtMy4xNzMgMC01Ljk4Mi0xLjAwOC04LjM1LTIuNjA5bDQuMzUtNC4zNWMxLjE2NC43NjUgMi42MTUgMS4yMzIgNC4yMTUgMS4yMzIgMi43NTcgMCA0Ljk3LTEuNzM0IDUuODItNC4yNzNoLTUuODJWN2gxMHYzYzAgNS41MjMtNC40NzcgMTEtMTEgMTF6Ii8+PC9zdmc+)
![Version](https://img.shields.io/badge/Version-1.0.0-00A651?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📖 Tentang

Lazismu Lengkong adalah lembaga filantropi yang berada di bawah **Pimpinan Cabang Muhammadiyah (PCM) Lengkong**, Kota Bandung. Landing page ini dibuat untuk memfasilitasi pengumpulan Zakat, Infaq, dan Sedekah (ZIS) dari masyarakat, khususnya warga Kecamatan Lengkong dan Kota Bandung.

### 🏠 Amal Usaha

- **LKSA Taman Harapan** - Panti asuhan tertua di Muhammadiyah Jawa Barat
- **SD Muhammadiyah Lengkong**
- **SMP Muhammadiyah Lengkong**
- **SMA Muhammadiyah Lengkong**
- **Kegiatan Dakwah** - Kajian rutin, bakti sosial, dan pemberdayaan masyarakat

## ✨ Fitur

### 🧮 Ramadan Impact Calculator (Konsep ScoreApp)
Menggunakan konsep **ScoreApp** dari **Daniel Priestley** untuk memberikan pengalaman interaktif kepada donatur:
- Multi-step assessment form
- Perhitungan zakat otomatis
- Personalized impact report
- Lead generation terintegrasi

### 🎨 Desain Modern
- Responsive design (Mobile First)
- Gradasi warna khas Lazismu (Orange/Gold)
- Animasi smooth dengan AOS library
- UI/UX yang user-friendly

### 💳 Multi Payment Methods
- QRIS
- Transfer Bank (BSI)
- Konfirmasi via WhatsApp
- Layanan Jemput Zakat

### 📊 Social Proof
- Live donation counter
- Testimonial slider
- Trust badges
- Program progress tracker

## 🛠️ Teknologi

- **HTML5** - Struktur semantik
- **CSS3** - Custom properties, Flexbox, Grid
- **JavaScript** - Vanilla JS (No framework)
- **AOS** - Animate On Scroll library
- **Font Awesome** - Icon library
- **Google Fonts** - Plus Jakarta Sans & Amiri

## 📁 Struktur Folder

```
Lazismu_Lengkong/
├── index.html          # Halaman utama
├── css/
│   └── style.css       # Stylesheet utama
├── js/
│   └── main.js         # JavaScript utama
├── assets/
│   └── images/         # Gambar dan logo
└── README.md           # Dokumentasi
```

## 🚀 Cara Menggunakan

### 1. Clone Repository
```bash
git clone https://github.com/BroAegg/Lazismu_Lengkong.git
cd Lazismu_Lengkong
```

### 2. Buka di Browser
Cukup buka file `index.html` di browser, atau gunakan live server:

**Dengan VS Code Live Server:**
1. Install extension "Live Server"
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

**Dengan Python:**
```bash
python -m http.server 8000
```
Kemudian buka `http://localhost:8000`

## ⚙️ Konfigurasi

### Mengubah Nomor WhatsApp
Edit file `js/main.js`, cari variabel `waNumber`:
```javascript
const waNumber = '6281234567890'; // Ganti dengan nomor WhatsApp Anda
```

### Mengubah Nomor Rekening
Edit file `index.html`, cari bagian `.bank-info`:
```html
<span class="account-number">7123456789</span>
```

### Menambahkan Gambar
Letakkan gambar di folder `assets/images/` dan update referensi di HTML:
- `logo-lazismu.png` - Logo Lazismu
- `logo-muhammadiyah.png` - Logo Muhammadiyah
- `og-image.jpg` - Gambar untuk social media share

## 🎯 Konsep Marketing (Daniel Priestley)

Landing page ini dibangun dengan prinsip **ScoreApp Scorecard Marketing**:

1. **The Hook** - Headline yang menghentikan scroll
2. **The Assessment** - Kalkulator interaktif
3. **The Value** - Personalized impact report
4. **The Authority** - Trust signals & legacy story
5. **The Solution** - Pilihan program donasi
6. **Social Proof** - Testimoni & live counter
7. **Direct CTA** - Multi-channel payment

## 👥 Tim Pengembang

| Developer | Role |
|-----------|------|
| **Aegner** | Lead Developer |
| **Revan** | Co-Developer |

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📞 Kontak

**Lazismu Lengkong**
- 📍 Jl. Burangrang, Kec. Lengkong, Kota Bandung
- 📱 WhatsApp: +62 812-3456-7890
- 📧 Email: lazismu.lengkong@gmail.com

---

<p align="center">
  <em>"Memberi untuk Negeri, Berbagi dari Lengkong"</em>
</p>

<p align="center">
  Developed with ❤️ by <strong>Aegner</strong> & <strong>Revan</strong>
</p>
