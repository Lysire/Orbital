import React, { useCallback, useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton';
import { FirebaseContext } from '../../firebase';
import Clothes from '../../classes/clothes';

/*
 * Screen that displays details of the clothing selected
 * from the clothes under a particular category (last screen)
 */

const ClothesDetailScreen = props => {
  const firebase = useContext(FirebaseContext)
  const [selectedClothes, setSelectedClothes] = useState(null) 
  const clothesID = props.navigation.getParam('clothesID');
  
  useEffect(() => {
    firebase.clothes(clothesID).on("value", function(snapshot) {
      const clothesObject = snapshot.val()
      const clothesInstance = Clothes.fromObject(clothesObject)
      if (selectedClothes == null) {
        setSelectedClothes(clothesInstance)
        props.navigation.setParams({
          clothesTitle: clothesInstance.title,
        })
      }
    }, function (errorObject) {
      console.log("Firebase read failed: " + errorObject.code);
    });
  }, [selectedClothes])


  // TODO: beautify this
  return (
    <View style={styles.screen}>
      <Text>{selectedClothes ? selectedClothes.title : "Loading..."}</Text>
    </View>
  );
};

// navigator options for the current screen
ClothesDetailScreen.navigationOptions = navData => {
  const clothesTitle = navData.navigation.getParam('clothesTitle');   // since headerTitle is dynamic, need to use a parameter to update

  return {
    headerTitle: clothesTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
              title="Home"
              iconName='home'
              onPress={() => navData.navigation.popToTop()}
          />
      </HeaderButtons>
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
