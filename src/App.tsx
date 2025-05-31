
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlayWithMascot from "@/pages/PlayWithMascot";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayWithMascot />
    </QueryClientProvider>
  );
}

export default App;
