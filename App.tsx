import { StatusBar } from 'expo-status-bar';
import { List } from './src/screens/List';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar style="light" translucent />
      <List />
    </GestureHandlerRootView>
  );
}


