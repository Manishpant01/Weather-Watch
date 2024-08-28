import { StyleSheet } from "react-native";
import Main from "./src/screens/main";

export default function App() {
  return (
    <>
      {/* info: loading main component */}
      <Main />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
