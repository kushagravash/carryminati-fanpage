export type ContentCategory = 'comedy' | 'collaboration' | 'gaming' | 'music';

export type VideoItem = {
  id: string;
  title: string;
  creatorChannel: 'CarryMinati' | 'CarryisLive';
  category: ContentCategory;
  categories: ContentCategory[];
  videoId: string;
  videoUrl: string;
  thumbnailUrl: string;
  shortDescription: string;
  collaborators: string[];
  collaboratorNote?: string;
  featured?: boolean;
  researchSource: string;
  selectionReason: string;
};

const officialMain = 'https://www.youtube.com/@CarryMinati/videos';
const officialLive = 'https://www.youtube.com/@CarryisLive/videos';

function officialVideo(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export const videos: VideoItem[] = [
  {
    id: 'mr-beast-parody',
    title: 'MR BEAST PARODY 🤑 Ft. INDIAN CREATORS | CARRYMINATI',
    creatorChannel: 'CarryMinati',
    category: 'collaboration',
    categories: ['collaboration'],
    videoId: 'm9s1NQG3TNY',
    videoUrl: officialVideo('m9s1NQG3TNY'),
    thumbnailUrl: 'https://i.ytimg.com/vi/m9s1NQG3TNY/hqdefault.jpg',
    shortDescription: 'A creator-cast parody; the official title explicitly identifies Indian creators.',
    collaborators: [],
    collaboratorNote: 'Indian creators (as stated in the official title)',
    featured: true,
    researchSource: officialMain,
    selectionReason: 'Official channel upload verified by title and oEmbed; it foregrounds multi-creator work rather than solo performance.',
  },
  {
    id: 'daily-vloggers-parody',
    title: 'DAILY VLOGGERS PARODY 😘 | CARRYMINATI',
    creatorChannel: 'CarryMinati',
    category: 'collaboration',
    categories: ['collaboration'],
    videoId: '5XVoRGhrhZk',
    videoUrl: officialVideo('5XVoRGhrhZk'),
    thumbnailUrl: 'https://i.ytimg.com/vi/5XVoRGhrhZk/hqdefault.jpg',
    shortDescription: 'An ensemble-style parody built around daily-vlogger culture; the source video carries the full cast context.',
    collaborators: [],
    researchSource: officialMain,
    selectionReason: 'Official channel upload; chosen as a distinct group/sketch entry alongside the larger creator parody.',
  },
  {
    id: 'gaming-creator-meetup',
    title: "INDIA'S GAMING CREATOR MEETUP",
    creatorChannel: 'CarryisLive',
    category: 'collaboration',
    categories: ['collaboration', 'gaming'],
    videoId: '5FJXrSfiyfc',
    videoUrl: officialVideo('5FJXrSfiyfc'),
    thumbnailUrl: 'https://i.ytimg.com/vi/5FJXrSfiyfc/hqdefault.jpg',
    shortDescription: 'A CarryisLive upload built around a gaming-creator meetup; follow the original for the lineup and interactions.',
    collaborators: [],
    collaboratorNote: 'Gaming creators (event title; individual names not asserted here)',
    researchSource: officialLive,
    selectionReason: 'Official CarryisLive title identifies a multi-creator event and broadens the archive beyond solo gameplay.',
  },
  {
    id: 'recreating-viral-memes',
    title: 'RECREATING VIRAL MEMES 😂😂',
    creatorChannel: 'CarryisLive',
    category: 'gaming',
    categories: ['gaming'],
    videoId: 'jIrKUzQBlPs',
    videoUrl: officialVideo('jIrKUzQBlPs'),
    thumbnailUrl: 'https://i.ytimg.com/vi/jIrKUzQBlPs/hqdefault.jpg',
    shortDescription: 'A recent CarryisLive upload bringing internet-meme material into the channel’s video mix.',
    collaborators: [],
    researchSource: officialLive,
    selectionReason: 'Recent official CarryisLive upload, useful for showing that the gaming channel also ranges beyond gameplay.',
  },
  {
    id: 'funniest-game-ever',
    title: 'FUNNIEST GAME EVER 😂😂',
    creatorChannel: 'CarryisLive',
    category: 'gaming',
    categories: ['gaming'],
    videoId: 'QPSnfeGj6ds',
    videoUrl: officialVideo('QPSnfeGj6ds'),
    thumbnailUrl: 'https://i.ytimg.com/vi/QPSnfeGj6ds/hqdefault.jpg',
    shortDescription: 'A game-led CarryisLive session presented through the channel’s comedic framing.',
    collaborators: [],
    researchSource: officialLive,
    selectionReason: 'Official channel video, selected to represent spontaneous game-first entertainment.',
  },
  {
    id: 'not-ready-gta-vi',
    title: 'WE ARE NOT READY FOR GTA VI',
    creatorChannel: 'CarryisLive',
    category: 'gaming',
    categories: ['gaming'],
    videoId: 'fp1Ywp3MmUU',
    videoUrl: officialVideo('fp1Ywp3MmUU'),
    thumbnailUrl: 'https://i.ytimg.com/vi/fp1Ywp3MmUU/hqdefault.jpg',
    shortDescription: 'A CarryisLive gaming-channel upload built around the anticipation for GTA VI.',
    collaborators: [],
    researchSource: officialLive,
    selectionReason: 'Verified official gaming-channel title and a recognisable game-culture entry.',
  },
  {
    id: 'unemployment-on-peak',
    title: 'UNEMPLOYMENT ON PEAK 📈 | CARRYMINATI',
    creatorChannel: 'CarryMinati',
    category: 'comedy',
    categories: ['comedy'],
    videoId: 'bMTlNeKqV4o',
    videoUrl: officialVideo('bMTlNeKqV4o'),
    thumbnailUrl: 'https://i.ytimg.com/vi/bMTlNeKqV4o/hqdefault.jpg',
    shortDescription: 'A topical comedy upload; the original supplies the full joke and context.',
    collaborators: [],
    researchSource: officialMain,
    selectionReason: 'A recent official CarryMinati upload that adds a current comedy entry to the archive.',
  },
  {
    id: 'weirdest-indian-street-food',
    title: 'WEIRDEST INDIAN STREET FOOD 😵 | CARRYMINATI',
    creatorChannel: 'CarryMinati',
    category: 'comedy',
    categories: ['comedy'],
    videoId: 'lWBj9z2xDDs',
    videoUrl: officialVideo('lWBj9z2xDDs'),
    thumbnailUrl: 'https://i.ytimg.com/vi/lWBj9z2xDDs/hqdefault.jpg',
    shortDescription: 'A reaction-format comedy video around unusual Indian street-food clips.',
    collaborators: [],
    researchSource: officialMain,
    selectionReason: 'Verified official title and thumbnail; represents reaction-led comedy rather than only roast monologues.',
  },
  {
    id: 'saas-bahu-aur-saanp',
    title: 'SAAS BAHU AUR SAANP | CARRYMINATI',
    creatorChannel: 'CarryMinati',
    category: 'comedy',
    categories: ['comedy'],
    videoId: '465iEeNOEBg',
    videoUrl: officialVideo('465iEeNOEBg'),
    thumbnailUrl: 'https://i.ytimg.com/vi/465iEeNOEBg/hqdefault.jpg',
    shortDescription: 'A character-led sketch using the dramatic language of family serials.',
    collaborators: [],
    researchSource: officialMain,
    selectionReason: 'Official upload that shows the sketch and character-comedy side of the channel.',
  },
  {
    id: 'motivational-speaker-parody',
    title: 'MOTIVATIONAL SPEAKER PARODY | CARRYMINATI',
    creatorChannel: 'CarryMinati',
    category: 'comedy',
    categories: ['comedy'],
    videoId: 'P8P_S1Fjl_Q',
    videoUrl: officialVideo('P8P_S1Fjl_Q'),
    thumbnailUrl: 'https://i.ytimg.com/vi/P8P_S1Fjl_Q/hqdefault.jpg',
    shortDescription: 'A direct parody of motivational-speaker tropes.',
    collaborators: [],
    researchSource: officialMain,
    selectionReason: 'Official title explicitly marks the video as a parody and adds format diversity.',
  },
  {
    id: 'mc-salman-bigg-boss',
    title: 'MC SALMAN FT BIGG BOSS - CARRYMINATI',
    creatorChannel: 'CarryMinati',
    category: 'comedy',
    categories: ['comedy'],
    videoId: 'iFtH6g5HEVM',
    videoUrl: officialVideo('iFtH6g5HEVM'),
    thumbnailUrl: 'https://i.ytimg.com/vi/iFtH6g5HEVM/hqdefault.jpg',
    shortDescription: 'A music-and-reality-TV-flavoured comedy entry; the original title is preserved.',
    collaborators: [],
    researchSource: officialMain,
    selectionReason: 'Official channel title combines character comedy with a music-video format.',
  },
  {
    id: 'yalgaar',
    title: 'YALGAAR - CARRYMINATI X Wily Frenzy',
    creatorChannel: 'CarryMinati',
    category: 'music',
    categories: ['music'],
    videoId: 'zzwRbKI2pn4',
    videoUrl: officialVideo('zzwRbKI2pn4'),
    thumbnailUrl: 'https://i.ytimg.com/vi/zzwRbKI2pn4/hqdefault.jpg',
    shortDescription: 'An official music release credited in its title to CarryMinati and Wily Frenzy.',
    collaborators: ['Wily Frenzy'],
    researchSource: officialMain,
    selectionReason: 'Official music upload and a verified title credit for collaborator Wily Frenzy.',
  },
  {
    id: 'vardaan',
    title: 'VARDAAN - CARRYMINATI X Wily Frenzy',
    creatorChannel: 'CarryMinati',
    category: 'music',
    categories: ['music'],
    videoId: '7mFvyrNHZRY',
    videoUrl: officialVideo('7mFvyrNHZRY'),
    thumbnailUrl: 'https://i.ytimg.com/vi/7mFvyrNHZRY/hqdefault.jpg',
    shortDescription: 'A music release credited in the official title to CarryMinati and Wily Frenzy.',
    collaborators: ['Wily Frenzy'],
    researchSource: officialMain,
    selectionReason: 'Official music upload that represents a separate lyrical/performance register.',
  },
  {
    id: 'jalwa',
    title: 'JALWA - CARRYMINATI X WILY FRENZY',
    creatorChannel: 'CarryMinati',
    category: 'music',
    categories: ['music'],
    videoId: 'P6EfPeYnf0c',
    videoUrl: officialVideo('P6EfPeYnf0c'),
    thumbnailUrl: 'https://i.ytimg.com/vi/P6EfPeYnf0c/hqdefault.jpg',
    shortDescription: 'An official music video credited in the title to CarryMinati and Wily Frenzy.',
    collaborators: ['Wily Frenzy'],
    researchSource: officialMain,
    selectionReason: 'Official Linktree-highlighted music release; its title credits Wily Frenzy.',
  },
];

export const categoryLabels: Record<ContentCategory, string> = {
  comedy: 'Roasts & Sketches',
  collaboration: 'Collaborations',
  gaming: 'CarryisLive',
  music: 'Music',
};

export const officialChannels = {
  main: 'https://www.youtube.com/@CarryMinati',
  gaming: 'https://www.youtube.com/@CarryisLive',
  linkHub: 'https://linktr.ee/ajeynagar',
};
