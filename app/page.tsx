import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import NavBar from "./components/NavBar";

export default function Home() {

  return (
    <div className="w-full h-screen">
      <NavBar/>
    </div>
  );
}
