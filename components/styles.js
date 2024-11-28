import { StyleSheet } from 'react-native';

export const colors = {
  light: '#5f877a',
  background: '#c8dbd5',
  normal: '#304740',
  highlight: '#084231',
  warning: '#420004'
};

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
        color: colors.normal,
    },
    button: {
      fontSize: 20,
      color: colors.highlight,
    },
    input: {
      fontSize: 20,
      borderColor: 'black',
      borderRadius: 10,
    },
    image: {
      height: 200,
      width: 200
    },
    label: {},
    toggleText: {},
    card: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.light,
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