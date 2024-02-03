"use client"
import Dashboard from "@/components/Dashboard/Dashboard";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    // Check if this is the first time the component is rendered
    const isFirstRender = sessionStorage.getItem('isFirstRender') === null;
  
    if (isFirstRender) {
      // Perform any actions you need to do only on the first render
      console.log('First render. Refreshing the page...');
  
      // Trigger a page refresh
      window.location.reload();
      console.log('Page refreshed');
    }
  
    // Set a flag in sessionStorage to indicate that the page has been refreshed
    sessionStorage.setItem('isFirstRender', 'false');
  }, []);
  


  return (
    <main className="max-h-[calc(100vh-120px)]">
      <Dashboard/>
    </main>
  )
}
