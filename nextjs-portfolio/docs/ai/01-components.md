# Component Guidelines

## Component Directory Structure

Following the component-centric file layout approach, each component should have its own directory with all related files:

```
components/
    └── Button/
        ├── __tests__/
        │   └── Button.test.tsx
        ├── Button.tsx
        ├── styles.ts      # For CSS-in-JS styling
        └── index.ts       # Export file
```

### Benefits of Component-Centric File Layout

- **Self-contained**: All files related to a component are in one place
- **Easy to extract**: Components can be easily moved to shared libraries
- **Simple imports**: Using index.ts allows for clean imports

### Index.ts Export File

To simplify imports, create an index.ts file that exports the component:

```typescript
// components/Button/index.ts
export { Button } from './Button';
```

This allows importing from the directory instead of the specific file:

```typescript
// Instead of:
import { Button } from 'components/Button/Button';

// You can use:
import { Button } from 'components/Button';
```

## Component Types

### UI Components
- Simple, reusable UI elements
- Should be stateless when possible
- Accept props for customization
- Located in `components/ui/`
- Examples: Button, Card, Input

```tsx
// components/ui/Button/Button.tsx
import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### Layout Components
- Structure the page layout
- Examples: Header, Footer, Sidebar, Layout
- Located in `components/layout/`

```tsx
// components/layout/Header.tsx
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Navigation } from "@/components/Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
```

### Feature Components
- Implement specific features or business logic
- May contain state and side effects
- Located in feature-specific directories
- Examples: ProjectCard, UserProfile, CommentSection

```tsx
// components/projects/ProjectCard.tsx
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/utils/date";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onEdit?: (id: string) => void;
}

export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      {project.image && (
        <div className="relative h-40 w-full">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="pt-4">
        <p className={isExpanded ? "" : "line-clamp-2"}>
          {project.description}
        </p>
        {project.description.length > 120 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleToggleExpand}
          >
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          {formatDate(project.createdAt)}
        </span>
        {onEdit && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(project.id)}
          >
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
```

## Component Best Practices

1. **Keep components focused**
   - Each component should do one thing well
   - Split large components into smaller ones

2. **Use composition over inheritance**
   - Prefer component composition to share code between components
   - Use the children prop for flexible content insertion

3. **Props handling**
   - Provide default values for optional props
   - Use destructuring to access props
   - Define prop types with TypeScript interfaces/types
   - Use sensible prop names that clearly indicate purpose

4. **State management**
   - Keep state as local as possible
   - Lift state up only when necessary
   - Use context for deeply nested component trees
   - Consider using state management libraries only when needed

5. **Styling**
   - Use Tailwind CSS for styling
   - Use `cn()` utility for conditional class merging
   - Keep styles within the component file
   - Use CSS variables for theming 