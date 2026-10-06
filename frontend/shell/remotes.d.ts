declare module "authMFE/Login" {
  import type { ComponentType } from "react";

  interface LoginProps {
    onLoginSuccess: (accessToken: string) => void;
  }

  const Login: ComponentType<LoginProps>;

  export default Login;
}

// .d.ts
// is a type script declaration

declare module "projectMFE/Project" {
  const ProjectApp: React.ComponentType<any>;
  export default ProjectApp;
}
