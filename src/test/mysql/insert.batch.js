import mysql from "mysql2/promise";

// Tạo một pool kết nối
const pool = mysql.createPool({
  host: "localhost",
  port: 8801, // Tách riêng cổng
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
    data.push([i, `full name ${i}`, i % 100, `no.${i}/A/B/C`]);
  }
  return data;
}

// Hàm để chèn dữ liệu theo batch
async function insertBatch(batchSize, index_batchSize) {
  const data = generateData(batchSize, index_batchSize);
  const placeholders = data.map(() => "(?, ?, ?, ?)").join(", ");
  const sql = `INSERT INTO user (id, name, age, address) VALUES ${placeholders}`;
  const flattenedData = data.flat();

  try {
    await pool.execute(sql, flattenedData);
  } catch (err) {
    console.error("Error inserting batch:", err);
  }
}

// Hàm chính để chạy vòng lặp chèn dữ liệu
async function main() {
  const totalRecords = 1_000_000;
  const batchSize = 10_000;
  const batches = totalRecords / batchSize;

  for (let i = 0; i < batches; i++) {
    await insertBatch(batchSize, i);
    console.log(`Batch ${i + 1}/${batches} inserted`);
  }

  // Đóng pool kết nối khi hoàn tất
  await pool.end();
}

console.time("POOL");
main()
  .then(() => {
    console.log("All batches inserted successfully");
  })
  .catch((err) => {
    console.error("Error in main:", err);
  })
  .finally(() => {
    console.timeEnd("POOL");
  });
