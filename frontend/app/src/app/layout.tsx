import type { Metadata } from "next";
import "./globals.css";

import ClientLayout from "./clientLayout";

/**
 * The metadata object defines the title and description of the application. This information
 * will be used for SEO purposes and in the HTML <head> section.
 * 
 * @property {string} title - The title of the application, which is used in the browser tab and search engines.
 * @property {string} description - A brief description of the application used for SEO.
 *
 */
export const metadata: Metadata = {
  title: "Great-repository-names-are-short-and-memorable",
  description: "BBQ Mode",
};

/**
 * RootLayout component is used as the main layout wrapper for the application.
 * It sets the basic HTML structure and wraps children components in the ClientLayout.
 *
 * @param {Object} props - Properties passed to the RootLayout component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout.
 *
 * @returns {JSX.Element} The root layout of the application.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
