import { useState } from 'react'
import {
  SiPython,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiC,
  SiGit,
  SiVercel,
  SiRender,
  SiPostman,
  SiSwagger,
  SiKotlin,
  SiAndroid,
  SiSqlite,
  SiMysql,
  SiPandas,
  SiYoutube,
  SiGmail,
  SiAnthropic,
  SiMistralai,
  SiGooglegemini,
  SiOnnx,
} from 'react-icons/si'

const ICON_MAP = {
  python: SiPython,
  fastapi: SiFastapi,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  react: SiReact,
  javascript: SiJavascript,
  js: SiJavascript,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  c: SiC,
  git: SiGit,
  vercel: SiVercel,
  render: SiRender,
  postman: SiPostman,
  'swagger ui': SiSwagger,
  swagger: SiSwagger,
  kotlin: SiKotlin,
  'android sdk': SiAndroid,
  android: SiAndroid,
  sqlite: SiSqlite,
  mysql: SiMysql,
  pandas: SiPandas,
  'youtube data api': SiYoutube,
  youtube: SiYoutube,
  'gmail api (oauth2)': SiGmail,
  'gmail api': SiGmail,
  gmail: SiGmail,
  'gemini ai': SiGooglegemini,
  gemini: SiGooglegemini,
  mistral: SiMistralai,
  'anthropic api': SiAnthropic,
  anthropic: SiAnthropic,
  'onnx runtime': SiOnnx,
  onnx: SiOnnx,
}

// Brand colors applied exclusively on hover
const BRAND_COLORS = {
  python: '#3776AB',
  fastapi: '#05998B',
  mongodb: '#47A248',
  postgresql: '#4169E1',
  react: '#61DAFB',
  javascript: '#F7DF1E',
  js: '#F7DF1E',
  html: '#E34F26',
  html5: '#E34F26',
  css: '#1572B6',
  css3: '#1572B6',
  c: '#659AD2',
  git: '#F05032',
  vercel: '#FFFFFF',
  render: '#46E3B7',
  postman: '#FF6C37',
  'swagger ui': '#85EA2D',
  swagger: '#85EA2D',
  kotlin: '#7F52FF',
  'android sdk': '#3DDC84',
  android: '#3DDC84',
  sqlite: '#003B57',
  mysql: '#4479A1',
  pandas: '#150458',
  'youtube data api': '#FF0000',
  youtube: '#FF0000',
  'gmail api (oauth2)': '#EA4335',
  'gmail api': '#EA4335',
  gmail: '#EA4335',
  'gemini ai': '#8E75FF',
  gemini: '#8E75FF',
  mistral: '#FA520F',
  'anthropic api': '#D97757',
  anthropic: '#D97757',
  'onnx runtime': '#005CED',
  onnx: '#005CED',
}

export function getSkillIcon(name) {
  if (!name || typeof name !== 'string') return null
  const key = name.toLowerCase().trim()
  return ICON_MAP[key] || null
}

export function getSkillBrandColor(name) {
  if (!name || typeof name !== 'string') return null
  const key = name.toLowerCase().trim()
  return BRAND_COLORS[key] || null
}

export default function SkillBadge({ skill, iconOnly = false, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = getSkillIcon(skill)
  const brandColor = getSkillBrandColor(skill)

  if (iconOnly) {
    if (Icon) {
      return (
        <span
          title={skill}
          aria-label={skill}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`inline-flex items-center justify-center rounded-sm border border-blueprint-line/15 bg-blueprint-line/5 p-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint-accent/50 hover:shadow-[0_0_8px_rgba(94,168,255,0.15)] ${className}`}
        >
          <Icon
            style={isHovered && brandColor ? { color: brandColor } : undefined}
            color={isHovered && brandColor ? brandColor : 'currentColor'}
            className={`h-3.5 w-3.5 shrink-0 transition-colors duration-200 ${
              isHovered && brandColor ? '' : 'text-blueprint-line'
            }`}
          />
        </span>
      )
    }

    return (
      <span
        className={`inline-flex items-center rounded-sm border border-blueprint-line/15 bg-blueprint-line/5 px-2 py-0.5 font-mono text-[11px] text-blueprint-slate transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint-line/30 ${className}`}
      >
        {skill}
      </span>
    )
  }

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center gap-1.5 rounded-sm border border-blueprint-line/20 bg-blueprint-line/5 px-2.5 py-1 font-mono text-xs text-blueprint-line transition-all duration-200 hover:-translate-y-0.5 hover:border-blueprint-accent/50 hover:shadow-[0_0_8px_rgba(94,168,255,0.15)] ${className}`}
    >
      {Icon && (
        <Icon
          style={isHovered && brandColor ? { color: brandColor } : undefined}
          color={isHovered && brandColor ? brandColor : 'currentColor'}
          className={`h-3.5 w-3.5 shrink-0 transition-colors duration-200 ${
            isHovered && brandColor ? '' : 'text-blueprint-line'
          }`}
        />
      )}
      <span>{skill}</span>
    </span>
  )
}
