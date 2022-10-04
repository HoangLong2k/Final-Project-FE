const Traffic = require("./trafficModel");

module.exports = {
  saveData: async (req, res) => {
    const traffic = new Traffic({
      owner: req.body.owner,
      idNumber: req.body.idNumber,
      phoneNumber: req.body.phoneNumber,
      trafficNumber: req.body.trafficNumber,
      date: req.body.date,
      timeIn: req.body.timeIn,
      timeOut: req.body.timeOut,
      typeOfTraffic: req.body.typeOfTraffic,
      placeIn: req.body.placeIn,
      placeOut: req.body.placeOut,
    });

    try {
      await traffic.save();
      res.send("save success");
      console.log(traffic);
    } catch (err) {
      res.send(err);
    }
  },
};
