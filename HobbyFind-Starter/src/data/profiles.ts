export type HobbyCategory = '운동형' | '수집형' | '예술형';

export interface ProfileStat {
  label: string;
  value: string;
}

export interface HobbyCollectionItem {
  id: number;
  title: string;
  hobby: string;
  date: string;
  duration: string;
  description: string;
  accent: string;
}

export interface Profile {
  id: number;
  name: string;
  title: string;
  category: HobbyCategory;
  bio: string;
  hobbies: string[];
  location: string;
  score: number;
  accent: string;
  stats: ProfileStat[];
  collection: HobbyCollectionItem[];
}

export const categories: Array<{
  label: '전체' | HobbyCategory;
  description: string;
}> = [
  { label: '전체', description: '모든 취미를 한 번에 살펴보기' },
  { label: '운동형', description: '활동적이고 도전적인 취미' },
  { label: '수집형', description: '소장과 취향을 담는 취미' },
  { label: '예술형', description: '창작과 표현을 즐기는 취미' },
];

export const resolveHobbyCoverImage = (hobby: string, category?: HobbyCategory) => {
  const target = (hobby ?? '').toLowerCase();

  // 🏃‍♂️ 운동형
  if (target.includes('러닝') || target.includes('조깅') || target.includes('마라톤') || target.includes('달리기')) {
    return 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80';
  }
  if (target.includes('요가')) return 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80';
  if (target.includes('수영')) return 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=800&q=80';
  if (target.includes('자전거')) return 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80';
  if (target.includes('클라이밍')) return 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80';
  if (target.includes('댄스')) return 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80';

  // 📦 수집형
  if (target.includes('lp') || target.includes('음반') || target.includes('바이닐')) {
    return 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80';
  }
  if (target.includes('원두') || target.includes('와인') || target.includes('위스키')) {
    return 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80';
  }
  if (target.includes('식물') || target.includes('토분')) return 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80';
  if (target.includes('스니커즈') || target.includes('운동화')) return 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80';
  if (target.includes('레고') || target.includes('피규어')) return 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80';

  // 🎨 예술형
  if (target.includes('그림') || target.includes('스케치')) return 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80';
  if (target.includes('악기') || target.includes('연주')) return 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
  if (target.includes('요리') || target.includes('브런치')) return 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80';
  if (target.includes('서예') || target.includes('캘리그라피')) return 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?auto=format&fit=crop&w=800&q=80';
  if (target.includes('도자기')) return 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80';
  if (target.includes('글쓰기') || target.includes('작가')) return 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80';

  // 카테고리별 기본 백업 이미지
  if (category === '운동형') return 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80';
  if (category === '수집형') return 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80';
  if (category === '예술형') return 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80';

  return 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80';
};

export const getProfileCoverImage = (profile: Pick<Profile, 'hobbies' | 'category'>) => {
  const hobbyText = profile.hobbies.join(' ');
  return resolveHobbyCoverImage(hobbyText, profile.category);
};

export const profiles: Profile[] = [
  {
    id: 1,
    name: '서윤',
    title: '주말 러너',
    category: '운동형',
    bio: '도시를 한 바퀴 돌며 매주 새 코스를 찾는 것을 즐겨요.',
    hobbies: ['조깅/러닝', '자전거'],
    location: '서울',
    score: 4.9,
    accent: 'from-orange-400 via-rose-400 to-amber-300',
    stats: [
      { label: '수집한 기록', value: '18개' },
      { label: '누적 시간', value: '142시간' },
      { label: '주간 루틴', value: '4회' },
    ],
    collection: [
      {
        id: 101,
        title: '아침 러닝 기록',
        hobby: '조깅/러닝',
        date: '2026-08-04',
        duration: '45분',
        description: '한강변 루트 완주. 체력과 집중력이 함께 올라갔어요.',
        accent: 'from-orange-400 via-red-400 to-amber-300',
      },
      {
        id: 102,
        title: '성수동 자전거 투어',
        hobby: '자전거',
        date: '2026-07-27',
        duration: '1시간 20분',
        description: '도시를 한 바퀴 돌며 새로운 코스를 찾는 재미를 느꼈어요.',
        accent: 'from-cyan-400 via-sky-500 to-blue-400',
      },
      {
        id: 103,
        title: '주말 산책 루틴',
        hobby: '조깅/러닝',
        date: '2026-07-14',
        duration: '30분',
        description: '짧고 꾸준한 러닝이 가장 잘 맞는 습관으로 자리 잡았어요.',
        accent: 'from-amber-300 via-yellow-400 to-orange-400',
      },
    ],
  },
  {
    id: 2,
    name: '지훈',
    title: '수영 마니아',
    category: '운동형',
    bio: '초반엔 체력 훈련용이었지만 지금은 스트레스 해소 루틴이 되었어요.',
    hobbies: ['수영', '요가'],
    location: '부산',
    score: 4.8,
    accent: 'from-cyan-400 via-sky-400 to-blue-500',
    stats: [
      { label: '수집한 기록', value: '12개' },
      { label: '누적 시간', value: '98시간' },
      { label: '주간 루틴', value: '3회' },
    ],
    collection: [
      {
        id: 201,
        title: '평일 저녁 수영',
        hobby: '수영',
        date: '2026-08-06',
        duration: '50분',
        description: '몸의 긴장을 풀어주는 가장 효과적인 루틴이에요.',
        accent: 'from-cyan-400 via-blue-500 to-indigo-500',
      },
      {
        id: 202,
        title: '스트레칭 루틴',
        hobby: '요가',
        date: '2026-07-26',
        duration: '35분',
        description: '하체와 척추를 풀어주는 요가로 일상 회복에 도움을 줘요.',
        accent: 'from-violet-400 via-indigo-400 to-sky-400',
      },
    ],
  },
  {
    id: 3,
    name: '나래',
    title: '클라이밍 러버',
    category: '운동형',
    bio: '매번 다른 루트와 난이도를 도전하며 집중력을 키우고 있어요.',
    hobbies: ['클라이밍', '댄스'],
    location: '인천',
    score: 4.7,
    accent: 'from-violet-400 via-purple-500 to-fuchsia-400',
    stats: [
      { label: '수집한 기록', value: '9개' },
      { label: '누적 시간', value: '71시간' },
      { label: '주간 루틴', value: '2회' },
    ],
    collection: [
      {
        id: 301,
        title: '벽면 루트 도전',
        hobby: '클라이밍',
        date: '2026-08-01',
        duration: '1시간',
        description: '난이도가 올라갈수록 집중력을 더 많이 키우는 느낌이 들어요.',
        accent: 'from-violet-400 via-purple-500 to-fuchsia-500',
      },
      {
        id: 302,
        title: '댄스 스튜디오 세션',
        hobby: '댄스',
        date: '2026-07-23',
        duration: '40분',
        description: '리듬감이 몸에 스며들면서 움직임이 더 매끄러워졌어요.',
        accent: 'from-pink-400 via-rose-400 to-orange-400',
      },
    ],
  },
  {
    id: 4,
    name: '다은',
    title: 'LP 컬렉터',
    category: '수집형',
    bio: '좋은 음반을 찾는 과정 자체가 취미인 사람이에요.',
    hobbies: ['LP (바이닐) & 음반 수집'],
    location: '서울',
    score: 5.0,
    accent: 'from-amber-300 via-orange-400 to-red-400',
    stats: [
      { label: '수집한 기록', value: '26개' },
      { label: '누적 시간', value: '118시간' },
      { label: '보관 방식', value: '정리형' },
    ],
    collection: [
      {
        id: 401,
        title: '빈티지 LP 탐색',
        hobby: 'LP (바이닐) & 음반 수집',
        date: '2026-08-02',
        duration: '2시간',
        description: '소리의 질감과 재질을 비교해가며 찾는 과정이 가장 재미있어요.',
        accent: 'from-amber-300 via-orange-400 to-red-500',
      },
      {
        id: 402,
        title: '첫 앨범 수집',
        hobby: 'LP (바이닐) & 음반 수집',
        date: '2026-07-16',
        duration: '1시간 10분',
        description: '처음 사본을 고를 때마다 취향이 조금씩 드러나는 느낌이 있어요.',
        accent: 'from-yellow-300 via-amber-400 to-orange-500',
      },
    ],
  },
  {
    id: 5,
    name: '현우',
    title: '원두 탐험가',
    category: '수집형',
    bio: '카페마다 다른 원두를 비교하면서 향미를 기록하는 편이에요.',
    hobbies: ['스페셜티 원두 & 와인/위스키'],
    location: '대구',
    score: 4.8,
    accent: 'from-emerald-400 via-lime-400 to-yellow-300',
    stats: [
      { label: '수집한 기록', value: '15개' },
      { label: '누적 시간', value: '86시간' },
      { label: '관심 분야', value: '향미비교' },
    ],
    collection: [
      {
        id: 501,
        title: '브루잉 노트',
        hobby: '스페셜티 원두 & 와인/위스키',
        date: '2026-08-05',
        duration: '1시간 15분',
        description: '원두마다 다른 산미와 바디감이 색다르게 느껴졌어요.',
        accent: 'from-emerald-400 via-lime-400 to-yellow-300',
      },
      {
        id: 502,
        title: '향미 비교 세션',
        hobby: '스페셜티 원두 & 와인/위스키',
        date: '2026-07-19',
        duration: '50분',
        description: '숫자보다 향의 차이가 더 재미있게 남는 취미입니다.',
        accent: 'from-green-400 via-emerald-400 to-teal-400',
      },
    ],
  },
  {
    id: 6,
    name: '민재',
    title: '식물 집사',
    category: '수집형',
    bio: '희귀 식물과 토분 구성을 통해 공간의 분위기를 만드는 걸 좋아해요.',
    hobbies: ['식물 (희귀 식물/토분)'],
    location: '광주',
    score: 4.9,
    accent: 'from-green-400 via-emerald-500 to-teal-400',
    stats: [
      { label: '수집한 기록', value: '21개' },
      { label: '누적 시간', value: '94시간' },
      { label: '관리 방식', value: '토분 중심' },
    ],
    collection: [
      {
        id: 601,
        title: '희귀 식물 정리',
        hobby: '식물 (희귀 식물/토분)',
        date: '2026-08-03',
        duration: '1시간',
        description: '빛과 수분 조건을 맞추는 과정이 늘 새롭고 재미있어요.',
        accent: 'from-green-400 via-emerald-500 to-teal-400',
      },
      {
        id: 602,
        title: '토분 스타일링',
        hobby: '식물 (희귀 식물/토분)',
        date: '2026-07-18',
        duration: '1시간 20분',
        description: '식물의 크기와 화분 조합을 찾는 순간이 가장 만족스럽습니다.',
        accent: 'from-lime-400 via-green-500 to-emerald-500',
      },
    ],
  },
  {
    id: 7,
    name: '해인',
    title: '핀테크 가드너',
    category: '수집형',
    bio: '한정판 스니커즈는 단순한 소비가 아니라 감정의 축적이 있어요.',
    hobbies: ['스니커즈 (한정판 운동화)'],
    location: '서울',
    score: 4.9,
    accent: 'from-slate-500 via-stone-500 to-orange-400',
    stats: [
      { label: '수집한 기록', value: '19개' },
      { label: '누적 시간', value: '63시간' },
      { label: '모델 선호', value: '한정판' },
    ],
    collection: [
      {
        id: 701,
        title: '신발 박스 정리',
        hobby: '스니커즈 (한정판 운동화)',
        date: '2026-08-07',
        duration: '35분',
        description: '한정판을 고를 때마다 의미와 감정이 함께 남는 편이에요.',
        accent: 'from-slate-500 via-stone-500 to-orange-400',
      },
      {
        id: 702,
        title: '스니커즈 비교',
        hobby: '스니커즈 (한정판 운동화)',
        date: '2026-07-15',
        duration: '45분',
        description: '발볼, 쿠셔닝, 디자인을 함께 보며 나만의 기준을 세웁니다.',
        accent: 'from-neutral-500 via-zinc-500 to-amber-500',
      },
    ],
  },
  {
    id: 8,
    name: '우진',
    title: '피규어 편집자',
    category: '수집형',
    bio: '레고와 피규어를 조합해 취향이 드러나는 디스플레이를 좋아해요.',
    hobbies: ['레고 & 피규어'],
    location: '대전',
    score: 4.8,
    accent: 'from-amber-400 via-yellow-400 to-orange-500',
    stats: [
      { label: '수집한 기록', value: '23개' },
      { label: '누적 시간', value: '80시간' },
      { label: '전시 방식', value: '디스플레이' },
    ],
    collection: [
      {
        id: 801,
        title: '피규어 편집',
        hobby: '레고 & 피규어',
        date: '2026-08-08',
        duration: '1시간 10분',
        description: '작은 디테일을 조합해 취향이 드러나는 공간을 만들고 있어요.',
        accent: 'from-yellow-400 via-orange-500 to-red-400',
      },
      {
        id: 802,
        title: '레고 조립 기록',
        hobby: '레고 & 피규어',
        date: '2026-07-24',
        duration: '2시간',
        description: '꾸준히 조립하면서 결과물의 완성도를 높이는 재미가 있어요.',
        accent: 'from-amber-300 via-orange-300 to-yellow-400',
      },
    ],
  },
  {
    id: 9,
    name: '채린',
    title: '색채 탐험가',
    category: '예술형',
    bio: '작은 스케치 하나에도 자신만의 감정을 적어두는 편이에요.',
    hobbies: ['그림 그리기', '단편 글쓰기'],
    location: '서울',
    score: 4.9,
    accent: 'from-pink-400 via-rose-400 to-orange-300',
    stats: [
      { label: '수집한 기록', value: '24개' },
      { label: '누적 시간', value: '105시간' },
      { label: '대표 기법', value: '컬러 스케치' },
    ],
    collection: [
      {
        id: 901,
        title: '색감 스케치',
        hobby: '그림 그리기',
        date: '2026-08-10',
        duration: '1시간 30분',
        description: '색을 조합하며 감정과 분위기를 표현하는 게 제일 좋아요.',
        accent: 'from-pink-400 via-rose-400 to-orange-300',
      },
      {
        id: 902,
        title: '짧은 글쓰기',
        hobby: '단편 글쓰기',
        date: '2026-07-29',
        duration: '40분',
        description: '하루의 작은 감정이 글로 남는 순간이 가장 좋아요.',
        accent: 'from-orange-300 via-amber-400 to-yellow-300',
      },
    ],
  },
  {
    id: 10,
    name: '도현',
    title: '현악기 연주자',
    category: '예술형',
    bio: '악기 연주를 통해 하루의 피로를 덜고 감정을 정리해요.',
    hobbies: ['악기 연주'],
    location: '울산',
    score: 4.8,
    accent: 'from-indigo-400 via-purple-500 to-pink-400',
    stats: [
      { label: '수집한 기록', value: '14개' },
      { label: '누적 시간', value: '80시간' },
      { label: '주 연주', value: '현악기' },
    ],
    collection: [
      {
        id: 1001,
        title: '연습 세션 기록',
        hobby: '악기 연주',
        date: '2026-08-09',
        duration: '1시간',
        description: '지속적인 연습이 파트의 흐름을 더 부드럽게 만들고 있어요.',
        accent: 'from-indigo-400 via-purple-500 to-pink-400',
      },
      {
        id: 1002,
        title: '느린 멜로디',
        hobby: '악기 연주',
        date: '2026-07-21',
        duration: '45분',
        description: '잔잔한 멜로디가 마음을 정리하는 데 많은 도움이 되고 있어요.',
        accent: 'from-violet-400 via-indigo-500 to-fuchsia-500',
      },
    ],
  },
  {
    id: 11,
    name: '예은',
    title: '홈카페 크리에이터',
    category: '예술형',
    bio: '요리를 하며 색감과 향을 조합해 나만의 레시피를 만들어요.',
    hobbies: ['요리'],
    location: '성남',
    score: 4.9,
    accent: 'from-red-400 via-orange-400 to-yellow-300',
    stats: [
      { label: '수집한 기록', value: '17개' },
      { label: '누적 시간', value: '92시간' },
      { label: '특화 분야', value: '홈카페' },
    ],
    collection: [
      {
        id: 1101,
        title: '홈카페 브런치',
        hobby: '요리',
        date: '2026-08-11',
        duration: '1시간 20분',
        description: '재료의 조합과 색감이 더해질 때 즐거움이 배가 돼요.',
        accent: 'from-red-400 via-orange-400 to-yellow-300',
      },
      {
        id: 1102,
        title: '계절 메뉴 만들기',
        hobby: '요리',
        date: '2026-07-20',
        duration: '1시간',
        description: '가장 기본적인 재료로도 다채로운 맛을 만들 수 있어요.',
        accent: 'from-orange-300 via-amber-400 to-yellow-400',
      },
    ],
  },
  {
    id: 12,
    name: '민서',
    title: '서예 연습생',
    category: '예술형',
    bio: '붓의 흐름과 여백을 통해 마음을 정리하는 시간을 좋아해요.',
    hobbies: ['서예', '도자기 만들기'],
    location: '경기',
    score: 4.7,
    accent: 'from-stone-500 via-zinc-400 to-emerald-300',
    stats: [
      { label: '수집한 기록', value: '13개' },
      { label: '누적 시간', value: '74시간' },
      { label: '포커스', value: '여백' },
    ],
    collection: [
      {
        id: 1201,
        title: '붓놀림 연습',
        hobby: '서예',
        date: '2026-08-12',
        duration: '1시간',
        description: '붓의 선 속에서 흐름과 여백의 균형을 찾는 게 가장 즐거워요.',
        accent: 'from-stone-500 via-zinc-500 to-emerald-300',
      },
      {
        id: 1202,
        title: '도자기 만들기',
        hobby: '도자기 만들기',
        date: '2026-07-18',
        duration: '1시간 40분',
        description: '손끝으로 만드는 형태와 질감의 변화가 너무 매력적입니다.',
        accent: 'from-emerald-300 via-teal-400 to-stone-500',
      },
    ],
  },
];
