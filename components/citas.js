import React from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';

const Citas = ({item, removePatient}) => {
  const dialogRemove = id => {
    console.log('Eliminado .....', id);
    //   return;
    removePatient(id);
  };
  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>patient: </Text>
        <Text style={styles.text}>{item.patient}</Text>
      </View>
      <View>
        <Text style={styles.label}>owner: </Text>
        <Text style={styles.text}>{item.owner}</Text>
      </View>
      <View>
        <Text style={styles.label}>symptom: </Text>
        <Text style={styles.text}>{item.symptom}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogRemove(item.id)}
          style={styles.btnRemove}>
          <Text style={styles.txtRemove}>remove &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
  },
  btnRemove: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  txtRemove: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Citas;
