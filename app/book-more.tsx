import React, { useState } from 'react';
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
  NativeSyntheticEvent,
  NativeScrollEvent,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const readerThoughts = [
  {
    id: 1,
    name: 'Samantha Jackson',
    status: 'Reading "Pretty Little Liars"',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
    comment: 'Fantastic book! #weeklyreadings',
    likes: '3k',
    comments: '354',
    timeAgo: '20 MINS AGO',
    backgroundImage: 'https://i0.wp.com/apeejay.news/wp-content/uploads/2023/10/281023-10-most-read-books-Feature.jpg?fit=569%2C509&ssl=1',
    bookCover: require('../src/assets/images/belovedGirls.png'),
  },
  {
    id: 2,
    name: 'John Doe',
    status: 'Reading "The Great Gatsby"',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
    comment: 'A classic for a reason! Loved every page.',
    likes: '1.2k',
    comments: '120',
    timeAgo: '1 DAY AGO',
    backgroundImage: 'https://i0.wp.com/apeejay.news/wp-content/uploads/2023/10/281023-10-most-read-books-Feature.jpg?fit=569%2C509&ssl=1',
    bookCover: require('../src/assets/images/belovedGirls.png'),
  },
  {
    id: 3,
    name: 'Emily White',
    status: 'Reading "1984"',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56ff46135f21?w=40&h=40&fit=crop&crop=face',
    comment: 'Thought-provoking and intense. A must-read for everyone.',
    likes: '2.5k',
    comments: '280',
    timeAgo: '3 DAYS AGO',
    backgroundImage: 'https://i0.wp.com/apeejay.news/wp-content/uploads/2023/10/281023-10-most-read-books-Feature.jpg?fit=569%2C509&ssl=1',
    bookCover: require('../src/assets/images/belovedGirls.png'),
  },
];

export default function BookMoreScreen() {
  const [headerHeight, setHeaderHeight] = useState(250);
  const [scrollY, setScrollY] = useState(0);
  const [blurbVisible, setBlurbVisible] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollY(offsetY);
    // Calculate new header height based on scroll position
    const newHeight = Math.max(250 - offsetY, 0);
    setHeaderHeight(newHeight);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      {/* Orange Background */}
      <View style={[styles.header, { height: headerHeight }]} />

      {/* Header Controls */}
      <View style={styles.headerControls}>
        <TouchableOpacity 
          onPress={() => {
            try {
              router.back();
            } catch (error) {
              router.replace('/' as any);
            }
          }} 
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/reading-lists')}>
            <Ionicons name="bookmark-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="share-social-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.bookDetailsContainer}>
          <Image
            source={require('../src/assets/images/belovedGirls.png')}
            style={styles.bookCover}
          />
          <Text style={styles.bookTitle}>Beloved Girls</Text>
          <Text style={styles.bookAuthor}>by Sara Shepard</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>189</Text>
              <Text style={styles.statLabel}>Pages</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Moderate</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Horror</Text>
              <Text style={styles.statLabel}>Genre</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Stories</Text>
              <Text style={styles.statLabel}>Series</Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingCard}>
              <View style={styles.starIcons}>
                <Ionicons name="star" size={16} color="#FF6B35" />
                <Ionicons name="star" size={16} color="#FF6B35" />
                <Ionicons name="star" size={16} color="#FF6B35" />
                <Ionicons name="star-half" size={16} color="#FF6B35" />
                <Ionicons name="star-outline" size={16} color="#FF6B35" />
              </View>
              <Text style={styles.ratingText}>4.4 Rating</Text>
            </View>
            <View style={styles.readersCard}>
              <Text style={styles.readersValue}>5.8k</Text>
              <Text style={styles.readersLabel}>Daily Readers</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Set in the suburbs of Rosewood, Pennsylvania, the series follows the lives of four teenage girls
            nicknamed the Pretty Little Liars or simply the Liars, whose clique falls apart after the
            disappearance of their queen bee leader, Alison DiLaurentis.
          </Text>

          <Text style={styles.authorThoughtsTitle}>Author's thoughts</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thoughtsScroll}>
            <View style={styles.thoughtCard}>
              <View style={styles.thoughtAuthorInfo}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' }}
                  style={styles.thoughtAuthorAvatar}
                />
                <View>
                  <Text style={styles.thoughtAuthorName}>Seth Rollins</Text>
                  <View style={styles.authorBadge}>
                    <Ionicons name="star" size={10} color="white" />
                    <Text style={styles.authorBadgeText}>Author</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.thoughtText}>
                I think the book was amazing and took an awesome turn in the end. you have to
                read it and it's a must.
              </Text>
              <Text style={styles.thoughtSubText}>let me know your comments about it.</Text>
              <View style={styles.thoughtActions}>
                <View style={styles.actionItem}>
                  <Ionicons name="thumbs-up-outline" size={18} color="#666" />
                  <Text style={styles.actionText}>3k</Text>
                </View>
                <View style={styles.actionItem}>
                  <Ionicons name="chatbubble-outline" size={18} color="#666" />
                  <Text style={styles.actionText}>354</Text>
                </View>
              </View>
            </View>
             <View style={styles.thoughtCard}>
              <View style={styles.thoughtAuthorInfo}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face' }}
                  style={styles.thoughtAuthorAvatar}
                />
                <View>
                  <Text style={styles.thoughtAuthorName}>Jane Doe</Text>
                  <View style={styles.authorBadge}>
                    <Ionicons name="star" size={10} color="white" />
                    <Text style={styles.authorBadgeText}>Author</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.thoughtText}>
                A truly captivating read! The twists kept me on the edge of my seat. Highly recommend for thriller lovers.
              </Text>
            </View>
          </ScrollView>

          {/* Reader's Thoughts */}
          <Text style={styles.readerThoughtsTitle}>Reader's thoughts</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thoughtsScroll}
            contentContainerStyle={styles.thoughtsScrollContent}
          >
            {readerThoughts.map((thought) => (
              <View key={thought.id} style={styles.readerCard}>
                <Image source={{ uri: thought.backgroundImage }} style={styles.readerBackgroundImage} />
                <View style={styles.readerHeaderAbs}>
                  <Image source={{ uri: thought.avatar }} style={styles.readerAvatar} />
                  <View style={styles.readerInfo}>
                    <Text style={styles.readerName}>{thought.name}</Text>
                    <Text style={styles.readerStatus}>{thought.status}</Text>
                  </View>
                </View>
                <View style={styles.readerBookImageWrapperAbs}>
                  <Image source={thought.bookCover} style={styles.readerBookImage} />
                </View>
                <Text style={styles.readerCommentAbs}>{thought.comment}</Text>
                <View style={styles.readerActionsAbs}>
                  <View style={styles.actionItemsLeft}>
                    <View style={styles.actionItem}>
                      <Ionicons name="heart-outline" size={18} color="#666" />
                      <Text style={styles.actionText}>{thought.likes}</Text>
                    </View>
                    <View style={styles.actionItem}>
                      <Ionicons name="chatbubble-outline" size={18} color="#666" />
                      <Text style={styles.actionText}>{thought.comments}</Text>
                    </View>
                  </View>
                  <Text style={styles.timeAgo}>{thought.timeAgo}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            <TouchableOpacity 
              style={styles.communityButton}
              onPress={() => router.push(`/book-community?bookId=beloved-girls&bookTitle=Beloved Girls&bookAuthor=Sara Shepard` as any)}
            >
              <Text style={styles.communityButtonText}>Community</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createPostButton} onPress={() => router.push('/new-post')}>
              <Text style={styles.createPostButtonText}>Create Post</Text>
            </TouchableOpacity>
          </View>

          {/* Reading Buttons */}
          <View style={styles.readingButtons}>
            <TouchableOpacity 
              style={styles.blurbButton}
              onPress={() => setBlurbVisible(true)}
            >
              <Text style={styles.blurbButtonText}>Blurb</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startReadingButton} onPress={() => router.push('/reader')}>
              <Text style={styles.startReadingButtonText}>Start reading</Text>
              <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>

          {/* Bottom padding for scroll */}
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>
      {/* Blurb Modal Overlay */}
      <Modal
        visible={blurbVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setBlurbVisible(false)}
      >
        <View style={styles.blurbOverlayBackdrop}>
          <LinearGradient
            colors={["#f8f6f2", "#f3ede7"]}
            style={styles.blurbBookShadow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.blurbBookPage}>
              <TouchableOpacity style={styles.blurbCloseButton} onPress={() => setBlurbVisible(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
              <Text style={styles.blurbLabel}>BLURP</Text>
              <Text style={styles.blurbTitle}>Pretty Little Liars</Text>
              <Text style={styles.blurbAuthor}>by Sara Shepard</Text>
              <Text style={styles.blurbText}>
                Brilliantly styled as a translation of an ancient epic, Victory City is a saga of love, adventure, and myth that is in itself a testament to the power of storytelling.{"\n\n"}
                “Victory City is a triumph—not because it exists, but because it is utterly enchanting.” —The Atlantic{"\n\n"}
                In the wake of an unimportant battle between two long-forgotten kingdoms in fourteenth-century southern India, a nine-year-old girl has a divine encounter that will change the course of history. After witnessing the death of her mother, the grief-stricken.
              </Text>
              <TouchableOpacity style={styles.doneReadingButton} onPress={() => setBlurbVisible(false)}>
                <Text style={styles.doneReadingText}>Done reading</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#EB4D2A',
    overflow: 'visible',
    shadowColor: '#EB4D2A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  headerControls: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    zIndex: 1000,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    lineHeight: 26,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
    paddingTop: 250,
  },
  bookDetailsContainer: {
    alignItems: 'center',
    marginTop: -100,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  bookCover: {
    width: width * 0.45,
    height: width * 0.45 * 1.5,
    borderRadius: 8,
    marginTop: -60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20,
    zIndex: 2,
    elevation: 5,
  },
  bookTitle: {
    fontSize: 28,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 18,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FF6B35',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 25,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  ratingCard: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFEBE5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 5,
    width: width * 0.45,
  },
  starIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  readersCard: {
    backgroundColor: '#FFEBE5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: width * 0.35,
  },
  readersValue: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  readersLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 22,
    textAlign: 'left',
    marginBottom: 30,
  },
  authorThoughtsTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  thoughtsScroll: {
    marginBottom: 30,
    paddingRight: 20,
  },
  thoughtsScrollContent: {
    gap: 15,
  },
  thoughtCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width: width * 0.8,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thoughtAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  thoughtAuthorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  thoughtAuthorName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
  },
  authorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginTop: 2,
  },
  authorBadgeText: {
    fontSize: 10,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'white',
    marginLeft: 3,
  },
  thoughtText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 20,
  },
  thoughtSubText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginTop: 5,
  },
  thoughtActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  readerThoughtsTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  readerCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
    height: 400,
    width: width * 0.8,
    marginRight: 15,
  },
  readerBackgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    position: 'absolute',
    top: 80,
    left: 0,
    paddingLeft: 25,
    paddingRight: 25,
    zIndex: 0,
  },
  readerHeaderAbs: {
    position: 'absolute',
    top: 10,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3,
    backgroundColor: 'white',
    paddingRight: 20,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  readerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  readerInfo: {
    flexDirection: 'column',
  },
  readerName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
  },
  readerStatus: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginBottom: 15,
  },
  readerBookImageWrapperAbs: {
    position: 'absolute',
    top: 210,
    left: 35,
    width: width * 0.15,
    height: (width * 0.15) * 1.5,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 1,
  },
  readerBookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  readerCommentAbs: {
    position: 'absolute',
    top: 315,
    left: 25,
    right: 15,
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 20,
  },
  readerActionsAbs: {
    position: 'absolute',
    top: 355,
    left: 25,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: -20,
  },
  communityButton: {
    flex: 1,
    backgroundColor: 'rgba(137, 138, 141, 0.17)',
    paddingVertical: 15,
    borderRadius: 15,
    marginLeft: -18,
    alignItems: 'center',
  },
  communityButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
  },
  createPostButton: {
    flex: 1,
    backgroundColor: 'rgba(137, 138, 141, 0.17)',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  createPostButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
  },
  readingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  blurbButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: -18,

  },
  blurbButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
  },
  startReadingButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startReadingButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  bottomPadding: {
    height: 20,
  },
  actionItemsLeft: {
    flexDirection: 'row',
    gap: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#999',
  },
  communityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  blurbOverlayBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurbBookShadow: {
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 12,
  },
  blurbBookPage: {
    width: 340,
    maxWidth: '95%',
    backgroundColor: '#f8f6f2',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#ede6dd',
    paddingVertical: 32,
    paddingHorizontal: 26,
    alignItems: 'flex-start',
    position: 'relative',
  },
  blurbCloseButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 10,
  },
  blurbLabel: {
    color: '#EB4D2A',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 8,
    fontFamily: 'Bogart-Bold-Trial',
  },
  blurbTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    fontFamily: 'Bogart-Bold-Trial',
  },
  blurbAuthor: {
    color: '#EB4D2A',
    fontSize: 17,
    marginBottom: 18,
    fontFamily: 'Bogart-Regular-Trial',
  },
  blurbText: {
    fontSize: 16,
    color: '#222',
    marginBottom: 28,
    lineHeight: 24,
    fontFamily: 'Bogart-Regular-Trial',
  },
  doneReadingButton: {
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  doneReadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Bogart-Bold-Trial',
  },
});