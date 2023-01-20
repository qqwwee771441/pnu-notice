import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Pressable, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsnyncStorage from '@react-native-async-storage/async-storage'
import FindWithTags from './FindWithTags';

const STORAGE_KEYWORD = '@keyword';

function Item({ title, date, url }) {
  return (
    <Pressable onPress={() => openURL(url)}>
      <View style={styles.content}>
          <Text style={styles.contentTitle}>{title}</Text>
          <Text style={styles.contentDate}>{date}</Text>
      </View>
    </Pressable>
  )
}

const openURL = async (url) => {
  // 링크가 유효한지 확인
  //const supported = await Linking.canOpenURL(url);
  supported = 1;
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert('링크에 오류가 있습니다. 제작자에게 문의해주세요.');
  };
};

const AlertScreen = ({ navigation, route }) => {
  const [alerting, setAlerting] = useState(false);
  const [text, setText] = useState("");
  const [keyword, setKeyWord] = useState({});
  
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    setNotices(FindWithTags(route.params.notices, keyword));
  }, [ keyword ]);

  useEffect(() => {
    loadKeyWord();
  }, []);
  const onChangeText = (payload) => setText(payload);
  const addKeyWord = async () => {
    if (text == "") {
      return
    }
    //save keyword
    const newKeyWord = { ...keyword, [Date.now()]: { text } };
    setKeyWord(newKeyWord);
    await saveKeyWord(newKeyWord);
    setText("");
  }
  const delteteKeyWord = async (key) => {
    const newKeyWord = {...keyword};
    delete newKeyWord[key];
    setKeyWord(newKeyWord);
    await saveKeyWord(newKeyWord);
  };
  const saveKeyWord = async (toSave) => {
    try {
      await AsnyncStorage.setItem(STORAGE_KEYWORD, JSON.stringify(toSave));
    } catch (e) {
      Alert.alert(e);
    }
  }
  const loadKeyWord = async () => {
    try {
      const s = await AsnyncStorage.getItem(STORAGE_KEYWORD);
      s !== null ? setKeyWord(JSON.parse(s)) : null;
    } catch (e) {
      Alert.alert(e);
    }
  }
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
              <TouchableOpacity onPress={() => delteteKeyWord(key)}>
                <AntDesign name="close" size={20} style={styles.keywordText} />
              </TouchableOpacity>
            </View>
          ))}
          <View style={{ ...styles.keyword, backgroundColor: "white" }}><Text></Text></View>
        </ScrollView>
      </View>
      <Text style={styles.titleText}>알림</Text>
      <ScrollView contentContainerStyle={styles.contentList}>
        {notices.length > 0 && (notices.map((notice, index) => 
          <Item
            key={index}
            title={notice.title}
            date={notice.date}
            url={notice.link}
          />
        ))}
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
