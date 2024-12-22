import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Card(props) {
  const { title, text, image, link } = props;
  return (
    <Link
      href={link}
      className="block w-full max-w-xs mx-auto my-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-500"
    >
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-lg font-bold text-gray-800">{title}</p>
        <p className="text-sm text-gray-600 mt-2">{text}</p>
      </div>
    </Link>
  );
}

export default Card;
