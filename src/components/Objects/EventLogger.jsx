 /*
La clase EventLogger tiene un constructor que comprueba si ya existe una instancia de la clase. Si existe, devuelve esa instancia en lugar de crear una nueva.
Se utiliza un array log para almacenar los eventos registrados.
El método addEvent(event) agrega un evento al registro y lo muestra por consola.
El método getLog() devuelve el registro completo de eventos.
Se exporta una única instancia del registro de eventos usando Object.freeze para evitar que se pueda modificar accidentalmente.
*/ 
class EventLogger {
    constructor() {
      if (EventLogger.instance) {
        return EventLogger.instance;
      }
  
      this.log = [];
      EventLogger.instance = this;
    }
  
    addEvent(event) {
      this.log.push(event);
      console.log('Event added:', event);
    }
  
    getLog() {
      return this.log;
    }
  }
  
  // Uso de la clase Singleton
  const logger = new EventLogger();
  Object.freeze(logger);
  
  export default logger;
  
 