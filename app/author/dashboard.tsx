import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data - Replace with real API calls
const mockUserData = {
  name: 'Author Name',
  profileImage: 'https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=A',
  engagementScore: 8.2,
  stats: {
    readers: 472,
    likes: 4800, // 4.8k
    comments: 3100, // 3.1k
    books: 12,
    notes: 392,
    posts: 1900, // 1.9k
  },
  trends: {
    readers: 'up' as const,
    likes: 'up' as const,
    comments: 'down' as const,
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  const color = trend === 'up' ? '#4CAF50' : trend === 'down' ? '#FF6B6B' : '#9E9E9E';
  const iconName = trend === 'up' ? 'arrow-up' : trend === 'down' ? 'arrow-down' : 'remove';
  
  return <Ionicons name={iconName} size={16} color={color} />;
};

const StatCard = ({
  value,
  label,
  trend,
  color = '#4CAF50'
}: {
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}) => (
  <View style={styles.statItem}>
    <View style={styles.statValueContainer}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {trend && <TrendIcon trend={trend} />}
    </View>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const TipCard = ({
  category,
  title,
  description
}: {
  category: string;
  title: string;
  description: string;
}) => (
  <TouchableOpacity
    style={styles.tipCard}
    onPress={() => router.push('/tips' as any)} // TODO: Navigate to specific tip
  >
    <Text style={styles.tipCategory}>{category}</Text>
    <Text style={styles.tipTitle}>{title}</Text>
    {description ? <Text style={styles.tipDescription}>{description}</Text> : null}
  </TouchableOpacity>
);

const EngagementScoreCard = ({ score }: { score: number }) => (
  <View style={styles.engagementScoreCard}>
    <View style={styles.scoreGauge}>
      <View style={styles.scoreGaugeBackground} />
      <View style={[styles.scoreGaugeProgress, { transform: [{ rotateZ: `${(score / 10) * 180 - 135}deg` }] }]} /> 
      <Text style={styles.scoreValue}>{score.toFixed(1)}</Text>
    </View>
    <Text style={styles.engagementLabel}>Engagement Score</Text>
  </View>
);

export default function HomeScreen() {
  // TODO: Replace with real API call
  const userData = mockUserData;

  const handleNavigation = (destination: string) => {
    router.push(`/${destination}` as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Engagement Score Card */}
        <EngagementScoreCard score={userData.engagementScore} />

        {/* Engagement Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Engagement Stats</Text>
          <View style={styles.statsRow}>
            <StatCard
              value={userData.stats.readers}
              label="Readers"
              trend={userData.trends.readers}
              color="#4CAF50"
            />
            <StatCard
              value={formatNumber(userData.stats.likes)}
              label="Likes"
              trend={userData.trends.likes}
              color="#4CAF50"
            />
            <StatCard
              value={formatNumber(userData.stats.comments)}
              label="Comments"
              trend={userData.trends.comments}
              color="#FF6B6B"
            />
          </View>
        </View>

        {/* Contribution Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Contribution Stats</Text>
          <View style={styles.statsRow}>
            <StatCard
              value={userData.stats.books}
              label="Books"
              color="#333"
            />
            <StatCard
              value={userData.stats.notes}
              label="Notes"
              color="#333"
            />
            <StatCard
              value={formatNumber(userData.stats.posts)}
              label="Posts"
              color="#333"
            />
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips based on your stats</Text>
          <View style={styles.tipsContainer}>
            <TipCard
              category="Impression"
              title="Talk & engage with your audience to get them to know who you really are."
              description=""
            />
            <TipCard
              category="Content Creation"
              title="Talk & engage with your audience to get them to know who you really are."
              description=""
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F7BF7',
  },
  content: {
    flex: 1,
    marginTop: 0,
  
    overflow: 'hidden',
    backgroundColor: '#F5F7FA',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    paddingTop: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  tipsSection: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  tipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  tipCard: {
    flex: 1,
  },
  tipCategory: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 22,
  },
  tipDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  engagementScoreCard: {
    backgroundColor: '#4F7BF7',
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250, // Adjust height as needed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  scoreGauge: {
    width: 160,
    height: 80,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreGaugeBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 10,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotateZ: '-135deg' }],
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scoreGaugeProgress: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 10,
    borderColor: 'white',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scoreValue: {
    fontSize: 48,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 30, // Adjust as needed to center the number
  },
  engagementLabel: {
    fontSize: 18,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'white',
    marginTop: 10,
  },
});