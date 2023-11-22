import axios from 'axios';

class ApiManagerUtilities {
  // GET
  static async fetchData(url, jsonData) {
    try {
      const response = await axios.get(url, jsonData);
      return response.data;
    } catch (error) {
      return [];
    }
  }
  // POST
  static async sendData(url, jsonData) {
    try {
      const response = await axios.post(url, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return null;
    }
  }
  // PUT
  static async updateData(url, jsonData) {
    try {
      const response = await axios.put(url, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return null;
    }
  }
  // DELETE
  static async deleteData(url, jsonData) {
    try {
      const response = await axios.delete(url, {
        data: jsonData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default ApiManagerUtilities;