import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/contexts/auth-context";

const SignInScreen = () => {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleSignIn = async () => {
    if (loading) return;

    setError(null);
    setLoading(true);

    const message = await signIn(email.trim(), password);

    setLoading(false);

    if (message) {
      setError(message);
      return;
    }
    // On success, AuthProvider updates and RootNavigator
    // will redirect from (auth) to (tabs) automatically.
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 24,
          }}
          keyboardShouldPersistTaps="always"
        >
          <View style={{ alignItems: "center", marginBottom: 48 }}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                backgroundColor: Colors.primary,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons name="chatbubbles" size={36} color="#fff" />
            </View>

            <Text
              style={{
                color: Colors.textPrimary,
                fontSize: 28,
                fontWeight: "700",
              }}
            >
              Welcome Back
            </Text>

            <Text
              style={{
                color: Colors.textSecondary,
                fontSize: 15,
                marginTop: 6,
              }}
            >
              Sign in to continue chatting
            </Text>
          </View>

          <Text
            style={{
              color: Colors.textSecondary,
              fontSize: 13,
              fontWeight: "600",
              marginBottom: 6,
              marginLeft: 4,
            }}
          >
            Email
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              backgroundColor: Colors.card,
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              color: Colors.textPrimary,
              fontSize: 15,
              marginBottom: 16,
            }}
          />

          <Text
            style={{
              color: Colors.textSecondary,
              fontSize: 13,
              fontWeight: "600",
              marginBottom: 6,
              marginLeft: 4,
            }}
          >
            Password
          </Text>

          <View style={{ position: "relative", marginBottom: 24 }}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={secureText}
              style={{
                backgroundColor: Colors.card,
                borderWidth: 1,
                borderColor: Colors.border,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                paddingRight: 48,
                color: Colors.textPrimary,
                fontSize: 15,
              }}
            />

            <Pressable
              onPress={() => setSecureText(!secureText)}
              style={{
                position: "absolute",
                right: 12,
                top: 0,
                bottom: 0,
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={secureText ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={Colors.textMuted}
              />
            </Pressable>
          </View>

          <Pressable
            onPress={handleSignIn}
            disabled={loading}
            style={{
              backgroundColor: Colors.primary,
              opacity: loading ? 0.8 : 1,
              borderRadius: 12,
              paddingVertical: 15,
              alignItems: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                Sign In
              </Text>
            )}
          </Pressable>

          {error && (
            <Text
              style={{
                color: "red",
                fontSize: 13,
                marginTop: 12,
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            <Link href="/(auth)/sign-up" asChild>
              <Pressable>
                <Text
                  style={{
                    color: Colors.primaryLight,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
