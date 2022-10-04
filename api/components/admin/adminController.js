const Traffic = require("../traffic/trafficModel");

module.exports = {
  getData: async (req, res) => {
    try {
      const data = await Traffic.find();
      res.json(data);
    } catch (err) {
      res.json({ message: err });
    }
  },
};
