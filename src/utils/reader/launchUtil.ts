import {
  browserName,
  browserVersion,
  isBrowser,
  isElectron,
  osName,
  osVersion,
} from "react-device-detect";
import { ConfigService } from "../../assets/lib/kookit-extra-browser.min";
import { isEinkDevice, applyEinkTheme } from "../../constants/einkTheme";
import packageJson from "../../../package.json";
export const initTheme = () => {
  const style = document.createElement("link");
  style.rel = "stylesheet";
  let isNight = false;
  
  // 检测是否为墨水屏设备
  const isEink = isEinkDevice();
  
  if (isElectron) {
    const { ipcRenderer } = window.require("electron");
    isNight = ipcRenderer.sendSync("system-color");
  } else {
    isNight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  
  ConfigService.setReaderConfig("isOSNight", isNight ? "yes" : "no");
  ConfigService.setReaderConfig("isEinkDevice", isEink ? "yes" : "no");
  ConfigService.setItem("appVersion", packageJson.version);
  ConfigService.setItem(
    "appPlatform",
    isElectron ? osName + " " + osVersion : browserName + " " + browserVersion
  );
  
  if (!ConfigService.getReaderConfig("appSkin")) {
    // 如果是墨水屏设备，默认使用墨水屏主题
    ConfigService.setReaderConfig("appSkin", isEink ? "eink" : "system");
    //new user don't need to upgrade
    ConfigService.setItem("isUpgradedConfig", "yes");
    ConfigService.setItem("isUpgradedStorage", "yes");
    if (isNight) {
    }
  }
  
  // 如果是墨水屏设备或用户选择了墨水屏主题
  if (ConfigService.getReaderConfig("appSkin") === "eink" || isEink) {
    // 加载墨水屏专用样式
    const einkStyle = document.createElement("link");
    einkStyle.rel = "stylesheet";
    einkStyle.href = "./assets/styles/eink.css";
    document.head.appendChild(einkStyle);
    
    // 应用墨水屏主题
    setTimeout(() => {
      applyEinkTheme(isNight);
    }, 100);
    
    // 仍然加载基础主题
    style.href = isNight ? "./assets/styles/dark.css" : "./assets/styles/default.css";
  } else if (
    ConfigService.getReaderConfig("appSkin") === "night" ||
    (ConfigService.getReaderConfig("appSkin") === "system" &&
      ConfigService.getReaderConfig("isOSNight") === "yes")
  ) {
    style.href = "./assets/styles/dark.css";
  } else {
    style.href = "./assets/styles/default.css";
  }
  
  document.head.appendChild(style);
};
export const initSystemFont = () => {
  if (ConfigService.getReaderConfig("systemFont")) {
    let body = document.getElementsByTagName("body")[0];
    body.setAttribute(
      "style",
      "font-family:" +
        ConfigService.getReaderConfig("systemFont") +
        "!important"
    );
  }
};
