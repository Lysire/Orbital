import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CLOTHES } from '../../data/dummy-data';
import LogicHomeButtons from '../../components/Buttons/LogicHomeButtons';

/*
 * Screen that displays details of the clothing selected
 * from the clothes under a particular category (last screen)
 */

const ClothesDetailScreen = props => {
  const clothesID = props.navigation.getParam('clothesID');
  const selectedClothes = CLOTHES.find(clothing => clothing.id === clothesID); // TODO: use redux instead of dummy data

  // TODO: beautify this
  return (
    <View style={styles.screen}>
      <Text>{selectedClothes.title}</Text>
    </View>
  );
};

// navigator options for the current screen
ClothesDetailScreen.navigationOptions = navData => {
  const clothesID = navData.navigation.getParam('clothesID');   // since headerTitle is dynamic, need to use a parameter to update
  const selectedClothes = CLOTHES.find(clothing => clothing.id === clothesID);
  
  return {
    headerTitle: selectedClothes.title,
    headerRight: () => (<LogicHomeButtons onAdd={() => { }} onEdit={() => { }}
      onRemove={() => { }} onSelectHome={() => navData.navigation.popToTop()} />
    )
  };
};

// styles for the screen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ClothesDetailScreen;
