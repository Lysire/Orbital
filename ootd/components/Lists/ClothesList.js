import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ClothesItem from '../Tiles/ClothesItem';

/*
 * Visual wrapper around FlatList to render
 * clothing items represented ClothesItem
 */

const ClothesList = props => {
  const renderClothesItem = itemData => {
    return (
      <ClothesItem
        title={itemData.item.title}
        image={itemData.item.imageURL}
        size={itemData.item.size}
        onSelectClothes={() => {
          props.navigation.navigate({
            routeName: 'ClothesDetail',
            params: {
              clothesID: itemData.item.id // pass this parameter to ClothesDetailScreen
            }
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        ListEmptyComponent={props.emptyData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderClothesItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

// TODO (R): Possible use of Dimensions API to get good % values for marked values

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15 // marked
  }
});

export default ClothesList;
