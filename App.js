import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Cita from './components/citas';
import Formulario from './components/formulario';
const App = () => {
  //state
  const [showForm, setShowForm] = useState(true);

  const [citas, setCitas] = useState([
    {id: 1, patient: 'Hook', owner: 'juan', symptom: 'No come'},
    {id: 2, patient: 'Redux', owner: 'josue', symptom: 'No duerme'},
    {id: 3, patient: 'Native', owner: 'Itzel', symptom: 'No canta'},
  ]);

  // elimina los patients del state
  const removePatient = id => {
    setCitas(citaActual => {
      return citaActual.filter(cita => cita.id !== id);
    });
  };
  // show a form
  const showform = () => {
    setShowForm(!showForm);
  };
  // ocultar teclado
  const closeScanner = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableNativeFeedback onPress={() => closeScanner()}>
      <View style={styles.container}>
        <Text style={styles.title}>Appointment Manager</Text>
        <View>
          <TouchableHighlight
            onPress={() => showform()}
            style={styles.btnShowForm}>
            <Text style={styles.txtShowForm}>
              {showForm ? 'cancel appointment' : 'create a new appointment'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          {showForm ? (
            <>
              <Text style={styles.title}>create a new appointment</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                setShowForm={setShowForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {citas.length > 0
                  ? 'Manage appointments'
                  : 'There are no appointments, please Add one'}
              </Text>
              <FlatList
                style={styles.list}
                data={citas}
                renderItem={({item}) => (
                  <Cita item={item} removePatient={removePatient} />
                )}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  title: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  list: {
    flex: 1,
  },
  btnShowForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  txtShowForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
