import RoomModel from "../Models/room.js";

// ─────────────────────────────────────────
// @desc    Create new room
// @route   POST /api/rooms
// @access  Admin
// ─────────────────────────────────────────
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, type, capacity } = req.body;

    if (!roomNumber) {
      return res.status(400).json({
        success: false,
        message: "Room number is required",
      });
    }

    // Check duplicate
    const exists = await RoomModel.findOne({ roomNumber });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: `Room ${roomNumber} already exists`,
      });
    }

    const room = await RoomModel.create({
      roomNumber,
      type:     type     || "classroom",
      capacity: capacity || 40,
    });

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Admin
// ─────────────────────────────────────────
export const getAllRooms = async (req, res) => {
  try {
    const { search, type } = req.query;

    let query = {};

    if (search) {
      query.roomNumber = { $regex: search, $options: "i" };
    }

    if (type) {
      query.type = type;
    }

    const rooms = await RoomModel.find(query)
      .sort({ roomNumber: 1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Admin
// ─────────────────────────────────────────
export const getRoomById = async (req, res) => {
  try {
    const room = await RoomModel.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Admin
// ─────────────────────────────────────────
export const updateRoom = async (req, res) => {
  try {
    const { roomNumber, type, capacity } = req.body;

    const room = await RoomModel.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Check duplicate roomNumber
    if (roomNumber && roomNumber !== room.roomNumber) {
      const exists = await RoomModel.findOne({ roomNumber });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: `Room ${roomNumber} already exists`,
        });
      }
    }

    if (roomNumber)             room.roomNumber = roomNumber;
    if (type)                   room.type       = type;
    if (capacity !== undefined) room.capacity   = capacity;

    await room.save();

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Admin
// ─────────────────────────────────────────
export const deleteRoom = async (req, res) => {
  try {
    const room = await RoomModel.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    await RoomModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};