import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, } from 'react-native';
import { NativeStackNavigationProp, } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, Show, } from '../App';
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tabs'
>;
type Props = {
  favoritos: Show[];
  adicionarFavorito: (show: Show) => void;
  removerFavorito: (id: number) => void;
};
export default function Home({
  favoritos,
  adicionarFavorito,
  removerFavorito,
}: Props) {
  const [shows, setShows] = useState<Show[]>([]);
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [pesquisando, setPesquisando] = useState(false);
  const navigation =
    useNavigation<NavigationProp>();
  useEffect(() => {
    async function buscarSeries() {
      try {
        const response = await fetch(
          'https://api.tvmaze.com/shows'
        );
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.log(
          'Erro ao buscar filme ou séries:',
          error
        );
      } finally {
        setLoading(false);
      }
    }
    buscarSeries();
  }, []);
  async function pesquisar() {
    if (busca.trim() === '') {
      setResultados([]);
      return;
    }
    try {
      setPesquisando(true);
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
          busca
        )}`
      );
      const data = await response.json();
      const seriesEncontradas: Show[] =
        data.map(
          (item: any) => item.show
        );
      setResultados(seriesEncontradas);
    } catch (error) {
      console.log(
        'Erro ao pesquisar:',
        error
      );
    } finally {
      setPesquisando(false);
    }
  }
  function estaNosFavoritos(id: number) {
    return favoritos.some(
      (item) => item.id === id
    );
  }
  function abrirDetalhes(show: Show) {
    navigation.navigate(
      'Detalhes',
      {
        show: show,
      }
    );
  }
  function renderItem({
    item,
  }: {
    item: Show;
  }) {
    const favorito =
      estaNosFavoritos(item.id);
    return (
      <View style={styles.card}>
        {item.image ? (
          <Image
            source={{
              uri: item.image.medium,
            }}
            style={styles.imagem}
          />
        ) : (
          <View
            style={styles.semImagem}
          >
            <Text>
              Sem imagem
            </Text>
          </View>
        )}
        <View style={styles.informacoes}>
          <Text style={styles.nome}>
            {item.name}
          </Text>
          <Text style={styles.genero}>
            {item.genres &&
            item.genres.length > 0
              ? item.genres.join(', ')
              : 'Gênero não informado'}
          </Text>
          <TouchableOpacity
            style={styles.detalhes}
            onPress={() =>
              abrirDetalhes(item)
            }
          >
            <Text
              style={styles.textoBotao}
            >
              Ver detalhes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.favorito,
              favorito &&
                styles.remover,
            ]}
            onPress={() =>
              favorito
                ? removerFavorito(
                    item.id
                  )
                : adicionarFavorito(
                    item
                  )
            }
          >
            <Text
              style={styles.textoBotao}
            >
              {favorito
                ? 'Remover dos favoritos'
                : 'Adicionar aos favoritos'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (loading) {
    return (
      <View
        style={styles.carregando}
      >
        <ActivityIndicator
          size="large"
        />
        <Text style={styles.textoCarregando}>
          Carregando filmes ou séries...
        </Text>
      </View>
    );
  }
  const listaMostrar =
    busca.trim() !== ''
      ? resultados
      : shows;
  return (
    <View style={styles.container}>
      <View
        style={styles.pesquisaContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Pesquisar filmes e séries..."
          placeholderTextColor="#888"
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={pesquisar}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.botaoPesquisar}
          onPress={pesquisar}
        >
          <Text
            style={styles.textoPesquisar}
          >
            Pesquisar
          </Text>
        </TouchableOpacity>
      </View>
      {pesquisando ? (
        <View
          style={styles.carregandoPesquisa}
        >
          <ActivityIndicator
            size="small"
          />
          <Text>
            Pesquisando...
          </Text>
        </View>
      ) : null}
      {!pesquisando &&
      busca.trim() !== '' &&
      resultados.length === 0 ? (
        <View
          style={styles.semResultados}
        >
          <Text
            style={styles.textoSemResultados}
          >
            Nenhum filme ou série encontrado.
          </Text>
        </View>
      ) : null}
      <FlatList
        data={listaMostrar}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={
          styles.lista
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  pesquisaContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  botaoPesquisar: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 8,
  },
  textoPesquisar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lista: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    elevation: 3,
  },
  imagem: {
    width: 100,
    height: 145,
    borderRadius: 8,
  },
  semImagem: {
    width: 100,
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  informacoes: {
    flex: 1,
    marginLeft: 12,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  genero: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  detalhes: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  favorito: {
    backgroundColor: '#e50914',
    padding: 10,
    borderRadius: 6,
  },
  remover: {
    backgroundColor: '#555',
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    marginTop: 10,
    fontSize: 16,
  },
  carregandoPesquisa: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 8,
  },
  semResultados: {
    alignItems: 'center',
    padding: 20,
  },
  textoSemResultados: {
    fontSize: 16,
    color: '#555',
  },
});