import { getContext } from '@keystone-6/core/context';
import config from './keystone';

// Sample categories for different business types
const categories = [
  { name: 'Technology' },
  { name: 'Healthcare' },
  { name: 'E-commerce' },
  { name: 'Finance' },
  { name: 'Education' },
  { name: 'Entertainment' },
  { name: 'Food & Beverage' },
  { name: 'Real Estate' },
  { name: 'Automotive' },
  { name: 'Fashion' },
  { name: 'Travel' },
  { name: 'Consulting' },
  { name: 'Manufacturing' },
  { name: 'Media' },
  { name: 'Non-profit' }
];

// Sample clients with realistic business names and categories
const clients = [
  {
    name: 'TechFlow Solutions',
    category: 'Technology',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4L44 20H20L32 4z" fill="#EF4444"/>
      <rect x="28" y="20" width="8" height="32" rx="4" fill="#DC2626"/>
      <path d="M24 52l-8 8M40 52l8 8" stroke="#DC2626" stroke-width="2" fill="none"/>
      <circle cx="32" cy="28" r="2" fill="white"/>
    </svg>`
  },
  {
    name: 'HealthFirst Medical',
    category: 'Healthcare',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 12c-8.84 0-16 7.16-16 16 0 8.84 16 28 16 28s16-19.16 16-28c0-8.84-7.16-16-16-16z" fill="#EF4444"/>
      <path d="M24 24c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="white" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    name: 'ShopSmart Retail',
    category: 'E-commerce',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="52" r="4" fill="#10B981"/>
      <circle cx="44" cy="52" r="4" fill="#10B981"/>
      <path d="M8 8h8l4 16h32l4-12H16" stroke="#059669" stroke-width="2" fill="none"/>
      <path d="M20 24h24l-4 16H24l-4-16z" fill="#10B981"/>
    </svg>`
  },
  {
    name: 'SecureBank Financial',
    category: 'Finance',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4L56 16v16c0 16-24 28-24 28s-24-12-24-28V16L32 4z" fill="#10B981"/>
      <path d="M24 28l6 6 12-12" stroke="white" stroke-width="3" fill="none"/>
    </svg>`
  },
  {
    name: 'LearnHub Academy',
    category: 'Education',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="40" height="32" rx="2" fill="#3B82F6"/>
      <rect x="16" y="20" width="32" height="4" rx="2" fill="white"/>
      <rect x="16" y="28" width="24" height="4" rx="2" fill="white"/>
      <rect x="16" y="36" width="28" height="4" rx="2" fill="white"/>
      <rect x="16" y="44" width="20" height="4" rx="2" fill="white"/>
    </svg>`
  },
  {
    name: 'StarLight Studios',
    category: 'Entertainment',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4l7.35 22.65L64 32l-24.65 5.35L32 60l-7.35-22.65L0 32l24.65-5.35L32 4z" fill="#F59E0B"/>
      <path d="M32 12l5.88 18.12L56 32l-18.12 1.88L32 52l-5.88-18.12L8 32l18.12-1.88L32 12z" fill="white"/>
    </svg>`
  },
  {
    name: 'Brew & Bean Co.',
    category: 'Food & Beverage',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 20h32v24c0 4.42-3.58 8-8 8H24c-4.42 0-8-3.58-8-8V20z" fill="#8B5CF6"/>
      <rect x="48" y="24" width="8" height="16" rx="4" fill="#7C3AED"/>
      <path d="M20 28h24M20 32h24M20 36h20" stroke="white" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    name: 'Urban Properties',
    category: 'Real Estate',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="24" width="48" height="32" rx="2" fill="#3B82F6"/>
      <rect x="12" y="28" width="8" height="8" rx="1" fill="white"/>
      <rect x="24" y="28" width="8" height="8" rx="1" fill="white"/>
      <rect x="36" y="28" width="8" height="8" rx="1" fill="white"/>
      <rect x="12" y="40" width="8" height="8" rx="1" fill="white"/>
      <rect x="24" y="40" width="8" height="8" rx="1" fill="white"/>
      <rect x="36" y="40" width="8" height="8" rx="1" fill="white"/>
      <rect x="20" y="16" width="24" height="8" rx="1" fill="#1E40AF"/>
      <rect x="28" y="18" width="8" height="4" rx="1" fill="white"/>
    </svg>`
  },
  {
    name: 'DriveTech Motors',
    category: 'Automotive',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="32" width="48" height="16" rx="8" fill="#6B7280"/>
      <rect x="12" y="36" width="40" height="8" rx="4" fill="#374151"/>
      <circle cx="20" cy="48" r="4" fill="#1F2937"/>
      <circle cx="44" cy="48" r="4" fill="#1F2937"/>
      <rect x="16" y="28" width="32" height="8" rx="4" fill="#6B7280"/>
      <rect x="20" y="30" width="8" height="4" rx="2" fill="white"/>
      <rect x="36" y="30" width="8" height="4" rx="2" fill="white"/>
    </svg>`
  },
  {
    name: 'StyleForward Fashion',
    category: 'Fashion',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4l12 20H20L32 4z" fill="#F59E0B"/>
      <path d="M20 24h24l-12 20L20 24z" fill="#D97706"/>
      <path d="M32 4l-12 20h24L32 4z" fill="#F59E0B"/>
    </svg>`
  },
  {
    name: 'Wanderlust Travel',
    category: 'Travel',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" fill="#8B5CF6"/>
      <path d="M8 32h48M32 8c0 0-8 16-8 24s8 24 8 24" stroke="white" stroke-width="2" fill="none"/>
      <circle cx="32" cy="32" r="16" fill="none" stroke="white" stroke-width="2"/>
      <circle cx="32" cy="32" r="8" fill="white"/>
    </svg>`
  },
  {
    name: 'Strategy Partners',
    category: 'Consulting',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 16h16v16H16z" fill="#8B5CF6"/>
      <path d="M32 16h16v16H32z" fill="#7C3AED"/>
      <path d="M16 32h16v16H16z" fill="#6D28D9"/>
      <path d="M32 32h16v16H32z" fill="#5B21B6"/>
      <circle cx="24" cy="24" r="2" fill="white"/>
      <circle cx="40" cy="24" r="2" fill="white"/>
      <circle cx="24" cy="40" r="2" fill="white"/>
      <circle cx="40" cy="40" r="2" fill="white"/>
    </svg>`
  },
  {
    name: 'Precision Manufacturing',
    category: 'Manufacturing',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" fill="#EF4444"/>
      <circle cx="32" cy="32" r="18" fill="white"/>
      <circle cx="32" cy="32" r="12" fill="#EF4444"/>
      <circle cx="32" cy="32" r="6" fill="white"/>
      <circle cx="32" cy="32" r="2" fill="#EF4444"/>
    </svg>`
  },
  {
    name: 'Digital Media Hub',
    category: 'Media',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="20" width="32" height="24" rx="4" fill="#6B7280"/>
      <rect x="20" y="24" width="24" height="16" rx="2" fill="#374151"/>
      <circle cx="32" cy="32" r="6" fill="#1F2937"/>
      <circle cx="32" cy="32" r="4" fill="white"/>
      <rect x="44" y="24" width="4" height="8" rx="2" fill="#6B7280"/>
    </svg>`
  },
  {
    name: 'Community Care',
    category: 'Non-profit',
    isActive: true,
    avatarSvg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="20" r="12" fill="#10B981"/>
      <circle cx="24" cy="36" r="10" fill="#059669"/>
      <circle cx="40" cy="36" r="10" fill="#059669"/>
      <rect x="30" y="44" width="4" height="16" rx="2" fill="#065F46"/>
    </svg>`
  }
];

// Sample influencers with realistic social media data
const influencers = [
  {
    name: 'Sarah Chen',
    instagram: '@sarahchen_lifestyle',
    tiktok: '@sarahchen_tiktok',
    facebook: 'Sarah Chen Lifestyle',
    youtube: 'Sarah Chen',
    followersInstagram: 125000,
    followersTiktok: 89000,
    followersFacebook: 45000,
    subscribersYoutube: 67000,
    isActive: true
  },
  {
    name: 'Marcus Rodriguez',
    instagram: '@marcus_fitness',
    tiktok: '@marcus_rodriguez',
    facebook: 'Marcus Rodriguez Fitness',
    youtube: 'Marcus Rodriguez Fitness',
    followersInstagram: 89000,
    followersTiktok: 156000,
    followersFacebook: 32000,
    subscribersYoutube: 89000,
    isActive: true
  },
  {
    name: 'Emma Thompson',
    instagram: '@emma_fashionista',
    tiktok: '@emma_thompson',
    facebook: 'Emma Thompson Style',
    youtube: 'Emma Thompson Fashion',
    followersInstagram: 234000,
    followersTiktok: 189000,
    followersFacebook: 67000,
    subscribersYoutube: 45000,
    isActive: true
  },
  {
    name: 'David Kim',
    instagram: '@davidkim_tech',
    tiktok: '@davidkim_tech',
    facebook: 'David Kim Tech',
    youtube: 'David Kim Tech Reviews',
    followersInstagram: 67000,
    followersTiktok: 45000,
    followersFacebook: 23000,
    subscribersYoutube: 156000,
    isActive: true
  },
  {
    name: 'Lisa Wang',
    instagram: '@lisa_wang_beauty',
    tiktok: '@lisa_wang_beauty',
    facebook: 'Lisa Wang Beauty',
    youtube: 'Lisa Wang Beauty',
    followersInstagram: 189000,
    followersTiktok: 234000,
    followersFacebook: 89000,
    subscribersYoutube: 67000,
    isActive: true
  },
  {
    name: 'Alex Johnson',
    instagram: '@alex_johnson_travel',
    tiktok: '@alex_johnson_travel',
    facebook: 'Alex Johnson Travel',
    youtube: 'Alex Johnson Adventures',
    followersInstagram: 145000,
    followersTiktok: 178000,
    followersFacebook: 56000,
    subscribersYoutube: 89000,
    isActive: true
  },
  {
    name: 'Maria Garcia',
    instagram: '@maria_garcia_food',
    tiktok: '@maria_garcia_food',
    facebook: 'Maria Garcia Food',
    youtube: 'Maria Garcia Cooking',
    followersInstagram: 112000,
    followersTiktok: 145000,
    followersFacebook: 45000,
    subscribersYoutube: 78000,
    isActive: true
  },
  {
    name: 'James Wilson',
    instagram: '@james_wilson_business',
    tiktok: '@james_wilson_business',
    facebook: 'James Wilson Business',
    youtube: 'James Wilson Business Tips',
    followersInstagram: 78000,
    followersTiktok: 67000,
    followersFacebook: 34000,
    subscribersYoutube: 123000,
    isActive: true
  },
  {
    name: 'Sophie Brown',
    instagram: '@sophie_brown_art',
    tiktok: '@sophie_brown_art',
    facebook: 'Sophie Brown Art',
    youtube: 'Sophie Brown Art Studio',
    followersInstagram: 89000,
    followersTiktok: 123000,
    followersFacebook: 23000,
    subscribersYoutube: 45000,
    isActive: true
  },
  {
    name: 'Ryan Davis',
    instagram: '@ryan_davis_gaming',
    tiktok: '@ryan_davis_gaming',
    facebook: 'Ryan Davis Gaming',
    youtube: 'Ryan Davis Gaming',
    followersInstagram: 67000,
    followersTiktok: 89000,
    followersFacebook: 45000,
    subscribersYoutube: 234000,
    isActive: true
  },
  {
    name: 'Nina Patel',
    instagram: '@nina_patel_wellness',
    tiktok: '@nina_patel_wellness',
    facebook: 'Nina Patel Wellness',
    youtube: 'Nina Patel Wellness',
    followersInstagram: 156000,
    followersTiktok: 189000,
    followersFacebook: 67000,
    subscribersYoutube: 89000,
    isActive: true
  },
  {
    name: 'Chris Taylor',
    instagram: '@chris_taylor_sports',
    tiktok: '@chris_taylor_sports',
    facebook: 'Chris Taylor Sports',
    youtube: 'Chris Taylor Sports',
    followersInstagram: 123000,
    followersTiktok: 156000,
    followersFacebook: 89000,
    subscribersYoutube: 145000,
    isActive: true
  },
  {
    name: 'Amanda Lee',
    instagram: '@amanda_lee_music',
    tiktok: '@amanda_lee_music',
    facebook: 'Amanda Lee Music',
    youtube: 'Amanda Lee Music',
    followersInstagram: 178000,
    followersTiktok: 234000,
    followersFacebook: 78000,
    subscribersYoutube: 189000,
    isActive: true
  },
  {
    name: "Kevin O'Brien",
    instagram: '@kevin_obrien_photography',
    tiktok: '@kevin_obrien_photo',
    facebook: "Kevin O'Brien Photography",
    youtube: "Kevin O'Brien Photography",
    followersInstagram: 89000,
    followersTiktok: 112000,
    followersFacebook: 34000,
    subscribersYoutube: 67000,
    isActive: true
  },
  {
    name: 'Jessica Martinez',
    instagram: '@jessica_martinez_fitness',
    tiktok: '@jessica_martinez_fit',
    facebook: 'Jessica Martinez Fitness',
    youtube: 'Jessica Martinez Fitness',
    followersInstagram: 145000,
    followersTiktok: 178000,
    followersFacebook: 56000,
    subscribersYoutube: 112000,
    isActive: true
  }
];

// Sample activities with realistic campaign data
const activities = [
  {
    name: 'Summer Fashion Campaign',
    type: 'monthly',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-30'),
    isActive: true,
    client: 'StyleForward Fashion',
    influencers: ['Emma Thompson', 'Lisa Wang', 'Sophie Brown']
  },
  {
    name: 'Tech Product Launch',
    type: 'monthly',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-30'),
    isActive: true,
    client: 'TechFlow Solutions',
    influencers: ['David Kim', 'James Wilson', 'Ryan Davis']
  },
  {
    name: 'Health & Wellness Month',
    type: 'monthly',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-30'),
    isActive: true,
    client: 'HealthFirst Medical',
    influencers: ['Nina Patel', 'Jessica Martinez', 'Marcus Rodriguez']
  },
  {
    name: 'E-commerce Summer Sale',
    type: 'monthly',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-30'),
    isActive: true,
    client: 'ShopSmart Retail',
    influencers: ['Sarah Chen', 'Maria Garcia', 'Amanda Lee']
  },
  {
    name: 'Travel Adventure Series',
    type: 'monthly',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-30'),
    isActive: true,
    client: 'Wanderlust Travel',
    influencers: ['Alex Johnson', "Kevin O'Brien", 'Chris Taylor']
  },
  {
    name: 'July Fitness Challenge',
    type: 'monthly',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-07-31'),
    isActive: true,
    client: 'DriveTech Motors',
    influencers: ['Marcus Rodriguez', 'Jessica Martinez', 'Chris Taylor']
  },
  {
    name: 'Real Estate Showcase',
    type: 'monthly',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-07-31'),
    isActive: true,
    client: 'Urban Properties',
    influencers: ['Sarah Chen', "Kevin O'Brien", 'Sophie Brown']
  },
  {
    name: 'Food & Beverage Festival',
    type: 'monthly',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-07-31'),
    isActive: true,
    client: 'Brew & Bean Co.',
    influencers: ['Maria Garcia', 'Lisa Wang', 'Amanda Lee']
  },
  {
    name: 'August Tech Review',
    type: 'monthly',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-31'),
    isActive: true,
    client: 'TechFlow Solutions',
    influencers: ['David Kim', 'Ryan Davis', 'James Wilson']
  },
  {
    name: 'Back-to-School Fashion',
    type: 'monthly',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-31'),
    isActive: true,
    client: 'StyleForward Fashion',
    influencers: ['Emma Thompson', 'Sophie Brown', 'Lisa Wang']
  },
  {
    name: 'Financial Planning Tips',
    type: 'monthly',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-31'),
    isActive: true,
    client: 'SecureBank Financial',
    influencers: ['James Wilson', 'Sarah Chen', 'Alex Johnson']
  },
  {
    name: 'Entertainment Summer Hits',
    type: 'monthly',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-07-31'),
    isActive: true,
    client: 'StarLight Studios',
    influencers: ['Amanda Lee', 'Emma Thompson', 'Ryan Davis']
  },
  {
    name: 'Manufacturing Innovation',
    type: 'monthly',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-31'),
    isActive: true,
    client: 'Precision Manufacturing',
    influencers: ['David Kim', 'James Wilson', 'Chris Taylor']
  },
  {
    name: 'Media Content Creation',
    type: 'monthly',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-07-31'),
    isActive: true,
    client: 'Digital Media Hub',
    influencers: ["Kevin O'Brien", 'Sophie Brown', 'Amanda Lee']
  },
  {
    name: 'Community Outreach',
    type: 'monthly',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-31'),
    isActive: true,
    client: 'Community Care',
    influencers: ['Nina Patel', 'Sarah Chen', 'Alex Johnson']
  }
];

async function main() {
  console.log('🌱 Starting database seed...');

  const context = getContext(config, await import('@prisma/client'));
  const sudoContext = context.sudo();

  try {
    // Create categories first
    console.log('📂 Creating categories...');
    const categoryMap = new Map();

    for (const categoryData of categories) {
      const category = await sudoContext.query.Category.createOne({
        data: { name: categoryData.name }
      });
      categoryMap.set(categoryData.name, category.id);
      console.log(`✅ Created category: ${categoryData.name}`);
    }

    // Create clients
    console.log('🏢 Creating clients...');

    for (const clientData of clients) {
      const categoryId = categoryMap.get(clientData.category);

      if (!categoryId) {
        console.warn(`⚠️ Category not found for client: ${clientData.name}`);
        continue;
      }

      const client = await sudoContext.query.Client.createOne({
        data: {
          name: clientData.name,
          category: { connect: { id: categoryId } },
          isActive: clientData.isActive
          // Note: avatar field is cloudinaryImage, so we can't set SVG directly
          // You'll need to upload these SVGs to Cloudinary or use them as placeholders
        }
      });

      console.log(`✅ Created client: ${clientData.name} (${clientData.category})`);
    }

    // Create influencers
    console.log('🌟 Creating influencers...');

    for (const influencerData of influencers) {
      const influencer = await sudoContext.query.Influencer.createOne({
        data: {
          name: influencerData.name,
          instagram: influencerData.instagram,
          tiktok: influencerData.tiktok,
          facebook: influencerData.facebook,
          youtube: influencerData.youtube,
          followersInstagram: influencerData.followersInstagram,
          followersTiktok: influencerData.followersTiktok,
          followersFacebook: influencerData.followersFacebook,
          subscribersYoutube: influencerData.subscribersYoutube,
          isActive: influencerData.isActive
        }
      });

      console.log(`✅ Created influencer: ${influencerData.name}`);
    }

    // Create activities
    console.log('📅 Creating activities...');

    // Create maps for easy lookup
    const clientMap = new Map();
    const influencerMap = new Map();

    // Get all clients and influencers for mapping
    const allClients = await sudoContext.query.Client.findMany({
      query: 'id name'
    });
    const allInfluencers = await sudoContext.query.Influencer.findMany({
      query: 'id name'
    });

    allClients.forEach(client => clientMap.set(client.name, client.id));
    allInfluencers.forEach(influencer => influencerMap.set(influencer.name, influencer.id));

    for (const activityData of activities) {
      const clientId = clientMap.get(activityData.client);
      const influencerIds = activityData.influencers.map(name => influencerMap.get(name)).filter(id => id); // Filter out any undefined IDs

      if (!clientId) {
        console.warn(`⚠️ Client not found for activity: ${activityData.name}`);
        continue;
      }

      const activity = await sudoContext.query.Activity.createOne({
        data: {
          name: activityData.name,
          type: activityData.type,
          startDate: activityData.startDate,
          endDate: activityData.endDate,
          isActive: activityData.isActive,
          client: { connect: { id: clientId } },
          influencer: influencerIds.length > 0 ? { connect: influencerIds.map(id => ({ id })) } : undefined
        }
      });

      console.log(`✅ Created activity: ${activityData.name} for ${activityData.client}`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(
      `📊 Created ${categories.length} categories, ${clients.length} clients, ${influencers.length} influencers, and ${activities.length} activities`
    );
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    // Context cleanup is handled automatically by Keystone
  }
}

// Run the seed function
main()
  .then(() => {
    console.log('✅ Seed script completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Seed script failed:', error);
    process.exit(1);
  });
