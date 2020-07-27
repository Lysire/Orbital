import React, { useCallback, useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton';
import ClothesList from '../../components/Lists/ClothesList';
import { FirebaseContext } from '../../firebase';
import Clothes from '../../classes/clothes';

/*
 * Screen that displays clothing under a certain
 * chosen category, in a list (2nd screen)
 */

// TODO: set-up redux for clothes at a later point in time
const CategoryClothesScreen = props => {
  const firebase = useContext(FirebaseContext)
  const [clothes, setClothes] = useState({}) // id: Clothes mapping

  useEffect(() => {
    firebase.clothesList().on("value", function(snapshot) {
      const clothesObjects = snapshot.val()
    
      for (const clothesID in clothesObjects) {
        const clothesObject = clothesObjects[clothesID]
        var updatedClothesState = clothes;
        updatedClothesState[clothesID] = Clothes.fromObject(clothesObject)
        setClothes(updatedClothesState)
      }
  
    }, function (errorObject) {
      console.log("Firebase read failed: " + errorObject.code);
    });
  }, [clothes])

  const catID = props.navigation.getParam('categoryID');
  const selectedCategory = useSelector(state => { 
    return state.categories.availableCategories.find(cat => cat.id === catID); 
  }); // don't forget the return inside blocks...

  const editCategoryHandler = useCallback(() => props.navigation.navigate('EditCategories', { categoryID: catID }), [catID]);

  const displayedClothes = Object.values(clothes).filter(
    clothing => clothing.categoryIDs.indexOf(catID) >= 0
  ); // get clothes from a certain category ID (fix this to use redux) -> create actions and reducers for clothes

  // need to set parameters so that nav buttons can access, this is side effect
  useEffect(() => {
    props.navigation.setParams({ edit: editCategoryHandler, categoryTitle: selectedCategory.title });
  }, [editCategoryHandler, selectedCategory]);

  return <ClothesList emptyData={() => <View><Text>placeholder</Text></View>} listData={displayedClothes} navigation={props.navigation} />;
};

CategoryClothesScreen.navigationOptions = navData => {

  const editCategoryHandler = navData.navigation.getParam('edit'); // extract handler
  const selectedTitle = navData.navigation.getParam('categoryTitle');

  return {
    headerTitle: selectedTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Edit"
          iconName="pencil"
          onPress={editCategoryHandler}
        />
        <Item
          title="Home"
          iconName="home"
          onPress={() => navData.navigation.popToTop()}
        />
      </HeaderButtons>
    )
  };
};

export default CategoryClothesScreen;
