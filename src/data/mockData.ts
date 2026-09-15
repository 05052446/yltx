/**
 * Mock Data for 「艺路同行」 Platform
 * Designed for University Competition Demonstration (互联网+ / 挑战杯)
 * Uses high-aesthetic art imagery and realistic healing stories for speech-impaired creators.
 */

import { Artwork, VideoCourse, PlazaPost, ResourceItem, WorkshopEvent } from '../types';

/* TODO: 替换为实际展示图片 - 预置精选艺术疗愈作品集 */
export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    title: '海潮与呼吸的节律',
    story: '我从小生活在彻底无声的静谧里。很多人以为无声是冷清的，但当我站在海边，手掌贴在被浪潮拍湿的礁石上，我能通过震颤感知整片大海的呼吸。我用深蓝色与青绿的水彩混合，让流动的矿物颜料在宣纸上自然晕染，记录我心里听见的那场潮汐。画画就是我的声带，把那些无法说出口的温柔与汹涌，全部留在大地与蓝天之间。',
    imageUrl: './images/art-1.jpg',
    category: '水彩画',
    moodTags: ['平静', '深海呼吸', '自我释怀'],
    moodColor: '#3B82F6',
    paletteColors: ['#1E3A8A', '#3B82F6', '#93C5FD', '#E0F2FE'],
    artist: {
      id: 'artist-1',
      name: '林晨 (MoMo)',
      avatar: './images/avatar-chenlin.svg',
      badge: '听障青年水彩画师',
      bio: '22岁，听障美术生，善于用水彩流动性记录内心的节律与温度。',
      location: '杭州 / 中国美术学院',
      artworksCount: 14,
      followersCount: 1420
    },
    likes: 342,
    isLiked: false,
    collects: 89,
    isCollected: false,
    views: 2890,
    createdAt: '2026-04-12',
    status: 'approved',
    medium: '保罗·鲁本斯留白胶 / 阿诗300g粗纹水彩纸 / 沉淀矿物颜料',
    dimensions: '54cm × 38cm',
    comments: [
      {
        id: 'c1-1',
        authorName: '苏暖暖',
        authorAvatar: './images/avatar-sunuan.svg',
        authorBadge: '艺术疗愈志愿者',
        content: '从层叠的蓝意里感受到了极大的抚慰与包容，虽然无声，却比千言万语更具穿透力！',
        createdAt: '2小时前',
        moodEmoji: '💙',
        likes: 24,
        isLiked: false
      },
      {
        id: 'c1-2',
        authorName: '周言亦 (手语翻译员)',
        authorAvatar: './images/avatar-zhouyan.svg',
        content: '特别喜欢你画里的光芒，仿佛海水透进的第一缕晨曦。向所有人推荐这幅画！',
        createdAt: '5小时前',
        moodEmoji: '✨',
        likes: 18,
        isLiked: false
      },
      {
        id: 'c1-3',
        authorName: '星野漫游',
        authorAvatar: './images/avatar-starwander.svg',
        content: '看完心情瞬间平静下来了，这就是艺术独有的疗愈力。',
        createdAt: '昨天',
        moodEmoji: '🌿',
        likes: 9,
        isLiked: false
      }
    ]
  },
  {
    id: 'art-2',
    title: '春日嫩芽的破土呢喃',
    story: '语言发育迟缓曾让我一度害怕与人群对视，总觉得嘴唇像被锁链扣上。直到去年春天，我在社区的花圃里看见一株在水泥缝里倔强探出头的小草。我用数位板将它画成了手心托起的光球。它不用说话，周围的蜜蜂和泥土都懂它的欣欣向荣。我希望每一个像我一样的无声青年，都能长出属于自己的嫩芽。',
    imageUrl: './images/art-2.jpg',
    category: '数字插画',
    moodTags: ['希望', '生机盎然', '破土新生'],
    moodColor: '#10B981',
    paletteColors: ['#065F46', '#10B981', '#6EE7B7', '#ECFDF5'],
    artist: {
      id: 'artist-2',
      name: '许青禾',
      avatar: './images/avatar-qinghexu.svg',
      badge: '手语绘本独立插画师',
      bio: '重度语障，用明朗温暖的童话笔触搭建无障碍视觉沟通乐园。',
      location: '成都',
      artworksCount: 28,
      followersCount: 3100
    },
    likes: 486,
    isLiked: false,
    collects: 145,
    isCollected: false,
    views: 4120,
    createdAt: '2026-04-10',
    status: 'approved',
    medium: 'iPad Pro / Procreate / 噪点质感笔刷',
    dimensions: '4000 × 5200 px (300DPI)',
    comments: [
      {
        id: 'c2-1',
        authorName: '小鹿斑斑',
        authorAvatar: './images/avatar-deerban.svg',
        content: '看到第一眼就眼眶发热，温润的绿色充满了顽强的生命力！',
        createdAt: '3小时前',
        moodEmoji: '🌱',
        likes: 31,
        isLiked: false
      },
      {
        id: 'c2-2',
        authorName: '特教教师张老师',
        authorAvatar: './images/avatar-teacherzhang.svg',
        content: '青禾的画作已经被我们选入学校的无声绘本教材中了，孩子们看到都很开心。',
        createdAt: '6小时前',
        moodEmoji: '👏',
        likes: 42,
        isLiked: false
      }
    ]
  },
  {
    id: 'art-3',
    title: '晚霞中燃烧的安静心绪',
    story: '失语症发作后，我常把所有的焦灼、不甘和渴望揉进厚重的油画颜料里。这幅画我用了三周，没有用传统画笔，而是直接用刮刀一下下刮出落日余晖在云层里撕开的红与橙。那一刻我觉得自己的心跳正通过刮刀与画布产生震鸣，原来我并非在无声中消亡，而是在暮色中燃起一簇不灭的篝火。',
    imageUrl: './images/art-3.jpg',
    category: '油画',
    moodTags: ['释怀', '力量', '晚霞余晖'],
    moodColor: '#F97316',
    paletteColors: ['#7C2D12', '#EA580C', '#FDBA74', '#FEF3C7'],
    artist: {
      id: 'artist-3',
      name: '何野',
      avatar: './images/avatar-heye.svg',
      badge: '后天性失语青年画家',
      bio: '26岁，以刀笔油彩为语言，探索创伤后艺术心理疗愈。',
      location: '南京',
      artworksCount: 9,
      followersCount: 890
    },
    likes: 278,
    isLiked: false,
    collects: 62,
    isCollected: false,
    views: 1980,
    createdAt: '2026-04-08',
    status: 'approved',
    medium: '温莎牛顿纯亚麻布 / 丙烯底料 / 伦勃朗重彩油画颜料',
    dimensions: '80cm × 60cm',
    comments: [
      {
        id: 'c3-1',
        authorName: '心理咨询师陈洁',
        authorAvatar: './images/avatar-chenjie.svg',
        authorBadge: '认证艺术疗愈师',
        content: '从厚重的笔触里能看到情绪的宣泄与最终的升华，色彩充满了从内向外迸发的温度。',
        createdAt: '1天前',
        moodEmoji: '🔥',
        likes: 15,
        isLiked: false
      }
    ]
  },
  {
    id: 'art-4',
    title: '不完美的泥土器皿：拥抱裂痕',
    story: '拉胚机旋转的时候，掌心里泥土的湿润与摩擦是我与世界最真切的触碰。这件陶罐在烧制时出现了一道细微的窑裂，以往我会丢弃，但艺术治疗老师告诉我：“裂痕是光照进来的通道”。我尝试用天然金漆与生漆修复它（金缮），如今它成了一只盛放安宁的容器，如同虽然我言语受阻，但我依然完整且独特。',
    imageUrl: './images/art-4.jpg',
    category: '陶艺手工',
    moodTags: ['平静', '金缮愈合', '包容不完美'],
    moodColor: '#84A98C',
    paletteColors: ['#52796F', '#84A98C', '#CAD2C5', '#F5F5F4'],
    artist: {
      id: 'artist-4',
      name: '陶小鱼',
      avatar: './images/avatar-taoxiaoyu.svg',
      badge: '无声陶艺造物者',
      bio: '在泥土与窑火中寻求内心的安稳与笃定。',
      location: '景德镇 / 佛山',
      artworksCount: 19,
      followersCount: 2240
    },
    likes: 512,
    isLiked: false,
    collects: 180,
    isCollected: false,
    views: 3740,
    createdAt: '2026-04-05',
    status: 'approved',
    medium: '景德镇高岭土 / 柴窑高温烧制 / 日本纯金粉生漆金缮',
    dimensions: '直径 18cm × 高 24cm',
    comments: [
      {
        id: 'c4-1',
        authorName: '木心之友',
        authorAvatar: './images/avatar-muxin.svg',
        content: '器物有魂魄，金缮的金色纹路太动人了，治愈了我的精神内耗。',
        createdAt: '4小时前',
        moodEmoji: '🏺',
        likes: 19,
        isLiked: false
      }
    ]
  },
  {
    id: 'art-5',
    title: '雨滴敲打车窗的情绪谱线',
    story: '这幅画诞生于一次堵车的下雨天。车厢里收音机的杂音让我头疼，但我盯着车窗上的雨滴滑落的轨迹，在速写本上用记号笔和水溶性彩铅快速勾勒出几何线条与不规则圆斑。这种自由涂鸦没有固定的美学规训，它只忠诚于我当下那份由烦躁转为舒展的心情。愿每个压抑的心灵都能随性涂抹。',
    imageUrl: './images/art-5.jpg',
    category: '情绪涂鸦',
    moodTags: ['探索', '解压随性', '情绪宣泄'],
    moodColor: '#8B5CF6',
    paletteColors: ['#4C1D95', '#8B5CF6', '#C4B5FD', '#EDE9FE'],
    artist: {
      id: 'artist-5',
      name: 'Zero零度',
      avatar: './images/avatar-zerodeg.svg',
      badge: '青年视觉设计师',
      bio: '用即兴涂鸦记录心电图般的心灵轨迹。',
      location: '上海',
      artworksCount: 35,
      followersCount: 1690
    },
    likes: 195,
    isLiked: false,
    collects: 48,
    isCollected: false,
    views: 1620,
    createdAt: '2026-04-03',
    status: 'approved',
    medium: '纸本水性马克笔 / 酒精颜料 / 拼贴纸屑',
    dimensions: '30cm × 42cm',
    comments: [
      {
        id: 'c5-1',
        authorName: '阿喵爱画画',
        authorAvatar: './images/avatar-miaomiao.svg',
        content: '非常有节奏感的线条！感觉情绪跟着色彩一起流动并解压了！',
        createdAt: '1天前',
        moodEmoji: '🎨',
        likes: 8,
        isLiked: false
      }
    ]
  },
  {
    id: 'art-6',
    title: '剪影日记：我身边的无声伙伴',
    story: '我将报纸、旧地图、植物叶脉与彩纸手工剪贴在一起，组成了我们在盲聋特教工坊里互助的一幕。画面中左边的女孩用手指轻轻触碰右边伙伴的掌心，那是我们最熟悉的“手心触觉字母”。虽然空气里没有声响，但我们之间流动的默契，比任何高谈阔论都要真诚深刻。',
    imageUrl: './images/art-6.jpg',
    category: '综合拼贴',
    moodTags: ['共鸣', '互助温情', '手心连接'],
    moodColor: '#EC4899',
    paletteColors: ['#831843', '#EC4899', '#F472B6', '#FCE7F3'],
    artist: {
      id: 'artist-6',
      name: '安宁',
      avatar: './images/avatar-anning.svg',
      badge: '特教美术导师 / 听障',
      bio: '从事无声综合媒介艺术创作7年，致力于推动融合教育与社区艺术工坊。',
      location: '武汉',
      artworksCount: 22,
      followersCount: 2890
    },
    likes: 620,
    isLiked: false,
    collects: 210,
    isCollected: false,
    views: 5200,
    createdAt: '2026-03-29',
    status: 'approved',
    medium: '复古回收纸张 / 押花植物 / 丝网印刷布面拼贴',
    dimensions: '50cm × 50cm',
    comments: [
      {
        id: 'c6-1',
        authorName: '手语志愿者小林',
        authorAvatar: './images/avatar-xiaolin.svg',
        content: '“手心触觉字母”真的看哭了，感谢你把这份温暖定格在画布上！',
        createdAt: '2天前',
        moodEmoji: '💖',
        likes: 27,
        isLiked: false
      }
    ]
  },
  {
    id: 'art-7',
    title: '正念曼陀罗：寻找心中的宁静支点',
    story: '面对生活里的异样目光和沟通碰壁时，焦虑总会像潮水一样翻涌。每天清晨我坚持画一幅对称的曼陀罗。从中心的同心圆开始，一层层向外延展。画每一片花瓣都对应一次深长呼吸。当一幅曼陀罗完成时，我发现杂念早已悄悄退潮，留在胸膛里的是一份不可动摇的安宁与笃定。',
    imageUrl: './images/art-7.jpg',
    category: '数字插画',
    moodTags: ['平静', '曼陀罗冥想', '呼吸觉察'],
    moodColor: '#14B8A6',
    paletteColors: ['#134E4A', '#14B8A6', '#5EEAD4', '#CCFBF1'],
    artist: {
      id: 'artist-7',
      name: '沈思远',
      avatar: './images/avatar-shensiyuan.svg',
      badge: '正念艺术疗愈研习者',
      bio: '语障青年，用曼陀罗几何图形与色彩疗愈焦虑与社交畏惧。',
      location: '广州',
      artworksCount: 31,
      followersCount: 1840
    },
    likes: 389,
    isLiked: false,
    collects: 130,
    isCollected: false,
    views: 3100,
    createdAt: '2026-03-25',
    status: 'approved',
    medium: '矢量数位板绘 / 曼陀罗对称坐标系设计',
    dimensions: '3500 × 3500 px',
    comments: [
      {
        id: 'c7-1',
        authorName: '云朵面包',
        authorAvatar: './images/avatar-yunduo.svg',
        content: '太精美了！中心层层扩散的结构让人感觉整个人被抱住了一样踏实。',
        createdAt: '3天前',
        moodEmoji: '🧘',
        likes: 12,
        isLiked: false
      }
    ]
  },
  {
    id: 'art-8',
    title: '日光倾泻在老木桌上的午后',
    story: '失聪让我拥有了极其敏锐的光影感知。阳光穿过窗纱斜照在木桌上的那一瞬，斑驳的光斑在尘埃里跳舞，那是属于光影的交响乐。我调和了暖赭石、生褐与微量的群青，让光晕在老木头的纹理中慢慢化开。在这个宁静的下午，即使没有任何言语对白，世界也已向我展示了它最丰沛的深情。',
    imageUrl: './images/art-8.jpg',
    category: '水彩画',
    moodTags: ['温暖', '光影诗意', '岁月静好'],
    moodColor: '#F59E0B',
    paletteColors: ['#78350F', '#D97706', '#FCD34D', '#FEF3C7'],
    artist: {
      id: 'artist-1',
      name: '林晨 (MoMo)',
      avatar: './images/avatar-chenlin.svg',
      badge: '听障青年水彩画师',
      bio: '22岁，听障美术生，善于用水彩流动性记录内心的节律与温度。',
      location: '杭州 / 中国美术学院',
      artworksCount: 14,
      followersCount: 1420
    },
    likes: 420,
    isLiked: false,
    collects: 156,
    isCollected: false,
    views: 3950,
    createdAt: '2026-03-20',
    status: 'approved',
    medium: '获多福高白300g水彩纸 / 史明克大师级固体水彩',
    dimensions: '41cm × 31cm',
    comments: [
      {
        id: 'c8-1',
        authorName: '小树叶',
        authorAvatar: './images/avatar-leaf.svg',
        content: '光线的温度直接透过屏幕传递过来了，暖洋洋的，太棒了！',
        createdAt: '4天前',
        moodEmoji: '☀️',
        likes: 16,
        isLiked: false
      }
    ]
  }
];

export const INITIAL_VIDEOS: VideoCourse[] = [
  {
    id: 'vid-1',
    title: 'AAC 辅助沟通与多模态表达：无声青年入门指南',
    description: '深入浅出解析图文沟通卡片、移动端辅助沟通软件（AAC）与视觉辅助工具的使用技巧，帮助语障人士及家属打破沟通壁垒，重建社交自信。',
    category: 'guide',
    categoryLabel: '语障沟通指南',
    duration: '18:45',
    views: '12.4万',
    coverUrl: './images/video-1.jpg',
    instructor: {
      name: '杜晓峰 博士',
      title: '华东师范大学特教康复与言语病理学副教授',
      avatar: './images/avatar-duxiaofeng.svg',
      isDeafOrHardOfHearing: false
    },
    tags: ['AAC沟通', '无障碍交流', '家庭康复支持'],
    subtitlesAvailable: true,
    coreConcepts: ['什么是低科技与高科技 AAC', '图卡沟通系统 (PECS) 核心逻辑', '从日常需求到情感表达的三阶跃迁'],
    keyTakeaway: '言语不是唯一的沟通途径，图文与符号同样能够承载人类最深邃的情感。'
  },
  {
    id: 'vid-2',
    title: '正念曼陀罗绘画疗愈：释放无声世界的压抑与焦虑',
    description: '跟随国家二级心理咨询师，学习利用圆心结构与对称笔触开展15分钟自我正念绘画练习，在色彩的层层展开中安抚植物神经与紧绷心绪。',
    category: 'therapy',
    categoryLabel: '艺术疗愈教程',
    duration: '24:10',
    views: '26.8万',
    coverUrl: './images/video-2.jpg',
    instructor: {
      name: '顾芸 老师',
      title: '国际表达性艺术治疗协会 (IEATA) 注册疗愈师',
      avatar: './images/avatar-guyun.svg',
      isDeafOrHardOfHearing: false
    },
    tags: ['曼陀罗绘制', '正念呼吸', '情绪减压'],
    subtitlesAvailable: true,
    coreConcepts: ['曼陀罗圆心聚焦原则', '呼吸与运笔速度的同频调校', '无评判心态与完成后的身体扫描'],
    keyTakeaway: '在圆的边界里，你的所有情绪都是被允许和被包容的。'
  },
  {
    id: 'vid-3',
    title: '色彩心理学：用冷暖色调觉察内在未被诉说的心境',
    description: '色彩是潜意识最忠诚的外显投射。通过本课程掌握基础色彩心理动力学，辨析蓝色的退避与安抚、红色的渴望与张力、黄色的希望与温暖。',
    category: 'therapy',
    categoryLabel: '艺术疗愈教程',
    duration: '21:30',
    views: '18.1万',
    coverUrl: './images/video-3.jpg',
    instructor: {
      name: '陆子谦',
      title: '中央美院客座讲师 / 聋健共融艺术工作者',
      avatar: './images/avatar-luziqian.svg',
      isDeafOrHardOfHearing: true
    },
    tags: ['色彩自愈', '视觉符号学', '自我觉察'],
    subtitlesAvailable: true,
    coreConcepts: ['冷暖色相与心理舒适区', '明度与情绪重量的对应关系', '自由色块拼接的情绪投射练习'],
    keyTakeaway: '无需懂复杂的绘画技法，只需相信第一眼击中你内心的那一抹色彩。'
  },
  {
    id: 'vid-4',
    title: '中国手语常用艺术词汇与无障碍观展礼仪',
    description: '专为健听志愿者、艺术策展人及语障群体打造的双向友好教程，详解水彩、雕塑、光影、共鸣等艺术词汇的标准通用手语及互动规范。',
    category: 'guide',
    categoryLabel: '语障沟通指南',
    duration: '16:15',
    views: '9.8万',
    coverUrl: './images/video-4.jpg',
    instructor: {
      name: '李若男',
      title: '国家一级手语翻译 / 艺路同行无障碍顾问',
      avatar: './images/avatar-liruonan.svg',
      isDeafOrHardOfHearing: false
    },
    tags: ['通用手语', '艺术观展', '志愿助残标准'],
    subtitlesAvailable: true,
    coreConcepts: ['视觉视线接触的礼仪规范', '常用艺术媒介手语速查', '在美术馆进行无障碍导览的三大要点'],
    keyTakeaway: '用尊重的眼神与清晰的姿势，让每一次对话都充满平等的暖流。'
  }
];

export const INITIAL_PLAZA_POSTS: PlazaPost[] = [
  {
    id: 'post-1',
    author: {
      name: '晨晨不说话 (林晨)',
      avatar: './images/avatar-chenlin.svg',
      badge: '听障创作者',
      isDeafCreator: true
    },
    content: '今天在工作室连续画了6个小时，试着把昨天做梦梦见的浅紫和柠檬黄揉在一起。以前别人问我想说什么，我常常急得满脸通红；现在我把完成的画给他们看，大家眼神里流露出的惊喜，让我第一次觉得无声也可以如此有力量。谢谢社区里每一位给我留言的朋友，你们的拥抱我都好好珍藏了！',
    images: [
      './images/art-1.jpg',
      './images/art-8.jpg'
    ],
    topic: '#每日一画',
    moodTag: '温暖感动',
    createdAt: '10分钟前',
    hugs: 86,
    isHugged: false,
    echoes: 54,
    isEchoed: false,
    likes: 128,
    isLiked: false,
    status: 'approved',
    comments: [
      {
        id: 'pc1-1',
        authorName: '温暖的小太阳',
        authorAvatar: './images/avatar-sunwarm.svg',
        content: '晨晨继续画下去，你画里的阳光照亮了很多人！抱抱你！',
        createdAt: '5分钟前',
        moodEmoji: '🫂',
        likes: 12
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: '青禾小朋友',
      avatar: './images/avatar-qinghexu.svg',
      badge: '绘本作者',
      isDeafCreator: true
    },
    content: '分享一个今天发生的小确幸：在盲盒咖啡馆，店员小姐姐认出了我挂在包包上的「艺路同行」情绪微徽章，主动在便签纸上画了一只大笑的小猫递给我：“你的画真治愈，今天咖啡给你加双份奶沫！”那一刻真的觉得，这个世界对无声的朋友越来越包容与可爱了。',
    images: [
      './images/art-2.jpg'
    ],
    topic: '#走出无声的世界',
    moodTag: '幸福甜蜜',
    createdAt: '1小时前',
    hugs: 112,
    isHugged: false,
    echoes: 73,
    isEchoed: false,
    likes: 240,
    isLiked: false,
    status: 'approved',
    comments: [
      {
        id: 'pc2-1',
        authorName: '咖啡香气',
        authorAvatar: './images/avatar-coffeearoma.svg',
        content: '善良的人总会相遇，愿所有的善意都能被双倍传递！',
        createdAt: '30分钟前',
        moodEmoji: '☕',
        likes: 15
      }
    ]
  },
  {
    id: 'post-3',
    author: {
      name: '何野 (油画札记)',
      avatar: './images/avatar-heye.svg',
      badge: '创作者',
      isDeafCreator: true
    },
    content: '很多新加入社区的病友问我：“我以前从未学过画画，线条抖得很厉害，能参加艺术疗愈吗？”我想说：艺术疗愈从来不是学院派的美术考试，不需要精准的透视。哪怕只是拿最粗的蜡笔在废纸上用力划出一道黑线，只要那是你内心情绪的宣泄，就是最伟大的艺术。别害怕，画就对了！',
    topic: '#艺术疗愈小故事',
    moodTag: '坚定赋能',
    createdAt: '3小时前',
    hugs: 95,
    isHugged: false,
    echoes: 142,
    isEchoed: false,
    likes: 310,
    isLiked: false,
    status: 'approved',
    comments: [
      {
        id: 'pc3-1',
        authorName: '新手小画迷',
        authorAvatar: './images/avatar-artnewbie.svg',
        content: '这段话治好了我的精神包袱，今天下班就去买油画棒试一试！',
        createdAt: '1小时前',
        moodEmoji: '💪',
        likes: 21
      }
    ]
  },
  {
    id: 'post-4',
    author: {
      name: '杭州融合艺术志愿者小队',
      avatar: './images/avatar-volunteerteam.svg',
      badge: '公益团队',
      isDeafCreator: false
    },
    content: '【同城招募】本周六下午两点，杭州西湖区「艺路同行·无声艺术共融空间」将举办“触摸春天：盲态与无声绘画双感体验坊”。现场配备专业手语老师与艺术疗愈导师，免费提供全套马利水彩画材。欢迎杭州的语障青年、特教学生及大学生志愿者报名参与！名额有限，私信即刻锁定。',
    images: [
      './images/art-4.jpg'
    ],
    topic: '#线下同城互助',
    moodTag: '期待出发',
    createdAt: '昨天',
    hugs: 67,
    isHugged: false,
    echoes: 98,
    isEchoed: false,
    likes: 189,
    isLiked: false,
    status: 'approved',
    comments: [
      {
        id: 'pc4-1',
        authorName: '林晨 (MoMo)',
        authorAvatar: './images/avatar-chenlin.svg',
        content: '周六我也会去当助教带大家画水彩哦，期待在现场见到大家！',
        createdAt: '昨天',
        moodEmoji: '🎨',
        likes: 36
      }
    ]
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: '全国语障及无障碍沟通工具（AAC）官方导航',
    category: 'aac',
    categoryName: '辅助沟通工具',
    summary: '汇集由中国残联与高校科研团队联合研发的图文沟通板、眼动控制仪、智能语音转换APP与自闭症/失语症沟通卡片下载库。',
    organization: '中国信息无障碍产品联盟 / 华东师大特教中心',
    contactOrLink: 'https://www.capa.org.cn/aac-resources',
    actionLabel: '访问工具库与免费下载',
    tag: '官方推荐',
    highlightText: '支持 iOS / Android / 网页端直接使用，零学习门槛',
    features: ['常用高频图文沟通符码集', '手写识别转换为标准TTS语音输出', '家属与看护者操作指引手册']
  },
  {
    id: 'res-2',
    title: '中国残疾人联合会：语障青年艺术创业扶持基金',
    category: 'foundation',
    categoryName: '公益基金支持',
    summary: '针对18-35周岁听力及言语障碍青年创作者提供的专项艺术孵化基金，提供免费工位、材料采购补贴与高校导师1对1辅导。',
    organization: '中国残疾人福利基金会 (CRFF)',
    contactOrLink: 'http://www.crff.org.cn/art-support-2026',
    actionLabel: '查看申报指南与材料',
    tag: '政策资助',
    highlightText: '每年遴选100位优秀无声青年创作者，单项最高资助3万元',
    features: ['青年文创作品版权保护绿色通道', '全国巡回公益艺术展免费参展席位', '大学生创业指导中心全流程对接']
  },
  {
    id: 'res-3',
    title: '24小时无障碍文字心理援助绿色热线',
    category: 'psychology',
    categoryName: '心理援助通道',
    summary: '专为语障群体设立的即时文字心理咨询通道，由具备艺术疗愈认证背景的资深心理督导师轮值，全程严格隐私加密保护。',
    organization: '教育部全国高校心理健康中心 / 中国心理学会',
    contactOrLink: 'tel:400-161-9995',
    actionLabel: '一键进入文字咨询室',
    tag: '24小时守护',
    highlightText: '纯文字 / 图文表情沟通，绝无强制语音来电',
    features: ['专业心理危机干预与情绪疏导', '家庭沟通困境专业调解方案', '完全匿名，守护个人隐私安全']
  },
  {
    id: 'res-4',
    title: '“一盒色彩”全国偏远特教学校免费画材申请计划',
    category: 'supplies',
    categoryName: '画材公益申领',
    summary: '联合中华思源工程基金会与马利画材，为各省市特殊教育学校、康复机构的语障儿童定期免费寄送无毒安全艺术疗愈绘画包。',
    organization: '思源工程·新浪扬帆公益基金',
    contactOrLink: 'https://yangfan.sina.com.cn/paint-box',
    actionLabel: '提交机构与个人申领',
    tag: '长期公益',
    highlightText: '已累计捐赠超过12,000套专业艺术启蒙疗愈画盒',
    features: ['含水彩颜料、油画棒、专用画纸与正念曼陀罗手册', '特教老师专属视频教学配套教案', '物流全流程公开透明追溯']
  },
  {
    id: 'res-5',
    title: '全国线下「无声艺术疗愈空间」与无声咖啡馆地图',
    category: 'space',
    categoryName: '空间互助网络',
    summary: '收录北京、上海、杭州、成都等30+城市已落地的语障友好艺术工作坊、无声画廊与手语共融空间，提供地图导航与预约体验。',
    organization: '艺路同行共融城市网络',
    contactOrLink: 'https://map.artwithsilence.org',
    actionLabel: '打开无声空间全景地图',
    tag: '城市共融',
    highlightText: '所有入选空间均已通过手语友好与无障碍环境认证',
    features: ['手语导览、无障碍通道与视觉震动提示器', '定期举办面对面青年手作与绘画沙龙', '提供语障青年兼职与创作展示空间']
  },
  {
    id: 'res-6',
    title: '大学生创青春·互联网+ 助残专项赛事政策直通车',
    category: 'support',
    categoryName: '竞赛孵化资源',
    summary: '提供中国国际大学生创新大赛（互联网+）、“挑战杯”中国大学生创业计划竞赛助残公益专项评审标准解析与优秀样板研报。',
    organization: '全国大学生创新创业联盟 / 团中央青年发展部',
    contactOrLink: 'https://cy.ncss.cn/resource-specials',
    actionLabel: '查阅竞赛评分指标体系',
    tag: '答辩锦囊',
    highlightText: '为参赛高校团队提供商业模式设计与社会效益评估模型',
    features: ['高校成果转化与社会企业孵化案例', '社会价值维度与公益量化指标指导', '路演答辩PPT及项目规划书范式']
  }
];

export const INITIAL_EVENTS: WorkshopEvent[] = [
  {
    id: 'ev-1',
    title: '周末无声绘画沙龙：在色彩里倾听心跳',
    tag: '线下沉浸体验',
    date: '2026年4月18日 (周六)',
    time: '14:00 - 17:00',
    location: '杭州市西湖区文三路共融艺术中心3F',
    instructor: '林晨 (听障画师) & 顾芸 (艺术疗愈师)',
    instructorTitle: '青年水彩创作者 / 国际表达性艺术治疗协会成员',
    capacity: 25,
    registeredCount: 19,
    isRegistered: false,
    description: '全程配备专业手语老师，以“春日气味与色彩”为主题，零基础学员可在3小时内完成一幅属于自己的水彩画，并在纸上写下无声心事。现场免费提供专业画材与茶歇。',
    imageUrl: './images/workshop-1.jpg',
    targetAudience: '语障青年、特校学生、高校艺术疗愈志愿者'
  },
  {
    id: 'ev-2',
    title: '特约心理咨询师：线上正念曼陀罗解压工坊',
    tag: '线上直播互动',
    date: '2026年4月22日 (周三)',
    time: '19:30 - 21:00',
    location: '艺路同行腾讯会议无障碍专属频道 (实时字幕+手语窗口)',
    instructor: '杜晓峰 博士',
    instructorTitle: '高校言语康复与心理督导师',
    capacity: 200,
    registeredCount: 168,
    isRegistered: false,
    description: '通过高对比度视觉提示板与实时双向文字互动，引导学员在晚间进行正念深呼吸，用最简单的同心圆画法排解社交焦虑与学业压力。',
    imageUrl: './images/workshop-2.jpg',
    targetAudience: '全国语障朋友、承受心理压力的青年群体'
  },
  {
    id: 'ev-3',
    title: '指尖泥香：陶艺触摸与形体情绪雕塑课',
    tag: '线下手工造物',
    date: '2026年4月26日 (周日)',
    time: '10:00 - 12:30',
    location: '成都市锦江区陶然无声手作工坊',
    instructor: '陶小鱼',
    instructorTitle: '无声陶艺造物者',
    capacity: 15,
    registeredCount: 12,
    isRegistered: false,
    description: '不用耳朵听，也不用嘴巴说，仅凭十指感知高岭土的柔软与韧性。每位参与者亲手制作一只属于自己的情绪器皿，由工坊统一上釉柴烧并寄送到家。',
    imageUrl: './images/art-4.jpg',
    targetAudience: '渴望触觉疗愈与手工创意的各界朋友'
  }
];

export const EMOTION_TAGS = [
  { label: '平静', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', dot: 'bg-blue-500' },
  { label: '共鸣', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100', dot: 'bg-emerald-500' },
  { label: '释怀', color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100', dot: 'bg-orange-500' },
  { label: '探索', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100', dot: 'bg-purple-500' },
  { label: '希望', color: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100', dot: 'bg-teal-500' },
  { label: '温暖', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100', dot: 'bg-amber-500' }
];

export const CATEGORIES = ['全部', '水彩画', '数字插画', '油画', '陶艺手工', '情绪涂鸦', '综合拼贴'] as const;
