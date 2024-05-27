import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import ChainComponent2FA from '../Objects/ChainComponent2FA.jsx';
import ChainComponentSyntax from '../Objects/ChainComponentSyntax.jsx';
import Swal from 'sweetalert2';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('usuario');
    const [password, setPassword] = useState('hola12.');
    const [errors, setErrors] = useState([]);

    const handleLogin = () => {
        const request = {
            username,
            password,
            valid: true,
            errors: [],
            email: 'test@example.com',
            phone: '1234567890',
            code: '123456',
            secondaryEmail: 'test2@example.com',
            device: 'smartphone'
        };

        if (request.valid) {
          const chainSyntax = new ChainComponentSyntax();
          chainSyntax.processRequest(request);
        }

        const chain2FA = new ChainComponent2FA();
        chain2FA.processRequest(request);

        if (!request.valid) {
            setErrors(request.errors);
            Swal.fire({
                icon: 'error',
                title: 'Error de autenticación',
                text: request.errors.join(', '),
            });
            return;
        }

        if (username === 'usuario' && password === '1234') {
            Swal.fire({
                title: 'Verificación 2FA',
                text: 'Por favor verifica tu autenticación en el segundo factor.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Verificado',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigation.replace('Inicio');
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Credenciales incorrectas',
            });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Iniciar sesión" onPress={handleLogin} />
            {errors.length > 0 && (
                <View style={styles.errorContainer}>
                    {errors.map((error, index) => (
                        <Text key={index} style={styles.errorText}>{error}</Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    errorContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
});

export default Login;