/*************************************************************************************************************
El patrón Chain of Responsibility coordina la secuencia de validación, si uno de los comandos determina que la 
contraseña no cumple con los criterios requeridos, la validación se detiene y retorna un error. Mientras que el 
patrón Command encapsula cada regla de validación en una clase separada, lo que permite que cada una tenga su 
propia responsabilidad y lógica específica. 
**************************************************************************************************************/
import Command from './Command';

class ValidatePasswordLength extends Command {
    execute(request) {
        if (request.password.length < 8) {
            request.valid = false;
            request.errors.push('La contraseña debe tener al menos 8 caracteres');
        }
    }
}

class ValidatePasswordSpecialChar extends Command {
    execute(request) {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(request.password)) {
            request.valid = false;
            request.errors.push('La contraseña debe tener al menos un carácter especial');
        }
    }
}

class ValidatePasswordMinMay extends Command {
    execute(request) {
        const minMayRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
        if (!minMayRegex.test(request.password)) {
            request.valid = false;
            request.errors.push('La contraseña debe tener al menos una minúscula y una mayúscula');
        }
    }
}

class ValidatePasswordNumber extends Command {
    execute(request) {
        const numberRegex = /[0-9]/;
        if (!numberRegex.test(request.password)) {
            request.valid = false;
            request.errors.push('La contraseña debe tener al menos un número');
        }
    }
}

class ValidatePasswordLastUsed extends Command {
    execute(request) {
        const lastUsedPasswords = ['1234', '12345'];
        if (lastUsedPasswords.includes(request.password)) {
            request.valid = false;
            request.errors.push('La contraseña ya ha sido utilizada anteriormente');
        }
    }
}

class ChainComponentSyntax {
    constructor() {
        this.chain = [
            new ValidatePasswordLength(),
            new ValidatePasswordSpecialChar(),
            new ValidatePasswordMinMay(),
            new ValidatePasswordNumber(),
            new ValidatePasswordLastUsed()
        ];
    }

    processRequest(request) {
        for (const command of this.chain) {
            command.execute(request);
            if (!request.valid) break;
        }
    }
}

export default ChainComponentSyntax;