const TerminalId = require("../models/terminal.model");

const createTerminalId = async (req, res) => {
  try {
    var { name, terminalId } = req.body;

    name = name.trim().toLowerCase();
    terminalId = terminalId.trim().toLowerCase();

    const data = await TerminalId.create({
      name,
      terminalId,
    });

    if (!data)
      return res.status(400).json({ message: "TerminalId not created." });
    res.status(201).json("TerminalId created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "TerminalId already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateTerminalId = async (req, res) => {
  try {
    const { name, terminalId } = req.body;

    await TerminalId.findOneAndUpdate(
      {
        name: name.trim().toLowerCase(),
      },
      {
        terminalId: terminalId.trim().toLowerCase(),
      }
    );

    res.status(201).json("TerminalId updated successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTerminalIds = async (req, res) => {
  try {
    const data = await TerminalId.find();
    if (!data)
      return res.status(400).json({ message: "TerminalId not found." });
    res.status(200).json(data[0].terminalId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTerminalIdsInternal = async () => {
  try {
    const data = await TerminalId.find();
    return data[0].terminalId;
  } catch (error) {
    return [];
  }
};

module.exports = {
  createTerminalId,
  updateTerminalId,
  getAllTerminalIds,
  getAllTerminalIdsInternal,
};
