/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

export default class EditView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        }

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    static navigationOptions = {
        title: 'Envoyez votre facture',
    };


    handleFormChange(formData) {
        this.setState({ formData: formData })
    }

    render() {
        const { params } = this.props.navigation.state;


        return (<ScrollView style={styles.container}>

            <Image source={{ uri: params.path }} style={{ width: 400, height: 200 }}></Image>

            <GiftedForm
                formName='invoiceForm' // GiftedForm instances that use the same name will also share the same states
                clearOnClose={false} // delete the values of the form when unmounted

                defaults={{
                    /*
                    username: 'Farid',
                    'gender{M}': true,
                    password: 'abcdefg',
                    country: 'FR',
                    birthday: new Date(((new Date()).getFullYear() - 18)+''),
                    */
                }}
            >

                <GiftedForm.TextInputWidget
                    name='invoiceNumber' // mandatory
                    title='Numero'
                    placeholder='12345'
                    clearButtonMode='while-editing'
                />

                <View style={{ flex: 1, flexDirection: 'row', paddingTop: 30 }}>
                    <Text style={{ flex: 1, fontSize: 16, color: '#000000' }}>Date de la facture</Text>
                    <DatePicker
                        style={{ flex: 1 }}
                        style={{ width: 200 }}
                        date={this.state.date}
                        mode="date"
                        placeholder="Date de la facture"
                        format="YYYY-MM-DD"
                        confirmBtnText="OK"
                        cancelBtnText="Annuler"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                </View>

                <GiftedForm.SubmitWidget
                    title='Envoyer'
                    widgetStyles={{
                        submitButton: {
                            backgroundColor: "#841584",
                        }
                    }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                        if (!values.invoiceNumber || !values.invoiceNumber.trim()) {
                            Alert.alert(
                                'Erreur de validation',
                                'Le numéro de facture est incorrect',
                            )
                            postSubmit();
                        }
                        else {

                            const { params } = this.props.navigation.state;
                            var photo = {
                                uri: params.path,
                                type: 'image/jpeg',
                                name: 'photo.jpg',
                            };

                            var body = new FormData();
                            var date = this.state.date || new Date();
                            var formattedDate = "";
                            try {
                                formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
                            } catch (e) {
                                formattedDate = date.toString();
                            }

                            body.append('file', photo)
                            body.append('date', formattedDate);
                            body.append('number', values.invoiceNumber);
                            var xhr = new XMLHttpRequest()
                            xhr.open('POST', 'http://invoices-demo.herokuapp.com/api/invoice/');
                            xhr.send(body);

                            xhr.onreadystatechange = (e) => {
                                if (xhr.readyState !== 4) {
                                    return;
                                }

                                if (xhr.status === 200) {
                                    console.log('success', xhr.responseText);
                                } else {
                                    postSubmit();
                                    const { navigate } = this.props.navigation;
                                    navigate('Home');
                                }
                            };

                            xhr.onerror = (error) => {
                                console.log(error);
                            }

                            xhr.onload = () => {
                                const { navigate } = this.props.navigation;
                                postSubmit();
                                navigate('Home');
                            }

                        }
                    }}
                />
            </GiftedForm>

        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
    }
});
