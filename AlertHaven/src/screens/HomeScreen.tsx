// src/screens/AuthScreen.tsx
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import WebMap from '../components/WebMap';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <Header>

      </Header>
      <HomeTextContainer>
        <HomeTitleText>Seja bem vindo, Vitor</HomeTitleText>
        <HomeSubtitleText>Veja nosso mapa em tempo real de eventos climáticos</HomeSubtitleText>
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
            <FilterText>Abrigos</FilterText>
          </Filter>
          <Filter>
            <FilterText>Abrigos</FilterText>
          </Filter>
          <Filter>
            <FilterText>Abrigos</FilterText>
          </Filter>
          <Filter>
            <FilterText>Abrigos</FilterText>
          </Filter>
          <Filter>
            <FilterText>Abrigos</FilterText>
          </Filter>
          <Filter>
            <FilterText>Abrigos</FilterText>
          </Filter>
        </FiltersContainer>
      </FilterContainer>
      <MapContainer>
        <WebMap />
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
  width: 100px;
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