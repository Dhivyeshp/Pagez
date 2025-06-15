import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data - Replace with actual API calls
const mockBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
  },
  {
    id: 2,
    title: 'Percy Jackson and the Olympians',
    author: 'Rick Riordan',
    cover: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',
  },
  {
    id: 3,
    title: 'Fire Dance',
    author: 'Ilana C. Myer',
    cover: 'https://covers.openlibrary.org/b/id/10594763-L.jpg',
  },
  {
    id: 4,
    title: 'Ghost Forest',
    author: 'Pik-Shuen Fung',
    cover: 'https://covers.openlibrary.org/b/id/10909258-L.jpg',
  },
  {
    id: 5,
    title: 'Tucked Away',
    author: 'Phyllis Rudin',
    cover: 'https://covers.openlibrary.org/b/id/11153241-L.jpg',
  },
  {
    id: 6,
    title: 'Late Night Thoughts',
    author: 'Unknown',
    cover: 'https://covers.openlibrary.org/b/id/11153242-L.jpg',
  },
];

export default function FilterScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBook = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => router.push(`/book/${item.id}` as any)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.cover }} style={styles.bookCover} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Community"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterIcon}>⎚</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profile')}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Book Grid */}
        <FlatList
          data={filteredBooks}
          renderItem={renderBook}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.gridContent}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const bookItemSize = (width - 48) / 3; // 3 columns, 16px padding on each side, 8px gap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: 'white',
    zIndex: 10,
  },
  backButton: {
    marginRight: 8,
    padding: 6,
  },
  backArrow: {
    fontSize: 26,
    color: '#444',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    height: 44,
  },
  searchIcon: {
    fontSize: 18,
    color: '#888',
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#222',
    paddingVertical: 0,
  },
  filterButton: {
    marginLeft: 6,
    padding: 4,
  },
  filterIcon: {
    fontSize: 20,
    color: '#FF6B35',
  },
  profileButton: {
    marginLeft: 8,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#eee',
  },
  gridContent: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 24,
  },
  bookItem: {
    width: bookItemSize,
    height: bookItemSize * 1.45,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8F8F8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  bookCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
    backgroundColor: '#eee',
  },
});

// TODO: Backend Integration Points
// 1. Replace mockBooks with API call to fetch user's book library
// 2. Replace mockAuthors with dynamic author list from API
// 3. Replace mockGenres with API-driven genre categories
// 4. Implement search functionality with backend search endpoint
// 5. Add real filter application logic with API parameters
// 6. Connect profile image to user authentication system
// 7. Implement real navigation routing for filter detail screens