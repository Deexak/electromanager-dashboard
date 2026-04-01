const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qzolxhegytfryuomjcsw.supabase.co';
const supabaseKey = 'sb_publishable_iISvDBItSzarWFbKWC9ngA_4-EhMmGz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function addSampleData() {
    console.log("🚀 Adding sample data to your database...\n");

    // Add sample products
    console.log("📦 Adding sample products...");
    const { data: products, error: prodError } = await supabase
        .from('products')
        .insert([
            {
                name: 'iPhone 15 Pro',
                description: 'Latest Apple flagship with A17 Pro chip',
                price: 999.99,
                stock_quantity: 25
            },
            {
                name: 'Samsung Galaxy S24',
                description: 'Premium Android smartphone with AI features',
                price: 899.99,
                stock_quantity: 30
            },
            {
                name: 'MacBook Air M3',
                description: '13-inch laptop with M3 chip, 8GB RAM',
                price: 1299.99,
                stock_quantity: 15
            },
            {
                name: 'Sony WH-1000XM5',
                description: 'Premium noise-cancelling headphones',
                price: 399.99,
                stock_quantity: 50
            },
            {
                name: 'iPad Pro 12.9"',
                description: 'Powerful tablet with M2 chip',
                price: 1099.99,
                stock_quantity: 20
            },
            {
                name: 'Dell XPS 15',
                description: 'High-performance Windows laptop',
                price: 1599.99,
                stock_quantity: 12
            },
            {
                name: 'AirPods Pro',
                description: 'Active noise cancellation earbuds',
                price: 249.99,
                stock_quantity: 75
            }
        ])
        .select();

    if (prodError) {
        console.error("❌ Error adding products:", prodError.message);
    } else {
        console.log(`✅ Added ${products.length} sample products!\n`);
    }

    // Add sample suppliers - MATCHING YOUR TABLE STRUCTURE
    console.log("🚚 Adding sample suppliers...");
    const { data: suppliers, error: supError } = await supabase
        .from('suppliers')
        .insert([
            {
                name: 'Apple Distribution Center',
                contact_name: 'Sarah Johnson',
                email: 'sarah@apple-dist.com',
                phone: '+1-555-0123'
            },
            {
                name: 'Samsung Electronics Supply',
                contact_name: 'Michael Chen',
                email: 'michael@samsung-supply.com',
                phone: '+1-555-0456'
            },
            {
                name: 'Tech Wholesale Inc',
                contact_name: 'Emily Davis',
                email: 'emily@techwholesale.com',
                phone: '+1-555-0789'
            },
            {
                name: 'Global Electronics',
                contact_name: 'Robert Martinez',
                email: 'robert@globalelec.com',
                phone: '+1-555-0321'
            },
            {
                name: 'Premium Audio Supplies',
                contact_name: 'Lisa Anderson',
                email: 'lisa@premiumaudio.com',
                phone: '+1-555-0654'
            }
        ])
        .select();

    if (supError) {
        console.error("❌ Error adding suppliers:", supError.message);
    } else {
        console.log(`✅ Added ${suppliers.length} sample suppliers!\n`);
    }

    if (!prodError && !supError) {
        console.log("✨ Sample data added successfully!");
        console.log("\n📌 Next steps:");
        console.log("1. Refresh your dashboard at http://localhost:3000/dashboard.html");
        console.log("2. Navigate to 'Inventory' to see products");
        console.log("3. Navigate to 'Suppliers' to see suppliers");
        console.log("4. Navigate to 'Customers' to see user profiles\n");
    } else {
        console.log("\n⚠️  Some errors occurred. Check the messages above.");
    }
}

addSampleData();
