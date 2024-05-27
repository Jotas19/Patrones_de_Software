class Command {
  execute(request) {}
}

class ValidatePasswordMail extends Command {
  execute(request) {
      // Lógica para validar el correo
      if (request.email !== 'test@example.com') {
          request.valid = false;
          request.errors.push('Email no válido');
      }
  }
}

class ValidatePasswordCelNumber extends Command {
  execute(request) {
      // Lógica para validar el número de celular
      if (request.phone !== '1234567890') {
          request.valid = false;
          request.errors.push('Número de celular no válido');
      }
  }
}

class ValidatePassword2FACode extends Command {
  execute(request) {
      // Lógica para validar el código 2FA
      if (request.code !== '123456') {
          request.valid = false;
          request.errors.push('Código 2FA no válido');
      }
  }
}

class ValidatePasswordMailSecondary extends Command {
  execute(request) {
      // Lógica para validar el correo secundario
      if (request.secondaryEmail !== 'test2@example.com') {
          request.valid = false;
          request.errors.push('Correo secundario no válido');
      }
  }
}

class ValidatePasswordSmartphone extends Command {
  execute(request) {
      // Lógica para validar el smartphone
      if (request.device !== 'smartphone') {
          request.valid = false;
          request.errors.push('Dispositivo no válido');
      }
  }
}

class ChainComponent2FA {
  constructor() {
      this.chain = [
          new ValidatePasswordMail(),
          new ValidatePasswordCelNumber(),
          new ValidatePassword2FACode(),
          new ValidatePasswordMailSecondary(),
          new ValidatePasswordSmartphone()
      ];
  }

  processRequest(request) {
      for (const command of this.chain) {
          command.execute(request);
          if (!request.valid) break;
      }
  }
}

export default ChainComponent2FA;