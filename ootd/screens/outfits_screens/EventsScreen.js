import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton';
import { EVENTS } from '../../data/dummy-data';
import GridTile from '../../components/Tiles/GridTile';
import LogicButtons from '../../components/Buttons/LogicButtons';

/*
 * Screen that displays events
 * in a 2 x 2 grid like fashion (main screen for events)
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
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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

export default EventsScreen;
