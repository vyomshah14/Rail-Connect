const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const User = require("./models/User");

async function seedAdmin() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/Rail-connect";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const email = "admin@railconnect.com";
    const password = "adminpassword";
    const hashedPassword = await bcrypt.hash(password, 10);

    let admin = await User.findOne({ email });

    if (admin) {
      admin.password = hashedPassword;
      admin.role = "admin";
      await admin.save();
      console.log("Existing Admin account updated successfully!");
    } else {
      admin = await User.create({
        name: "System Admin",
        email,
        password: hashedPassword,
        role: "admin",
      });
      console.log("New Admin account created successfully!");
    }

    console.log("Admin Credentials:");
    console.log("Email: admin@railconnect.com");
    console.log("Password: adminpassword");
    console.log("Role: admin");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
