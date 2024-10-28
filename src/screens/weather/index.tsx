import { RootStackParamList } from "@navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import WeatherList from "./List";
import { WeatherProvider } from "./context";

type Props = NativeStackScreenProps<RootStackParamList, 'Weather'>;

const WeatherComponent: React.FC<Props> = () => {
  return <WeatherProvider>
    <WeatherList />
  </WeatherProvider>
}

export default WeatherComponent;