import Link from "next/link";
import { useRouter } from "next/router";

type Crumb = {
  label: string;
  href: string;
};

export default function Breadcrumbs() {
  const router = useRouter();
  const pathParts = router.asPath.split("?")[0].split("/").filter(Boolean);

  // Build crumbs array
  const crumbs: Crumb[] = [];
  pathParts.forEach((part, idx) => {
    const href = "/" + pathParts.slice(0, idx + 1).join("/");
    // Capitalize first letter, keep camelCase if present
    const label = part.charAt(0).toUpperCase() + part.slice(1);
    crumbs.push({ label, href });
  });

  return (
    <nav aria-label="Breadcrumb" className="w-full text-lg py-2 px-2">
      <ol className="flex flex-row flex-wrap items-center space-x-2 text-white">
        {crumbs.map((crumb, idx) => (
          <li key={crumb.href} className="flex items-center">
            {idx > 0 && <span className="mx-1 text-gray-400">/</span>}
            {idx < crumbs.length - 1 ? (
              <Link href={crumb.href} className="hover:underline text-white">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-semibold text-yellow-300">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
