const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/users/leaderboard
// @desc    Dapatkan pengguna dengan poin tertinggi
// @access  Private
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ totalPoints: -1 })
      .limit(5)
      .select('name totalPoints level profilePicture');

    res.json(topUsers);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// TAMBAHKAN KODE DI BAWAH INI
// ==========================================

// @route   PUT api/users/profile
// @desc    Update profil user (nama, email, foto)
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;
    
    // Cari user berdasarkan ID dari token
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    // Update field jika ada
    if (name) user.name = name;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;

    // Simpan perubahan
    await user.save();

    // Kembalikan data user terbaru
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      totalPoints: user.totalPoints,
      level: user.level,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Gagal memperbarui profil' });
  }
});

// @route   PUT api/users/change-password
// @desc    Ganti password user
// @access  Private
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validasi input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Mohon isi password saat ini dan password baru' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password baru minimal 6 karakter' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    // Cek apakah password lama benar
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password saat ini salah' });
    }

    // Set password baru (akan di-hash otomatis oleh User.js model)
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password berhasil diubah' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Gagal mengubah password' });
  }
});

module.exports = router;