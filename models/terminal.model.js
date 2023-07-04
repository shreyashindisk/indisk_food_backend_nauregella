const mongoose = require("mongoose");

const terminalIdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  terminalId: {
    type: String,
    required: true,
  },
});

const TerminalId = mongoose.model("TerminalId", terminalIdSchema);

module.exports = TerminalId;
