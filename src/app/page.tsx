import Clients from "../components/sections/Clients/page";
import Contact from "../components/sections/Contact/page";
import Features from "../components/sections/Features/page";
import Hero from "../components/sections/Hero/page";


export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
       <Features />
    
      <Team />
      <Portfolio />
      <Clients />
      <Contact /> 
    </main>
  );
}