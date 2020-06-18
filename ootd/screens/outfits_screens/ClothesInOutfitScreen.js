import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { OUTFITS, CLOTHES } from '../../data/dummy-data'
import ClothesList from '../../components/ClothesList';
import HeaderButton from '../../components/HeaderButton';

/*
 * Screen that displays clothing under a certain
 * chosen outfit, in a list
 */

const ClothesInOutfitScreen = props => {
  
  const catID = props.navigation.getParam('outfitID');

  const displayedClothes = CLOTHES.filter(
    clothing => clothing.outfitIDs.indexOf(catID) >= 0
  ); // get clothes from a certain category ID

  return <ClothesList listData={displayedClothes} navigation={props.navigation} />;
};

ClothesInOutfitScreen.navigationOptions = navData => {
  const catID = navData.navigation.getParam('outfitID'); // since headerTitle is dynamic, need to use a parameter to update

  const selectedOutfit = OUTFITS.find(cat => cat.id === catID);

  return {
    headerTitle: selectedOutfit.title,
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

export default ClothesInOutfitScreen;