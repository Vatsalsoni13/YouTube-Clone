import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import MiniCard from '../components/MiniCard';
export const LittleCard = ({name}) => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        height: 50,
        width: Dimensions.get('screen').width / 2 - 10,
        marginTop: 10,
        borderRadius: 100,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          console.log('pressed');
        }}>
        <Text
          style={{
            alignSelf: 'center',
            color: '#FFF',
            fontSize: 22,
          }}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ExploreScreen = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [gamingData, setGamingData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  // const [trendingData, setTrendingData] = useState([]);
  fetchTrending = async () => {
    await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=trending&type=video&key=AIzaSyDem4S2xQ9rE7ShniISRObblOnhAuBjAcc`,
    )
      .then((res) => res.json())
      .then((data) => {
        setTrendingData(data.items);
      });
  };
  fetchGaming = async () => {
    await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=gaming&type=video&key=AIzaSyDem4S2xQ9rE7ShniISRObblOnhAuBjAcc`,
    )
      .then((res) => res.json())
      .then((data) => {
        setGamingData(data.items);
      });
  };
  fetchNews = async () => {
    await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=news&type=video&key=AIzaSyDem4S2xQ9rE7ShniISRObblOnhAuBjAcc`,
    )
      .then((res) => res.json())
      .then((data) => {
        setNewsData(data.items);
      });
  };
  useEffect(() => {
    fetchTrending();
    fetchGaming();
    fetchNews();
  });

  return (
    <View style={{flex: 1}}>
      <Header />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          paddingBottom: 10,
        }}>
        <LittleCard name="Gaming" />
        <LittleCard name="Trending" />
        <LittleCard name="News" />
        <LittleCard name="Music" />
        <LittleCard name="Movies" />
        <LittleCard name="Fashion" />
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VideoPlayer', {
              videoId: props.videoId,
              title: props.title,
            });
          }}>
          <Text style={{margin: 8, fontSize: 22, borderBottomWidth: 1}}>
            Gaming Videos
          </Text>
          <FlatList
            style={{flex: 1}}
            data={gamingData}
            renderItem={({item}) => {
              return (
                <MiniCard
                  videoId={item.id.videoId}
                  title={item.snippet.title}
                  channelName={item.snippet.channelTitle}
                />
              );
            }}
            keyExtractor={(item) => item.id.videoId}
          />
          <Text style={{margin: 8, fontSize: 22, borderBottomWidth: 1}}>
            Trending Videos
          </Text>
          <FlatList
            style={{flex: 1}}
            data={trendingData}
            renderItem={({item}) => {
              return (
                <MiniCard
                  videoId={item.id.videoId}
                  title={item.snippet.title}
                  channelName={item.snippet.channelTitle}
                />
              );
            }}
            keyExtractor={(item) => item.id.videoId}
          />
          <Text style={{margin: 8, fontSize: 22, borderBottomWidth: 1}}>
            News Videos
          </Text>
          <FlatList
            style={{flex: 1}}
            data={newsData}
            renderItem={({item}) => {
              return (
                <MiniCard
                  videoId={item.id.videoId}
                  title={item.snippet.title}
                  channelName={item.snippet.channelTitle}
                />
              );
            }}
            keyExtractor={(item) => item.id.videoId}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default ExploreScreen;
