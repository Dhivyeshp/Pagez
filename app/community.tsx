import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - Replace with API calls
const mockBooks = [
  {
    id: '1',
    title: 'The Martian',
    author: 'Andy Weir',
    cover: 'https://danbrown.com/wp-content/uploads/2024/10/Dan-Brown_The-Da-Vinci-Code-book-cover_2024.jpg',
  },
  {
    id: '2',
    title: 'Italo Calvino',
    subtitle: 'Collezione di sabbia',
    cover: 'https://m.media-amazon.com/images/I/91nOqRtayAL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '3',
    title: 'Harry Potter',
    subtitle: 'Chamber of Secrets',
    author: 'J.K. Rowling',
    cover: 'https://m.media-amazon.com/images/I/61051YAmm+L._UF1000,1000_QL80_.jpg',
  },
];

const mockPosts = [
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
];

const mockAuthors = [
  {
    id: '1',
    name: 'Seth Rolins',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    isAuthor: true,
    post: 'I think the book was amazing and took an awesome turn in the end. you have to read it and it\'s a must.',
    engagement: 'let me know your comments about it.',
    likes: '3k',
    comments: '354',
  },
];

export default function HomeScreen() {
  // TODO: Replace with actual API calls
  const fetchBooks = () => {
    // API call to get trending books
  };

  const fetchCommunityPosts = () => {
    // API call to get community posts
  };

  const fetchAuthors = () => {
    // API call to get new authors
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleCreatePost = () => {
    router.push('/create-post' as any);
  };

  const handleNavigation = (route: string) => {
    router.push(`/${route}` as any);
  };

  const renderStars = (rating: number, maxRating: number) => {
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

  const renderBookCard = (book: any, index: number) => (
    <TouchableOpacity
      key={book.id}
      style={styles.bookCard}
      onPress={() => router.push(`/book/${book.id}` as any)}
    >
      <Image source={{ uri: book.cover }} style={styles.bookCover} />
      {index === 1 && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>1</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderCommunityPost = (post: any) => (
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

  const renderAuthorPost = (author: any) => (
    <View key={author.id} style={styles.authorContainer}>
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => router.push(`/author/${author.id}` as any)}
        >
          <Image source={{ uri: author.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{author.name}</Text>
            <Text style={styles.authorBadge}>⭐ Author</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/post-options' as any)}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <Text style={styles.authorPost}>{author.post}</Text>
      <Text style={styles.authorEngagement}>{author.engagement}</Text>

      <View style={styles.postFooter}>
        <View style={styles.engagement}>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/like-post' as any)}
          >
            <Ionicons name="heart-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{author.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/comments' as any)}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{author.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      {/* Header */}
      <View style={styles.mainHeader}>
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hot Topics Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeaderNoPadding}
            onPress={() => router.push('/hot-topics' as any)}
          >
            <Text style={styles.sectionTitle}>Hot topics</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bookListContainer}
          >
            {mockBooks.map((book, index) => renderBookCard(book, index))}
          </ScrollView>
        </View>

        {/* Hot in Community Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainerWithIconNoPadding}>
            <Ionicons name="flame" size={20} color="#FF6B35" />
            <Text style={styles.sectionTitle}>Hot in community</Text>
          </View>
          {mockPosts.map(renderCommunityPost)}
        </View>

        {/* New Authors Joined! Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: 20, marginBottom: 15 }]}>New Authors Joined!</Text>
          {mockAuthors.map(renderAuthorPost)}
        </View>
      </ScrollView>

      {/* Create Post Button - Floating */}
      <View style={styles.createPostContainer}>
        <TouchableOpacity style={styles.createPostButton} onPress={handleCreatePost}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('home')}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('community')}
        >
          <Ionicons name="people-outline" size={24} color="#FF6B35" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Community</Text>
          <View style={styles.activeNavIndicator} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('library')}
        >
          <Ionicons name="cube-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 59.
  },
  mainHeader: {
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderNoPadding: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitleContainerWithIconNoPadding: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
    color: '#333',
  },
  bookListContainer: {
    paddingHorizontal: 20,
    gap: 15,
    paddingBottom: 10,
  },
  bookCard: {
    width: 120,
    position: 'relative',
  },
  bookCover: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B35',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
  },
  userActivity: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  postContent: {
    marginBottom: 10,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  smallBookCover: {
    width: 60,
    height: 90,
    borderRadius: 4,
    marginRight: 10,
  },
  ratingContainer: {
    flex: 1,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 5,
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
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  engagement: {
    flexDirection: 'row',
    gap: 15,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  engagementText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#999',
  },
  authorContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  authorBadge: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FF6B35',
  },
  authorPost: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    marginBottom: 5,
  },
  authorEngagement: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginBottom: 10,
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
  createPostContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 10,
  },
  createPostButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
});