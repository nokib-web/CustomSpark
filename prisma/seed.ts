import "dotenv/config";
import bcrypt from 'bcryptjs';
import prisma from "../src/lib/prisma";

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await prisma.item.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Cleared existing data.');

    // Create Users
    const adminPassword = await bcrypt.hash('Admin123!', 12);
    const userPassword = await bcrypt.hash('User123!', 12);

    const admin = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@example.com',
            password: adminPassword,
        },
    });

    const regularUser = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'user@example.com',
            password: userPassword,
        },
    });

    console.log('👤 Created test users.');

    // Sample Items Data
    const categories = ['Electronics', 'Fashion', 'Home', 'Sports'];

    const items = [
        {
            name: 'Premium Wireless Headphones',
            shortDescription: 'High-quality noise-cancelling headphones.',
            description: 'Noise-cancelling over-ear headphones with 40-hour battery life.',
            price: 299.99,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
            stock: 50,
            sku: 'ELEC-HEAD-001',
            tags: ['audio', 'wireless', 'premium'],
            featured: true,
            userId: admin.id,
        },
        {
            name: 'Mechanical Gaming Keyboard',
            shortDescription: 'Tactile RGB mechanical keyboard.',
            description: 'RGB backlit mechanical keyboard with tactile switches.',
            price: 129.50,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
            stock: 30,
            sku: 'ELEC-KEYB-002',
            tags: ['gaming', 'rgb', 'mechanical'],
            featured: false,
            userId: admin.id,
        },
        {
            name: 'Cotton Oxford Shirt',
            shortDescription: 'Classic 100% cotton shirt.',
            description: 'Classic fit 100% cotton Oxford shirt for formal and casual wear.',
            price: 45.00,
            category: 'Fashion',
            imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
            stock: 100,
            sku: 'FASH-SHRT-001',
            tags: ['clothing', 'classic', 'cotton'],
            featured: true,
            userId: regularUser.id,
        },
        {
            name: 'Minimalist Wall Clock',
            shortDescription: 'Modern silent wall clock.',
            description: 'Modern silent wall clock with a brushed aluminum finish.',
            price: 35.99,
            category: 'Home',
            imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80',
            stock: 25,
            sku: 'HOME-CLOC-001',
            tags: ['decor', 'minimalist', 'home'],
            featured: false,
            userId: admin.id,
        },
        {
            name: 'Yoga Mat',
            shortDescription: 'Eco-friendly non-slip yoga mat.',
            description: 'Eco-friendly non-slip yoga mat with carrying strap.',
            price: 24.99,
            category: 'Sports',
            imageUrl: 'https://images.unsplash.com/photo-1592432676556-2sSfb5ef300e?w=800&q=80',
            stock: 60,
            sku: 'SPOR-YOGA-001',
            tags: ['fitness', 'eco-friendly', 'yoga'],
            featured: false,
            userId: regularUser.id,
        },
        // Adding more items to reach 20-30 range
        {
            name: 'Smart Watch Series X',
            shortDescription: 'Advanced health tracking smartwatch.',
            description: 'Health tracking and notifications on your wrist.',
            price: 199.99,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
            stock: 45,
            sku: 'ELEC-WAT-003',
            tags: ['gadget', 'health', 'smart'],
            featured: true,
            userId: admin.id,
        },
        {
            name: 'Leather Weekend Bag',
            shortDescription: 'Handcrafted leather travel bag.',
            description: 'Handcrafted genuine leather bag for travel.',
            price: 150.00,
            category: 'Fashion',
            imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
            stock: 15,
            sku: 'FASH-BAG-002',
            tags: ['travel', 'leather', 'handcrafted'],
            featured: true,
            userId: regularUser.id,
        },
        {
            name: 'Scented Soy Candle',
            shortDescription: 'Lavender scented soy candle.',
            description: 'Long-lasting lavender scented soy candle.',
            price: 18.50,
            category: 'Home',
            imageUrl: 'https://images.unsplash.com/photo-1603006371072-5b12854972fB?w=800&q=80',
            stock: 80,
            sku: 'HOME-CAND-002',
            tags: ['aroma', 'soy', 'candle'],
            featured: false,
            userId: admin.id,
        },
        {
            name: 'Adjustable Dumbbells',
            shortDescription: 'Space-saving adjustable weights.',
            description: 'Space-saving adjustable weights for home workouts.',
            price: 349.99,
            category: 'Sports',
            imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2021E4?w=800&q=80',
            stock: 10,
            sku: 'SPOR-DUMB-002',
            tags: ['weights', 'fitness', 'home-gym'],
            featured: true,
            userId: regularUser.id,
        },
        {
            name: '4K Ultra HD Camera',
            shortDescription: 'Professional 4K detail camera.',
            description: 'Capture stunning details with this professional camera.',
            price: 899.00,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
            stock: 12,
            sku: 'ELEC-CAM-004',
            tags: ['photography', '4k', 'pro'],
            featured: true,
            userId: admin.id,
        },
        {
            name: 'Wool Winter Coat',
            shortDescription: 'Elegant winter wool blend coat.',
            description: 'Elegant wool blend coat for cold weather.',
            price: 189.99,
            category: 'Fashion',
            imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
            stock: 20,
            sku: 'FASH-COAT-003',
            tags: ['winter', 'style', 'wool'],
            featured: false,
            userId: regularUser.id,
        },
        {
            name: 'Velvet Throw Pillow',
            shortDescription: 'Soft velvet decorative pillow.',
            description: 'Soft velvet pillow to add comfort to your sofa.',
            price: 22.00,
            category: 'Home',
            imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
            stock: 100,
            sku: 'HOME-PILL-003',
            tags: ['comfort', 'velvet', 'decor'],
            featured: false,
            userId: admin.id,
        },
        {
            name: 'Mountain Bike',
            shortDescription: 'Durable off-road mountain bike.',
            description: 'Durable mountain bike for off-road adventures.',
            price: 550.00,
            category: 'Sports',
            imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80',
            stock: 8,
            sku: 'SPOR-BIKE-003',
            tags: ['cycling', 'adventure', 'outdoor'],
            featured: true,
            userId: regularUser.id,
        },
        {
            name: 'Wireless Charging Pad',
            shortDescription: 'Fast smartphone wireless charger.',
            description: 'Fast wireless charging for smartphones.',
            price: 29.99,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1586816879360-004f5bc99c88?w=800&q=80',
            stock: 75,
            sku: 'ELEC-CHRG-005',
            tags: ['tech', 'wireless', 'charger'],
            featured: false,
            userId: admin.id,
        },
        {
            name: 'Denim Jacket',
            shortDescription: 'Classic vintage-feel denim jacket.',
            description: 'Classic blue denim jacket with vintage feel.',
            price: 65.00,
            category: 'Fashion',
            imageUrl: 'https://images.unsplash.com/photo-1576905300096-74fc2da1f7ae?w=800&q=80',
            stock: 40,
            sku: 'FASH-JACK-004',
            tags: ['denim', 'vintage', 'casual'],
            featured: false,
            userId: regularUser.id,
        },
        {
            name: 'Electric Kettle',
            shortDescription: 'Quick-boil morning kitchen kettle.',
            description: 'Quick-boil electric kettle for your morning tea.',
            price: 39.99,
            category: 'Home',
            imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1?w=800&q=80',
            stock: 55,
            sku: 'HOME-KETT-004',
            tags: ['kitchen', 'electric', 'utility'],
            featured: false,
            userId: admin.id,
        },
        {
            name: 'Badminton Racket Set',
            shortDescription: 'High-quality racket and shuttlecock set.',
            description: 'High-quality rackets and shuttlecocks for two players.',
            price: 49.99,
            category: 'Sports',
            imageUrl: 'https://images.unsplash.com/photo-1613918431201-6b45f94080bc?w=800&q=80',
            stock: 25,
            sku: 'SPOR-BADM-004',
            tags: ['game', 'badminton', 'racket'],
            featured: false,
            userId: regularUser.id,
        },
        {
            name: 'Bluetooth Speaker',
            shortDescription: 'Portable waterproof deep bass speaker.',
            description: 'Portable waterproof speaker with deep bass.',
            price: 59.99,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
            stock: 40,
            sku: 'ELEC-SPK-006',
            tags: ['music', 'portable', 'waterproof'],
            featured: true,
            userId: admin.id,
        },
        {
            name: 'Silk Scarf',
            shortDescription: 'Patterned soft silk fashion scarf.',
            description: 'Soft silk scarf with artistic patterns.',
            price: 35.00,
            category: 'Fashion',
            imageUrl: 'https://images.unsplash.com/photo-1601369524855-8dd2c222625d?w=800&q=80',
            stock: 30,
            sku: 'FASH-SCA-005',
            tags: ['accessory', 'silk', 'fashion'],
            featured: false,
            userId: regularUser.id,
        },
        {
            name: 'Desk Lamp',
            shortDescription: 'Eye-care LED adjustable desk lamp.',
            description: 'Eye-care LED desk lamp with adjustable brightness.',
            price: 45.99,
            category: 'Home',
            imageUrl: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80',
            stock: 20,
            sku: 'HOME-LAMP-005',
            tags: ['lighting', 'desk', 'office'],
            featured: false,
            userId: admin.id,
        },
        {
            name: 'Tennis Racket',
            shortDescription: 'Lightweight pro performance tennis racket.',
            description: 'Lightweight tennis racket for professional performance.',
            price: 120.00,
            category: 'Sports',
            imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80',
            stock: 15,
            sku: 'SPOR-TENN-005',
            tags: ['tennis', 'pro', 'racket'],
            featured: true,
            userId: regularUser.id,
        },
    ];

    for (const item of items) {
        await prisma.item.create({
            data: item,
        });
    }

    console.log(`📦 Created ${items.length} sample items.`);

    console.log('✅ Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:');
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
