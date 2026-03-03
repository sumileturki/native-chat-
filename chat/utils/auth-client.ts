// eslint-disable-next-line import/no-unresolved
import { createAuthClient } from "better-auth/client";
// eslint-disable-next-line import/no-unresolved
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "http://10.12.73.248:3000", 
    plugins: [
        expoClient({
            scheme: "chat",
            storagePrefix: "chat",
            storage: SecureStore,
        })
    ]
});