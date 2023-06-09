// // const getUrlCoffeeStores = (latLong, query, limit) => {
// //     return `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&limit=${limit}`
// // }

// // const getUrlCoffeeStores = () => {
// //     return `https://api.foursquare.com/v3/places/search?ll=43.63770484065914, -79.39313143163827&query=coffee stores&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&limit=6`
// // }
// export const fetchCoffeeStores = async (latLong = "43.653833032607096%2C-79.37896808855945",
//     limit = 6) => {

//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
//         }
//     };

//     const response = await fetch(getUrlForCoffeeStores(latLong, "coffee", limit), options);

//     const data = await response.json();
//     return data.results || null
// }

//initialize unsplash

import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        perPage: 30,
    });
    const unsplashResults = photos.response?.results || [];
    return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
    latLong = "43.653833032607096%2C-79.37896808855945",
    limit = 6
) => {
    const photos = await getListOfCoffeeStorePhotos();
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
    };

    const response = await fetch(
        getUrlForCoffeeStores(latLong, "coffee", limit),
        options
    );
    const data = await response.json();
    // return data.results || null
    return data.results.map((result, idx) => {
        console.log(result)
        const neighborhood = result.location.neighborhood;
        return {
            id: result.fsq_id,
            address: result.location.address,
            name: result.name,
            neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : "",
            imgUrl: photos.length > 0 ? photos[idx] : null,
        };
    });
};
