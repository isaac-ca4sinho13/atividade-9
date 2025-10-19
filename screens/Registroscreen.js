// screens/Registroscreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';

export default function Registroscreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registrar = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert("Erro", "Este e-mail já está em uso.");
        } else if (error.code === 'auth/weak-password') {
          Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
        } else {
          Alert.alert("Erro", error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Cadastrar" onPress={registrar} />

      <View style={{ marginTop: 20 }}>
        <Button title="Voltar ao Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 }
});
