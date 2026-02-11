export const GAME_RATES = [
  { name: '2up Down', rate: '1 SAR × 70 SAR', discount: '0%' },
  { name: '3up Direct', rate: '1 SAR × 400 SAR', discount: '0%' },
  { name: '3up Rumble', rate: '1 SAR × 80 SAR', discount: '0%' },
  { name: '3up Game Pair', rate: '1 SAR × 90 SAR', discount: '0%' },
  { name: '3up Single Digits', rate: '1 SAR × 3 SAR', discount: '0%' },
];

const SAUDI_NAMES = [
  'Ahmed Ali',
  'Faisal S.',
  'Khalid M.',
  'Omar Bin',
  'Saif Al',
  'Sultan K.',
  'VIP Winner',
  'Abdullah',
  'Naif Bin',
  'Yousef',
];

export const VIP_WINNERS = Array.from({ length: 25 }, (_, i) => ({
  name: SAUDI_NAMES[Math.floor(Math.random() * SAUDI_NAMES.length)] + '****',
  phone: `+966 50***${(i + 10).toString().padStart(2, '0')}`,
  amount: Math.floor(Math.random() * 50000 + 40000),
}));
