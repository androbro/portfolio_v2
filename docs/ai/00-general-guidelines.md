# General Guidelines for AI Coding

## Project Structure
- Follow Next.js 13+ App Router conventions
- Keep components modular and reusable
- Use named exports for components
- Place shared components in `components/` directory
- Place page-specific components in their respective page directories

## Code Style
- Use TypeScript for type safety
- Use tabs for indentation (2 spaces per tab)
- Use double quotes for strings
- Use template literals for string interpolation
- Keep JSX template literals on a single line
- Follow semantic HTML practices
- Use Biome for formatting

## Naming Conventions
- Use PascalCase for component names
- Use camelCase for variables, functions, and instances
- Use snake_case for API routes
- Use lowercase-with-hyphens for file names
- Prefix hooks with `use`
- Prefix context providers with `*Provider`
- Prefix event handlers with `handle` or `on`

## Imports
- Group imports by:
  1. React and Next.js imports
  2. Third-party libraries
  3. Components
  4. Hooks
  5. Utils
  6. Types
  7. Assets
- Sort imports alphabetically within groups
- Use absolute imports for project files

## Component Structure
```tsx
// 1. Imports (grouped as specified above)
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/utils/date";
import type { User } from "@/types";

// 2. Types
interface ComponentProps {
  user: User;
  isActive?: boolean;
}

// 3. Component definition
export function Component({ user, isActive = false }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState(false);
  const { userData } = useUser();
  
  // 5. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 6. Handlers
  const handleClick = () => {
    setState(!state);
  };
  
  // 7. Derived state/values
  const displayName = user.name || "Anonymous";
  
  // 8. Render
  return (
    <div className="p-4 rounded-lg">
      <h2>{displayName}</h2>
      <Button onClick={handleClick}>Toggle</Button>
    </div>
  );
}
```

## Performance Optimizations
- Use `useMemo` for expensive calculations
- Use `useCallback` for handlers passed to child components
- Implement proper dependency arrays in hooks
- Avoid unnecessary re-renders
- Use Next.js Image component for images
- Implement code splitting for large components 