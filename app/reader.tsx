import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const dummyPages = [
  {
    chapter: 3,
    page: 57,
    content: [
      "Brilliantly styled as a translation of an ancient epic, Victory City is a saga of love, adventure, and myth that is in itself a testament to the power of storytelling.",
      "\"Victory City is a triumph—not because it exists, but because it is utterly enchanting.\"—The Atlantic",
      "In the wake of an unimportant battle between two long-forgotten kingdoms in fourteenth-century southern India, a nine-year-old girl has a divine encounter that will change the course of history. After witnessing the death of her mother, the grief-stricken Pampa Kampana becomes a vessel for a goddess, who begins to speak out of her mouth.",
      "Gifted with a mission to give women an equal place in a patriarchal world, Pampa Kampana creates the city of Bisnaga—literally \"victory city\"—and rules it for more than two centuries. The story of Bisnaga is a story of love, sex, and power, of the good and bad decisions made by the women and men who come to rule it, and of the sticky entanglements of family, fortune, and desire.",
      "A mouthful of god-blasted stories and a city for all who wish to be equal: Pampa Kampana lives a grand life—part of it in the company of a courtesan, a fierce warrior, a mischievous monkey, and a talking parrot. But the cost of power is always a burden, and the city's rise from the ashes of a long-forgotten past conceals a dangerous secret that threatens to tear down Pampa Kampana's idealistic vision for good.",
    ],
  },
  {
    chapter: 3,
    page: 58,
    content: [
      "Page 2: The next chapter unfolds with new characters and unforeseen challenges. The city of Bisnaga faces its first major political turmoil, testing Pampa Kampana's resolve and leadership. Whispers of rebellion begin to surface from the distant provinces.",
      "New alliances are formed, and old loyalties are questioned. The author introduces a mysterious oracle whose prophecies deeply impact the city's future. The narrative deepens, exploring themes of betrayal and redemption.",
      "Amidst the growing unrest, a forbidden love blossoms between a high-ranking general and a humble merchant, adding a layer of romantic intrigue to the unfolding drama. Their secret meetings become a dangerous game, with the city's fate hanging in the balance.",
      "The goddess continues to guide Pampa Kampana, but her voice becomes fainter, suggesting that the city's destiny now rests more heavily on human choices than divine intervention. The challenges grow, pushing the inhabitants of Bisnaga to their limits.",
      "As tensions rise, a grand festival is announced, intended to unify the people and distract from the political unrest. However, it inadvertently becomes a stage for a pivotal confrontation that will shape the city's future for centuries to come.",
    ],
  },
  {
    chapter: 3,
    page: 59,
    content: [
      "Page 3: The climax of the current conflict arrives, leading to a dramatic battle that redefines the power dynamics within Bisnaga. Sacrifices are made, and heroes emerge from unexpected places. The consequences of war are deeply felt by all.",
      "The oracle's final prophecy is revealed, hinting at a future both glorious and perilous for Bisnaga. Pampa Kampana must make a difficult decision that will affect not only her reign but the very essence of her city's foundational principles.",
      "The lovers face their ultimate test, forced to choose between their personal happiness and the greater good of Bisnaga. Their story intertwines with the city's fate, demonstrating the profound impact of individual choices on collective destiny.",
      "In the aftermath, a period of rebuilding begins. The city, though scarred, emerges stronger, with its people more united than ever. Lessons are learned, and new traditions are forged from the trials they have endured.",
      "The final paragraphs reflect on the enduring legacy of Pampa Kampana and Bisnaga, a testament to resilience, innovation, and the power of a vision. The tale concludes, but the spirit of Victory City lives on in its people's hearts.",
    ],
  },
];

export default function ReaderScreen() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentPageIndex(index);
  };

  const currentPage = dummyPages[currentPageIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FF6B35" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.bookTitle}>Pretty Little Liars</Text>
          <Text style={styles.chapterInfo}>
            Chapter {currentPage.chapter} - Page {currentPage.page}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="volume-high-outline" size={24} color="#FF6B35" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="bookmark-outline" size={24} color="#FF6B35" />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.headerProgressBar, {
            width: `${((currentPageIndex + 1) / dummyPages.length) * 100}%`,
          }]}
        />
      </View>
      <View style={styles.redLine} />

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentScrollContainer}
      >
        {dummyPages.map((page, index) => (
          <View key={index} style={styles.pageContent}>
            {page.content.map((paragraph, pIndex) => (
              <Text key={pIndex} style={styles.paragraph}>
                {renderParagraphWithHighlights(paragraph, styles)}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomBarTextContainer}>
          <Text style={styles.bottomBarText}>Pretty Little Liars</Text>
          <Text style={styles.bottomBarSubText}>
            Chapter {currentPage.chapter} - Page {currentPage.page}
          </Text>
        </View>
        <TouchableOpacity style={styles.bottomBarIcon}>
          <Ionicons name="pause-circle" size={30} color="#FF6B35" />
        </TouchableOpacity>
        <View style={styles.progressBar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFEA', // Light beige background color for reading
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 50, // Adjust for status bar
    paddingBottom: 15,
    backgroundColor: '#F4EFEA',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0D9C8',
  },
  headerTitleContainer: {    
    marginLeft: 30,
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
  },
  chapterInfo: {
    fontSize: 11,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 10,
  },
  headerIcon: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0D9C8',
  },
  redLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: '#FF6B35',
  },
  contentScrollContainer: {
    // flexGrow: 1, // This is important for horizontal scrollview content
    justifyContent: 'flex-start', // Align content to the top
  },
  pageContent: {
    width: width, // Each page takes full screen width
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexGrow: 1,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  highlightText: {
    backgroundColor: '#FFD700', // Yellow highlight
    paddingHorizontal: 2,
    borderRadius: 3,
    overflow: 'hidden',
    // Removed marginHorizontal because it breaks line wrapping
  },
  greenHighlight: {
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  redHighlight: {
    backgroundColor: '#FFCDD2',
    paddingHorizontal: 2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
    position: 'absolute',
    bottom: 60, // Adjust this as needed to float higher
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  bottomBarTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  bottomBarText: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
  },
  bottomBarSubText: {
    fontSize: 10,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginTop: 2,
  },
  bottomBarIcon: {
    position: 'absolute',
    right: 20,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#FF6B35', // Orange color for progress
    borderRadius: 5,
  },
  headerProgressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#FF6B35', // Orange color for progress
    borderRadius: 5,
  },
});

const renderParagraphWithHighlights = (paragraph: string, styles: any) => {
  let parts: (string | React.ReactElement)[] = [paragraph];

  const applyHighlight = (textParts: (string | React.ReactElement)[], regex: RegExp, style: any) => {
    let newParts: (string | React.ReactElement)[] = [];
    textParts.forEach((part, index) => {
      if (typeof part === 'string') {
        const matches = [...part.matchAll(regex)];
        let lastIndex = 0;
        matches.forEach((match, matchIndex) => {
          if (match.index !== undefined) {
            if (match.index > lastIndex) {
              newParts.push(part.substring(lastIndex, match.index));
            }
            newParts.push(
              <Text key={`highlight-${index}-${matchIndex}`} style={style}>
                {match[0]}
              </Text>
            );
            lastIndex = match.index + match[0].length;
          }
        });
        if (lastIndex < part.length) {
          newParts.push(part.substring(lastIndex));
        }
      } else {
        newParts.push(part);
      }
    });
    return newParts;
  };

  // Apply yellow highlight
  parts = applyHighlight(parts, /"Victory City is a triumph—not because it exists, but because it is utterly enchanting."—The Atlantic/g, styles.highlightText);

  // Apply green highlight
  parts = applyHighlight(parts, /fourteenth-century/g, styles.greenHighlight);

  // Apply red highlight
  parts = applyHighlight(parts, /nine-year-old girl has a/g, styles.redHighlight);

  return parts;
}; 