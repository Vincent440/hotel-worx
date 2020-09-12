const db = require('../models/index.js')

module.exports = {
  getAllRoomTypes: (req, res) => {
    db.RoomType.selectAll(data => {
      res.json(data)
    })
  },
  createNewRoomType: (req, res) => {
    db.RoomType.insertOne(req.body.vals, result => {
      res.json({ id: result.insertId })
    })
  },
  getRoomTypeById: (req, res) => {
    db.RoomType.selectOne(req.params.id, data => {
      res.json(data)
    })
  },
  updateRoomTypeById: (req, res) => {
    db.RoomType.updateOne(req.body.vals, req.params.id, result => {
      if (result.changedRows === 0) {
        res.status(204).end()
      } else {
        res.status(200).end()
      }
    })
  },
  deleteRoomTypeById: (req, res) => {
    db.RoomType.deleteOne(req.params.id, data => {
      res.json(data)
    })
  },
  getAvailableRoomsByDate: (req, res) => {
    db.RoomType.selectAvailable(req.params.date, data => {
      res.json(data)
    })
  }
}
