// app/names/page.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Name {
  id: number;
  name: string;
  image: string | Buffer; // Or whichever type you expect the image to be
}

const NameListComponent = ({ getNameApi }: { getNameApi: string }) => {
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const response = await fetch(getNameApi);
      const data = await response.json();
      setNames(data);
    };

    fetchNames();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <caption className="text-lg font-bold mb-4">Name List</caption>
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Id</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Image</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{name.id}</td>
              <td className="px-4 py-2">{name.name}</td>
              <td className="px-4 py-2">
                <Image src={`data:image/jpeg;base64,${name.image}`} alt={name.name} width='100' height='50' className="object-cover h-10 w-20" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NameListComponent;
