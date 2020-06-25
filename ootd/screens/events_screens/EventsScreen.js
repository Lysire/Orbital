import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton';
import GridTile from '../../components/Tiles/GridTile';

/*
 * Screen that displays events
 * in a 2 x 2 grid like fashion (main screen for events)
 */

const EventsScreen = props => {

  const availableEvents = useSelector(state => state.events.availableEvents);

  const addEventHandler = useCallback(() => {
    props.navigation.navigate('EditEvents', {eventID: ''});
  }, []);

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

  useEffect(() => props.navigation.setParams( { add: addEventHandler }), [addEventHandler]);

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={availableEvents}
      renderItem={renderGriditem}
    />
  );
};

EventsScreen.navigationOptions = navData => {
  const addEventHandler = navData.navigation.getParam('add');

  return {
    headerTitle: 'Events',
    headerLeft: () => ( // may consider factoring this out into a custom button component
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName="plus"
          onPress={addEventHandler}
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
