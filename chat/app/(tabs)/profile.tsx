import React from "react";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";

const ProfileScreen = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        backgroundColor: Colors.background,
        justifyContent: "center",
      }}
    >
      <View style={{ marginBottom: 32 }}>
        <Text
          style={{
            color: Colors.textSecondary,
            fontSize: 14,
            marginBottom: 4,
          }}
        >
          Signed in as
        </Text>
        <Text
          style={{
            color: Colors.textPrimary,
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          {user?.name || user?.email || "User"}
        </Text>
        {user?.email && (
          <Text
            style={{
              color: Colors.textSecondary,
              fontSize: 14,
              marginTop: 4,
            }}
          >
            {user.email}
          </Text>
        )}
      </View>

      <Pressable
        onPress={handleSignOut}
        style={{
          backgroundColor: Colors.surface,
          borderRadius: 12,
          paddingVertical: 14,
          alignItems: "center",
          borderWidth: 1,
          borderColor: Colors.border,
        }}
      >
        <Text
          style={{
            color: Colors.primary,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;