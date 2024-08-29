import React, { FC, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { LocationList, SearchInput } from "../components";
import { DEFAULT_LOCATION } from "../helpers/constants";
import { geocoordinateResult, getGeocoordinate } from "../services";
import Weather from "./weather";

const Main: FC = () => {
  const [locations, setLocations] = useState<geocoordinateResult[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchCoordinates = async (location: string) => {
    try {
      const currentLocationData = await getGeocoordinate(location);
      setLocations(currentLocationData.results || []);
      console.log(currentLocationData.results);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const getCoordinate = useCallback((location: string) => {
    fetchCoordinates(location);
  }, []);

  useEffect(() => {
    getCoordinate(DEFAULT_LOCATION);
  }, [getCoordinate]);

  const setSelectedLocation = useCallback(
    (selectedLocation: geocoordinateResult[]) => {
      setLocations(selectedLocation);
    },
    []
  );

  const LoadingView = () => (
    <View style={[styles.containerLoading, styles.horizontal]}>
      <ActivityIndicator size="large" color="#87CEEB" />
    </View>
  );

  const showWeatherView = () => (
    <>
      {locations.length === 0 || locations.length > 1 ? (
        <LocationList
          updateLocation={setSelectedLocation}
          location={locations}
        ></LocationList>
      ) : (
        <Weather locations={locations.length ? locations : null} />
      )}
    </>
  );

  return (
    <View testID="main-component" style={styles.container}>
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
            {isLoading ? <LoadingView /> : showWeatherView()}
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

  containerLoading: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Main;
