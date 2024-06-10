import Command from './Command';

class ValidatePasswordMail extends Command {
    execute(request) {
        if (request.email) {
            // Lógica para enviar el correo
            console.log("Se ha enviado un correo electrónico de autenticación a: " + request.email);
            request.valid = true;
        } else {
            request.valid = false;
            request.errors.push('Email requerido para la autenticación');
        }
    }
}

class ValidatePasswordCelNumber extends Command {
    execute(request) {
        if (request.phone) {
            // Lógica para enviar un mensaje de texto
            console.log("Se ha enviado un mensaje de texto de autenticación al número: " + request.phone);
            request.valid = true;
        } else {
            request.valid = false;
            request.errors.push('Número de celular requerido para la autenticación');
        }
    }
}

class ValidatePassword2FACode extends Command {
    execute(request) {
        if (request.code) {
            // Lógica para verificar con código de seguridad establecido por el usuario, puede usarse modal para pedir código
            let userCode = prompt("Por favor ingrese el código de autenticación:");
            if (userCode == request.code) {
                console.log("Código 2FA válido.");
                request.valid = true;
            } else {
                console.log("Código 2FA inválido.");
                request.valid = false;
                request.errors.push('Código de autenticación incorrecto');
            }
        } else {
            request.valid = false;
            request.errors.push('Código de autenticación requerido');
        }
    }
}

class ValidatePasswordMailSecondary extends Command {
    execute(request) {
        if (request.secondaryEmail) {
            // Lógica para enviar un correo electrónico secundario
            console.log("Se ha enviado un correo electrónico de autenticación secundario a: " + request.secondaryEmail);
            request.valid = true;
        } else {
            request.valid = false;
            request.errors.push('Correo secundario requerido para la autenticación');
        }
    }
}

class ValidatePasswordSmartphone extends Command {
    execute(request) {
        if (request.device === 'smartphone') {
            // Lógica para autenticarse con el celular
            console.log("Autenticación exitosa mediante smartphone.");
            request.valid = true;
        } else {
            request.valid = false;
            request.errors.push('Dispositivo no válido para autenticación');
        }
    }
}

class ChainComponent2FA {
    constructor() {
        this.chain = {
            Mail: new ValidatePasswordMail(),
            CelNumber: new ValidatePasswordCelNumber(),
            Code: new ValidatePassword2FACode(),
            MailSecondary: new ValidatePasswordMailSecondary(),
            Smartphone: new ValidatePasswordSmartphone()
        };
    }

    processRequest(request) {
        const command = this.chain[request.authMethod];
        if (command) {
            command.execute(request);
        } else {
            console.log("Método de autenticación no válido o no seleccionado.");
            request.valid = false;
            request.errors.push('Método de autenticación no válido o no seleccionado');
        }

        if (!request.valid) {
            console.log("Errores de autenticación: " + request.errors.join(", "));
        }
    }
}

export default ChainComponent2FA;