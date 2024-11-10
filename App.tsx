import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value'
import RingProgress from './src/components/RingProgress';
import useHealthData from './src/Hooks/useHealthData';

const STEPS_GOAL = 10_000;

export default function App() {
  const { steps, flights, distance } = useHealthData(new Date());

  return (
    <View style={styles.container}>
      <RingProgress radius={125} strokeWidth={50} progress={steps / STEPS_GOAL} />

      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} />

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100,
  },
});
