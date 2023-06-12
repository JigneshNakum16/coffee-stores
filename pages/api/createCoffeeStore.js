const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

const table = base('coffee-stores')


const createCoffeeStore = async (req, res) => {
    if (req.method === "POST") {
        //find record
        const findCoffeeStoreRecoreds = await table.select({
            filterByFormula: `id="0"`
        }).firstPage()
        
        // const { id, name, neighbourhood, address, imgUrl, voting } = req.body;
        // console.log("@@@@@@",id)
        console.log("findCoffeeStoreRecoreds",
            findCoffeeStoreRecoreds
        )

        if (findCoffeeStoreRecoreds.length !== 0) {
            
            res.json(findCoffeeStoreRecoreds)
        } else {
            //create record
            res.json({ message: "create a record" })
        }


    }
}

export default createCoffeeStore
