import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton';
import * as eventsActions from '../../store/actions/events';

/*
 * Screen to add / edit existing events
 * TO-DO: Input validation for input fields
 */

const EditCategoriesScreen = props => {
    const dispatch = useDispatch();

    const eventID = props.navigation.getParam('eventID'); // get from EventsScreen

    // falseish value for add if eventID is not set
    const eventToEdit = useSelector(state =>
        state.events.availableEvents.find(event => event.id === eventID)); 
    
    const isEdit = eventToEdit ? true : false; 
    const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : '');

    // following function handles submitting action, uses useCallBack to prevent infinite loop

    const submitHandler = useCallback(() => {
        if (eventToEdit) {
            dispatch(
                eventsActions.updateEvent(eventID, title)
            );
        } else {
            dispatch(
                eventsActions.createEvent(title)
            );
        }
        props.navigation.goBack();
    }, [dispatch, eventID, title]);

    useEffect(() => {
        props.navigation.setParams({ onSubmit: submitHandler, isEdit: isEdit });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View>
                <View>
                    <Text>Title</Text>
                    <TextInput
                        style={styles.inputs}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

EditCategoriesScreen.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('onSubmit');
    const isEdit = navData.navigation.getParam('isEdit');
    return {
        headerTitle: isEdit
            ? 'Edit Event'
            : 'Add Event',

        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Save"
                    iconName='content-save'
                    onPress={submitFunction}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formInputs: {
        width: '100%'
    },
    labels: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    inputs: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default EditCategoriesScreen;