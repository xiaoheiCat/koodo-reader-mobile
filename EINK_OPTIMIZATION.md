# 墨水屏优化功能 / E-ink Optimization

## 概述 / Overview

本项目已添加对墨水屏设备的专门优化，确保界面主要使用纯黑色 (#000000) 和纯白色 (#FFFFFF)，以提供最佳的墨水屏阅读体验。

This project now includes specialized optimization for e-ink devices, ensuring the interface primarily uses pure black (#000000) and pure white (#FFFFFF) for the best e-ink reading experience.

## 功能特性 / Features

### 自动检测 / Automatic Detection
- 自动检测常见的墨水屏设备（Kindle、Kobo、PocketBook、Onyx Boox、reMarkable等）
- 为检测到的墨水屏设备自动应用优化主题
- Automatically detects common e-ink devices (Kindle, Kobo, PocketBook, Onyx Boox, reMarkable, etc.)
- Automatically applies optimized theme for detected e-ink devices

### 纯黑白界面 / Pure Black & White Interface
- 强制所有界面元素使用纯黑色 (#000000) 和纯白色 (#FFFFFF)
- 移除所有渐变、阴影和动画效果
- 优化对比度以提高可读性
- Forces all interface elements to use pure black (#000000) and pure white (#FFFFFF)
- Removes all gradients, shadows, and animation effects
- Optimizes contrast for better readability

### 手动切换 / Manual Toggle
- 在设置中提供"墨水屏模式"选项
- 支持浅色和深色两种墨水屏主题
- 可随时在普通模式和墨水屏模式间切换
- Provides "E-ink mode" option in settings
- Supports both light and dark e-ink themes
- Can switch between normal and e-ink modes at any time

## 使用方法 / Usage

### 自动启用 / Automatic Activation
如果您使用的是支持的墨水屏设备，应用将自动检测并启用墨水屏优化模式。

If you're using a supported e-ink device, the app will automatically detect and enable e-ink optimization mode.

### 手动启用 / Manual Activation
1. 打开应用设置 / Open app settings
2. 找到"外观"部分 / Find the "Appearance" section
3. 在"外观"下拉菜单中选择"墨水屏模式" / Select "E-ink mode" from the "Appearance" dropdown
4. 在"主题色"中选择"墨水屏浅色"或"墨水屏深色" / Choose "E-ink Light" or "E-ink Dark" in "Theme color"

## 支持的设备 / Supported Devices

应用会自动检测以下墨水屏设备：
The app automatically detects the following e-ink devices:

- Amazon Kindle 系列 / Amazon Kindle series
- Kobo 系列 / Kobo series
- PocketBook 系列 / PocketBook series
- Onyx Boox 系列 / Onyx Boox series
- reMarkable 系列 / reMarkable series
- Supernote 系列 / Supernote series
- 其他包含 "e-ink" 或 "eink" 标识的设备 / Other devices with "e-ink" or "eink" identifiers

## 技术实现 / Technical Implementation

### 文件结构 / File Structure
```
src/
├── constants/
│   └── einkTheme.tsx          # 墨水屏主题配置
├── assets/styles/
│   └── eink.css               # 墨水屏专用样式
└── utils/reader/
    └── launchUtil.ts          # 主题初始化逻辑
```

### 核心功能 / Core Features

#### 设备检测 / Device Detection
```typescript
export const isEinkDevice = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  const einkDevices = ['kindle', 'kobo', 'pocketbook', 'onyx', 'boox', 'remarkable', 'supernote', 'e-ink', 'eink'];
  return einkDevices.some(device => userAgent.includes(device));
};
```

#### 主题应用 / Theme Application
```typescript
export const applyEinkTheme = (isDark: boolean = false) => {
  const theme = isDark ? einkThemeList[1] : einkThemeList[0];
  document.documentElement.style.setProperty('--eink-bg-color', theme.backgroundColor);
  document.documentElement.style.setProperty('--eink-text-color', theme.textColor);
  document.body.classList.add('eink-optimized');
};
```

### CSS 优化 / CSS Optimizations

墨水屏专用样式包括：
E-ink specific styles include:

- 禁用所有动画和过渡效果 / Disable all animations and transitions
- 强制使用纯黑白色调 / Force pure black and white colors
- 移除阴影和渐变 / Remove shadows and gradients
- 优化边框和对比度 / Optimize borders and contrast

## 配置选项 / Configuration Options

### 主题选项 / Theme Options
- **墨水屏浅色** / **E-ink Light**: 白色背景，黑色文字
- **墨水屏深色** / **E-ink Dark**: 黑色背景，白色文字

### 颜色选项 / Color Options
- 新增纯黑色 (#000000) 和纯白色 (#FFFFFF) 高亮选项
- Added pure black (#000000) and pure white (#FFFFFF) highlight options

## 性能优化 / Performance Optimizations

- 禁用动画以减少墨水屏刷新频率 / Disable animations to reduce e-ink refresh rate
- 简化视觉效果以提高响应速度 / Simplify visual effects for better responsiveness
- 优化字体渲染以提高清晰度 / Optimize font rendering for better clarity

## 故障排除 / Troubleshooting

### 墨水屏模式未自动启用 / E-ink mode not automatically enabled
1. 检查设备的用户代理字符串是否包含支持的关键词
2. 手动在设置中启用墨水屏模式
3. Check if device user agent string contains supported keywords
4. Manually enable e-ink mode in settings

### 界面仍显示彩色 / Interface still shows colors
1. 确保已选择墨水屏主题 / Ensure e-ink theme is selected
2. 刷新页面以应用更改 / Refresh page to apply changes
3. 检查浏览器是否支持CSS变量 / Check if browser supports CSS variables

## 更新日志 / Changelog

### v1.0.0
- 添加墨水屏设备自动检测 / Added automatic e-ink device detection
- 实现纯黑白主题 / Implemented pure black and white themes
- 添加墨水屏专用CSS样式 / Added e-ink specific CSS styles
- 集成到设置界面 / Integrated into settings interface
- 添加多语言支持 / Added multi-language support

## 贡献 / Contributing

如果您发现新的墨水屏设备需要支持，或有改进建议，请提交 Issue 或 Pull Request。

If you find new e-ink devices that need support or have improvement suggestions, please submit an Issue or Pull Request.