import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data for posts about this specific book
const getBookPosts = (bookId: string) => {
  // In a real app, this would be an API call filtered by bookId
  const allBookPosts = [
    {
      id: '1',
      user: {
        name: 'Samantha Jackson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        currentBook: 'Pretty Little Liars',
      },
      book: {
        title: 'Beloved Girls',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
      },
      rating: 5,
      maxRating: 5,
      text: 'Just finished Beloved Girls and I\'m absolutely blown away! Sara Shepard\'s writing is so captivating. The plot twists had me on the edge of my seat. Highly recommend! 📚✨ #BelovedGirls #MustRead',
      likes: '2.3k',
      comments: '156',
      timeAgo: '2 HOURS AGO',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    },
    {
      id: '2',
      user: {
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        currentBook: 'The Midnight Library',
      },
      book: {
        title: 'Beloved Girls',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
      },
      rating: 4,
      maxRating: 5,
      text: 'The character development in Beloved Girls is incredible. Each girl has such a distinct personality and voice. The way their stories intertwine is masterful storytelling. 👏',
      likes: '1.8k',
      comments: '89',
      timeAgo: '5 HOURS AGO',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    },
    {
      id: '3',
      user: {
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        currentBook: 'Project Hail Mary',
      },
      book: {
        title: 'Beloved Girls',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
      },
      rating: 5,
      maxRating: 5,
      text: 'I couldn\'t put this book down! The mystery elements are perfectly balanced with the character relationships. That ending though... mind-blowing! 🤯 #BelovedGirls #BookReview',
      likes: '3.1k',
      comments: '234',
      timeAgo: '8 HOURS AGO',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    },
    {
      id: '4',
      user: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        currentBook: 'Klara and the Sun',
      },
      book: {
        title: 'Beloved Girls',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
      },
      rating: 4,
      maxRating: 5,
      text: 'The psychological depth in this book is incredible. Sara Shepard really understands how to build tension and create complex characters. A must-read for thriller fans! 🔍',
      likes: '956',
      comments: '67',
      timeAgo: '1 DAY AGO',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    },
    {
      id: '5',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        currentBook: 'The Seven Husbands of Evelyn Hugo',
      },
      book: {
        title: 'Beloved Girls',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
      },
      rating: 5,
      maxRating: 5,
      text: 'This book had me guessing until the very end! The way Sara Shepard weaves together multiple storylines is brilliant. Each chapter reveals something new. Absolutely loved it! 🌟',
      likes: '1.5k',
      comments: '123',
      timeAgo: '2 DAYS AGO',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    },
    {
      id: '6',
      user: {
        name: 'Michael Brown',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        currentBook: 'Dune',
      },
      book: {
        title: 'Beloved Girls',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
      },
      rating: 4,
      maxRating: 5,
      text: 'The friendship dynamics in this book are so realistic. You can really feel the bond between the characters. Great read for anyone who loves character-driven stories! 👯‍♀️',
      likes: '789',
      comments: '45',
      timeAgo: '3 DAYS AGO',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    },
  ];

  return allBookPosts;
};

export default function BookCommunityScreen() {
  const params = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [bookPosts, setBookPosts] = useState<any[]>([]);

  const bookId = params.bookId as string;
  const bookTitle = params.bookTitle as string;
  const bookAuthor = params.bookAuthor as string;

  useEffect(() => {
    // Load posts for this specific book
    const posts = getBookPosts(bookId);
    setBookPosts(posts);
  }, [bookId]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call to fetch new posts
    setTimeout(() => {
      const posts = getBookPosts(bookId);
      setBookPosts(posts);
      setRefreshing(false);
    }, 2000);
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.bookTitle}>{bookTitle}</Text>
          <Text style={styles.bookAuthor}>by {bookAuthor}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
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
        {/* Community Posts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={20} color="#FF6B35" />
            <Text style={styles.sectionTitle}>Community Posts</Text>
            <Text style={styles.postCount}>{bookPosts.length} posts</Text>
          </View>
          {bookPosts.map(renderCommunityPost)}
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    textAlign: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  postCount: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
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
  bottomPadding: {
    height: 20,
  },
}); 