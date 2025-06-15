import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - Replace with real API calls
const mockAuthorPosts = [
  {
    id: 1,
    author: {
      name: 'Seth Rolins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isAuthor: true,
    },
    content: "I think the book was amazing and took an awesome turn in the end. you have to read it and it's a must.\n\nlet me know your comments about it.",
    likes: 3000,
    comments: 354,
  },
  {
    id: 2,
    author: {
      name: 'Seth Rolins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isAuthor: true,
    },
    content: "I think the book was amazing and took an awesome turn in the end. you have to read it and it's a must.\n\nlet me know your comments about it.",
    likes: 3000,
    comments: 354,
  },
  {
    id: 3,
    author: {
      name: 'Seth Rolins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isAuthor: true,
    },
    content: "I think the book was amazing and took an awesome turn in the end. you have to read it and it's a must.\n\nlet me know your comments about it.",
    likes: 3000,
    comments: 354,
  },
];

const mockUserAvatar = 'https://images.unsplash.com/photo-1494790108755-2616b6cfd7c3?w=100&h=100&fit=crop&crop=face';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = React.useState('Notes');

  const handleBackPress = () => {
    // TODO: Navigate back to previous screen
    router.back();
  };

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  const handleProfilePress = () => {
    router.push('/profile' as any);
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    // TODO: Implement tab navigation logic
    // router.push(`/${tab.toLowerCase()}`);
  };

  const handlePostLike = (postId: number) => {
    // TODO: Implement like functionality with API call
    console.log('Like post:', postId);
  };

  const handlePostComment = (postId: number) => {
    router.push(`/post/${postId}/comments` as any);
  };

  const handleAddBook = () => {
    router.push('/add-book' as any);
  };

  const renderPost = (post: any) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.author.name}</Text>
          {post.author.isAuthor && (
            <View style={styles.authorBadge}>
              <Ionicons name="star" size={12} color="#FF6B35" />
              <Text style={styles.authorBadgeText}>Author</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.postMenu}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        <Text style={styles.postText}>{post.content}</Text>
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handlePostLike(post.id)}
        >
          <Ionicons name="heart-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.likes >= 1000 ? `${Math.floor(post.likes / 1000)}k` : post.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handlePostComment(post.id)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
 

      {/* Content */}
      <View style={styles.contentWrapper}>
        <View style={styles.blueBackground} />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.postsContainer}>
            {mockAuthorPosts.map(renderPost)}
          </View>
        </ScrollView>
      </View>

      {/* Create Note Button - Fixed */}
      <View style={styles.createNoteContainer}>
        <TouchableOpacity style={styles.createNoteButton} onPress={handleAddBook}>
          <Text style={styles.createNoteText}>Create a note</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#4F7BF7',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileButton: {
    padding: 2,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  postsContainer: {
    paddingHorizontal: 16,
    paddingTop: 0,
    gap: 16,
    backgroundColor: 'transparent',
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
    marginHorizontal: 10,
    minHeight: 200,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
    marginBottom: 4,
  },
  authorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0ED',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  authorBadgeText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FF6B35',
  },
  postMenu: {
    padding: 8,
  },
  postContent: {
    marginBottom: 20,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'Bogart-Regular-Trial',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  createNoteContainer: {
    position: 'absolute',
    bottom: 35,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  createNoteButton: {
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
  createNoteText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
    position: 'relative',
    zIndex: 2,
  },
});

// TODO: Backend Integration Points
// 1. Replace mockAuthorPosts with API call: GET /api/author-posts
// 2. Replace mockUserAvatar with user's actual profile image from auth context
// 3. Implement handlePostLike with API call: POST /api/posts/{id}/like
// 4. Implement handlePostComment navigation to comments screen
// 5. Implement handleAddBook navigation to add book screen
// 6. Add real-time updates for likes/comments using WebSocket or polling
// 7. Implement tab navigation with proper routing and data fetching
// 8. Add pull-to-refresh functionality for posts
// 9. Implement infinite scroll for posts pagination
// 10. Add error handling and loading states for all API calls