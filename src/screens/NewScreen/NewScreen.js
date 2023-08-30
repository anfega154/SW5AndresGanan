import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CostumInput from '../../components/CustomInput/CostumInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import InputDate from '../../components/InputDate/InputDate';
import { insertNovedad,UserExist } from '../../../database/dbMethods';

export default function NewScreen() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [duration, setDuration] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const items = ["Incapacidad", "Licencia", "Vacaciones"];
    const onBack = () => {
        navigation.navigate('Home');
    }

    useEffect(() => {
        if (startDate && endDate) {
            const startDateParts = startDate.split('/');
            const endDateParts = endDate.split('/');
            const startDateObj = new Date(
                startDateParts[0],
                startDateParts[1] - 1,
                startDateParts[2]
            );
            const endDateObj = new Date(
                endDateParts[0],
                endDateParts[1] - 1,
                endDateParts[2]
            );

            const timeDiff = Math.abs(endDateObj - startDateObj);
            const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setDuration(diffDays.toString());
        } else {
            setDuration('');
        }
    }, [startDate, endDate]);

    const onSubmitPressed = () => {
        if (selectedItem == 'Licencia' && duration > 1) {
            console.warn('la novedad supera las 8 horas debe ingresarse como vacaciones')
            return
        }
        if (selectedItem == 'Vacaciones' && duration < 2 || selectedItem == 'Vacaciones' && duration > 15) {
            console.warn('el periodo de vacaciones no es valido')
            return
        }
        (userName == '' || selectedItem == '' || startDate == '' || endDate == '')
            ? console.error("Todos los campos username y franja horaria son obligatorios")
            : UserExist(userName)
                .then((exist) => {
                    if (exist) {
                        insertNovedad(userName, selectedItem, duration, startDate, endDate)
                            .then((isSuccess) => {
                                isSuccess
                                    ? (console.warn("Registrado con éxito!"), navigation.navigate('Home'))
                                    : console.warn("No se pudo registar novedad");
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    } else {
                        console.error('El usuario no existe');
                    }
                })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>News</Text>
                <CostumInput placeholder="Username" value={userName} setValue={setUserName} />
                <CostumInput placeholder="Duration" value={duration} setValue={setDuration} disabled/>
                <Text>Type</Text>
                <SelectDropdown
                    data={items}
                    onSelect={(selectedItem) => setSelectedItem(selectedItem)}
                    defaultButtonText="Select an option"
                    buttonStyle={{
                        width: 360,
                        marginTop: 10,
                        backgroundColor: 'white',
                        marginBottom: 10,
                        borderRadius: 5,
                    }}
                />
                <Text style={styles.subtext}>Start Date</Text>
                <InputDate setValue={setStartDate} />
                <Text style={styles.subtext}>Finish Date</Text>
                <InputDate setValue={setEndDate} />
                <CustomButton text="Submit" onPress={onSubmitPressed} />
                <CustomButton text="Back" onPress={onBack} type="TERTIARY" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    subtext: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});
