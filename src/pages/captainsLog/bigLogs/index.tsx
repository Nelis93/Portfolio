import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Redirect to /products if the user lands on /products/new-products
  return {
    redirect: {
      destination: "/captainsLog", // The target redirect URL
      permanent: false, // Use false for temporary redirect (HTTP 302), true for permanent (HTTP 308)
    },
  };
};

// If you have a default export for this page, it can remain here, but it will not be rendered because of the redirect.
export default function bigLogs() {
  return null; // Optional: You can also display a placeholder if redirection somehow fails
}
