import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

const icons = {
  "Back": "left"
}

export default function App() {
  const [alerting, setAlerting] = useState(false);
  const [text, setText] = useState("");
  const [keyword, setKeyWord] = useState({});
  const alertpage = () => setAlerting(true);
  const homepage = () => setAlerting(false);
  const onChangeText = (payload) => setText(payload);
  const addKeyWord = () => {
    if (text == ""){
      return
    }
    //save keyword
    const newKeyWord = Object.assign( {}, keyword, {[Date.now()]: {text}} );
    setKeyWord(newKeyWord);
    setText("");
  }
  console.log(keyword);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.hedaer}>
        <TouchableOpacity onPress={homepage}>
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
      <View style={styles.keywords}>
        <Text style={styles.keywordsText}>등록된 키워드</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.keywords_list}>
          <View style={styles.keyword}>
            <Text style={styles.keywordText}>장학</Text>
            <AntDesign name="close" size={20} style={styles.keywordText}/>
          </View>
          <View style={styles.keyword}>
            <Text style={styles.keywordText}>행사</Text>
            <AntDesign name="close" size={20} style={styles.keywordText} />
          </View>
          <View style={styles.keyword}>
            <Text style={styles.keywordText}>행사</Text>
            <AntDesign name="close" size={20} style={styles.keywordText} />
          </View>
          <View style={styles.keyword}>
            <Text style={styles.keywordText}>행사</Text>
            <AntDesign name="close" size={20} style={styles.keywordText} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

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
    marginTop: 20,
  },
  keywordsText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  keyword: {
    flexDirection: "row",
    backgroundColor: "black",
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
  }
});
