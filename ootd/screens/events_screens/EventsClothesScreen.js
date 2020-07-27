import React, { useCallback, useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton';
import ClothesList from '../../components/Lists/ClothesList';
import Category from '../../classes/category';
import Clothes from '../../classes/clothes';

import { FirebaseContext } from '../../firebase';

/*
 * Screen that displays clothing under a certain
 * chosen event, in a list (2nd screen)
 */

// TODO: set up redux for clothes at a later point in time
const EventsClothesScreen = props => {
    const firebase = useContext(FirebaseContext)
    const [selectedEvent, setEvent] = useState(new Category("Loading...", "Loading...", "Loading...")) // UGLY HAX
    const eventID = props.navigation.getParam('eventID');
    const [clothes, setClothes] = useState({}) // id: Clothes mapping

    useEffect(() => {
        firebase.event(eventID).on("value", function(snapshot) {
          const eventObject = snapshot.val()
            console.log(eventObject)
          if (eventObject == null) {
              return
          }

          const eventInstance = Category.fromObject(eventObject)
          if (selectedEvent == null) {
            setEvent(eventInstance)
            props.navigation.setParams({
              eventTitle: eventInstance.title,
            })
          }
          console.log(selectedEvent)
        }, function (errorObject) {
          console.log("Firebase read failed: " + errorObject.code);
        });
      }, [selectedEvent])
    

    useEffect(() => {
        firebase.clothesList().on("value", function(snapshot) {
            const clothesObjects = snapshot.val()
        
            for (const clothesID in clothesObjects) {
                const clothesObject = clothesObjects[clothesID]
                var updatedClothesState = clothes;
                updatedClothesState[clothesID] = Clothes.fromObject(clothesObject)
                setClothes(updatedClothesState)
            }
        console.log(clothes)
        }, function (errorObject) {
            console.log("Firebase read failed: " + errorObject.code);
        });
    }, [clothes])
    

    const editCategoryHandler = useCallback(() => {
        props.navigation.navigate('EditEvents', { eventID: eventID });
    }, [eventID]); // to edit the event itself

    const clothesToDisplay = Object.values(clothes).filter(
        clothing => clothing.eventIDs.indexOf(eventID) >= 0
    ); // get clothes from a certain event ID (fix this to use redux) -> create actions and reducers for clothes

    // need to set parameters so that nav buttons can access, this is side effect
    useEffect(() => { 
        props.navigation.setParams({ edit: editCategoryHandler, selected: selectedEvent.title });
    }, [editCategoryHandler, selectedEvent]); // put the setParams in a body to prevent it from returning true

    return <ClothesList emptyData={() => <View><Text>placeholder</Text></View>} listData={clothesToDisplay} navigation={props.navigation} />;
};

EventsClothesScreen.navigationOptions = navData => {

    const editEventHandler = navData.navigation.getParam('edit'); // extract handler
    const selectedTitle = navData.navigation.getParam('eventTitle');

    return {
        headerTitle: selectedTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Edit"
                    iconName="pencil"
                    onPress={editEventHandler}
                />
                <Item
                    title="Home"
                    iconName="home"
                    onPress={() => navData.navigation.popToTop()}
                />
            </HeaderButtons>
        )
    };
};

export default EventsClothesScreen;
