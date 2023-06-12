
const getCoffeeStoreById = (req, res) => {

    const { id } = req.query
    console.log(id,"ididididi")
    try {
        if (id) {
            res.json({ message: `Id is created :${id}` })
        } else {
            res.status(400)
            res.json({ message: "Id Must be Required," })
        }
    } catch (error) {
        res.status(500)
        console.log("Something Went Wrong", error)
    }
}

export default getCoffeeStoreById
