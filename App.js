import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';
const App = () => {
  //state
  const [citas, setCitas] = useState([]);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const setQuotesStorage = async () => {
      try {
        const quotesStorage = await AsyncStorage.getItem('quotes');
        if (quotesStorage) {
          setCitas(JSON.parse(quotesStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    setQuotesStorage();
  }, []);

  // elimina los patients del state
  const removePatient = id => {
    const quotesFilt = citas.filter(cita => cita.id !== id);
    setCitas(quotesFilt);
    setQuotesStorage(JSON.stringify(quotesFilt));
  };
  // show a form
  const showform = () => {
    setShowForm(!showForm);
  };
  // ocultar teclado
  const closeScanner = () => {
    Keyboard.dismiss();
  };

  //alamacenar todas las cita
  const setQuotesStorage = async quotesJSON => {
    try {
      await AsyncStorage.setItem('quotes', quotesJSON);
    } catch (error) {
      console.log(error);
    }
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
                setQuotesStorage={setQuotesStorage}
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
