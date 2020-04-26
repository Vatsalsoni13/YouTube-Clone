import React, {useState} from 'react';

import {View, TextInput, FlatList, ActivityIndicator} from 'react-native';
import MiniCard from '../components/MiniCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
const SearchScreen = ({navigation}) => {
  const {colors} = useTheme();
  const textColor = colors.iconColor;
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const miniCardData = useSelector((state) => {
    return state.cardData;
  });
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyDem4S2xQ9rE7ShniISRObblOnhAuBjAcc`,
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        dispatch({type: 'add', payload: data.items});
      });
  };
  return (
    <View style={{flex: 1, height: 45}}>
      <View
        style={{
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          elevation: 5,
          backgroundColor: colors.headerColor,
        }}>
        <Ionicons
          name="md-arrow-back"
          size={32}
          style={{color: textColor}}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={{width: '70%', backgroundColor: '#e6e6e6'}}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <Ionicons
          style={{color: textColor}}
          name="md-send"
          size={32}
          onPress={() => fetchData()}
        />
      </View>
      {loading ? <ActivityIndicator size="large" color="red" /> : null}
      <FlatList
        data={miniCardData}
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
    </View>
  );
};
export default SearchScreen;
