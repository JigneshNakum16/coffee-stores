import { ACTION_TYPE, StoreContext } from '../store/store.context'
import React, { useContext, useState } from 'react'

const useTrackLocation = () => {

    const [locationErrorMsg, setLocationErrorMsg] = useState("")
    const [isFindingLocation, setIsFindingLocation] = useState(false)
    const { dispatch } = useContext(StoreContext)

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch({
            type: ACTION_TYPE.SET_LAT_LONG,
            payload: { latLong: `${latitude} , ${longitude}` }
        })
        setLocationErrorMsg("");
        setIsFindingLocation(false)

    }
    const error = () => {
        setIsFindingLocation(false)
        setLocationErrorMsg("Unable to retrieve your location");

    }

    const handleTrackLocation = () => {
        setIsFindingLocation(true)
        if (!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser");
            setIsFindingLocation(false)

        } else {

            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return {
        locationErrorMsg,
        handleTrackLocation,
        isFindingLocation
    }

}

export default useTrackLocation
