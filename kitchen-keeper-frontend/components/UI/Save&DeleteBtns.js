import { View, Text, TouchableOpacity } from "react-native";

const SaveAndDeleteBtns = ({ onSave, onDelete }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity onPress={onSave}>
        <Text>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};
