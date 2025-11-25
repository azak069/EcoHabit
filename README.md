<div align="center">
  <a href="https://github.com/nrfalahsa/ecohabit">
    <img src="https://raw.githubusercontent.com/nrfalahsa/EcoHabit/refs/heads/main/frontend/public/favicon/logo.png" alt="EcoHabit Logo" width="120" height="120">
  </a>

  <h1 align="center">EcoHabit 🌳</h1>

  <p align="center">
    <strong>Aplikasi Gamifikasi untuk Mengukur dan Meningkatkan Dampak Ekologis Personal.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Full_Stack-MERN-343a40?style=for-the-badge" alt="Full Stack MERN">
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
    <br>
    <img src="https://img.shields.io/badge/AI_Powered-Gemini-74737E?style=for-the-badge&logo=google-gemini&logoColor=white" alt="AI Powered by Gemini">
    <img src="https://img.shields.io/badge/Gamification-Badges_&_Levels-FFC107?style=for-the-badge&logo=badge&logoColor=white" alt="Gamification">
    <img src="https://img.shields.io/badge/Auth-JWT_Auth-D32F2F?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT Authentication">
  </p>
</div>

---

## 💡 Konsep & Manfaat Inti

**EcoHabit** adalah platform yang mengakui bahwa perubahan iklim dimulai dari kebiasaan sehari-hari. Aplikasi ini menyediakan kerangka kerja yang terstruktur dan memotivasi untuk melacak **dampak positif** yang Anda berikan.

### Mengapa Menggunakan EcoHabit?

1.  **Bukti Nyata Dampak:** Selain poin, lihat total penghematan Anda dalam kilogram CO2, liter air, dan gram plastik yang berhasil Anda kurangi.
2.  **Edukasi Berbasis AI:** Gunakan **Asisten Eco** untuk mendapatkan saran aktivitas hijau yang dipersonalisasi dan jawaban cepat atas pertanyaan lingkungan Anda.
3.  **Pengalaman Menantang:** Naikkan level dari 'Green Starter' hingga 'Climate Guardian' dan kumpulkan lencana eksklusif.

---

## 💻 Panduan Setup Lokal (Mulai dalam 4 Langkah)

Aplikasi ini menggunakan konfigurasi *monorepo* sederhana dengan folder `backend` (API) dan `frontend` (React App).

### Pra-Persiapan

Pastikan Anda telah menginstal perangkat lunak berikut sebelum memulai:

* **Node.js** (v18+ dianjurkan): Unduh dari [nodejs.org](https://nodejs.org/).
* **MongoDB Instance**: Anda bisa menggunakan MongoDB lokal atau layanan cloud seperti MongoDB Atlas.
* **Google Gemini API Key**: Daftar untuk mendapatkan kunci API di [Google AI Studio](https://ai.google.dev/).

### Langkah 1: Kloning & Instalasi Dependencies

Buka terminal Anda dan jalankan perintah berikut:

```bash
git clone [https://github.com/nrfalahsa/ecohabit.git](https://github.com/nrfalahsa/ecohabit.git)
cd EcoHabit

# Instalasi Dependencies di Backend
cd backend
npm install

# Instalasi Dependencies di Frontend
cd ../frontend
npm install
````

### Langkah 2: Konfigurasi Variabel Lingkungan

Buat file bernama **`.env`** di **kedua** direktori (`backend/` dan `frontend/`).

**Wajib:** Salin isi dari file **`.env.example`** yang terletak di setiap direktori (baik `backend/` maupun `frontend/`) ke dalam file `.env` baru tersebut, lalu **isi semua variabel yang kosong**.

  * **Untuk `backend/`:**

      * Buat file `.env` dari **`backend/.env.example`**.
      * Variabel kunci yang harus diisi: `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `EMAIL_USER`, dan `EMAIL_PASS`.

  * **Untuk `frontend/`:**

      * Buat file `.env` dari **`frontend/.env.example`**.
      * Pastikan nilai `REACT_APP_API_BASE_URL` adalah `http://localhost:5000/api`.

### Langkah 3: Database Seeding (Opsional)

Jika Anda memulai dengan database kosong dan ingin mengisi beberapa data awal seperti daftar aktivitas dan kutipan motivasi, jalankan skrip ini dari folder `backend`:

```bash
cd backend
node seed.js
```

### Langkah 4: Menjalankan Server

Gunakan **dua terminal terpisah** untuk menjalankan Backend dan Frontend secara bersamaan.

1.  **Terminal 1: Start API Server (Backend)**

    ```bash
    cd backend
    npm run dev
    # Server API akan berjalan di: http://localhost:5000
    ```

2.  **Terminal 2: Start React App (Frontend)**

    ```bash
    cd frontend
    npm start
    # Aplikasi web akan terbuka secara otomatis di browser Anda pada: http://localhost:3000
    ```

Akses aplikasi EcoHabit di `http://localhost:3000`.

-----

## 🧑‍💻 Pengembang Kontributor

Proyek ini terwujud berkat kontribusi:

| Foto | Peran | Username | GitHub |
| :--- | :--- | :--- | :--- |
| <img src="https://avatars.githubusercontent.com/u/174274132?v=4" width="50" height="50"> | **Backend** | nrfalahsa | [@nrfalahsa](https://github.com/nrfalahsa) |
| <img src="https://avatars.githubusercontent.com/u/229116972?v=4" width="50" height="50"> | **Frontend** | bayulaksana147-sudo | [@bayulaksana147-sudo](https://github.com/bayulaksana147-sudo) |
| <img src="https://avatars.githubusercontent.com/u/231007125?v=4" width="50" height="50"> | **Frontend** | azak069 | [@azak069](https://github.com/azak069) |

<div align="center">
  <p>
    EcoHabit: Tindakan kecil, dampak besar.<br>
    &copy; 2025 Superuser Team
  </p>
</div>
