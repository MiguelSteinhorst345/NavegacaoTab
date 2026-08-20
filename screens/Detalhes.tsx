import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '../App';

type DetalhesRouteProp = RouteProp<
  RootStackParamList,
  'Detalhes'
>;

export default function Detalhes() {
  const route = useRoute<DetalhesRouteProp>();

  const { show } = route.params;

  const ano = show.premiered
    ? show.premiered.substring(0, 4)
    : 'Não informado';

  const nota =
    show.rating.average !== null
      ? show.rating.average
      : 'Não avaliado';

  return (
    <ScrollView style={styles.container}>
      {show.image && (
        <Image
          source={{ uri: show.image.original }}
          style={styles.imagem}
        />
      )}

      <View style={styles.conteudo}>
        <Text style={styles.nome}>
          {show.name}
        </Text>

        <Text style={styles.titulo}>
          Gênero
        </Text>

        <Text style={styles.texto}>
          {show.genres.length > 0
            ? show.genres.join(', ')
            : 'Não informado'}
        </Text>

        <Text style={styles.titulo}>
          Ano de lançamento
        </Text>

        <Text style={styles.texto}>
          {ano}
        </Text>

        <Text style={styles.titulo}>
          Nota
        </Text>

        <Text style={styles.texto}>
          ⭐ {nota}
        </Text>

        <Text style={styles.titulo}>
          Sinopse
        </Text>

        <Text style={styles.texto}>
          {show.summary
            ? show.summary.replace(/<[^>]+>/g, '')
            : 'Sinopse não disponível.'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  imagem: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },

  conteudo: {
    padding: 20,
  },

  nome: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },

  texto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});
