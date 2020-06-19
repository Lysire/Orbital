// Reusable visual component to wrap add / remove / edit functionalities 
// with the option to go back to home, separated out for reusability

import React from 'react';
import LogicButtons from './LogicButtons';

const LogicHomeButtons = props => (
    <LogicButtons onAdd={props.onAdd} onEdit={props.onEdit} onRemove={props.onRemove}>
        <Item
            title="Home"
            iconName="home"
            onPress={props.onSelectHome}
        />
    </LogicButtons>
);

export default LogicHomeButtons;