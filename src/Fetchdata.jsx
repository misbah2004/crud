import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Update from "./update";
import {toast} from "react-hot-toast";

const Fetchdata = () => {
  const [data, setData] = useState([]);
  const [firstName , setFirstName] =useState();
  const [lastName , setLastName] =useState();
  const [email , setEmail] =useState();
  const [phone , setPhone] =useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    if(id > 0){
      if(window.confirm("are you sure")){
      const dt = data.filter(user => user.id !== id);
      setData(dt);
    }
  }
  }
  const handleEdit = (id) => {
    
    setIsUpdate(true)
    const dt = data.filter(user => user.id === id);
    if(dt !== undefined){
      setId(id);
      setEmail(dt[0].email);
      setPhone(dt[0].phone);
      setFirstName(dt[0]?.name?.firstname);
      setLastName(dt[0]?.name?.lastname);
      setUserName(dt[0].username);
    }
  }
  const handleUpdate = () => {
    const index = data.map((item) =>{
      return item.id
    }).indexOf(id);
    const dt = [...data];
    dt[index].name.firstname = firstName;
    dt[index].name.lastname = lastName;
    dt[index].email = email;
    dt[index].phone = phone;
    dt[index].username = userName;
    setData(dt);
    handleClear();
   toast.success(userName + 'Updated SuccesFully')
  }
  const handleSave = (e) => {
    e.preventDefault();
    const dt = [...data];
    const newObject = 
      {
    "address": {
      "geolocation": {
        "lat": "-37.3159",
        "long": "81.1496"
      },
      "city": "kilcoole",
      "street": "new road",
      "number": 7682,
      "zipcode": "12926-3874"
    },
    id: data.length + 1,
    email: email,
    username: userName,
    "password": "m38rmF$",
    name: {
      firstname: firstName,
      lastname: lastName
    },
    phone: phone,
    "__v": 0
  }
    dt.push(newObject);
    setData(dt);
    handleClear();
  }
  const handleClear = () => {
     setEmail("");
      setPhone("");
      setFirstName("");
      setLastName("");
      setIsUpdate(false)
      setUserName("")
  }
  return (
    <div className="min-h-screen w-full bg-pink-100 flex justify-center items-center flex-wrap gap-4 p-4">
          <div className="w-full flex justify-center items-center space-x-1">
           <input
          type="text"
          placeholder='First Name'
          value={firstName}
          name='firstname'
          onChange={(e) => setFirstName(e.target.value) }
          className='bg-gray-300 px-4 py-2 rounded'
        />

        <input
          type="text"
          placeholder='Last Name'
          value={lastName}
          name='lastname'
          onChange={(e) => setLastName(e.target.value)}
          className='bg-gray-300 px-4 py-2 rounded'
        />

        <input
          type="email"
          placeholder='Email'
          value={email}
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          className='bg-gray-300 px-4 py-2 rounded'
        />

        <input
          type="text"
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='bg-gray-300 px-4 py-2 rounded'
        />
        <input
          type="text"
          placeholder='userName'
          name='phone'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className='bg-gray-300 px-4 py-2 rounded'
        />
        <div className="flex space-x-2">
          {!isUpdate == false ? <button onClick={() => handleUpdate()} className="bg-blue-500 w-15 p-2 rounded-md text-center">update</button>
          :<button onClick={(e) => handleSave(e)} className="bg-green-400 w-15 p-2 rounded-md text-center">Save</button>
          }
        
        
        <button onClick={() => handleClear()} className="bg-red-500 w-15 p-2 rounded-md text-center">clear</button>
        </div>
        </div> 
      {data.map((user, index) => (
       
        <div key={index} className="max-w-xs w-full p-6 bg-white rounded-2xl shadow-md border">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold">Full Name:</span> {user.name.firstname} {user.name.lastname}</p>
            <p><span className="font-semibold">Username:</span> {user.username}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold">Address:</span> {user.address.number} {user.address.street}, {user.address.city}</p>
            <p><span className="font-semibold">Zip Code:</span> {user.address.zipcode}</p>
            <p><span className="font-semibold">Geo Location:</span> Lat: {user.address.geolocation.lat}, Long: {user.address.geolocation.long}</p>
          </div>

          <div className="w-full flex justify-center items-center space-x-1 mt-2">
          <button onClick={() => handleDelete(user.id)} className="bg-red-400 rounded-md w-16 p-1">Delete</button>
          <button onClick={() => handleEdit(user.id)} className="bg-gray-400 w-16 rounded-md p-1">Edit</button>
          </div>
          
        </div>
      ))}
    </div>
  )
}

export default Fetchdata
