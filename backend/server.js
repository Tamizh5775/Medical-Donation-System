const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Use MySQL Connection Pool for Better Performance
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "RedTrex",
    database: "medicine_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    } else {
        console.log("Connected to MySQL Database!");
        connection.release();
    }
});

// ✅ Get All Donations
app.get("/donations", (req, res) => {
    const sql = "SELECT * FROM donations ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching donations:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ✅ Add a Donation
app.post("/donate", (req, res) => {
    const { name, quantity, image, expire_date, address, donating_date, urgency } = req.body;

    if (!name || !quantity || !expire_date || !address) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "INSERT INTO donations (name, quantity, image, expire_date, address, donating_date, urgency) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [name, quantity, image, expire_date, address, donating_date, urgency], (err, result) => {
        if (err) {
            console.error("Error inserting donation:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Donation added successfully!", id: result.insertId });
    });
});

// ✅ Request a Donation (With Stock Check)
app.post("/request-donation", (req, res) => {
    const { donation_id, requester_name, quantity, request_date } = req.body;

    if (!donation_id || !requester_name || !quantity || !request_date) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if requested quantity is available
    const checkStockSql = "SELECT quantity FROM donations WHERE id = ?";
    
    db.query(checkStockSql, [donation_id], (err, results) => {
        if (err) {
            console.error("Error checking stock:", err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Donation not found" });
        }

        const availableQuantity = results[0].quantity;

        if (quantity > availableQuantity) {
            return res.status(400).json({ error: `Only ${availableQuantity} available for request.` });
        }

        // Proceed with request insertion
        const requestSql = "INSERT INTO requests (donation_id, requester_name, quantity, request_date) VALUES (?, ?, ?, ?)";
        
        db.query(requestSql, [donation_id, requester_name, quantity, request_date], (err, result) => {
            if (err) {
                console.error("Error inserting request:", err);
                return res.status(500).json({ error: err.message });
            }

            // Update donation quantity after successful request
            const updateDonationSql = "UPDATE donations SET quantity = quantity - ? WHERE id = ?";
            
            db.query(updateDonationSql, [quantity, donation_id], (err) => {
                if (err) {
                    console.error("Error updating donation stock:", err);
                    return res.status(500).json({ error: err.message });
                }

                res.json({ message: "Request submitted successfully!", id: result.insertId });
            });
        });
    });
});

// ✅ Get All Requested Donations
app.get("/requests", (req, res) => {
    const sql = `
        SELECT r.id, r.requester_name, r.quantity, r.request_date, d.name AS medicine_name
        FROM requests r
        JOIN donations d ON r.donation_id = d.id
        ORDER BY r.request_date DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching requests:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});