import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, Pressable, Dimensions, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import FindWithTags from './FindWithTags';

const { height:SCREEN_HEIGHT, width:SCREEN_WIDTH } = Dimensions.get('window');

function Item({ title, author, pubDate, url }) {
  return (
    <Pressable onPress={() => openURL(url)}>
      <View style={styles.item}>
        <Text style={{margin:10, fontSize:16, fontWeight:'500'}}>{title}</Text>
        <View style={{flexDirection:'row', justifyContent:"space-between", borderTopWidth:1, borderTopColor:'#eee'}}>
          <Text style={{margin:10, color:'#555'}}>{author}</Text>
          <Text style={{margin:10, color:'#aaa'}}>{pubDate}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const openURL = async (url) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert('링크에 오류가 있습니다. 제작자에게 문의해주세요.');
  };
};

export default function HomeScreen({ navigation: { navigate } }) {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [pressed, setPressed] = useState(0);
  const [notices, setNotices] = useState([]);
  const [allNotices, setAllNotices] = useState([]);

  const getNotice = async () => {
    const response = await fetch('https://port-0-pnu-notice-api-1luhct24lcvwvdvb.gksl2.cloudtype.app/notice');
    const json = await response.json();
    setAllNotices(json);
    setNotices(json);
  };
  useEffect(()=> {
    getNotice();
  }, []);

  const initKeyword = () => { changeKeyword(''); };
  const changeKeyword = (keyword) => { setKeyword(keyword); };
  const search = () => { setNotices(FindWithTags(allNotices, { 'key':{'text':keyword} })); };
  useEffect(search, [ keyword ]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Pressable onPress={initKeyword}><Text style={styles.topTitle}>Pnu</Text></Pressable>
        <Pressable onPressIn={() => setPressed(1)} onPressOut={() => setPressed(0)} onPress={() => navigate('Alert', {notices: notices})}>{
          (pressed==0)?
          (<Ionicons style={styles.topIcon} name="notifications-outline" size={30} color="black" />):
          (<Ionicons style={styles.topIcon} name="notifications" size={30} color="#63b6ea" />)
        }</Pressable>
      </View>
      <View style={styles.input}>
        <View style={styles.inputBar}>
          <Feather style={styles.inputIcon} name="search" size={24} color="#a2dbff" />
          <TextInput
            style={styles.inputText}
            value={keyword}
            onChangeText={changeKeyword}
            onSubmitEditing={search}
            placeholder={'검색어를 입력하세요.'}
          />
        </View>
      </View>
      <View style={styles.list}>
        <Text style={styles.listTitle}>공지사항</Text>
        <ScrollView style={styles.listContents} showsVerticalScrollIndicator={false}>
          {notices.length === 0 ?  (
            <ActivityIndicator color="#63b6ea" size="large" style={{marginTop: 200}}/>
          ): (notices.map((notice) => 
            <Item
              title={notice.title}
              author={notice.author}
              pubDate={notice.date}
              url={notice.link}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Pressable style={(page==0)?(styles.pressedBtn):(styles.Btn)} onPress={() => {setPage(0)}}>
          <AntDesign name="notification" size={24} color={(page==0)?'white':'black'} />
          <Text style={(page==0)?{color:'white'}:{color:'black'}}>공지사항</Text>
        </Pressable>
        <Pressable style={(page==1)?(styles.pressedBtn):(styles.Btn)} onPress={() => setPage(1)}>
          <AntDesign name="staro" size={24} color={(page==1)?'white':'black'} />
          <Text style={(page==1)?{color:'white'}:{color:'black'}}>즐겨찾기</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    backgroundColor: 'white',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLogo: {
    height: 23,
    width: 62,
    margin: 20,
    marginLeft: 150,
  },
  topTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#43a6da',
    margin: 20,
    marginLeft: 160,
  },
  topIcon: {
    margin: 20,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    margin: 20,
    width: SCREEN_WIDTH - 40,
  },
  inputIcon: {
    color: '#aaa',
    margin: 10,
  },
  inputText: {
    width: SCREEN_WIDTH - 100,
    height: 45,
  },
  list: {
    height: SCREEN_HEIGHT - 250,
  },
  listTitle: {
    margin: 10,
    marginLeft: 20,
    fontSize: 18, 
    fontWeight: "500",
    alignSelf: 'flex-start',
  },
  listContents: {
    backgroundColor: '#eee',
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
  },
  bottom: {
    flexDirection: 'row',
  },
  Btn: {
    width: SCREEN_WIDTH / 2,
    height: 90,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pressedBtn: {
    width: SCREEN_WIDTH / 2,
    height: 90,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor:'#63b6ea',
    color: 'white',
  },
});
