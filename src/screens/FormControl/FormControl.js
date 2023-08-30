import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CostumInput from '../../components/CustomInput/CostumInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { insertRegistro, UserExist, UpdateRegistro, getHour } from '../../../database/dbMethods';

export default function FormControl() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [selectedItem, setSelectedItem] = useState('');
    const items = ["AM", "PM"];
    let resultHour = 0;

    getHour(userName)
        .then((hour) => {
            resultHour = hour;
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    const onRegisterPressed = () => {
        (userName == '' || selectedItem == '')
            ? console.error("Todos los campos username y franja horaria son obligatorios")
            : UserExist(userName)
                .then((exist) => {
                    if (exist) {
                        getHour(userName)
                            .then((hour) => {
                                if (!hour) {
                                    insertRegistro(userName, date.toISOString().split('T')[0], formatTime(time), "null", selectedItem, "null", 0)
                                        .then((isSuccess) => {
                                            isSuccess
                                                ? (console.warn("Registrado con éxito!"), navigation.navigate('Home'))
                                                : console.warn("No se encontró el registro para actualizar");
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                        });
                                } else {
                                    console.warn("Hay un servicio pendiente por completar ");
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });

                    } else {
                        console.error('El usuario no existe');
                    }
                })

    }

    const onBack = () => {
        navigation.navigate('Home')
    }
    useEffect(() => {
        setDate(new Date());
        setTime(new Date());
        setFinishDate(new Date());
    }, []);
    const formatTime = (time) => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    const onRegisterFinishPressed = () => {
        let total = getTotal();
        getHour(userName)
            .then((hour) => {
                if (hour) {
                    (userName == '' || selectedItem == '')
                        ? console.error("Todos los campos username y franja horaria son obligatorios")
                        : UpdateRegistro(userName, formatTime(finishDate), selectedItem, total)
                            .then((validated) => {
                                validated
                                    ? (console.warn("Registro exitoso!"), navigation.navigate('Home'))
                                    : console.warn("No se encontró el registro para actualizar");
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                } else {
                    console.warn("Ya registro la salida");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const getTotal = () => {
        let totalHours = 0;
        let dateFinished = formatTime(finishDate);

        const startTimeParts = resultHour.horainicio.split(":");
        const endTimeParts = dateFinished.split(":");

        const startHour = parseInt(startTimeParts[0]);
        const startMinute = parseInt(startTimeParts[1]);

        const endHour = parseInt(endTimeParts[0]);
        const endMinute = parseInt(endTimeParts[1]);

        const hoursDiff = endHour - startHour;
        const minutesDiff = endMinute - startMinute;

        totalHours += hoursDiff + minutesDiff / 60;

        return totalHours.toFixed(2);
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>Form Control</Text>
                <Text style={styles.subtext}>Username</Text>
                <CostumInput placeholder="Username" value={userName} setValue={setUserName} />
                <Text style={styles.subtext}>Current Date</Text>
                <CostumInput value={date.toISOString().split('T')[0]} setValue={setDate} disabled />
                <Text style={styles.subtext}>Time Start</Text>
                <CostumInput value={formatTime(time)} setValue={setTime} disabled />
                <Text style={styles.subtext}>Select a strip</Text>
                <SelectDropdown
                    data={items}
                    onSelect={(selectedItem) => setSelectedItem(selectedItem)}
                    defaultButtonText="Select a option"
                    buttonStyle={{
                        width: 360,
                        marginTop: 10,
                        backgroundColor: 'white',
                        marginBottom: 10,
                        borderRadius: 5
                    }}
                />
                <Text style={styles.subtext}>Time Finish</Text>
                <CostumInput value={formatTime(finishDate)} setValue={setFinishDate} disabled />
                <CustomButton text="Check in time" onPress={onRegisterPressed} />
                <CustomButton text="Departure time" onPress={onRegisterFinishPressed} />
                <CustomButton text="Back" onPress={onBack} type="TERTIARY" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        marginVertical: 5
    }
});
