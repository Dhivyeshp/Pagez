import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  RefreshControl,
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

// General community feed posts (like Twitter timeline)
const mockCommunityFeed = [
  {
    id: 'feed1',
    user: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      currentBook: 'The Midnight Library',
    },
    book: {
      title: 'The Midnight Library',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
    },
    rating: 5,
    maxRating: 5,
    text: 'Just finished The Midnight Library and wow... what a beautiful exploration of life\'s infinite possibilities. Matt Haig really knows how to make you think about the choices we make. Highly recommend! 📚✨',
    likes: '1.2k',
    comments: '89',
    timeAgo: '2 HOURS AGO',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
  },
  {
    id: 'feed2',
    user: {
      name: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      currentBook: 'Project Hail Mary',
    },
    book: {
      title: 'Project Hail Mary',
      cover: 'https://covers.openlibrary.org/b/id/8101356-L.jpg',
    },
    rating: 4,
    maxRating: 5,
    text: 'Andy Weir does it again! Project Hail Mary is a masterpiece of sci-fi. The friendship between Grace and Rocky is everything. Science and humanity in perfect balance. 🚀👽',
    likes: '856',
    comments: '234',
    timeAgo: '4 HOURS AGO',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
  },
  {
    id: 'feed3',
    user: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      currentBook: 'Klara and the Sun',
    },
    book: {
      title: 'Klara and the Sun',
      cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    },
    rating: 4,
    maxRating: 5,
    text: 'Kazuo Ishiguro\'s Klara and the Sun is a beautiful meditation on love, consciousness, and what it means to be human. Klara\'s perspective is so unique and touching. 🤖☀️',
    likes: '567',
    comments: '123',
    timeAgo: '6 HOURS AGO',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
  },
  {
    id: 'feed4',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      currentBook: 'The Seven Husbands of Evelyn Hugo',
    },
    book: {
      title: 'The Seven Husbands of Evelyn Hugo',
      cover: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',
    },
    rating: 5,
    maxRating: 5,
    text: 'Taylor Jenkins Reid has done it again! This book is absolutely captivating. The way she weaves together Hollywood glamour with deep human emotions is masterful. Couldn\'t put it down! 🌟📖',
    likes: '2.1k',
    comments: '445',
    timeAgo: '8 HOURS AGO',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
  },
  {
    id: 'feed5',
    user: {
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      currentBook: 'Dune',
    },
    book: {
      title: 'Dune',
      cover: 'https://covers.openlibrary.org/b/id/8101356-L.jpg',
    },
    rating: 5,
    maxRating: 5,
    text: 'Finally finished Dune after months of reading. Frank Herbert\'s world-building is unmatched. The political intrigue, the ecology of Arrakis, the Bene Gesserit... everything is so meticulously crafted. A true masterpiece. 🏜️📚',
    likes: '1.8k',
    comments: '312',
    timeAgo: '12 HOURS AGO',
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
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call to fetch new posts
    setTimeout(() => {
      setRefreshing(false);
      // In a real app, this would fetch new posts from the API
      console.log('Refreshed community feed');
    }, 2000);
  };

  const handleSearchPress = () => {
    router.push('/search?context=community');
  };

  // Function to add new post to community feed (simulating when user creates a post)
  const addNewPostToFeed = (newPost: any) => {
    // In a real app, this would be an API call to add the post to the database
    // For now, we'll simulate adding to the feed
    console.log('New post added to community feed:', newPost);
    // mockCommunityFeed.unshift(newPost); // Add to beginning of feed
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleCreatePost = () => {
    // In a real app, this would navigate to a create post screen
    // For now, we'll simulate creating a post
    const newPost = {
      id: `feed${Date.now()}`,
      user: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        currentBook: 'Currently Reading...',
      },
      book: {
        title: 'Your Book Review',
        cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
      },
      rating: 5,
      maxRating: 5,
      text: 'Just finished an amazing book! Can\'t wait to share my thoughts with the community. 📚✨',
      likes: '0',
      comments: '0',
      timeAgo: 'JUST NOW',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    };
    
    addNewPostToFeed(newPost);
    // In a real app, this would navigate to create post screen
    // router.push('/create-post' as any);
    alert('Post created! (This is a simulation - in a real app, this would navigate to create post screen)');
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

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF6B35']}
            tintColor="#FF6B35"
          />
        }
      >
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

        {/* Community Feed Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainerWithIconNoPadding}>
            <Ionicons name="people" size={20} color="#FF6B35" />
            <Text style={styles.sectionTitle}>Community Feed</Text>
          </View>
          {mockCommunityFeed.map(renderCommunityPost)}
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