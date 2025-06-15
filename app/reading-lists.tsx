import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const mockBooks = [
  {
    id: 1,
    title: 'Beloved Girls',
    cover: 'https://danbrown.com/wp-content/uploads/2024/10/Dan-Brown_The-Da-Vinci-Code-book-cover_2024.jpg',
  },
  {
    id: 2,
    title: 'Fire Dance',
    cover: 'https://m.media-amazon.com/images/I/91nOqRtayAL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 3,
    title: 'Late Night',
    cover: 'https://m.media-amazon.com/images/I/61051YAmm+L._UF1000,1000_QL80_.jpg',
  },
  {
    id: 4,
    title: 'Tucked Away',
    cover: 'https://images.penguinrandomhouse.com/cover/9780593099322',
  },
  {
    id: 5,
    title: 'Good Food',
    cover: 'https://m.media-amazon.com/images/I/91I6xuf2g9L.jpg',
  },
  {
    id: 6,
    title: 'The Great Gatsby',
    cover: 'https://m.media-amazon.com/images/I/61TVnvuvEsL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 7,
    title: 'Tiny Stars',
    cover: 'https://danbrown.com/wp-content/uploads/2024/10/Dan-Brown_The-Da-Vinci-Code-book-cover_2024.jpg',
  },
  {
    id: 8,
    title: 'Dune',
    cover: 'https://m.media-amazon.com/images/I/91nOqRtayAL._AC_UF1000,1000_QL80_.jpg',
  },
];

export default function ReadingListsScreen() {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={() => router.back()}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reading lists</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Latest Discoveries */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Latest discoveries</Text>
            <Text style={styles.sectionSubtitle}>67 books</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookCoversScroll}>
              {mockBooks.map((book) => (
                <View key={book.id} style={styles.bookCoverWrapper}>
                  <Image source={{ uri: book.cover }} style={styles.bookCover} />
                </View>
              ))}
              <TouchableOpacity style={styles.addBookButton}>
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Horrors */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Horrors</Text>
            <Text style={styles.sectionSubtitle}>3 books</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookCoversScroll}>
              {mockBooks.slice(0, 3).map((book) => (
                <View key={book.id} style={styles.bookCoverWrapper}>
                  <Image source={{ uri: book.cover }} style={styles.bookCover} />
                </View>
              ))}
              <TouchableOpacity style={styles.addBookButton}>
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Add new list */}
          <TouchableOpacity style={styles.addNewListButton}>
            <Text style={styles.addNewListText}>Add new list</Text>
            <View style={styles.addNewListIconWrapper}>
              <Ionicons name="add" size={20} color="#666" />
            </View>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.doneButton} onPress={() => router.back()}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height * 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 15,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingVertical: 0,
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 0,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginBottom: 8,
  },
  bookCoversScroll: {
    paddingVertical: 5,
  },
  bookCoverWrapper: {
    marginRight: 10,
  },
  bookCover: {
    width: (width - (15 * 2) - (10 * 7)) / 8,
    height: ((width - (15 * 2) - (10 * 7)) / 8) * 1.5,
    borderRadius: 8,
  },
  addBookButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addNewListButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: -10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  addNewListText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  addNewListIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 40,
    marginHorizontal: 15,
    marginBottom: 40,
    paddingVertical: 15,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: 'white',
  },
}); 