import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES, CLOTHES } from '../../data/dummy-data';
import ClothesList from '../../components/ClothesList';
import HeaderButton from '../../components/HeaderButton';

/*
 * Screen that displays clothing under a certain
 * chosen category, in a list
 */

const CategoryClothesScreen = props => {
  
  const catID = props.navigation.getParam('categoryID');

  const displayedClothes = CLOTHES.filter(
    clothing => clothing.categoryIDs.indexOf(catID) >= 0
  ); // get clothes from a certain category ID

  return <ClothesList listData={displayedClothes} navigation={props.navigation} />;
};

CategoryClothesScreen.navigationOptions = navigationData => {
  const catID = navigationData.navigation.getParam('categoryID'); // since headerTitle is dynamic, need to use a parameter to update

  const selectedCategory = CATEGORIES.find(cat => cat.id === catID);

  return {
    headerTitle: selectedCategory.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}
      >
        <Item
          title="Add or Remove"
          iconName="ios-brush"
          onPress={() => { }}
        />
      </HeaderButtons>
    )
  };
};

export default CategoryClothesScreen;
