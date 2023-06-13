import { findRecordByFilter, getMinifiedRecords, table } from "@/lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  const { id } = req.body;
  try {
    if (req.method === "PUT") {
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = parseInt(record.voting) + parseInt(1);
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: { voting: calculateVoting },
            },
          ]);
          if (updateRecord) {
            const minifiedRecord = getMinifiedRecords(updateRecord);
            res.json(minifiedRecord);
          }
        } else {
          res.json({ message: "coffee store Id doesn't not exist", id });
        }
      } else {
        res.status(400);
        res.json({ message: "Id is Missing" });
      }
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Error upvoting coffee store ", error });
  }
};

export default favouriteCoffeeStoreById;
