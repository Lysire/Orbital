import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { EVENTS, OUTFITS } from '../../data/dummy-data';
import GridTile from '../../components/GridTile';
import HeaderButton from '../../components/HeaderButton';

/*
 * Screen that displays events
 * in a 2 x 2 grid like fashion
 */

const EventsOutfitsScreen = props => {
    const catID = props.navigation.getParam('eventID');

    const displayedOutfits = OUTFITS.filter(
        outfit => outfit.eventIDs.indexOf(catID) >= 0
    ); // get clothes from a certain category ID

    const renderGridItem = itemData => {
        return (
            <GridTile
                title={itemData.item.title}
                color={'e5e5e5'}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'ClothesInOutfit',
                        params: {
                            outfitID: itemData.item.id
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
            data={displayedOutfits}
            renderItem={renderGridItem}
        />
    );

};

EventsOutfitsScreen.navigationOptions = navData => {
    const catID = navData.navigation.getParam('eventID');

    const selectedEvent = EVENTS.find(event => event.id === catID);

    return {
        headerTitle: selectedEvent.title,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}
            >
                <Item
                    title="Add or Remove"
                    iconName="ios-brush"
                    onPress={() => { }}
                />
            </HeaderButtons>
        )
    };
}

export default EventsOutfitsScreen;