import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton'
import { CATEGORIES } from '../../data/dummy-data';
import GridTile from '../../components/Tiles/GridTile';
import LogicButtons from '../../components/Buttons/LogicButtons';

/*
 * Screen that displays categories of different clothes
 * in a 2 x 2 grid like fashion (main screen for clothes)
 */

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <GridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'ClothesCategories',
            params: {
              categoryID: itemData.item.id
            }
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGridItem}
    />
  );
};

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton} // using custom header button component
      >
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => <LogicButtons onAdd={() => {}} onEdit={() => {}} onRemove={() => {}} />
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoriesScreen;
