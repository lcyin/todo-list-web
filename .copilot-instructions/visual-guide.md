Here are detailed visual specifications you can include in your AI prompts to generate better React UI code:

Color System
Color Palette
text
Primary Colors:
Primary: #2196F3 (blue)
Secondary: #FF9800 (orange accent)
Success: #4CAF50 (green for completed items)
Error: #F44336 (red for delete actions)
Warning: #FFC107 (yellow for pending states)
Neutral Colors:

Background: #FAFAFA (light gray)
Surface: #FFFFFF (white cards)
Text Primary: #212121 (dark gray)
Text Secondary: #757575 (medium gray)
Border: #E0E0E0 (light borders)
Color Usage Examples
text
"Use #2196F3 for primary buttons, #4CAF50 for completed todo checkmarks,
#F44336 for delete buttons, and #FAFAFA as the main background color.
Apply #FFFFFF to todo item cards with #E0E0E0 borders." 2. Typography Specifications
Font System
text
Font Family:

Primary: 'Inter', 'Segoe UI', system fonts
Monospace: 'Fira Code' (for any code elements)
Font Sizes:

H1 (App Title): 32px, font-weight: 700
H2 (Section Headers): 24px, font-weight: 600
Body Text: 16px, font-weight: 400
Small Text: 14px, font-weight: 400
Button Text: 14px, font-weight: 500
Line Heights:

Headers: 1.2
Body text: 1.5
Button text: 1.4
Typography in Prompts
text
"Use Inter font family throughout. App title should be 32px bold,
todo item text 16px normal weight, button text 14px medium weight.
Apply 1.5 line-height for readability."
Spacing and Layout
Spacing System (8px Grid)
text
Base Unit: 8px
Spacing Scale:

xs: 4px (tight spacing)
sm: 8px (small spacing)
md: 16px (medium spacing)
lg: 24px (large spacing)
xl: 32px (extra large spacing)
2xl: 48px (section spacing)
Container:

Max width: 800px
Padding: 24px on desktop, 16px on mobile
Margin: auto (centered)
Layout Specifications
text
"Use 8px grid system. Container max-width 800px centered with 24px padding.
Space todo items 16px apart. Use 32px margin between main sections.
Apply 8px internal padding to buttons and form fields."
Component Visual Details
Buttons
text
Primary Button:
Background: #2196F3
Text: white
Border-radius: 8px
Padding: 12px 24px
Font-weight: 500
Box-shadow: 0 2px 4px rgba(33, 150, 243, 0.2)
Hover: darken background by 10%
Secondary Button:

Background: transparent
Text: #2196F3
Border: 1px solid #2196F3
Same padding and radius as primary
Form Elements
text
Input Fields:
Border: 1px solid #E0E0E0
Border-radius: 8px
Padding: 12px 16px
Focus: border color #2196F3, box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2)
Placeholder: color #757575
Cards (Todo Items)
text
Todo Cards:
Background: white
Border: 1px solid #E0E0E0
Border-radius: 12px
Padding: 16px
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
Hover: lift with 0 2px 8px rgba(0, 0, 0, 0.15)
Visual Hierarchy & States
Interactive States
text
Normal State: Base styling
Hover State: Subtle elevation/color change
Active State: Slightly pressed appearance
Focus State: Outline ring for accessibility
Disabled State: 50% opacity, no pointer events
Completed Todos:

Text: line-through decoration
Opacity: 0.6
Checkbox: filled with success color
Visual Hierarchy
text
"Create clear visual hierarchy:
App header (largest, bold)
Add todo form (prominent, centered)
Todo items (cards with consistent sizing)
Action buttons (smaller, right-aligned)
Use size, color, and spacing to establish importance order." 6. Responsive Design Specifications
Breakpoints
text
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px

Mobile Changes:

Reduce container padding to 16px
Stack buttons vertically
Increase touch targets to minimum 44px
Reduce font sizes by 10-15%
Animation & Transitions
Micro-interactions
text
Transitions:
All interactions: 200ms ease-in-out
Button hover: transform scale(1.02)
Card hover: translate y(-2px)
Todo completion: fade-in checkmark animation
Add/remove items: 300ms slide animation
Comprehensive Visual Prompt Example
text
"Create a React todo app with these visual specifications:
COLORS: Use blue (#2196F3) primary theme, white cards on light gray (#FAFAFA) background, green (#4CAF50) for completed states, red (#F44336) for delete actions.

TYPOGRAPHY: Inter font family, 32px bold app title, 16px body text, 14px buttons. Line-height 1.5 for readability.

LAYOUT: 800px max-width container, centered with 24px padding. 8px spacing grid - use 16px between todo items, 32px between sections.

COMPONENTS:

Rounded buttons (8px radius) with 12px vertical, 24px horizontal padding
Todo cards: white background, 12px rounded corners, 16px internal padding, subtle shadow
Input fields: 8px rounded, 12px padding, blue focus ring
INTERACTIONS: Smooth 200ms transitions on all hover states. Completed todos show strikethrough with reduced opacity. Buttons lift slightly on hover.

RESPONSIVE: Stack elements vertically on mobile, reduce padding to 16px, ensure 44px minimum touch targets."
This level of detail will help AI generate much more polished and consistent React UI code that matches modern design standards, especially given your TypeScript and React experience.
s
