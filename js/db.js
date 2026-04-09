/**
 * ElectroManager Supabase Database Service (Hybrid Cache Model)
 * Fetching strictly from Supabase, but providing a synchronous interface for UI speed.
 */

const supabaseUrl = 'https://qzolxhegytfryuomjcsw.supabase.co';
const supabaseKey = 'sb_publishable_iISvDBItSzarWFbKWC9ngA_4-EhMmGz';

const getSupabase = () => {
    return window.supabase ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;
};

const db = {
    _cache: {
        products: [],
        suppliers: [],
        profiles: [],
        orders: []
    },

    // Await this at the start of app navigation/login
    initFromSupabase: async () => {
        const sb = getSupabase();
        if (!sb) return;
        try {
            const [pRes, sRes, prRes, oRes] = await Promise.all([
                sb.from('products').select('*'),
                sb.from('suppliers').select('*'),
                sb.from('profiles').select('*'),
                sb.from('orders').select('*')
            ]);
            if (pRes.data) db._cache.products = pRes.data;
            if (sRes.data) db._cache.suppliers = sRes.data.map(x => ({ ...x, name: x.company_name }));
            if (prRes.data) db._cache.profiles = prRes.data;
            if (oRes.data) db._cache.orders = oRes.data;
            console.log("Supabase data synchronized deeply.");
        } catch (e) {
            console.error("Supabase sync failed:", e);
        }
    },

    products: {
        getAll: () => db._cache.products,
        getById: (id) => db._cache.products.find(p => String(p.id) === String(id)),
        save: async (product) => {
            const sb = getSupabase();
            const isNew = !product.id || String(product.id).trim() === "";
            
            // local push
            if (isNew) {
                product.id = 'temp_' + Date.now();
                db._cache.products.push(product);
            } else {
                const idx = db._cache.products.findIndex(p => String(p.id) === String(product.id));
                if (idx > -1) db._cache.products[idx] = { ...db._cache.products[idx], ...product };
            }

            // remote push
            const payload = { ...product };
            if (String(payload.id).startsWith('temp_')) delete payload.id;
            
            if (sb) {
                const { data } = await sb.from('products').upsert(payload).select();
                if (data && data[0] && isNew) {
                    const tempIdx = db._cache.products.findIndex(p => p.id === product.id);
                    if (tempIdx > -1) db._cache.products[tempIdx] = data[0];
                }
            }
            return product;
        },
        delete: async (id) => {
            db._cache.products = db._cache.products.filter(p => String(p.id) !== String(id));
            const sb = getSupabase();
            if (sb && !String(id).startsWith('temp_')) await sb.from('products').delete().eq('id', id);
        }
    },

    suppliers: {
        getAll: () => db._cache.suppliers,
        getById: (id) => db._cache.suppliers.find(s => String(s.id) === String(id)),
        save: async (supplier) => {
            const sb = getSupabase();
            const isNew = !supplier.id || String(supplier.id).trim() === "";
            
            if (isNew) {
                supplier.id = 'temp_' + Date.now();
                db._cache.suppliers.push(supplier);
            } else {
                const idx = db._cache.suppliers.findIndex(s => String(s.id) === String(supplier.id));
                if (idx > -1) db._cache.suppliers[idx] = { ...db._cache.suppliers[idx], ...supplier };
            }

            const payload = { ...supplier, company_name: supplier.name };
            delete payload.name;
            if (String(payload.id).startsWith('temp_')) delete payload.id;

            if (sb) {
                const { data } = await sb.from('suppliers').upsert(payload).select();
                if (data && data[0] && isNew) {
                    const tempIdx = db._cache.suppliers.findIndex(s => s.id === supplier.id);
                    if (tempIdx > -1) db._cache.suppliers[tempIdx] = { ...data[0], name: data[0].company_name };
                }
            }
            return supplier;
        },
        delete: async (id) => {
            db._cache.suppliers = db._cache.suppliers.filter(s => String(s.id) !== String(id));
            const sb = getSupabase();
            if (sb && !String(id).startsWith('temp_')) await sb.from('suppliers').delete().eq('id', id);
        }
    },

    profiles: {
        getAll: () => db._cache.profiles,
        getById: (id) => db._cache.profiles.find(p => String(p.id) === String(id)),
        save: async (profile) => {
            const sb = getSupabase();
            const isNew = !profile.id || String(profile.id).trim() === "";
            
            if (isNew) {
                profile.id = 'temp_' + Date.now();
                db._cache.profiles.push(profile);
            } else {
                const idx = db._cache.profiles.findIndex(p => String(p.id) === String(profile.id));
                if (idx > -1) db._cache.profiles[idx] = { ...db._cache.profiles[idx], ...profile };
            }

            const payload = { ...profile };
            if (String(payload.id).startsWith('temp_')) delete payload.id;

            if (sb) {
                const { data } = await sb.from('profiles').upsert(payload).select();
                if (data && data[0] && isNew) {
                    const tempIdx = db._cache.profiles.findIndex(p => p.id === profile.id);
                    if (tempIdx > -1) db._cache.profiles[tempIdx] = data[0];
                }
            }
            return profile;
        },
        delete: async (id) => {
            db._cache.profiles = db._cache.profiles.filter(p => String(p.id) !== String(id));
            const sb = getSupabase();
            if (sb && !String(id).startsWith('temp_')) await sb.from('profiles').delete().eq('id', id);
        }
    },

    orders: {
        getAll: () => db._cache.orders,
        save: async (order) => {
            const sb = getSupabase();
            const isNew = !order.id || String(order.id).trim() === "";
            
            if (isNew) {
                order.id = 'temp_' + Date.now();
                db._cache.orders.push(order);
            } else {
                const idx = db._cache.orders.findIndex(o => String(o.id) === String(order.id));
                if (idx > -1) db._cache.orders[idx] = { ...db._cache.orders[idx], ...order };
            }

            const payload = { ...order };
            if (String(payload.id).startsWith('temp_')) delete payload.id;

            if (sb) {
                const { data } = await sb.from('orders').insert(payload).select();
                if (data && data[0] && isNew) {
                    const tempIdx = db._cache.orders.findIndex(o => o.id === order.id);
                    if (tempIdx > -1) db._cache.orders[tempIdx] = data[0];
                }
            }
            return order;
        }
    }
};

export default db;
