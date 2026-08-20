import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="person-circle"
        size={120}
        color="#e50914"
      />

      <Text style={styles.nome}>
        UsuarioTeste
      </Text>

      <Text style={styles.email}>
        Teste@gmail.com
      </Text>

      <Text style={styles.descricao}>
      Teste descricao
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },

  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
  },

  email: {
    fontSize: 17,
    color: '#555',
    marginTop: 5,
  },

  descricao: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    lineHeight: 24,
  },
});