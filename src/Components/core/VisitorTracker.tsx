'use client';

import { useEffect } from 'react';
import axios from 'axios';

const locationsApiUrl = process.env.NEXT_PUBLIC_LOCATIONS_API_URL;

export default function VisitorTracker() {
  useEffect(() => {
    if (locationsApiUrl) {
      const fetchLocations = async () => {
        try {
          // This call triggers the Vercel API to log visitor information
          await axios.get(locationsApiUrl);
        } catch (error) {
          // Silent fail for tracking
          console.error('Tracking failed:', error);
        }
      };

      fetchLocations();
    }
  }, []);

  return null;
}
