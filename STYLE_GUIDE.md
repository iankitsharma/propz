# LandConnect Style Guide

## Brand Identity

### Logo Usage
- **Primary Logo**: LandConnect with map pin icon
- **Minimum Size**: 120px width for digital, 1 inch for print
- **Clear Space**: Minimum 24px on all sides
- **Backgrounds**: Use on white, light gray, or dark backgrounds with appropriate contrast

### Brand Voice
- **Professional yet approachable**
- **Trustworthy and reliable**
- **Clear and concise communication**
- **Solution-oriented messaging**

---

## Color System

### Primary Palette
```css
/* Primary Emerald */
--emerald-50: #ECFDF5;
--emerald-100: #D1FAE5;
--emerald-200: #A7F3D0;
--emerald-300: #6EE7B7;
--emerald-400: #34D399;
--emerald-500: #10B981;  /* Primary Brand Color */
--emerald-600: #059669;  /* Primary Dark */
--emerald-700: #047857;
--emerald-800: #065F46;
--emerald-900: #064E3B;
```

### Secondary Palette
```css
/* Neutral Grays */
--gray-50: #F8FAFC;
--gray-100: #F1F5F9;
--gray-200: #E2E8F0;
--gray-300: #CBD5E1;
--gray-400: #94A3B8;
--gray-500: #64748B;
--gray-600: #475569;  /* Primary Text */
--gray-700: #334155;
--gray-800: #1E293B;
--gray-900: #0F172A;
```

### Semantic Colors
```css
/* Success */
--success-light: #D1FAE5;
--success: #22C55E;
--success-dark: #16A34A;

/* Warning */
--warning-light: #FEF3C7;
--warning: #F59E0B;
--warning-dark: #D97706;

/* Error */
--error-light: #FEE2E2;
--error: #EF4444;
--error-dark: #DC2626;

/* Info */
--info-light: #DBEAFE;
--info: #3B82F6;
--info-dark: #2563EB;
```

### Color Usage Guidelines

#### Primary Actions
- Use `emerald-600` for primary buttons and key CTAs
- Use `emerald-500` for links and secondary actions
- Use `emerald-100` for hover states and backgrounds

#### Text Hierarchy
- **Primary Text**: `gray-900` for headings
- **Secondary Text**: `gray-600` for body text
- **Tertiary Text**: `gray-500` for captions and meta information
- **Muted Text**: `gray-400` for disabled states

#### Backgrounds
- **Page Background**: `gray-50`
- **Card Background**: `white`
- **Section Background**: `gray-100`
- **Hover Background**: `gray-50`

---

## Typography

### Font Family
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Type Scale
```css
/* Headings */
.text-5xl { font-size: 3rem; line-height: 1.2; }      /* 48px */
.text-4xl { font-size: 2.25rem; line-height: 1.25; }  /* 36px */
.text-3xl { font-size: 1.875rem; line-height: 1.3; }  /* 30px */
.text-2xl { font-size: 1.5rem; line-height: 1.33; }   /* 24px */
.text-xl { font-size: 1.25rem; line-height: 1.4; }    /* 20px */
.text-lg { font-size: 1.125rem; line-height: 1.44; }  /* 18px */

/* Body Text */
.text-base { font-size: 1rem; line-height: 1.5; }     /* 16px */
.text-sm { font-size: 0.875rem; line-height: 1.43; }  /* 14px */
.text-xs { font-size: 0.75rem; line-height: 1.5; }    /* 12px */
```

### Font Weights
```css
.font-light { font-weight: 300; }     /* Light */
.font-normal { font-weight: 400; }    /* Regular */
.font-medium { font-weight: 500; }    /* Medium */
.font-semibold { font-weight: 600; }  /* Semibold */
.font-bold { font-weight: 700; }      /* Bold */
```

### Usage Guidelines

#### Headings
- **H1**: `text-5xl font-bold` for page titles
- **H2**: `text-4xl font-semibold` for section headers
- **H3**: `text-2xl font-semibold` for subsection headers
- **H4**: `text-xl font-medium` for card titles

#### Body Text
- **Large Body**: `text-lg font-normal` for important descriptions
- **Regular Body**: `text-base font-normal` for standard content
- **Small Body**: `text-sm font-normal` for secondary information
- **Caption**: `text-xs font-medium` for labels and metadata

---

## Spacing System

### Base Unit: 4px (0.25rem)

```css
/* Spacing Scale */
.space-1 { margin/padding: 0.25rem; }   /* 4px */
.space-2 { margin/padding: 0.5rem; }    /* 8px */
.space-3 { margin/padding: 0.75rem; }   /* 12px */
.space-4 { margin/padding: 1rem; }      /* 16px */
.space-5 { margin/padding: 1.25rem; }   /* 20px */
.space-6 { margin/padding: 1.5rem; }    /* 24px */
.space-8 { margin/padding: 2rem; }      /* 32px */
.space-10 { margin/padding: 2.5rem; }   /* 40px */
.space-12 { margin/padding: 3rem; }     /* 48px */
.space-16 { margin/padding: 4rem; }     /* 64px */
.space-20 { margin/padding: 5rem; }     /* 80px */
.space-24 { margin/padding: 6rem; }     /* 96px */
```

### Layout Spacing
- **Component Padding**: 16px (space-4) minimum
- **Card Padding**: 24px (space-6) standard
- **Section Spacing**: 48px (space-12) between major sections
- **Element Spacing**: 8px (space-2) between related elements

---

## Component Specifications

### Buttons

#### Primary Button
```css
background: linear-gradient(135deg, #10B981, #059669);
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 500;
font-size: 16px;
box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
transition: all 0.2s ease;

/* Hover State */
transform: translateY(-1px);
box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);

/* Active State */
transform: translateY(0);
box-shadow: 0 1px 2px rgba(16, 185, 129, 0.2);

/* Disabled State */
background: #E2E8F0;
color: #94A3B8;
cursor: not-allowed;
```

#### Secondary Button
```css
background: transparent;
color: #10B981;
border: 2px solid #10B981;
padding: 10px 22px; /* Adjusted for border */
border-radius: 8px;
font-weight: 500;
font-size: 16px;
transition: all 0.2s ease;

/* Hover State */
background: #10B981;
color: white;
```

#### Button Sizes
```css
/* Small */
padding: 8px 16px;
font-size: 14px;
border-radius: 6px;

/* Medium (Default) */
padding: 12px 24px;
font-size: 16px;
border-radius: 8px;

/* Large */
padding: 16px 32px;
font-size: 18px;
border-radius: 8px;
```

### Cards

#### Standard Card
```css
background: white;
border-radius: 12px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
border: 1px solid #E2E8F0;
padding: 24px;
transition: all 0.2s ease;

/* Hover State */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
transform: translateY(-2px);
```

#### Property Card
```css
background: white;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
border: 1px solid #E2E8F0;
transition: all 0.2s ease;

/* Image Container */
aspect-ratio: 16/9;
overflow: hidden;

/* Content Padding */
padding: 20px;

/* Hover State */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
transform: translateY(-4px);
```

### Form Elements

#### Input Fields
```css
background: white;
border: 2px solid #E2E8F0;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
line-height: 1.5;
transition: all 0.2s ease;

/* Focus State */
border-color: #10B981;
box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
outline: none;

/* Error State */
border-color: #EF4444;
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);

/* Disabled State */
background: #F8FAFC;
border-color: #E2E8F0;
color: #94A3B8;
```

#### Labels
```css
font-weight: 500;
font-size: 14px;
color: #374151;
margin-bottom: 6px;
display: block;
```

#### Help Text
```css
font-size: 12px;
color: #6B7280;
margin-top: 4px;
```

#### Error Text
```css
font-size: 12px;
color: #EF4444;
margin-top: 4px;
font-weight: 500;
```

---

## Icons

### Icon System
- **Library**: Lucide React
- **Size**: 16px, 20px, 24px standard sizes
- **Color**: Inherit from parent text color
- **Stroke Width**: 2px for consistency

### Common Icons
```tsx
// Navigation
<Menu /> <X /> <Search /> <Bell /> <User />

// Actions  
<Plus /> <Edit /> <Trash /> <Share /> <Heart />

// Status
<Check /> <X /> <AlertCircle /> <Info /> <Star />

// Property
<MapPin /> <Home /> <Maximize /> <Calendar /> <Eye />

// Communication
<Phone /> <Mail /> <MessageCircle /> <Video />
```

### Icon Usage Guidelines
- Use 16px icons for inline text elements
- Use 20px icons for buttons and form elements  
- Use 24px icons for navigation and section headers
- Maintain consistent stroke width (2px)
- Use semantic colors (success, warning, error) when appropriate

---

## Animation Guidelines

### Micro-interactions
```css
/* Standard Transition */
transition: all 0.2s ease;

/* Smooth Hover Effects */
transition: transform 0.2s ease, box-shadow 0.2s ease;

/* Button Press Effect */
transform: scale(0.98);
transition: transform 0.1s ease;

/* Loading Pulse */
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

### Page Transitions
- **Duration**: 300ms for page transitions
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth animations
- **Fade Effects**: Use opacity transitions for content loading
- **Slide Effects**: Use transform translateX/Y for navigation

### Performance Guidelines
- Use `transform` and `opacity` for animations
- Avoid animating layout properties (width, height, margin)
- Use `will-change` sparingly and remove after animation
- Prefer CSS animations over JavaScript for simple effects

---

## Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
/* Small devices (phones) */
@media (min-width: 640px) { ... }

/* Medium devices (tablets) */
@media (min-width: 768px) { ... }

/* Large devices (desktops) */
@media (min-width: 1024px) { ... }

/* Extra large devices */
@media (min-width: 1280px) { ... }
```

### Layout Guidelines

#### Mobile (320px - 767px)
- Single column layout
- 16px side margins
- Touch-friendly 44px minimum tap targets
- Stack elements vertically
- Hide secondary navigation in hamburger menu

#### Tablet (768px - 1023px)
- Two-column layout for content
- 24px side margins
- Show condensed navigation
- Use card layouts for content organization

#### Desktop (1024px+)
- Multi-column layouts
- 32px+ side margins
- Full navigation visible
- Hover states for interactive elements
- Sidebar layouts for complex pages

---

## Accessibility Standards

### Color Contrast
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **Interactive Elements**: Minimum 3:1 contrast ratio

### Focus States
```css
/* Focus Ring */
outline: 2px solid #10B981;
outline-offset: 2px;

/* Alternative Focus Ring */
box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.5);
```

### Interactive Elements
- Minimum 44px × 44px touch targets
- Clear visual feedback for all interactions
- Keyboard navigation support
- Screen reader friendly markup

### ARIA Guidelines
- Use semantic HTML elements
- Provide ARIA labels for complex interactions
- Include skip navigation links
- Ensure proper heading hierarchy
- Add alt text for all images

---

## Usage Examples

### Implementing the Style Guide

#### Component Example
```tsx
// Button component following style guide
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 focus:ring-emerald-500',
    secondary: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

#### Layout Example
```tsx
// Page layout following spacing guidelines
export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
```

This style guide ensures consistent implementation across the entire LandConnect platform while maintaining design quality and user experience standards.