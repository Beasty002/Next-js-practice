# Next.js App Router - Complete Guide

## Table of Contents

- [Getting Started](#getting-started)
- [Running Your Application](#running-your-next-js-application)
- [Server vs Client Components](#server-vs-client-components)
- [Project Structure](#project-structure)
- [File-Based Routing](#file-based-routing)
- [Core Files](#core-files)
- [Creating Routes](#creating-routes)
- [Navigation](#navigation)
- [Working with Images](#working-with-images)
- [Important Notes](#important-notes)

---

## Getting Started

To create a new Next.js project, use the following command:

```bash
npx create-next-app@latest
```

This will set up your Next.js application with the App Router by default.

---

## Running Your Next.js Application

To start the development server, use the same command as in React:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`

**Other useful commands:**

```bash
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## Server vs Client Components

One of the most important concepts in Next.js is the distinction between **Server Components** and **Client Components**.

### Default Behavior

> **By default, all components in Next.js are Server Components.**

---

### Server Components

**What are Server Components?**

- Components that are rendered on the **server**
- Only the final HTML is sent to the client
- JavaScript for these components is **not** sent to the browser

**Benefits:**

- ⚡ **Faster Initial Load** - No JavaScript needs to be downloaded or executed for these components
- 🔍 **Better SEO** - Content is already rendered in HTML, making it easily crawlable by search engines
- 📦 **Smaller Bundle Size** - Component code stays on the server, reducing client-side JavaScript
- 🔒 **Secure** - Can safely use API keys and access databases directly
- 💰 **Cost Effective** - Heavy computations happen on the server

**Example:**

```tsx
// app/posts/page.tsx
// This is a Server Component by default
export default async function PostsPage() {
  // Direct API calls, no useEffect needed!
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  console.log(posts); // This logs in your TERMINAL (server-side)

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Key Features:**

- ✅ Can be `async` functions
- ✅ Can directly fetch data without `useEffect`
- ✅ Can access backend resources (databases, file system)
- ✅ Can use sensitive environment variables safely

**Limitations:**

- ❌ Cannot use React Hooks (`useState`, `useEffect`, `useContext`, etc.)
- ❌ Cannot use browser APIs (`window`, `document`, `localStorage`)
- ❌ Cannot handle user interactions (`onClick`, `onChange`, etc.)
- ❌ Cannot use browser-only libraries

---

### Client Components

**What are Client Components?**

- Components that are rendered in the **browser** (client-side)
- Work like traditional React components
- JavaScript is sent to and executed in the browser

**When to Use Client Components:**

- Need React Hooks (`useState`, `useEffect`, `useReducer`, etc.)
- Need browser interactivity (`onClick`, `onChange`, `onSubmit`, etc.)
- Need to access browser APIs (`window`, `localStorage`, `navigator`)
- Need to use browser-specific libraries

**How to Create a Client Component:**

Add `"use client"` at the **top of the file**:

```tsx
// app/components/Counter.tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  console.log("Counter rendered"); // This logs in the BROWSER CONSOLE

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Key Features:**

- ✅ Can use all React Hooks
- ✅ Can handle user interactions
- ✅ Can access browser APIs
- ✅ Can use state management

**Limitations:**

- ❌ Cannot be `async` functions
- ❌ Cannot directly access backend resources
- ❌ Increases JavaScript bundle size

---

### Testing Server vs Client Components

Use `console.log()` to identify where a component is rendered:

```tsx
// Server Component
export default function ServerComponent() {
  console.log("This appears in the TERMINAL with a timestamp");
  return <h1>Server Component</h1>;
}
```

```tsx
// Client Component
"use client";

export default function ClientComponent() {
  console.log("This appears in the BROWSER CONSOLE");
  return <h1>Client Component</h1>;
}
```

**Output Locations:**

- **Server Component logs** → Your terminal/console where you ran `npm run dev`
- **Client Component logs** → Browser DevTools console (F12)

---

### Mixing Server and Client Components

You can use Client Components inside Server Components:

```tsx
// app/page.tsx (Server Component)
import Counter from "./components/Counter"; // Client Component

export default async function HomePage() {
  // Server-side data fetching
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return (
    <div>
      <h1>Welcome</h1>
      <p>Data from server: {data.message}</p>

      {/* Client Component for interactivity */}
      <Counter />
    </div>
  );
}
```

```tsx
// app/components/Counter.tsx (Client Component)
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
  );
}
```

This approach gives you the **best of both worlds**:

- Server Components for data fetching, SEO, and performance
- Client Components for interactivity and browser features

---

### Best Practices

**Use Server Components when:**

- Fetching data from APIs or databases
- Rendering static content
- Building layouts and UI that doesn't need interactivity
- You want better SEO and faster page loads

**Use Client Components when:**

- You need user interactivity (buttons, forms, etc.)
- You need React Hooks (useState, useEffect, etc.)
- You need browser APIs (localStorage, geolocation, etc.)
- You're using third-party libraries that require browser APIs

**Strategy:**

- Keep most of your app as Server Components
- Use Client Components only where needed
- Create small, focused Client Components for interactive parts

---

### Comparison Table

| Feature                  | Server Components     | Client Components            |
| ------------------------ | --------------------- | ---------------------------- |
| **Default**              | ✅ Yes                | ❌ No (needs `"use client"`) |
| **Can be async**         | ✅ Yes                | ❌ No                        |
| **React Hooks**          | ❌ No                 | ✅ Yes                       |
| **Browser APIs**         | ❌ No                 | ✅ Yes                       |
| **Event Handlers**       | ❌ No                 | ✅ Yes                       |
| **Direct Data Fetching** | ✅ Yes                | ❌ No (use useEffect)        |
| **SEO**                  | ✅ Excellent          | ⚠️ Requires hydration        |
| **Bundle Size**          | ✅ Not sent to client | ❌ Sent to client            |
| **Console.log location** | 🖥️ Terminal           | 🌐 Browser                   |

---

## Project Structure

```
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── public/
└── package.json
```

---

## File-Based Routing

Next.js uses **file-based routing** in the `app` directory. This means:

- **Folder names** define the route structure
- **Component names** don't matter for routing
- The **file name** determines the route behavior

### Key Principle

> The name of the **folder** determines the URL path, not the component name inside the file.

---

## Core Files

### 1. `page.tsx`

- The **main entry point** for a route
- Each route must have a `page.tsx` file to be accessible
- Located at the root of each route folder

**Example:**

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the root route "/"</p>
    </div>
  );
}
```

---

### 2. `layout.tsx`

- Wraps all pages and defines the **shared UI**
- Contains the `{children}` prop where route content is rendered
- Any content you add alongside `{children}` will appear on **all pages**

**Example:**

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>Navigation Bar (appears on all pages)</nav>
        </header>
        <main>{children}</main>
        <footer>Footer (appears on all pages)</footer>
      </body>
    </html>
  );
}
```

---

## Creating Routes

### Step-by-Step Process

1. **Create a new folder** inside the `app` directory
2. **Add a `page.tsx` file** inside that folder
3. **Your route is ready!**

### Example: Creating an "About" Page

#### Step 1: Create the folder structure

```
app/
└── about/
    └── page.tsx
```

#### Step 2: Add content to `page.tsx`

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This page is accessible at "/about"</p>
    </div>
  );
}
```

#### Step 3: Access the route

Visit: `http://localhost:3000/about`

---

### Example: Nested Routes

Create a nested route like `/blog/post`:

```
app/
└── blog/
    ├── page.tsx          // /blog
    └── post/
        └── page.tsx      // /blog/post
```

```tsx
// app/blog/post/page.tsx
export default function BlogPostPage() {
  return <h1>Blog Post Page</h1>;
}
```

---

## Navigation

Use the `Link` component from `next/link` for **client-side navigation** between pages.

### Syntax

```tsx
import Link from "next/link";

<Link href="/path">Link Text</Link>;
```

### Why Use Link Instead of `<a>`?

- **Faster navigation** (no full page reload)
- **Prefetching** for better performance
- **Client-side routing**

---

### Navigation Example

```tsx
// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
```

---

### Link Component Properties

```tsx
<Link
  href="/about" // Required: destination path
  replace={false} // Optional: replace history instead of push
  scroll={true} // Optional: scroll to top after navigation
  prefetch={true} // Optional: prefetch the page in background
>
  About Us
</Link>
```

---

## Working with Images

Next.js provides an optimized `Image` component that should be used instead of the standard HTML `<img>` tag.

### Why Use the Image Component?

- **Automatic optimization** - Images are optimized on-demand
- **Faster loading** - Lazy loading by default
- **Better performance** - Automatic WebP/AVIF format conversion
- **Responsive images** - Serves different sizes based on viewport
- **Prevents layout shift** - Built-in aspect ratio handling

---

### Basic Usage

```tsx
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      <Image
        src="/profile.jpg"
        alt="Profile picture"
        width={500}
        height={500}
      />
    </div>
  );
}
```

---

### Local Images (Static Assets)

Place images in the `public` folder and reference them with a leading `/`:

```
public/
├── logo.png
├── hero.jpg
└── images/
    └── banner.png
```

```tsx
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <Image src="/logo.png" alt="Company Logo" width={200} height={100} />
      <Image src="/images/banner.png" alt="Banner" width={1200} height={400} />
    </div>
  );
}
```

---

### External Images (Remote URLs)

To use images from external URLs, you **must configure the allowed domains** in `next.config.js`:

#### Step 1: Configure `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
```

#### Step 2: Use the External Image

```tsx
import Image from "next/image";

export default function GalleryPage() {
  return (
    <div>
      <Image
        src="https://images.unsplash.com/photo-123456789"
        alt="Beautiful landscape"
        width={800}
        height={600}
      />
    </div>
  );
}
```

---

### Image Component Properties

```tsx
<Image
  src="/path/to/image.jpg" // Required: image path
  alt="Description" // Required: accessibility text
  width={500} // Required: image width in pixels
  height={300} // Required: image height in pixels
  priority={false} // Optional: load image immediately (for above-the-fold images)
  quality={75} // Optional: image quality (1-100)
  fill={false} // Optional: fill parent container (removes width/height requirement)
  sizes="100vw" // Optional: responsive sizes
  placeholder="blur" // Optional: blur placeholder while loading
  blurDataURL="/placeholder.jpg" // Optional: custom blur placeholder
/>
```

---

### Fill Container Example

When you want an image to fill its parent container:

```tsx
import Image from "next/image";

export default function HeroSection() {
  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <Image
        src="/hero-bg.jpg"
        alt="Hero background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}
```

---

### Priority Images

Use `priority` for images that are above the fold (visible without scrolling):

```tsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // This image loads immediately
/>
```

---

### Common Configuration Examples

#### Multiple External Domains

```js
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com", // Wildcard for subdomains
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
```

#### Specific Path Patterns

```js
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/images/**", // Only allow images from /images/ path
      },
    ],
  },
};

module.exports = nextConfig;
```

---

## Important Notes

### ✅ DO:

- Use **folder names** to define routes
- Always create a `page.tsx` file for each route
- Use the `Link` component for navigation
- Keep route folders inside the `app` directory
- Use the `Image` component instead of `<img>` tag
- Configure `remotePatterns` in `next.config.js` for external images
- Add `alt` text to all images for accessibility
- **Use Server Components by default** for better performance
- Add `"use client"` only when you need interactivity or browser APIs
- Use `console.log()` to test if a component is server or client-side
- Make Server Components `async` for direct data fetching

### ❌ DON'T:

- Don't rely on component names for routing
- Don't use `<a>` tags for internal navigation (use `Link` instead)
- Don't use `<img>` tag (use `Image` component instead)
- Don't forget to create `page.tsx` - folders without it won't be accessible routes
- Don't use external images without configuring the hostname
- Don't forget `width` and `height` props (unless using `fill`)
- **Don't use `"use client"` everywhere** - most components should be Server Components
- Don't try to use React Hooks in Server Components
- Don't try to handle `onClick` events in Server Components
- Don't use `useEffect` for data fetching in Server Components (use `async`/`await` instead)

---

## Quick Reference

| File Name       | Purpose                      | Required                    |
| --------------- | ---------------------------- | --------------------------- |
| `page.tsx`      | Defines the UI for a route   | Yes (for accessible routes) |
| `layout.tsx`    | Shared UI wrapper for routes | Yes (at root level)         |
| `loading.tsx`   | Loading state UI             | No                          |
| `error.tsx`     | Error handling UI            | No                          |
| `not-found.tsx` | 404 page                     | No                          |

---

## Example Project Structure

```
app/
├── layout.tsx              // Root layout (required)
├── page.tsx                // Home page → "/"
├── about/
│   └── page.tsx            // About page → "/about"
├── blog/
│   ├── page.tsx            // Blog index → "/blog"
│   └── [slug]/
│       └── page.tsx        // Dynamic route → "/blog/my-post"
└── dashboard/
    ├── layout.tsx          // Nested layout
    ├── page.tsx            // Dashboard → "/dashboard"
    └── settings/
        └── page.tsx        // Settings → "/dashboard/settings"
```

---

## Additional Resources

- [Next.js Official Docs - App Router](https://nextjs.org/docs/app)
- [Next.js Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing)
- [Link Component API](https://nextjs.org/docs/app/api-reference/components/link)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [next.config.js Options](https://nextjs.org/docs/app/api-reference/next-config-js)

---

**Happy Routing! 🚀**
