import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/Home';
import Favoritos from './screens/Favoritos';
import Perfil from './screens/Perfil';
import Detalhes from './screens/Detalhes';

export type Show = {
  id: number;
  name: string;
  genres: string[];
  premiered: string | null;
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string | null;
};

export type RootStackParamList = {
  Tabs: undefined;
  Detalhes: {
    show: Show;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
  const [favoritos, setFavoritos] = useState<Show[]>([]);

  function adicionarFavorito(show: Show) {
    setFavoritos((lista) => {
      if (lista.some((item) => item.id === show.id)) {
        return lista;
      }

      return [...lista, show];
    });
  }

  function removerFavorito(id: number) {
    setFavoritos((lista) =>
      lista.filter((item) => item.id !== id)
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          options={{ headerShown: false }}
        >
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: true,
                tabBarActiveTintColor: '#e50914',
                tabBarInactiveTintColor: 'gray',

                tabBarIcon: ({ color, size }) => {
                  let iconName:
                    | 'home'
                    | 'home-outline'
                    | 'star'
                    | 'star-outline'
                    | 'person'
                    | 'person-outline' = 'home';

                  if (route.name === 'Início') {
                    iconName = 'home';
                  } else if (route.name === 'Favoritos') {
                    iconName = 'star';
                  } else if (route.name === 'Perfil') {
                    iconName = 'person';
                  }

                  return (
                    <Ionicons
                      name={iconName}
                      size={size}
                      color={color}
                    />
                  );
                },
              })}
            >
              <Tab.Screen name="Início">
                {() => (
                  <Home
                    favoritos={favoritos}
                    adicionarFavorito={adicionarFavorito}
                    removerFavorito={removerFavorito}
                  />
                )}
              </Tab.Screen>

              <Tab.Screen name="Favoritos">
                {() => (
                  <Favoritos
                    favoritos={favoritos}
                    removerFavorito={removerFavorito}
                  />
                )}
              </Tab.Screen>

              <Tab.Screen name="Perfil" component={Perfil} />
            </Tab.Navigator>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={{
            title: 'Detalhes da série',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}