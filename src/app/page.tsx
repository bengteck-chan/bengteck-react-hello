import Link from "next/link";
import { getRoute, getBasePath, isReverseProxy } from "./utilities";

export default function Home() {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Home</h1>
        <p>basePath: {getBasePath()}</p>
        <p>isReverseProxy: {isReverseProxy() ? "true" : "false"}</p>

        <div className="flex flex-col">
            <Link href={getRoute('/names')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">List Names</Link>
            <Link href={getRoute('/names/new')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Name</Link>
        </div>
        
      </div>
    </div>
  );

}
