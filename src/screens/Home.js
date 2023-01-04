import React from 'react';
import { View, Text, Button} from 'react-native';
import { logout } from '../config/firebase';

const Home = () => {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
            title="Log Out"
            onPress={logout}
            />
      </View>
    );
};
export default Home;
