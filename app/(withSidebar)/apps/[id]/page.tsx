import React from "react";
import Image from "next/image";
import { appsData } from "../appData";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AppPageProps {
  params: Promise<{ id: string }>;
}

export default async function AppPage(props: AppPageProps) {
  const params = await props.params;
  const app = appsData.find((app) => app.id === params.id);

  if (!app) return <div>App not found</div>;

  return (
    <div className="mx-auto w-full max-w-xl p-3 pt-8">
      <div className="bg-card flex w-full flex-col space-y-6 rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="h-16 w-16 p-0">
              <Image
                src={app.icon}
                alt={`${app.name} logo`}
                width={64}
                height={64}
                className="m-0 rounded-lg"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">{app.name}</h1>
              <p className="text-muted-foreground">{app.category}</p>
            </div>
            <Link href={app.link} target="_blank">
              <Button className="h-9 w-9 gap-2 p-0" variant="secondary">
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground">{app.description}</p>
        <p className="text-muted-foreground">
          <span className="font-bold">Price:</span> {app.price}
        </p>
        <Separator />
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-semibold">What I use it for</Label>
          <p className="text-secondary-foreground">{app.useCase}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-semibold">Why I like it</Label>
          <p className="text-secondary-foreground">{app.whyLike}</p>
        </div>
      </div>
    </div>
  );
}
