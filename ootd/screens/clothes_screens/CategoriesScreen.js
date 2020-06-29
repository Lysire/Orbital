import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux'; // to obtain slice of state (from events reducer)

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton'
import GridTile from '../../components/Tiles/GridTile';
import * as categoriesActions from '../../store/actions/categories';

/*
 * Screen that displays categories of different clothes
 * in a 2 x 2 grid like fashion (main screen for clothes)
 * 
 * Should allow addition of categories (and deletion via multiselect)
 * but edits should be handled within the category clothes screen
 */

const CategoriesScreen = props => {

  // accesses store, obtains the reducer through state.categories, then gets the availableCategories
  const availableCategories = useSelector(state => state.categories.availableCategories);
  const dispatch = useDispatch();
  const [toDelete, setToDelete] = useState([]); // maintains IDs marked for deletion
  const [refresh, setRefresh] = useState(false); // to cause the flatlist to re-render


  const addCategoryHandler = useCallback(() => {
    props.navigation.navigate('EditCategories', { categoryID: '' });
  }, []);


  const deleteHandler = useCallback(() => {
    Alert.alert('Are you sure?', 'Do you really want to delete?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(categoriesActions.deleteCategory(toDelete));
          setToDelete([]);
        }
      }
    ]);
  }, [dispatch, toDelete]); // toDelete is also a dependency -.-||

  const deleteColor = '#fba21d'; // can change this later

  const renderGridItem = itemData => {
    return (
      <GridTile
        title={itemData.item.title}
        color={toDelete.indexOf(itemData.item.id) < 0 ? itemData.item.color: deleteColor}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'ClothesCategories',
            params: {
              categoryID: itemData.item.id
            }
          });
        }}
        onLongSelect={() => {
          if (toDelete.indexOf(itemData.item.id) < 0) { // id is not inside
            setToDelete(prev => [...prev, itemData.item.id]);
            console.log(toDelete);
            setRefresh(state => !state);
          } else { // id is inside, remove the id
            setToDelete(prev => prev.filter(item => item.id === itemData.item.id));
            console.log(toDelete);
            setRefresh(state => !state);
          }
        }}
      />
    );
  };

  // set parameters here
  useEffect(() => {
    props.navigation.setParams({ add: addCategoryHandler, delete: deleteHandler });
  }, [addCategoryHandler, deleteHandler]);

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={availableCategories}
      renderItem={renderGridItem}
      extraData={refresh}
    />
  );
};

CategoriesScreen.navigationOptions = navData => {
  const addEventHandler = navData.navigation.getParam('add');
  const deleteEventHandler = navData.navigation.getParam('delete');

  return {
    headerTitle: 'Categories',
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

export default CategoriesScreen;
