// Load Core of React.js and Next.js
import React from "react";

// Load Core Axios
import Axios from "axios";

// Create axios instance with timeout
const axiosInstance = Axios.create({
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Simple in-memory cache for build time
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Create get method with caching
const fetchData = async (url) => {
  const cacheKey = url;
  const now = Date.now();
  
  // Check cache first
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  }
  
  try {
    const res = await axiosInstance.get(url);
    const result = {
      error: false,
      data: res.data,
    };
    
    // Cache the result
    cache.set(cacheKey, {
      data: result,
      timestamp: now
    });
    
    return result;
  } catch (err) {
    const result = {
      error: true,
      data: null,
    };
    
    // Cache error results too (for shorter time)
    cache.set(cacheKey, {
      data: result,
      timestamp: now
    });
    
    return result;
  }
};

// Asyn Component
export async function getAPIData(url) {
  const data = await fetchData(process.env.NEXT_PUBLIC_API_URL + url);
  return data;
}

export default getAPIData;
