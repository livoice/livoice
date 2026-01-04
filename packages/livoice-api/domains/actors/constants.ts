export const ACTOR_TYPES = [
  { label: 'Person', value: 'person', description: 'Individual people or speakers' },
  { label: 'Organization', value: 'organization', description: 'Companies, institutions, teams' },
  { label: 'Product', value: 'product', description: 'Products, services, software, platform' },
  { label: 'Event', value: 'event', description: 'Conferences, launches, meetups, holiday' },
  { label: 'Topic', value: 'topic', description: 'Key themes, concepts, subject areas' },
  { label: 'Location', value: 'location', description: 'Cities, countries, venues, adress' },
  { label: 'Brand', value: 'brand', description: 'Brand names or lines' },
  { label: 'Book', value: 'book', description: 'Books or publications' },
  { label: 'Other', value: 'other', description: 'Does not fit the other type' }
] as const;
