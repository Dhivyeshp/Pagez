import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

// Mock data - Backend developer should replace with real API calls
const mockPosts = [
  {
    id: 1,
    author: {
      name: 'Samantha Jackson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    book: {
      title: 'Pretty Little Liars',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
      rating: 3,
      maxRating: 5,
    },
    content: 'Fantastic book! #weeklyreadings',
    likes: 3000,
    comments: 354,
    timeAgo: '20 MINS AGO',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    author: {
      name: 'Samantha Jackson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    book: {
      title: 'Pretty Little Liars',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
      rating: 3,
      maxRating: 5,
    },
    content: 'Fantastic book! #weeklyreadings',
    likes: 2500,
    comments: 180,
    timeAgo: '1 HOUR AGO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
  },
];

const currentUser = {
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
};

export default function HomeScreen() {
  const handleBackPress = () => {
    // Backend developer: Add navigation logic
    router.back();
  };

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  const handleTabPress = (tab: string) => {
    // Backend developer: Add tab navigation logic
    console.log(`Navigating to ${tab} tab`);
  };

  const handlePostPress = (postId: number) => {
    router.push(`/post/${postId}` as any);
  };

  const handleLikePress = (postId: number) => {
    // Backend developer: Add like functionality
    console.log(`Liked post ${postId}`);
  };

  const handleCommentPress = (postId: number) => {
    router.push(`/post/${postId}/comments` as any);
  };

  const handleCreatePost = () => {
    router.push('/create-post' as any);
  };

  const renderStars = (rating: number, maxRating: number) => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Text key={i} style={[styles.star, { color: i <= rating ? '#FF6B6B' : '#E0E0E0' }]}>
          ★
        </Text>
      );
    }
    return stars;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F7BF7" />
      
      {/* Content */}
      <View style={styles.contentWrapper}>
        <View style={styles.blueBackground} />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Discover posts about you</Text>
          
          {/* Posts */}
          {mockPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => handlePostPress(post.id)}
              activeOpacity={0.95}
            >
              {/* Post Header */}
              <View style={styles.postHeader}>
                <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
                <View style={styles.postHeaderText}>
                  <Text style={styles.authorName}>{post.author.name}</Text>
                  <Text style={styles.bookTitle}>Reading "{post.book.title}"</Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <Text style={styles.moreIcon}>•••</Text>
                </TouchableOpacity>
              </View>

              {/* Post Image */}
              <View style={styles.postImageContainer}>
                <Image source={{ uri: post.image }} style={styles.postImage} />
                
                {/* Book Cover Overlay */}
                <View style={styles.bookCoverOverlay}>
                  <Image source={{ uri: post.book.cover }} style={styles.bookCover} />
                </View>
                
                {/* Rating Overlay */}
                <View style={styles.ratingOverlay}>
                  <View style={styles.starsContainer}>
                    {renderStars(post.book.rating, post.book.maxRating)}
                  </View>
                  <Text style={styles.ratingText}>
                    {post.book.rating}/{post.book.maxRating}
                  </Text>
                </View>
              </View>

              {/* Post Content */}
              <View style={styles.postContent}>
                <Text style={styles.postText}>{post.content}</Text>
                
                {/* Post Actions */}
                <View style={styles.postActions}>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleLikePress(post.id)}
                    >
                      <Text style={styles.likeIcon}>👍</Text>
                      <Text style={styles.actionText}>{formatNumber(post.likes)}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleCommentPress(post.id)}
                    >
                      <Text style={styles.commentIcon}>💬</Text>
                      <Text style={styles.actionText}>{post.comments}</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Create Post Button */}
      <View style={styles.createPostContainer}>
        <TouchableOpacity style={styles.createPostButton} onPress={handleCreatePost}>
          <Text style={styles.createPostText}>Create a post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  blueBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: '#4F7BF7',
    zIndex: 0,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#4F7BF7',
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Bogart-Regular-Trial',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  settingsButton: {
    padding: 5,
  },
  settingsIcon: {
    fontSize: 20,
    color: 'white',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#4F7BF7',
  },
  tabActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 5,
  },
  tabInactive: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Bogart-Regular-Trial',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    marginHorizontal: 20,
    minHeight: 200,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Bogart-Bold-Trial',
  },
  bookTitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Bogart-Regular-Trial',
    marginTop: 2,
  },
  moreButton: {
    padding: 10,
  },
  moreIcon: {
    fontSize: 16,
    color: '#999',
  },
  postImageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookCoverOverlay: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
  },
  ratingOverlay: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Bogart-Regular-Trial',
  },
  postContent: {
    padding: 15,
  },
  postText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Bogart-Regular-Trial',
    marginBottom: 15,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  likeIcon: {
    fontSize: 16,
  },
  commentIcon: {
    fontSize: 16,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Bogart-Regular-Trial',
  },
  timeAgo: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Bogart-Regular-Trial',
  },
  createPostButton: {
    backgroundColor: '#4F7BF7',
    paddingVertical: 18,
    borderRadius: 45,
    alignItems: 'center',
    width: 200,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  createPostText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
  },
  createPostContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
});