// Objeto Flyweight para métodos de pago
const MetodoPagoFlyweight = (() => {
    const metodosPago = ['Crédito', 'Débito', 'Efectivo'];
    const flyweights = {};
  
    return {
      obtenerMetodoPago: (nombre) => {
        if (!flyweights[nombre]) {
          flyweights[nombre] = {
            nombre,
          };
        }
        return flyweights[nombre];
      },
      obtenerMetodosPago: () => flyweights,
    };
  })();
  
  const crearVoucher = (cantidadVouchers) => {
    const vouchers = [];
    const metodosPago = Object.keys(MetodoPagoFlyweight.obtenerMetodosPago());

    for (let i = 0; i < cantidadVouchers; i++) {
      const metodoPagoAleatorio = MetodoPagoFlyweight.obtenerMetodoPago(
        metodosPago[Math.floor(Math.random() * metodosPago.length)]
      );
      const cantidadTotalAleatoria = Math.floor(Math.random() * (1000000 - 10000 + 1) + 10000);
      const impuesto = cantidadTotalAleatoria * 0.19;
  
      const voucher = {
        metodoPago: metodoPagoAleatorio,
        fecha: new Date().toLocaleDateString(),
        cantidadTotal: cantidadTotalAleatoria,
        impuesto: impuesto,
      };
  
      vouchers.push(voucher);
    }
  
    console.log(`${cantidadVouchers} vouchers generados:`);
    console.log(vouchers);
  };
  
  export default crearVoucher;