'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { categories, profiles, resolveHobbyCoverImage, type HobbyCategory } from '@/data/profiles';
import { toolRecommendations, type ToolCategory } from '@/data/tool-recommendations';
import { CategoryPills } from '@/components/home/category-pills';
import { ProfileCard } from '@/components/home/profile-card';

const HOBBIES = [
  // 🏃‍♂️ 운동형
  { id: 'running', category: '운동형', title: '조깅 / 러닝', image: '/hobbies/sports_running.jpg' },
  { id: 'yoga', category: '운동형', title: '요가', image: '/hobbies/sports_yoga.jpg' },
  { id: 'swimming', category: '운동형', title: '수영', image: '/hobbies/sports_swimming.jpg' },
  { id: 'cycling', category: '운동형', title: '자전거', image: '/hobbies/sports_cycling.jpg' },
  { id: 'climbing', category: '운동형', title: '클라이밍', image: '/hobbies/sports_climbing.jpg' },
  { id: 'dance', category: '운동형', title: '댄스', image: '/hobbies/sports_dance.jpg' },

  // 📦 수집형
  { id: 'lp', category: '수집형', title: 'LP & 음반 수집', image: '/hobbies/collector_lp.jpg' },
  { id: 'beverage', category: '수집형', title: '원두 & 와인/위스키', image: '/hobbies/collector_beverage.jpg' },
  { id: 'plants', category: '수집형', title: '식물 & 토분', image: '/hobbies/collector_plants.jpg' },
  { id: 'sneakers', category: '수집형', title: '스니커즈', image: '/hobbies/collector_sneakers.jpg' },
  { id: 'lego', category: '수집형', title: '레고 & 피규어', image: '/hobbies/collector_lego.jpg' },

  // 🎨 예술형
  { id: 'drawing', category: '예술형', title: '그림 그리기', image: '/hobbies/art_drawing.jpg' },
  { id: 'instrument', category: '예술형', title: '악기 연주', image: '/hobbies/art_instrument.jpg' },
  { id: 'cooking', category: '예술형', title: '요리', image: '/hobbies/art_cooking.jpg' },
  { id: 'calligraphy', category: '예술형', title: '서예 & 캘리그라피', image: '/hobbies/art_calligraphy.jpg' },
  { id: 'pottery', category: '예술형', title: '도자기 만들기', image: '/hobbies/art_pottery.jpg' },
  { id: 'writing', category: '예술형', title: '단편 글쓰기', image: '/hobbies/art_writing.jpg' },
];

const USERS_DATA = [
  {
    name: '서윤',
    category: '운동형',
    hobby: '조깅/러닝',
    location: '서울',
    bio: '도시를 한 바퀴 돌며 매주 새 코스를 찾는 것을 즐겨요.',
    profileColor: '#F7B267',
  },
  {
    name: '지훈',
    category: '운동형',
    hobby: '수영',
    location: '부산',
    bio: '수영을 하면 몸이 가볍고 마음이 천천히 정리돼요.',
    profileColor: '#5DADE2',
  },
  {
    name: '나래',
    category: '운동형',
    hobby: '클라이밍',
    location: '인천',
    bio: '매번 다른 루트를 도전하며 집중력과 자신감을 키우고 있어요.',
    profileColor: '#A569BD',
  },
  {
    name: '다은',
    category: '수집형',
    hobby: 'LP & 음반 수집',
    location: '서울',
    bio: '좋은 음반을 찾는 과정 자체가 취미인 사람입니다.',
    profileColor: '#F39C12',
  },
  {
    name: '민재',
    category: '수집형',
    hobby: '식물 & 토분',
    location: '광주',
    bio: '식물의 생김새와 토분 조합을 고르는 게 제일 즐거워요.',
    profileColor: '#4CAF50',
  },
  {
    name: '해인',
    category: '수집형',
    hobby: '스니커즈',
    location: '서울',
    bio: '한정판 슈즈를 고를 때마다 취향이 드러나는 느낌이 좋아요.',
    profileColor: '#7F8C8D',
  },
  {
    name: '채린',
    category: '예술형',
    hobby: '그림 그리기',
    location: '서울',
    bio: '작은 스케치 하나에도 감정을 표현하는 게 제일 좋아요.',
    profileColor: '#E57373',
  },
  {
    name: '도현',
    category: '예술형',
    hobby: '악기 연주',
    location: '울산',
    bio: '악기를 통해 하루의 피로를 정리하고 감정을 표현해요.',
    profileColor: '#5C6BC0',
  },
  {
    name: '예은',
    category: '예술형',
    hobby: '요리',
    location: '성남',
    bio: '재료와 색감, 향을 조합해 나만의 레시피를 만들고 있어요.',
    profileColor: '#FF8A65',
  },
  {
    name: '민서',
    category: '예술형',
    hobby: '서예 & 캘리그라피',
    location: '경기',
    bio: '붓의 흐름과 여백을 통해 마음을 정리하는 시간을 좋아해요.',
    profileColor: '#9E9D24',
  },
];

export default function HomePage() 
{
  // 각 프로필별 팔로우 여부 및 팔로워 수 상태 관리
  const [followState, setFollowState] = useState<{
    [key: number]: { isFollowing: boolean; count: number };
  }>(() => {
    const initialState: { [key: number]: { isFollowing: boolean; count: number } } = {};
    profiles.forEach((profile) => {
      initialState[profile.id] = {
        isFollowing: false,
        count: Math.floor(Math.random() * 50) + 12, // 초기 임의 팔로워 수
      };
    });
    return initialState;
  });

  const toggleFollow = (e: React.MouseEvent, profileId: number) => {
    e.preventDefault(); // 프로필 상세페이지 이동 방지
    e.stopPropagation();

    setFollowState((prev) => {
      const current = prev[profileId] || { isFollowing: false, count: 0 };
      return {
        ...prev,
        [profileId]: {
          isFollowing: !current.isFollowing,
          count: current.isFollowing ? current.count - 1 : current.count + 1,
        },
      };
    });
  };
  
  const [activeCategory, setActiveCategory] = useState<'전체' | HobbyCategory>('전체');
  const [toolOffset, setToolOffset] = useState(0);

  const visibleProfiles = useMemo(() => {
    if (activeCategory === '전체') return profiles;
    return profiles.filter((profile) => profile.category === activeCategory);
  }, [activeCategory]);

  const categoryCycle = useMemo<ToolCategory[]>(() => {
    if (activeCategory === '전체') {
      return ['운동형', '수집형', '예술형'];
    }

    return [activeCategory];
  }, [activeCategory]);

  useEffect(() => {
    if (categoryCycle.length <= 1) return;

    const timer = setInterval(() => {
      setToolOffset((prev) => (prev + 1) % categoryCycle.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [categoryCycle]);

  const activeToolCategory = categoryCycle[toolOffset % categoryCycle.length];
  const displayedTools = toolRecommendations[activeToolCategory];

  const selectedSummary =
    categories.find((category) => category.label === activeCategory) ?? categories[0];

  const displayedUsers =
    activeCategory === '전체'
      ? USERS_DATA
      : USERS_DATA.filter((user) => user.category === activeCategory);

  return (
    <main className="min-h-screen text-foreground">
      <header className="sticky top-0 z-20 border-b border-[#d7b99b] bg-[#fffaf3]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-[#7a5134] bg-[#ee8d5d] text-lg font-bold text-white shadow-[4px_4px_0_#d8b08d]">
              H
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-charcoal-300">
                HobbyQuest
              </p>
            </div>
          </Link>

          {/* 우측 로그인 & 탐색 버튼 */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-1.5 bg-[#FAF4E8] text-[#5C4033] text-xs font-bold border-2 border-[#5C4033] shadow-[2px_2px_0px_0px_#5C4033] hover:bg-[#F2E5D0]"
            >
              로그인
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-2 border-[#d9c4aa] bg-white/80 text-foreground shadow-[4px_4px_0_#eadac0] hover:bg-[#f7efe8]"
            >
              Browse hobbies
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-1">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-2 border-2 border-[#7a5134] bg-[#f6ead9] px-3 py-1.5 text-sm font-bold text-[#5b3d2d] shadow-[4px_4px_0_#e6cba1]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block h-2 w-2 bg-[#ee8d5d]" />
              취미를 공유하고, 관심사를 발견하세요
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <h1 className="max-w-xl text-3xl sm:text-5xl lg:text-6xl">
                <span className="pixel-title block text-[#4d3a2b]">나만의 취미를</span>
                <span className="pixel-title mt-2 block text-[#d77d49] [text-shadow:3px_3px_0_#f1d4b4]">
                  모두와 나눠보세요
                </span>
              </h1>
              <p className="max-w-lg text-base leading-7 text-[#5f4b3a] sm:text-lg">
                HobbyQuest는 운동형, 수집형, 예술형 취미를 가진 사람들의 다양한 프로필을 한눈에 확인할 수 있는 공간입니다.
                같은 취향을 가진 사람들을 만나고, 나의 취미를 자연스럽게 자랑해 보세요.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="pixel-panel flex flex-col gap-5 p-4 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="pixel-label text-[#8e6a4f]">
                Discover by category
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#4d3a2b]">
                {selectedSummary.label === '전체'
                  ? '모든 취미 탐색'
                  : `${selectedSummary.label} 취미 커뮤니티`}
              </h2>
            </div>
            <CategoryPills activeCategory={activeCategory} onChange={setActiveCategory} />
          </div>

          <div className="border-2 border-[#e2c9a8] bg-[#f7f0e5] px-4 py-3 text-sm font-medium text-[#5f4b3a]">
            {selectedSummary.description}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="pixel-panel p-5 sm:p-6">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="pixel-label text-[#8e6a4f]">
                Beginner tools
              </p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#4d3a2b]">
                취미 입문 도구 추천
              </h3>
            </div>
            <span className="border-2 border-[#d9c4aa] bg-[#fffaf3] px-3 py-1 text-xs font-bold text-[#5b3d2d]">
              {activeToolCategory}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {displayedTools.map((tool) => (
              <div
                key={tool.name}
                className="border-2 border-[#e1c7a6] bg-[#fffaf5] p-4 shadow-[4px_4px_0_#eadac0]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8e6a4f]">
                    {activeToolCategory}
                  </p>
                  <span className="border border-[#d8b08d] bg-[#f7ecd8] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7a5134]">
                    starter
                  </span>
                </div>
                <p className="text-base font-extrabold text-[#4d3a2b]">{tool.name}</p>
                <p className="mt-2 text-sm font-bold text-[#d77d49]">{tool.description}</p>
                <p className="mt-3 text-sm leading-6 text-[#5f4b3a]">{tool.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Featured profiles</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-charcoal-300">
              {activeCategory === '전체' ? '모든 취미 프로필' : `${activeCategory} 프로필`}
            </h3>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">
            총 {visibleProfiles.length}명의 사용자가 참여 중
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {displayedUsers.map((user) => {
            const coverImage = resolveHobbyCoverImage(
              user.hobby,
              user.category as HobbyCategory
            );

            // 이름(name)을 기준으로 profiles 데이터 매칭
            const matchedProfile = profiles.find((p) => p.name === user.name);
            const profileId = matchedProfile?.id ?? 1;

            return (
              <Link key={`${user.name}-${user.hobby}`} href={`/profile/${profileId}`} className="block">
                <article className="overflow-hidden rounded-[18px] border-2 border-[#d9c4aa] bg-[#fffaf4] shadow-[6px_6px_0_#eadac0] transition-transform duration-200 hover:-translate-y-1">
                  <div className="relative h-40 overflow-hidden border-b-2 border-[#7a5134]">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url("${coverImage}")` }}
                    />

                    <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                      <span className="rounded-full border border-white/60 bg-white/10 px-2 py-1 text-[12px] font-bold text-white backdrop-blur-sm">
                        {followState[profileId]?.count ?? 0}
                      </span>

                      <button
                        onClick={(e) => toggleFollow(e, profileId)}
                        aria-label={followState[profileId]?.isFollowing ? 'Unfollow' : 'Follow'}
                        className={
                          `rounded-full px-3 py-1 text-xs font-bold shadow-[3px_3px_0_rgba(0,0,0,0.15)] border-2 transition-colors ` +
                          (followState[profileId]?.isFollowing
                            ? 'bg-[#5C4033] text-white border-[#3f2a21]'
                            : 'bg-[#FAF4E8] text-[#5C4033] border-[#5C4033]')
                        }
                      >
                        {followState[profileId]?.isFollowing ? 'Following' : 'Follow'}
                      </button>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-sm font-extrabold text-white shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
                          style={{ backgroundColor: user.profileColor }}
                        >
                          {user.name.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-lg font-extrabold text-white">{user.name}</p>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#f8e6d2]">
                            {user.category}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full border border-white/60 bg-white/10 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        {user.location}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="border border-[#d8b08d] bg-[#f7ecd8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5b3d2d]">
                        {user.category}
                      </span>
                      <span className="border border-[#e7d7c1] bg-[#f8f1e8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5f4b3a]">
                        {user.hobby}
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-[#5f4b3a]">{user.bio}</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}