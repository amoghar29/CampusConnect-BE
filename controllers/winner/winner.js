const Event = require("../../models/event");

async function getAllWinners(req, res) {
  const winners = await Event.find(
    { firstPlace: { $ne: null } },
    {
      __id: 1,
      title: 1,
      date: 1,
      clubName: 1,
      firstPlace: 1,
      secondPlace: 1,
      //   thirdPlace: 1,
    }
  );
  return res.status(200).json(winners);
}

module.exports = getAllWinners;
