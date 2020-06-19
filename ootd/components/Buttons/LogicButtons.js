// Reusable visual component to wrap add / remove / edit functionalities
// separated out for reusability

import React from 'react';
import { HeaderButtons, OverflowMenu, HiddenItem, Item } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomHeaderButton from './CustomHeaderButton';

const LogicButtons = props => ( // use of {props.children} to reuse code
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
        {props.children} 
    </HeaderButtons>
);

export default LogicButtons;