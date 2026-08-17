# Next.js Website Engineering Standards

## AI Agent Development Guidelines

**Version:** 1.0
**Target:** Modern Next.js App Router applications
**Primary goal:** Build websites that are scalable, maintainable, accessible, performant, secure, SEO-friendly, and easy for both humans and AI agents to understand.

---

# 1. AI AGENT MASTER RULES

You are an expert senior frontend engineer working on a production-grade Next.js application.

Before writing code, understand the existing architecture and follow these rules.

## 1.1 Non-negotiable principles

* Use **Next.js App Router** for new applications.
* Use **TypeScript**.
* Prefer **Server Components by default**.
* Use Client Components only when client-side interactivity is actually required.
* Keep `"use client"` boundaries as small as possible.
* Keep business logic out of UI components.
* Keep database access and secrets on the server.
* Do not expose server-only code to the client.
* Prefer feature-oriented architecture over giant global folders.
* Reuse existing components before creating new ones.
* Do not duplicate logic.
* Do not create abstractions without a real reuse case.
* Keep components small and focused.
* Prefer composition over deeply configurable components.
* Use semantic HTML.
* Build accessible interfaces by default.
* Optimize images, fonts, JavaScript, and network requests.
* Treat SEO as a first-class requirement.
* Handle loading, error, empty, and not-found states.
* Validate user input on the server.
* Never trust client-side authorization.
* Never hardcode secrets.
* Never silently swallow errors.
* Never introduce a dependency when the platform or existing project already provides the required functionality.
* Do not modify unrelated files while implementing a feature.
* Do not rewrite working architecture unnecessarily.
* Do not create files merely to satisfy an arbitrary folder structure.
* Before finishing, run type checking, linting, tests, and production build where available.

---

# 2. ARCHITECTURAL PHILOSOPHY

The application should follow this dependency direction:

```text
UI
 ↓
Features
 ↓
Application / Use Cases
 ↓
Domain
 ↓
Infrastructure
```

A simpler website may collapse some layers, but dependencies should still flow in this direction.

## Recommended responsibility model

### UI

Responsible for:

* Rendering
* Layout
* Interaction
* Accessibility
* Visual states
* User input

Should NOT contain:

* Database queries
* Authentication decisions
* Complex business rules
* API secrets
* Large data transformation pipelines

### Features

Responsible for:

* Feature-specific UI
* Feature-specific hooks
* Feature-specific actions
* Feature-specific validation
* Feature-specific business workflows

Examples:

```text
authentication
checkout
products
blog
dashboard
profile
search
notifications
```

### Application

Responsible for:

* Use cases
* Orchestration
* Business workflows
* Server actions
* Service coordination

### Domain

Responsible for:

* Business entities
* Types
* Domain rules
* Pure business logic

### Infrastructure

Responsible for:

* Database
* External APIs
* Email providers
* Storage
* Payment providers
* Analytics integrations

---

# 3. RECOMMENDED PROJECT STRUCTURE

For a serious scalable website, prefer:

```text
project/
│
├── src/
│   │
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (app)/
│   │   │   ├── layout.tsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   └── health/
│   │   │       └── route.ts
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── global-error.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   └── feedback/
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── actions/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   └── types.ts
│   │   │
│   │   ├── products/
│   │   │   ├── components/
│   │   │   ├── actions/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   └── types.ts
│   │   │
│   │   └── checkout/
│   │       ├── components/
│   │       ├── actions/
│   │       ├── schemas/
│   │       ├── services/
│   │       └── types.ts
│   │
│   ├── lib/
│   │   ├── db/
│   │   ├── auth/
│   │   ├── api/
│   │   ├── email/
│   │   ├── storage/
│   │   ├── analytics/
│   │   ├── validation/
│   │   ├── constants/
│   │   └── utils/
│   │
│   ├── hooks/
│   │   └── use-media-query.ts
│   │
│   ├── types/
│   │   ├── api.ts
│   │   └── common.ts
│   │
│   ├── config/
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   └── env.ts
│   │
│   └── styles/
│       └── ...
│
├── public/
│   ├── images/
│   ├── icons/
│   └── ...
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

This structure intentionally separates routing from reusable UI and feature logic. Next.js supports colocating files inside route segments, route groups such as `(marketing)`, private folders, and an optional `src` directory.

---

# 4. WHEN TO USE EACH DIRECTORY

## `app/`

Only put Next.js routing and route-specific code here.

Examples:

```text
page.tsx
layout.tsx
loading.tsx
error.tsx
not-found.tsx
route.ts
sitemap.ts
robots.ts
```

Do not turn `app/` into a dumping ground.

Avoid:

```text
app/
├── utils/
├── database/
├── random-component/
├── helpers/
└── services/
```

unless the code is genuinely route-specific.

---

# 5. ROUTE GROUPS

Use route groups to organize sections without changing URLs.

Example:

```text
app/
├── (marketing)/
│   ├── page.tsx
│   ├── about/
│   └── pricing/
│
└── (dashboard)/
    ├── dashboard/
    ├── settings/
    └── profile/
```

The `(marketing)` and `(dashboard)` names do not appear in the URL.

Use route groups when different sections need:

* Different layouts
* Different navigation
* Different providers
* Different authentication requirements
* Different UI shells

Do not create route groups merely for decoration.

---

# 6. COMPONENT ARCHITECTURE

Use three levels of components.

## Level 1 — Primitive UI

Generic components:

```text
Button
Input
Dialog
Card
Badge
Tabs
Select
Tooltip
Avatar
```

Location:

```text
components/ui/
```

These should be domain-independent.

Bad:

```tsx
<ProductButton />
```

inside `components/ui`.

Good:

```tsx
<Button />
```

---

## Level 2 — Shared application components

Examples:

```text
Navbar
Footer
Sidebar
Breadcrumbs
DataTable
PageHeader
EmptyState
ErrorState
SearchInput
```

Location:

```text
components/
```

---

## Level 3 — Feature components

Examples:

```text
features/products/components/product-card.tsx
features/products/components/product-filters.tsx
features/checkout/components/order-summary.tsx
```

These belong to the feature.

Do not move every component into a global `components/` directory.

---

# 7. COMPONENT RESPONSIBILITY

A component should ideally answer one question:

> "What UI responsibility does this component own?"

Avoid components like:

```text
DashboardEverything.tsx
UserManagementAndAnalytics.tsx
MegaForm.tsx
PageWith1000Lines.tsx
```

Prefer composition:

```text
DashboardPage
├── DashboardHeader
├── RevenueOverview
├── RecentOrders
├── UserGrowth
└── ActivityFeed
```

Pages should compose components rather than implement every detail themselves.

---

# 8. SERVER COMPONENTS VS CLIENT COMPONENTS

## Default rule

Everything should be a Server Component unless it genuinely needs client-side functionality.

Next.js uses Server Components by default. Client Components are appropriate when state, event handlers, lifecycle logic, or browser APIs are required.

Use Server Components for:

* Data fetching
* SEO content
* Database access
* Static UI
* Server-side rendering
* Authentication-aware rendering
* Sensitive operations

Use Client Components for:

* `useState`
* `useEffect`
* Event handlers
* Browser APIs
* Interactive forms
* Drag and drop
* Client-side animations
* Client-side state management

---

# 9. CLIENT BOUNDARY RULE

Do NOT do this unnecessarily:

```tsx
"use client";

export default function Page() {
  return <StaticMarketingPage />;
}
```

Instead:

```tsx
export default function Page() {
  return <InteractiveSection />;
}
```

and:

```tsx
"use client";

export function InteractiveSection() {
  // client logic
}
```

Keep the client boundary as low in the component tree as practical.

This reduces unnecessary client JavaScript.

---

# 10. DATA FETCHING

Prefer fetching data on the server whenever possible.

Bad:

```text
Server Component
    ↓
Client Component
    ↓
useEffect()
    ↓
API Route
    ↓
Database
```

when the server component could access the data directly.

Prefer:

```text
Server Component
    ↓
Data Access Layer
    ↓
Database
```

Next.js recommends server-side data fetching where possible because it can reduce client-side round trips and keep sensitive data server-side.

---

# 11. DATA ACCESS LAYER

Database operations should not be scattered throughout UI components.

Bad:

```tsx
export default async function Page() {
  const users = await db.user.findMany();
  ...
}
```

Prefer:

```text
features/users/
└── services/
    └── get-users.ts
```

or:

```text
lib/db/
└── queries/
    └── users.ts
```

Then:

```tsx
const users = await getUsers();
```

This creates a clear boundary between UI and infrastructure.

---

# 12. SERVER-ONLY CODE

Anything containing:

* Database clients
* API secrets
* Private tokens
* Service credentials
* Internal APIs
* Sensitive business logic

must remain server-side.

Use:

```ts
import "server-only";
```

where appropriate to prevent accidental client imports.

Never import a database client directly into a Client Component.

---

# 13. SERVER ACTIONS

Use Server Actions for appropriate server-side mutations.

Example responsibilities:

```text
createUser
updateProfile
deleteProduct
submitContactForm
createOrder
```

Server Actions must:

1. Validate input.
2. Authenticate the user if required.
3. Authorize the operation.
4. Perform the mutation.
5. Handle expected errors.
6. Revalidate affected data.
7. Return a predictable result.

Never rely on:

```text
layout authorization
page authorization
client-side authorization
```

as the only security layer.

Authorization must be checked at the actual mutation/data boundary.

---

# 14. VALIDATION

Use schema validation for external input.

Recommended approach:

```text
Request
 ↓
Schema validation
 ↓
Authentication
 ↓
Authorization
 ↓
Business logic
 ↓
Database
```

Validate:

* Forms
* Query parameters
* Route parameters
* API payloads
* Server Action inputs
* Webhook payloads
* External API responses where necessary

Never assume client-side validation is sufficient.

---

# 15. API ROUTES

Use Route Handlers when an HTTP endpoint is actually required.

Examples:

```text
app/api/auth/route.ts
app/api/webhooks/payment/route.ts
app/api/health/route.ts
```

Do not create an API route merely to allow a Server Component to retrieve data that it can already access directly.

For server-rendered pages:

```text
Server Component → Service/Data Layer
```

not:

```text
Server Component → Internal API → Service/Data Layer
```

---

# 16. ERROR HANDLING

Every meaningful route should consider:

```text
Loading
Success
Empty
Error
Not Found
Unauthorized
Forbidden
```

Use Next.js conventions:

```text
loading.tsx
error.tsx
not-found.tsx
global-error.tsx
```

Next.js provides these file conventions specifically for route-level loading and error boundaries.

Never use:

```tsx
catch (error) {
  console.log(error);
}
```

and continue as though nothing happened.

---

# 17. ERROR CLASSIFICATION

Separate errors into:

## Expected errors

Examples:

* Invalid form input
* User not found
* Duplicate email
* Unauthorized action
* Payment declined

These should produce controlled UI feedback.

## Unexpected errors

Examples:

* Database unavailable
* Programming error
* Unexpected third-party failure

These should:

* Be logged
* Be observable
* Show a safe fallback to the user
* Never expose sensitive implementation details

---

# 18. LOADING UX

Do not make users stare at blank screens.

Use:

```text
loading.tsx
```

or localized Suspense boundaries.

Prefer skeletons that resemble the final layout.

Bad:

```text
Loading...
```

for a large dashboard.

Better:

```text
Header skeleton
Card skeleton
Table skeleton
Chart skeleton
```

Avoid excessive spinners.

---

# 19. EMPTY STATES

Every data-driven component should consider zero data.

Example:

```text
No projects yet.

Create your first project to get started.
[Create Project]
```

Do not display:

```text
undefined
null
NaN
0 results
```

without contextual explanation.

---

# 20. TYPESCRIPT

Use strict TypeScript.

Recommended:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Avoid:

```ts
any
```

unless there is a documented reason.

Prefer:

```ts
unknown
```

when the type is genuinely unknown.

Bad:

```ts
const data: any = await response.json();
```

Better:

```ts
const data: unknown = await response.json();
```

then validate/narrow it.

---

# 21. TYPES

Keep types close to their ownership.

Feature-specific:

```text
features/products/types.ts
```

Shared:

```text
types/common.ts
```

API contracts:

```text
types/api.ts
```

Do not create one enormous:

```text
types.ts
```

containing hundreds of unrelated types.

---

# 22. NAMING CONVENTIONS

Use:

```text
kebab-case
```

for files and folders.

Examples:

```text
product-card.tsx
user-profile.tsx
get-products.ts
use-mobile.ts
```

Use PascalCase for React components:

```tsx
ProductCard
UserProfile
DashboardHeader
```

Use camelCase for variables/functions:

```ts
getProducts()
calculateTotal()
isAuthenticated
```

Use UPPER_SNAKE_CASE for true global constants:

```ts
MAX_UPLOAD_SIZE
DEFAULT_PAGE_SIZE
```

Avoid unnecessary abbreviations.

Bad:

```text
usr-card.tsx
prd-svc.ts
getUsr()
```

Good:

```text
user-card.tsx
product-service.ts
getUser()
```

---

# 23. IMPORTS

Prefer absolute imports.

Example:

```tsx
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/features/products/components/product-card";
```

Avoid excessive relative traversal:

```tsx
../../../../../../components/button
```

Configure a path alias such as:

```text
@/*
```

---

# 24. IMPORT ORDER

Use a predictable order:

```tsx
// React / framework
import Image from "next/image";
import Link from "next/link";

// Third-party
import { z } from "zod";

// Internal
import { Button } from "@/components/ui/button";
import { getProduct } from "@/features/products/services/get-product";

// Types
import type { Product } from "@/features/products/types";
```

Keep imports clean and automatically lintable.

---

# 25. UI DESIGN SYSTEM

Do not randomly invent UI styles for every page.

Establish:

```text
Colors
Typography
Spacing
Radius
Shadows
Borders
Motion
Breakpoints
Component variants
```

Use design tokens.

Example:

```text
Primary
Secondary
Muted
Destructive
Success
Warning
Background
Foreground
Border
```

Avoid hardcoding dozens of arbitrary colors.

Bad:

```tsx
bg-[#18293F]
text-[#123456]
border-[#D8DCE2]
```

when equivalent design tokens exist.

---

# 26. COMPONENT VARIANTS

For reusable components, prefer explicit variants.

Example:

```text
Button
├── variant
│   ├── default
│   ├── secondary
│   ├── outline
│   ├── ghost
│   └── destructive
│
└── size
    ├── sm
    ├── md
    └── lg
```

Avoid dozens of boolean props.

Bad:

```tsx
<Button
  primary
  rounded
  small
  loading
  outlined
  blue
/>
```

Prefer:

```tsx
<Button
  variant="primary"
  size="sm"
  loading
/>
```

---

# 27. RESPONSIVE DESIGN

Build mobile-first.

Think in:

```text
Mobile
Tablet
Desktop
Large desktop
```

Do not design desktop first and patch mobile later.

Every major component should be tested at:

```text
320px
375px
768px
1024px
1280px
1440px+
```

Avoid fixed widths when content can naturally adapt.

Prefer:

```css
max-width
min-width
flex
grid
clamp()
responsive spacing
```

over arbitrary pixel positioning.

---

# 28. ACCESSIBILITY

Accessibility is mandatory.

Use semantic HTML:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
<button>
<form>
<label>
```

Do not use:

```tsx
<div onClick={...}>
```

for an interactive control.

Use:

```tsx
<button onClick={...}>
```

instead.

Next.js documentation also recommends accessibility linting and semantic HTML practices.

---

# 29. ACCESSIBILITY CHECKLIST

Every interactive UI must support:

* Keyboard navigation
* Visible focus state
* Screen readers
* Appropriate labels
* Appropriate ARIA only where needed
* Sufficient color contrast
* Reduced motion where appropriate
* Logical heading hierarchy
* Form error announcements
* Accessible dialogs
* Accessible dropdowns
* Accessible buttons

Images require meaningful `alt` text when informative.

Decorative images should use:

```tsx
alt=""
```

---

# 30. IMAGES

Use:

```tsx
import Image from "next/image";
```

instead of raw `<img>` for application images where appropriate.

Next.js provides image optimization through `next/image`.

Always consider:

```text
width
height
sizes
priority
loading
quality
alt
```

Do not send a 4000px image when a 400px image is required.

For hero images, determine whether they are actually above-the-fold before using priority loading.

---

# 31. FONTS

Use:

```text
next/font
```

instead of relying on runtime external font requests where possible.

Next.js can host optimized font assets with the application, helping avoid additional font network requests and layout shift.

Define fonts centrally.

Example:

```text
src/config/fonts.ts
```

Do not import different font families independently across dozens of components.

---

# 32. PERFORMANCE

Performance is an architectural requirement, not a final optimization step.

Always minimize:

```text
JavaScript
Network requests
Client rendering
Large images
Third-party scripts
Large dependencies
Waterfalls
Unnecessary re-renders
```

---

# 33. JAVASCRIPT BUNDLE RULES

Before adding a dependency ask:

1. Does the platform already provide this?
2. Can existing dependencies solve it?
3. Is the package actively maintained?
4. How large is it?
5. Does it require client-side JavaScript?
6. Is it worth the performance cost?

Do not install a package for a trivial helper function.

Bad:

```text
install package just for debounce()
```

when a small local implementation is sufficient.

---

# 34. THIRD-PARTY LIBRARIES

Third-party libraries should be isolated.

Examples:

```text
lib/analytics/
lib/payment/
lib/email/
lib/storage/
```

Do not spread vendor-specific code throughout the application.

Bad:

```text
50 components
    ↓
Stripe-specific logic everywhere
```

Better:

```text
UI
 ↓
Payment Service
 ↓
Stripe Adapter
```

This makes future vendor replacement easier.

---

# 35. DATA FETCHING PERFORMANCE

Avoid waterfalls.

Bad:

```text
request A
 ↓
request B
 ↓
request C
 ↓
request D
```

when requests are independent.

Prefer parallel fetching:

```text
request A ─┐
request B ─┼→ render
request C ─┘
```

Use Suspense and streaming when appropriate.

Next.js recommends parallel data fetching and streaming patterns for reducing unnecessary sequential waits.

---

# 36. CACHING

Caching must be intentional.

Before caching data, determine:

```text
Is it public?
Is it user-specific?
How frequently does it change?
Can stale data be tolerated?
How will it be invalidated?
```

Never blindly cache personalized or sensitive data.

For each data source define an appropriate strategy:

```text
Static
Revalidated
Dynamic
No-store
```

Do not assume every request should behave the same way.

---

# 37. SEO

Every public page should have intentional metadata.

Use:

```tsx
export const metadata = {
  title: "...",
  description: "...",
};
```

or:

```tsx
export async function generateMetadata() {
  ...
}
```

Next.js provides the Metadata API and `generateMetadata` for page-level metadata.

---

# 38. SEO REQUIREMENTS

For important public pages consider:

```text
Title
Meta description
Canonical URL
Open Graph
Twitter/X metadata
Structured data
Robots behavior
Sitemap inclusion
Semantic headings
Internal links
Image alt text
```

Also create:

```text
app/sitemap.ts
app/robots.ts
```

when applicable.

---

# 39. SEO URL STRUCTURE

Prefer:

```text
/products
/products/shoes
/products/running-shoes
/blog/how-to-build-a-website
```

Avoid:

```text
/page?id=123
/product-page-final-2
/test123
```

URLs should be:

* Human-readable
* Stable
* Descriptive
* Predictable

Do not change URLs unnecessarily after indexing.

---

# 40. FORMS

Forms should have:

```text
Label
Input
Validation
Error state
Loading state
Success state
Disabled state
Accessibility
```

Example state machine:

```text
idle
 ↓
submitting
 ↓
success

or

submitting
 ↓
error
```

Prevent accidental double submissions.

Disable only what should actually be disabled.

---

# 41. FORM VALIDATION

Use:

```text
Client validation
+
Server validation
```

Client validation improves UX.

Server validation provides security and correctness.

Never rely only on:

```tsx
required
```

or client-side JavaScript.

---

# 42. AUTHENTICATION

Authentication and authorization are different.

Authentication:

> Who is the user?

Authorization:

> Is this user allowed to perform this action?

Always perform authorization checks at the server boundary.

Example:

```text
User
 ↓
Authenticated?
 ↓
Authorized?
 ↓
Business operation
```

Never assume:

```text
/higher-privilege-page
```

being hidden from navigation makes it secure.

---

# 43. ENVIRONMENT VARIABLES

Never hardcode:

```text
API keys
Database passwords
JWT secrets
Private tokens
Payment secrets
SMTP credentials
```

Use environment variables.

Only expose variables with:

```text
NEXT_PUBLIC_
```

when they are intentionally public.

Keep:

```text
.env.local
.env.production
```

out of version control.

Maintain:

```text
.env.example
```

with variable names but no secrets.

---

# 44. SECURITY

Treat all external input as untrusted.

This includes:

```text
Forms
Query parameters
Route parameters
Cookies
Headers
Webhooks
Uploaded files
Third-party API responses
User-generated HTML
```

Protect against:

```text
XSS
CSRF where applicable
Injection
Broken authorization
Sensitive data exposure
Unsafe redirects
File upload abuse
Rate abuse
```

Never render user-controlled HTML without sanitization and a deliberate security model.

---

# 45. CONTENT SECURITY POLICY

For production applications, evaluate whether a Content Security Policy should be implemented.

Do not blindly copy a CSP from another project.

Build it around the application's actual:

```text
scripts
images
fonts
frames
APIs
analytics
payment providers
```

---

# 46. DATABASE ARCHITECTURE

Never put database calls directly into random components.

Use:

```text
features/
lib/
```

as clear data-access boundaries.

Example:

```text
lib/db/
├── client.ts
├── queries/
│   ├── users.ts
│   ├── products.ts
│   └── orders.ts
└── mutations/
    ├── users.ts
    └── orders.ts
```

For very large systems, prefer domain/feature-specific data access instead of one enormous query folder.

---

# 47. BUSINESS LOGIC

Business logic should be reusable and testable.

Bad:

```tsx
if (
  user.role === "admin" &&
  order.status === "pending" &&
  order.amount > 5000 &&
  ...
) {
   ...
}
```

spread across multiple UI components.

Prefer:

```ts
canApproveOrder(user, order)
```

or:

```ts
approveOrder(...)
```

The UI should call the business capability rather than reproduce business rules.

---

# 48. CONSTANTS

Avoid magic numbers.

Bad:

```ts
if (amount > 5000) {}
```

Better:

```ts
const APPROVAL_THRESHOLD = 5000;
```

But do not create constants for trivial local values merely to avoid literals.

Use constants when the value represents:

* Business rules
* Configuration
* Limits
* Shared behavior

---

# 49. CONFIGURATION

Centralize application configuration.

Example:

```text
src/config/
├── site.ts
├── navigation.ts
├── env.ts
└── features.ts
```

Example:

```ts
export const siteConfig = {
  name: "Example",
  description: "...",
  url: "...",
};
```

Do not scatter site-wide configuration across components.

---

# 50. STATE MANAGEMENT

Use the simplest state solution that solves the problem.

Hierarchy:

```text
Local component state
        ↓
URL state
        ↓
Server state
        ↓
Context
        ↓
Global client state
```

Do not immediately introduce Redux/Zustand/etc.

Use URL parameters for state that should be:

* Shareable
* Bookmarkable
* SEO-relevant
* Navigation-aware

Examples:

```text
?page=2
?sort=price
?category=shoes
?search=running
```

---

# 51. GLOBAL STATE

Global client state should be reserved for genuinely global client concerns.

Good examples:

```text
Theme
Authentication UI state
Shopping cart UI
Persistent preferences
Complex client workflows
```

Bad examples:

```text
A single modal
A form input
A page-specific dropdown
A server-fetched product list
```

Do not turn the entire application into a global state machine.

---

# 52. URL STATE

For filters, search, pagination and sorting, prefer URL state where appropriate.

Example:

```text
/products?category=shoes&page=2&sort=price
```

This gives users:

* Shareable URLs
* Browser history
* Bookmarking
* Better navigation
* Better discoverability

---

# 53. TESTING STRATEGY

Use multiple levels.

## Unit tests

Test:

```text
Pure functions
Validation
Business rules
Utilities
Transformations
```

## Integration tests

Test:

```text
Services
Database interactions
Server Actions
API endpoints
Feature workflows
```

## E2E tests

Test critical user journeys:

```text
Signup
Login
Checkout
Search
Purchase
Important forms
Admin workflows
```

Do not write E2E tests for every trivial UI detail.

---

# 54. TEST PRIORITY

Prioritize tests based on risk.

High priority:

```text
Authentication
Authorization
Payments
Orders
Financial calculations
Data mutations
Critical business rules
```

Lower priority:

```text
Simple visual wrappers
Static decorative components
```

---

# 55. LOGGING & OBSERVABILITY

Production applications should have:

```text
Error monitoring
Structured logging
Performance monitoring
Core Web Vitals
Uptime monitoring
```

Avoid relying entirely on:

```ts
console.log()
```

for production observability.

Use a monitoring provider appropriate to the project.

Next.js also supports instrumentation and OpenTelemetry-oriented observability workflows.

---

# 56. ANALYTICS

Analytics must not be blindly installed everywhere.

Track meaningful events such as:

```text
page_view
sign_up
login
search
product_view
add_to_cart
checkout_started
purchase
```

Use consistent event names.

Do not send:

```text
passwords
tokens
payment data
sensitive personal information
```

to analytics providers.

---

# 57. ACCESSIBLE SEO STRUCTURE

Each page should normally have:

```text
One clear H1
Logical H2/H3 hierarchy
Semantic sections
Descriptive links
Meaningful image alt text
Readable content
```

Do not use heading tags merely because they visually look good.

Style headings with CSS/design tokens instead.

---

# 58. THIRD-PARTY SCRIPTS

Third-party scripts should be treated as expensive resources.

Examples:

```text
Analytics
Chat widgets
Advertising
Heatmaps
Social embeds
Payment widgets
```

Load them only when needed.

Use Next.js-supported script loading strategies appropriately.

Do not block initial rendering unnecessarily.

---

# 59. ANIMATIONS

Animation should communicate hierarchy and interaction.

Prefer:

```text
opacity
transform
scale
translate
```

for performant transitions.

Avoid animating expensive layout properties unnecessarily.

Always consider:

```text
prefers-reduced-motion
```

Avoid excessive animation.

A professional interface should feel responsive, not theatrical.

---

# 60. MODALS & DRAWERS

Every modal should support:

* Keyboard escape
* Focus management
* Correct focus restoration
* Screen reader labeling
* Scroll management
* Mobile usability

Do not build custom modal behavior if an established accessible component already exists in the project.

---

# 61. TABLES & DATA-DENSE UI

For dashboards:

Prefer:

```text
Clear hierarchy
Progressive disclosure
Pagination
Filtering
Sorting
Search
Sticky important columns
Responsive behavior
```

Do not display hundreds of rows simultaneously unless there is a strong reason.

For mobile, consider:

```text
Cards
Horizontal scrolling
Column prioritization
Expandable rows
```

rather than squeezing a desktop table into 320px.

---

# 62. DASHBOARD ARCHITECTURE

Large dashboards should be composed from independent widgets.

Example:

```text
Dashboard
├── Header
├── KPI Grid
│   ├── RevenueCard
│   ├── OrdersCard
│   └── UsersCard
├── RevenueChart
├── RecentActivity
└── DataTable
```

Each widget should ideally own:

```text
Loading
Error
Empty
Data
```

state.

Avoid a single giant dashboard component.

---

# 63. FEATURE FOLDER RULE

A feature should contain code that primarily exists because of that feature.

Example:

```text
features/orders/
├── components/
├── actions/
├── services/
├── schemas/
├── hooks/
├── utils/
└── types.ts
```

If a component is useful to many unrelated features, move it to shared components.

Do not prematurely make everything global.

---

# 64. DEPENDENCY DIRECTION

Avoid circular dependencies.

Bad:

```text
feature A → feature B
feature B → feature A
```

Prefer:

```text
shared
  ↑
feature
  ↑
route
```

Shared infrastructure should not import feature-specific UI.

---

# 65. BARREL FILES

Use barrel exports carefully.

Avoid giant:

```text
index.ts
```

that exports hundreds of unrelated modules.

They can:

* Hide dependency relationships
* Increase coupling
* Make imports harder to understand
* Create circular dependencies

Use barrels when they genuinely improve API boundaries.

---

# 66. REUSABILITY RULE

Do not abstract code just because two things look similar.

First ask:

```text
Do they have the same responsibility?
Will they evolve together?
Is the abstraction clearer?
```

If not, duplication may be preferable.

Bad abstraction:

```text
UniversalComponentWith47Props
```

Prefer focused components.

---

# 67. CODE COMMENTS

Comments should explain:

```text
Why
```

not:

```text
What
```

Bad:

```ts
// Increment counter
count++;
```

Good:

```ts
// Keep this value server-generated to prevent client-side manipulation.
```

Delete comments that become obsolete.

---

# 68. TODOs

Avoid leaving vague TODOs.

Bad:

```ts
// TODO fix this
```

Better:

```ts
// TODO(#123): Replace temporary fallback after the API supports pagination.
```

If no issue tracker exists, explain the actual technical limitation.

---

# 69. GIT PRACTICES

Keep commits focused.

Good:

```text
feat: add product filtering
fix: prevent duplicate checkout submission
refactor: extract product data service
perf: lazy load analytics widget
```

Avoid commits such as:

```text
changes
final
final-final
fix everything
```

Do not mix:

```text
feature implementation
+
unrelated refactoring
+
formatting entire repository
```

in one change.

---

# 70. CHANGE DISCIPLINE FOR AI AGENTS

When modifying an existing project:

1. Inspect the repository.
2. Understand the current architecture.
3. Identify existing reusable components.
4. Identify existing conventions.
5. Identify the smallest required change.
6. Implement the feature.
7. Avoid unrelated refactoring.
8. Run validation.
9. Report changed files and important decisions.

Never assume a repository is empty or follows your preferred architecture.

Existing project conventions have priority unless they conflict with explicit requirements or create a significant engineering problem.

---

# 71. AI AGENT — BEFORE CODING

Before writing code, determine:

```text
1. What feature is being built?
2. Which route owns it?
3. Is it public or authenticated?
4. Is it static, dynamic, or personalized?
5. What data does it require?
6. Where does that data come from?
7. Does the UI need client-side state?
8. Which existing components can be reused?
9. What loading/error/empty states are required?
10. What SEO requirements exist?
11. What accessibility requirements exist?
12. What security considerations exist?
13. What tests are necessary?
```

---

# 72. AI AGENT — BEFORE CREATING A COMPONENT

Ask:

```text
Does this component already exist?

If yes:
    reuse it.

If a similar component exists:
    extend it if appropriate.

If not:
    create a new focused component.
```

Never create:

```text
Button2
ButtonNew
NewButton
CustomButton
FinalButton
```

because an existing component was inconvenient.

---

# 73. AI AGENT — BEFORE INSTALLING A PACKAGE

Ask:

```text
Can native JavaScript solve it?
Can React solve it?
Can Next.js solve it?
Can an existing project dependency solve it?
Is the package maintained?
Is the bundle size acceptable?
Does it force client-side rendering?
Does it introduce security concerns?
```

Only then install it.

---

# 74. AI AGENT — BEFORE USING `"use client"`

Ask:

```text
Does this component use:
- state?
- event handlers?
- effects?
- browser APIs?
- client-only libraries?

If no:
    Do not use "use client".
```

---

# 75. AI AGENT — BEFORE FETCHING DATA

Ask:

```text
Can this be fetched on the server?

Is the data:
- public?
- user-specific?
- frequently changing?
- cacheable?
- sensitive?

Can multiple requests execute in parallel?

Does the result need revalidation?
```

---

# 76. AI AGENT — BEFORE ADDING GLOBAL STATE

Ask:

```text
Can local state solve this?

Can URL state solve this?

Can server state solve this?

Can props solve this?

Only then consider global state.
```

---

# 77. AI AGENT — BEFORE SHIPPING

Run:

```text
TypeScript
Lint
Unit tests
Integration tests
E2E tests where relevant
Production build
Accessibility checks
SEO checks
Lighthouse/performance checks
```

At minimum:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

if these scripts exist.

---

# 78. PRODUCTION CHECKLIST

## Architecture

* [ ] App Router used for new application
* [ ] Clear route organization
* [ ] Feature boundaries established
* [ ] No unnecessary global state
* [ ] No circular dependencies
* [ ] Business logic separated from UI

## TypeScript

* [ ] Strict mode enabled
* [ ] No unnecessary `any`
* [ ] External data validated
* [ ] Shared types organized

## Performance

* [ ] Server Components used by default
* [ ] Client boundaries minimized
* [ ] Images optimized
* [ ] Fonts optimized
* [ ] Third-party scripts reviewed
* [ ] Large dependencies reviewed
* [ ] Network waterfalls minimized
* [ ] Dynamic imports used where beneficial
* [ ] Lighthouse reviewed

## Accessibility

* [ ] Semantic HTML
* [ ] Keyboard navigation
* [ ] Visible focus states
* [ ] Form labels
* [ ] Accessible errors
* [ ] Appropriate ARIA
* [ ] Image alt text
* [ ] Reduced motion considered
* [ ] Contrast checked

## SEO

* [ ] Page title
* [ ] Meta description
* [ ] Canonical URL where needed
* [ ] Open Graph metadata
* [ ] Sitemap
* [ ] Robots
* [ ] Semantic headings
* [ ] SEO-friendly URLs
* [ ] Structured data where appropriate

## Security

* [ ] Secrets are not committed
* [ ] `.env*` protected
* [ ] Server-only code protected
* [ ] Authorization enforced server-side
* [ ] User input validated
* [ ] File uploads validated
* [ ] Webhooks verified
* [ ] Sensitive information excluded from logs
* [ ] Security headers reviewed

## Reliability

* [ ] Loading states
* [ ] Error states
* [ ] Empty states
* [ ] Not-found states
* [ ] Error monitoring
* [ ] Logging
* [ ] Health check where appropriate

---

# 79. RECOMMENDED STANDARD FILE NAMING

```text
page.tsx
layout.tsx
loading.tsx
error.tsx
not-found.tsx
global-error.tsx
route.ts

product-card.tsx
product-list.tsx
product-filters.tsx

get-products.ts
create-product.ts
update-product.ts

product-schema.ts
product-types.ts

use-product-filter.ts
use-debounce.ts
```

Avoid:

```text
ProductCardComponent.tsx
ProductCardFINAL.tsx
helper.ts
utils2.ts
misc.ts
stuff.ts
common.ts
```

unless the name genuinely represents the responsibility.

---

# 80. RECOMMENDED FEATURE TEMPLATE

When creating a substantial feature:

```text
features/example/
├── components/
│   ├── example-card.tsx
│   ├── example-list.tsx
│   └── example-form.tsx
│
├── actions/
│   ├── create-example.ts
│   └── update-example.ts
│
├── services/
│   ├── get-example.ts
│   └── get-examples.ts
│
├── schemas/
│   └── example-schema.ts
│
├── hooks/
│   └── use-example.ts
│
├── utils/
│   └── format-example.ts
│
└── types.ts
```

Do not create every folder automatically.

Only create folders that have meaningful contents.

---

# 81. SIMPLE WEBSITE VARIANT

For a small marketing website, do NOT over-engineer.

A perfectly valid structure is:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── ui/
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── hero.tsx
│
├── lib/
│   └── utils.ts
│
└── config/
    └── site.ts
```

Do not create enterprise architecture for a five-page website.

---

# 82. LARGE APPLICATION VARIANT

For a large application:

```text
src/
├── app/
├── components/
├── features/
├── lib/
├── domain/
├── infrastructure/
├── services/
├── config/
├── hooks/
├── types/
└── styles/
```

Consider stronger domain boundaries when:

```text
Multiple teams
Large codebase
Complex business rules
Multiple integrations
High development velocity
Long-term maintenance
```

are involved.

---

# 83. DESIGN FOR AI MAINTAINABILITY

AI agents work better when the repository has predictable structure.

Therefore:

* Prefer descriptive names.
* Keep files focused.
* Avoid giant files.
* Avoid hidden behavior.
* Avoid clever abstractions.
* Keep dependencies explicit.
* Keep business logic discoverable.
* Keep feature boundaries clear.
* Keep types close to their domain.
* Keep server/client boundaries obvious.
* Document architectural decisions.
* Maintain a useful README.

A future AI agent should be able to answer:

```text
Where is the UI?
Where is the business logic?
Where is the database?
Where is authentication?
Where is validation?
Where are shared components?
Where is this feature implemented?
```

without searching the entire repository.

---

# 84. DOCUMENTATION

Maintain:

```text
README.md
```

with:

```text
Project overview
Tech stack
Development setup
Environment variables
Commands
Architecture overview
Deployment
Testing
Important conventions
```

For complex projects consider:

```text
docs/
├── architecture.md
├── authentication.md
├── database.md
├── deployment.md
└── decisions/
```

---

# 85. ARCHITECTURE DECISION RECORDS

For important architectural decisions, document:

```text
Problem
Decision
Alternatives considered
Reason
Consequences
```

Example:

```text
Decision:
Use URL search parameters for product filtering.

Reason:
Filters need to be shareable and persisted through navigation.
```

This prevents future AI agents from accidentally undoing intentional decisions.

---

# 86. ANTI-PATTERNS

Never intentionally create:

```text
God components
God hooks
God contexts
God services
Massive utils.ts
Massive types.ts
Massive page.tsx
Random global state
Unnecessary API routes
Client-side data fetching for server-only data
Database access inside UI components
Hardcoded secrets
Hardcoded environment-specific URLs
Duplicated business logic
Unvalidated input
Unprotected server actions
Huge dependency additions for trivial functionality
```

---

# 87. DEFINITION OF DONE

A feature is not complete merely because it works visually.

A feature is complete when:

```text
UI works
+
Responsive behavior works
+
Accessibility works
+
Loading state works
+
Error state works
+
Empty state works
+
Validation works
+
Authorization works
+
SEO is handled
+
Performance is acceptable
+
Types pass
+
Lint passes
+
Tests pass where appropriate
+
Production build passes
```

---

# 88. FINAL AI AGENT INSTRUCTION

Before finishing any task, review your implementation against this document.

Ask yourself:

> Did I choose the simplest architecture that can scale?

> Did I keep Server Components as the default?

> Did I introduce unnecessary client JavaScript?

> Did I put business logic in the correct layer?

> Did I reuse existing components?

> Did I duplicate anything?

> Did I introduce an unnecessary dependency?

> Is the feature accessible?

> Is it responsive?

> Is it SEO-friendly?

> Is user input validated?

> Is authorization enforced server-side?

> Are secrets protected?

> Are loading, error, empty and not-found states handled?

> Can another engineer understand this code six months from now?

> Can another AI agent safely modify this code without understanding the entire repository?

If the answer to any important question is **no**, improve the implementation before declaring the task complete.

---

# 89. CORE PRINCIPLE

The objective is NOT:

> "Write the least amount of code."

The objective is:

> **Write the simplest code that is correct, maintainable, scalable, accessible, secure, performant, and understandable.**

Do not optimize for cleverness.

Optimize for:

```text
Clarity
Consistency
Correctness
Performance
Security
Accessibility
Maintainability
Scalability
```

These principles take priority over personal coding preferences.

# END OF GUIDELINES
