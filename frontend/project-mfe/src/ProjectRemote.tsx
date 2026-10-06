import ProjectApp from "./App";
import QueryProvider from "./Providers/QueryProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";

interface ProjectRemoteProps {
  accessToken: string | null;
}

function ProjectRemote({ accessToken }: ProjectRemoteProps) {
  return (
    <Provider store={store}>
      <QueryProvider>
        <ProjectApp accessToken={accessToken} />
      </QueryProvider>
    </Provider>
  );
}

export default ProjectRemote;
