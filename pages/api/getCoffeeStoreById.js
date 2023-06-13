import { findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: `Id is could not found` });
      }
    } else {
      res.status(400);
      res.json({ message: "Id Must be Required," });
    }
  } catch (error) {
    res.status(500);
    console.log("Something Went Wrong", error);
  }
};

export default getCoffeeStoreById;
