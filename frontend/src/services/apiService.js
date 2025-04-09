import axios from 'axios';
import { API_URL } from '../config/config';  // Adjust the import path based on your actual directory structure

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error('Failed to create job:', error);
    throw error;
  }
};

// Add other API methods as needed
