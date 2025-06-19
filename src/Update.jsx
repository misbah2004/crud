import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/users/${id}`);
        const data = await response.json();
        setUser(data);
        setFormData({
          firstname: data.name.firstname,
          lastname: data.name.lastname,
          email: data.email,
          phone: data.phone,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitted data:", formData);
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md'>
        <input
          type="text"
          placeholder='First Name'
          value={formData.firstname}
          name='firstname'
          onChange={handleChange}
          className='bg-gray-300 px-4 py-2 rounded'
        />

        <input
          type="text"
          placeholder='Last Name'
          value={formData.lastname}
          name='lastname'
          onChange={handleChange}
          className='bg-gray-300 px-4 py-2 rounded'
        />

        <input
          type="email"
          placeholder='Email'
          value={formData.email}
          name='email'
          onChange={handleChange}
          className='bg-gray-300 px-4 py-2 rounded'
        />

        <input
          type="text"
          placeholder='Phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          className='bg-gray-300 px-4 py-2 rounded'
        />

        <button type='submit' className='bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
