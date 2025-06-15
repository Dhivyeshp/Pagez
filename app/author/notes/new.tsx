import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function NewAuthorNoteScreen() {
  const [selectedBook, setSelectedBook] = useState('Beloved Girls');
  const [rating, setRating] = useState<number | null>(null);
  const [opinion, setOpinion] = useState('');
  const [readingStatus, setReadingStatus] = useState('Reading...');

  // Mock data - Replace with real API calls
  const mockBookData = {
    title: 'Beloved Girls',
    author: 'Harriet Evans',
    coverImage: 'https://example.com/book-cover.jpg', // Backend developer: Replace with actual book cover URL
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleReadingStatusPress = () => {
    // Backend developer: Navigate to reading status selection screen
    router.push('/reading-status');
  };

  const handleBookSelection = () => {
    // Backend developer: Navigate to book selection screen
    router.push('/book-selection');
  };

  const handleRatingPress = () => {
    // Backend developer: Navigate to rating screen or show rating modal
    router.push('/rating');
  };

  const handleAttachImage = () => {
    // Backend developer: Implement image picker functionality
    console.log('Attach image pressed');
  };

  const handlePostNote = async () => {
    // Backend developer: Implement API call to save author note
    const noteData = {
      bookId: 'mock-book-id', // Replace with actual book ID
      readingStatus,
      rating,
      opinion,
      // Add image data when implemented
    };
    
    console.log('Posting note:', noteData);
    
    // After successful post, navigate back or to success screen
    router.push('/note-success');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Author Note</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Reading Status Section */}
        <TouchableOpacity style={styles.sectionCard} onPress={handleReadingStatusPress}>
          <Text style={styles.sectionTitle}>{readingStatus}</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Book Selection Section */}
        <TouchableOpacity style={styles.sectionCard} onPress={handleBookSelection}>
          <View style={styles.bookSection}>
            <View style={styles.bookCover}>
              {/* Mock book cover - Backend developer: Replace with actual image */}
              <View style={styles.mockBookCover}>
                <Text style={styles.mockBookText}>Book Cover</Text>
              </View>
            </View>
            <View style={styles.bookInfo}>
              <Text style={styles.bookSelectionLabel}>Select the book</Text>
              <Text style={styles.bookTitle}>{selectedBook}</Text>
            </View>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Rating Section */}
        <TouchableOpacity style={styles.sectionCard} onPress={handleRatingPress}>
          <Text style={styles.sectionTitle}>Share rating?</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Opinion Section */}
        <View style={styles.opinionCard}>
          <Text style={styles.opinionLabel}>Your Opinion</Text>
          <TextInput
            style={styles.opinionInput}
            multiline
            placeholder="Share your thoughts about this book..."
            placeholderTextColor="#999"
            value={opinion}
            onChangeText={setOpinion}
            textAlignVertical="top"
          />
        </View>

        {/* Attach Image Section */}
        <TouchableOpacity style={styles.attachImageCard} onPress={handleAttachImage}>
          <Text style={styles.attachImageText}>Attach Image</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Post Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.postButton} onPress={handlePostNote}>
          <Text style={styles.postButtonText}>Post it</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backArrow: {
    fontSize: 18,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for bottom button
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  chevron: {
    fontSize: 20,
    color: '#ccc',
    fontFamily: 'Bogart-Regular-Trial',
  },
  bookSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookCover: {
    marginRight: 15,
  },
  mockBookCover: {
    width: 50,
    height: 70,
    backgroundColor: '#4a90e2',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockBookText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Bogart-Regular-Trial',
    textAlign: 'center',
  },
  bookInfo: {
    flex: 1,
  },
  bookSelectionLabel: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    marginBottom: 4,
  },
  bookTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#999',
  },
  opinionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  opinionLabel: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
    marginBottom: 15,
  },
  opinionInput: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 20,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  attachImageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  attachImageText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  postButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
  },
});