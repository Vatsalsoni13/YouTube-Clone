import React from 'react';

import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Card = (props) => {
  const {colors} = useTheme();
  const textColor = colors.iconColor;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('VideoPlayer', {
          videoId: props.videoId,
          title: props.title,
        });
      }}>
      <View style={{marginBottom: 10}}>
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`,
          }}
          style={{
            width: '100%',
            height: 200,
          }}
        />
        <View style={{flexDirection: 'row', margin: 6}}>
          <MaterialIcons
            name="account-circle"
            size={40}
            style={{color: colors.iconColor}}
          />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 20,
                width: Dimensions.get('screen').width - 50,
                color: textColor,
              }}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {props.title}
            </Text>
            <Text style={{color: textColor}}>{props.channelName}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Card;
