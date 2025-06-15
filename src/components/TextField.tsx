import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';

interface Props extends TextInputProps {
  style?: any;
}

export const TextField: React.FC<Props> = ({ style, ...props }) => (
  <View style={styles.container}>
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={COLORS.textSecondary}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SIZES.medium,
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SIZES.large,
    backgroundColor: '#fff',
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
  },
}); 