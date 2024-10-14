// app/names/[id]/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const NameDetail = ({ params }: { params: { id: string } }) => {
  const [name, setName] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      const response = await fetch(`/api/names/${params.id}`);
      const data = await response.json();
      setName(data);
    };

    fetchName();
  }, [params.id]);

  if (!name) return <div>Loading...</div>;

  return (
    <div>
      <h1>{name.name}</h1>
      <Image src={`data:image/jpeg;base64,${name.image}`} alt={name.name} />
    </div>
  );
};

export default NameDetail;
