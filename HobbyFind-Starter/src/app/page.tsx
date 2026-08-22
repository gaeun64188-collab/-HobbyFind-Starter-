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

  // --- 로그인 상태(localStorage 기반) ---
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userName');
      if (stored) setUserName(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('userName');
    } catch (e) {}
    setUserName(null);
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

  // --- 오늘의 취미 뽑기 (룰렛) 상태 및 로직 ---
  const DRAW_KEY = 'hobby_draw_date';
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [drawDone, setDrawDone] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [drawIndex, setDrawIndex] = useState(0);
  const [drawSelection, setDrawSelection] = useState<null | { name: string; emoji: string; tip: string }>(null);

  const DRAW_ITEMS = useMemo(
    () => [
      { name: 'LP 수집', emoji: '💿', tip: '음반 가게를 주말마다 방문해 보세요 — 운이 좋으면 희귀 음반을 발견할 수 있어요.' },
      { name: '밤 러닝', emoji: '🌙🏃‍♂️', tip: '반사 조끼와 헤드라이트로 안전을 확보하세요.' },
      { name: '픽셀 아트', emoji: '🎨', tip: '작은 캔버스(16x16)부터 시작해 보세요 — 복잡함은 천천히.' },
      { name: '실내 클라이밍', emoji: '🧗‍♀️', tip: '처음엔 기초 코스에서 폼과 호흡을 연습하세요.' },
      { name: '앤틱 리폼', emoji: '🪑', tip: '작은 서랍이나 의자부터 도전해 보세요 — 페인트가 큰 변화를 줍니다.' },
      { name: '홈 브루잉', emoji: '🍺', tip: '간단한 스타터 키트로 소규모로 시작하세요.' },
      { name: '가죽 공예', emoji: '👜', tip: '기본 바느질과 코바늘 기술로 소품을 만들어보세요.' },
    ],
    []
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAW_KEY);
      const today = new Date().toISOString().slice(0, 10);
      if (stored === today) setDrawDone(true);
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  const openDraw = () => {
    if (drawDone) return;
    setShowDrawModal(true);
    setSpinning(true);

    const start = Date.now();
    const duration = 2200; // ms
    const interval = 80; // ms
    const id = window.setInterval(() => {
      setDrawIndex((i) => (i + 1) % DRAW_ITEMS.length);
      if (Date.now() - start >= duration) {
        window.clearInterval(id);
        const final = Math.floor(Math.random() * DRAW_ITEMS.length);
        setDrawIndex(final);
        setDrawSelection(DRAW_ITEMS[final]);
        setSpinning(false);
        setDrawDone(true);
        try {
          const today = new Date().toISOString().slice(0, 10);
          localStorage.setItem(DRAW_KEY, today);
        } catch (e) {}
      }
    }, interval);
  };

  const closeDraw = () => {
    setShowDrawModal(false);
    // keep drawDone state (one-per-day)
  };

  // --- 내 프로필 생성기 상태 및 로직 ---
  const CREATED_KEY = 'created_profiles';
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdProfiles, setCreatedProfiles] = useState<any[]>(() => {
    try {
      const raw = localStorage.getItem(CREATED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [createName, setCreateName] = useState('');
  const [createLocation, setCreateLocation] = useState('');
  const [createCategory, setCreateCategory] = useState<HobbyCategory>('예술형');
  const [createHobbies, setCreateHobbies] = useState<Array<{ name: string; detail: string }>>([
    { name: '', detail: '' },
  ]);
  const [createProfileImage, setCreateProfileImage] = useState('');
  const [createCoverImage, setCreateCoverImage] = useState('');

  const openCreate = () => setShowCreateModal(true);
  const closeCreate = () => setShowCreateModal(false);

  const addCreateHobby = () => setCreateHobbies((h) => [...h, { name: '', detail: '' }]);
  const removeCreateHobby = (idx: number) =>
    setCreateHobbies((h) => h.filter((_, i) => i !== idx));

  const saveCreatedProfiles = (items: any[]) => {
    try {
      localStorage.setItem(CREATED_KEY, JSON.stringify(items));
    } catch (e) {}
  };

  const submitCreate = () => {
    const id = Date.now();
    const hobbyName = createHobbies.find((h) => h.name)?.name ?? '취미 없음';
    const bio = createHobbies.map((h) => `${h.name}${h.detail ? ` — ${h.detail}` : ''}`).join('; ');
    const newProfile = {
      id,
      name: createName || `사용자${id}`,
      category: createCategory,
      hobby: hobbyName,
      location: createLocation || '',
      bio,
      profileColor: '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0'),
      profileImage: createProfileImage,
      coverImage: createCoverImage,
    };

    const next = [newProfile, ...createdProfiles];
    setCreatedProfiles(next);
    saveCreatedProfiles(next);

    // ensure followState has an entry for this profile id
    setFollowState((prev) => ({
      ...prev,
      [id]: { isFollowing: false, count: Math.floor(Math.random() * 50) + 5 },
    }));

    // reset form and close
    setCreateName('');
    setCreateLocation('');
    setCreateHobbies([{ name: '', detail: '' }]);
    setCreateProfileImage('');
    setCreateCoverImage('');
    setShowCreateModal(false);
  };

  // --- edit / delete for created profiles ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editCategory, setEditCategory] = useState<HobbyCategory>('예술형');
  const [editHobbies, setEditHobbies] = useState<Array<{ name: string; detail: string }>>([]);
  const [editProfileImage, setEditProfileImage] = useState('');
  const [editCoverImage, setEditCoverImage] = useState('');

  const openEdit = (profile: any) => {
    // populate edit form
    setEditingId(profile.id);
    setEditName(profile.name ?? '');
    setEditLocation(profile.location ?? '');
    setEditCategory(profile.category ?? '예술형');
    // parse hobbies from bio if available, fall back to single hobby
    if (profile.hobbies) {
      setEditHobbies(profile.hobbies);
    } else if (profile.bio) {
      const parts = String(profile.bio).split(';').map((s: string) => s.trim()).filter(Boolean);
      setEditHobbies(parts.map((p: string) => {
        const [name, detail] = p.split('—').map((s: string) => s.trim());
        return { name: name || p, detail: detail || '' };
      }));
    } else {
      setEditHobbies([{ name: profile.hobby ?? '', detail: '' }]);
    }
    setEditProfileImage(profile.profileImage ?? '');
    setEditCoverImage(profile.coverImage ?? '');
    setShowEditModal(true);
  };

  const submitEdit = () => {
    if (editingId == null) return;
    const bio = editHobbies.map((h) => `${h.name}${h.detail ? ` — ${h.detail}` : ''}`).join('; ');
    const next = createdProfiles.map((p) => p.id === editingId ? {
      ...p,
      name: editName,
      location: editLocation,
      category: editCategory,
      hobby: editHobbies.find(h=>h.name)?.name ?? p.hobby,
      bio,
      profileImage: editProfileImage,
      coverImage: editCoverImage,
      hobbies: editHobbies,
    } : p);
    setCreatedProfiles(next);
    saveCreatedProfiles(next);
    setShowEditModal(false);
    setEditingId(null);
  };

  const deleteCreated = (profileId: number) => {
    const next = createdProfiles.filter((p) => p.id !== profileId);
    setCreatedProfiles(next);
    saveCreatedProfiles(next);
    // remove followState entry if present
    setFollowState((prev) => {
      const copy = { ...prev } as any;
      delete copy[profileId];
      return copy;
    });
  };

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
            {userName ? (
              <div className="flex items-center gap-3">
                <p className="text-sm font-bold text-[#5C4033]">{userName}님 환영합니다!</p>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-[#FAF4E8] text-[#5C4033] text-xs font-bold border-2 border-[#5C4033] shadow-[2px_2px_0px_#7a5134] hover:bg-[#F2E5D0]"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 bg-[#FAF4E8] text-[#5C4033] text-xs font-bold border-2 border-[#5C4033] shadow-[2px_2px_0px_0px_#5C4033] hover:bg-[#F2E5D0]"
              >
                로그인
              </Link>
            )}
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

      {/* 오늘의 취미 뽑기 버튼 영역 */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex gap-4">
            <button
              onClick={openDraw}
              disabled={drawDone}
              className={
                `border-4 border-[#7a5134] bg-[#fffaf3] px-4 py-2 text-sm font-bold shadow-[4px_4px_0_#7a5134] transition-colors ` +
                (drawDone
                  ? 'text-[#8e6a4f] opacity-60 cursor-not-allowed'
                  : 'text-[#5C4033] hover:bg-[#f7efe8]')
              }
            >
              🎲 {drawDone ? '오늘의 취미 뽑기 완료 (내일 다시 도전!)' : '오늘의 취미 뽑기'}
            </button>

            <button
              onClick={openCreate}
              className="border-4 border-[#7a5134] bg-[#fffaf3] px-4 py-2 text-sm font-bold shadow-[4px_4px_0_#7a5134] hover:bg-[#f7efe8]"
            >
              ✨ 내 프로필 생성하기
            </button>
          </div>
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
          {(createdProfiles.concat(displayedUsers)).map((user) => {
            const coverImage = resolveHobbyCoverImage(
              user.hobby,
              user.category as HobbyCategory
            );

            // 이름(name)을 기준으로 profiles 데이터 매칭
            const matchedProfile = profiles.find((p) => p.name === user.name);
            const matchedCreated = createdProfiles.find((p) => p.name === user.name);
            const profileId = matchedProfile?.id ?? matchedCreated?.id ?? 1;

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

                    {/* edit/delete for created profiles */}
                    {createdProfiles.some((p) => p.id === profileId) && (
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEdit(user); }}
                          className="rounded-full px-2 py-1 text-xs font-bold border-2 bg-[#fffaf3]"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteCreated(profileId); }}
                          className="rounded-full px-2 py-1 text-xs font-bold border-2 bg-[#fffaf3]"
                        >
                          🗑️
                        </button>
                      </div>
                    )}

                    {/* moved avatar and profile text into the card body for stable layout */}
                  </div>

                  <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
                          style={{ backgroundColor: user.profileColor, borderColor: '#e9e6e1', color: '#ffffff' }}
                        >
                          {user.name.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-lg font-extrabold text-[#4d3a2b] truncate">{user.name}</p>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8e6a4f] truncate">{user.category}</p>
                        </div>
                      </div>
                      <span className="rounded-full border border-[#e7d7c1] bg-[#fffaf3] px-2 py-1 text-[10px] font-bold text-[#5f4b3a]">
                        {user.location}
                      </span>
                    </div>

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
      {/* Draw modal */}
      {showDrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-6 border-4 border-[#7a5134] bg-[#fffaf3] shadow-[6px_6px_0_#7a5134] relative">
            <button
              onClick={closeDraw}
              className="absolute top-3 right-3 rounded border-2 border-[#e1c7a4] bg-white/90 px-2 py-1 font-bold"
            >
              ✖
            </button>

            <h2 className="text-lg font-extrabold mb-4">🎲 오늘의 취미 픽셀 뽑기</h2>

            <div className="flex items-center justify-center h-36 mb-4">
              <div className="text-5xl mr-4">{DRAW_ITEMS[drawIndex].emoji}</div>
              <div className="text-2xl font-extrabold">{DRAW_ITEMS[drawIndex].name}</div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={openDraw}
                disabled={spinning || drawDone}
                className={`border-2 px-4 py-2 font-bold rounded ` +
                  (spinning || drawDone
                    ? 'bg-[#f0e7d8] text-[#8e6a4f] cursor-not-allowed'
                    : 'bg-[#FAF4E8] text-[#5C4033] hover:bg-[#f7efe8]')}
              >
                {spinning ? '돌림 중...' : drawDone ? '이미 완료' : '돌려보기'}
              </button>
              <button onClick={closeDraw} className="border-2 border-[#e1c7a6] px-4 py-2 font-bold rounded bg-white/90">
                닫기
              </button>
            </div>

            {drawSelection && !spinning && (
              <div className="mt-4 p-3 border-t border-[#e1c7a6]">
                <p className="font-extrabold text-xl">오늘의 추천: {drawSelection.emoji} {drawSelection.name}</p>
                <p className="mt-2 text-sm text-[#5f4b3a]">{drawSelection.tip}</p>
                <div className="mt-3 text-2xl">🎉 ✨ 🎊</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create profile modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl p-6 border-4 border-[#7a5134] bg-[#fffaf3] shadow-[6px_6px_0_#7a5134] relative">
            <button
              onClick={closeCreate}
              className="absolute top-3 right-3 rounded border-2 border-[#e1c7a4] bg-white/90 px-2 py-1 font-bold"
            >
              ✖
            </button>

            <h2 className="text-lg font-extrabold mb-4">✨ 내 프로필 생성하기</h2>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-bold">이름</label>
                <input className="w-full border-2 border-[#e1c7a6] p-2" value={createName} onChange={(e) => setCreateName(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-bold">지역</label>
                <input className="w-full border-2 border-[#e1c7a6] p-2" value={createLocation} onChange={(e) => setCreateLocation(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-bold">카테고리</label>
                <select className="w-full border-2 border-[#e1c7a6] p-2" value={createCategory} onChange={(e) => setCreateCategory(e.target.value as HobbyCategory)}>
                  <option value="운동형">운동형</option>
                  <option value="수집형">수집형</option>
                  <option value="예술형">예술형</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">취미 목록</label>
                <div className="space-y-2">
                  {createHobbies.map((h, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input placeholder="취미 이름" className="flex-1 border-2 border-[#e1c7a6] p-2" value={h.name} onChange={(e) => setCreateHobbies((prev) => prev.map((it, i) => i === idx ? { ...it, name: e.target.value } : it))} />
                      <input placeholder="경력/시간" className="w-40 border-2 border-[#e1c7a6] p-2" value={h.detail} onChange={(e) => setCreateHobbies((prev) => prev.map((it, i) => i === idx ? { ...it, detail: e.target.value } : it))} />
                      <button type="button" onClick={() => removeCreateHobby(idx)} className="border-2 px-2">삭제</button>
                    </div>
                  ))}
                  <button type="button" onClick={addCreateHobby} className="mt-2 border-2 px-3 py-1 font-bold">+ 취미 추가</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold">프로필 이미지 URL</label>
                <input className="w-full border-2 border-[#e1c7a6] p-2" value={createProfileImage} onChange={(e) => setCreateProfileImage(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-bold">배경화면 이미지 URL</label>
                <input className="w-full border-2 border-[#e1c7a6] p-2" value={createCoverImage} onChange={(e) => setCreateCoverImage(e.target.value)} />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={submitCreate} className="border-2 border-[#7a5134] bg-[#fffaf3] px-4 py-2 font-bold shadow-[4px_4px_0_#7a5134]">등록</button>
                <button onClick={closeCreate} className="border-2 border-[#e1c7a6] px-4 py-2">취소</button>
              </div>
            </div>
          </div>
        </div>
      )}

      

      {/* Edit profile modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl p-6 border-4 border-[#7a5134] bg-[#fffaf3] shadow-[6px_6px_0_#7a5134] relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 rounded border-2 border-[#e1c7a4] bg-white/90 px-2 py-1 font-bold"
            >
              ✖
            </button>

            <h2 className="text-lg font-extrabold mb-4">✏️ 프로필 수정</h2>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-bold">이름</label>
                <input className="w-full border-2 border-[#e1c7a6] p-2" value={editName} onChange={(e) => setEditName(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-bold">지역</label>
                <input className="w-full border-2 border-[#e1c7a6] p-2" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-bold">카테고리</label>
                <select className="w-full border-2 border-[#e1c7a6] p-2" value={editCategory} onChange={(e) => setEditCategory(e.target.value as HobbyCategory)}>
                  <option value="운동형">운동형</option>
                  <option value="수집형">수집형</option>
                  <option value="예술형">예술형</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">취미 목록</label>
                <div className="space-y-2">
                  {editHobbies.map((h, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input placeholder="취미 이름" className="flex-1 border-2 border-[#e1c7a6] p-2" value={h.name} onChange={(e) => setEditHobbies((prev) => prev.map((it, i) => i === idx ? { ...it, name: e.target.value } : it))} />
                      <input placeholder="경력/시간" className="w-40 border-2 border-[#e1c7a6] p-2" value={h.detail} onChange={(e) => setEditHobbies((prev) => prev.map((it, i) => i === idx ? { ...it, detail: e.target.value } : it))} />
                      <button type="button" onClick={() => setEditHobbies((prev) => prev.filter((_, i) => i !== idx))} className="border-2 px-2">삭제</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setEditHobbies((h) => [...h, { name: '', detail: '' }])} className="mt-2 border-2 px-3 py-1 font-bold">+ 취미 추가</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold">프로필 이미지 URL</label>
                <input className="w-full border-2 border-[#e1c7a6] p-2" value={editProfileImage} onChange={(e) => setEditProfileImage(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-bold">배경화면 이미지 URL</label>
                <input className="w-full border-2 border-[#e1c7a6] p-2" value={editCoverImage} onChange={(e) => setEditCoverImage(e.target.value)} />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={submitEdit} className="border-2 border-[#7a5134] bg-[#fffaf3] px-4 py-2 font-bold shadow-[4px_4px_0_#7a5134]">저장</button>
                <button onClick={() => setShowEditModal(false)} className="border-2 border-[#e1c7a6] px-4 py-2">취소</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
