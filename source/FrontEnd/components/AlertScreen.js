import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

const AlertScreen = ({ navigation }) => {
  const [alerting, setAlerting] = useState(false);
  const [text, setText] = useState("");
  const [keyword, setKeyWord] = useState({});
  const onChangeText = (payload) => setText(payload);
  const addKeyWord = () => {
    if (text == "") {
      return
    }
    //save keyword
    const newKeyWord = { ...keyword, [Date.now()]: { text } };
    setKeyWord(newKeyWord);
    setText("");
  }
  //console.log(keyword);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.hedaer}>
        <TouchableOpacity onPress={() =>
          navigation.pop()
        }>
          <AntDesign style={styles.btnIcon} name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>알림</Text>
        <Text></Text>
      </View>
      <TextInput
        onSubmitEditing={addKeyWord}
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
        placeholder={"키워드를 입력해주세요. (예: 장학)"} />
      <Text style={styles.titleText}>등록된 키워드</Text>
      <View style={styles.keywords}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}>
          {Object.keys(keyword).map((key) => (
            <View key={key} style={styles.keyword}>
              <Text style={styles.keywordText}>{keyword[key].text}</Text>
              <AntDesign name="close" size={20} style={styles.keywordText} />
            </View>
          ))}
          <View style={{ ...styles.keyword, backgroundColor: "white" }}><Text></Text></View>
        </ScrollView>
      </View>
      <Text style={styles.titleText}>알림</Text>
      <ScrollView contentContainerStyle={styles.contentList}>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>2023학년도 1학기 학부 등록금재원 우선선발장학금 신청 안내</Text>
          <Text style={styles.contentDate}>2022.02.01</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>임시 테스트용 글자</Text>
          <Text style={styles.contentDate}>2022.02.01</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>[멘토스쿨 운영] 2022학년도 6차 멘토스쿨</Text>
          <Text style={styles.contentDate}>2022.02.01</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>2023학년도 1학기 교류 수학 안내(강원대학교 외)</Text>
          <Text style={styles.contentDate}>2022.02.01</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>2023년도 한국장애인개발원 쌍용곰두리장학생 선발 안내</Text>
          <Text style={styles.contentDate}>2022.02.01</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>2023학년도 1학기 (통합)연계과정 학생 및 전환 희망 학생 모집 안내</Text>
          <Text style={styles.contentDate}>2022.02.01</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AlertScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hedaer: {
    flexDirection: "row",
    marginTop: 50,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  btnIcon: {
    fontSize: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 30,
  },
  input: {
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: 25,
    fontSize: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  keywords: {
    marginHorizontal: 20,
  },
  titleText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginHorizontal: 25,
  },
  keyword: {
    flexDirection: "row",
    backgroundColor: "#63b6ea",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    color: "white",
    justifyContent: "space-around",
  },
  keywordText: {
    color: "white",
    paddingLeft: 5,
    paddingRight: 5,
  },
  contentList: {
    marginHorizontal: 25,
  },
  content: {
    backgroundColor: "#a2dbff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginBottom: 15,
  },
  contentTitle: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  contentDate: {
    marginTop: 5,
    textAlign: "right",
    marginRight: 10,
  },
});
