const { Sequelize } = require('sequelize');

// Khởi tạo kết nối theo Option 3
const sequelize = new Sequelize('hoidanit', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Tắt log SQL nếu không cần thiết
});

// Hàm kiểm tra kết nối
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Kết nối cơ sở dữ liệu thành công!');
  } catch (error) {
    console.error(' Kết nối cơ sở dữ liệu thất bại:', error.message);
  }
};

module.exports = { connectDB, sequelize };
