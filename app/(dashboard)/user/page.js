"use client"

import Dashboard from "@/components/Dashboard/Dashboard";
import { useEffect } from "react";

export default function Home() {
  // function reloadPage() {
  //   // The last "domLoading" Time //
  //   var currentDocumentTimestamp =
  //   new Date(performance?.timing?.domLoading).getTime();
  //   // Current Time //
  //   var now = Date.now();
  //   // Ten Seconds //
  //   var tenSec = 10 * 1000;
  //   // Plus Ten Seconds //
  //   var plusTenSec = currentDocumentTimestamp + tenSec;
  //   if (now > plusTenSec) {
  //   location.reload();
  //   } else {}
  //  }
   
  //  reloadPage();

  //  useEffect(() => {
  //   reloadPage();
  // }, []);

  function reloadPage() {
    if (typeof window !== 'undefined') {
      // The last "domLoading" Time //
      var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
      // Current Time //
      var now = Date.now();
      // Ten Seconds //
      var tenSec = 10 * 1000;
      // Plus Ten Seconds //
      var plusTenSec = currentDocumentTimestamp + tenSec;
      if (now > plusTenSec) {
        location.reload();
      }
    }
  }
  
  useEffect(() => {
    reloadPage();
  }, []);
  



  // useEffect(() => {
  //   // Check if this is the first time the component is rendered
  //   const isFirstRender = sessionStorage.getItem('isFirstRender') === null;
  
  //   if (isFirstRender) {
  //     // Perform any actions you need to do only on the first render
  //     console.log('First render. Refreshing the page...');
  
  //     // Trigger a page refresh
  //     window.location.reload();
  //     console.log('Page refreshed');
  //   }
  
  //   // Set a flag in sessionStorage to indicate that the page has been refreshed
  //   sessionStorage.setItem('isFirstRender', 'false');
  // }, []);
  


  return (
    <main className="max-h-[calc(100vh-120px)]">
      <Dashboard/>
    </main>
  )
}
