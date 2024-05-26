import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const VoucherView = ({ route, navigation }) => {
  const { vouchers } = route.params;

  const handleBackToMain = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuBar}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.buttonImage} />
        <Text style={styles.title}>SISTEMA POS</Text>
        <TouchableOpacity onPress={handleBackToMain}>
          <View style={styles.menuButton}>
            <Text style={styles.menuButtonText}>← Volver</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.vouchersContainer}>
        {vouchers.map((voucher, index) => (
          <View style={styles.voucherContainer} key={index}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleBig}>Comprobante</Text>
                <Text style={styles.titleSmall}>Punto de Venta POS</Text>
              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Método de Pago:</Text>
              <Text style={styles.value}>{voucher.metodoPago && voucher.metodoPago.nombre}</Text>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.value}>{voucher.fecha}</Text>
              <Text style={styles.label}>Cantidad Total:</Text>
              <Text style={styles.value}>{voucher.cantidadTotal}</Text>
              <Text style={styles.label}>Impuesto:</Text>
              <Text style={styles.value}>{voucher.impuesto}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f7ff',
  },
  menuBar: {
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
  menuButton: {
    padding: 10,
    backgroundColor: '#006691',
    borderRadius: 5,
  },
  menuButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  vouchersContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  voucherContainer: {
    width: '20%',
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#6e4a0e',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 10,
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#B3907A',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  titleBig: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EFE7DA',
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 18,
    color: '#EFE7DA',
    textAlign: 'center',
  },
  content: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#006691',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2c3e50',
  },
  buttonImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});

//FALTA HACER RESPONSIVE LA VISTAS
//TENGO PROBLEMAS CON EL SCROLL VERIFICAR

export default VoucherView;