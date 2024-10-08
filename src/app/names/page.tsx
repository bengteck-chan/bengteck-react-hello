// app/names/page.tsx
"use client";

import { useState, useEffect } from "react";

interface Name {
  id: number;
  name: string;
  image: string | Buffer; // Or whichever type you expect the image to be
}

const NameList = () => {
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const response = await fetch("/api/names");
      const data = await response.json();
      setNames(data);
    };

    fetchNames();
  }, []);

  return (
    <div>
      <table>
      <caption>
       Name List
      </caption>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name.id}>
              <td>{name.id}</td>
              <td>{name.name}</td>
              <td>
              <img src={`data:image/jpeg;base64,${name.image}`} alt={name.name} width='100'/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NameList;
