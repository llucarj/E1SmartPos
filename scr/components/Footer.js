import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Footer = () =>{
    return(
        <View style={styles.viewFooter}>
          <Text style={styles.textFooter}>SMART POS REACT NATIVE 1.0.0</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewFooter:{
        width:'100%',
        height:40,
        alignItems: 'flex-end',
        justifyContent: 'center',
      
 
    },
    textFooter: {
        fontWeight: 'bold',
        color:'gray',
    }
})

export default Footer