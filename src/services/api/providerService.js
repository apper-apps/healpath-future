import providersData from '@/services/mockData/providers.json';

class ProviderService {
  constructor() {
    this.providers = [...providersData];
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(filters = {}) {
    await this.delay(300);
    
    let filteredProviders = [...this.providers];

    // Filter by specialty
    if (filters.specialty && filters.specialty.length > 0) {
      filteredProviders = filteredProviders.filter(provider =>
        provider.specialty.some(spec => 
          filters.specialty.some(filterSpec => 
            spec.toLowerCase().includes(filterSpec.toLowerCase())
          )
        )
      );
    }

    // Filter by location
    if (filters.location) {
      filteredProviders = filteredProviders.filter(provider =>
        provider.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        provider.location.state.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by insurance
    if (filters.insurance && filters.insurance.length > 0) {
      filteredProviders = filteredProviders.filter(provider =>
        provider.insurance.some(ins =>
          filters.insurance.some(filterIns =>
            ins.toLowerCase().includes(filterIns.toLowerCase())
          )
        )
      );
    }

    // Filter by rating
    if (filters.minRating) {
      filteredProviders = filteredProviders.filter(provider =>
        provider.rating >= filters.minRating
      );
    }

    // Search by name or services
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProviders = filteredProviders.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm) ||
        provider.services.some(service => service.toLowerCase().includes(searchTerm)) ||
        provider.bio.toLowerCase().includes(searchTerm)
      );
    }

    return [...filteredProviders];
  }

  async getById(id) {
    await this.delay(200);
    const provider = this.providers.find(p => p.Id === parseInt(id));
    return provider ? { ...provider } : null;
  }

  async searchBySymptoms(symptoms) {
    await this.delay(500);
    
    const symptomMap = {
      'chronic pain': ['Functional Medicine', 'Chiropractic Care', 'Acupuncture'],
      'back pain': ['Chiropractic Care', 'Massage Therapy'],
      'headaches': ['Functional Medicine', 'Acupuncture', 'Chiropractic Care'],
      'fatigue': ['Functional Medicine', 'Naturopathic Medicine'],
      'digestive issues': ['Functional Medicine', 'Naturopathic Medicine', 'Traditional Chinese Medicine'],
      'anxiety': ['Health Coaching', 'Naturopathic Medicine', 'Acupuncture'],
      'hormone imbalance': ['Naturopathic Medicine', 'Functional Medicine'],
      'autoimmune': ['Functional Medicine', 'Naturopathic Medicine'],
      'fibromyalgia': ['Functional Medicine', 'Massage Therapy', 'Acupuncture'],
      'arthritis': ['Acupuncture', 'Chiropractic Care', 'Functional Medicine']
    };

    const relevantSpecialties = new Set();
    
    symptoms.forEach(symptom => {
      const lowerSymptom = symptom.toLowerCase();
      Object.keys(symptomMap).forEach(key => {
        if (lowerSymptom.includes(key)) {
          symptomMap[key].forEach(specialty => relevantSpecialties.add(specialty));
        }
      });
    });

    if (relevantSpecialties.size === 0) {
      return [...this.providers];
    }

    const matchedProviders = this.providers.filter(provider =>
      provider.specialty.some(spec => 
        Array.from(relevantSpecialties).some(relevantSpec =>
          spec.includes(relevantSpec)
        )
      )
    );

    return [...matchedProviders];
  }

  async getFeatured() {
    await this.delay(200);
    return this.providers.filter(provider => provider.rating >= 4.8);
  }
}

export default new ProviderService();