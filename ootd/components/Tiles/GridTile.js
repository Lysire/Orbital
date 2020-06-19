import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native';

/*
 * Encapsulates a card display that is to be used 
 * in a grid view.
 */

const GridTile = props => {
  let TouchComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchComp = TouchableNativeFeedback; // use ripple effect if supported (android v21 and up)
  }
  return (
    <View style={styles.gridItem}>
      <TouchComp style={{ flex: 1 }} onPress={props.onSelect}>
        <View
          style={{ ...styles.titleContainer, ...{ backgroundColor: props.color } }}
        >
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchComp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    elevation: 5
  },
  titleContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  }
});

export default GridTile;
