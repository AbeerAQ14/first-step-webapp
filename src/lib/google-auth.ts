import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/api";
import { toast } from "sonner";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

let isInitialized = false;

export const initializeGoogleAuth = () => {
  if (typeof window === "undefined") return;
  if (isInitialized) return;

  // Check if Google script is loaded
  if (!window.google?.accounts?.id) {
    // If not loaded, wait for it
    const checkGoogleLoaded = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(checkGoogleLoaded);
        initializeGoogle();
      }
    }, 100);

    // Clear interval after 10 seconds to prevent infinite checking
    setTimeout(() => clearInterval(checkGoogleLoaded), 10000);
  } else {
    initializeGoogle();
  }
};

const initializeGoogle = () => {
  if (!window.google?.accounts?.id) return;

  window.google.accounts.id.initialize({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    callback: handleGoogleSignIn,
  });
  isInitialized = true;
};

const handleGoogleSignIn = async (response: { credential: string }) => {
  try {
    // Send the token to your backend
    const result = await authService.googleSignIn(response.credential);

    // Update auth store with the response
    useAuthStore.setState({
      token: result.token,
      user: result.user,
    });

    // Redirect based on user role
    let dashboardPath = "/dashboard/center";
    if (result.user.role === "parent") {
      dashboardPath = "/dashboard/parent";
    } else if (result.user.role === "admin") {
      dashboardPath = "/dashboard/admin";
    }

    window.location.href = dashboardPath;
  } catch (error: any) {
    console.error("Google sign-in failed:", error);
    toast(error.message || "Failed to sign in with Google. Please try again.");
  }
};

export const triggerGoogleSignIn = () => {
  if (typeof window === "undefined") return;
  if (!window.google?.accounts?.id) {
    toast.error("Google Sign-In is not available. Please try again later.");
    return;
  }

  window.google.accounts.id.prompt();
};
