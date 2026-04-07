import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Radius } from '../data/theme';

interface Props extends TextInputProps {
  label: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  error?: string;
  isPassword?: boolean;
}

export default function Input({ label, icon, error, isPassword, ...props }: Props) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.row, focused && styles.focused, !!error && styles.errBorder]}>
        {icon && (
          <MaterialCommunityIcons name={icon} size={19} color={focused ? Colors.primary : Colors.textLight} style={styles.icon} />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textLight}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={isPassword && !show}
          autoCapitalize="none"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShow(v => !v)} style={styles.eye}>
            <MaterialCommunityIcons name={show ? 'eye-off' : 'eye'} size={19} color={Colors.textLight} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.err}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.text, marginBottom: 6 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    borderWidth: 1.5, borderColor: Colors.border, paddingHorizontal: 13,
  },
  focused: { borderColor: Colors.primary },
  errBorder: { borderColor: Colors.error },
  icon: { marginRight: 9 },
  input: { flex: 1, paddingVertical: 13, fontSize: 15, color: Colors.text },
  eye: { padding: 4 },
  err: { fontSize: 12, color: Colors.error, marginTop: 4, marginLeft: 2 },
});
