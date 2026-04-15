# Tarot Reading App - Product Requirements Document

## Executive Summary

A web-based tarot reading application that provides users with guided three-card spreads. The app features pixel art aesthetics, smooth card animations, user account management, reading history, and analytics. Users can perform unlimited readings without logging in, but must create an account to save readings with personal journal entries.

---

## 1. Product Overview

### 1.1 Vision
Create an accessible, visually delightful tarot reading experience that combines spiritual guidance with modern web technology. The app should feel mystical yet approachable, with a focus on introspection and personal reflection.

### 1.2 Core Value Proposition
- **Accessible readings**: Three-card spreads provide structure and clarity
- **Beautiful interactions**: Pixel art aesthetic with smooth, satisfying animations
- **Personal journaling**: Save readings with journal entries for reflection over time
- **Intuitive experience**: No prior tarot knowledge required; keywords and guidance provided
- **Mobile-friendly**: Responsive design optimized for all screen sizes

### 1.3 Target Users
- Individuals interested in tarot for self-reflection and guidance
- Users seeking a digital alternative to physical tarot cards
- People interested in tracking personal growth and patterns over time

---

## 2. Scope

### 2.1 In-Scope (MVP)

#### Authentication & Account Management
- User sign-up with email and password
- User login with email and password
- Password reset functionality (via email)
- Account creation required only to save readings

#### Core Reading Experience
- **Three-Card Spread**: What you need to know, New perspective, Action to take
- **Deck**: Full 78-card tarot deck with upright and reversed card meanings
- **Card Reveal**: Sequential flip animation for each card (brief duration)
- **Shuffle Animation**: CSS animation with cards physically moving around after draw button is clicked
- **Responsive Layout**:
  - Desktop: 3 cards displayed side-by-side
  - Mobile: Carousel with main card in center, 1 card visible on each side, infinite scroll capability
  - Navigation arrows for mobile carousel

#### Card Information Display
- Card design (pixel art)
- Card title
- Orientation (Upright/Reversed)
- Keywords (auto-scraped from Labyrinthos)
- Card back design for unshuffled deck

#### Reading History & Journal
- View all past readings with:
  - Date of reading
  - All 3 card titles and orientations
  - Card images
  - Saved journal entry (if one exists)
- Create/edit journal entries after saving (optional text field)
- Delete readings (explicit confirmation)
- Search/filter readings by date range

#### Analytics & Insights (Backend/Database)
- Track most frequently drawn cards
- Track reading frequency per user
- Data available for future dashboard feature

#### Card Data Management
- Auto-scrape card keywords from Labyrinthos (https://labyrinthos.co/blogs/tarot-card-meanings-list)
- Store card meanings, titles, and keywords in Supabase
- Upright and reversed meanings for all 78 cards

### 2.2 Out-of-Scope (Future Phases)

- Shareable reading links and public viewing
- User dashboard with analytics visualization
- Custom reading spreads
- Card of the day feature
- Multi-language support
- Dark mode (launch with light mode; can be added later)
- Social features (comments, likes, etc.)
- Advanced filtering/tagging of readings

---

## 3. Feature Specifications

### 3.1 Authentication System

#### 3.1.1 Sign-Up Flow
- Email and password required fields
- Password strength indicator (minimum 8 characters recommended)
- Confirm password field
- Terms of service checkbox (optional; decide on legal requirements)
- Success state: User automatically logged in and redirected to home page
- Error handling: Display email already in use, password validation errors

#### 3.1.2 Login Flow
- Email and password inputs
- "Remember me" checkbox (optional; uses localStorage)
- "Forgot password?" link redirects to reset flow
- Success state: Redirect to home page or last visited page
- Error handling: Display invalid credentials

#### 3.1.3 Password Reset
- User enters email, receives reset link via email (Supabase auth)
- Reset link valid for 24 hours
- New password form with confirmation
- Success notification and redirect to login

#### 3.1.4 Session Management
- Session persists via Supabase auth tokens
- Auto-logout after 7 days of inactivity (or session expires)
- Logout button in navigation

### 3.2 Reading Experience

#### 3.2.1 Landing/Home Screen (Default State)
- Heroic background with starry sky and clouds (pixel art style)
- Central deck card back image
- Large call-to-action button: "CLICK THE DECK & REVEAL YOUR FATE"
- Subtitle: "Channel your energy into the cards... The universe is listening"
- Navigation bar: Branding/logo (left), "MY READINGS" (center), "LOGIN/SIGNUP" or user menu (right)
- Responsive: Deck centered on all screen sizes

#### 3.2.2 Shuffle Animation (Post-Click)
- **Trigger**: User clicks "CLICK THE DECK & REVEAL YOUR FATE" button
- **Duration**: 2-3 seconds of animated shuffling
- **Animation**: Cards physically move around the screen using CSS keyframe animations
  - Cards appear to shuffle, rotate, and reposition
  - Smooth, continuous motion that feels organic
  - Brief loading text: "THE UNIVERSE IS THINKING..." or "May focused... Stay close..."
- **End State**: Screen transitions to card reveal sequence

#### 3.2.3 Card Reveal Sequence
- **Timing**: One card reveals at a time after shuffle completes
- **Animation**: Brief flip animation (card rotates 180 degrees to show front)
- **Duration**: ~500ms per card flip (quick reveal)
- **Order**: 
  1. First card reveals: "What you need to know"
  2. Second card reveals: "New perspective" 
  3. Third card reveals: "Action to take"
- **Display**: Cards appear in sequence with labels above each

#### 3.2.4 Desktop Card Display
- Three cards displayed horizontally, side-by-side
- Equal spacing between cards
- Card title, orientation (Upright/Reversed), and keywords displayed below each card
- "SHUFFLE & DRAW AGAIN" button below the three-card spread
- No additional actions required; all information visible at once

#### 3.2.5 Mobile Card Display (Carousel View)
- **Layout**: Main card in center of screen, 1 card visible on each side (peek view)
- **Navigation**: 
  - Left arrow to view previous card
  - Right arrow to view next card
  - Infinite scroll (cycling through all 3 cards)
- **Display**: Full card information visible for center card:
  - Card image
  - Card title
  - Orientation (Upright/Reversed)
  - Keywords
  - Spread position label (e.g., "What you need to know")
- **Interactions**:
  - Tap arrows to navigate
  - Smooth scroll/slide animation between cards
  - Bottom position for "SHUFFLE & DRAW AGAIN" button

#### 3.2.6 Card Information Display
- **Card Image**: Full pixel art card design
- **Card Title**: Bold, prominent text
- **Orientation**: "Upright" or "Reversed" label with visual indicator
- **Keywords**: 3-5 keywords below card title in smaller text
- **Spread Position**: Label indicating which position in spread (e.g., "Position 1: What You Need to Know")

#### 3.2.7 Reshuffle & Redraw
- User can reshuffle and redraw as many times as they want
- "SHUFFLE & DRAW AGAIN" button is always available
- Clicking resets to shuffle animation state
- No data is saved until user explicitly creates account and chooses to save

### 3.3 Reading History & Journal

#### 3.3.1 My Readings Page (Authenticated Only)
- Accessible via "MY READINGS" navigation link (only visible when logged in)
- List view of all past readings
- Each reading entry shows:
  - Date and time of reading
  - All 3 card titles with orientation badges
  - Card images (small thumbnails)
  - Journal entry preview (first 50 characters if exists)
- Sorting: Default by date (newest first)
- Actions per reading:
  - Click to expand/view full reading
  - Edit button (opens journal editor)
  - Delete button (with confirmation modal)

#### 3.3.2 Reading Detail View
- Full reading information:
  - Date and time
  - All 3 cards with full details (images, titles, orientations, keywords)
  - Layout matches original reading view (desktop: 3 cards side-by-side; mobile: carousel)
- Journal entry section:
  - Display saved journal text (if exists)
  - Edit button to modify
  - If no journal entry exists: "Add journal entry" prompt

#### 3.3.3 Journal Entry Editor
- Modal or overlay that opens on edit
- Text area for multi-line input (no character limit)
- Auto-save on blur or explicit save button
- Success notification: "Journal entry saved"
- Can be opened from:
  - Reading list view (via edit button)
  - Reading detail view (via edit button)
  - Immediately after saving a new reading

#### 3.3.4 Save Reading Modal (Unauthenticated)
- Appears when user wants to save a reading without account
- Message: "Create an account to save your readings and reflect over time"
- Options:
  - "CREATE ACCOUNT" button → redirects to sign-up
  - "LOGIN" button → redirects to login
  - "CONTINUE WITHOUT SAVING" button → closes modal, stays on reading
- If user is authenticated:
  - Save button appears automatically after reading is drawn
  - Clicking save shows confirmation: "Reading saved successfully"
  - Journal entry field appears for optional input

#### 3.3.5 Delete Reading
- Delete button triggers confirmation modal
- Modal text: "Are you sure you want to delete this reading? This action cannot be undone."
- Two buttons: "CANCEL" and "DELETE"
- On confirm: Reading is removed, list updates, success notification shown

### 3.4 Card Data & Keywords

#### 3.4.1 Card Database
- All 78 cards stored in Supabase with:
  - Card ID
  - Card name/title
  - Upright keywords (3-5 keywords)
  - Reversed keywords (3-5 keywords)
  - Card image URL/path
  - Suit (Major Arcana, Cups, Wands, Swords, Pentacles)
  - Card number/position in deck

#### 3.4.2 Auto-Scraping from Labyrinthos
- **Source**: https://labyrinthos.co/blogs/tarot-card-meanings-list
- **Method**: Web scraping script to extract:
  - Card names
  - Upright meanings/keywords
  - Reversed meanings/keywords
- **Frequency**: Run during initial setup and update script can be run periodically
- **Storage**: Keywords stored in Supabase database
- **Implementation**: Node.js script using Cheerio or similar library
- **Fallback**: Manual entry if auto-scraping fails

#### 3.4.3 Card Imagery
- Source: Pixel art representations of tarot cards
- Style consistency: Maintain pixel art aesthetic across all cards
- Dimensions: Consistent sizing for both display and storage

### 3.5 Analytics & Tracking

#### 3.5.1 Reading Frequency
- Track per-user metrics:
  - Total number of readings created
  - Readings created per day/week/month
  - Last reading date
- Store in Supabase readings table

#### 3.5.2 Most Drawn Cards
- Track per-user metrics:
  - Which cards appear most frequently (upright and reversed counted separately)
  - Number of times each card appears
- Store in Supabase (denormalized in readings table or separate analytics table)

#### 3.5.3 Analytics Availability
- Data tracked in backend but not displayed in MVP
- Available for future dashboard/insights feature
- Can be queried via admin dashboard or API

---

## 4. Design System Specifications

### 4.1 Color Palette

#### Primary Colors
- **Deep Navy Blue**: #2C3E7F (background, primary brand color)
- **Burgundy/Wine Red**: #8B4053 (card backgrounds, accents)
- **Soft Coral/Rose**: #E8B4A8 (cloud elements, highlights)
- **Soft Pink/Lavender**: #D4C5D9 (card backs, light accents)

#### Secondary Colors
- **Cream/Off-White**: #F5F3F0 (text, backgrounds)
- **Rust/Orange**: #D4714F (decorative elements, highlights)
- **Teal/Sage**: #7BA996 (accent elements, success states)
- **Dark Gray**: #3D3D3D (text, borders)

#### Functional Colors
- **Success**: #7BA996 (confirmation, positive actions)
- **Warning**: #D4714F (caution, delete actions)
- **Error**: #C85A54 (errors, validation)
- **Info**: #2C3E7F (information, neutral)

### 4.2 Typography

#### Font Family
- **Primary Font**: Pixel art compatible monospace or bitmap font
- **Fallback**: Courier New, monospace
- **Font Name Recommendation**: "Press Start 2P" or similar retro pixel font for headings
- **Body Font**: Monospace or clean sans-serif (consistent with pixel art theme)

#### Font Sizes & Styles
- **H1 (Main Headlines)**: 32px, bold, color: #3D3D3D
- **H2 (Section Headers)**: 24px, bold, color: #3D3D3D
- **H3 (Card Titles)**: 20px, bold, color: #8B4053
- **Body Text**: 14px, regular, color: #3D3D3D
- **Small Text (Keywords)**: 12px, regular, color: #5C5C5C
- **Button Text**: 14px, bold, color: #F5F3F0

#### Text Styling
- All caps preferred for buttons and headings (retro aesthetic)
- Minimal line-height: 1.4 for body text
- Letter-spacing: +0.5px for enhanced pixel art feel

### 4.3 Spacing & Layout

#### Spacing Scale (in pixels)
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

#### Layout Grid
- Desktop: 12-column grid, 24px gutters
- Tablet: 8-column grid, 16px gutters
- Mobile: 4-column grid, 12px gutters
- Max-width container: 1200px

#### Component Spacing
- **Login/Sign-up Form**: 
  - Input fields: 16px vertical spacing
  - Label to input: 8px spacing
  - Button: 24px top margin
  - Form padding: 32px
  - Form max-width: 400px

- **Container**:
  - Default padding: 24px on all sides
  - Mobile padding: 16px on all sides
  - Content max-width: 1000px (for text-heavy content)

- **Cards**:
  - Padding: 16px
  - Border radius: 0px (sharp, pixel-perfect corners)
  - Gap between cards: 24px (desktop), 16px (mobile)

- **Navigation Bar**:
  - Height: 64px (desktop), 56px (mobile)
  - Horizontal padding: 24px
  - Logo/text positioning: centered vertically

- **Buttons**:
  - Padding: 12px 24px
  - Min-width: 120px
  - Border-radius: 0px (sharp corners)
  - Min-height: 44px (mobile touch target)

### 4.4 Card Components

#### Card Deck (Unshuffled)
- **Dimensions**: 140x200px (aspect ratio 1:1.43, standard tarot)
- **Background**: Burgundy/Wine Red (#8B4053)
- **Border**: 2px solid #3D3D3D or decorative pattern
- **Center Design**: Mystical symbol or star pattern
- **Style**: Pixel art with gold/rose accents

#### Card Face (Individual Card)
- **Dimensions**: 140x200px (matching deck)
- **Background**: Cream/Off-White (#F5F3F0) with illustrated design
- **Border**: 2px solid gold or #D4714F
- **Content Area**: Image + title area
- **Padding**: 8px internal spacing

#### Card Back (Alternative Design)
- **Dimensions**: 140x200px
- **Background**: Soft Pink/Lavender (#D4C5D9)
- **Pattern**: Subtle geometric or mystical pattern
- **Border**: 2px solid #3D3D3D
- **Center Element**: Rose or star motif

#### Card Information Block
- Title below card: 16px, bold
- Orientation badge: "UPRIGHT" or "REVERSED" label
- Keywords: 12px, 3-5 keywords separated by commas or bullet points
- All text left-aligned, positioned directly below card image

### 4.5 Input Fields & Forms

#### Text Input
- **Height**: 44px (min-touch target)
- **Padding**: 12px 16px
- **Border**: 2px solid #D4C5D9
- **Border-radius**: 0px (sharp corners)
- **Background**: #F5F3F0
- **Focus state**: Border color changes to #2C3E7F
- **Font**: 14px, body font
- **Placeholder**: Color #A0A0A0, italic

#### Textarea (Journal Entry)
- **Min-height**: 150px
- **Padding**: 12px 16px
- **Border**: 2px solid #D4C5D9
- **Border-radius**: 0px
- **Background**: #F5F3F0
- **Focus state**: Border color changes to #2C3E7F
- **Font**: 14px, body font
- **Resize**: Vertical only

#### Buttons

##### Primary Button (CTA)
- **Background**: #8B4053 (burgundy)
- **Text Color**: #F5F3F0 (cream)
- **Border**: 2px solid #3D3D3D
- **Padding**: 12px 24px
- **Font**: 14px, bold, all caps
- **Hover state**: 
  - Background: #6B3043 (darker)
  - Cursor: pointer
- **Active state**: 
  - Box-shadow: inset 0 2px 4px rgba(0,0,0,0.2)
- **Disabled state**: 
  - Background: #C8C8C8
  - Cursor: not-allowed
  - Opacity: 0.6

##### Secondary Button
- **Background**: transparent
- **Text Color**: #8B4053
- **Border**: 2px solid #8B4053
- **Padding**: 12px 24px
- **Font**: 14px, bold, all caps
- **Hover state**: 
  - Background: #F5F3F0
  - Cursor: pointer
- **Active state**: 
  - Box-shadow: inset 0 2px 4px rgba(0,0,0,0.1)

##### Success Button
- **Background**: #7BA996 (sage/teal)
- **Text Color**: #F5F3F0
- **Border**: 2px solid #3D3D3D
- **Hover state**: Background #5F8A7B

##### Danger Button
- **Background**: #C85A54 (error red)
- **Text Color**: #F5F3F0
- **Border**: 2px solid #3D3D3D
- **Hover state**: Background #A84844

#### Checkboxes & Radio Buttons
- **Size**: 20px x 20px (touch-friendly)
- **Border**: 2px solid #D4C5D9
- **Checked background**: #8B4053
- **Checked indicator**: #F5F3F0 checkmark
- **Border-radius**: 0px (square)
- **Label spacing**: 8px right of checkbox

#### Toggle/Switch (if needed)
- **Width**: 48px
- **Height**: 24px
- **Border**: 2px solid #D4C5D9
- **Background**: #F5F3F0 (off), #7BA996 (on)
- **Border-radius**: 0px
- **Toggle circle**: 20px x 20px, white

### 4.6 Navigation & Header

#### Navigation Bar
- **Height**: 64px (desktop), 56px (mobile)
- **Background**: #2C3E7F (deep navy)
- **Layout**: Flexbox, space-between
- **Padding**: 0 24px
- **Items**: Logo/Title, Center nav, User menu
- **Text Color**: #F5F3F0
- **Border-bottom**: Optional 2px #D4714F

#### Logo/Branding
- **Font-size**: 24px, bold, all caps
- **Color**: #E8B4A8 (rose) or #F5F3F0
- **Letter-spacing**: +1px

#### Navigation Links
- **Font-size**: 14px, bold
- **Color**: #F5F3F0
- **Hover**: Color changes to #E8B4A8 or adds underline
- **Active**: Color #E8B4A8 or background highlight
- **Spacing**: 24px between links

#### User Menu (Logged In)
- Username or avatar (if implemented)
- Dropdown menu on click:
  - "ACCOUNT SETTINGS" (future)
  - "MY READINGS"
  - "LOGOUT"
- Dropdown styling: Background #1A1F4B, border #D4714F

### 4.7 Modals & Overlays

#### Modal Container
- **Background**: #F5F3F0
- **Border**: 3px solid #3D3D3D
- **Border-radius**: 0px
- **Box-shadow**: 0 8px 32px rgba(0,0,0,0.3)
- **Max-width**: 500px (desktop), 90vw (mobile)
- **Padding**: 32px
- **Overlay/Backdrop**: Black, 50% opacity

#### Modal Title
- **Font-size**: 24px, bold
- **Color**: #2C3E7F
- **Margin-bottom**: 16px

#### Modal Content
- **Font-size**: 14px
- **Color**: #3D3D3D
- **Line-height**: 1.6
- **Margin-bottom**: 24px

#### Modal Buttons
- **Layout**: Flex, space-evenly or side-by-side
- **Spacing**: 12px between buttons
- **Button style**: Primary/Secondary as defined above
- **Min-width**: 120px each

### 4.8 Background & Visual Elements

#### Main Background (Home/Landing)
- **Gradient**: Deep navy (#2C3E7F) at top → lighter blue toward middle
- **Pixel art clouds**: Soft pink/rose (#E8B4A8) and cream
- **Starfield**: Small white/cream dots, scattered
- **Decorative elements**: Floating orbs or sparkles (optional animation)

#### Secondary Backgrounds
- **Content sections**: #F5F3F0 (cream) with subtle texture
- **Accent backgrounds**: Light sage/teal (#F0F3F2)
- **Dark sections**: #2C3E7F or #1A1F4B

#### Borders & Dividers
- **Standard border**: 2px solid #D4C5D9
- **Bold border**: 2px solid #3D3D3D
- **Decorative border**: Gold or rust color #D4714F
- **Divider line**: 1px solid #D4C5D9

#### Visual Decorations
- **Mystical elements**: Stars, moons, roses (pixel art)
- **Accent colors**: Rust (#D4714F) for highlights
- **Corners**: All sharp corners (no border-radius unless explicitly stated for buttons/inputs)

### 4.9 Responsive Breakpoints

#### Breakpoints
- **Mobile**: 0px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

#### Responsive Adjustments
- **Navigation**: Hamburger menu on mobile, full nav on desktop (or adjust based on space)
- **Card layout**: 
  - Mobile: 1 column (carousel view)
  - Tablet: 1-2 columns
  - Desktop: 3 columns side-by-side
- **Spacing**: Reduced padding/margins on mobile (16px instead of 24px)
- **Font sizes**: Slightly smaller on mobile (12px body instead of 14px)
- **Button min-width**: 100% width on mobile, auto on desktop

### 4.10 Animations & Transitions

#### General Transitions
- **Duration**: 0.3s (default), 0.5s (card flips), 2-3s (shuffles)
- **Timing function**: Ease-in-out for smooth feel
- **Properties**: Opacity, transform, background-color

#### Card Flip Animation
- **Type**: 3D transform rotate (Y-axis 180deg)
- **Duration**: 500ms
- **Effect**: Card appears to flip over
- **Easing**: ease-in-out

#### Shuffle Animation
- **Type**: Multiple cards moving across screen
- **Duration**: 2-3 seconds total
- **Path**: Cards rotate, translate, scale
- **Easing**: ease-in-out
- **Implementation**: CSS @keyframes or JavaScript animation

#### Hover States
- **Button hover**: Background color shift, slight scale (1.05x) optional
- **Link hover**: Color change to rose (#E8B4A8)
- **Card hover**: Optional slight scale or shadow on desktop

#### Loading States
- **Spinner**: Simple animated circle or dots
- **Color**: #8B4053 (burgundy)
- **Text**: "LOADING..." or "THE UNIVERSE IS THINKING..."
- **Duration**: Continuous until complete

---

## 5. Technical Requirements

### 5.1 Frontend Stack
- **Framework**: React.js
- **Styling**: CSS modules or Tailwind CSS (configured for pixel art aesthetic)
- **State Management**: React Context API or Zustand
- **HTTP Client**: Axios or Fetch API
- **Authentication**: Supabase Auth client
- **Responsive**: Mobile-first approach

### 5.2 Backend Stack
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Supabase email service (password reset)
- **APIs**: RESTful API (Supabase Auto-Generated or custom Edge Functions)

### 5.3 Database Schema

#### Users Table (Supabase Auth Managed)
- `id` (UUID, primary key)
- `email` (string, unique)
- `password_hash` (handled by Supabase)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### Cards Table
- `id` (integer, primary key)
- `name` (string): Card title
- `suit` (string): Major Arcana, Cups, Wands, Swords, Pentacles
- `number` (integer): Card position in deck (1-78)
- `upright_keywords` (text array or JSON): Keywords for upright orientation
- `reversed_keywords` (text array or JSON): Keywords for reversed orientation
- `image_url` (string): Path to card image
- `created_at` (timestamp)

#### Readings Table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key → users.id)
- `card_1_id` (integer, foreign key → cards.id)
- `card_1_orientation` (string): "UPRIGHT" or "REVERSED"
- `card_2_id` (integer, foreign key → cards.id)
- `card_2_orientation` (string): "UPRIGHT" or "REVERSED"
- `card_3_id` (integer, foreign key → cards.id)
- `card_3_orientation` (string): "UPRIGHT" or "REVERSED"
- `journal_entry` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### Analytics Table (Optional for MVP, can be added later)
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key → users.id)
- `card_id` (integer, foreign key → cards.id)
- `orientation` (string): "UPRIGHT" or "REVERSED"
- `draw_count` (integer)
- `last_drawn_at` (timestamp)

### 5.4 API Endpoints

#### Authentication
- `POST /auth/signup`: Register new user
- `POST /auth/login`: User login
- `POST /auth/logout`: User logout
- `POST /auth/reset-password`: Initiate password reset
- `POST /auth/reset-password-confirm`: Confirm password reset with token

#### Cards
- `GET /cards`: Fetch all cards (no auth required)
- `GET /cards/:id`: Fetch specific card

#### Readings
- `POST /readings`: Create new reading (requires auth)
- `GET /readings`: Get user's readings (requires auth)
- `GET /readings/:id`: Get specific reading details (requires auth)
- `PATCH /readings/:id`: Update reading (journal entry) (requires auth)
- `DELETE /readings/:id`: Delete reading (requires auth)

#### Analytics
- `GET /analytics/top-cards`: Get most drawn cards (requires auth)
- `GET /analytics/reading-frequency`: Get user reading stats (requires auth)

### 5.5 Environment Variables
```
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
VITE_API_BASE_URL=<your_api_base_url>
```

### 5.6 Security Considerations
- All sensitive data (passwords) handled by Supabase Auth
- JWT tokens for authenticated requests
- CORS configured for allowed domains only
- Password reset links expire after 24 hours
- SQL injection protection via Supabase ORM/query builder
- Rate limiting on authentication endpoints (to be configured)

---

## 6. User Flows

### 6.1 First-Time User (No Account)
1. Land on home page
2. See "CLICK THE DECK & REVEAL YOUR FATE" prompt
3. Click deck → shuffle animation → card reveal sequence
4. View all 3 cards with keywords
5. Can reshuffle as many times as desired
6. When ready to save: Click "Save Reading" → directed to sign-up
7. Create account → reading is saved with optional journal entry

### 6.2 Returning User (Logged In)
1. Land on home page
2. Navigation shows "MY READINGS" and user menu
3. Can perform a new reading
4. After cards reveal: "Save Reading" button appears
5. Click to save → modal confirms save → journal entry option appears
6. Can edit journal entry or skip
7. Reading added to history

### 6.3 View Reading History
1. Click "MY READINGS" in navigation
2. See list of all past readings with dates and card titles
3. Click reading to view full details
4. Can edit journal entry or delete reading

### 6.4 Password Reset
1. On login page, click "Forgot password?"
2. Enter email address
3. Check email for reset link
4. Click link → new password form
5. Submit new password → redirect to login
6. Login with new password

---

## 7. Success Metrics

### 7.1 User Engagement
- Number of readings per user per week
- User retention rate (30-day, 60-day)
- Journal entry completion rate

### 7.2 Technical Performance
- Page load time < 2 seconds
- Animation smoothness (60 FPS)
- API response time < 500ms

### 7.3 Conversion
- Sign-up rate from first reading
- Reading save rate (% of readings saved)
- Account creation from unauthenticated state

---

## 8. Constraints & Assumptions

### 8.1 Constraints
- No user-generated images (uses provided card art)
- No real-time multiplayer features
- Single language (English) for MVP
- No offline functionality

### 8.2 Assumptions
- Users have stable internet connection
- Labyrinthos website structure remains consistent for scraping
- Standard 78-card tarot deck is used
- Users access via modern browsers (Chrome, Safari, Firefox, Edge)

---

## 9. Deliverables & Timeline

### Phase 1: Core Setup
- Supabase project setup
- Database schema creation
- Card data population (including Labyrinthos scraping)
- Authentication flow implementation

### Phase 2: Frontend - Reading Experience
- Landing page UI
- Shuffle animation
- Card reveal sequence
- Desktop card display
- Mobile carousel view

### Phase 3: Frontend - Authentication
- Sign-up form
- Login form
- Password reset flow
- Navigation updates

### Phase 4: Frontend - Reading History
- My Readings page
- Reading detail view
- Journal entry editor
- Delete reading functionality

### Phase 5: Backend & Integration
- API endpoint creation
- Frontend-backend integration
- Analytics tracking
- Testing & refinement

### Phase 6: QA & Launch
- Cross-browser testing
- Mobile responsiveness testing
- Performance optimization
- Bug fixes & polish

---

## 10. Future Enhancements

- Shareable reading links with public gallery
- User dashboard with analytics visualization
- Card of the day feature
- Custom spread creation
- Dark mode
- Multi-language support
- Social features (following, sharing, comments)
- Mobile app (iOS/Android)
- Meditation/guided reflection audio
- Card combinations & advanced interpretations

---

## Appendix: Design Assets Reference

All design specifications outlined in Section 4 (Design System Specifications) should be maintained consistently across the entire application. Refer to color palette, typography, spacing, and component styles for all UI implementation.

Reference images and design system specifications provided in the design documentation package.
