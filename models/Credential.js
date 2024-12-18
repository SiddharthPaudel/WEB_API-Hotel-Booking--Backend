const mongoose = require("mongoose");

const CredentialSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],  // Optional: specify allowed roles
    required: true
  }
});

const Credential = mongoose.model("Credential", CredentialSchema);
module.exports = Credential;
