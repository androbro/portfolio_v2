# Hooks Guidelines

## Custom Hook Structure

Custom hooks are a powerful pattern for extracting and reusing stateful logic between components. They help follow the principle of separation of concerns and keep your components lean and focused on rendering.

Custom hooks should:
- Start with `use` prefix (essential for React's rules of hooks)
- Be placed in `hooks/` directory
- Export as named exports
- Handle a single concern
- Have descriptive names

### Basic Custom Hook Structure

```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Ensure consistent behavior during SSR
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });
  
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
}
```

### SitePoint's Custom Hook Pattern

Following the SitePoint article, we can use custom hooks to provide context-aware functionality, such as requiring authentication:

```tsx
// hooks/useRequireAuth.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function useRequireAuth(redirectUrl = "/login") {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "loading") return; // Don't do anything while loading
    
    if (!session) {
      // Redirect to login page if not authenticated
      router.push(redirectUrl);
    }
  }, [session, status, router, redirectUrl]);
  
  return { session, isLoading: status === "loading" };
}
```

Usage example:

```tsx
// app/dashboard/page.tsx
"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function DashboardPage() {
  const { session, isLoading } = useRequireAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name}!</p>
      {/* Rest of dashboard content */}
    </div>
  );
}
```

## Common Custom Hooks

### State Hooks

Hooks that manage specific types of state:

```tsx
// hooks/useToggle.ts
import { useState, useCallback } from "react";

export function useToggle(initialState = false): [boolean, () => void] {
  const [state, setState] = useState(initialState);
  
  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);
  
  return [state, toggle];
}
```

### Data Fetching Hooks

Hooks for data fetching and management:

```tsx
// hooks/useFetch.ts
import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });
  
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    
    setState({ data: null, isLoading: true, error: null });
    
    async function fetchData() {
      try {
        const response = await fetch(url, { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!signal.aborted) {
          setState({ data, isLoading: false, error: null });
        }
      } catch (error) {
        if (!signal.aborted) {
          setState({ 
            data: null, 
            isLoading: false, 
            error: error instanceof Error ? error : new Error(String(error))
          });
        }
      }
    }
    
    fetchData();
    
    return () => {
      abortController.abort();
    };
  }, [url]);
  
  return state;
}
```

### UI Hooks

Hooks for UI interactions:

```tsx
// hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    
    const mediaQuery = window.matchMedia(query);
    
    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };
    
    // Set initial value
    updateMatches();
    
    // Listen for changes
    mediaQuery.addEventListener("change", updateMatches);
    
    return () => {
      mediaQuery.removeEventListener("change", updateMatches);
    };
  }, [query]);
  
  return matches;
}
```

### Auth Hooks (Context-Aware)

As shown in the SitePoint article, hooks can encapsulate complex logic like authentication:

```tsx
// hooks/useAuth.ts
import { useState, useEffect, useContext, createContext } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch the session when the component mounts
    fetch("/api/auth/session")
      .then(res => res.json())
      .then(data => {
        if (data.session) {
          setSession(data.session);
        } else {
          setSession(null);
        }
      })
      .catch(error => {
        console.error("Failed to fetch session:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      // Refresh session data
      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();
      setSession(sessionData.session);
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut({ redirect: false });
      setSession(null);
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
```

## Hook Best Practices

1. **Follow the Rules of Hooks**
   - Only call hooks at the top level of components or other hooks
   - Only call hooks from React function components or custom hooks
   - Ensure consistent ordering of hook calls

2. **Handle Side Effects**
   - Use `useEffect` for side effects
   - Clean up side effects by returning a function
   - Specify dependencies accurately

3. **Performance Optimization**
   - Use `useMemo` for expensive calculations
   - Use `useCallback` for functions passed as props
   - Be mindful of dependency arrays
   - Consider using `useRef` for values that shouldn't trigger re-renders

4. **Error Handling**
   - Implement error handling in hooks
   - Provide meaningful error messages
   - Consider using error boundaries for component-level errors

5. **Testing**
   - Write tests for custom hooks using `@testing-library/react-hooks`
   - Test all possible states
   - Test edge cases 