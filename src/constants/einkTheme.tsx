// 墨水屏专用主题配置
// E-ink optimized theme configuration with pure black and white colors

export const einkBackgroundList = [
  "#FFFFFF", // 纯白背景
  "#000000", // 纯黑背景
];

export const einkTextList = [
  "#000000", // 纯黑文字
  "#FFFFFF", // 纯白文字
];

export const einkThemeList = [
  {
    id: 0,
    color: "#000000",
    name: "eink-light",
    title: "E-ink Light",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  },
  {
    id: 1,
    color: "#FFFFFF",
    name: "eink-dark",
    title: "E-ink Dark",
    backgroundColor: "#000000",
    textColor: "#FFFFFF",
  },
];

// 墨水屏优化的颜色类
export const einkClasses = [
  "eink-black",
  "eink-white",
];

// 墨水屏专用颜色
export const einkColors = ["#FFFFFF", "#000000"];
export const einkLines = ["#000000", "#FFFFFF"];

// 检测是否为墨水屏设备的函数
export const isEinkDevice = (): boolean => {
  // 检测用户代理字符串中是否包含墨水屏设备标识
  const userAgent = navigator.userAgent.toLowerCase();
  const einkDevices = [
    'kindle',
    'kobo',
    'pocketbook',
    'onyx',
    'boox',
    'remarkable',
    'supernote',
    'e-ink',
    'eink'
  ];
  
  return einkDevices.some(device => userAgent.includes(device));
};

// 应用墨水屏主题的函数
export const applyEinkTheme = (isDark: boolean = false) => {
  const theme = isDark ? einkThemeList[1] : einkThemeList[0];
  
  // 设置CSS变量
  document.documentElement.style.setProperty('--eink-bg-color', theme.backgroundColor);
  document.documentElement.style.setProperty('--eink-text-color', theme.textColor);
  document.documentElement.style.setProperty('--eink-border-color', theme.textColor);
  
  // 添加墨水屏专用类
  document.body.classList.add('eink-optimized');
  
  return theme;
};