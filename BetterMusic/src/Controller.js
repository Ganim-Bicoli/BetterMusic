import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Controller({ onNext, onPrv }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playSound}>
        <MaterialIcons name="pause" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={Pause}>
        <MaterialIcons name="play-arrow" size={45} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignContent:'center',
    paddingLeft:'39%'
  },
});