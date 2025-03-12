// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState([]);

  // Fetch user data from the API
  useEffect(() => {
    fetch('https://random-data-api.com/api/users/random_user?size=80')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setUserData(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  // Navigate to the previous user
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setUserData(users[newIndex]);
    }
  };

  // Navigate to the next user
  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setUserData(users[newIndex]);
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.avatar }} style={styles.avatar} />
      <Text style={styles.text}>ID: {userData.id}</Text>
      <Text style={styles.text}>UID: {userData.uid}</Text>
      <Text style={styles.text}>Password: {userData.password}</Text>
      <Text style={styles.text}>First Name: {userData.first_name}</Text>
      <Text style={styles.text}>Last Name: {userData.last_name}</Text>
      <Text style={styles.text}>Username: {userData.username}</Text>
      <Text style={styles.text}>Email: {userData.email}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={handlePrevious} disabled={currentIndex === 0} />
        <Button title="Next" onPress={handleNext} disabled={currentIndex === users.length - 1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default App;
