# Next.js App Router - Complete Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [File-Based Routing](#file-based-routing)
- [Core Files](#core-files)
- [Creating Routes](#creating-routes)
- [Navigation](#navigation)
- [Important Notes](#important-notes)

---

## Getting Started

To create a new Next.js project, use the following command:

```bash
npx create-next-app@latest
```

This will set up your Next.js application with the App Router by default.

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
import Link from 'next/link';

<Link href="/path">Link Text</Link>
```

### Why Use Link Instead of `<a>`?
- **Faster navigation** (no full page reload)
- **Prefetching** for better performance
- **Client-side routing**

---

### Navigation Example

```tsx
// app/page.tsx
import Link from 'next/link';

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
  href="/about"           // Required: destination path
  replace={false}         // Optional: replace history instead of push
  scroll={true}           // Optional: scroll to top after navigation
  prefetch={true}         // Optional: prefetch the page in background
>
  About Us
</Link>
```

---

## Important Notes

### ✅ DO:
- Use **folder names** to define routes
- Always create a `page.tsx` file for each route
- Use the `Link` component for navigation
- Keep route folders inside the `app` directory

### ❌ DON'T:
- Don't rely on component names for routing
- Don't use `<a>` tags for internal navigation (use `Link` instead)
- Don't forget to create `page.tsx` - folders without it won't be accessible routes

---

## Quick Reference

| File Name | Purpose | Required |
|-----------|---------|----------|
| `page.tsx` | Defines the UI for a route | Yes (for accessible routes) |
| `layout.tsx` | Shared UI wrapper for routes | Yes (at root level) |
| `loading.tsx` | Loading state UI | No |
| `error.tsx` | Error handling UI | No |
| `not-found.tsx` | 404 page | No |

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

---

**Happy Routing! 🚀**