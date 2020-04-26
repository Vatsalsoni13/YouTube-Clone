import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
export default function Header() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => {
    return state.myDarkMode;
  });
  const {colors} = useTheme();
  const myColor = colors.iconColor;
  return (
    <View
      style={{
        height: 45,
        backgroundColor: colors.headerColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 5,
      }}>
      <View style={{flexDirection: 'row', margin: 5}}>
        <Entypo style={{marginLeft: 20}} name="youtube" size={32} color="red" />
        <Text
          style={{
            fontSize: 22,
            marginLeft: 5,
            fontWeight: 'bold',
            color: myColor,
          }}>
          YouTube
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: 160,
          alignItems: 'center',
        }}>
        <Ionicons name="md-videocam" size={32} color={myColor} />
        <Ionicons
          name="md-search"
          size={32}
          color={myColor}
          onPress={() => navigation.navigate('Search')}
        />
        <MaterialIcons
          name="wb-sunny"
          size={32}
          color={myColor}
          onPress={() => {
            dispatch({type: 'changeTheme', payload: !currentTheme});
          }}
        />
      </View>
    </View>
  );
}
