import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import React from "react";

const InputText = ({ style, placeholder, onChangeText, value }) => {
  return (
    <KeyboardAvoidingView style={styles.inputContainer}>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </KeyboardAvoidingView>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    // paddingHorizontal: 0,
    marginVertical: 10,
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "#ecebf9",
    borderRadius: 5,
  },
});
