const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qzolxhegytfryuomjcsw.supabase.co';
const supabaseKey = 'sb_publishable_iISvDBItSzarWFbKWC9ngA_4-EhMmGz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
    console.log("🔍 Checking your database...\n");

    // Check products
    console.log("📦 Checking products table...");
    const { data: products, error: prodError } = await supabase
        .from('products')
        .select('*');

    if (prodError) {
        console.error("❌ Error reading products:", prodError.message);
    } else {
        console.log(`✅ Found ${products.length} products`);
        if (products.length > 0) {
            console.log("   Sample:", products[0].name);
        }
    }

    // Check suppliers
    console.log("\n🚚 Checking suppliers table...");
    const { data: suppliers, error: supError } = await supabase
        .from('suppliers')
        .select('*');

    if (supError) {
        console.error("❌ Error reading suppliers:", supError.message);
    } else {
        console.log(`✅ Found ${suppliers.length} suppliers`);
        if (suppliers.length > 0) {
            console.log("   Sample:", suppliers[0].name || suppliers[0].company_name);
        }
    }

    // Check profiles
    console.log("\n👥 Checking profiles table...");
    const { data: profiles, error: profError } = await supabase
        .from('profiles')
        .select('*');

    if (profError) {
        console.error("❌ Error reading profiles:", profError.message);
    } else {
        console.log(`✅ Found ${profiles.length} profiles`);
        if (profiles.length > 0) {
            console.log("   Sample:", profiles[0].username);
        }
    }

    console.log("\n" + "=".repeat(50));
    console.log("SUMMARY:");
    console.log("=".repeat(50));
    console.log(`Products: ${products?.length || 0}`);
    console.log(`Suppliers: ${suppliers?.length || 0}`);
    console.log(`Profiles: ${profiles?.length || 0}`);
    console.log("=".repeat(50));

    if ((products?.length || 0) === 0) {
        console.log("\n⚠️  No products found! Run: node add-data-fixed.js");
    }
}

checkDatabase();
