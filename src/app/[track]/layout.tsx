import { notFound } from "next/navigation";
import Header from "@/components/Header";
import DoorIntro from "@/components/DoorIntro";
import { isTrack } from "@/data/languages";

export const generateStaticParams = () => [{ track: "frontend" }, { track: "backend" }];

export default async function TrackLayout({ children, params }: LayoutProps<"/[track]">) {
  const { track } = await params;
  if (!isTrack(track)) notFound();
  return (
    <div data-track={track} className="flex flex-1 flex-col">
      <Header track={track} />
      {children}
      <DoorIntro />
    </div>
  );
}
