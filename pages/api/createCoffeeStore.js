import { table, getMinifiedRecords } from "../../lib/airtable"

const createCoffeeStore = async (req, res) => {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;
    if (req.method === "POST") {
        //find record
        try {
            if (id) {
                const findCoffeeStoreRecords = await table
                    .select({
                        filterByFormula: `id="${id}"`,
                    })
                    .firstPage();

                if (findCoffeeStoreRecords.length !== 0) {
                    const records = getMinifiedRecords(findCoffeeStoreRecords)

                    res.json(records);
                } else {
                    //create record
                    if (name) {
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

                        const records = getMinifiedRecords(createRecord)

                        res.json(records);
                    } else {
                        res.status(400)
                        res.json({ message: "Id and Name Must be Required," })
                    }
                }
            } else {
                res.status(400)
                res.json({ message: "Id Must be Required," })
            }
        } catch (error) {
            console.log("Error Creating or Finding a Store", error);
            res.status(500);
            res.json({ message: "Error Creating or Finding a Store", error });
        }
    }
};

export default createCoffeeStore;
