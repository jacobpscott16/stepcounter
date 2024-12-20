import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';
import { useEffect, useState } from 'react';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.FlightsClimbed, AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,],
    write: [],
  }
};

const useHealthData = (date: Date) => {

    const [hasPermissions, setHasPermission] = useState(false);
    const [steps, setSteps] = useState(0);
    const [flights, setFlights] = useState(0);
    const [distance, setDistance] = useState(0);
  
    useEffect(() => {
      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.log('Error getting persmissions');
          return;
        }
        setHasPermission(true);
      });
    }, []);
  
    useEffect(() => {
      if (!hasPermissions) {
        return;
      }
  
      const options: HealthInputOptions = {
        date: date.toISOString(),
        includeManuallyAdded: false,
      }
  
      AppleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          console.log("Error getting the steps");
          return;
        }
        console.log(results.value);
        setSteps(results.value);
      });
  
      AppleHealthKit.getFlightsClimbed(options, (err, results) => {
        if (err) {
          console.log("Error getting the flights");
          return;
        }
        console.log(results.value);
        setFlights(results.value);
      });
  
      AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
        if (err) {
          console.log("Error getting the distance");
          return;
        }
        console.log(results.value);
        setDistance(results.value);
      });
    }, [hasPermissions, date]);

    return {
        steps,
        flights,
        distance,
    };
};

export default useHealthData;