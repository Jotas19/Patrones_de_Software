import React from 'react';
import { View, Text } from 'react-native';

const VoucherView = ({ vouchers }) => {
  return (
    <View>
      <Text>Detalle de Voucher:</Text>
      {vouchers.map((voucher, index) => (
        <View key={index}>
          <Text>Método de Pago: {voucher.metodoPago.nombre}</Text>
          <Text>Fecha: {voucher.fecha}</Text>
          <Text>Cantidad Total: {voucher.cantidadTotal}</Text>
          <Text>Impuesto: {voucher.impuesto}</Text>
        </View>
      ))}
    </View>
  );
};

export default VoucherView;
