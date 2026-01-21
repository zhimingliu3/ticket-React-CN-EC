# React 电商商品列表页面

基于 React + Ant Design 的电商商品列表页面，包含商品筛选、排序和购物车动画效果。

## 功能特性

- 商品展示：响应式网格布局展示商品卡片
- 商品筛选：
  - 价格区间筛选（滑块选择）
  - 商品分类筛选
- 商品排序：
  - 按销量排序
  - 价格从低到高
  - 价格从高到低
- 购物车功能：
  - 加入购物车动画效果
  - 购物车侧边抽屉
  - 商品数量增减
  - 实时计算总价
- 响应式设计：适配不同屏幕尺寸

## 技术栈

- React 18
- TypeScript
- Ant Design 5.x
- Vite

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── ProductCard.tsx      # 商品卡片组件
│   ├── FilterPanel.tsx      # 筛选面板组件
│   ├── CartDrawer.tsx       # 购物车抽屉组件
│   ├── CartAnimation.tsx    # 购物车动画组件
│   └── ProductList.tsx      # 商品列表主组件
├── data/               # 数据目录
│   ├── types.ts             # TypeScript 类型定义
│   └── mockData.ts          # 模拟数据
├── styles/             # 样式目录
│   ├── App.css              # 全局样式
│   ├── ProductCard.css      # 商品卡片样式
│   ├── FilterPanel.css      # 筛选面板样式
│   ├── CartDrawer.css       # 购物车抽屉样式
│   ├── CartAnimation.css    # 动画样式
│   └── ProductList.css      # 商品列表样式
└── main.tsx            # 应用入口
```

## 安装依赖

```bash
npm install
```

## 运行项目

```bash
npm run dev
```

项目将在 http://localhost:3000 启动

## 构建项目

```bash
npm run build
```

## 预览构建

```bash
npm run preview
```

## 组件说明

### ProductCard
商品卡片组件，展示商品图片、名称、描述、分类、销量和价格，包含加入购物车按钮。

### FilterPanel
筛选面板组件，提供价格区间滑块、分类选择和排序选项。

### CartDrawer
购物车抽屉组件，展示已添加的商品，支持数量调整和删除操作。

### CartAnimation
购物车动画组件，实现从商品卡片到购物车按钮的飞入动画效果。

### ProductList
主组件，整合所有子组件，管理商品筛选、排序和购物车状态。
