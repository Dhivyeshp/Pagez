import React from 'react';
import { View, StyleSheet, ViewStyle, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../constants/theme';

interface LayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  style,
  safeArea = true,
}) => {
  const Container = safeArea ? SafeAreaView : View;

  return (
    <Container style={[styles.container, style]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
}); 