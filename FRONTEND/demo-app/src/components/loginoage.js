// import React, { useState, useEffect } from "react";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [customers, setCustomers] = useState([]);

//   useEffect(() => {
//     fetchData();
//   },[]);

//   const fetchData = () => {
//     fetch("http://localhost:3000/users")
//       .then((response) => response.json())
//       .then((data) => setCustomers(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   };

//   const handleLogin = async () => {
//     try {
      
//       // Basic validation
//       if (!username || !password) {
//         setErrors(["Username and password are required."]);
//         return;
//       }

//       // Password validation
//       if (!isPasswordValid(password)) {
//         setErrors(["Invalid password. It must contain at least one digit and one special character."]);
//         return;
//       }

//       // Check if the username exists in the database
//       if (!isUsernameExists(username)) {
        
//         setErrors(["Username does not exist. Register first."]);
//         return;
//       }
      
//       // Successful login
//       fetchData();
//       alert("Login successful!");
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   const handleRegister = async () => {
//     try {
//       // Basic validation
//       if (!username || !password) {
//         setErrors(["Username and password are required."]);
//         return;
//       }

//       // Password validation
//       if (!isPasswordValid(password)) {
//         setErrors(["Invalid password. It must contain at least one digit and one special character."]);
//         return;
//       }

//       // Check if the username already exists
//       if (isUsernameExists(username)) {
//         setErrors(["Username already exists. Choose a different username."]);
//         return;
//       }

//       // Send a request to the backend to register the new user
//       const response = await fetch("http://localhost:3000/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });

//       // Check if the registration was successful
//       if (response.ok) {
//         alert("Registration successful!");
//       } else {
//         // Handle registration error
//         const responseBody = await response.json();
//         setErrors([`Registration failed: ${responseBody.message || "Unknown error"}`]);
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setErrors(["Registration failed. Please try again later."]);
//     }
//   };

//   const isUsernameExists = (username) => {
//     return customers.some((customer) => customer.username === username);
//   };

//   const isPasswordValid = (password) => {
//     // Password must contain at least one digit and one special character
//     const digitRegex = /\d/;
//     const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

//     return digitRegex.test(password) && specialCharRegex.test(password);
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <div>
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button onClick={handleLogin}>Login</button> <br></br>
//       <button onClick={handleRegister}>Register here(If not register)</button>
//       {errors.map((error, index) => (
//         <div key={index} style={{ color: "red" }}>
//           {error}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleLogin = async () => {
    try {
      // Basic validation
      if (!username || !password) {
        setErrors(["Username and password are required."]);
        return;
      }

      // Password validation
      if (!isPasswordValid(password)) {
        setErrors([
          "Invalid password. It must contain at least one digit and one special character.",
        ]);
        return;
      }

      // Check if the username exists in the database
      if (!isUsernameExists(username)) {
        setErrors(["Username does not exist. Register first."]);
        return;
      }

      // Successful login
      fetchData();
      alert("Login successful!");
      // Redirect to the welcome page
      navigate(`/welcome/${username}`);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async () => {
    try {
      // Basic validation
      if (!username || !password) {
        setErrors(["Username and password are required."]);
        return;
      }

      // Password validation
      if (!isPasswordValid(password)) {
        setErrors([
          "Invalid password. It must contain at least one digit and one special character.",
        ]);
        return;
      }

      // Check if the username already exists
      if (isUsernameExists(username)) {
        setErrors(["Username already exists. Choose a different username."]);
        return;
      }

      // Send a request to the backend to register the new user
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // Check if the registration was successful
      if (response.ok) {
        alert("Registration successful!");
      } else {
        // Handle registration error
        const responseBody = await response.json();
        setErrors([
          `Registration failed: ${responseBody.message || "Unknown error"}`,
        ]);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors(["Registration failed. Please try again later."]);
    }
  };

  const isUsernameExists = (username) => {
    return customers.some((customer) => customer.username === username);
  };

  const isPasswordValid = (password) => {
    // Password must contain at least one digit and one special character
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    return digitRegex.test(password) && specialCharRegex.test(password);
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button> <br></br>
      <button onClick={handleRegister}>Register here (If not registered)</button>
      {errors.map((error, index) => (
        <div key={index} style={{ color: "red" }}>
          {error}
        </div>
      ))}
    </div>
  );
};

export default LoginPage;
