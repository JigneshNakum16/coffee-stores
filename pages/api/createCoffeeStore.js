const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base("coffee-stores");

const createCoffeeStore = async (req, res) => {
  console.log("req", req);
  console.log("req.body", req.body);
  const { id, name, neighbourhood, address, imgUrl, voting } = req.body;
  if (req.method === "POST") {
    //find record
    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id=${id}`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          };
        });

        res.json(records);
      } else {
        //create record
        const createRecord = await table.create([
          {
            fields: {
              id,
              name,
              neighbourhood,
              address,
              imgUrl,
              voting,
            },
          },
        ]);

        const records = createRecord.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json({ records });
      }
    } catch (error) {
      console.log("Error Finding Store", error);
      res.status(500);
      res.json({ message: "Something went wrong", error });
    }
  }
};

export default createCoffeeStore;
