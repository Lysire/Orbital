import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton';
import GridTile from '../../components/Tiles/GridTile';
import * as eventsActions from '../../store/actions/events';

/*
 * Screen that displays events
 * in a 2 x 2 grid like fashion (main screen for events)
 *
 * Like the categories screen, this screen should allow addition of
 * categories (and deletion via multiselect) but edits should be
 * handled within the category clothes screen
 */

const EventsScreen = props => {

  const availableEvents = useSelector(state => state.events.availableEvents);
  const dispatch = useDispatch();
  const [toDelete, setToDelete] = useState([]); // maintains IDs marked for deletion
  const [refresh, setRefresh] = useState(false); // to cause the flatlist to re-render

  const addEventHandler = useCallback(() => {
    props.navigation.navigate('EditEvents', { eventID: '' });
  }, []);

  const deleteEventHandler = useCallback(() => {
    Alert.alert('Are you sure?', 'Do you really want to delete?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(eventsActions.deleteEvent(toDelete));
          setToDelete([]);
        }
      }
    ]);
  }, [dispatch, toDelete]); // toDelete is dependency

  const deleteColor = '#fba21d' // consider moving this to Colors.js

  const renderGriditem = itemData => {
    return (
      <GridTile
        title={itemData.item.title}
        color={toDelete.indexOf(itemData.item.id) < 0 ? itemData.item.color : deleteColor}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'ClothesEvents',
            params: {
              eventID: itemData.item.id
            }
          });
        }}
        onLongSelect={() => {
          if (toDelete.indexOf(itemData.item.id) < 0) { // id is not inside
            setToDelete(prev => [...prev, itemData.item.id]);
            setRefresh(state => !state);
          } else { // id is inside, remove id
            setToDelete(prev => prev.filter(item => item.id === itemData.item.id));
            setRefresh(state => !state);
          }
        }}
      />
    );
  };

  // set parameters here
  useEffect(() => {
    props.navigation.setParams({ add: addEventHandler, delete: deleteEventHandler });
  }, [addEventHandler, deleteEventHandler]);

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={availableEvents}
      renderItem={renderGriditem}
      extraData={refresh}
    />
  );
};

EventsScreen.navigationOptions = navData => {
  const addEventHandler = navData.navigation.getParam('add');
  const deleteEventHandler = navData.navigation.getParam('delete');

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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName="plus"
          onPress={addEventHandler}
        />
        <Item
          title="Remove"
          iconName="trash-can"
          onPress={deleteEventHandler}
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
