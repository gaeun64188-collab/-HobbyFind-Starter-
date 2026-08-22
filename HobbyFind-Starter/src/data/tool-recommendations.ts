export type ToolCategory = '운동형' | '수집형' | '예술형';

export interface ToolItem {
  name: string;
  description: string;
  detail: string;
}

export const toolRecommendations: Record<ToolCategory, ToolItem[]> = {
  운동형: [
    {
      name: '러닝화',
      description: '가볍고 쿠셔닝이 좋은 신발',
      detail: '조깅과 러닝을 시작할 때 충격 흡수와 안정감이 가장 중요합니다.',
    },
    {
      name: '요가 매트',
      description: '접지력과 쿠션이 있는 기본 매트',
      detail: '요가, 스트레칭, 몸풀기 루틴을 안정적으로 시작할 수 있어요.',
    },
    {
      name: '물병 & 손수건',
      description: '운동 중 수분 보충용 필수 아이템',
      detail: '습관형성과 루틴 유지에 도움이 되는 기본 도구입니다.',
    },
  ],
  수집형: [
    {
      name: '보관 진열장',
      description: '아이템을 잘 보이게 정리하는 공간',
      detail: 'LP, 식물, 피규어처럼 소장품은 보관 방식이 취향을 드러냅니다.',
    },
    {
      name: '컬렉션 노트',
      description: '구매 기록과 취향을 정리하는 메모장',
      detail: '어떤 아이템을 왜 좋아했는지 기록하면 수집의 재미가 커져요.',
    },
    {
      name: '진열용 스탠드',
      description: '작은 소장품을 돋보이게 하는 도구',
      detail: '최소한의 공간을 활용해 정리와 감상 모두를 만족시켜 줍니다.',
    },
  ],
  예술형: [
    {
      name: '기본 드로잉 세트',
      description: '연필, 스케치북, 지우개 조합',
      detail: '그림을 시작할 때 가장 먼저 필요한 도구는 익숙한 도구의 조합입니다.',
    },
    {
      name: '악기 연습 보조 도구',
      description: '메트로놈, 연습용 스탠드, 클리너',
      detail: '연습의 반복을 도와 꾸준함을 만들 수 있습니다.',
    },
    {
      name: '요리 도구 세트',
      description: '도마, 칼, 팬, 계량 도구',
      detail: '요리는 취미로 시작할 때 기본 장비가 안정적인 결과를 만듭니다.',
    },
  ],
};
