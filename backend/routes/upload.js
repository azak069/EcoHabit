const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const auth = require('../middleware/auth');

// Konfigurasi Multer (Simpan di memori sementara)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Batas 10MB
});

// @route   POST api/upload/catbox
// @desc    Proxy upload ke Catbox
// @access  Private
router.post('/catbox', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang diupload' });
    }

    // Siapkan FormData untuk dikirim ke Catbox
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    // Kirim request Server-to-Server (Bypass CORS)
    const response = await axios.post('https://catbox.moe/user/api.php', formData, {
      headers: {
        ...formData.getHeaders()
      }
    });

    // Catbox mengembalikan URL sebagai text body jika sukses
    if (response.status === 200) {
        res.json({ url: response.data });
    } else {
        throw new Error('Gagal upload ke Catbox');
    }

  } catch (error) {
    console.error('Upload Proxy Error:', error.message);
    res.status(500).json({ message: 'Gagal memproses upload gambar' });
  }
});

module.exports = router;