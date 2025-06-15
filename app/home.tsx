import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mock data - Replace with API calls
const continueReadingBooks = [
  {
    id: 1,
    title: 'DUNE',
    author: 'FRANK HERBERT',
    progress: 58,
    currentPage: 589,
    totalPages: 1200,
    cover: 'https://images.penguinrandomhouse.com/cover/9780593099322',
  },
  {
    id: 2,
    title: 'CITY OF ORANGE',
    author: 'DAVID YOON',
    progress: 58,
    currentPage: 589,
    totalPages: null,
    cover: 'https://m.media-amazon.com/images/I/91I6xuf2g9L.jpg',
  },
  {
    id: 3,
    title: 'THE MOON AND STARS',
    author: 'Jenna Warren',
    progress: 58,
    currentPage: 589,
    totalPages: null,
    cover: 'https://m.media-amazon.com/images/I/61TVnvuvEsL._AC_UF1000,1000_QL80_.jpg',
  },
];

const trendingBooks = [
  {
    id: 4,
    title: "DON'T LOOK BACK",
    author: 'ISAAC NELSON',
    badge: 'VOTED BEST THRILLER NOVEL 20XX',
    cover: 'https://danbrown.com/wp-content/uploads/2024/10/Dan-Brown_The-Da-Vinci-Code-book-cover_2024.jpg',
  },
  {
    id: 5,
    title: 'TARZAN',
    author: 'Edgar Rice Burroughs',
    cover: 'https://m.media-amazon.com/images/I/91nOqRtayAL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 6,
    title: 'WALK INTO THE SHADOW',
    author: 'ESTELLE DARCY',
    cover: 'https://m.media-amazon.com/images/I/61051YAmm+L._UF1000,1000_QL80_.jpg',
  },
];

const communityFavorites = [
  {
    id: 7,
    title: 'HARRY POTTER',
    author: 'DEATHLY',
    cover: 'https://danbrown.com/wp-content/uploads/2024/10/Dan-Brown_The-Da-Vinci-Code-book-cover_2024.jpg',
  },
  {
    id: 8,
    title: 'Sisters',
    cover: 'https://m.media-amazon.com/images/I/91nOqRtayAL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 9,
    title: 'The Summer',
    cover: 'https://m.media-amazon.com/images/I/61051YAmm+L._UF1000,1000_QL80_.jpg',
  },
];

const BookCard = ({ book, showProgress = false, size = 'medium' }) => {
  const cardWidth = size === 'large' ? width * 0.28 : width * 0.25;
  
  return (
    <TouchableOpacity 
      style={[styles.bookCard, { width: cardWidth }]} 
      onPress={() => router.push('/book-more' as any)} // Navigate to book-more page
    >
      <View style={styles.bookCover}>
        <Image source={{ uri: book.cover }} style={styles.coverImage} />
        {book.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{book.badge}</Text>
          </View>
        )}
      </View>
      
      {showProgress && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${book.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{book.progress}%</Text>
          <Text style={styles.pageText}>
            Page {book.currentPage}{book.totalPages ? `/${book.totalPages}` : ''}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const SectionHeader = ({ iconName, title, iconColor = '#FF6B35', showChevron = false, onViewAll }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionTitleContent}>
      <Ionicons name={iconName} size={20} color={iconColor} style={{ marginRight: 5 }} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
      <Text style={styles.viewAllText}>View All</Text>
      <Ionicons name="chevron-forward" size={16} color="#FF6B35" />
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleNavigation = (route: string) => {
    router.push(`/${route}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pagezLogo}>pagez</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearchPress}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Continue Reading Section */}
        <SectionHeader 
          iconName="book-outline" 
          title="Continue Reading..." 
          showChevron={true}
          onViewAll={() => handleNavigation('library')}
        />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {continueReadingBooks.map((book) => (
            <BookCard key={book.id} book={book} showProgress={true} size="large" />
          ))}
        </ScrollView>

        {/* Trending Books Section */}
        <SectionHeader 
          iconName="flame-outline" 
          title="Trending Books" 
          showChevron={true}
          onViewAll={() => handleNavigation('library')}
        />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {trendingBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ScrollView>

        {/* Community Favorites Section */}
        <SectionHeader 
          iconName="thumbs-up-outline" 
          title="Community Favorites" 
          showChevron={true}
          onViewAll={() => handleNavigation('library')}
        />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {communityFavorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ScrollView>
        
        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('home')}
        >
          <Ionicons name="home-outline" size={24} color="#FF6B35" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
          <View style={styles.activeNavIndicator} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('community')}
        >
          <Ionicons name="people-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('library')}
        >
          <Ionicons name="cube-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Library</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  pagezLogo: {
    fontSize: 28,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 2,
  },
  horizontalScroll: {
    paddingBottom: 10,
  },
  horizontalScrollContent: {
    paddingHorizontal: 20,
    gap: 15,
  },
  bookCard: {
    marginBottom: 10,
  },
  bookCover: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coverImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    backgroundColor: '#E0E0E0',
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF6B35',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'white',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginTop: 4,
  },
  pageText: {
    fontSize: 10,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#999',
    marginTop: 2,
  },
  bottomSpacing: {
    height: 100, // Adjust this height based on your tab bar height
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 25,
    gap: 40,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  activeNavLabel: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  activeNavIndicator: {
    height: 3,
    width: 30,
    backgroundColor: '#FF6B35',
    borderRadius: 1.5,
    position: 'absolute',
    bottom: -10,
  },
});

// TODO: Backend Integration Points
// 1. Replace mock data with API calls:
//    - continueReadingBooks: GET /api/user/reading-progress
//    - trendingBooks: GET /api/books/trending
//    - communityFavorites: GET /api/books/community-favorites
// 
// 2. User profile image: GET /api/user/profile
// 
// 3. Search functionality: Implement search API endpoint
// 
// 4. Book navigation: Ensure book/{id} route exists with proper book details
//
// 5. Add real book cover images from your book database
//
// 6. Implement proper authentication check for user-specific data