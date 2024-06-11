import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Picker } from 'react-native';
import ChainComponent2FA from '../Objects/ChainComponent2FA.jsx';
import Swal from 'sweetalert2';

const backgroundImage = require('../../../assets/images/login.jpg');
const logoImage = require('../../../assets/images/autenticacion.png');

const Login = ({ navigation, setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authMethod, setAuthMethod] = useState('');
    const [errors, setErrors] = useState([]);

    const handleLogin = () => {
        const request = {
            username,
            password,
            valid: true,
            errors: [],
            email: 'admin@gmail.com',
            code: '5468',
            authMethod
        };

        if (username !== 'admin' || password !== 'admin12.') {
            request.valid = false;
            request.errors.push('Nombre de usuario o contraseña incorrectos');
        }

        // Si la solicitud es válida, inicia el proceso de autenticación de dos factores
        if (request.valid) {
            const chain2FA = new ChainComponent2FA();
            chain2FA.processRequest(request);
        }

        // Si la solicitud sigue siendo válida, procede con el inicio de sesión
        if (request.valid) {
            Swal.fire({
                title: 'Autenticación exitosa',
                text: 'Bienvenido al sistema',
                icon: 'success',
            }).then(() => {
                // Lógica para redirigir a la página de inicio dependiendo de los permisos y roles
                setIsAuthenticated(true);
                navigation.replace('Inicio');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de autenticación',
                text: request.errors.join(', '),
            });
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Image source={logoImage} style={styles.logo} />
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
                    <Picker
                        selectedValue={authMethod}
                        style={styles.picker}
                        onValueChange={(itemValue) => setAuthMethod(itemValue)} >
                        <Picker.Item label="Seleccione un método de autenticación" value="" />
                        <Picker.Item label="Correo electrónico" value="Mail" />
                        <Picker.Item label="Número de celular" value="CelNumber" />
                        <Picker.Item label="Código 2FA" value="Code" />
                        <Picker.Item label="Correo electrónico secundario" value="MailSecondary" />
                        <Picker.Item label="Smartphone" value="Smartphone" />
                    </Picker>
                    <TouchableOpacity onPress={() => navigation.navigate('Registrar')}>
                        <Text style={styles.registerText}>¿Aún no tienes cuenta? Regístrate</Text>
                    </TouchableOpacity><br/>
                    <Button title="Iniciar sesión" onPress={handleLogin} />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        alignItems: 'center',
        paddingTop: '9%',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        width: '30%', 
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100, 
        marginBottom: 20, 
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    picker: {
        width: '100%',
        height: 50,
        marginBottom: 10,
    },
    registerText: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
});

export default Login;