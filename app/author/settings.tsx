import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

const MembershipProfileScreen = () => {
  // TODO: Backend Integration - Replace with real user data from API
  const userData = {
    name: 'Samantha Jackson',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b332c1f3?w=200&h=200&fit=crop&crop=face',
  };

  // TODO: Backend Integration - Replace with real notification settings from API
  const notificationSettings = {
    newArrivals: true,
    newBook: true,
  };

  const handleGoBack = () => {
    router.back();
  };

  /*
  const handleChangePicture = () => {
    // TODO: Backend Integration - Implement image picker and upload to server
    router.push('/change-picture');
  };

  const handleChangeName = () => {
    // TODO: Backend Integration - Navigate to name change screen
    router.push('/change-name');
  };
  */

  const handleNotificationToggle = (settingType: string) => {
    // TODO: Backend Integration - Update notification preferences on server
    console.log(`Toggle ${settingType} notification`);
  };

  const handleLogOut = () => {
    // TODO: Backend Integration - Clear user session and tokens
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F4F2" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Membership Profile Settings</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: userData.profileImage }}
                style={styles.profileImage}
              />
            </View>
            
            {/* Commented out change picture button
            <TouchableOpacity 
              style={styles.changePictureButton}
              onPress={handleChangePicture}
              activeOpacity={0.7}
            >
              <Text style={styles.changePictureText}>Change Picture</Text>
            </TouchableOpacity>
            */}
          </View>

          {/* Commented out change name button
          <TouchableOpacity 
            style={styles.nameCard}
            onPress={handleChangeName}
            activeOpacity={0.7}
          >
            <Text style={styles.changeNameLabel}>Change Name</Text>
            <Text style={styles.currentName}>{userData.name}</Text>
          </TouchableOpacity>
          */}
        </View>

        {/* Notification Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          <TouchableOpacity 
            style={styles.notificationCard}
            onPress={() => handleNotificationToggle('newArrivals')}
            activeOpacity={0.7}
          >
            <Text style={styles.notificationLabel}>New Arrivals</Text>
            <View style={[
              styles.toggle, 
              notificationSettings.newArrivals && styles.toggleActive
            ]}>
              <View style={[
                styles.toggleKnob,
                notificationSettings.newArrivals && styles.toggleKnobActive
              ]} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.notificationCard}
            onPress={() => handleNotificationToggle('newBook')}
            activeOpacity={0.7}
          >
            <Text style={styles.notificationLabel}>New Book</Text>
            <View style={[
              styles.toggle, 
              notificationSettings.newBook && styles.toggleActive
            ]}>
              <View style={[
                styles.toggleKnob,
                notificationSettings.newBook && styles.toggleKnobActive
              ]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogOut}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F2',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  backArrow: {
    fontSize: 18,
    color: '#FF6B4A',
    fontFamily: 'Bogart-Regular-Trial',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#2C2C2C',
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#B8B8B8',
    marginBottom: 16,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changePictureButton: {
    paddingVertical: 8,
  },
  changePictureText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FF6B4A',
  },
  nameCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  changeNameLabel: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#2C2C2C',
  },
  currentName: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#B8B8B8',
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationLabel: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#2C2C2C',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#FF6B4A',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  logoutButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FF6B4A',
  },
});

export default MembershipProfileScreen;