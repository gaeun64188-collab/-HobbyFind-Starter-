'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Message = { id: number; nick: string; text: string; createdAt: string };
type Party = { id: number; title: string; place?: string; participants: number; capacity: number };

const CATEGORY_MAP: { key: string; label: string }[] = [
  { key: '운동형', label: '🏃‍♂️ 운동/러닝' },
  { key: '수집형', label: '📷 수집/카메라' },
  { key: '예술형', label: '🎨 예술/드로잉' },
];

export default function CommunityPage() {
  const [active, setActive] = useState<string>(CATEGORY_MAP[0].key);

  // messages per category
  const MSG_KEY = (cat: string) => `community_messages_${cat}`;
  const [nick, setNick] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MSG_KEY(active));
      setMessages(raw ? JSON.parse(raw) : []);
    } catch (e) {
      setMessages([]);
    }
  }, [active]);

  const saveMessages = (next: Message[]) => {
    try { localStorage.setItem(MSG_KEY(active), JSON.stringify(next)); } catch (e) {}
  };

  const submitMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!nick.trim() || !text.trim()) return;
    const m: Message = { id: Date.now(), nick: nick.trim(), text: text.trim(), createdAt: new Date().toISOString() };
    const next = [m, ...messages];
    setMessages(next);
    saveMessages(next);
    setText('');
  };

  // simple party cards
  const PARTY_KEY = (cat: string) => `community_parties_${cat}`;
  const [parties, setParties] = useState<Party[]>(() => []);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinedParty, setJoinedParty] = useState<Party | null>(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [kakaoCode, setKakaoCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PARTY_KEY(active));
      if (raw) setParties(JSON.parse(raw));
      else {
        const seed: Party[] = [
          { id: 1, title: `${active} 주말 모임`, place: '한강', participants: 1, capacity: 4 },
          { id: 2, title: `${active} 초보 스터디`, place: '온라인', participants: 2, capacity: 6 },
        ];
        setParties(seed);
        localStorage.setItem(PARTY_KEY(active), JSON.stringify(seed));
      }
    } catch (e) {
      setParties([]);
    }
  }, [active]);

  const saveParties = (next: Party[]) => {
    try { localStorage.setItem(PARTY_KEY(active), JSON.stringify(next)); } catch (e) {}
  };

  const joinParty = (id: number) => {
    const next = parties.map((p) => p.id === id && p.participants < p.capacity ? { ...p, participants: p.participants + 1 } : p);
    const joined = next.find((p) => p.id === id) ?? null;
    setParties(next);
    saveParties(next);
    setJoinedParty(joined);
    setShowJoinModal(true);
  };

  const makeKakaoCode = (party: Party | null) => {
    if (!party) return null;
    // simple mock code: KAKAO-<6 chars>
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `KAKAO-${rand}`;
  };

  const openKakaoCode = () => {
    const code = makeKakaoCode(joinedParty);
    setKakaoCode(code);
    setShowCodeModal(true);
    setShowJoinModal(false);
  };

  const copyCode = async () => {
    if (!kakaoCode) return;
    try {
      await navigator.clipboard.writeText(kakaoCode);
    } catch (e) {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf3] p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#4d3a2b]">💬 취미 커뮤니티</h1>
            <p className="text-sm text-[#5f4b3a]">카테고리를 선택하고 최신 글 / 모임을 확인하세요.</p>
          </div>
          <Link href="/" className="text-sm font-bold text-[#8e6a4f] underline">홈으로</Link>
        </div>

        <div className="mb-6 flex gap-2">
          {CATEGORY_MAP.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`px-3 py-1 rounded-full font-bold ${active === c.key ? 'bg-[#ee8d5d] text-white' : 'bg-[#fffaf3] text-[#5b3d2d] border-2 border-[#e1c7a6]'}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <section className="md:col-span-2">
            <div className="mb-4 p-4 border-2 border-[#d9c4aa] bg-[#fffaf4]">
              <form onSubmit={submitMessage} className="flex gap-2">
                <input value={nick} onChange={(e) => setNick(e.target.value)} placeholder="닉네임" className="w-28 border-2 border-[#e1c7a6] p-2" />
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder="한 줄 메시지 입력" className="flex-1 border-2 border-[#e1c7a6] p-2" />
                <button type="submit" className="px-4 py-2 bg-[#ee8d5d] text-white font-bold border-2 border-[#7a5134]">작성</button>
              </form>
            </div>

            <div className="space-y-3">
              {messages.length === 0 && <p className="text-sm text-[#8e6a4f]">아직 글이 없습니다. 첫 글을 남겨보세요!</p>}
              {messages.map((m) => (
                <div key={m.id} className="relative rounded-lg border-2 border-[#e1c7a6] bg-[#fffaf5] p-3">
                  <div className="absolute -left-3 top-4 h-6 w-6 rounded-full bg-[#ee8d5d] text-white flex items-center justify-center font-bold">{m.nick.slice(0,1)}</div>
                  <div className="ml-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-[#4d3a2b]">{m.nick}</div>
                      <div className="text-xs text-[#8e6a4f]">{new Date(m.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="mt-1 text-sm text-[#5f4b3a]">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside>
            <div className="mb-4 p-4 border-2 border-[#d9c4aa] bg-[#fffaf4]">
              <h3 className="font-extrabold text-[#4d3a2b]">같이 할 파티</h3>
            </div>

            <div className="space-y-3">
              {parties.map((p) => (
                <div key={p.id} className="rounded-lg border-2 border-[#e1c7a6] bg-[#fffaf5] p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#4d3a2b]">{p.title}</div>
                      <div className="text-xs text-[#8e6a4f]">{p.place}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-bold">{p.participants}/{p.capacity}</div>
                      <button onClick={() => joinParty(p.id)} disabled={p.participants >= p.capacity} className="mt-2 px-3 py-1 rounded-full border-2 bg-[#FAF4E8] text-[#5C4033] font-bold">참여하기</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
      {showJoinModal && joinedParty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm p-6 border-4 border-[#7a5134] bg-[#fffaf3] shadow-[6px_6px_0_#7a5134]">
            <h3 className="font-extrabold text-lg mb-3">{joinedParty.title}에 참여했습니다</h3>
            <p className="text-sm text-[#5f4b3a] mb-4">지금 채팅방에 입장하시겠어요?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowJoinModal(false)} className="border-2 border-[#e1c7a6] px-3 py-1">닫기</button>
              <button onClick={openKakaoCode} className="border-2 border-[#7a5134] bg-[#ee8d5d] px-3 py-1 font-bold text-white">채팅 입장</button>
            </div>
          </div>
        </div>
      )}

      {showCodeModal && kakaoCode && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xs p-6 border-4 border-[#7a5134] bg-[#fffaf3] shadow-[6px_6px_0_#7a5134] text-center">
            <h3 className="text-lg font-extrabold mb-2">카카오톡 오픈채팅 코드</h3>
            <p className="mb-4 text-sm text-[#5f4b3a]">아래 코드를 카카오톡에서 입력해 방에 참여하세요.</p>
            <div className="mx-auto mb-4 inline-block rounded bg-white py-3 px-4 font-mono text-lg font-bold tracking-widest border border-[#e1c7a6]">{kakaoCode}</div>
            <div className="flex justify-center gap-3">
              <button onClick={copyCode} className="px-3 py-1 border-2 bg-[#FAF4E8]">코드 복사</button>
              <button onClick={() => setShowCodeModal(false)} className="px-3 py-1 border-2 border-[#e1c7a6]">닫기</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
