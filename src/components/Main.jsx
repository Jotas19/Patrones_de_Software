import React from 'react'
import Constans from 'expo-constants'
import {StyleSheet, Text, View, Button, TouchableWithoutFeedback} from 'react-native'
import eventLogger from './Objects/EventLogger.jsx'
import crearVoucher from './Objects/Voucher.jsx'


const Main = () => {

    const generarVoucher = () => {
    crearVoucher(10); // Llama a la función para generar el voucher
    }

    const styles= StyleSheet.create({

        container: {
            marginTop: Constans.statusBarHeight, 
            flexGrow: 5, 
            padding: 20, 
            paddingBottom: 5, 
            justifyContent: 'center'
        },

        buttonContainer: {
            marginBottom: 17, // Espacio entre botones
          },
          button: {
            padding: 20,
            backgroundColor: 'blue',
          },
          buttonText: {
            color: 'white',
            textAlign: 'center',
          },

    })

    /*
    eventLogger.addEvent('App started');
    eventLogger.addEvent('User logged in');
    console.log(eventLogger.getLog());
    */

    return (
        <View style={styles.container}>

            <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback onPress={generarVoucher}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Generar Voucher</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback onPress={generarVoucher}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Realizar Venta</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback onPress={generarVoucher}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Consultar Voucher</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback onPress={generarVoucher}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Cierre de Lote</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>



        </View>

    )
}

export default Main