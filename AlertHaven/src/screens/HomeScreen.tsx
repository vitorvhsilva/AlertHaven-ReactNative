import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import WebMap, { MarkerType } from '../components/WebMap';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    setUserLocation([-23.5615, -46.6560]);
  }, []);

  const circles = [
    {
      center: [-23.5505, -46.6333] as [number, number], 
      radius: 500,
      color: theme.colors.intensidade_alta,
      fillColor: theme.colors.intensidade_alta,
      fillOpacity: 0.2,
      popupText: 'Alagamento grave - Evitar área'
    },
    {
      center: [-23.5815, -46.6360] as [number, number], 
      radius: 400,
      color: theme.colors.intensidade_media,
      fillColor: theme.colors.intensidade_media,
      fillOpacity: 0.2,
      popupText: 'Tempestade moderada - Cuidado'
    },
    {
      center: [-23.5415, -46.6760] as [number, number], 
      radius: 600,
      color: theme.colors.intensidade_alta,
      fillColor: theme.colors.intensidade_alta,
      fillOpacity: 0.2,
      popupText: 'Alerta de tornado - Área de risco'
    },
    {
      center: [-23.5215, -46.6260] as [number, number], 
      radius: 300,
      color: theme.colors.intensidade_fraca,
      fillColor: theme.colors.intensidade_fraca,
      fillOpacity: 0.2,
      popupText: 'Onda de calor - Hidrate-se'
    },
    {
      center: [-23.5915, -46.6860] as [number, number], 
      radius: 450,
      color: theme.colors.intensidade_media,
      fillColor: theme.colors.intensidade_media,
      fillOpacity: 0.2,
      popupText: 'Terremoto moderado - Danos leves'
    },
    {
      center: [-23.5115, -46.6160] as [number, number], 
      radius: 350,
      color: theme.colors.intensidade_fraca,
      fillColor: theme.colors.intensidade_fraca,
      fillOpacity: 0.2,
      popupText: 'Alagamento leve - Trânsito lento'
    }
  ];

  const markers = circles.map((circle, index) => {
    const types: MarkerType[] = ['ALAGAMENTO', 'TEMPESTADE', 'TORNADO', 'ONDA_DE_CALOR', 'TERREMOTO'];
    return {
      position: circle.center,
      type: types[index % types.length], 
      popupText: circle.popupText
    };
  });

  return (
    <Container>
      <Header></Header>
      <HomeTextContainer>
        <HomeTitleText>Seja bem vindo, Vitor</HomeTitleText>
        <HomeSubtitleText>Eventos climáticos em tempo real - São Paulo</HomeSubtitleText>
      </HomeTextContainer>
      <FilterContainer>
        <FilterTitleText>Filtrar por:</FilterTitleText>
        <FiltersContainer 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Filter>
            <FilterText>Alagamentos</FilterText>
          </Filter>
          <Filter>
            <FilterText>Tempestades</FilterText>
          </Filter>
          <Filter>
            <FilterText>Tornados</FilterText>
          </Filter>
          <Filter>
            <FilterText>Calor</FilterText>
          </Filter>
          <Filter>
            <FilterText>Terremotos</FilterText>
          </Filter>
        </FiltersContainer>
      </FilterContainer>
      <MapContainer>
        <WebMap 
          center={[-23.5615, -46.6560]} 
          zoom={13}
          circles={circles}
          markers={markers}
          userLocation={userLocation}
        />
      </MapContainer>
    </Container>
  );
};

const Container = styled.ScrollView`
  display: flex;
  background-color: ${theme.colors.preto};
`;

const Header = styled.View`
  display: flex;
  background-color: ${theme.colors.preto};
  border-bottom: 2px solid ${theme.colors.roxo1};
  width: 100%;
  height: 10vh;
`;

const MapContainer = styled.View`
  background-color: ${theme.colors.preto};
  padding: 30px;
  border-radius: 20px;
  width: 100%;
`;

const HomeTextContainer = styled.View`
  padding: 0px 30px;
  width: 100%;
  height: fit-content;
`;

const HomeTitleText = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.bold}; 
  font-size: ${theme.typography.title.fontSize};
`;

const HomeSubtitleText = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular}; 
  font-size: ${theme.typography.subtitle.fontSize};
`;

const FilterContainer = styled.View`
  padding: 0px 30px;
  width: 100%;
  height: fit-content;
  margin: 10px 0px;
`;

const FiltersContainer = styled.ScrollView`
  width: 100%;
  height: fit-content;
  margin: 5px 0px;
  gap: 10px;
`;

const FilterTitleText = styled.Text`
  color: ${theme.colors.roxo1};
  font-family: ${theme.fonts.regular}; 
  font-size: ${theme.typography.subtitle.fontSize};
`;

const Filter = styled.TouchableOpacity`
  min-width: 100px;
  background-color: ${theme.colors.roxo1};
  border-radius: 20px;
  padding: 5px;
  margin: 0px 5px;
`

const FilterText = styled.Text`
  color: ${theme.colors.branco};
  font-family: ${theme.fonts.regular}; 
  font-size: ${theme.typography.subtitle.fontSize};
  text-align: center;
`;