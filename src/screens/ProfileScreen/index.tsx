import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

//import Auth so that from aws amplify we can sign out
import { Auth, DataStore } from 'aws-amplify';

//import user from amplify models
import { User } from '../../models';

//import useAuthContext to get the user
import { useAuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { dbUser } = useAuthContext();

  const [name, setName] = useState(dbUser?.name || '');
  const [address, setAddress] = useState(dbUser?.address || '');
  const [lat, setLat] = useState(dbUser?.lat || '');
  const [lng, setLng] = useState(dbUser?.lng || '');

  const { sub, setDbUser } = useAuthContext();

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  //first, populate fields with db user
  //save user
  const updateUser = async () => {
    try {
      const response = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.name = name;
          updated.address = address;
          updated.lat = lat;
          updated.lng = lng;
        })
      );
      setDbUser(response);
    } catch (e) {
      console.log('error', e.message);
    }
  };

  //Show the profile form if the dbUser is null
  // Save a new user
  const createUser = async () => {
    try {
      const user = await DataStore.save(new User({ name, address, lat, lng, sub }));
      console.log(user);
      setDbUser(user);
    } catch (e) {
      console.log('error', e.message);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput value={lng} onChangeText={setLng} placeholder="Longitude" style={styles.input} />
      <Button onPress={onSave} title="Save" />
      <Button onPress={() => Auth.signOut()} title="Sign out" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
});

export default Profile;
