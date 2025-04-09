# Advanced React Patterns

This guide covers advanced React patterns that help create more flexible, reusable components.

## 1. Function as Children Pattern

The Function as Children pattern (also known as "render prop pattern" with children) uses a function as the `children` prop instead of React elements. This pattern enables greater component flexibility by allowing the parent component to determine what to render while the child component controls how it's rendered.

### Basic Implementation

```tsx
// components/DataFetcher.tsx
import { useState, useEffect, ReactNode } from 'react';

interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => ReactNode;
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [url]);

  return <>{children(data, loading, error)}</>;
}
```

### Usage Example

```tsx
// pages/UsersPage.tsx
import { DataFetcher } from '@/components/DataFetcher';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      
      <DataFetcher<User[]> url="/api/users">
        {(data, loading, error) => {
          if (loading) return <div>Loading users...</div>;
          if (error) return <div>Error: {error.message}</div>;
          if (!data || data.length === 0) return <div>No users found</div>;
          
          return (
            <ul className="space-y-2">
              {data.map(user => (
                <li key={user.id} className="p-4 border rounded">
                  <h2 className="font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </li>
              ))}
            </ul>
          );
        }}
      </DataFetcher>
    </div>
  );
}
```

### Benefits of Function as Children Pattern

1. **Separation of concerns**
   - The container component manages the data fetching logic
   - The consumer controls how the data is rendered

2. **Reusability**
   - The same container can be used with different rendering logic
   - The container can be used across multiple components

3. **Composability**
   - Components can be easily composed together
   - Complex UIs can be built from simpler components

4. **Flexibility**
   - The consumer has complete control over rendering
   - The container doesn't need to know what will be rendered

## 2. Render Props Pattern

The Render Props pattern is similar to Function as Children, but passes the function as a regular prop (typically named `render`) instead of using the `children` prop.

### Basic Implementation

```tsx
// components/MouseTracker.tsx
import { useState, useEffect, ReactNode } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (position: MousePosition) => ReactNode;
}

export function MouseTracker({ render }: MouseTrackerProps) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <>{render(position)}</>;
}
```

### Usage Example

```tsx
// components/MouseIndicator.tsx
import { MouseTracker } from './MouseTracker';

export function MouseIndicator() {
  return (
    <div className="relative h-64 border rounded p-4 overflow-hidden">
      <h2 className="mb-2 font-bold">Mouse Position Tracker</h2>
      
      <MouseTracker
        render={({ x, y }) => (
          <>
            <div 
              className="absolute bg-blue-500 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-50"
              style={{ left: x, top: y }}
            />
            
            <div className="absolute bottom-4 right-4 bg-white p-2 border rounded shadow">
              X: {x}, Y: {y}
            </div>
          </>
        )}
      />
    </div>
  );
}
```

### Multiple Render Props

You can provide multiple render props for different parts of a component:

```tsx
// components/CollapsibleSection.tsx
import { useState, ReactNode } from 'react';

interface CollapsibleSectionProps {
  renderHeader: (isOpen: boolean, toggle: () => void) => ReactNode;
  renderContent: (isOpen: boolean) => ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  renderHeader,
  renderContent,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const toggle = () => setIsOpen(prev => !prev);
  
  return (
    <div className="border rounded overflow-hidden">
      <div className="bg-gray-50 p-4">
        {renderHeader(isOpen, toggle)}
      </div>
      
      {isOpen && (
        <div className="p-4 border-t">
          {renderContent(isOpen)}
        </div>
      )}
    </div>
  );
}
```

### Usage Example for Multiple Render Props

```tsx
// components/FAQ.tsx
import { CollapsibleSection } from './CollapsibleSection';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <CollapsibleSection
          key={index}
          renderHeader={(isOpen, toggle) => (
            <button 
              onClick={toggle}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="font-medium">{item.question}</span>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
          renderContent={() => (
            <p className="text-gray-700">{item.answer}</p>
          )}
        />
      ))}
    </div>
  );
}
```

## When to Use These Patterns

### Function as Children
- When you want to make a container component that doesn't care what it renders
- When the child component needs access to data that the parent has
- When you want to avoid prop drilling

### Render Props
- When you need multiple render functions
- When you want to name the props descriptively
- When you want to make the component API clearer

## Benefits of Both Patterns

1. **Code Reusability**: Share code between components without duplication
2. **Inversion of Control**: The consumer decides what to render, not the provider
3. **Encapsulation**: Internal state/logic stays within the provider component
4. **Composability**: Easy to compose and nest with other components
5. **Testability**: Easier to test components in isolation

## Performance Considerations

When using Function as Children or Render Props, be aware that the function will be called on every render. To optimize performance:

1. **Memoize complex render functions** with `useCallback`
2. **Use memoization** for expensive child components with `React.memo`
3. **Consider using React Context** for very deep component trees

```tsx
// Optimized example with useCallback
import { useCallback } from 'react';
import { MouseTracker } from './MouseTracker';

export function OptimizedMouseIndicator() {
  const renderMouse = useCallback(({ x, y }) => (
    <>
      <div 
        className="absolute bg-blue-500 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-50"
        style={{ left: x, top: y }}
      />
      
      <div className="absolute bottom-4 right-4 bg-white p-2 border rounded shadow">
        X: {x}, Y: {y}
      </div>
    </>
  ), []);

  return (
    <div className="relative h-64 border rounded p-4 overflow-hidden">
      <h2 className="mb-2 font-bold">Mouse Position Tracker</h2>
      <MouseTracker render={renderMouse} />
    </div>
  );
}
``` 