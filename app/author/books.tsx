import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
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
    award: "VOTED BEST THRILLER NOVEL 20XX",
    status: 'writing',
    genre: 'Thriller',
    type: 'Novel',
  },
  {
    id: 2,
    title: "TARZAN",
    author: "Edgar Rice Burroughs",
    coverImage: "https://m.media-amazon.com/images/I/81bqwMW+gqL.jpg",
    price: "1€",
    status: 'published',
    genre: 'Adventure',
    type: 'Novel',
  },
  {
    id: 3,
    title: "WALK INTO THE SHADOW",
    author: "ESTELLE D'ARCY",
    coverImage: "https://constancesayers.com/wp-content/uploads/The-Star-and-the-Strange-Moon-HARDCOVER.webp",
    status: 'writing',
    genre: 'Mystery',
    type: 'Short Story',
  },
  {
    id: 4,
    title: "THE SILENT PATIENT",
    author: "ALEX MICHAELIDES",
    coverImage: "https://prodimage.images-bn.com/pimages/9780192783455_p0_v1_s600x595.jpg",
    status: 'published',
    genre: 'Thriller',
    type: 'Novel',
  },
  {
    id: 5,
    title: "THE MARTIAN",
    author: "ANDY WEIR",
    coverImage: "https://150092520.v2.pressablecdn.com/wp-content/uploads/2021/08/the-moon-the-stars-1.jpg",
    status: 'published',
    genre: 'Sci-Fi',
    type: 'Novel',
  },
  {
    id: 6,
    title: "ITALO CALVINO",
    author: "Oscar Mondadori",
    coverImage: "https://highfivebooks.org/cdn/shop/files/9780062382610.jpg?v=1718643372&width=480",
    subtitle: "Collezione di sabbia",
    status: 'writing',
    genre: 'Literary',
    type: 'Essay',
  }
];

const genres = ['All', 'Thriller', 'Adventure', 'Mystery', 'Sci-Fi', 'Literary'];
const types = ['All', 'Novel', 'Short Story', 'Essay'];
const tabs = [
  { key: 'writing', label: 'Continue Writing' },
  { key: 'published', label: 'Published' },
  { key: 'all', label: 'All' },
];

export default function AuthorBooksScreen() {
  const [selectedTab, setSelectedTab] = useState('writing');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Filtering logic
  let filteredBooks = mockBooks;
  if (selectedTab !== 'all') {
    filteredBooks = filteredBooks.filter((b) => b.status === selectedTab);
  }
  if (selectedGenre !== 'All') {
    filteredBooks = filteredBooks.filter((b) => b.genre === selectedGenre);
  }
  if (selectedType !== 'All') {
    filteredBooks = filteredBooks.filter((b) => b.type === selectedType);
  }

  const handleBookPress = (bookId: number) => {
    router.push(`/book/${bookId}` as any);
  };

  const handleAddBook = () => {
    router.push('/add-book' as any);
  };

  const BookCard = ({ book }: { book: typeof mockBooks[0] }) => (
    <TouchableOpacity 
      style={styles.bookCard} 
      onPress={() => handleBookPress(book.id)}
      activeOpacity={0.8}
    >
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, selectedTab === tab.key && styles.tabActive]}
            onPress={() => setSelectedTab(tab.key)}
          >
            <Text style={[styles.tabText, selectedTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={22} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      {/* Books Grid */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.booksGrid}>
          {filteredBooks.length === 0 ? (
            <Text style={styles.emptyText}>No books found for this filter.</Text>
          ) : (
            filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          )}
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

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Books</Text>
            <Text style={styles.modalLabel}>Genre</Text>
            <View style={styles.modalOptionsRow}>
              {genres.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.modalOption, selectedGenre === g && styles.modalOptionActive]}
                  onPress={() => setSelectedGenre(g)}
                >
                  <Text style={[styles.modalOptionText, selectedGenre === g && styles.modalOptionTextActive]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.modalLabel}>Type</Text>
            <View style={styles.modalOptionsRow}>
              {types.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.modalOption, selectedType === t && styles.modalOptionActive]}
                  onPress={() => setSelectedType(t)}
                >
                  <Text style={[styles.modalOptionText, selectedType === t && styles.modalOptionTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.modalDoneButton} onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.modalDoneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F7BF7',
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#F7F8FC',
    marginRight: 4,
  },
  tabActive: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  filterButton: {
    marginLeft: 'auto',
    backgroundColor: '#FFF7F3',
    borderRadius: 20,
    padding: 8,
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
    marginBottom: 18,
    alignItems: 'center',
  },
  bookCover: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    marginBottom: 8,
  },
  bookImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  bookMeta: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
    textAlign: 'center',
  },
  awardBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    zIndex: 2,
  },
  awardText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFF7F3',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    zIndex: 2,
  },
  priceText: {
    color: '#FF6B35',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    width: '100%',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
  },
  modalLabel: {
    fontSize: 15,
    color: '#888',
    marginTop: 10,
    marginBottom: 6,
  },
  modalOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  modalOption: {
    backgroundColor: '#F7F8FC',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  modalOptionActive: {
    backgroundColor: '#FF6B35',
  },
  modalOptionText: {
    color: '#333',
    fontSize: 14,
  },
  modalOptionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalDoneButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 18,
  },
  modalDoneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});