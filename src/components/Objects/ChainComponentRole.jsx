import Command from './Command';

class ValidateUserRole extends Command {
    execute(request) {
        request.errors = [];
        const rolesPermitidos = ['admin', 'cajero', 'Gerente', 'soporte', 'Empleado'];
        if (!rolesPermitidos.includes(request.role)) {
            request.valid = false;
            request.errors.push('Acceso denegado');
        }
    }
}

class ValidateUserPermissions extends Command {
    execute(request) {
        request.errors = [];
        const rolePermissions = {
            admin: ['generarVoucher', 'realizarVenta', 'consultarVoucher', 'cierreLote', 'reportes', 'gestionarUsuarios', 'gestionarProductos', 'gestionarClientes'], //GESTIONAR CLIENTES CRUD (AGREGAR, MOSTRAR y GENERAR INFORMES O REPORTES, EDITAR Y ELIMINAR)
            cajero: ['generarVoucher', 'realizarVenta', 'consultarVoucher', 'gestionarClientes', 'gestionarProductos'], //AGREGAR
            Gerente: ['consultarVoucher', 'cierreLote', 'gestionarProductos'],
            soporte: ['realizarVenta', 'Asistencia', 'Soporte técnico'],
            Empleado: ['consultarInventario', 'gestionarProductos']
        };        

        const validPermissions = rolePermissions[request.role];
        if (!validPermissions) {
            request.valid = false;
            request.errors.push('Rol no tiene permisos definidos');
            return;
        }

        if (!validPermissions.includes(request.action)) {
            request.valid = false;
            request.errors.push(`Permiso no válido para la acción: ${request.action}`);
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