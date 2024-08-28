import React, { FC, useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { DEFAULT_LOCATION } from "../helpers/constants";

interface SearchInputProps {
  getCoordinate(text: string): Promise<void>;
}

const SearchInput: FC<SearchInputProps> = ({ getCoordinate }) => {
  const [textSearch, setTextSearch] = useState<string>("");

  const handleSearch = (text: string) =>
    setTextSearch(text || DEFAULT_LOCATION);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getCoordinate(textSearch);
    }, 650);

    return () => clearTimeout(delayDebounceFn);
  }, [textSearch]);

  return (
    <View>
      <View style={styles.searchSection}>
        <Image
          style={styles.searchIcon}
          source={require("../imgs/search.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Search by cities"
          underlineColorAndroid="transparent"
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 15,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 7,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 20,
    color: "#424242",
    paddingLeft: 15,
    borderColor: "#ccc",
  },
});

export default SearchInput;
