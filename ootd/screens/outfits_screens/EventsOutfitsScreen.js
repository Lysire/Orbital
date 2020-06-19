import React from 'react';
import { FlatList } from 'react-native';

import { EVENTS, OUTFITS } from '../../data/dummy-data';
import GridTile from '../../components/Tiles/GridTile';
import LogicHomeButtons from '../../components/Buttons/LogicHomeButtons';

/*
 * Screen that displays outfits 
 * in a 2 x 2 grid like fashion (2nd screen)
 */

const EventsOutfitsScreen = props => {
    const catID = props.navigation.getParam('eventID');

    const displayedOutfits = OUTFITS.filter(
        outfit => outfit.eventIDs.indexOf(catID) >= 0
    ); // get outfits from a certain eventID

    const renderGridItem = itemData => {
        return (
            <GridTile
                title={itemData.item.title}
                color={'e5e5e5'}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'ClothesInOutfit', // navigate to ClothesInOutfitScreen
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
        headerRight: () => (<LogicHomeButtons onAdd={() => { }} onEdit={() => { }}
        onRemove={() => { }} onSelectHome={() => navData.navigation.popToTop()} />
      )
    };
}

export default EventsOutfitsScreen;