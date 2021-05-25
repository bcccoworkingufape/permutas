import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function checkGovernmentEmployee() {
  const userString = await AsyncStorage.getItem('@Permutas:user');
  const user = JSON.parse(userString);

  return user?.isGovernmentEmployee;
}
