import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

const formatImage = (image) => {
  const imageFilePaths = image.uri.split("/");
  const imageName = imageFilePaths[imageFilePaths.length - 1];

  const imageFile = {
    name: imageName,
    uri: image.uri,
    type: image.type,
  };
  return imageFile;
};

export const getPermissionsAsync = async () => {
  if (Platform.OS !== "web") {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
};

export const pickImage = async (setImage = () => {}) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(formatImage(result));
    }
  } catch (E) {
    Alert.alert("Something went wrong!");
  }
};

export const takeImage = async (setImage = () => {}) => {
  try {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(formatImage(result));
    }

    console.log(result);
  } catch (E) {
    console.log(E);
  }
};
