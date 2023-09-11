import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Button = ({ label, style, onPress, children }) => {
  return (
    <>
      <TouchableOpacity style={[styles.buttonStyle, style]} onPress={onPress}>
        <Text style={styles.text}>
          {label} {children}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "rgba(9, 135, 700, 1)",
    paddingVertical: 8,
    bottom: 8,
    marginLeft: 150,
    width: 90,
  },
  text: {
    color: "white",
    fontSize: 15,
    marginRight: 5,
  },
});
