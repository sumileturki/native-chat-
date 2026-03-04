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
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/contexts/auth-context";

const SignUpScreen = () => {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (loading) return;

    setError(null);
    setLoading(true);

    const message = await signUp(name.trim(), email.trim(), password);

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
              Create Account
            </Text>

            <Text
              style={{
                color: Colors.textSecondary,
                fontSize: 15,
                marginTop: 6,
              }}
            >
              Sign up to start chatting
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
            Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={Colors.textMuted}
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
            onPress={handleSignUp}
            disabled={loading}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 12,
              paddingVertical: 15,
              alignItems: "center",
              opacity: loading ? 0.8 : 1,
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
                Sign Up
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
            <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>
              Already have an account?{" "}
            </Text>

            <Link href="/(auth)/sign-in" asChild>
              <Pressable>
                <Text
                  style={{
                    color: Colors.primaryLight,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Sign In
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});

