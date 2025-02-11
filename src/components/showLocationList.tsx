import React from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { geocoordinateResult } from "../services";

interface LocationListProps {
  location: geocoordinateResult[];
  updateLocation: (selectedLocation: geocoordinateResult[]) => void;
}

const LocationList: React.FC<LocationListProps> = ({
  location,
  updateLocation,
}) => {
  const renderItem: ListRenderItem<geocoordinateResult> = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item.id)}>
      <Text style={styles.title}>
        {item.name}, {item.country}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No data found.</Text>
    </View>
  );

  const handlePress = (id: number) => {
    const selectedLocation = location.find((item) => item.id === id);

    if (selectedLocation) {
      updateLocation([{ ...selectedLocation, selected: true }]);
    }
  };

  return (
    <FlatList
      data={location}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#d5d8dc",
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  title: {
    fontSize: 18,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
});

export default LocationList;
