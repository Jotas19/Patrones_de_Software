import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import ChainComponentSyntax from '../Objects/ChainComponentSyntax.jsx';
import Swal from 'sweetalert2';

const backgroundImage = require('../../../assets/images/login.jpg');
const logoImage = require('../../../assets/images/autenticacion.png');

const Registrar = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleRegistrar = () => {
        const request = {
            firstName,
            lastName,
            email,
            phone,
            username,
            password,
            valid: true,
            errors: []
        };

        const chainSyntax = new ChainComponentSyntax();
        chainSyntax.processRequest(request);

        if (request.valid) {
            Swal.fire({
                title: 'Registro exitoso',
                text: 'Bienvenido al sistema',
                icon: 'success',
            }).then(() => {
                navigation.replace('Inicio');
            });
        } else {
            setErrors(request.errors);
            Swal.fire({
                icon: 'error',
                title: 'Error de registro',
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
                        placeholder="Nombre"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono"
                        value={phone}
                        onChangeText={setPhone}
                    />
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
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.registerText}>¿Ya tienes una cuenta? Iniciar sesión</Text>
                    </TouchableOpacity><br/>
                    <Button title="Registrarse" onPress={handleRegistrar} />
                    {errors.length > 0 && (
                        <View style={styles.errorContainer}>
                            {errors.map((error, index) => (
                                <Text key={index} style={styles.errorText}>{error}</Text>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        width: '40%', 
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
    errorContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
    registerText: {
        marginTop: 10,
        color: '#333',
    },
});

export default Registrar;