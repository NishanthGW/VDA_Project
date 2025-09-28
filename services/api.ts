import { RentalRequest, RentalResponse } from '../types';

export const submitRentalRequest = async (request: RentalRequest): Promise<RentalResponse> => {
  // Mock API call - in a real application, this would be your actual API endpoint
  const response = await fetch('/api/rentals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to submit rental request');
  }

  const data: RentalResponse = await response.json();
  return data;
};