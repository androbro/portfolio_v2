# Project Examples

This document contains complete examples of common features you'll need to implement. Reference these examples when building similar functionality.

## Table of Contents
- [Authentication System](#authentication-system)
- [Contact Form](#contact-form)
- [Dark Mode Toggle](#dark-mode-toggle)
- [Project Filter](#project-filter)
- [Blog with MDX](#blog-with-mdx)

## Authentication System

Complete implementation of a simple auth system with NextAuth.js:

### 1. Install Dependencies

```bash
npm install next-auth
```

### 2. Setup API Route

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { db } from "@/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  }
});

export { handler as GET, handler as POST };
```

### 3. Create Auth Provider

```tsx
// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

### 4. Setup Root Layout

```tsx
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 5. Create Login Form

```tsx
// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
```

### 6. Create Protected Routes

```tsx
// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                      req.nextUrl.pathname.startsWith("/register");
                      
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
  
  // Allow access to auth API routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }
  
  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  
  // Redirect unauthenticated users to login page if they try to access protected routes
  if (!isAuthenticated && !isAuthPage && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/api/auth/:path*"],
};
```

## Contact Form

A complete contact form implementation with form validation and API endpoint:

### 1. Create Contact Form Component

```tsx
// components/ContactForm.tsx
"use client";

import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus("submitting");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset form status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {status === "success" && (
        <div className="bg-green-50 text-green-700 p-3 rounded mb-4">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
      
      {status === "error" && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
          There was an error sending your message. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
```

### 2. Create API Route for Contact Form

```tsx
// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate form data
    const { name, email, message } = contactSchema.parse(body);
    
    // Create a test account or use actual email credentials
    // For production, use environment variables for credentials
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Send email
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
    
    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid form data", errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
```

## Dark Mode Toggle

A complete implementation of dark mode with theme persistence:

### 1. Create Theme Provider

```tsx
// app/providers/theme-provider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(defaultTheme);
    }
  }, [defaultTheme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem("theme", theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};
```

### 2. Add Theme Provider to Root Layout

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "./providers/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

// In app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 3. Create Theme Toggle Component

```tsx
// components/ThemeToggle.tsx
"use client";

import { useTheme } from "@/app/providers/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 bg-background border"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
```

## Project Filter

A complete implementation of a project filter component:

```tsx
// components/projects/ProjectFilter.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface ProjectFilterProps {
  categories: string[];
  technologies: string[];
}

export function ProjectFilter({ categories, technologies }: ProjectFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedTech, setSelectedTech] = useState(
    searchParams.get("tech") || ""
  );
  
  const updateFilters = (
    category: string | null = selectedCategory,
    tech: string | null = selectedTech
  ) => {
    const params = new URLSearchParams(searchParams);
    
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    
    if (tech) {
      params.set("tech", tech);
    } else {
      params.delete("tech");
    }
    
    router.push(`/projects?${params.toString()}`);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category || "");
    updateFilters(category || null, selectedTech);
  };
  
  const handleTechChange = (tech: string) => {
    setSelectedTech(tech || "");
    updateFilters(selectedCategory, tech || null);
  };
  
  const handleReset = () => {
    setSelectedCategory("");
    setSelectedTech("");
    router.push("/projects");
  };
  
  return (
    <div className="mb-8 space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={!selectedCategory ? "default" : "outline"}
            onClick={() => handleCategoryChange("")}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={!selectedTech ? "default" : "outline"}
            onClick={() => handleTechChange("")}
          >
            All
          </Button>
          {technologies.map((tech) => (
            <Button
              key={tech}
              size="sm"
              variant={selectedTech === tech ? "default" : "outline"}
              onClick={() => handleTechChange(tech)}
            >
              {tech}
            </Button>
          ))}
        </div>
      </div>
      
      {(selectedCategory || selectedTech) && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="mt-2"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
```

## Blog with MDX

A complete implementation of a blog using MDX and contentlayer:

### 1. Install Dependencies

```bash
npm install contentlayer next-contentlayer date-fns
```

### 2. Configure Contentlayer

```ts
// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format } from "date-fns";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    excerpt: { type: "string", required: true },
    image: { type: "string", required: false },
    author: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    formattedDate: {
      type: "string",
      resolve: (post) => format(new Date(post.date), "MMMM dd, yyyy"),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
});
```

### 3. Update Next.js Config

```js
// next.config.js
const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = withContentlayer(nextConfig);
```

### 4. Create Blog Page

```tsx
// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export const metadata = {
  title: "Blog",
  description: "Read my latest articles and thoughts.",
};

export default function BlogPage() {
  const posts = allPosts.sort((a, b) => 
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-lg overflow-hidden border">
            {post.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">
                {post.formattedDate}
              </p>
              
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### 5. Create Blog Post Page

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/MDXContent";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = allPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.image
      ? {
          images: [{ url: post.image }],
        }
      : undefined,
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="container max-w-3xl py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600">
          {post.formattedDate} • By {post.author}
        </p>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <MDXContent code={post.body.code} />
      </div>
    </article>
  );
}
```

### 6. Create MDX Component

```tsx
// components/MDXContent.tsx
"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";

const components = {
  Image,
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
      );
    }
    
    return href ? <Link href={href} {...props} /> : <a {...props} />;
  },
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const MDXComponent = useMDXComponent(code);
  
  return <MDXComponent components={components} />;
}
``` 