import Image from "next/image";
import Homepage1 from "./Components/HomePage/Homepage1";
import Homepage2 from "./Components/HomePage/Homepage2";
import Homepage3 from "./Components/HomePage/Homepage3";
import Homepage4 from "./Components/HomePage/Homepage4";
import Homepage5 from "./Components/HomePage/Homepage5";

export default function Home() {
  return (
    <div className=" flex flex-col ">
      <section><Homepage1/></section>
      <section><Homepage2/></section>
      <section><Homepage3/></section>
      <section><Homepage4/></section>
      <section><Homepage5/></section>
     
    </div>
  );
}
