import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NewPostScreen() {
  const [readingStatus, setReadingStatus] = useState('Reading...');
  const [selectedBook, setSelectedBook] = useState({
    title: 'Beloved Girls',
    cover: require('../src/assets/images/belovedGirls.png'), // Assuming this path is correct
  });
  const [ratingShared, setRatingShared] = useState(false);
  const [opinion, setOpinion] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4EFEA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Content Cards */}
      <View style={styles.contentArea}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>{readingStatus}</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={selectedBook.cover} style={styles.bookCover} />
          <View style={styles.bookInfo}>
            <Text style={styles.cardText}>Select the book</Text>
            <Text style={styles.bookTitle}>{selectedBook.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Share rating?</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <View style={styles.opinionCard}>
          <Text style={styles.opinionTitle}>Your Opinion</Text>
          <TextInput
            style={styles.opinionInput}
            multiline
            placeholder="Write your thoughts here..."
            value={opinion}
            onChangeText={setOpinion}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.attachImageButton}>
          <Text style={styles.attachImageButtonText}>Attach Image</Text>
        </TouchableOpacity>
      </View>

      {/* Post Button */}
      <TouchableOpacity style={styles.postButton}>
        <Text style={styles.postButtonText}>Post it</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFEA', // Light beige background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F4EFEA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0D9C8',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRightSpacer: {
    width: 24 + 10, // Width of icon + padding to balance the back button
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  bookCover: {
    width: 40,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  opinionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  opinionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  opinionInput: {
    minHeight: 120,
    fontSize: 16,
    color: '#333',
  },
  attachImageButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  attachImageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postButton: {
    backgroundColor: '#FF6B35', // Orange color
    borderRadius: 30,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  postButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
}); 