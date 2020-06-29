import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/Buttons/CustomHeaderButton';
import * as categoriesActions from '../../store/actions/categories';

/*
 * Screen to add / edit existing categories and events
 * TO-DO: Input validation for input fields
 */

const EditCategoriesScreen = props => {
    const dispatch = useDispatch();

    const categoryID = props.navigation.getParam('categoryID'); // get from CategoriesScreen
    // falseish value for add if categoryID is not set ('')
    const catToEdit = useSelector(state => {
        return state.categories.availableCategories.find(cat => cat.id === categoryID); 
    });
    const isEdit = catToEdit ? true : false; 
    const [title, setTitle] = useState(catToEdit ? catToEdit.title : '');

    // following function handles submitting action, uses useCallBack to prevent infinite loop

    const submitHandler = useCallback(() => {
        if (catToEdit) {
            dispatch(
                categoriesActions.updateCategory(categoryID, title)
            );
        } else {
            dispatch(
                categoriesActions.createCategory(title)
            );
        }
        props.navigation.goBack();
    }, [dispatch, categoryID, title]);


    // useEffect for side effect handling
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
            ? 'Edit Category'
            : 'Add Category',

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
