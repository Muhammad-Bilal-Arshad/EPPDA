import { useState, useEffect } from "react";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import CreateDispatcher from "./CreateDispatcher.jsx";


const Dispatcher = () => {
  //const [dispatchers, setDispatchers] = useState([]);(add this to get dynamic data)
  const [dispatchers, setDispatchers] = useState([
    
    {},
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/dispatcher").then((response) => {
      setDispatchers(response.data);
      
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/dispatcher/${id}`)

      .then((response) => {
        setDispatchers(
          dispatchers.filter((dispatcher) => dispatcher._id !== id)
        );
      });
  };

  const handleUpdate = (id) => {
    navigate(`/dispatcher/update/${id}`);
  };

  const handleCreate = () => {
    navigate("/dispatchercreate");
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl " >
      <Header category="Page" title="Dispatcher" />
      <div className="flex justify-end mb-2">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>

      {showCreateForm && (
        <CreateDispatcher setShowCreateForm={setShowCreateForm} />
      )}

      <div className="flex flex-col space-y-4">
        {dispatchers.map((dispatcher) => (
          <div key={dispatcher._id} className="bg-gray-100 p-4 rounded shadow-md">
            <div className="flex justify-between">
              <div className="font-bold text-lg">{dispatcher.username}</div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleUpdate(dispatcher._id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(dispatcher._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div>{dispatcher.name}</div>
            <div>{dispatcher.email}</div>
            <div>{dispatcher.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dispatcher;