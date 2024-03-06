import Link from "next/link";



interface NavColProps {
  heading: string;
  links: {
    external: boolean;
    url: string;
    label: string;
  }[];
}

export function NavCol({ heading, links }: NavColProps) {
  return (
    <div className="px-4 text-center">
      <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">{heading}</h2>
      <nav className="list-none mb-10 flex flex-col">
        {links.map(link => (
          link.external ?
            (<li key={link.label}>
              <a
                className="text-gray-600 hover:text-gray-800"
                href={link.url}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {link.label}
              </a>
            </li>) : <Link key={link.label} href={link.url} className="text-gray-600 hover:text-gray-800">{link.label}</Link>
        ))}
        {/* <li>
          <a className="text-gray-600 hover:text-gray-800">First Link</a>
        </li>
        <li>
          <a className="text-gray-600 hover:text-gray-800">Second Link</a>
        </li>
        <li>
          <a className="text-gray-600 hover:text-gray-800">Third Link</a>
        </li>
        <li>
          <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
        </li> */}
      </nav>
    </div>
  );
}
