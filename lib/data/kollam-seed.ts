import type {
  AccoladeItem,
  AlbumPhoto,
  AnnouncementItem,
  DocumentItem,
  NewsItem,
  PageContent,
  PersonItem,
  SchoolConfig,
  VideoItem,
} from "@/lib/types/school";

export interface SchoolSeedBundle {
  config: SchoolConfig;
  announcements: AnnouncementItem[];
  news: NewsItem[];
  people: PersonItem[];
  documents: DocumentItem[];
  albums: AlbumPhoto[];
  videos: VideoItem[];
  accolades: AccoladeItem[];
  pages: PageContent[];
}

export const KOLLAM_SCHOOL_CONFIG: SchoolConfig = {
  id: "kollam",
  name: "Chinmaya Vidyalaya Kollam",
  shortName: "CV Kollam",
  campusName: "Chandanathope, Kollam",
  affiliationLabel: "Central Board of Secondary Education",
  affiliationRegNo: "Reg No. 930434",
  primaryDomain: "chinmaya-kollam.vercel.app",
  domains: ["chinmaya-kollam.vercel.app"],
  status: "published",
  isDemoData: false,
  theme: {
    primary: "#0F284A",
    secondary: "#FF9924",
    accent: "#FF6A00",
    accentAlt: "#385EEC",
    brandBlue: "#004B87",
    brandBlueDeep: "#1A457B",
    darkSurface: "#0B1121",
    navySurface: "#02133a",
    logoBadgeBg: "#DE7129",
    primaryContrast: "#ffffff",
    secondaryContrast: "#121214",
    accentContrast: "#ffffff",
  },
  branding: {
    logoWhiteBadge: "/logos/CV Kollam white logo.png",
    logoTextWhite: "/logos/CV Kollam text white.png",
    logoDark: "/logos/CV Kollam BLACK.png",
    logoWhiteFull: "/logos/CV Kollam WHITE.png",
    tintLogoText: true,
  },
  contact: {
    addressLines: ["Chinmaya Vidyalaya,", "Chandanathope, Kollam"],
    shortLocation: "Kollam, Kerala",
    phone: "0474 2712571",
    email: "chin_kollam@chintvm.edu.in",
    workingHours: ["Monday - Saturday", "8:30 AM - 4:00 PM"],
    mapEmbedUrl:
      "https://maps.google.com/maps?ll=8.934493,76.638692&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=1689960815386803714&output=embed",
  },
  social: {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  },
  navVisibility: {
    about: true,
    academics: true,
    activities: true,
    facilities: true,
    accolades: true,
    innovationHub: true,
    contact: true,
    hiddenSubRoutes: [],
  },
  hero: {
    mediaType: "video",
    mediaUrl: "/video/chinmayaVidyalaya kollam.mp4",
    overlayOpacity: 0.1,
  },
  visionMission: {
    enabled: true,
    visionTitle: "Our Vision",
    visionText:
      "We are a forward-thinking school aiming to prepare our children and students for a rapidly changing world by equipping them with critical thinking skills, global perspective, and respect for core values of honesty, loyalty, and compassion, leading to personal, physical, moral and spiritual development. Developing these skills is the corner stone of the education we offer following the Chinmaya Culture. Students will have success for today and be prepared for tomorrow. In the next two years the school will improve reading habits of each individual from Primary classes onwards and activities related to reading will also be included.",
    missionTitle: "Our Mission",
    missionText:
      "We at Chinmaya Vidyalaya, Kollam, commit to educate the whole child and honor the diversity of each individual intellectually, emotionally, socially, physically and spiritually by developing in each member of the student community the ability and passion to work wisely, creatively, and effectively for the betterment of humankind and implement the Chinmaya Vision Programme in its entirety.",
    quotesTitle: "Quotes from Gurudev",
    quotesBackgroundImage: "/image/gurudev2.jfif",
    quotes: [
      "What you have is all His Gift to you. What you do with what you have is your Gift to Him ...",
      "The mind is like a mirror, whatever comes in front of it is reflected in it.",
    ],
    floatingBadge: {
      enabled: true,
      line1: "AI &",
      line2: "Robotics",
      subtitle: "Chinmaya Science\nResearch",
      ctaText: "Explore",
      href: "/innovation-hub/ai-robotics",
    },
  },
  historySummary: {
    enabled: true,
    image: "/image/about3.webp",
    imageAlt: "Chinmaya Vidyalaya School Campus",
    paragraphs: [
      "CHINMAYA VIDYALAYA, CHANDANATHOPE, KOLLAM the temple of learning, located in the serene lap of nature, golden sunrises and crimson sunsets welcome flock of birds to the Vidyalaya campus to add mesmerizing sights and sounds. It is greenery all around, creating a conducive learning atmosphere.",
      "The education imparted in the Vidyalaya fulfills Pujya Gurudev Swami Chinmayananda's Vision of Education. It enables all Chinmaya kids to bloom with bright hues and spread the fragrance. The presence of Chinmaya Mission Acharya and the Ashram give the Vidyalaya a spiritual ambience. The holy shrine of the Lord Ganesha gives the Vidyalaya a peaceful environment. Chinmaya Blossom, the play school is a feather in the cap of the Vidyalaya. The school is affiliated upto classes XII.",
    ],
    ctaText: "Read More",
    ctaHref: "/about/beginning",
  },
  leadershipMessages: [
    {
      id: "principal",
      title: "MESSAGE FROM THE PRINCIPAL",
      name: "Mrs Nisha S S",
      role: "Principal",
      image: "/mentors/principal.jpeg",
      greeting: "Hari Om!",
      paragraphs: [
        "As we begin the journey in this new academic year, remember that everyday is a chance to learn something new, improve ourselves and move one step closer to our goals. Our Vidyalaya remains committed to nurturing students talents, inspiring aspirations and guiding them towards excellence.",
        "We empower our students to embrace challenges with confidence, learn from their own mistakes and never stop believing in their potential. Wishing you a year filled with discovery, innovation, success and endless learning opportunities. May Gurudev's blessings shower on each one of us!.",
      ],
    },
    {
      id: "vice-principal",
      title: "MESSAGE FROM THE VICE PRINCIPAL",
      name: "Mrs Sumutha S",
      role: "Vice Principal",
      image: "/mentors/vice principal.jpeg",
      greeting: "Hari Om!",
      paragraphs: [
        "Chinmaya Vidyalaya Kollam welcomes everyone to step into the world of success and excellence. As our school reopens, we are excited to continue nurturing young minds through quality education and modern technology.",
        "Smart classrooms, digital learning tools and innovative teaching methods help students learn more effectively and creatively. Let us work together to make this academic year productive and inspiring for every student.",
      ],
    },
  ],
  categoriesSection: {
    enabled: true,
    eyebrow: "New List",
    items: [
      { id: "planner", iconName: "CalendarDays", title: "Academic Planner", href: "/academics/academic-planner" },
      { id: "results", iconName: "Award", title: "Academic Results", href: "/academics/academic-results" },
      { id: "mentors", iconName: "Users", title: "Mentors", href: "/academics/mentors" },
      { id: "cocurricular", iconName: "Activity", title: "Co Curricular Activities", href: "/activities/co-curricular" },
      { id: "council", iconName: "Megaphone", title: "Student Council", href: "/academics/student-council" },
      { id: "scouts", iconName: "Compass", title: "Scouts & Guides", href: "/activities/scouts" },
      { id: "sports", iconName: "Trophy", title: "Sports", href: "/activities/sports" },
      { id: "arts", iconName: "Music", title: "Arts & Culture", href: "/activities/arts" },
    ],
  },
  recentNewsSection: {
    enabled: true,
    eyebrow: "Highlights",
  },
  testimonialsSection: {
    enabled: true,
    badge: "Our Testimonial",
  },
  facilitiesSection: {
    enabled: true,
    badge: "Campus Infrastructure",
    subtitle:
      "We provide state-of-the-art facilities to ensure a comprehensive and holistic educational environment for all our students.",
    items: [
      {
        id: "library",
        title: "Library",
        href: "/facilities/library",
        image: "/facilities/library.jpg",
        desc: "A vast collection of books, journals, and digital resources to inspire a love for reading.",
      },
      {
        id: "smart-class",
        title: "Smart Class",
        href: "/facilities/smart-class",
        image: "/facilities/smart class.jpg",
        desc: "Interactive digital boards and multimedia content for an engaging learning experience.",
      },
      {
        id: "labs",
        title: "Labs",
        href: "/facilities/labs",
        image: "/facilities/chem lab.jpeg",
        desc: "Well-equipped science and computer labs for practical, hands-on experiments.",
      },
      {
        id: "kindergarten",
        title: "KinderGarten",
        href: "/facilities/kindergarten",
        image: "/facilities/kindergarden.jpg",
        desc: "A nurturing and playful environment specifically designed for our youngest learners.",
      },
      {
        id: "sports-games",
        title: "Sports & Games",
        href: "/facilities/sports-games",
        image: "/facilities/sportsday.jpg",
        desc: "Extensive sports facilities encouraging physical fitness, teamwork, and healthy competition.",
      },
      {
        id: "chinmaya-blossoms",
        title: "Chinmaya Blossoms",
        href: "/facilities/chinmaya-blossoms",
        image: "/facilities/pre kg.jpg",
        desc: "A specialized Pre-KG program focusing on early childhood development and care.",
      },
    ],
  },
  footer: {
    description:
      "Providing a strong foundation for students to discover their innate talents and skills, fostering holistic development and academic excellence.",
    copyrightName: "Chinmaya Vidyalaya Kollam",
    poweredByText: "techosa.it",
    poweredByUrl: "#",
  },
  seo: {
    titleTemplate: "%s | Chinmaya Vidyalaya Kollam",
    defaultTitle: "Chinmaya Vidyalaya Kollam",
    defaultDescription:
      "Providing a strong foundation for students to discover their innate talents and skills.",
    ogImage: "/image/about3.webp",
  },
};

export const KOLLAM_ANNOUNCEMENTS: AnnouncementItem[] = [
  // TopBar ticker items
  {
    id: "ticker-1",
    kind: "ticker",
    title: "✨ Admission open for 2026-27 ✨",
    colorClass: "text-emerald-400",
    order: 1,
    status: "published",
  },
  {
    id: "ticker-2",
    kind: "ticker",
    title: "🔥 Upcoming Event: INFNI Tech Fest 🔥",
    colorClass: "text-[#FF9924]",
    order: 2,
    status: "published",
  },
  {
    id: "ticker-3",
    kind: "ticker",
    title: "📅 Annual Arts Fest starting next week 📅",
    colorClass: "text-[#385EEC]",
    order: 3,
    status: "published",
  },
  // AnnouncementModal flyers
  {
    id: "modal-1",
    kind: "modal",
    title: "Chinmaya Vidyalaya Class X and XII Results 2024-25",
    image: "/accolades/Class X and XII 2024-25.jpeg",
    alt: "Chinmaya Vidyalaya Class X and XII Results 2024-25",
    link: "/academics/academic-results",
    order: 1,
    status: "published",
  },
  {
    id: "modal-2",
    kind: "modal",
    title: "JEE Main Achievers",
    image: "/accolades/jee main.jpeg",
    alt: "JEE Main Achievers",
    link: "/accolades",
    order: 2,
    status: "published",
  },
  {
    id: "modal-3",
    kind: "modal",
    title: "Sports Ever-Rolling Trophy Winners",
    image: "/accolades/sports everrolling trophy.jpeg",
    alt: "Sports Ever-Rolling Trophy Winners",
    link: "/activities/sports",
    order: 3,
    status: "published",
  },
  // HistoryAnnouncements dated board
  {
    id: "board-1",
    kind: "board",
    title: "ENVIRONMENT DAY",
    dateLabel: "June 5, 2026",
    order: 1,
    status: "published",
  },
  {
    id: "board-2",
    kind: "board",
    title: "Class XII Result 2026",
    dateLabel: "May 23, 2026",
    order: 2,
    status: "published",
  },
  {
    id: "board-3",
    kind: "board",
    title: "Class X Result 2026",
    dateLabel: "April 16, 2026",
    order: 3,
    status: "published",
  },
  {
    id: "board-4",
    kind: "board",
    title: "Annual Sports Meet",
    dateLabel: "March 10, 2026",
    order: 4,
    status: "published",
  },
];

export const KOLLAM_NEWS: NewsItem[] = [
  {
    id: "news-1",
    image: "/news/infini.jpeg",
    badge: "Event",
    category: "Event",
    dateLabel: "Coming Soon",
    title: "INFNI",
    excerpt:
      "Experience innovation and excellence at INFNI, our premier technology and cultural symposium.",
    link: "/academics/news",
    featured: true,
    order: 1,
    status: "published",
  },
  {
    id: "news-2",
    image: "/news/tedx-cva.png",
    badge: "Special Event",
    category: "Event",
    dateLabel: "Recent",
    title: "TED-X Chinmaya Vidyalaya",
    excerpt:
      "An inspiring day of 'ideas worth spreading', featuring visionary speakers and thought-provoking discussions.",
    link: "/academics/news",
    featured: true,
    order: 2,
    status: "published",
  },
  {
    id: "news-3",
    image: "/news/arts fest.jpeg",
    badge: "Culture",
    category: "Culture",
    dateLabel: "Recent",
    title: "Arts Fest",
    excerpt:
      "A grand celebration of creativity, talent, and artistic expression by the vibrant students of our Vidyalaya.",
    link: "/academics/news",
    featured: true,
    order: 3,
    status: "published",
  },
  {
    id: "news-4",
    image: "/news/environment day.jpeg",
    badge: "Campus",
    category: "Campus",
    dateLabel: "Recent",
    title: "Environment Day",
    excerpt:
      "Taking steps towards a greener future. Students participated in tree plantation drives and eco-awareness campaigns.",
    link: "/academics/news",
    featured: true,
    order: 4,
    status: "published",
  },
  {
    id: "news-5",
    image: "/news/sports meet.jpg",
    badge: "Sports",
    category: "Sports",
    dateLabel: "Recent",
    title: "Annual Sports Meet",
    excerpt:
      "Students showcased exceptional athleticism and team spirit during our multi-disciplinary sports competition.",
    link: "/academics/news",
    featured: true,
    order: 5,
    status: "published",
  },
  {
    id: "news-6",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    badge: "Academics",
    category: "Academics",
    dateLabel: "Upcoming",
    title: "Science Exhibition 2026",
    excerpt:
      "Explore groundbreaking projects and scientific models created by our brilliant young minds.",
    link: "/academics/news",
    featured: false,
    order: 6,
    status: "draft",
    reviewNote:
      "Uses external Unsplash placeholder image and dummy '#' link in baseline; held in draft for admin review.",
  },
];

export const KOLLAM_PEOPLE: PersonItem[] = [
  // Management featured
  {
    id: "mgmt-1",
    kind: "management-featured",
    name: "Sri. R. Suresh Mohan",
    role: "Chairman",
    initials: "RS",
    image: "/management/sureshmohan.jpg",
    bio: "Guiding the institution with unwavering dedication, Mohan has been instrumental in shaping the vision and expanding the horizons of Chinmaya Vidyalaya.",
    order: 1,
    status: "published",
  },
  {
    id: "mgmt-2",
    kind: "management-featured",
    name: "Sri. P. Sekharankutty",
    role: "Secretary",
    initials: "PS",
    image: "/management/sekharankuttisir.png",
    bio: "Guiding the institution with unwavering dedication, Sekharankutty has been instrumental in shaping the vision and expanding the horizons of Chinmaya Vidyalaya.",
    order: 2,
    status: "published",
  },
  // Management board members
  { id: "mgmt-m-1", kind: "management-member", name: "Smt. Lekshmi Hari Govindan", role: "Member", initials: "LH", image: "/management/lekshmimam.png", order: 1, status: "published" },
  { id: "mgmt-m-2", kind: "management-member", name: "Prof. S. Balakrishna Pillai", role: "Member", initials: "SB", image: "/management/balakrishnansir.png", order: 2, status: "published" },
  { id: "mgmt-m-3", kind: "management-member", name: "Dr. M.G. Sasibhooshan", role: "Member", initials: "MS", image: "/management/MGSasibhooshan.jpeg", order: 3, status: "published" },
  { id: "mgmt-m-4", kind: "management-member", name: "Smt. Sobha Rani", role: "Academic Coordinator", initials: "SR", image: "/management/coorganisershobanarani.webp", order: 4, status: "published" },
  { id: "mgmt-m-5", kind: "management-member", name: "Shri. Sakthidharan", role: "Member", initials: "SK", image: "/management/Sakthidharan.jpg", order: 5, status: "published" },
  { id: "mgmt-m-6", kind: "management-member", name: "Swami Abhayananda", role: "Member", initials: "SA", image: "/management/Br_Sudheer_Chaitanya.png", order: 6, status: "published" },
  { id: "mgmt-m-7", kind: "management-member", name: "Sri. S. Padmakumar", role: "Member", initials: "SP", order: 7, status: "published" },
  { id: "mgmt-m-8", kind: "management-member", name: "Dr. Arun Surendran", role: "Member", initials: "AS", image: "/management/Dr.Arun-Surendran.jpg", order: 8, status: "published" },
  { id: "mgmt-m-9", kind: "management-member", name: "Dr. Nandini Jayachandran", role: "Member", initials: "NJ", image: "/management/nandini.jpg", order: 9, status: "published" },

  // Mentors Leadership
  { id: "mentor-l-1", kind: "mentor-leadership", name: "Nisha S S", role: "Principal", qualification: "MA, B.Ed, SET", image: "/mentors/principal.jpeg", order: 1, status: "published" },
  { id: "mentor-l-2", kind: "mentor-leadership", name: "Sumutha S", role: "Vice Principal", qualification: "MA, B.Ed", image: "/mentors/vice principal.jpeg", order: 2, status: "published" },

  // Mentors Faculty (37)
  { id: "mentor-f-1", kind: "mentor-faculty", name: "Leeja Kumari S", role: "English", qualification: "MA, B.Ed SET, CTET", order: 1, status: "published" },
  { id: "mentor-f-2", kind: "mentor-faculty", name: "Manju A", role: "English", qualification: "MA, B.Ed", order: 2, status: "published" },
  { id: "mentor-f-3", kind: "mentor-faculty", name: "Mahitha G", role: "English", qualification: "MA, B.Ed", order: 3, status: "published" },
  { id: "mentor-f-4", kind: "mentor-faculty", name: "Sangeetha K", role: "English", qualification: "MA, B.Ed", order: 4, status: "published" },
  { id: "mentor-f-5", kind: "mentor-faculty", name: "Resmi V T (HOD)", role: "English", qualification: "MA, B.Ed, K.TET", order: 5, status: "published" },
  { id: "mentor-f-6", kind: "mentor-faculty", name: "Sunimol R (HOD)", role: "Mathematics", qualification: "M.Sc, B.Ed", order: 6, status: "published" },
  { id: "mentor-f-7", kind: "mentor-faculty", name: "Maheswari T", role: "Mathematics", qualification: "M.Sc, B.Ed", order: 7, status: "published" },
  { id: "mentor-f-8", kind: "mentor-faculty", name: "Priya P", role: "Mathematics", qualification: "M.Sc, B.Ed", order: 8, status: "published" },
  { id: "mentor-f-9", kind: "mentor-faculty", name: "Vijaya Lekshmi L P", role: "Mathematics", qualification: "MSc, BEd, KTET", order: 9, status: "published" },
  { id: "mentor-f-10", kind: "mentor-faculty", name: "Rakhi Ramachandran Pillai", role: "Chemistry", qualification: "M.Sc, B.Ed", order: 10, status: "published" },
  { id: "mentor-f-11", kind: "mentor-faculty", name: "Midhina Krishna", role: "Chemistry", qualification: "M.Sc, B.Ed", order: 11, status: "published" },
  { id: "mentor-f-12", kind: "mentor-faculty", name: "Rejitha P", role: "Physics", qualification: "M.Sc, B.Ed, SET", order: 12, status: "published" },
  { id: "mentor-f-13", kind: "mentor-faculty", name: "Indu Lekshmi", role: "Physics", qualification: "MSC, B.Ed, CTET", order: 13, status: "published" },
  { id: "mentor-f-14", kind: "mentor-faculty", name: "Jayasree T P (HOD)", role: "Biology", qualification: "M.Sc, B.Ed, SET", order: 14, status: "published" },
  { id: "mentor-f-15", kind: "mentor-faculty", name: "Anju S", role: "Biology", qualification: "M.Sc, B.Ed, SET, MPhil", order: 15, status: "published" },
  { id: "mentor-f-16", kind: "mentor-faculty", name: "Swapna K (HOD)", role: "Computer Science", qualification: "MCA", order: 16, status: "published" },
  { id: "mentor-f-17", kind: "mentor-faculty", name: "Preethi S", role: "Computer Science", qualification: "MSc", order: 17, status: "published" },
  { id: "mentor-f-18", kind: "mentor-faculty", name: "Renju S", role: "Computer Science", qualification: "MCA", order: 18, status: "published" },
  { id: "mentor-f-19", kind: "mentor-faculty", name: "Reshmy L (HOD)", role: "Social Science", qualification: "M.A, B.Ed", order: 19, status: "published" },
  { id: "mentor-f-20", kind: "mentor-faculty", name: "Deepa S", role: "Social Science", qualification: "M.A, B.Ed, SET", order: 20, status: "published" },
  { id: "mentor-f-21", kind: "mentor-faculty", name: "Bindhu", role: "Social Science", qualification: "M.A, B.Ed", order: 21, status: "published" },
  { id: "mentor-f-22", kind: "mentor-faculty", name: "Resmi R", role: "Commerce", qualification: "MCom, BEd, SET", order: 22, status: "published" },
  { id: "mentor-f-23", kind: "mentor-faculty", name: "Seema V (HOD)", role: "Malayalam", qualification: "M.A, B.Ed, SET", order: 23, status: "published" },
  { id: "mentor-f-24", kind: "mentor-faculty", name: "Abhirami Lal", role: "Malayalam", qualification: "MA, BEd, KTET", order: 24, status: "published" },
  { id: "mentor-f-25", kind: "mentor-faculty", name: "Gayathri Devi M R", role: "Hindi", qualification: "M.A, B.Ed", order: 25, status: "published" },
  { id: "mentor-f-26", kind: "mentor-faculty", name: "Sumitha G S (HOD)", role: "Hindi", qualification: "M.A, B.Ed", order: 26, status: "published" },
  { id: "mentor-f-27", kind: "mentor-faculty", name: "Jainey Agney", role: "Hindi", qualification: "M.A, MPhil, B.Ed", order: 27, status: "published" },
  { id: "mentor-f-28", kind: "mentor-faculty", name: "Neethu S N", role: "Sanskrit", qualification: "M.A, B.Ed", order: 28, status: "published" },
  { id: "mentor-f-29", kind: "mentor-faculty", name: "Salila S", role: "Nursery Teacher", qualification: "P.P.T.T.C", order: 29, status: "published" },
  { id: "mentor-f-30", kind: "mentor-faculty", name: "Viswakala V L (HOD)", role: "Nursery Teacher", qualification: "P.P.T.T.C", order: 30, status: "published" },
  { id: "mentor-f-31", kind: "mentor-faculty", name: "Deepthi R", role: "Nursery Teacher", qualification: "DIP, PPTTC", order: 31, status: "published" },
  { id: "mentor-f-32", kind: "mentor-faculty", name: "Maneesha", role: "Nursery Teacher", qualification: "DIP, PPTTC", order: 32, status: "published" },
  { id: "mentor-f-33", kind: "mentor-faculty", name: "Smitha A", role: "Librarian", qualification: "B.Lisc", order: 33, status: "published" },
  { id: "mentor-f-34", kind: "mentor-faculty", name: "Sheeja K S", role: "Music Teacher", qualification: "BA Music", order: 34, status: "published" },
  { id: "mentor-f-35", kind: "mentor-faculty", name: "Maya Rajendran", role: "Dance Teacher", qualification: "Diploma in Dance", order: 35, status: "published" },
  { id: "mentor-f-36", kind: "mentor-faculty", name: "R S Rejin", role: "Physical Trainer", qualification: "BPEd, NIS", order: 36, status: "published" },
  { id: "mentor-f-37", kind: "mentor-faculty", name: "Vishnu Chandran", role: "Art & Craft Teacher", qualification: "BFA", order: 37, status: "published" },

  // Frontrunners (3 real alumni)
  {
    id: "frontrunner-1",
    kind: "frontrunner",
    name: "Dr. Siji Nath S",
    role: "BAMS, CCMC, Marma Specialist",
    organization: "Ramaiah Indic Speciality Ayurveda, Banjara Hills, Hyderabad",
    quote:
      "Proud to be a student of Chinmaya Vidhalaya Kollam for 14 years of my academic life from KG to class 12. Those days were the most valuable days in my life which moulded the human in me in every aspects.",
    image: "/frontrunner/Dr Siji Nath S.jpg",
    order: 1,
    status: "published",
  },
  {
    id: "frontrunner-2",
    kind: "frontrunner",
    name: "Dr. Kavya K S",
    role: "Doctor",
    organization: "",
    quote:
      "Hari Om! If I have to speak something about the school which I have studied for more than a decade, I’ll start it with our beloved MathaJi.. She is the one person I misses a lot after completing my entire schooling.. It would be because she had taught us the basic value education from such a small age. If at all I posses any moral qualities now, she is the main reason for all that. Sliding pages of Mata Ji, there comes my special teachers, Principal and other administrative staffs equally. There’s no hierarchy in priority for those people as everyone had played an important role in making me/ moulding me like who I’m now! Like everyone says, schooling is the most important period for youths to develop or restrain themselves and the one great message our Chinmayananda has taught me is ‘One should live a life with exemplary simplicity personified!’ and I ought to follow that in my life too.. I chose my career as a doctor to serve people with love which i have got plenty from all my people out there! Once again I thank all my teachers, staffs and my much loved students for the truly outstanding support you all have showered us!",
    image: "/frontrunner/Dr. Kavya K S.jpg",
    order: 2,
    status: "published",
  },
  {
    id: "frontrunner-3",
    kind: "frontrunner",
    name: "Dr. Anusree M.R",
    role: "Assistant professor, Department of Statistics",
    organization: "St.Thomas college, Thrissur",
    quote:
      "My life at Chinmaya changed who I am and has given me the most valuable skills for an academic growth. I look back at my prestigious institute with respect and love. Thank you",
    image: "/frontrunner/Anusree.jpg",
    order: 3,
    status: "published",
  },

  // Homepage Testimonials (held as draft because baseline uses eteach-html.vercel.app sample data)
  {
    id: "testimonial-sample-1",
    kind: "testimonial",
    name: "Ruhul Amin",
    role: "Alumni",
    quote:
      '"My journey at Chinmaya Vidyalaya laid a strong foundation for my career. The teachers were incredibly supportive and the values I learned here are still with me today."',
    image: "https://eteach-html.vercel.app/assets/img/client/client-1.jpg",
    order: 1,
    status: "draft",
    reviewNote:
      "Template placeholder from eteach-html.vercel.app; replace with verified Kollam testimonial before publishing.",
  },
  {
    id: "testimonial-sample-2",
    kind: "testimonial",
    name: "Abul Hasem",
    role: "Parent",
    quote:
      '"The academic standard is excellent! The co-curricular activities and the personalized attention given to each student helped my child master topics quickly. Highly recommended."',
    image: "https://eteach-html.vercel.app/assets/img/client/client-2.jpg",
    order: 2,
    status: "draft",
    reviewNote:
      "Template placeholder from eteach-html.vercel.app; replace with verified Kollam testimonial before publishing.",
  },
  {
    id: "testimonial-sample-3",
    kind: "testimonial",
    name: "Abdul Hamid",
    role: "Student",
    quote:
      '"A fantastic platform for holistic learning. The discussion forums, arts fest, and peer interactions are very helpful. I love the vibrant campus environment."',
    image: "https://eteach-html.vercel.app/assets/img/client/client-3.jpg",
    order: 3,
    status: "draft",
    reviewNote:
      "Template placeholder from eteach-html.vercel.app; replace with verified Kollam testimonial before publishing.",
  },
];

export const KOLLAM_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-general-info",
    kind: "general-info",
    title: "General Information",
    fileUrl: "/general%20info.pdf",
    order: 1,
    status: "published",
  },
  {
    id: "doc-academic-planner",
    kind: "academic-planner",
    title: "Academic Planner PDF",
    fileUrl: "/academic%20planner.pdf",
    order: 1,
    status: "published",
  },
  {
    id: "doc-safety-policy",
    kind: "safety-policy",
    title: "School Safety Policy PDF",
    fileUrl: "/school%20safety%20policy.pdf",
    order: 1,
    status: "published",
  },
  {
    id: "newsletter-1",
    kind: "newsletter",
    title: "Annual Newsletter 2024-25",
    dateLabel: "Academic Year 2024-25",
    description:
      "Discover our latest achievements, events, and academic highlights for the year.",
    fileUrl: "/newsletter-_CV_KOLLAM2024-25.pdf",
    coverColor: "from-blue-600 to-indigo-700",
    order: 1,
    status: "published",
  },
  {
    id: "newsletter-2",
    kind: "newsletter",
    title: "Term 1 Highlights",
    dateLabel: "September 2023",
    description:
      "A look back at the vibrant activities and successes of the first term.",
    fileUrl: "#",
    coverColor: "from-orange-500 to-red-600",
    order: 2,
    status: "draft",
    reviewNote: "Dummy '#' PDF link in baseline; upload real PDF before publishing.",
  },
  {
    id: "newsletter-3",
    kind: "newsletter",
    title: "Spring Edition",
    dateLabel: "March 2023",
    description:
      "Spring festival, sports day recaps, and special features from our students.",
    fileUrl: "#",
    coverColor: "from-emerald-500 to-teal-600",
    order: 3,
    status: "draft",
    reviewNote: "Dummy '#' PDF link in baseline; upload real PDF before publishing.",
  },
];

export const KOLLAM_ALBUMS: AlbumPhoto[] = [
  // Local /gallery/* assets (published)
  { id: "album-local-1", title: "Githa Jayanthy", year: "2025", imageUrl: "/gallery/githa jayanthy.jpg", heightClass: "h-80", order: 1, status: "published" },
  { id: "album-local-2", title: "Thiruvathira Celebration", year: "2025", imageUrl: "/gallery/thiruvatira.jpg", heightClass: "h-96", order: 2, status: "published" },
  { id: "album-local-3", title: "UKG Convocation", year: "2025", imageUrl: "/gallery/UKG convocation.jpg", heightClass: "h-72", order: 3, status: "published" },
  { id: "album-local-4", title: "UKG Convocation Ceremony", year: "2025", imageUrl: "/gallery/UKG convocation1.jpg", heightClass: "h-80", order: 4, status: "published" },

  // Unsplash stock photos from baseline photo-gallery (held as draft for review)
  { id: "album-stock-1", title: "Annual Sports Meet", year: "2026", imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop", heightClass: "h-80", order: 5, status: "draft", reviewNote: "Stock Unsplash image from baseline." },
  { id: "album-stock-2", title: "Cultural Fest", year: "2027", imageUrl: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=800&auto=format&fit=crop", heightClass: "h-96", order: 6, status: "draft", reviewNote: "Stock Unsplash image with future year 2027." },
  { id: "album-stock-3", title: "Science Exhibition", year: "2025", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop", heightClass: "h-64", order: 7, status: "draft", reviewNote: "Stock Unsplash image from baseline." },
];

export const KOLLAM_VIDEOS: VideoItem[] = [
  { id: "9B3XSNZ0SDw", youtubeId: "9B3XSNZ0SDw", title: "ENVIRONMENT DAY", academicYear: "2026-27", order: 1, status: "published" },
  { id: "bakGcno5CWg", youtubeId: "bakGcno5CWg", title: "SCHOOL TOPPER -XII", academicYear: "2026-27", order: 2, status: "published" },
  { id: "feyVtM5qQ98", youtubeId: "feyVtM5qQ98", title: "SAMSKRTHOLTSAV", academicYear: "2026-27", order: 3, status: "published" },
  { id: "ldOcmmzdxII", youtubeId: "ldOcmmzdxII", title: "CHIN EXCELLENCE", academicYear: "2026-27", order: 4, status: "published" },
  { id: "RQtIQNUp-sA", youtubeId: "RQtIQNUp-sA", title: "READING DAY", academicYear: "2025-26", order: 5, status: "published" },
  { id: "Fik9VnkM944", youtubeId: "Fik9VnkM944", title: "MILK DAY", academicYear: "2025-26", order: 6, status: "published" },
  { id: "Uez539ubYtQ", youtubeId: "Uez539ubYtQ", title: "PRAVESHANOLTHSAVAM", academicYear: "2025-26", order: 7, status: "published" },
  { id: "accK9bnYkG8", youtubeId: "accK9bnYkG8", title: "INDEPENDANCE DAY", academicYear: "2024-25", order: 8, status: "published" },
  { id: "Lw5qn_FXYok", youtubeId: "Lw5qn_FXYok", title: "YOGA DAY", academicYear: "2024-25", order: 9, status: "published" },
  { id: "RZ-dVMwaX9w", youtubeId: "RZ-dVMwaX9w", title: "SREEKRISHNA JAYANTHI", academicYear: "2024-25", order: 10, status: "published" },
];

export const KOLLAM_ACCOLADES: AccoladeItem[] = [
  { id: "acc-1", kind: "accolade", title: "Class X and XII 2024-25", imageUrl: "/accolades/Class X and XII 2024-25.jpeg", order: 1, status: "published" },
  { id: "acc-2", kind: "accolade", title: "Class XII Winners 2020-21", imageUrl: "/accolades/Class XII winners 2020-21.jpg", order: 2, status: "published" },
  { id: "acc-3", kind: "accolade", title: "Class X 2020-21", imageUrl: "/accolades/class x 2020-21.jpg", order: 3, status: "published" },
  { id: "acc-4", kind: "accolade", title: "JEE Main Achievers", imageUrl: "/accolades/jee main.jpeg", order: 4, status: "published" },
  { id: "acc-5", kind: "accolade", title: "Sports Ever-Rolling Trophy", imageUrl: "/accolades/sports everrolling trophy.jpeg", order: 5, status: "published" },
  { id: "res-1", kind: "academic-result", title: "Academic Result 1", imageUrl: "/image/acdemic result 1.jpeg", order: 1, status: "published" },
  { id: "res-2", kind: "academic-result", title: "Academic Result 2", imageUrl: "/image/acdemic result 2.png", order: 2, status: "published" },
  { id: "res-3", kind: "academic-result", title: "Academic Result 3", imageUrl: "/image/acdemic result 3.jpeg", order: 3, status: "published" },
];

export const KOLLAM_PAGES: PageContent[] = [
  {
    id: "about-overview",
    title: "ABOUT US",
    subtitle:
      "Discover the temple of learning where spirituality meets modern education, nestled in the serene lap of nature.",
    heroImage: "/image/about2.webp",
    status: "published",
    data: {
      sections: [
        {
          id: "nature",
          title: "In the Lap of Nature",
          iconName: "Leaf",
          content:
            "CHINMAYA VIDYALAYA, CHANDANATHOPE, KOLLAM – the temple of learning, located in the serene lap of nature. Golden sunrises and crimson sunsets welcome flocks of birds to the Vidyalaya campus to add mesmerizing sights and sounds. It is greenery all around, creating a highly conducive and peaceful learning atmosphere.",
          image: "/image/about1.avif",
          color: "from-emerald-500/20 to-teal-500/5",
          iconColor: "text-emerald-500",
        },
        {
          id: "vision",
          title: "Vision of Education",
          iconName: "BookOpen",
          content:
            "The education imparted in the Vidyalaya fulfills Pujya Gurudev Swami Chinmayananda’s Vision of Education. It enables all Chinmaya kids to bloom with bright hues and spread the fragrance. The presence of Chinmaya Mission Acharya and the Ashram gives the Vidyalaya a spiritual ambience. The holy shrine of Lord Ganesha provides a peaceful environment. Chinmaya Blossom, the play school, is a feather in our cap. The school is affiliated up to classes XII.",
          image: "/image/about4.jpg",
          color: "from-orange-500/20 to-amber-500/5",
          iconColor: "text-orange-500",
        },
        {
          id: "technology",
          title: "Modern & Values-Driven",
          iconName: "MonitorPlay",
          content:
            "The Vidyalaya is equipped with the latest technology – hybrid teaching and learning and smart classrooms. Values are inculcated in young minds with the text 'Life, An Aradhana' and the Chinmaya Vision Programme. The curriculum includes the enrichment of communication and language skills, Yoga, and a plethora of co-curricular activities.",
          image: "/image/about3.webp",
          color: "from-blue-500/20 to-cyan-500/5",
          iconColor: "text-blue-500",
        },
        {
          id: "history",
          title: "Our Historic Journey",
          iconName: "History",
          content:
            "The Vidyalaya was a long pending dream of the people of Kollam. It was first established on 23rd Oct 1985 at Manayilkulangara, Kollam. The Vidyalaya attained its gradual growth and as classes up to VII started functioning, it was shifted to its new sprawling location at Chandanathope in 1996 under the visionary leadership of Chinmaya Educational Trust, Thiruvananthapuram.",
          image: "/image/about3.webp",
          color: "from-purple-500/20 to-fuchsia-500/5",
          iconColor: "text-purple-500",
        },
      ],
      galleryImages: [
        { src: "/image/about4.jpg", colSpan: "col-span-2", rowSpan: "row-span-2" },
        { src: "/image/about1.avif", colSpan: "col-span-2 md:col-span-1", rowSpan: "row-span-1" },
        { src: "/image/school.jpeg", colSpan: "col-span-2 md:col-span-1", rowSpan: "row-span-1" },
        { src: "/image/about3.webp", colSpan: "col-span-2", rowSpan: "row-span-1" },
      ],
    },
  },
  {
    id: "about-beginning",
    title: "ORIGIN",
    subtitle:
      "From a single borrowed classroom in 1985 to a full CBSE campus — four decades of faith, community, and transformation.",
    heroImage: "/image/about2.webp",
    status: "published",
    data: {
      foundingDateLabel: "23 Oct 1985",
      quoteHeadline: "The fulfillment of a long-cherished dream of the people of",
      quoteHighlight: "Kollam.",
      quoteBody:
        "On Vijayadesami Day, the Chinmaya Mission planted its first seed — a small nursery school in borrowed space at the Mahila Samajam. What began as a single class would grow into one of Kollam's most beloved institutions.",
      chapters: [
        {
          year: "1985",
          label: "The Founding",
          date: "23 October · Vijayadesami Day",
          headline: "A Dream Takes Root",
          body: "The 23rd of October 1985 marked the fulfillment of a long-cherished dream of the people of Kollam. The Chinmaya Mission began a Nursery School in space graciously offered by the Mahila Samajam — the seed of something extraordinary.",
          accent: "#FF6A00",
          milestone: true,
        },
        {
          year: "1988",
          label: "Expansion",
          date: "Three Years Later",
          headline: "Growing Beyond Walls",
          body: "The school outgrew its first home and moved to a larger building in Manayilkulangara. Classes expanded up to Std VII — a sign of the community's growing faith.",
          accent: "#3B82F6",
          milestone: false,
        },
        {
          year: "1996",
          label: "A New Home",
          date: "The Permanent Address",
          headline: "3 Acres at Chandanathope",
          body: "The Regional Trust purchased 3 acres of land at Kuzhiyam South, Chandanathope. A shed was built and classes began — laying the foundation of the Vidyalaya's eternal home.",
          accent: "#10B981",
          milestone: false,
        },
        {
          year: "2000",
          label: "Consolidation",
          date: "United at Last",
          headline: "One School, One Mission",
          body: "Two streams — one from the Mahila Samajam building and one from Chandanathope — merged into a single, unified institution. The Vidyalaya was whole.",
          accent: "#8B5CF6",
          milestone: false,
        },
        {
          year: "2001",
          label: "Milestone Year",
          date: "A Year of Firsts",
          headline: "Permanent Home & Flying Colors",
          body: "Sri K. Ravindranathan Nair led the construction of the permanent building. The inaugural SSLC batch excelled brilliantly. The school won 1st prize for 'Best Bharat Nata' and 2nd for 'Best School' (UP Section) in Republic Day Celebrations.",
          accent: "#FF6A00",
          milestone: true,
        },
      ],
      bento: {
        addressTitle: "Kuzhiyam South\nChandanathope, Kollam",
        stat1Value: "3",
        stat1Label: "Acres Campus",
        stat2Value: "XII",
        stat2Label: "CBSE Classes",
        spiritualTitle: "Spiritual Ambience",
        spiritualText:
          "An Ashram for the Acharyas and a Vinayakam temple within the campus — filling every corner with peace and spiritual energy.",
        natureTitle: "Temple of Learning",
        natureText:
          "Fully enclosed by a compound wall, the Vidyalaya stands amidst lush greenery — a campus designed for holistic growth of mind, body, and spirit.",
        achievementTitle:
          "1st Prize — 'Best Bharat Nata' & 2nd Prize — 'Best School' (UP Section)",
        achievementSubtitle: "Republic Day · 2001–2002",
      },
      galleryImages: [
        { src: "/image/about1.avif", cls: "col-span-2 row-span-2" },
        { src: "/image/about3.webp", cls: "col-span-1 row-span-1" },
        { src: "/image/about4.jpg", cls: "col-span-1 row-span-1" },
        { src: "/image/about2.webp", cls: "col-span-2 row-span-1" },
      ],
    },
  },
  {
    id: "academics-overview",
    title: "ACADEMICS",
    subtitle: "Central Board of Secondary Education",
    heroImage: "/image/academics.webp",
    status: "published",
    data: {
      curriculumTitle: "Central Board of Secondary Education",
      curriculumBody:
        "We proudly follow the CBSE stream of examinations, providing a globally recognized standard of education that emphasizes both academic rigor and continuous, comprehensive evaluation.",
      affiliationRegNo: "Reg No. 930434",
      curriculumImage: "/image/academics2.jpg",
      stagesSubtitle:
        "The school currently teaches students across five distinct sections, carefully structured to guide them from early childhood through to university readiness.",
      stages: [
        { id: "pre-primary", name: "Pre-Primary", age: "Early Years", desc: "A nurturing environment focused on play-based learning and foundational skill development.", iconName: "Shapes", color: "from-amber-400 to-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
        { id: "lp", name: "Lower Primary (LP)", age: "Foundational", desc: "Building a strong base in literacy, numeracy, and environmental awareness through activity-oriented methods.", iconName: "Library", color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50", border: "border-emerald-100" },
        { id: "up", name: "Upper Primary (UP)", age: "Preparatory", desc: "Encouraging critical thinking, independent learning, and deeper exploration of core subjects.", iconName: "Layers", color: "from-blue-400 to-indigo-500", bg: "bg-blue-50", border: "border-blue-100" },
        { id: "hs", name: "High School (HS)", age: "Secondary", desc: "Rigorous CBSE curriculum preparing students for board exams with a focus on holistic intellectual growth.", iconName: "BookMarked", color: "from-purple-400 to-violet-500", bg: "bg-purple-50", border: "border-purple-100" },
        { id: "plus-two", name: "Plus Two", age: "Senior Secondary", desc: "Specialized streams designed to propel students toward their chosen higher education and career paths.", iconName: "GraduationCap", color: "from-rose-400 to-red-500", bg: "bg-rose-50", border: "border-rose-100" },
      ],
      fillerImage: "/image/academic.jfif",
      fillerText: "Excellence in every step of the journey.",
    },
  },
  {
    id: "student-council",
    title: "Student Council",
    heroImage: "/image/students council.jpeg",
    status: "published",
    data: {
      quote:
        "“Student council speaks a lot more about itself rather than just being a group of people, it showcases its unity, cooperation, coordination, and strengths to the world.”",
      paragraphs: [
        "Our School Council, which changes every year, has always been vibrant sets of students selected through a process of an election and later followed up by an interview. They share their interests, express their opinions and mark a change in the perspective of our school time for the other students. The feedback offered by the students and parents alike about the school council is the sense of ambition, and the awareness of the stronger feeling of membership in the school.",
        "All the members are equally welcome to try out for the school council. It creates a sense of self-learning and enables them to better manage their own learning. The school has always been proud of all the batches of school council leaders who have come forward as great leaders, who are positive about their competence in organisation and leadership skills.",
        "Even during the pandemic period, we have conducted online elections, interviews for selecting our new brilliant set of school council leaders, who have, like their predecessors, fulfilled their legacy and are setting the path for the new leaders.",
      ],
      roles: [
        "Head Boy & Head Girl",
        "Assistant Head Boy & Girl",
        "Sports Secretary",
        "Arts Secretary",
        "House Captains",
        "Executive Posts",
      ],
      closingNote:
        "We also are very elated to present a small other group of people in the council, who are the ambassadors of CVP (Chinmaya Vision Programme) as well as Swacch Vidyalaya leaders, who help in the running of the programs smoothly throughout.",
    },
  },
  {
    id: "chinmaya-blossoms",
    title: "Chinmaya Blossoms",
    heroImage: "/image/chinmaya blossom.jpeg",
    status: "published",
    data: {
      heading: "Initiating Tiny Buds",
      paragraphs: [
        "Chinmaya Blossom… The play school of the Vidyalaya initiates tiny buds to an atmosphere of fun-filled learning.",
        "The Kindergarten provides a strong foundation for kids to move further and develop their innate talents and skills, preparing them for a bright and successful future.",
      ],
      image: "/image/chinmaya blossom1.jpeg",
    },
  },
  {
    id: "nep",
    title: "National Education Policy",
    subtitle: "Innovating the future of education with modern teaching practices.",
    heroImage: "/image/NEP1.jpeg",
    status: "published",
    data: {
      items: [
        { id: "nep-1", src: "/image/NEP1.jpeg", alt: "NEP Activity 1" },
        { id: "nep-2", src: "/image/NEP2.jpeg", alt: "NEP Activity 2" },
        { id: "nep-3", src: "/image/NEP3.jpeg", alt: "NEP Activity 3" },
      ],
    },
  },
  {
    id: "facilities-labs",
    title: "Laboratories",
    subtitle: "Hands-on learning with scientifically advanced infrastructure.",
    heroImage: "/facilities/chem lab.jpeg",
    status: "published",
    data: {
      labs: [
        {
          title: "Physics Lab",
          image: "/facilities/phy lab.jpg",
          description:
            "The Vidyalaya has a Physics Lab with all the necessary instruments required for both the Secondary and Senior Secondary sections. Our lab can be utilized by more than 30 students at a time. The Lab provides for all equipments as required under the affiliation rules.",
        },
        {
          title: "Chemistry Lab",
          image: "/facilities/chem lab.jpeg",
          description:
            "The Chemistry laboratory is a scientifically advanced lab which has the capacity to accommodate more than 40 students at a time. It meets the challenges of modern day infrastructure and safety requirements. The students can perform experiments with precision in this spacious lab, where ample stock of reagents and chemicals are made available.",
        },
        {
          title: "Biology Lab",
          image: "/facilities/bio lab.jpg",
          description:
            "The Biology lab can also accommodate more than 40 students at a time. A variety of models, charts, specimens and CDs are available.",
        },
        {
          title: "Computer Lab",
          image: "/facilities/computer lab.jpeg",
          description:
            "The Vidyalaya has a modern computer lab. Our students have unlimited access to computers and the professional software tools that go with them. The Vidyalaya is connected to the Internet, which facilitates a highly effective communication link across the globe. Our teaching laboratories are equipped with high-end machines. The lab has over 40 computers connected in a Local Area Network, and an Efficient UPS system for uninterrupted power supply. The Lab also enables more than 40 students to carry out practicals at a time.",
        },
        {
          title: "Mathematics Lab",
          image:
            "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop",
          description:
            "The vidyalaya has a well equipped Mathematics lab serving the purpose of making “Learning of Mathematics through practical experiments” possible. There are around 20 laminated charts on various topics. Number patterns, Experiments and Puzzles.",
        },
      ],
    },
  },
  {
    id: "innovation-ai-robotics",
    title: "AI & Robotics",
    subtitle:
      "Empowering students with cutting-edge skills in Artificial Intelligence and Robotics to build the future.",
    heroImage: "/image/AI and robotics.jpeg",
    badge: "Innovation Hub",
    status: "published",
    data: {
      heading: "Preparing for Tomorrow",
      description:
        "Our AI and Robotics curriculum is designed to foster logical reasoning, problem-solving, and creative thinking. Students get hands-on experience building, programming, and interacting with state-of-the-art robotic kits and machine learning modules, preparing them for the fast-evolving technological landscape.",
      images: [
        { id: "rob-1", src: "/image/AI and robotics.jpeg", title: "AI & Robotics Workshop" },
        { id: "rob-2", src: "/image/ai ad robotics.jpeg", title: "Robotics Practical" },
        { id: "rob-3", src: "/image/ai and robotics 3.jpeg", title: "AI Learning" },
        { id: "rob-4", src: "/image/ai and robotics 4.jpeg", title: "Future Innovators" },
        { id: "rob-5", src: "/image/ai and robotics 5.jpeg", title: "Robotics Build" },
        { id: "rob-6", src: "/image/ai and robotics 6.jpeg", title: "Technology Hub" },
      ],
    },
  },
  {
    id: "innovation-ai-teachers",
    title: "AI Trained Teachers",
    subtitle:
      "Our educators are equipped with the latest AI tools to deliver a transformative learning experience.",
    heroImage: "/image/ai trained teachers.jpeg",
    badge: "Innovation Hub",
    status: "published",
    data: {
      heading: "Empowering Educators",
      description:
        "We believe that to raise future-ready students, we must first empower our educators. Our teachers undergo rigorous training in AI integration, enabling them to personalize learning, automate administrative tasks, and bring innovative, tech-driven methodologies into the classroom.",
      images: [
        { id: "ait-1", src: "/image/ai trained teachers.jpeg", title: "AI Trained Teachers Workshop" },
        { id: "ait-2", src: "/image/ai trained teachers2.webp", title: "Educator Training" },
        { id: "ait-3", src: "/image/ai trained teachers3.webp", title: "Interactive AI Sessions" },
      ],
    },
  },
];

export const KOLLAM_SEED_BUNDLE: SchoolSeedBundle = {
  config: KOLLAM_SCHOOL_CONFIG,
  announcements: KOLLAM_ANNOUNCEMENTS,
  news: KOLLAM_NEWS,
  people: KOLLAM_PEOPLE,
  documents: KOLLAM_DOCUMENTS,
  albums: KOLLAM_ALBUMS,
  videos: KOLLAM_VIDEOS,
  accolades: KOLLAM_ACCOLADES,
  pages: KOLLAM_PAGES,
};
