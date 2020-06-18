import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import { EVENTS } from '../../data/dummy-data';
import GridTile from '../../components/GridTile';

/*
 * Screen that displays events
 * in a 2 x 2 grid like fashion
 */

const EventsScreen = props => {
  const renderGriditem = itemData => {
    return (
      <GridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'ClothesEvents',
            params: {
              eventID: itemData.item.id
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
      data={EVENTS}
      renderItem={renderGriditem}
    />
  );
};

EventsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Events',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add or Remove"
            iconName="ios-brush"
            onPress={() => { }} // to add logic to this
          />
        </HeaderButtons>
      )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EventsScreen;
