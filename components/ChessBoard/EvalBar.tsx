import React from 'react';
import { View, Text } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useDerivedValue } from 'react-native-reanimated';

interface EvalBarProps {
  score: number; // positive = white advantage, negative = black
}

export default function EvalBar({ score }: EvalBarProps) {
  const clamped = Math.max(-1, Math.min(1, score));          // –1 to +1
  const whitePct = (clamped + 1) / 2;                       // 0 → 1
  const blackPct = 1 - whitePct;                            // 0 → 1

  const animStyle = useAnimatedStyle(() => ({
    height: withSpring(`${blackPct * 100}%` as any, { damping: 14, stiffness: 90 }),
  }));

  const label =
    Math.abs(score) < 0.05
      ? '='
      : score > 0
      ? `+${(score * 10).toFixed(1)}`
      : `${(score * 10).toFixed(1)}`;

  return (
    <View style={{
      width: 10, height: 370, backgroundColor: '#f1f5f9',
      borderRadius: 8, overflow: 'hidden', marginRight: 8,
    }}>
      {/* Black side fills from top */}
      <Animated.View style={[{ width: '100%', backgroundColor: '#0f172a' }, animStyle]} />
      {/* Score label at the midpoint */}
    </View>
  );
}
