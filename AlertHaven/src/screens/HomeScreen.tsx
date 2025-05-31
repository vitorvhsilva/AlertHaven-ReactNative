import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import WebMap, { MarkerType } from '../components/WebMap';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

type FilterType = MarkerType | 'TODOS';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['TODOS']);
  const [mapKey, setMapKey] = useState(Date.now());

  useEffect(() => {
    setUserLocation([-23.5615, -46.6560]);
  }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMapKey(Date.now());
      console.log('Resetting map key');
    });
    return unsubscribe;
  }, [navigation]);

  const toggleFilter = (filter: FilterType) => {
    if (filter === 'TODOS') {
      setActiveFilters(['TODOS']);
    } else {
      setActiveFilters(prev => {
        const newFilters = prev.includes(filter)
          ? prev.filter(f => f !== filter && f !== 'TODOS')
          : [...prev.filter(f => f !== 'TODOS'), filter];
        
        return newFilters.length === 0 ? ['TODOS'] : newFilters;
      });
    }
  };

  const isFilterActive = (filter: FilterType) => {
    return activeFilters.includes('TODOS') || activeFilters.includes(filter);
  };

  const allCircles = [
    {
      center: [-23.5505, -46.6333] as [number, number],
      radius: 500,
      color: theme.colors.intensidade_alta,
      fillColor: theme.colors.intensidade_alta,
      fillOpacity: 0.2,
      popupText: 'Alagamento grave - Evitar área',
      type: 'ALAGAMENTO' as MarkerType
    },
    {
      center: [-23.5815, -46.6360] as [number, number],
      radius: 400,
      color: theme.colors.intensidade_media,
      fillColor: theme.colors.intensidade_media,
      fillOpacity: 0.2,
      popupText: 'Tempestade moderada - Cuidado',
      type: 'TEMPESTADE' as MarkerType
    },
    {
      center: [-23.5415, -46.6760] as [number, number],
      radius: 600,
      color: theme.colors.intensidade_alta,
      fillColor: theme.colors.intensidade_alta,
      fillOpacity: 0.2,
      popupText: 'Alerta de tornado - Área de risco',
      type: 'TORNADO' as MarkerType
    },
    {
      center: [-23.5215, -46.6260] as [number, number],
      radius: 300,
      color: theme.colors.intensidade_fraca,
      fillColor: theme.colors.intensidade_fraca,
      fillOpacity: 0.2,
      popupText: 'Onda de calor - Hidrate-se',
      type: 'ONDA_DE_CALOR' as MarkerType
    },
    {
      center: [-23.5915, -46.6860] as [number, number],
      radius: 450,
      color: theme.colors.intensidade_media,
      fillColor: theme.colors.intensidade_media,
      fillOpacity: 0.2,
      popupText: 'Terremoto moderado - Danos leves',
      type: 'TERREMOTO' as MarkerType
    },
    {
      center: [-23.5115, -46.6160] as [number, number],
      radius: 350,
      color: theme.colors.intensidade_fraca,
      fillColor: theme.colors.intensidade_fraca,
      fillOpacity: 0.2,
      popupText: 'Alagamento leve - Trânsito lento',
      type: 'ALAGAMENTO' as MarkerType
    }
  ];

  const abrigos = [
    {
      center: [-23.5630, -46.6500] as [number, number],
      type: 'ABRIGO' as MarkerType,
      popupText: 'Abrigo Municipal - Capacidade: 50 pessoas'
    },
    {
      center: [-23.5580, -46.6620] as [number, number],
      type: 'ABRIGO' as MarkerType,
      popupText: 'Abrigo Escola Estadual - Capacidade: 100 pessoas'
    },
    {
      center: [-23.5650, -46.6450] as [number, number],
      type: 'ABRIGO' as MarkerType,
      popupText: 'Abrigo Centro Comunitário - Capacidade: 30 pessoas'
    }
  ];

  const filteredCircles = activeFilters.includes('TODOS')
    ? allCircles
    : allCircles.filter(circle => activeFilters.includes(circle.type));

  const filteredAbrigos = activeFilters.includes('TODOS') || activeFilters.includes('ABRIGO')
    ? abrigos
    : [];

  const markers = [
    ...filteredCircles.map(circle => ({
      position: circle.center,
      type: circle.type,
      popupText: circle.popupText
    })),
    ...filteredAbrigos.map(abrigo => ({
      position: abrigo.center,
      type: abrigo.type,
      popupText: abrigo.popupText
    }))
  ];

  return (
    <Container>
      <Header>
        <UserContainer onPress={() => navigation.navigate("User")}>
          <UserImage source={require('../../assets/icons/usuario.png')}/>
        </UserContainer>
        <HeaderRightContainer>
          <AlertContainer onPress={() => navigation.navigate("Alerts")}>
            <AlertImage source={require('../../assets/icons/alerta.png')}/>
          </AlertContainer>
          <InfoContainer onPress={() => navigation.navigate("Info")}>
            <InfoImage source={require('../../assets/icons/info.png')}/>
          </InfoContainer>
        </HeaderRightContainer>
      </Header>
      <HomeTextContainer>
        <HomeTitleText>Seja bem vindo, Vitor</HomeTitleText>
        <HomeSubtitleText>Eventos climáticos em tempo real</HomeSubtitleText>
      </HomeTextContainer>
      <FilterContainer>
        <FilterTitleText>Filtrar por:</FilterTitleText>
        <FiltersContainer 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center'
          }}
        >
          <Filter 
            active={isFilterActive('TODOS')}
            onPress={() => toggleFilter('TODOS')}
          >
            <FilterText active={isFilterActive('TODOS')}>Todos</FilterText>
          </Filter>
          <Filter 
            active={isFilterActive('ALAGAMENTO')}
            onPress={() => toggleFilter('ALAGAMENTO')}
          >
            <FilterText active={isFilterActive('ALAGAMENTO')}>Alagamentos</FilterText>
          </Filter>
          <Filter 
            active={isFilterActive('TEMPESTADE')}
            onPress={() => toggleFilter('TEMPESTADE')}
          >
            <FilterText active={isFilterActive('TEMPESTADE')}>Tempestades</FilterText>
          </Filter>
          <Filter 
            active={isFilterActive('TORNADO')}
            onPress={() => toggleFilter('TORNADO')}
          >
            <FilterText active={isFilterActive('TORNADO')}>Tornados</FilterText>
          </Filter>
          <Filter 
            active={isFilterActive('ONDA_DE_CALOR')}
            onPress={() => toggleFilter('ONDA_DE_CALOR')}
          >
            <FilterText active={isFilterActive('ONDA_DE_CALOR')}>Calor</FilterText>
          </Filter>
          <Filter 
            active={isFilterActive('TERREMOTO')}
            onPress={() => toggleFilter('TERREMOTO')}
          >
            <FilterText active={isFilterActive('TERREMOTO')}>Terremotos</FilterText>
          </Filter>
          <Filter 
            active={isFilterActive('ABRIGO')}
            onPress={() => toggleFilter('ABRIGO')}
          >
            <FilterText active={isFilterActive('ABRIGO')}>Abrigos</FilterText>
          </Filter>
        </FiltersContainer>
      </FilterContainer>
      <MapContainer key={mapKey}>
        <WebMap 
          key={`map-${mapKey}`}
          center={[-23.5615, -46.6560]} 
          zoom={13}
          circles={filteredCircles}
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
  flex-direction: row;
  background-color: ${theme.colors.preto};
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  padding: 15px 30px;
`;

const UserContainer = styled.TouchableOpacity`
  width: fit-content;
  height: fit-content;
`;

const UserImage = styled.Image`
  width: 40px;
  height: 40px;
` 

const InfoContainer = styled.TouchableOpacity`
  width: fit-content;
  height: fit-content;
`;

const InfoImage = styled.Image`
  width: 40px;
  height: 40px;
` 

const HeaderRightContainer = styled.TouchableOpacity`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const AlertContainer = styled.TouchableOpacity`
  width: fit-content;
  height: fit-content;
`;

const AlertImage = styled.Image`
  width: 40px;
  height: 40px;
` 

const MapContainer = styled.View`
  background-color: ${theme.colors.preto};
  padding: 10px 30px;
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
  margin: 30px 0px 0px;
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

const Filter = styled.TouchableOpacity<{ active?: boolean }>`
  min-width: 100px;
  background-color: ${props => 
    props.active ? theme.colors.roxo2 : theme.colors.roxo1};
  border-radius: 20px;
  padding: 5px 10px;
  margin: 0px 5px;
`;

const FilterText = styled.Text<{ active?: boolean }>`
  color: ${props => 
    props.active ? theme.colors.branco : theme.colors.branco};
  font-family: ${theme.fonts.regular}; 
  font-size: ${theme.typography.subtitle.fontSize};
  text-align: center;
`;