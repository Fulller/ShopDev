import mysql from "mysql2/promise";

// Tạo một pool kết nối
const pool = mysql.createPool({
  host: "localhost",
  port: 8801,
  user: "root",
  password: "rootpassword",
  database: "shopdev",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Hàm để tạo một mảng chứa dữ liệu mẫu
function generateData(batchSize, index_batchSize) {
  const data = [];
  for (
    let i = index_batchSize * batchSize;
    i < (index_batchSize + 1) * batchSize;
    i++
  ) {
    const saleDate = new Date(
      1990 + (i % 30),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );
    const amount = (Math.random() * 1000).toFixed(2);
    data.push([i, saleDate.toISOString().split("T")[0], amount]);
  }
  return data;
}

// Hàm để chèn dữ liệu theo batch
async function insertBatch(batchSize, index_batchSize) {
  const data = generateData(batchSize, index_batchSize);
  const placeholders = data.map(() => "(?, ?)").join(", ");
  const sql = `INSERT INTO sales (id, sale_date, amount) VALUES ${placeholders}`;
  const flattenedData = data.flat();

  try {
    await pool.execute(sql, flattenedData);
  } catch (err) {
    console.error("Error inserting batch:", err);
  }
}

// Hàm chính để chạy vòng lặp chèn dữ liệu
async function main() {
  const totalRecords = 100000; // Thay đổi số lượng bản ghi nếu cần
  const batchSize = 10000;
  const batches = totalRecords / batchSize;

  for (let i = 0; i < batches; i++) {
    await insertBatch(batchSize, i);
    console.log(`Batch ${i + 1}/${batches} inserted`);
  }

  // Đóng pool kết nối khi hoàn tất
  await pool.end();
}

main()
  .then(() => {
    console.log("All batches inserted successfully");
  })
  .catch((err) => {
    console.error("Error in main:", err);
  });
