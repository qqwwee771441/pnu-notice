import { useState } from 'react';
import { View, ScrollView, Text, TextInput, Pressable, Image, Dimensions, StyleSheet  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const { width:SCREEN_WIDTH } = Dimensions.get('window');

function Item({ title, author, pubDate }) {
  return (
    <View style={styles.item}>
      <Text style={{margin:10, fontSize:16, fontWeight:'500'}}>{title}</Text>
      <View style={{flexDirection:'row', justifyContent:"space-between", borderTopWidth:1, borderTopColor:'#eee'}}>
        <Text style={{margin:10, color:'#555'}}>{author}</Text>
        <Text style={{margin:10, color:'#aaa'}}>{pubDate}</Text>
      </View>
    </View>
  )
}

export default function HomeScreen({navigation}) {
  const [keyword, setKeyword] = useState();
  const [page, setPage] = useState(0);
  const [pressed, setPressed] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/*<Image style={styles.topLogo} source={require('../assets/pnulogo_copy.png')} />*/}
        <Text style={styles.topTitle}>Pnu</Text>
        <Pressable onPressIn={() => setPressed(1)} onPressOut={() => setPressed(0)} onPress={() => navigation.push("Alert")}>{
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
            onChangeText={(keyword) => setKeyword(keyword)}
            placeholder={'검색어를 입력하세요.'}
          />
        </View>
      </View>
      <View style={styles.list}>
        <Text style={styles.listTitle}>공지사항</Text>
        <ScrollView style={styles.listContents} showsVerticalScrollIndicator={false}>
          <Item 
            title={'2023학년도 1학기 교류 수학 안내(강원대학교 외)'}
            author={'황유경'}
            pubDate={'2023-01-06'}
          />
          <Item 
            title={'2023년도 한국장애인개발원 쌍용곰두리장학생 선발 안내'}
            author={'김효경'}
            pubDate={'2023-01-06'}
          />
          <Item 
            title={'[채용] 주식회사 에스브이씨 추천채용 안내'}
            author={'김효경'}
            pubDate={'2023-01-03'}
          />
          <Item 
            title={'2023학년도 1학기 (통합)연계과정 학생 및 전환 희망 학생 모집 안내'}
            author={'황유경'}
            pubDate={'2023-01-05'}
          />
          <Item 
            title={'[채용] 나비스오토모티브시스템즈(주) SW개발(C/C++) - (2023년2월입사)'}
            author={'NAVIS-AMS'}
            pubDate={'2022-12-26'}
          />
          <Item 
            title={'[LINC 3.0] 파워반도체인재양성센터 설계트랙 교육생 모집 안내'}
            author={'김효경'}
            pubDate={'2023-01-05'}
          />
          <Item 
            title={'[산업AI특성화] 핵심지표 설문조사'}
            author={'김효경'}
            pubDate={'2023-01-05'}
          />
          <Item 
            title={'2023학년도 1학기 학자금 대출 기본계획 알림'}
            author={'김효경'}
            pubDate={'2023-01-03'}
          />
          <Item 
            title={'학생과 미경유 교내·외 장학금 수혜현황 제출 요청'}
            author={'김효경'}
            pubDate={'2023-01-03'}
          />
          <Item 
            title={keyword}
            author={''}
            pubDate={''}
          />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  top: {
    flex: 1,
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
    flex: 1,
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
  },
  list: {
    flex: 5,
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
  Btn: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  pressedBtn: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor:'#63b6ea',
    color: 'white',
  },
});
