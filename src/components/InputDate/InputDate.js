import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const InputDate = ({ setValue }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue(date);
  };

  return (
    <View style={styles.input}>
      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modal}>
          <DatePicker
            mode="calendar"
            onSelectedChange={handleDateChange}
            selected={selectedDate}
          />
          <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Text style={styles.buttonText}>close</Text>
      </TouchableOpacity>
        </View>

      </Modal>

      {selectedDate ? (
        <TextInput
          style={styles.selectedDateInput}
          value={selectedDate}
          editable={false}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateInput: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default InputDate;
