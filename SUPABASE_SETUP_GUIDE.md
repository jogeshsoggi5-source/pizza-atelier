# Supabase Setup Guide for Pizza Atelier

## Step-by-Step Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click **"New Project"**
3. Enter project details:
   - **Project Name:** pizza-atelier
   - **Database Password:** Create a strong password (save it safely!)
   - **Region:** Choose closest to your users
4. Click **"Create new project"** and wait 2-3 minutes for setup

### 2. Get Your Supabase Credentials

1. Go to **Settings → API** in your Supabase dashboard
2. Copy these values:
   - **Project URL** (starts with `https://...supabase.co`)
   - **anon public key** (in API Keys section)
   - **service_role key** (in API Keys section - keep this secret!)

### 3. Update Your Environment Variables

Create/update your `.env.local` file with:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Replace with your actual values from step 2.

### 4. Run the Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Open `supabase_schema.sql` from this project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click **"RUN"** to execute
7. Wait for confirmation message

### 5. Update Your Environment in Vercel

1. Go to your Vercel project settings
2. Navigate to **Settings → Environment Variables**
3. Add these variables:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```
4. Click **Save**
5. Redeploy your project

### 6. Test the Connection

1. Update `src/lib/supabase.ts` to verify connection:
   ```typescript
   console.log('Supabase initialized:', !!supabase);
   ```
2. Push the changes to GitHub
3. Check the Vercel deployment logs to confirm connection

---

## Database Schema Overview

### Tables Created:

#### `menu_items`
- Store all pizzas, sides, drinks, desserts
- Fields: name, description, category, price, image_url, is_available, is_signature
- **Sample data included** (Margherita, Pepperoni, etc.)

#### `customers`
- Store customer information
- Fields: email, name, phone, address, city, state, zip_code

#### `orders`
- Store all customer orders
- Fields: customer_id, order_number, total_amount, delivery_fee, fulfillment_type, status
- Statuses: pending, confirmed, preparing, ready, completed, cancelled

#### `order_items`
- Items within each order
- Fields: order_id, menu_item_id, quantity, unit_price, subtotal
- Links orders to specific menu items

#### `reservations`
- Store table reservation requests
- Fields: customer_name, customer_email, reservation_date, reservation_time, party_size
- Statuses: pending, confirmed, completed, cancelled

#### `contact_messages`
- Store contact form submissions
- Fields: name, email, subject, message, message_type, status

#### `gallery_items` (Optional)
- Store gallery images
- Fields: title, description, image_url, category

#### `reviews` (Optional)
- Store customer reviews
- Fields: customer_id, rating (1-5), title, comment

#### `staff` (Optional)
- Store admin/staff accounts
- Fields: name, email, role, password_hash

---

## Next Steps: Connect to Your App

### 1. Create Supabase Helper Functions

Create `src/lib/supabase-queries.ts`:

```typescript
import { supabase } from './supabase'

// Get all menu items
export const getMenuItems = async () => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true)
  return { data, error }
}

// Get signature pizzas
export const getSignaturePizzas = async () => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_signature', true)
    .eq('category', 'pizza')
  return { data, error }
}

// Create an order
export const createOrder = async (orderData: any) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
  return { data, error }
}

// Create reservation
export const createReservation = async (reservationData: any) => {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservationData])
    .select()
  return { data, error }
}

// Save contact message
export const saveContactMessage = async (messageData: any) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([messageData])
    .select()
  return { data, error }
}
```

### 2. Update Order Route

Replace mock data in `src/routes/order.tsx`:

```typescript
import { createOrder } from '@/lib/supabase-queries'

// In handleSubmit:
const orderData = {
  customer_id: customerId, // Get from auth or form
  order_number: `ORD-${Date.now()}`,
  total_amount: total,
  delivery_fee: fulfillment === 'delivery' ? DELIVERY_FEE : 0,
  grand_total: grandTotal,
  fulfillment_type: fulfillment,
  status: 'pending',
  delivery_address: deliveryAddress,
  special_instructions: notes,
}

const { data: order, error } = await createOrder(orderData)
if (error) {
  toast.error('Failed to place order')
} else {
  setPlacedOrder(order.id)
}
```

### 3. Update Reservations Route

```typescript
import { createReservation } from '@/lib/supabase-queries'

// In handleSubmit:
const reservationData = {
  customer_name: name,
  customer_email: email,
  customer_phone: phone,
  reservation_date: date,
  reservation_time: time,
  party_size: partySize,
  special_requests: notes,
  status: 'pending',
}

const { data, error } = await createReservation(reservationData)
```

---

## Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use Row Level Security (RLS)** - Enable RLS policies in Supabase for user isolation
3. **Keep service role key private** - Only use on backend/server functions
4. **Use anon key for client-side** - Safe to expose in browser
5. **Validate all inputs** - Server-side validation is crucial
6. **Use HTTPS only** - Vercel provides this by default

---

## Useful Supabase Features

### Real-time Updates
```typescript
const subscription = supabase
  .on('postgres_changes', 
       { event: '*', schema: 'public', table: 'orders' },
       (payload) => console.log('Order updated:', payload))
  .subscribe()
```

### Authentication
```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})
```

### File Storage (for images)
```typescript
const { data, error } = await supabase.storage
  .from('images')
  .upload(`menu/${fileName}`, file)
```

---

## Troubleshooting

**Error: "Missing Supabase environment variables"**
- Check `.env.local` has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- Restart dev server after changing .env.local

**Error: "Failed to connect to database"**
- Verify connection string is correct
- Check Supabase project is active
- Ensure database is not paused in Supabase settings

**No data appearing:**
- Confirm SQL schema was executed successfully
- Check RLS policies aren't blocking queries
- Verify API keys are correct

---

## Support

- Supabase Docs: https://supabase.com/docs
- Contact your Supabase project support
- Check Supabase Discord community

