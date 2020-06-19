import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

/*
 * Touchable visual component to display image, title 
 * and size of clothing (an item in the list)
 */

const ClothesItem = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={props.onSelectClothes}>
        <View>
          <View style={{ ...styles.item, ...styles.clothesHeader }} // create new object from extracting all k-v pairs 
          >
            <ImageBackground
              source={{ uri: props.image }} // remember to use require() for local files
              style={styles.backgroundImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.item, ...styles.clothesDetails }}>
            <Text>{props.size.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  item: {
    flexDirection: 'row' 
  },
  clothesHeader: {
    height: '85%'
  },
  clothesDetails: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default ClothesItem;
