import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { Entypo, Feather } from "@expo/vector-icons";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ready, setReady] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [liked, setLiked] = useState(false);

  var lastTap = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      setType(
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    } else {
      lastTap = now;
    }
  };

  const handlePictureTaken = async () => {
    setPhoto(await this.camera.takePictureAsync());
    setLiked(true);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      {liked && photo ? (
        <ImageBackground
          source={{ uri: photo.uri }}
          style={styles.ImageBackground}
        >
          <View style={styles.BigView}>
            <View style={styles.LikeImage}>
              <Text style={styles.insideText}>Does this look good?</Text>
              <View style={styles.icons}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Processing");
                  }}
                >
                  <Entypo name='check' size={30} color='green' />
                </TouchableOpacity>
                <Text style={{ opacity: 0.25, fontSize: 16 }}>|</Text>
                <TouchableOpacity
                  onPress={() => {
                    setLiked(false);
                  }}
                >
                  <Feather name='x' size={30} color='red' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <Camera
          style={{ flex: 1 }}
          type={type}
          onCameraReady={() => setReady(true)}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <TouchableWithoutFeedback onPress={handleDoubleTap}>
            <View style={styles.BigView}>
              <TouchableOpacity
                style={styles.FlipImage}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Image
                  source={require("../../assets/images/flip-camera.png")}
                  resizeMode='contain'
                  style={styles.Image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.snapper}
                onPress={handlePictureTaken}
              >
                <Entypo name='circle' size={80} color='#F9F9F9' />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ImageBackground: { height: screenHeight - 80, width: screenWidth },
  BigView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  LikeImage: {
    backgroundColor: "#F9F9F9",
    height: 35,
    width: screenWidth - 30,
    marginTop: 30,
    alignSelf: "center",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  insideText: {
    fontSize: 22,
    alignSelf: "flex-start",
    marginLeft: 7,
    marginTop: 2,
  },
  icons: {
    flexDirection: "row",
    marginRight: 3,
    alignItems: "center",
    marginRight: 5,
  },
  FlipImage: {
    marginTop: 7,
    marginRight: 7,
    height: 30,
    width: 60,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
  },
  Image: {
    marginTop: 3,
    height: 25,
    width: 60,
    borderRadius: 20,
  },
  snapper: {
    position: "absolute",
    bottom: 20,
    left: screenWidth / 2 - 40,
  },
});
