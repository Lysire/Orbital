import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { EVENTS, CLOTHES } from '../../data/dummy-data';
import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton';
import ClothesList from '../../components/Lists/ClothesList';

/*
 * Screen that displays clothing under a certain
 * chosen event, in a list (2nd screen)
 */

// TODO: set up store for clothes (actions and reducers), refactor 

const EventsClothesScreen = props => {

    const eventID = props.navigation.getParam('eventID');

    const editCategoryHandler = useCallback(id => {
        props.navigation.navigate('EditEvents', { eventID: id });
    }, [id]); // to edit the event itself

    const clothesToDisplay = CLOTHES.filter(
        clothing => clothing.eventIDs.indexOf(eventID) >= 0
    ); // get clothes from a certain event ID (fix this to use redux) -> create actions and reducers for clothes

    // need to set parameters so that nav buttons can access, this is side effect
    useEffect(() => props.navigation.setParams({ edit: editCategoryHandler }), [editCategoryHandler]);

    return <ClothesList listData={clothesToDisplay} navigation={props.navigation} />;
};

CategoryClothesScreen.navigationOptions = navData => {

    const eventID = navData.navigation.getParam('eventID'); // header title is dynamic
    const onEdit = navData.navigation.getParam('edit'); // extract handler

    const selectedEvent = EVENTS.find(event => event.id === eventID); // fix this to use redux

    return {
        headerTitle: selectedEvent.title,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Edit"
                    iconName="pencil"
                    onPress={() => onEdit(eventID)}
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
