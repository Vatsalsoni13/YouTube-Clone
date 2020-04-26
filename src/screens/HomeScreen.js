import React from 'react';

import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import Header from '../components/Header';
import Card from '../components/Card';
export default function HomeScreen({navigation}) {
  const cardData = useSelector((state) => {
    return state.cardData;
  });
  return (
    <View style={{flex: 1}}>
      <Header />
      <FlatList
        data={cardData}
        renderItem={({item}) => {
          return (
            <Card
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
}
