import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - Backend developer should replace with real API calls
const mockBooks = [
  {
    id: 1,
    title: "DON'T LOOK BACK",
    author: "ISAAC NELSON",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
    award: "VOTED BEST THRILLER NOVEL 20XX"
  },
  {
    id: 2,
    title: "TARZAN",
    author: "Edgar Rice Burroughs",
    coverImage: "https://m.media-amazon.com/images/I/81bqwMW+gqL.jpg",
    price: "1€"
  },
  {
    id: 3,
    title: "WALK INTO THE SHADOW",
    author: "ESTELLE D'ARCY",
    coverImage: "https://constancesayers.com/wp-content/uploads/The-Star-and-the-Strange-Moon-HARDCOVER.webp",
  },
  {
    id: 4,
    title: "THE SILENT PATIENT",
    author: "ALEX MICHAELIDES",
    coverImage: "https://prodimage.images-bn.com/pimages/9780192783455_p0_v1_s600x595.jpg",
  },
  {
    id: 5,
    title: "THE MARTIAN",
    author: "ANDY WEIR",
    coverImage: "https://150092520.v2.pressablecdn.com/wp-content/uploads/2021/08/the-moon-the-stars-1.jpg",
  },
  {
    id: 6,
    title: "ITALO CALVINO",
    author: "Oscar Mondadori",
    coverImage: "https://highfivebooks.org/cdn/shop/files/9780062382610.jpg?v=1718643372&width=480",
    subtitle: "Collezione di sabbia"
  }
];

const mockUserProfile = {
  name: "Author Name",
  avatar: "https://via.placeholder.com/32x32/FF6B6B/FFFFFF?text=A"
};

export default function HomeScreen() {
  // TODO: Backend developer - Replace with real API calls
  const handleBookPress = (bookId: number) => {
    console.log(`Book ${bookId} pressed`);
    router.push(`/book/${bookId}` as any);
  };

  const handleAddBook = () => {
    console.log('Add book pressed');
    router.push('/add-book' as any);
  };

  const handleTabPress = (tab: string) => {
    console.log(`${tab} tab pressed`);
    router.push(`/${tab.toLowerCase()}` as any);
  };

  const handleBackPress = () => {
    console.log('Back pressed');
    router.back();
  };

  const handleSettingsPress = () => {
    console.log('Settings pressed');
    router.push('/settings' as any);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
    router.push('/profile' as any);
  };

  const BookCard = ({ book }: { book: typeof mockBooks[0] }) => (
    <TouchableOpacity 
      style={styles.bookCard} 
      onPress={() => handleBookPress(book.id)}
      activeOpacity={0.8}
    >
      <View style={styles.bookCover}>
        {/* TODO: Backend developer - Replace with real book cover images */}
        <Image 
          source={{ uri: book.coverImage }} 
          style={styles.bookImage}
          resizeMode="cover"
        />
        {book.award && (
          <View style={styles.awardBadge}>
            <Text style={styles.awardText}>{book.award}</Text>
          </View>
        )}
        {book.price && (
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{book.price}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Books Grid */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.booksGrid}>
          {/* TODO: Backend developer - Replace mockBooks with real API data */}
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </View>
      </ScrollView>

      {/* Add Book Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddBook}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Add Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F7BF7',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 0,
    overflow: 'hidden',
    backgroundColor: '#F7F8FC',
  },
  scrollContent: {
    paddingBottom: 100, // Space for the add button
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bookCard: {
    width: (screenWidth - 40 - 20) / 3,
    marginBottom: 10,
  },
  bookCover: {
    position: 'relative',
    borderRadius: 1,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  bookImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E5E5E5',
  },
  awardBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  awardText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Bogart-Bold-Trial',
    textAlign: 'center',
  },
  priceBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Bogart-Bold-Trial',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4F7BF7',
    paddingVertical: 18,
    borderRadius: 45,
    alignItems: 'center',
    width: 200,
    elevation: 0,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
  },
});