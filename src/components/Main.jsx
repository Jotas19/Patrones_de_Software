import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Animated, TouchableOpacity } from 'react-native';
import crearVoucher from './Objects/Voucher.jsx';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // Changed to false
    }).start();
  }, [fadeAnim]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const generarVoucher = () => {
    const vouchers = crearVoucher(20);
    navigation.navigate('Comprobantes', { vouchers });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      backgroundColor: '#f0f7ff',
      paddingHorizontal: 20,
      justifyContent: 'center',
      paddingTop: 60,
      alignItems: 'center',
    },
    menuBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: 'black',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    menuButton:
    {
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#006691',
    },
    menuButtonText: {
      color: 'white',
      fontSize: 20,
    },
    buttonContainer: {
      marginBottom: 20,
    },
    button: {
      paddingVertical: 15,
      backgroundColor: '#2499c7',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: 500, 
      height: 90,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonImage: {
      width: 70, 
      height: 70,
      marginRight: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={styles.menuBar}>
        <Image source={require('../../assets/images/logo.png')} style={styles.buttonImage} />
        <Text style={styles.title}>SISTEMA POS</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback onPress={generarVoucher}>
          <View style={styles.button}>
            <Image source={require('../../assets/images/comprobante.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Generar Voucher</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback onPress={generarVoucher}>
          <View style={styles.button}>
            <Image source={require('../../assets/images/venta.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Realizar Venta</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback onPress={generarVoucher}>
          <View style={styles.button}>
            <Image source={require('../../assets/images/comprobante.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Consultar Voucher</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback onPress={generarVoucher}>
          <View style={styles.button}>
            <Image source={require('../../assets/images/cierre.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Cierre de Lote</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Main;