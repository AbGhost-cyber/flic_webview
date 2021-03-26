import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";

const { width } = Dimensions.get("window");

const SlideItem = (props) => {
  return (
    <View style={styles.parent}>
      <Image
        source={props.picture}
        style={{
          width: props.index === 1 ? width - 6 : width,
          height: 400,
          marginTop: 12,
        }}
      />
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  parent: {
    width: width,
    overflow: "hidden",
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
  },
  picture: {
    width: width,
    height: 400,
  },
});
