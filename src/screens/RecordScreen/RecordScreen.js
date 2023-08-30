import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import InputDate from '../../components/InputDate/InputDate';
import CostumInput from '../../components/CustomInput/CostumInput';
import { UserExist, getRecords } from '../../../database/dbMethods';

export default function RecordScreen() {
    const [userName, setUserName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigation = useNavigation();
    
    const onBack = () => {
        navigation.navigate('Home');
    };
    function transformDateFormat(date) {
        const parts = date.split('/');
        if (parts.length === 3) {
            return `${parts[0]}-${parts[1]}-${parts[2]}`;
        }
        return date;
    }
    const onRegisterPressed = () => {
        if (userName === ''|| startDate ==='' || endDate === '') {
            setModalContent([{ Error: 'Faltan campos por digelenciar'}]);
            setModalVisible(true);
        } else {
            UserExist(userName)
                .then((exist) => {
                    if (exist) {
                        const transformedStartDate = transformDateFormat(startDate);
                        const transformedEndDate = transformDateFormat(endDate);
                        getRecords(userName, transformedStartDate, transformedEndDate)
                            .then((records) => {
                                if (records) {
                                    setModalContent(records);
                                    setModalVisible(true);
                                } else {
                                    setModalContent([{ error: 'el usuario es obligatorio' }]);
                                    setModalVisible(true);
                                }
                            })
                            .catch((error) => {
                                setModalContent(`Error: ${error}`);
                                setModalVisible(true);
                            });
                    } else {
                        setModalContent([{ Error: 'el usuario no existe' }]);
                        setModalVisible(true);
                    }
                })
                .catch((error) => {
                    setModalContent(`Error: ${error}`);
                    setModalVisible(true);
                });
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>register Detail</Text>
                <CostumInput placeholder="Username" value={userName} setValue={setUserName} />
                <Text style={styles.subtext}>Start Date</Text>
                <InputDate setValue={setStartDate} />
                <Text style={styles.subtext}>Finish Date</Text>
                <InputDate setValue={setEndDate} />
                <CustomButton text="View details" onPress={onRegisterPressed} />

                <CustomButton text="Back" onPress={onBack} type="TERTIARY" />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {Array.isArray(modalContent) && modalContent.map((item, index) => (
                                <View key={index} style={styles.arrayItem}>
                                    {Object.entries(item).map(([key, value]) => (
                                        <Text key={key}>
                                            {key}: {value}{", "}
                                        </Text>
                                    ))}
                                </View>
                            ))}
                            <CustomButton text="Close" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
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
        marginVertical: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    arrayItem: {
        marginBottom: 8,
    },
    arrayItemText: {
        marginRight: 8,
    },
});
