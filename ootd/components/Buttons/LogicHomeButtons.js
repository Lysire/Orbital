// Reusable visual component to wrap add / remove / edit functionalities 
// with the option to go back to home, separated out for reusability

import React from 'react';
import { HeaderButtons, OverflowMenu, HiddenItem, Item } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomHeaderButton from './CustomHeaderButton';

const LogicHomeButtons = props => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
            title="Add"
            iconName="plus"
            onPress={props.onAdd}
        />
        <OverflowMenu OverflowIcon={<MaterialCommunityIcons name="pencil" size={23} color='white' />}>
            <HiddenItem title="Edit" onPress={props.onEdit} />
            <HiddenItem title="Remove" onPress={props.onRemove} />
        </OverflowMenu>
        <Item
            title="Home"
            iconName="home"
            onPress={props.onSelectHome}
        />
    </HeaderButtons>
);

export default LogicHomeButtons;