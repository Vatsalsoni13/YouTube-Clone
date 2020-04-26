import React from 'react';
import 'react-native-get-random-values';
import {View, Text, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
const VideoPlayerScreen = ({route}) => {
  const {videoId, title} = route.params;
  return (
    <View>
      <View style={{width: Dimensions.get('screen').width, height: 200}}>
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{uri: `https://www.youtube.com/embed/${videoId}`}}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          width: Dimensions.get('screen').width - 50,
          margin: 9,
        }}
        numberOfLines={2}
        ellipsizeMode="tail">
        {title}
      </Text>
      <View style={{borderBottomWidth: 1}} />
    </View>
  );
};
export default VideoPlayerScreen;
