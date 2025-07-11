import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../src/components/Button';

const { width } = Dimensions.get('window');

// Mock data - Backend developer should replace with API calls
const MOCK_BOOKS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverColor: '#2E5BBA',
    coverImage: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
  },
  {
    id: '2',
    title: 'Percy Jackson and the Olympians',
    author: 'Rick Riordan',
    subtitle: 'The Chalice of the Gods',
    coverColor: '#1A4B3A',
    coverImage: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',
  },
  {
    id: '3',
    title: 'Fire Dance',
    author: 'Ilana C. Myer',
    coverColor: '#1B2B47',
    coverImage: 'https://covers.openlibrary.org/b/id/10594763-L.jpg',
  },
  {
    id: '4',
    title: 'Ghost Forest',
    author: 'Pik-Shuen Fung',
    coverColor: '#F4D03F',
    coverImage: 'https://covers.openlibrary.org/b/id/10909258-L.jpg',
  },
  {
    id: '5',
    title: 'Tucked Away',
    author: 'Phyllis Rudin',
    coverColor: '#DC3545',
    coverImage: 'https://covers.openlibrary.org/b/id/11153241-L.jpg',
  },
  {
    id: '6',
    title: 'Late Night Thoughts',
    author: 'Written by Me',
    coverColor: '#2C2C2C',
    coverImage: 'https://covers.openlibrary.org/b/id/11153242-L.jpg',
  },
  {
    id: '7',
    title: 'Dune',
    author: 'Frank Herbert',
    coverColor: '#C2B280',
    coverImage: 'https://covers.openlibrary.org/b/id/8101356-L.jpg',
  },
  {
    id: '8',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    coverColor: '#7F0909',
    coverImage: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
  },
  {
    id: '9',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverColor: '#3A3A3A',
    coverImage: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
  },
  {
    id: '10',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverColor: '#F5DEB3',
    coverImage: 'https://covers.openlibrary.org/b/id/8231852-L.jpg',
  },
  {
    id: '11',
    title: '1984',
    author: 'George Orwell',
    coverColor: '#B22222',
    coverImage: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
  },
  {
    id: '12',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverColor: '#C71585',
    coverImage: 'https://covers.openlibrary.org/b/id/8231996-L.jpg',
  },
];

// Mock community posts data
const MOCK_COMMUNITY_POSTS = [
  {
    id: '1',
    user: {
      name: 'Samantha Jackson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      currentBook: 'Pretty Little Liars',
    },
    book: {
      title: 'Love at First',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
    },
    rating: 3,
    maxRating: 5,
    text: 'Fantastic book! #weeklyreadings',
    likes: '3k',
    comments: '354',
    timeAgo: '20 MINS AGO',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
  },
  {
    id: '2',
    user: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      currentBook: 'The Great Gatsby',
    },
    book: {
      title: 'The Great Gatsby',
      cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    },
    rating: 5,
    maxRating: 5,
    text: 'Just finished this classic! Amazing storytelling and character development. Highly recommend!',
    likes: '1.2k',
    comments: '89',
    timeAgo: '2 HOURS AGO',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
  },
  {
    id: '3',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      currentBook: 'Dune',
    },
    book: {
      title: 'Dune',
      cover: 'https://covers.openlibrary.org/b/id/8101356-L.jpg',
    },
    rating: 4,
    maxRating: 5,
    text: 'Epic sci-fi masterpiece! The world-building is incredible. #scifi #dune',
    likes: '856',
    comments: '234',
    timeAgo: '5 HOURS AGO',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
  },
];

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const SUGGESTION_WORDS = ['"The"', 'the', 'to'];

const MOCK_AUTHORS = [
  {
    id: 1,
    name: 'J.K. Rowlings',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    books: ['Harry Potter', 'Harry Potter and the Cursed Child'],
  },
  {
    id: 2,
    name: 'Elon Musk',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    books: ['Harry Potter', 'Harry Potter and the Cursed Child'],
  },
  {
    id: 3,
    name: 'Leon S.Kennedy',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    books: ['Harry Potter', 'Harry Potter and the Cursed Child'],
  },
];
const MOCK_GENRES = ['Horror', 'Comedy', 'Zombie'];
const MOCK_AGE_RATINGS = ['3+', '13+'];

// Add the papers image import
const papersBg = require('../../src/assets/images/papers.png');

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(4);
  const [activeFilter, setActiveFilter] = useState(null); // 'author', 'genre', etc.
  const [authorSearch, setAuthorSearch] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchContext, setSearchContext] = useState('library'); // 'library' or 'community'

  // Set search context based on URL parameters
  useEffect(() => {
    if (params.context === 'community') {
      setSearchContext('community');
    }
  }, [params.context]);

  // TODO: Backend integration - Replace with actual API call
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // API call would go here
    // Example: searchBooks(query).then(results => setSearchResults(results))
  };

  const handleBookPress = (bookId: string) => {
    // TODO: Backend integration - Navigate to book details with real book data
    router.push(`/book/${bookId}` as any);
  };

  const handleProfilePress = () => {
    // TODO: Backend integration - Navigate to user profile
    router.push('/profile');
  };

  const handleBackPress = () => {
    router.back();
  };



  const renderBookCard = (book: typeof MOCK_BOOKS[0]) => (
    <TouchableOpacity
      key={book.id}
      style={styles.bookCard}
      onPress={() => handleBookPress(book.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: book.coverImage }} style={styles.bookCover} />
      <View style={styles.bookOverlay}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>{book.author}</Text>
        {book.subtitle && (
          <Text style={styles.bookSubtitle}>{book.subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderStars = (rating: number, maxRating: number = 5) => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={14}
          color={i <= rating ? '#FF6B35' : '#DDD'}
        />
      );
    }
    return stars;
  };

  const renderCommunityPost = (post: typeof MOCK_COMMUNITY_POSTS[0]) => (
    <View key={post.id} style={styles.postContainer}>
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => router.push(`/profile/${post.user.name}` as any)}
        >
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.userActivity}>Reading "{post.user.currentBook}"</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/post-options' as any)}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        <Image source={{ uri: post.image }} style={styles.postImage} />
        <View style={styles.bookInfo}>
          <Image source={{ uri: post.book.cover }} style={styles.smallBookCover} />
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(post.rating, post.maxRating)}
            </View>
            <Text style={styles.ratingText}>{post.rating}/{post.maxRating}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.postText}>{post.text}</Text>

      <View style={styles.postFooter}>
        <View style={styles.engagement}>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/like-post' as any)}
          >
            <Ionicons name="heart-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/comments' as any)}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{post.comments}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timeAgo}>{post.timeAgo}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={papersBg} style={styles.bgImage} resizeMode="cover">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder={searchContext === 'community' ? "Search Community Posts" : "Search Library"}
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => handleSearch(searchText)}
            />
            <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
              <Ionicons name="filter-outline" size={24} color="#FF6B35" style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
            activeOpacity={0.7}
          >
            <View style={styles.profileImage}>
              {/* TODO: Backend integration - Replace with actual user profile image */}
              <Text style={styles.profileInitial}>U</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Main Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {searchContext === 'community' ? (
            // Community posts
            <View style={{ padding: 16 }}>
              {MOCK_COMMUNITY_POSTS.map(renderCommunityPost)}
            </View>
          ) : (
            // Books Grid
            <>
              <View style={styles.booksGrid}>
                {MOCK_BOOKS.map(renderBookCard)}
              </View>
              {/* Partial book cards at bottom */}
              <View style={styles.partialCards}>
                <View style={[styles.partialCard, { backgroundColor: '#E8E8E8' }]} />
                <View style={[styles.partialCard, { backgroundColor: '#E8E8E8' }]} />
                <View style={[styles.partialCard, { backgroundColor: '#E8E8E8' }]} />
              </View>
            </>
          )}
        </ScrollView>
        {/* Filter Modal */}
        <Modal
          visible={filterVisible}
          animationType="slide"
          transparent
          onRequestClose={() => { setFilterVisible(false); setActiveFilter(null); }}
        >
          <Pressable style={styles.modalBackdrop} onPress={() => { setFilterVisible(false); setActiveFilter(null); }} />
          <View style={styles.filterModal}>
            <Text style={styles.filterTitle}>Search Filters</Text>

            {/* Author Filter */}
            <TouchableOpacity style={styles.filterItem} onPress={() => setActiveFilter('author')}>
              <View>
                <Text style={styles.filterLabel}>Author</Text>
                <Text style={styles.filterValue} numberOfLines={1} ellipsizeMode="tail">
                  {MOCK_AUTHORS.map(a => a.name).join(', ')}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            {/* Genre Filter */}
            <TouchableOpacity style={styles.filterItem}>
              <View>
                <Text style={styles.filterLabel}>Genre</Text>
                <Text style={styles.filterValue}>{MOCK_GENRES.join(', ')}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            {/* Ratings Filter */}
            <TouchableOpacity style={styles.filterItem}>
              <View>
                <Text style={styles.filterLabel}>Ratings</Text>
                <View style={{ flexDirection: 'row', marginTop: 2 }}>{renderStars(selectedRating)}</View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            {/* Age Ratings Filter */}
            <TouchableOpacity style={styles.filterItem}>
              <View>
                <Text style={styles.filterLabel}>Age Ratings</Text>
                <Text style={styles.filterValue}>{MOCK_AGE_RATINGS.join(', ')}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            {/* Buttons */}
            <TouchableOpacity style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton} onPress={() => { setFilterVisible(false); setActiveFilter(null); }}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>

            {/* Author Filter Sheet (on top of modal) */}
            {activeFilter === 'author' && (
              <View style={styles.authorSheet}>
                <View style={styles.authorSheetHeader}>
                  <Text style={styles.filterTitle}>Search Filters </Text>
                  <Text style={styles.filterTitleInactive}>Authors</Text>
                </View>
                <View style={styles.searchBarRow}>
                  <Ionicons name="search" size={18} color="#888" style={{ marginLeft: 8, marginRight: 6 }} />
                  <TextInput
                    style={styles.authorSearchInput}
                    placeholder="Search Authors"
                    placeholderTextColor="#999"
                    value={authorSearch}
                    onChangeText={setAuthorSearch}
                  />
                </View>
                <ScrollView style={{ marginTop: 18, marginBottom: 18 }}>
                  {MOCK_AUTHORS.filter(a => a.name.toLowerCase().includes(authorSearch.toLowerCase())).map(author => (
                    <TouchableOpacity
                      key={author.id}
                      style={[styles.authorItem, selectedAuthor === author.id && styles.authorItemSelected]}
                      onPress={() => setSelectedAuthor(author.id)}
                      activeOpacity={0.8}
                    >
                      <Image source={{ uri: author.avatar }} style={styles.authorAvatar} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.authorName}>{author.name}</Text>
                        <Text style={styles.authorBooks} numberOfLines={1} ellipsizeMode="tail">
                          {author.books.join(', ')}
                        </Text>
                      </View>
                      <View style={styles.radioOuter}>
                        {selectedAuthor === author.id ? <View style={styles.radioInner} /> : null}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity style={styles.doneButton} onPress={() => setActiveFilter(null)}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backArrow: {
    fontSize: 20,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    marginRight: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  filterButton: {
    marginLeft: 6,
    padding: 4,
  },
  filterIcon: {
    fontSize: 22,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  profileButton: {
    width: 44,
    height: 44,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  bookCard: {
    width: (width - 48) / 3,
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#F8F8F8',
  },
  bookCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bookOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 8,
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  bookSubtitle: {
    fontSize: 10,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  partialCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  partialCard: {
    width: (width - 48) / 3,
    height: 40,
    borderRadius: 8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  filterModal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  filterTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '700',
    color: '#222',
    marginBottom: 18,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  filterValue: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    fontWeight: '400',
    color: '#888',
    maxWidth: 180,
  },
  chevron: {
    fontSize: 24,
    color: '#CCC',
    fontFamily: 'Bogart-Regular-Trial',
    marginLeft: 10,
  },
  clearButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
    color: '#333',
  },
  doneButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  doneButtonText: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '700',
    color: '#FFF',
  },
  filterTitleInactive: {
    fontSize: 20,
    fontFamily: 'Bogart-Regular-Trial',
    fontWeight: '400',
    color: '#A0A0A0',
    marginLeft: 4,
    marginTop: -2,
    top: -18,
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 4,
    height: 44,
  },
  authorSearchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#222',
    paddingVertical: 0,
  },
  authorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  authorItemSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF7F3',
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 14,
  },
  authorName: {
    fontSize: 17,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  authorBooks: {
    fontSize: 13,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#A0A0A0',
    fontWeight: '400',
    marginRight: 8,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B35',
  },
  authorSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 20,
  },
  // Community post styles
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  userActivity: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#888',
  },
  postContent: {
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  smallBookCover: {
    width: 40,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  postText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  engagement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  engagementText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginLeft: 4,
  },
    timeAgo: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#999',
  },
  authorSheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 18,
  },
});