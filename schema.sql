-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create properties table
create table public.properties (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text,
    price text not null,
    location text not null,
    bhk text not null,
    type text not null,
    images text[] default '{}',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.properties enable row level security;

-- Create policies
create policy "Properties are viewable by everyone."
    on properties for select
    using ( true );

create policy "Anyone can insert a property (for now)"
    on properties for insert
    with check ( true );

-- Insert some mock data for testing
insert into public.properties (title, description, price, location, bhk, type, images)
values 
('Modern 2BHK Apartment in Koramangala', 'A beautiful and spacious 2BHK apartment available for rent.', '₹45,000 / month', 'Koramangala, Bangalore', '2', 'Rent', ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800']),
('Luxury Villa with Private Garden', 'Spacious villa in Whitefield.', '₹2.5 Cr', 'Whitefield, Bangalore', '4+', 'Sale', ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800']);
