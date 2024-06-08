import Command from './Command';

class ValidateUserRole extends Command {
    execute(request) {
        const rolesPermitidos = ['admin', 'cajero', 'supervisor', 'inventario', 'soporte', 'usuario'];
        if (!rolesPermitidos.includes(request.role)) {
            request.valid = false;
            request.errors.push('Acceso denegado');
        }
    }
}

class ValidateUserPermissions extends Command {
    execute(request) {
        const rolePermissions = {
            admin: ['generarVoucher', 'realizarVenta', 'consultarVoucher', 'cierreLote'],
            cajero: ['generarVoucher'],
            supervisor: ['generarVoucher', 'realizarVenta', 'consultarVoucher', 'cierreLote'],
            inventario: ['consultarVoucher'],
            soporte: ['generarVoucher', 'realizarVenta', 'consultarVoucher'],
            usuario: ['generarVoucher', 'realizarVenta']
        };        

        const validPermissions = rolePermissions[request.role];
        if (!validPermissions) {
            request.valid = false;
            request.errors.push('Rol de usuario no tiene permisos definidos');
            return;
        }

        for (const permission of request.permissions) {
            if (!validPermissions.includes(permission)) {
                request.valid = false;
                request.errors.push(`Permiso no válido para el rol: ${permission}`);
            }
        }
    }
}

class ChainComponentRolePermission {
    constructor() {
        this.chain = [
            new ValidateUserRole(),
            new ValidateUserPermissions()
        ];
    }

    processRequest(request) {
        for (const command of this.chain) {
            command.execute(request);
            if (!request.valid) break;
        }
    }
}

export default ChainComponentRolePermission;