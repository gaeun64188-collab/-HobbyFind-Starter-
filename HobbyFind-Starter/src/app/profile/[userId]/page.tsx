import Link from 'next/link';
import { profiles, resolveHobbyCoverImage } from '@/data/profiles';

interface PageProps {
  params: Promise<{ userId: string }>; // id -> userId로 변경
}

export default async function ProfileDetailPage({ params }: PageProps) {
  // params에서 userId를 가져옴
  const { userId } = await params;
  const rawId = decodeURIComponent(userId || '');

  // ID 매칭
  const profile = profiles.find((p) => String(p.id) === rawId.trim());

  if (!profile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-[#fffaf3] p-4 text-center">
        <p className="text-xl font-bold text-[#5c4033]">
          프로필을 찾을 수 없습니다. (입력된 ID: "{rawId}")
        </p>
        <Link
          href="/"
          className="border-2 border-[#7a5134] bg-white px-4 py-2 font-bold text-[#5c4033] shadow-[3px_3px_0_#d8b08d] hover:bg-[#f7efe8]"
        >
          목록으로 돌아가기
        </Link>
      </main>
    );
  }

  const mainHobby = profile.hobbies[0] || '취미';
  const mainCoverImage = resolveHobbyCoverImage(mainHobby, profile.category);

  return (
    <main className="min-h-screen bg-[#fffaf3] pb-20 text-foreground">
      <header className="sticky top-0 z-20 border-b border-[#d7b99b] bg-[#fffaf3]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-[#7a5134] bg-[#ee8d5d] text-lg font-bold text-white shadow-[4px_4px_0_#d8b08d]">
              H
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-[#4d3a2b]">
                HobbyQuest
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="border-2 border-[#7a5134] bg-white px-4 py-2 text-sm font-bold text-[#5c4033] shadow-[3px_3px_0_#d8b08d] hover:bg-[#f7efe8]"
          >
            Back to explore
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-10 px-4 pt-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden border-2 border-[#7a5134] bg-[#fffaf4] shadow-[6px_6px_0_#eadac0]">
          <div
            className="relative h-56 w-full border-b-2 border-[#7a5134] bg-cover bg-center"
            style={{ backgroundImage: `url("${mainCoverImage}")` }}
          >
            <div className="absolute right-4 top-4 border-2 border-[#7a5134] bg-[#fffaf4] px-3 py-1 text-xs font-bold text-[#5c4033]">
              {profile.location || '지역 미정'}
            </div>
          </div>

          <div className="relative p-6 sm:p-8">
            <div className="absolute -top-12 left-6 flex items-center gap-4 sm:left-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#7a5134] bg-[#ee8d5d] text-xl font-extrabold text-white shadow-[4px_4px_0_rgba(0,0,0,0.15)]">
                {profile.name ? profile.name.slice(0, 2) : '익명'}
              </div>
              <div className="pt-10">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8e6a4f]">
                  {profile.title || profile.category}
                </p>
                <h1 className="text-xl font-black text-[#4d3a2b]">{profile.name}</h1>
              </div>
            </div>

            <div className="grid gap-6 pt-12 md:grid-cols-3">
              <div className="space-y-4 md:col-span-2">
                <p className="text-base font-medium leading-relaxed text-[#5f4b3a]">
                  {profile.bio || '등록된 소개가 없습니다.'}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {profile.hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className="border-2 border-[#7a5134] bg-[#f7ecd8] px-3 py-1 text-xs font-bold text-[#5b3d2d]"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>

              {profile.stats && profile.stats.length > 0 && (
                <div className="space-y-3">
                  {profile.stats.map((stat, idx) => (
                    <div key={idx} className="border-2 border-[#7a5134] bg-[#fffaf3] p-3 text-right shadow-[2px_2px_0_#d8b08d]">
                      <p className="text-[10px] font-bold uppercase text-[#8e6a4f]">{stat.label}</p>
                      <p className="text-2xl font-extrabold text-[#4d3a2b]">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {profile.collection && profile.collection.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#8e6a4f]">COLLECTION</p>
                <h2 className="text-2xl font-extrabold text-[#4d3a2b]">
                  {profile.name}의 취미 컬렉션
                </h2>
              </div>
              <span className="border-2 border-[#7a5134] bg-[#fffaf4] px-3 py-1 text-xs font-bold text-[#5c4033]">
                {profile.collection.length}개 기록
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {profile.collection.map((item) => {
                const itemImage = resolveHobbyCoverImage(item.hobby, profile.category);

                return (
                  <article key={item.id} className="overflow-hidden border-2 border-[#7a5134] bg-[#fffaf4] shadow-[4px_4px_0_#eadac0]">
                    <div
                      className="h-44 w-full border-b-2 border-[#7a5134] bg-cover bg-center"
                      style={{ backgroundImage: `url("${itemImage}")` }}
                    />
                    <div className="space-y-3 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#8e6a4f]">{item.hobby}</span>
                        <span className="border border-[#7a5134] bg-[#f7ecd8] px-2 py-0.5 text-[10px] font-bold text-[#5c4033]">
                          {item.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#4d3a2b]">{item.title}</h3>
                      <p className="text-xs text-[#5f4b3a]">{item.description}</p>
                      <div className="flex items-center justify-between pt-2 text-[10px] text-[#8e6a4f]">
                        <span>{item.date}</span>
                        <span>Hobby record</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}