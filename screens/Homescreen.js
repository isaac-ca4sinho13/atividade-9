// screens/Homescreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';

export default function Homescreen({ navigation, route }) {
  const { userName } = route.params;

  const logout = () => {
    signOut(auth).then(() => {
      navigation.replace('Login');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Login realizado com sucesso!{"\n"}{userName}
      </Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, textAlign: 'center', marginBottom: 20 }
});
