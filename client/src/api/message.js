export const fetchPublicMessages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/chatInfo?category=Public');
      if (!response) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      console.log(response, "FE data fetch");
      
      return data;
    } catch (error) {
      console.error('Error fetching public messages:', error);
      return [];
    }
  };

  export const fetchFactionsMessages = async (factionType) => {
    try {
      const response = await fetch(`http://localhost:3000/api/chatInfo?category=${factionType}`);
      if (!response) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      console.log(response, "FE data fetch");
      
      return data;
    } catch (error) {
      console.error('Error fetching public messages:', error);
      return [];
    }
  };