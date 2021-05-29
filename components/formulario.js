import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setShowForm}) => {
  const [patient, setPatient] = useState('');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [symptom, setSymptom] = useState('');

  const [data, setData] = useState('');
  const [hour, setHour] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmDate = date => {
    const options = {year: 'numeric', month: 'long', day: '2-digit'};
    setData(date.toLocaleDateString('es-ES', options));
    hideDatePicker();
  };

  //muestra y oculta el time picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmTime = time => {
    console.log(time);
    const options = {hour: 'numeric', minute: '2-digit'};
    setHour(time.toLocaleString('en-US', options));
    hideDatePicker();
  };

  const createNewCita = () => {
    if (
      patient.trim() === '' ||
      owner.trim() === '' ||
      phone.trim() === '' ||
      data.trim() === '' ||
      hour.trim() === '' ||
      symptom.trim() === ''
    ) {
      showAlert();
      return;
    }
    // create new appointment
    const cita = {patient, owner, phone, data, hour, symptom};
    cita.id = shortid.generate();
    const citasNew = [...citas, cita];
    setCitas(citasNew);

    //ocultar el formulario
    setShowForm(false);

    //resetar el formulario
  };

  const showAlert = () => {
    Alert.alert(
      'Error', // title
      'Todos los campos son obligatorios', // message
      [
        {
          text: 'OK', // array button
        },
      ],
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Patient:</Text>
          <TextInput
            style={styles.input}
            onChangeText={txt => setPatient(txt)}
          />
        </View>

        <View>
          <Text style={styles.label}>Owner:</Text>
          <TextInput style={styles.input} onChangeText={txt => setOwner(txt)} />
        </View>

        <View>
          <Text style={styles.label}>Phone Contact:</Text>
          <TextInput
            style={styles.input}
            onChangeText={txt => setPhone(txt)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Button title="Select Data" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            // display="spinner"
            onConfirm={confirmDate}
            onCancel={hideDatePicker}
            locale="es_Es"
            headerTextIOS="Select a date"
            // cancelTextIOS="Cancelar"
            // confirmTextIOS="Confirmar"
          />
          <Text>{data}</Text>
        </View>
        <View>
          <Button title="Select a Hour" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmTime}
            onCancel={hideTimePicker}
            locale="es_Es"
            headerTextIOS="Select a hour"
            // cancelTextIOS="Cancelar"
            // confirmTextIOS="Confirmar"
          />
          <Text>{hour}</Text>
        </View>
        <View>
          <Text style={styles.label}>Sintomas :</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={txt => setSymptom(txt)}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => createNewCita()}
            style={styles.btnSubmit}>
            <Text style={styles.txtSubmit}>create a new appointment</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginHorizontal: '2.5%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  txtSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
