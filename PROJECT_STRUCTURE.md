# Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles (Tailwind)
│   │   ├── not-found.tsx        # 404 page
│   │   ├── about/
│   │   │   └── page.mdx         # About page (MDX)
│   │   └── blog/
│   │       ├── layout.tsx       # Blog layout
│   │       ├── page.tsx         # Blog list
│   │       ├── first-post/
│   │       │   └── page.mdx
│   │       └── second-post/
│   │           └── page.mdx
│   └── components/              # Reusable React components
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.ts                # Next.js config (with MDX support)
├── tailwind.config.ts            # Tailwind CSS config
├── postcss.config.js             # PostCSS config
└── .gitignore
```

## 配置说明

### 1. **package.json**
- 包含所有必要的依赖
- MDX 支持: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`
- Tailwind CSS 支持
- 包含 build 脚本用于静态导出

### 2. **next.config.ts**
- 启用 MDX 支持
- 配置 `output: 'export'` 用于静态生成（SSG）
- 禁用图片优化（静态导出必需）
- 支持 `.md` 和 `.mdx` 文件

### 3. **tsconfig.json**
- 严格的 TypeScript 配置
- 路径别名 `@/*` 指向 `src/*`
- 支持 JSX

### 4. **tailwind.config.ts**
- 配置 Tailwind CSS 扫描路径
- 支持暗色模式
- 可自定义主题颜色

### 5. **globals.css**
- 导入 Tailwind 的三个核心指令
- 全局样式设置
- CSS 变量支持主题切换

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建（静态导出）
npm run build
npm start

# 导出为静态网站
npm run export
```

## 部署

构建后会生成 `out/` 目录，包含完整的静态网站，可以部署到：
- Vercel
- GitHub Pages
- Netlify
- 任何静态文件托管服务
