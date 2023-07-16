import { Layout } from "./components/layout";

export const ErrorPage = () => {
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-center text-3xl font-bold">Woops!</h1>
        <p className="text-center">Something went wrong...</p>
      </div>
    </Layout>
  );
};
