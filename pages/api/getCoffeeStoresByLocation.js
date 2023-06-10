import { fetchCoffeeStores } from '@/lib/coffee-store';
import React from 'react'

const getCoffeeStoresByLocation = async (req, res) => {

    try {
        const { latLong, limit } = req.query;
        const response = await fetchCoffeeStores(latLong, limit);
        res.status(200)
        res.json(response)



    } catch (error) {
        console.error("there is an error" ,error)
        res.status(500)
        res.json("Oh, no ! something went to wrong",error)

    }

    //   return (

    //   )
}

export default getCoffeeStoresByLocation
