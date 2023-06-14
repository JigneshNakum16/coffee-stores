import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Banner from "@/Components/banner";
import Card from "@/Components/card";
import { fetchCoffeeStores } from "@/lib/coffee-store";
import useTrackLocation from "@/hooks/use-track-location";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPE, StoreContext } from "../store/store.context";

export async function getStaticProps() {
  const coffeeStore = await fetchCoffeeStores();
  return {
    props: { coffeeStore },
  };
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();
  const [coffeeStoresError, setCoffeeStoresError] = useState("");

  const { dispatch, state } = useContext(StoreContext)
  const { latLong, coffeeStores } = state
  const res = latLong.replace(/ /g, "");

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const response = await fetch(`/api/getCoffeeStoresByLocation?latLong=${res}&limit=30`)
          const coffeeStores = await response.json()

          dispatch({
            type: ACTION_TYPE.SET_COFFEE_STORES,
            payload: {
              coffeeStores
            }
          })
          setCoffeeStoresError("");
        } catch (error) {
          setCoffeeStoresError(error.message);
        }
      }
    }
    setCoffeeStoresByLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Allows you to Coffee Stores" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating... " : "view store nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>something want wrong : {locationErrorMsg}</p>}
        {coffeeStoresError && <p>something want wrong : {coffeeStoresError}</p>}

        <div className={styles.heroImage}>
          <Image src={"/static/hero-image.png"} width={700} height={400} alt="hero-image"/>
        </div>
        {coffeeStores && coffeeStores?.length > 0 && (
          <>
            <h2 className={styles.heading2}>Share near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    ImgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                    }
                    href={`coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
        {props.coffeeStore?.length > 0 && (
          <>
            <h2 className={styles.heading2}>Surat stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStore.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore?.name}
                    ImgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                    }
                    href={`coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}
