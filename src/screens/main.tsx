import { FC, useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { LocationList, SearchInput } from "../components";
import { DEFAULT_LOCATION } from "../helpers/constants";
import { geocoordinateResult, getGeocoordinate } from "../services";
import Weather from "./weather";

const Main: FC = () => {
  const [locations, setLocations] = useState<geocoordinateResult[]>([]);

  useEffect(() => {
    getCoordinate(DEFAULT_LOCATION);
  }, []);

  const getCoordinate = async (location: string) => {
    const currentLocationData = await getGeocoordinate(location);
    setLocations(currentLocationData.results);
  };

  const setSelectedLocation = (selectedLocation: geocoordinateResult[]) => {
    setLocations(selectedLocation);
  };

  return (
    <>
      <ImageBackground
        source={require("../imgs/weather.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainWeatherContainer}>
              <SearchInput getCoordinate={getCoordinate}></SearchInput>
            </View>
            {locations?.length > 1 ? (
              <LocationList
                updateLocation={setSelectedLocation}
                location={locations}
              ></LocationList>
            ) : (
              <Weather locations={locations} />
            )}
          </SafeAreaView>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  mainWeatherContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 25,
  },

  safeArea: {
    flex: 1,
  },

  image: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default Main;
