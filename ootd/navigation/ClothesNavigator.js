import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/clothes_screens/CategoriesScreen';
import CategoryClothesScreen from '../screens/clothes_screens/CategoryClothesScreen';
import ClothesDetailScreen from '../screens/clothes_screens/ClothesDetailScreen';
import EventsScreen from '../screens/outfits_screens/EventsScreen';
import EventsOutfitsScreen from '../screens/outfits_screens/EventsOutfitsScreen';
import ClothesInOutfitScreen from '../screens/outfits_screens/ClothesInOutfitScreen';

// default stack navigation options
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};

const ClothesNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    ClothesCategories: {
      screen: CategoryClothesScreen
    },
    ClothesDetail: ClothesDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const OutfitsNavigator = createStackNavigator(
  {
    Events: {
      screen: EventsScreen
    },
    ClothesEvents: {
      screen: EventsOutfitsScreen
    },
    ClothesInOutfit: {
      screen: ClothesInOutfitScreen
    }
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Clothes: {
      screen: ClothesNavigator,
      navigationOptions: {
        drawerLabel: 'Wardrobe'
      }
    },
    Combinations: OutfitsNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);

export default createAppContainer(MainNavigator);
