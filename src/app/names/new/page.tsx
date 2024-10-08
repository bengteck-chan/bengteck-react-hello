// app/names/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddName = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    await fetch("/api/names", {
      method: "POST",
      body: formData,
    });

    router.push("/names");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label>Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </label>
      <label>Image
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />
      </label>
      <button type="submit">Add Name</button>
    </form>
  );
};

export default AddName;
