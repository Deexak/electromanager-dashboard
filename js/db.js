/**
 * ElectroManager LocalStorage Database Service
 * Provides persistence for products, suppliers, profiles, and orders.
 */

const DB_PREFIX = 'electro_manager_';

const db = {
    // Generic methods
    get: (key) => {
        const data = localStorage.getItem(DB_PREFIX + key);
        return data ? JSON.parse(data) : [];
    },
    save: (key, data) => {
        localStorage.setItem(DB_PREFIX + key, JSON.stringify(data));
    },

    // Products
    products: {
        getAll: () => db.get('products'),
        getById: (id) => db.get('products').find(p => String(p.id) === String(id)),
        save: (product) => {
            const products = db.get('products');
            if (product.id) {
                const index = products.findIndex(p => String(p.id) === String(product.id));
                if (index !== -1) {
                    products[index] = { ...products[index], ...product };
                }
            } else {
                product.id = Date.now();
                product.created_at = new Date().toISOString();
                products.push(product);
            }
            db.save('products', products);
            return product;
        },
        delete: (id) => {
            const products = db.get('products').filter(p => String(p.id) !== String(id));
            db.save('products', products);
        }
    },

    // Suppliers
    suppliers: {
        getAll: () => db.get('suppliers'),
        getById: (id) => db.get('suppliers').find(s => String(s.id) === String(id)),
        save: (supplier) => {
            const suppliers = db.get('suppliers');
            if (supplier.id) {
                const index = suppliers.findIndex(s => String(s.id) === String(supplier.id));
                if (index !== -1) {
                    suppliers[index] = { ...suppliers[index], ...supplier };
                }
            } else {
                supplier.id = Date.now();
                supplier.created_at = new Date().toISOString();
                suppliers.push(supplier);
            }
            db.save('suppliers', suppliers);
            return supplier;
        },
        delete: (id) => {
            const suppliers = db.get('suppliers').filter(s => String(s.id) !== String(id));
            db.save('suppliers', suppliers);
        }
    },

    // Profiles (Users)
    profiles: {
        getAll: () => db.get('profiles'),
        getById: (id) => db.get('profiles').find(p => String(p.id) === String(id)),
        save: (profile) => {
            const profiles = db.get('profiles');
            const index = profiles.findIndex(p => String(p.id) === String(profile.id));
            if (index !== -1) {
                profiles[index] = { ...profiles[index], ...profile };
            } else {
                profiles.push(profile);
            }
            db.save('profiles', profiles);
            return profile;
        },
        delete: (id) => {
            const profiles = db.get('profiles').filter(p => String(p.id) !== String(id));
            db.save('profiles', profiles);
        }
    },

    // Orders
    orders: {
        getAll: () => db.get('orders'),
        save: (order) => {
            const orders = db.get('orders');
            order.id = Date.now();
            order.created_at = new Date().toISOString();
            orders.push(order);
            db.save('orders', orders);
            return order;
        }
    }
};

// Initialize with sample data if empty
function initSampleData() {
    let currentProducts = db.products.getAll();
    const desiredDummyProducts = [
        { id: 1, name: 'MacBook Pro M3', price: 159900, stock_quantity: 15, description: 'Next-gen performance with M3 chip.', image_url: 'https://m.media-amazon.com/images/I/618d5bS2lUL._SX679_.jpg', supplier_id: 1 },
        { id: 2, name: 'iPhone 15 Pro', price: 134900, stock_quantity: 25, description: 'Titanium design and A17 Pro chip.', image_url: 'https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg', supplier_id: 1 },
        { id: 3, name: 'Sony WH-1000XM5', price: 29990, stock_quantity: 40, description: 'Industry-leading noise cancellation.', image_url: 'https://m.media-amazon.com/images/I/61vJtKbAssL._SX679_.jpg', supplier_id: 2 },
        { id: 4, name: 'Apple Watch Series 9', price: 41900, stock_quantity: 30, description: 'Smarter. Brighter. Mightier.', image_url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800', supplier_id: 1 },
        { id: 5, name: 'Samsung Galaxy S24 Ultra', price: 129999, stock_quantity: 20, description: 'Galaxy AI is here.', image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800', supplier_id: 2 },
        { id: 6, name: 'PlayStation 5 Console', price: 54990, stock_quantity: 10, description: 'Lightning fast loading with an ultra-high speed SSD.', image_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800', supplier_id: 2 },
        { id: 7, name: 'Samsung 28L Microwave', price: 11500, stock_quantity: 12, description: 'Convection Microwave Oven.', image_url: 'https://images.unsplash.com/photo-1585659722983-3a6750f22cb6?auto=format&fit=crop&q=80&w=800', supplier_id: 2 },
        { id: 8, name: 'LG 242L Refrigerator', price: 25990, stock_quantity: 8, description: 'Smart Inverter Double Door Fridge.', image_url: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800', supplier_id: 2 },
        { id: 9, name: 'Philips Air Fryer', price: 8999, stock_quantity: 18, description: 'Digital Air Fryer with Rapid Air Technology.', image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800', supplier_id: 2 },
        { id: 10, name: 'Bosch Mixer Grinder', price: 5399, stock_quantity: 22, description: 'TrueMixx Pro 1000W Mixer.', image_url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800', supplier_id: 2 }
    ];

    if (currentProducts.length === 0) {
        db.save('products', desiredDummyProducts);
    } else {
        let updated = false;
        currentProducts = currentProducts.map(p => {
            const upgrade = desiredDummyProducts.find(d => d.id === p.id || d.name === p.name);
            if (upgrade && p.image_url !== upgrade.image_url) {
                updated = true;
                return { ...p, image_url: upgrade.image_url };
            }
            return p;
        });

        // Add any missing dummy products
        for (let dummy of desiredDummyProducts) {
            if (!currentProducts.find(p => p.id === dummy.id)) {
                currentProducts.push(dummy);
                updated = true;
            }
        }

        if (updated) {
            db.save('products', currentProducts);
        }
    }

    if (db.suppliers.getAll().length === 0) {
        const dummySuppliers = [
            { id: 1, name: 'Apple Inc.', contact_name: 'Tim Cook', email: 'sales@apple.com', phone: '1-800-MY-APPLE', categories: 'Laptops, Phones' },
            { id: 2, name: 'Sony Electronics', contact_name: 'Kenichiro Yoshida', email: 'support@sony.com', phone: '1-800-222-7669', categories: 'Audio, Imaging' }
        ];
        db.save('suppliers', dummySuppliers);
    }

    if (db.profiles.getAll().length === 0) {
        const dummyProfiles = [
            { id: 'admin-id', full_name: 'System Admin', username: 'admin@retail.com', role: 'admin', created_at: new Date().toISOString() },
            { id: 'customer-id', full_name: 'John Doe', username: 'customer@retail.com', role: 'customer', created_at: new Date().toISOString() },
            { id: 'supplier-id', full_name: 'Jane Smith', username: 'supplier@retail.com', role: 'supplier', created_at: new Date().toISOString() }
        ];
        db.save('profiles', dummyProfiles);
    }
}

initSampleData();
export default db;
