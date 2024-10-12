import React from "react";
import Image from "next/image";
import { appsData } from "../appData";
import { notFound } from "next/navigation";

interface AppPageProps {
  params: { id: string };
}

export default function AppPage({ params }: AppPageProps) {
  const app = appsData.find((app) => app.id === params.id);

  if (!app) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Image src={app.icon} alt={`${app.name} logo`} width={64} height={64} />
      <h1 className="text-2xl font-bold">{app.name}</h1>
      <p>{app.description}</p>
    </div>
  );
}
