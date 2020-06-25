import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES, CLOTHES } from '../../data/dummy-data';
import ClothesList from '../../components/Lists/ClothesList';

/*
 * Screen that displays clothing under a certain
 * chosen category, in a list (2nd screen)
 */

// TODO: set up store for clothes (actions and reducers), refactor 

const CategoryClothesScreen = props => {

  const catID = props.navigation.getParam('categoryID');

  const editCategoryHandler = useCallback(id => {
    props.navigation.navigate('EditCategories', { categoryID: id });
  }, [id]); // to edit the categories

  const displayedClothes = CLOTHES.filter(
    clothing => clothing.categoryIDs.indexOf(catID) >= 0
  ); // get clothes from a certain category ID (fix this to use redux) -> create actions and reducers for clothes

  // need to set parameters so that nav buttons can access, this is side effect
  useEffect(() => props.navigation.setParams({ edit: editCategoryHandler }), [editCategoryHandler]);

  return <ClothesList listData={displayedClothes} navigation={props.navigation} />;
};

CategoryClothesScreen.navigationOptions = navData => {

  const catID = navData.navigation.getParam('categoryID'); // header title is dynamic
  const onEdit = navData.navigation.getParam('edit'); // extract handler

  const selectedCategory = CATEGORIES.find(cat => cat.id === catID); // fix this to use redux

  return {
    headerTitle: selectedCategory.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Edit"
          iconName="pencil"
          onPress={() => onEdit(catID)}
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
