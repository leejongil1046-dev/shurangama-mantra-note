import type { ReactNode } from "react";

type StudyLayoutProps = {
  children: ReactNode;
};

export default function StudyLayout({ children }: StudyLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="h-16 border-b border-gray-200 px-4">
        <div className="flex h-full items-center justify-between">
          <div className="text-xl font-semibold">대불정수능엄신주 외우기</div>
          {/* <div className="text-sm text-gray-500">study mode</div> */}
        </div>
      </header>

      <main className="min-h-[calc(100vh-56px)]">{children}</main>
    </div>
  );
}
