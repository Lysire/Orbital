import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/clothes_screens/CategoriesScreen';
import CategoryClothesScreen from '../screens/clothes_screens/CategoryClothesScreen';
import ClothesDetailScreen from '../screens/clothes_screens/ClothesDetailScreen';
import EditCategoriesScreen from '../screens/clothes_screens/EditCategoriesScreen';

import EventsScreen from '../screens/events_screens/EventsScreen';
import EventsClothesScreen from '../screens/events_screens/EventsClothesScreen';
import EditEventsScreen from '../screens/events_screens/EditEventsScreen';

// default stack navigation options
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white',
  headerTitle: 'A Screen'
};

// navigator for navigating between clothes screens
const ClothesNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    ClothesCategories: {
      screen: CategoryClothesScreen
    },
    ClothesDetail: ClothesDetailScreen,
    EditCategories: {
      screen: EditCategoriesScreen
    }
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

// navigator for navigating between outfits screens
const OutfitsNavigator = createStackNavigator(
  {
    Events: {
      screen: EventsScreen
    },
    ClothesEvents: {
      screen: EventsClothesScreen
    },
    EditEvents: {
      screen: EditEventsScreen
    }
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

// the main navigator encompassing both navigators
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
