import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  initializeAuth,
  inMemoryPersistence
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrO9X6wQHIUxGV5MtGYlXWs60HAulSslk",
  authDomain: "app-firebase-424db.firebaseapp.com",
  projectId: "app-firebase-424db",
  storageBucket: "app-firebase-424db.appspot.com",
  messagingSenderId: "975481149741",
  appId: "1:975481149741:web:b63cab2cece97a88d55ba4"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, { persistence: inMemoryPersistence });

export default function App() {

  const [tela, setTela] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuario, setUsuario] = useState('');

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsuario(user.email);
        setEmail('');
        setPassword('');
        setTela('home');
      })
      .catch(() => {
        Alert.alert("Erro", "E-mail ou senha inválidos");
      });
  };

  const cadastrar = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Sucesso", "Conta criada com sucesso!");
        setEmail('');
        setPassword('');
        setTela('login');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert("Erro", "Este e-mail já está em uso.");
        } else if (error.code === 'auth/weak-password') {
          Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert("Erro", "E-mail inválido.");
        } else {
          Alert.alert("Erro", error.message);
        }
      });
  };


  const logout = () => {
    signOut(auth)
      .then(() => {
        setTela('login');
        setUsuario('');
      });
  };

  if (tela === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

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

        <Button title="Entrar" onPress={login} />

        <View style={{ marginTop: 20 }}>
          <Button title="Cadastrar-se" onPress={() => setTela('cadastro')} />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }

  if (tela === 'cadastro') {
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

        <Button title="Cadastrar" onPress={cadastrar} />

        <View style={{ marginTop: 20 }}>
          <Button title="Voltar ao Login" onPress={() => setTela('login')} />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }

  if (tela === 'home') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Login realizado com sucesso!{"\n"}{usuario}
        </Text>
        <Button title="Logout" onPress={logout} />
        <StatusBar style="auto" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
});
