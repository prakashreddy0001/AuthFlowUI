# Design Guidelines: Authentication Application

## Design Approach

**Selected Approach**: Modern Minimalist System with Trust-Building Elements

This authentication app requires clarity, trustworthiness, and ease of use. Drawing inspiration from Linear's clean typography and Stripe's restrained elegance, combined with established authentication patterns from Auth0 and Firebase UI.

**Core Principles**:
- Trustworthy simplicity over visual complexity
- Clear hierarchy that guides users through authentication flow
- Generous spacing that reduces cognitive load
- Subtle visual feedback that confirms user actions

---

## Typography System

**Font Stack**: 
- Primary: Inter (via Google Fonts CDN) for UI elements and body text
- Display: SF Pro Display fallback system font for headlines

**Hierarchy**:
- Hero Headlines: text-5xl font-semibold tracking-tight (login/signup titles)
- Section Headers: text-2xl font-semibold
- Form Labels: text-sm font-medium tracking-wide uppercase
- Body Text: text-base font-normal
- Helper Text: text-sm font-normal
- Button Text: text-sm font-semibold tracking-wide

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Micro spacing (form fields, buttons): p-4, gap-2
- Component spacing: p-6, p-8, gap-4
- Section spacing: py-12, py-16, px-8

**Grid Structure**:
- Login/Signup Screen: Split-screen layout (50/50 on desktop, stacked on mobile)
- Authenticated Screen: Traditional app layout with sidebar + main content area

---

## Authentication Screens Design

### Login/Signup Screen Layout

**Split-Screen Structure** (hidden on mobile, full-width form):

**Left Panel** (hidden below lg:):
- Full-height visual panel with gradient overlay
- Centered content: App logo, tagline, trust indicators
- Testimonial or feature highlights
- Dimensions: lg:w-1/2, min-h-screen

**Right Panel** (Form Area):
- Centered form container: max-w-md mx-auto
- Vertical padding: py-16 px-8
- Form elements with generous spacing: space-y-6

**Form Components**:
1. Header Section:
   - Logo (visible on mobile)
   - Welcome headline: text-3xl font-semibold mb-2
   - Subtitle: text-base mb-8

2. Input Fields (space-y-4):
   - Email input with icon (Heroicons mail icon)
   - Password input with icon and toggle visibility (Heroicons eye/eye-slash)
   - Confirm password (signup only)
   - Label above input: text-sm font-medium mb-2
   - Input padding: p-4, rounded-lg border-2

3. Action Elements:
   - "Remember me" checkbox + "Forgot password?" link (justify-between)
   - Primary CTA button: w-full py-4 rounded-lg font-semibold text-sm
   - Divider with "OR" text: my-8
   - Social auth buttons (Google, GitHub): w-full py-3 gap-3 (icon + text)

4. Footer:
   - Toggle between login/signup: text-sm with link
   - Terms & privacy links: text-xs mt-8

---

### Authenticated Dashboard Screen

**Layout Structure**:

**Sidebar** (w-64 on desktop, drawer on mobile):
- Fixed positioning: fixed h-screen
- Internal padding: p-6
- Navigation items: space-y-2, p-3 rounded-lg
- Bottom section: mt-auto (user profile, logout)

**Main Content Area** (ml-64 on desktop):
- Top Navigation Bar:
  - Height: h-16, px-8
  - Breadcrumbs, search, notifications, profile dropdown
  - Shadow: shadow-sm

- Content Container:
  - Padding: p-8 lg:p-12
  - Max width: max-w-7xl mx-auto

- Welcome Section:
  - User greeting: text-3xl font-semibold mb-2
  - Subtitle with last login info: text-sm mb-12

- Dashboard Grid:
  - 3-column stat cards: grid grid-cols-1 md:grid-cols-3 gap-6
  - Card structure: p-6 rounded-xl shadow-sm
  - Icon + label + value hierarchy

- Activity Section:
  - Recent activity list with timeline
  - Each item: flex items-center gap-4 p-4 rounded-lg

---

## Component Library

### Core Input Components

**Text Input**:
- Container: relative
- Input: w-full p-4 pl-12 rounded-lg border-2 transition-all
- Icon container: absolute left-4 top-1/2 transform -translate-y-1/2
- Focus state: Ring offset and scale transform
- Error state: Border treatment and helper text below

**Button Variants**:

*Primary*: 
- Padding: px-8 py-4
- Font: font-semibold text-sm tracking-wide
- Border radius: rounded-lg
- Full width option: w-full
- Disabled state: opacity-50 cursor-not-allowed

*Secondary*:
- Same padding, border-2 treatment
- Ghost variant for tertiary actions

*Social Auth*:
- Flex layout: flex items-center justify-center gap-3
- Icon size: w-5 h-5
- Border treatment with hover state

### Card Components

**Stat Card**:
- Padding: p-6
- Border radius: rounded-xl
- Structure: Icon + Label + Value + Change indicator
- Icon container: w-12 h-12 rounded-lg flex items-center justify-center

**Activity Card**:
- Timeline dot indicator
- Flex layout: flex items-start gap-4
- Content hierarchy: title (font-semibold) + description (text-sm) + timestamp (text-xs)

### Navigation Components

**Sidebar Nav Item**:
- Padding: p-3
- Border radius: rounded-lg
- Layout: flex items-center gap-3
- Icon: w-5 h-5
- Active state: font-semibold with visual indicator

**Top Nav**:
- Search bar: max-w-xl with icon
- Icon buttons: p-2 rounded-lg hover effects
- Profile dropdown: Custom dropdown with user info + menu items

---

## Icons

**Library**: Heroicons (via CDN)

**Usage**:
- Form inputs: outline style, w-5 h-5
- Navigation: outline style, w-5 h-5
- Stats/features: solid style, w-6 h-6
- Social: Brand icons from Font Awesome w-5 h-5

---

## Images

**Login/Signup Left Panel Image**:
- Abstract geometric patterns or gradient mesh background
- Dashboard illustration showing app interface
- Placement: Full-height background with gradient overlay
- Treatment: object-cover with opacity layer

**Dashboard**:
- User avatar: rounded-full w-10 h-10 (top nav and sidebar)
- Empty states: Illustrations for "no activity" scenarios

---

## Responsive Behavior

**Breakpoints**:
- Mobile (default): Single column, stacked layouts
- Tablet (md: 768px): 2-column grids where appropriate
- Desktop (lg: 1024px): Split-screen auth, sidebar visible, 3-column grids

**Mobile Adaptations**:
- Hide left panel on auth screens
- Sidebar becomes drawer with hamburger menu
- Stack stat cards vertically
- Reduce padding: py-8 instead of py-16

---

## Accessibility

- All inputs with proper labels and aria-attributes
- Focus states: 2px ring with offset
- Keyboard navigation support for all interactive elements
- Error states announced with aria-live regions
- Minimum touch target: 44x44px for mobile
- High contrast text ratios throughout