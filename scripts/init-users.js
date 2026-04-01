const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qzolxhegytfryuomjcsw.supabase.co';
const supabaseKey = 'sb_publishable_iISvDBItSzarWFbKWC9ngA_4-EhMmGz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function setup() {
    console.log("🏁 Starting User Initialization...");

    const users = [
        { email: 'admin@retail.com', password: 'Admin123!', role: 'admin', name: 'Master Admin' },
        { email: 'customer@retail.com', password: 'Customer123!', role: 'customer', name: 'John Customer' }
    ];

    for (const u of users) {
        console.log(`\nCreating ${u.role}: ${u.email}...`);

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: u.email,
            password: u.password,
        });

        if (authError) {
            if (authError.message.includes("already registered")) {
                const { data: loginData } = await supabase.auth.signInWithPassword({
                    email: u.email,
                    password: u.password
                });
                if (loginData && loginData.user) {
                    await createProfile(loginData.user.id, u);
                }
            } else {
                console.error(`❌ Auth Error for ${u.email}:`, authError.message);
            }
            continue;
        }

        if (authData.user) {
            console.log(`✅ Auth account created for ${u.email}`);
            await createProfile(authData.user.id, u);
        }
    }
    console.log("\n✨ Initialization Complete!");
}

async function createProfile(id, user) {
    const { error: profError } = await supabase
        .from('profiles')
        .upsert({
            id: id,
            username: user.email,
            full_name: user.name,
            role: user.role
        });

    if (profError) {
        console.error(`❌ Profile Error for ${user.email}:`, profError.message);
    } else {
        console.log(`✅ Profile updated for ${user.role} (${user.email})`);
    }
}

setup();
