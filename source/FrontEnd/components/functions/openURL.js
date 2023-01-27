import { Linking } from "react-native";

const openURL = async (url) => {
	const supported = await Linking.canOpenURL(url);

	if (supported) {
		await Linking.openURL(url);
	} else {
		Alert.alert('링크에 오류가 있습니다. 제작자에게 문의해주세요.');
	}
};

export default openURL;
