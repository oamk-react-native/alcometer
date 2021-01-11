import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
//import RadioButtonRN from 'radio-buttons-react-native';
//import RadioButton from 'react-native-radio-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(1);
  const [hours, setHours] = useState(1);
  const [gender, setGender] = useState('male');
  const [promilles,setPromilles] = useState(0);

  const bottleChoices=Array();
  const timeChoices=Array();

  for (let i = 1;i<=24;i++) {
    bottleChoices.push({label: i + ' bottles',value: i});
    timeChoices.push({label: i + ' hours',value: i})
  } 

  const genders = [
    {label: 'Male',value:'male'},
    {label: 'Female',value:'female'}
  ];

  function calculate() {
    console.log(gender);
    if (hours > 0 && bottles > 0 && weight > 0) {
      let result = 0;
      const litres = 0.33 * bottles;
      let gramms = litres * 8 * 4.5;
      const burning = weight / 10;
      gramms = gramms  - hours * burning;

      if (gender === 'male') {
        result = gramms / (weight * 0.7);
      }
      else {
        result = gramms / (weight * 0.6);
      }

      result = result < 0 ? 0 : result;
      setPromilles(result);
    }
  }


  // https://www.npmjs.com/package/react-native-dropdown-picker
  // https://www.npmjs.com/package/react-native-simple-radio-button
 
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.label}>Weight</Text>
      <TextInput style={styles.field,{marginLeft: 15}} keyboardType="number-pad" onChangeText={text => setWeight(text)} placeholder='Enter kilograms'/>
      <Text style={styles.label}>Bottles</Text>


      { Platform.OS === 'android' && 
        <Picker style={styles.bottles}
          onValueChange={(itemValue) => setBottles(itemValue)}
          selectedValue={bottles}
        >
          {bottleChoices.map((bottle) => (
            <Picker.Item label={bottle.label} value={bottle.value}/>
          ))
        }
        </Picker>
      }
      { Platform.OS === 'ios' && 
        <View style={{zIndex: 10}}>
        <DropDownPicker
          style={styles.bottles}
          defaultValue={bottles}
          labelStyle={{color: '#000'}}
         
          items={bottleChoices}
          itemStyle={{
              justifyContent: 'flex-start',
          }}
          onChangeItem={item => setBottles(item.value)}
        />
        </View>
      }
      <Text style={styles.label}>Time</Text>

      { Platform.OS === 'android' && 
        <Picker style={styles.time}
        onValueChange={(itemValue) => setHours(itemValue)}
        selectedValue={hours}
        >
          {timeChoices.map((time) => (
            <Picker.Item label={time.label} value={time.value}/>
          ))
        }
        </Picker>
      }
      
      { Platform.OS === 'ios' && 
      <View style={{zIndex:9}}>
        <DropDownPicker
          style={styles.time}
          defaultValue={hours}
          labelStyle={{color: '#000'}}
        
          items={timeChoices}
          itemStyle={{
              justifyContent: 'flex-start',
          }}
          onChangeItem={item => setHours(item.value)}
        />
      </View>
      } 

      <Text style={styles.label}>Gender</Text>
      <RadioForm
          style={styles.radio}
          buttonSize={16}
          radio_props={genders}
          initial={0}
          onPress={(value) => {setGender(value)}}
        />

      <Text style={styles.label}>Promilles</Text>
      <Text style={styles.label}>{promilles.toFixed(2)}</Text>
      <Button onPress={calculate} title="Calculate"></Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  label: {
    marginLeft: 5,
    marginBottom: 10,
  },
  field: {
    marginBottom: 10,
  },
  bottles: {
    marginBottom: 10,
  },
  time: {
    marginBottom: 10
  },
  radio: {
    marginLeft: 10
  }

});


/*
<Text >Bottles</Text>
      <Picker>
        {
          numbers.map((number) => (
            <Picker.Item key={number} label={number + ' bottles'} value={number} />
          ))
        }

      </Picker>
      <Text style={styles.field}>Time</Text>
      <Text style={styles.field}>Gender</Text>
      */