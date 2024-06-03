import Command from './Command';

class ValidateUserRole extends Command {
    execute(request) {
        const rolesPermitidos = ['admin', 'cajero', 'supervisor', 'inventario', 'soporte'];
        if (!rolesPermitidos.includes(request.role)) {
            request.valid = false;
            request.errors.push('Acceso denegado');
        }
    }
}

class ValidateUserPermissions extends Command {
    execute(request) {
        const rolePermissions = {
            admin: ['crear', 'modificar', 'eliminar', 'inventario', 'informes', 'clientes', 'proveedores', 'ventas', 'compras', 'empleados'],
            cajero: ['ventas', 'clientes'],
            supervisor: ['modificar', 'informes', 'clientes', 'proveedores', 'ventas', 'compras', 'empleados'],
            inventario: ['modificar', 'inventario', 'informes', 'clientes', 'proveedores', 'ventas', 'compras', 'empleados'],
            soporte: ['modificar', 'clientes', 'proveedores', 'empleados']
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