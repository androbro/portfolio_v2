# Next.js App Router Guidelines

## Folder Structure

```
app/
├── api/                     # API routes
│   └── route.ts             # API endpoint
├── (auth)/                  # Group for auth pages
│   ├── login/               # Login page
│   └── register/            # Register page
├── projects/                # Projects section  
│   ├── [slug]/              # Dynamic route
│   │   └── page.tsx         # Project detail page
│   └── page.tsx             # Projects listing page
├── components/              # Shared components
│   ├── ui/                  # UI components
│   └── layout/              # Layout components
├── lib/                     # Utility functions
│   └── utils.ts             # Helper functions
├── hooks/                   # Custom React hooks  
├── styles/                  # Global styles
├── globals.css              # Global CSS
├── layout.tsx               # Root layout
└── page.tsx                 # Homepage
```

## Pages and Layouts

### Page Component

A page component renders a UI for a specific route:

```tsx
// app/page.tsx
import { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Portfolio showcasing my work and projects",
};

export default async function HomePage() {
  // This is a Server Component by default
  const projects = await getProjects({ featured: true });
  
  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Portfolio</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
        <ProjectGrid projects={projects} />
      </section>
    </main>
  );
}
```

### Layout Component

A layout component wraps pages and persists across navigations:

```tsx
// app/layout.tsx
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Portfolio",
    default: "Portfolio",
  },
  description: "My personal portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
```

### Dynamic Routes

For dynamic routes, use folder names with square brackets:

```tsx
// app/projects/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getProject, getProjectSlugs } from "@/lib/api";

// Generate metadata for each project
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const project = await getProject(params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }
  
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: [{ url: project.image }],
    },
  };
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ProjectPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = await getProject(params.slug);
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetail project={project} />;
}
```

## API Routes

API routes are created using the Route Handler pattern:

```tsx
// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/projects";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured") === "true";
  
  const projects = await getAllProjects({ category, featured });
  
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Handle project creation (with proper authentication)
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
```

## Error Handling

Create custom error pages for different scenarios:

```tsx
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-xl mb-8">The page you're looking for doesn't exist.</p>
      <Link 
        href="/"
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  );
}
```

For error boundaries:

```tsx
// app/error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-xl mb-8">
        {error.message || "An unexpected error occurred"}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

## Loading States

Add loading UI with loading.tsx files:

```tsx
// app/projects/loading.tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <div className="container py-12">
      <Skeleton className="h-12 w-64 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
```

## Client vs Server Components

### Server Components (Default)

- Fetch data directly
- Access backend resources
- Keep sensitive information on the server
- Reduce client-side JavaScript

```tsx
// app/projects/page.tsx (Server Component)
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { getProjects } from "@/lib/api";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // Direct data fetching - no useEffect or useState needed
  const projects = await getProjects({ 
    category: searchParams.category 
  });
  
  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <ProjectGrid projects={projects} />
    </main>
  );
}
```

### Client Components

- Add interactivity and event listeners
- Use React hooks
- Use browser APIs

```tsx
// components/projects/ProjectFilter.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface ProjectFilterProps {
  categories: string[];
}

export function ProjectFilter({ categories }: ProjectFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    
    router.push(`/projects?${params.toString()}`);
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === "" ? "default" : "outline"}
        onClick={() => handleCategoryChange("")}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => handleCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
```

## Best Practices

1. **Use Server Components by default**
   - Only use Client Components when you need interactivity
   - Move client functionality to leaf components

2. **Optimize data fetching**
   - Fetch data in Server Components when possible
   - Use React Query for client-side data fetching
   - Implement proper caching strategies

3. **Metadata**
   - Provide proper metadata for all pages
   - Use dynamic metadata for dynamic routes
   - Include OpenGraph tags for social sharing

4. **Error handling**
   - Implement proper error boundaries
   - Create custom error pages
   - Handle edge cases gracefully

5. **Loading states**
   - Add loading.tsx files for route segments
   - Use skeleton components for a better user experience
   - Implement streaming where appropriate

6. **Routing**
   - Use Next.js Link component for client-side navigation
   - Implement route groups for organization
   - Use dynamic routes for content-based pages 