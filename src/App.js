
import { useState, useEffect } from "react";
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, 'users');

  const createUser = async () => {
    if (!newName || !newAge) {
      // Check if any input field is empty
      alert("Please fill in all the fields.");
      return;
    }

    const existingUser = users.find(user => user.name === newName);
    if (existingUser) {
      // Check for duplicates by name
      alert("User with the same name already exists.");
      return;
    }

    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    setNewName('');
    setNewAge(0);
  };

  const incrementAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const updatedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(updatedUsers);
    });

    return () => {
      unsubscribe(); // Unsubscribe from real-time updates when component unmounts
    };
  }, []);

  return (
    <div className="App container">
      <h1>Add User</h1>
      <div className="d-flex flex-column align-items-center m-5">
        <input
          type="text"
          placeholder="Name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="rounded mb-3"
        />
        <input
          type="number"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          className="rounded mb-3"
        />
        <Button variant="success" onClick={createUser}>Create User</Button>
      </div>

      {users.map((user) => (
        <div key={user.id} className="border rounded m-5 p-3">
          <h5>Name: {user.name}</h5>
          <h5>Age: {user.age}</h5>
          <Button onClick={() => incrementAge(user.id, user.age)}>
            Increase Age
          </Button>
          <Button variant="danger" onClick={() => deleteUser(user.id)} className="m-1">Delete</Button>
        </div>
      ))}
    </div>
  );
}

export default App;

