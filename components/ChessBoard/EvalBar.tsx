import React from 'react';
import { View, Text } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface EvalBarProps {
  score: number; // positive = white advantage, negative = black
}

export default function EvalBar({ score }: EvalBarProps) {
  const clamped = Math.max(-10, Math.min(10, score));
  const whitePct = (clamped + 10) / 20;
  const blackPct = 1 - whitePct;

  const animStyle = useAnimatedStyle(() => ({
    height: withSpring(`${blackPct * 100}%` as any, { damping: 14, stiffness: 90 }),
  }));

  const label =
    Math.abs(score) < 0.05
      ? '='
      : score > 0
      ? `+${score.toFixed(1)}`
      : `${score.toFixed(1)}`;

  return (
    <View className="w-4 h-full bg-slate-200 rounded-full overflow-hidden mr-4 border border-slate-600">
      {/* Black side fills from top */}
      <Animated.View className="w-full bg-slate-900" style={[animStyle]} />
      {/* Score label at the midpoint */}
      <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center pointer-events-none">
         <Text className="text-[8px] font-black transform -rotate-90 text-slate-500">{label}</Text>
      </View>
    </View>
  );
}

