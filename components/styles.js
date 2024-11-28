import { StyleSheet } from 'react-native';

export const colors = {
      
};

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 200,
    },
    h1: {
      fontSize: 25,
      fontVariant: 'bold'
    },
    h2: {},
    normalText: {
        fontSize: 20,
        padding: 2,
    },
    button: {
      fontSize: 20,
    },
    input: {
      fontSize: 20,
      borderColor: 'black',
      borderRadius: 10,
    },
    label: {},
    toggleText: {},
    card: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'pink',
      borderRadius: 10,
      width: 120,
      height: 100,
      padding: 10,
      margin: 10,
    },
    cardContainer: {
      flex: 1,
      flexDirection: 'row', 
      flexWrap: 'wrap',  
      justifyContent: 'center',   
      marginTop: 200,
    }
});