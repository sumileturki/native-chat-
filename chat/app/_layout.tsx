import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

import { Colors } from "@/constants/colors";
import { AuthProvider, useAuth } from "@/contexts/auth-context";

function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.background,
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const isLoggedIn = !!user;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
        redirect={isLoggedIn}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
        redirect={!isLoggedIn}
      />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
