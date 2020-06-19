import React from 'react';

import { OUTFITS, CLOTHES } from '../../data/dummy-data'
import ClothesList from '../../components/Lists/ClothesList';
import LogicHomeButtons from '../../components/Buttons/LogicHomeButtons';

/*
 * Screen that displays clothing under a certain
 * chosen outfit, in a list (last screen)
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
    headerRight: () => (<LogicHomeButtons onAdd={() => { }} onEdit={() => { }}
    onRemove={() => { }} onSelectHome={() => navData.navigation.popToTop()} />
  )
  };
};

export default ClothesInOutfitScreen;