/* 
El patrón Chain of Responsibility coordina la secuencia de validación, si uno de los comandos determina que la 
contraseña no cumple con los criterios requeridos, la validación se detiene y retorna un error. Mientras que el 
patrón Command encapsula cada regla de validación en una clase separada, lo que permite que cada una tenga su 
propia responsabilidad y lógica específica. 
*/

// Clase base para los comandos de validación
class Command {
  // Método que ejecuta el comando
  execute(request) {}
}

// Comando para validar la longitud de la contraseña
class ValidatePasswordLength extends Command {
  execute(request) {
    // Lógica para validar la longitud de la contraseña
    if (request.password.length < 8) {
      // Si la longitud es menor a 8 caracteres, se marca la solicitud como no válida y se agrega un error
      request.valid = false;
      request.errors.push('La contraseña debe tener al menos 8 caracteres');
    }
  }
}

// Comando para validar la presencia de caracteres especiales en la contraseña
class ValidatePasswordSpecialChar extends Command {
  execute(request) {
    // Expresión regular para verificar caracteres especiales
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(request.password)) {
      // Si no se encuentran caracteres especiales, se marca la solicitud como no válida y se agrega un error
      request.valid = false;
      request.errors.push('La contraseña debe tener al menos un carácter especial');
    }
  }
}

// Comando para validar la presencia de caracteres en minúscula y mayúscula en la contraseña
class ValidatePasswordMinMay extends Command {
  execute(request) {
    // Expresión regular para verificar minúsculas y mayúsculas
    const minMayRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
    if (!minMayRegex.test(request.password)) {
      // Si no se encuentran minúsculas o mayúsculas, se marca la solicitud como no válida y se agrega un error
      request.valid = false;
      request.errors.push('La contraseña debe tener al menos una minúscula y una mayúscula');
    }
  }
}

// Comando para validar la presencia de al menos un número en la contraseña
class ValidatePasswordNumber extends Command {
  execute(request) {
    // Expresión regular para verificar números
    const numberRegex = /[0-9]/;
    if (!numberRegex.test(request.password)) {
      // Si no se encuentra ningún número, se marca la solicitud como no válida y se agrega un error
      request.valid = false;
      request.errors.push('La contraseña debe tener al menos un número');
    }
  }
}

// Comando para validar si la contraseña ha sido utilizada previamente
class ValidatePasswordLastUsed extends Command {
  execute(request) {
    // Contraseñas previamente utilizadas (ejemplo)
    const lastUsedPasswords = ['12345678', 'password1'];
    if (lastUsedPasswords.includes(request.password)) {
      // Si la contraseña ha sido utilizada anteriormente, se marca la solicitud como no válida y se agrega un error
      request.valid = false;
      request.errors.push('La contraseña ya ha sido utilizada anteriormente');
    }
  }
}

// Clase que representa la cadena de responsabilidad para la validación de sintaxis de contraseña
class ChainComponentSyntax {
  constructor() {
    // Lista de comandos para la validación de sintaxis de contraseña
    this.chain = [
      new ValidatePasswordLength(),
      new ValidatePasswordSpecialChar(),
      new ValidatePasswordMinMay(),
      new ValidatePasswordNumber(),
      new ValidatePasswordLastUsed()
    ];
  }

  // Método para procesar la solicitud
  processRequest(request) {
    for (const command of this.chain) {
      // Se ejecuta cada comando en la cadena
      command.execute(request);
      // Si la solicitud no es válida, se interrumpe el proceso
      if (!request.valid) break;
    }
  }
}

// Exportar la clase para su uso en otros módulos
export default ChainComponentSyntax;