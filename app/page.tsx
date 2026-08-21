import BottomNav from "@/components/BottomNav";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#fcf8f8] flex flex-col">
      <HomePage />
      <BottomNav />
    </div>
  );
}
