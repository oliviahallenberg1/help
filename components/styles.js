import { StyleSheet } from 'react-native';

export const colors = {
  light: '#5f877a',
  background: '#c8dbd5',
  tabBackground: '#adc4bd',
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
      paddingTop: 100,
    },
    h1: {
      fontSize: 25,
      fontVariant: 'bold',
      fontFamily: '',
      alignSelf: 'center',
      padding: 10,
    },
    h2: {
      fontSize: 18,
      padding: 2,
      margin: 2,
    },
    normalText: {
        fontSize: 15,
        padding: 2,
        color: colors.normal,
        margin: 2
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
      width: 200,
      alignSelf: 'center',
      borderRadius: 10,
    },
    itemRow: {
      flexDirection: 'row',
      fontSize: 16,
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '100%'
    },
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
    },     
    resultCard: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: colors.light,
      borderRadius: 10,
      width: 120,
      height: 20,
      padding: 10,
      margin: 10,
    },
});