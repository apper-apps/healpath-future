import { toast } from 'react-toastify';

class ProviderService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
this.tableName = 'provider';
  }

  getApperClient() {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll(filters = {}) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "specialty" } },
          { field: { Name: "location_city" } },
          { field: { Name: "location_state" } },
          { field: { Name: "location_zip_code" } },
          { field: { Name: "location_address" } },
          { field: { Name: "bio" } },
          { field: { Name: "credentials" } },
          { field: { Name: "services" } },
          { field: { Name: "insurance" } },
          { field: { Name: "rating" } },
          { field: { Name: "availability_next_available" } },
          { field: { Name: "availability_wait_time" } },
          { field: { Name: "photo" } },
          { field: { Name: "contact_info_phone" } },
          { field: { Name: "contact_info_email" } },
          { field: { Name: "contact_info_website" } }
        ],
        where: [],
        orderBy: [
          {
            fieldName: "rating",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      // Add filters to where clause
      if (filters.specialty && filters.specialty.length > 0) {
        filters.specialty.forEach(spec => {
          params.where.push({
            FieldName: "specialty",
            Operator: "Contains",
            Values: [spec]
          });
        });
      }

      if (filters.location) {
        params.where.push({
          FieldName: "location_city",
          Operator: "Contains",
          Values: [filters.location]
        });
      }

      if (filters.insurance && filters.insurance.length > 0) {
        filters.insurance.forEach(ins => {
          params.where.push({
            FieldName: "insurance",
            Operator: "Contains",
            Values: [ins]
          });
        });
      }

      if (filters.minRating) {
        params.where.push({
          FieldName: "rating",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.minRating.toString()]
        });
      }

      if (filters.search) {
        params.where.push({
          FieldName: "Name",
          Operator: "Contains",
          Values: [filters.search]
        });
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform database records to match UI expectations
      const transformedProviders = (response.data || []).map(provider => ({
        Id: provider.Id,
        name: provider.Name || '',
        specialty: provider.specialty ? provider.specialty.split(',') : [],
        location: {
          city: provider.location_city || '',
          state: provider.location_state || '',
          zipCode: provider.location_zip_code || '',
          address: provider.location_address || ''
        },
        bio: provider.bio || '',
        credentials: provider.credentials ? provider.credentials.split(',') : [],
        services: provider.services ? provider.services.split(',') : [],
        insurance: provider.insurance ? provider.insurance.split(',') : [],
        rating: provider.rating || 0,
        availability: {
          nextAvailable: provider.availability_next_available || '',
          waitTime: provider.availability_wait_time || ''
        },
        photo: provider.photo || '',
        contactInfo: {
          phone: provider.contact_info_phone || '',
          email: provider.contact_info_email || '',
          website: provider.contact_info_website || ''
        }
      }));

      return transformedProviders;
    } catch (error) {
      console.error("Error fetching providers:", error);
      toast.error("Failed to load providers");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "specialty" } },
          { field: { Name: "location_city" } },
          { field: { Name: "location_state" } },
          { field: { Name: "location_zip_code" } },
          { field: { Name: "location_address" } },
          { field: { Name: "bio" } },
          { field: { Name: "credentials" } },
          { field: { Name: "services" } },
          { field: { Name: "insurance" } },
          { field: { Name: "rating" } },
          { field: { Name: "availability_next_available" } },
          { field: { Name: "availability_wait_time" } },
          { field: { Name: "photo" } },
          { field: { Name: "contact_info_phone" } },
          { field: { Name: "contact_info_email" } },
          { field: { Name: "contact_info_website" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      // Transform database record to match UI expectations
      const provider = response.data;
      return {
        Id: provider.Id,
        name: provider.Name || '',
        specialty: provider.specialty ? provider.specialty.split(',') : [],
        location: {
          city: provider.location_city || '',
          state: provider.location_state || '',
          zipCode: provider.location_zip_code || '',
          address: provider.location_address || ''
        },
        bio: provider.bio || '',
        credentials: provider.credentials ? provider.credentials.split(',') : [],
        services: provider.services ? provider.services.split(',') : [],
        insurance: provider.insurance ? provider.insurance.split(',') : [],
        rating: provider.rating || 0,
        availability: {
          nextAvailable: provider.availability_next_available || '',
          waitTime: provider.availability_wait_time || ''
        },
        photo: provider.photo || '',
        contactInfo: {
          phone: provider.contact_info_phone || '',
          email: provider.contact_info_email || '',
          website: provider.contact_info_website || ''
        }
      };
    } catch (error) {
      console.error(`Error fetching provider with ID ${id}:`, error);
      toast.error("Failed to load provider");
      return null;
    }
  }

  async create(providerData) {
    try {
      const params = {
        records: [{
          Name: providerData.name,
          specialty: Array.isArray(providerData.specialty) ? providerData.specialty.join(',') : providerData.specialty,
          location_city: providerData.location?.city || '',
          location_state: providerData.location?.state || '',
          location_zip_code: providerData.location?.zipCode || '',
          location_address: providerData.location?.address || '',
          bio: providerData.bio || '',
          credentials: Array.isArray(providerData.credentials) ? providerData.credentials.join(',') : providerData.credentials,
          services: Array.isArray(providerData.services) ? providerData.services.join(',') : providerData.services,
          insurance: Array.isArray(providerData.insurance) ? providerData.insurance.join(',') : providerData.insurance,
          rating: providerData.rating || 0,
          availability_next_available: providerData.availability?.nextAvailable || '',
          availability_wait_time: providerData.availability?.waitTime || '',
          photo: providerData.photo || '',
          contact_info_phone: providerData.contactInfo?.phone || '',
          contact_info_email: providerData.contactInfo?.email || '',
          contact_info_website: providerData.contactInfo?.website || ''
        }]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success("Provider created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating provider:", error);
      toast.error("Failed to create provider");
      return null;
    }
  }

  async update(id, providerData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: providerData.name,
          specialty: Array.isArray(providerData.specialty) ? providerData.specialty.join(',') : providerData.specialty,
          location_city: providerData.location?.city || '',
          location_state: providerData.location?.state || '',
          location_zip_code: providerData.location?.zipCode || '',
          location_address: providerData.location?.address || '',
          bio: providerData.bio || '',
          credentials: Array.isArray(providerData.credentials) ? providerData.credentials.join(',') : providerData.credentials,
          services: Array.isArray(providerData.services) ? providerData.services.join(',') : providerData.services,
          insurance: Array.isArray(providerData.insurance) ? providerData.insurance.join(',') : providerData.insurance,
          rating: providerData.rating || 0,
          availability_next_available: providerData.availability?.nextAvailable || '',
          availability_wait_time: providerData.availability?.waitTime || '',
          photo: providerData.photo || '',
          contact_info_phone: providerData.contactInfo?.phone || '',
          contact_info_email: providerData.contactInfo?.email || '',
          contact_info_website: providerData.contactInfo?.website || ''
        }]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success("Provider updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating provider:", error);
      toast.error("Failed to update provider");
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success("Provider deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting provider:", error);
      toast.error("Failed to delete provider");
      return false;
    }
  }

  async searchBySymptoms(symptoms) {
    try {
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
        return await this.getAll();
      }

      const filters = {
        specialty: Array.from(relevantSpecialties)
      };

      return await this.getAll(filters);
    } catch (error) {
      console.error("Error searching by symptoms:", error);
      toast.error("Failed to search providers");
      return [];
    }
  }

  async getFeatured() {
    try {
      const filters = {
        minRating: 4.8
      };
      return await this.getAll(filters);
    } catch (error) {
      console.error("Error getting featured providers:", error);
      toast.error("Failed to load featured providers");
      return [];
    }
  }
}

export default new ProviderService();