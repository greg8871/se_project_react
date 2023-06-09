import { useState } from "react";
const location = { latitude: "38.8403", longitude: "-97.6114" };

const APIKey = "19c12edd94a9003e6e2ed1135b28ba85";
const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    Accept: "application/json",
  };
  export function useForm(inputValues) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (evt) => {
      const { value, name } = evt.target;
      setValues({ ...values, [name]: value });
    };
  
    return { values, handleChange, setValues };
  };
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  
export { location, APIKey, headers, emailRegex };
