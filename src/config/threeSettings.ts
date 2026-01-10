/**
 * threeSettings.ts - 3D 场景参数配置
 */

export type MaterialType = 'standard' | 'basic'

export interface ThreeSettings {
  // 模型与相机
  tetraRadius: number
  tetraOffsetX: number
  cameraDistance: number

  // 旋转与交互
  rotationSpeedY: number
  rotationSpeedX: number
  dragSensitivity: number

  // 光照
  ambientLightIntensity: number
  directionalLightIntensity: number
  directionalLightPosition: [number, number, number]

  // 贴图 & 字体
  textureSize: number
  fontSize: number
  fontFamily: string
  useSRGB: boolean
  
  // 四面体每个面的设置 [C面, X面, I面, N面]
  faceLetters: [string, string, string, string]
  faceColors: [string, string, string, string]
  faceLetterScale: number
  faceLetterScaleX: number
  faceLetterScaleY: number

  // ASCII 艺术效果
  asciiEnabled: boolean
  asciiGridSize: number
  asciiChars: string
  asciiColor: string

  // 材质
  materialType: MaterialType
  metalness: number
  roughness: number
  emissive: number
  emissiveColor: number

  // 画布 / 调试
  backgroundColorHex: number
  wireframe: boolean
  wireframeColor: number
  debugBox: boolean
  debugBoxPosition: [number, number, number]
  debugBoxSize: number
}

const threeSettings: ThreeSettings = {
  // 模型与相机
  tetraRadius: 4.0,           // 正四面体半径，值越大模型越大
  tetraOffsetX: -5,         // X轴偏移，负值向左，正值向右
  cameraDistance: 10,         // 摄像机距离，越大模型显得越小

  // 旋转与交互
  rotationSpeedY: 0.25,       // Y轴自动旋转速度（弧度/秒）
  rotationSpeedX: 0.08,       // X轴自动旋转速度（弧度/秒）
  dragSensitivity: 0.012,     // 拖拽灵敏度，值越大越灵敏

  // 光照
  ambientLightIntensity: 1.1,           // 环境光强度
  directionalLightIntensity: 1.6,       // 平行光强度
  directionalLightPosition: [5, 5, 5],  // 平行光位置 [x, y, z]

  // 贴图 & 字体
  textureSize: 1024,                    // 纹理分辨率，值越大字母越清晰
  fontSize: 320,                        // 字体像素大小
  fontFamily: 'Arial Black, sans-serif', // 字体族
  useSRGB: true,                        // 是否使用sRGB编码

  // 四面体每个面的设置
  faceLetters: ['C', 'X', 'I', 'N'],              // 四个面上的字母
  faceColors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'], // 四个面的颜色
  faceLetterScale: 0.6,                           // 字母大小比例，0.1-1.0
  faceLetterScaleX: 1.2,                          // 字母水平拉伸，>1变宽，<1变窄
  faceLetterScaleY: 0.7,                          // 字母垂直拉伸，>1变高，<1变矮

  // ASCII 艺术效果（用字符构成图形）
  asciiEnabled: true,        // 是否启用ASCII效果
  asciiGridSize: 10,         // 字符大小，值越小越密集越清晰
  asciiChars: 'CIXN',        // 用于显示的字符，按亮度从暗到亮排列
  asciiColor: '#ffffff',     // ASCII字符颜色（十六进制）

  // 材质
  materialType: 'standard',  // 材质类型：'standard'受光照影响，'basic'不受光照
  metalness: 0.0,            // 金属度 0-1，仅standard有效
  roughness: 1,            // 粗糙度 0-1，仅standard有效
  emissive: 0.0,             // 自发光强度
  emissiveColor: 0x000000,   // 自发光颜色（十六进制）

  // 画布 / 调试
  backgroundColorHex: 0x000000,       // 背景色（十六进制）
  wireframe: false,                   // 是否显示线框
  wireframeColor: 0xffffff,           // 线框颜色
  debugBox: false,                    // 是否显示调试方块
  debugBoxPosition: [2.6, 0, 0],      // 调试方块位置
  debugBoxSize: 0.28,                 // 调试方块尺寸
}

export default threeSettings
