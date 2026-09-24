-- Pizza Atelier Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. MENU ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- 'pizza', 'sides', 'drinks', 'desserts'
  price DECIMAL(8, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_signature BOOLEAN DEFAULT false, -- For signature pizzas
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for category filtering
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);

-- ============================================
-- 2. CUSTOMERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for email lookup
CREATE INDEX idx_customers_email ON customers(email);

-- ============================================
-- 3. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  order_number VARCHAR(50) UNIQUE NOT NULL, -- For customer reference
  total_amount DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(8, 2) DEFAULT 0,
  grand_total DECIMAL(10, 2) NOT NULL,
  fulfillment_type VARCHAR(20) NOT NULL, -- 'delivery' or 'pickup'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'
  delivery_address TEXT,
  special_instructions TEXT,
  estimated_time TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for order lookups
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- ============================================
-- 4. ORDER ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(8, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for order item lookups
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_menu_item_id ON order_items(menu_item_id);

-- ============================================
-- 5. RESERVATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  reservation_date DATE NOT NULL,
  reservation_time VARCHAR(5) NOT NULL, -- Format: HH:MM
  party_size INTEGER NOT NULL,
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  confirmed_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for reservation lookups
CREATE INDEX idx_reservations_customer_id ON reservations(customer_id);
CREATE INDEX idx_reservations_reservation_date ON reservations(reservation_date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_customer_email ON reservations(customer_email);

-- ============================================
-- 6. CONTACT MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  message_type VARCHAR(50), -- 'general', 'catering', 'feedback', 'complaint'
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'read', 'replied'
  replied_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for message lookups
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- ============================================
-- 7. GALLERY TABLE (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(100), -- 'pizza', 'oven', 'interior', 'ingredients', 'staff', etc.
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for category
CREATE INDEX idx_gallery_items_category ON gallery_items(category);

-- ============================================
-- 8. REVIEWS TABLE (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for review lookups
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_order_id ON reviews(order_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- ============================================
-- 9. STAFF/ADMIN TABLE (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS staff (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'admin', 'manager', 'chef', 'staff'
  password_hash VARCHAR(255), -- Store hashed passwords
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SAMPLE DATA - Menu Items
-- ============================================
INSERT INTO menu_items (name, description, category, price, is_signature)
VALUES
  ('Margherita', 'San Marzano tomato, fresh mozzarella, basil, olive oil', 'pizza', 14.99, true),
  ('Pepperoni', 'Mozzarella, pepperoni, tomato sauce', 'pizza', 15.99, false),
  ('Burrata', 'Fresh burrata, prosciutto, arugula, pine nuts', 'pizza', 18.99, true),
  ('BBQ Chicken', 'BBQ sauce, grilled chicken, red onion, cilantro', 'pizza', 16.99, false),
  ('Mediterranean', 'Olives, feta cheese, sun-dried tomatoes, spinach', 'pizza', 15.99, false),
  ('Truffle', 'Ricotta, truffle oil, mushrooms, garlic', 'pizza', 19.99, true),

  ('Garlic Bread', 'Toasted ciabatta with garlic and herb butter', 'sides', 4.99, false),
  ('Calamari Fritti', 'Golden fried squid with marinara sauce', 'sides', 8.99, false),

  ('Espresso', 'Double shot of Italian espresso', 'drinks', 2.99, false),
  ('House Wine', 'Rosso di Montalcino', 'drinks', 8.99, false),

  ('Tiramisu', 'Classic Italian dessert with mascarpone and coffee', 'desserts', 6.99, false),
  ('Panna Cotta', 'Creamy Italian custard with berry compote', 'desserts', 7.99, false);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (Optional but Recommended)
-- ============================================
-- You can enable RLS policies for security. Example:
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view their own orders"
-- ON orders FOR SELECT USING (auth.uid()::text = customer_id::text);
