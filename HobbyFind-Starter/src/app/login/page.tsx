

'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] flex items-center justify-center p-4">
      <div className="w-full max-w-md border-2 border-[#7a5134] bg-[#fffaf4] p-6 shadow-[6px_6px_0_#eadac0]">
        <h1 className="pixel-title text-2xl font-bold text-[#4d3a2b] text-center mb-6">
          HobbyQuest 로그인
        </h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-bold text-[#5b3d2d] mb-1">
              이메일
            </label>
            <input
              type="email"
              placeholder="example@hobbyquest.com"
              className="w-full border-2 border-[#d9c4aa] p-2 text-sm bg-white focus:outline-none focus:border-[#ee8d5d]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#5b3d2d] mb-1">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border-2 border-[#d9c4aa] p-2 text-sm bg-white focus:outline-none focus:border-[#ee8d5d]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-[#ee8d5d] text-white font-bold border-2 border-[#7a5134] shadow-[3px_3px_0_#d8b08d] hover:bg-[#e07c4b]"
          >
            로그인
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-[#8e6a4f] underline">
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}