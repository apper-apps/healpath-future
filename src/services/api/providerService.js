import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

class ProviderService {
constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'provider';
  }

  // Transform flat database fields to nested UI format
  transformProviderData(provider) {
    if (!provider) return null;

    return {
      ...provider,
      // Transform location fields
      location: {
        address: provider.location_address || '',
        city: provider.location_city || '',
        state: provider.location_state || '',
        zipCode: provider.location_zip_code || ''
      },
      // Transform contact info fields
      contactInfo: {
        phone: provider.contact_info_phone || '',
        email: provider.contact_info_email || '',
        website: provider.contact_info_website || ''
      },
      // Transform availability fields
      availability: {
        nextAvailable: provider.availability_next_available,
        waitTime: provider.availability_wait_time || 'Not specified'
      },
      // Ensure arrays for multi-select fields
      specialty: this.parseMultiSelectField(provider.specialty),
      credentials: this.parseMultiSelectField(provider.credentials),
      services: this.parseMultiSelectField(provider.services),
      insurance: this.parseMultiSelectField(provider.insurance),
      // Use Name field consistently
      name: provider.Name || provider.name
    };
  }

  // Parse multi-select fields (comma-separated strings to arrays)
  parseMultiSelectField(field) {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    return field.split(',').map(item => item.trim()).filter(item => item);
  }

  // Transform UI data back to flat database format for create/update
  transformToDatabase(providerData) {
    const dbData = { ...providerData };
    
    // Remove nested objects and flatten
    delete dbData.location;
    delete dbData.contactInfo;
    delete dbData.availability;
    delete dbData.name;
    
    // Add flat fields
    if (providerData.location) {
      dbData.location_address = providerData.location.address;
      dbData.location_city = providerData.location.city;
      dbData.location_state = providerData.location.state;
      dbData.location_zip_code = providerData.location.zipCode;
    }
    
    if (providerData.contactInfo) {
      dbData.contact_info_phone = providerData.contactInfo.phone;
      dbData.contact_info_email = providerData.contactInfo.email;
      dbData.contact_info_website = providerData.contactInfo.website;
    }
    
    if (providerData.availability) {
      dbData.availability_next_available = providerData.availability.nextAvailable;
      dbData.availability_wait_time = providerData.availability.waitTime;
    }
    
    // Use Name field for database
    dbData.Name = providerData.name || providerData.Name;
    
    // Convert arrays to comma-separated strings for multi-select fields
    if (Array.isArray(dbData.specialty)) {
      dbData.specialty = dbData.specialty.join(',');
    }
    if (Array.isArray(dbData.credentials)) {
      dbData.credentials = dbData.credentials.join(',');
    }
    if (Array.isArray(dbData.services)) {
      dbData.services = dbData.services.join(',');
    }
    if (Array.isArray(dbData.insurance)) {
      dbData.insurance = dbData.insurance.join(',');
    }
    
    return dbData;
  }

  async getAll(filters = {}) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
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
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      // Add search filter if provided
      if (filters.search && filters.search.trim()) {
        params.where = [
          {
            FieldName: "Name",
            Operator: "Contains",
            Values: [filters.search.trim()],
            Include: true
          }
        ];
      }

      // Add specialty filter if provided
      if (filters.specialty) {
        if (!params.where) params.where = [];
        params.where.push({
          FieldName: "specialty",
          Operator: "Contains",
          Values: [filters.specialty],
          Include: true
        });
      }

      // Add location filter if provided
      if (filters.location) {
        if (!params.where) params.where = [];
        params.where.push({
          FieldName: "location_city",
          Operator: "Contains", 
          Values: [filters.location],
          Include: true
        });
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to fetch providers:', response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Transform each provider to expected UI format
      return response.data.map(provider => this.transformProviderData(provider));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching providers:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error fetching providers:", error.message);
        toast.error("Failed to load providers");
      }
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
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
        console.error(`Failed to fetch provider with ID ${id}:`, response.message);
        toast.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      // Transform to expected UI format
      return this.transformProviderData(response.data);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching provider with ID ${id}:`, error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching provider with ID ${id}:`, error.message);
        toast.error("Failed to load provider");
      }
      return null;
    }
  }

  async create(providerData) {
    try {
      // Transform UI data to database format
      const dbData = this.transformToDatabase(providerData);
      
      // Only include updateable fields
      const updateableData = {
        Name: dbData.Name,
        Tags: dbData.Tags,
        Owner: dbData.Owner,
        specialty: dbData.specialty,
        location_city: dbData.location_city,
        location_state: dbData.location_state,
        location_zip_code: dbData.location_zip_code,
        location_address: dbData.location_address,
        bio: dbData.bio,
        credentials: dbData.credentials,
        services: dbData.services,
        insurance: dbData.insurance,
        rating: dbData.rating,
        availability_next_available: dbData.availability_next_available,
        availability_wait_time: dbData.availability_wait_time,
        photo: dbData.photo,
        contact_info_phone: dbData.contact_info_phone,
        contact_info_email: dbData.contact_info_email,
        contact_info_website: dbData.contact_info_website
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to create provider:', response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} provider records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success('Provider created successfully');
          return this.transformProviderData(successfulRecords[0].data);
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating provider:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error creating provider:", error.message);
        toast.error("Failed to create provider");
      }
      return null;
    }
  }

  async update(id, providerData) {
    try {
      // Transform UI data to database format
      const dbData = this.transformToDatabase(providerData);
      
      // Only include updateable fields plus ID
      const updateableData = {
        Id: parseInt(id),
        Name: dbData.Name,
        Tags: dbData.Tags,
        Owner: dbData.Owner,
        specialty: dbData.specialty,
        location_city: dbData.location_city,
        location_state: dbData.location_state,
        location_zip_code: dbData.location_zip_code,
        location_address: dbData.location_address,
        bio: dbData.bio,
        credentials: dbData.credentials,
        services: dbData.services,
        insurance: dbData.insurance,
        rating: dbData.rating,
        availability_next_available: dbData.availability_next_available,
        availability_wait_time: dbData.availability_wait_time,
        photo: dbData.photo,
        contact_info_phone: dbData.contact_info_phone,
        contact_info_email: dbData.contact_info_email,
        contact_info_website: dbData.contact_info_website
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to update provider:', response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} provider records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success('Provider updated successfully');
          return this.transformProviderData(successfulUpdates[0].data);
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating provider:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error updating provider:", error.message);
        toast.error("Failed to update provider");
      }
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
        console.error('Failed to delete provider:', response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} provider records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success('Provider deleted successfully');
          return true;
        }
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting provider:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error deleting provider:", error.message);
        toast.error("Failed to delete provider");
      }
      return false;
    }
  }

  async searchBySymptoms(symptoms) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "specialty" } },
          { field: { Name: "services" } },
          { field: { Name: "location_city" } },
          { field: { Name: "location_state" } },
          { field: { Name: "rating" } },
          { field: { Name: "photo" } },
          { field: { Name: "bio" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: symptoms.map(symptom => ({
                  fieldName: "specialty",
                  operator: "Contains",
                  values: [symptom],
                  include: true
                })),
                operator: "OR"
              },
              {
                conditions: symptoms.map(symptom => ({
                  fieldName: "services", 
                  operator: "Contains",
                  values: [symptom],
                  include: true
                })),
                operator: "OR"
              }
            ]
          }
        ],
        orderBy: [
          {
            fieldName: "rating",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 20,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to search providers by symptoms:', response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(provider => this.transformProviderData(provider));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching providers by symptoms:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error searching providers by symptoms:", error.message);
        toast.error("Failed to search providers");
      }
      return [];
    }
  }

  async getFeatured() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "specialty" } },
          { field: { Name: "location_city" } },
          { field: { Name: "location_state" } },
          { field: { Name: "rating" } },
          { field: { Name: "photo" } },
          { field: { Name: "bio" } }
        ],
        where: [
          {
            FieldName: "rating",
            Operator: "GreaterThanOrEqualTo",
            Values: ["4"],
            Include: true
          }
        ],
        orderBy: [
          {
            fieldName: "rating",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 6,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error('Failed to fetch featured providers:', response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(provider => this.transformProviderData(provider));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching featured providers:", error?.response?.data?.message);
      } else {
        console.error("Error fetching featured providers:", error.message);
      }
      return [];
    }
  }

getApperClient() {
    // Check if ApperSDK is available
    if (!window.ApperSDK) {
      throw new Error('Apper SDK is not loaded. Please ensure the SDK script is included in index.html');
    }
    
    const { ApperClient } = window.ApperSDK;
    
    // Check if ApperClient is available
    if (!ApperClient) {
      throw new Error('ApperClient is not available in the SDK');
    }
    
    // Validate environment variables
    if (!import.meta.env.VITE_APPER_PROJECT_ID) {
      throw new Error('VITE_APPER_PROJECT_ID is not defined in environment variables');
    }
    
    if (!import.meta.env.VITE_APPER_PUBLIC_KEY) {
      throw new Error('VITE_APPER_PUBLIC_KEY is not defined in environment variables');
    }
    
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
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

  async getFeaturedUpdated() {
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

// Create and export a singleton instance
const providerService = new ProviderService();
export default providerService;