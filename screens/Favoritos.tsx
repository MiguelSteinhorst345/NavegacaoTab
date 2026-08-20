import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Show } from '../App';

type Props = {
  favoritos: Show[];
  removerFavorito: (id: number) => void;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tabs'
>;

export default function Favoritos({
  favoritos,
  removerFavorito,
}: Props) {
  const navigation =
    useNavigation<NavigationProp>();

  function renderItem({ item }: { item: Show }) {
    return (
      <View style={styles.card}>
        {item.image && (
          <Image
            source={{ uri: item.image.medium }}
            style={styles.imagem}
          />
        )}

        <View style={styles.info}>
          <Text style={styles.nome}>
            {item.name}
          </Text>

          <TouchableOpacity
            style={styles.detalhes}
            onPress={() =>
              navigation.navigate('Detalhes', {
                show: item,
              })
            }
          >
            <Text style={styles.textoBotao}>
              Ver detalhes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.remover}
            onPress={() =>
              removerFavorito(item.id)
            }
          >
            <Text style={styles.textoBotao}>
              Remover dos favoritos
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (favoritos.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioTexto}>
          Você ainda não possui favoritos.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  lista: {
    padding: 10,
  },

  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 3,
  },

  imagem: {
    width: 100,
    height: 145,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  detalhes: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },

  remover: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 6,
  },

  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  vazioTexto: {
    fontSize: 18,
    color: '#555',
  },
});