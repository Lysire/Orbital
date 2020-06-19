import React from 'react';

import { CATEGORIES, CLOTHES } from '../../data/dummy-data';
import LogicHomeButtons from '../../components/Buttons/LogicHomeButtons';
import ClothesList from '../../components/Lists/ClothesList';

/*
 * Screen that displays clothing under a certain
 * chosen category, in a list (2nd screen)
 */

const CategoryClothesScreen = props => {

  const catID = props.navigation.getParam('categoryID');

  const displayedClothes = CLOTHES.filter(
    clothing => clothing.categoryIDs.indexOf(catID) >= 0
  ); // get clothes from a certain category ID

  return <ClothesList listData={displayedClothes} navigation={props.navigation} />;
};

CategoryClothesScreen.navigationOptions = navData => {
  const catID = navData.navigation.getParam('categoryID'); // since headerTitle is dynamic, need to use a parameter to update

  const selectedCategory = CATEGORIES.find(cat => cat.id === catID);

  return {
    headerTitle: selectedCategory.title,
    headerRight: () => (<LogicHomeButtons onAdd={() => { }} onEdit={() => { }}
      onRemove={() => { }} onSelectHome={() => navData.navigation.popToTop()} />
    )
  };
};

export default CategoryClothesScreen;
