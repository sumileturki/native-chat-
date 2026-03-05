import { NotificationBanner, NotificationData } from "@/components/NotificationBanner";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { notificationService, setupAndroidNotificationChannels, setupNotificationCategories } from "@/services/notification.service";
import { queryClient } from "@/utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function RootLayout(){
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        
      <Layout/>

      </QueryClientProvider>
    </AuthProvider>
  )
}

 function Layout() {
  const {user , isLoading} = useAuth();
  const isLoggedIn = !!user;
  const notificationListener = useRef<(() => void) | null>(null);
  const [currentNotification, setCurrentNotification] = useState<NotificationData | null>(null);
const router = useRouter()
  useEffect(()=>{
    setupNotificationCategories(),
    setupAndroidNotificationChannels()
  },[])

  

   

  return (
    <>
      
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
         <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
    </>
  );
}