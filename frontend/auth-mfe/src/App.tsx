import { QueryClientProvider } from "@tanstack/react-query"

import { authQuery } from "./queryClient";

import Login from "./Login";

interface AppProps {
  onLoginSuccess: (accessToken: string) => void;
}

function App({onLoginSuccess}:AppProps) {
  return (<div>
    <QueryClientProvider client={authQuery}><Login onLoginSuccess={onLoginSuccess}/></QueryClientProvider>
  </div>);
}


export default App;