# Admin UI Components

This directory contains reusable admin UI components for the Ayurveda for Travelers admin panel.

## Components

### AdminCard
A stat card component for displaying key metrics and statistics.

**Props:**
- `title` (string): The card title
- `value` (string): The main value to display
- `change` (string): The change indicator (e.g., "+12%")
- `changeType` (string): "positive" or "negative" for styling
- `icon` (Component): Icon component to display
- `onClick` (function): Optional click handler
- `className` (string): Additional CSS classes
- `delay` (number): Animation delay in seconds

**Example:**
```jsx
<AdminCard
  title="Total Bookings"
  value="1,234"
  change="+12%"
  changeType="positive"
  icon={Calendar}
  delay={0.1}
/>
```

### AdminTable
A comprehensive table component with built-in actions and status styling.

**Props:**
- `data` (array): Array of objects to display
- `columns` (array): Column configuration
- `onEdit` (function): Edit handler
- `onDelete` (function): Delete handler
- `onView` (function): View handler
- `showActions` (boolean): Show action buttons
- `title` (string): Table title
- `actions` (array): Additional action buttons

**Example:**
```jsx
<AdminTable
  title="Recent Bookings"
  data={bookings}
  columns={[
    { key: 'customer', title: 'Customer' },
    { key: 'status', title: 'Status' }
  ]}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### AdminForm
A flexible form component with various field types.

**Props:**
- `title` (string): Form title
- `fields` (array): Field configuration
- `initialData` (object): Initial form values
- `onSubmit` (function): Submit handler
- `onCancel` (function): Cancel handler
- `loading` (boolean): Loading state
- `showActions` (boolean): Show form actions

**Field Types:**
- `text`, `email`, `password`, `number`, `date`, `time`
- `select` (with options array)
- `textarea`
- `checkbox`
- `file`

**Example:**
```jsx
<AdminForm
  title="New Booking"
  fields={[
    { name: 'customer', label: 'Customer', type: 'text', required: true },
    { name: 'treatment', label: 'Treatment', type: 'select', options: [...] }
  ]}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
/>
```

### AdminSidebar
Navigation sidebar component with mobile support.

**Props:**
- `isOpen` (boolean): Sidebar open state
- `onClose` (function): Close handler
- `isMobile` (boolean): Mobile mode flag

### AdminHeader
Top navigation header with search, notifications, and user menu.

**Props:**
- `title` (string): Page title
- `onMenuClick` (function): Mobile menu handler
- `user` (object): User information

## Usage

Import components from the admin index:

```jsx
import { AdminCard, AdminTable, AdminForm, AdminSidebar, AdminHeader } from '../components/admin'
```

## Styling

All components use Tailwind CSS classes and are designed to work with the existing design system. They include:

- Responsive design
- Dark/light mode support
- Smooth animations with Framer Motion
- Consistent spacing and typography
- Accessibility features

## Features

- **Responsive**: Works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Animated**: Smooth transitions and micro-interactions
- **Customizable**: Extensive prop options for customization
- **Consistent**: Unified design language across all components
