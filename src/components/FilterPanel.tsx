// 引入 React 核心库
import React from 'react';
// 引入 Ant Design 的卡片、滑块、单选框、选择器、间距、排版和分割线组件
import { Card, Slider, Radio, Select, Space, Typography, Divider } from 'antd';
// 引入筛选图标
import { FilterOutlined } from '@ant-design/icons';
// 引入筛选状态类型定义
import { FilterState } from '../data/types';
// 引入商品分类数据
import { categories } from '../data/mockData';
// 引入筛选面板样式文件
// 为解决“找不到模块或其类型声明”的 TypeScript 报错，将 CSS 文件声明为模块
// @ts-ignore
import '../styles/FilterPanel.css';

// 从 Typography 组件中解构出 Title 子组件
const { Title } = Typography;

// 定义筛选面板组件的属性接口
interface FilterPanelProps {
  // 当前的筛选状态
  filters: FilterState;
  // 筛选状态变更的回调函数
  onFiltersChange: (filters: FilterState) => void;
}

// 定义筛选面板函数组件
const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  // 处理价格区间筛选变更的函数
  const handlePriceRangeChange = (value: number[]) => {
    // 更新筛选状态中的价格区间
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  // 处理商品分类筛选变更的函数
  const handleCategoryChange = (value: string) => {
    // 更新筛选状态中的分类
    onFiltersChange({ ...filters, category: value });
  };

  // 处理排序方式变更的函数
  const handleSortChange = (e: any) => {
    // 更新筛选状态中的排序方式
    onFiltersChange({ ...filters, sortBy: e.target.value });
  };

  // 返回 JSX 元素
  return (
    // Ant Design 卡片组件
    <Card className="filter-panel">
      {/* 垂直方向的间距容器，设置大间距，宽度占满 */}
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 筛选面板头部 */}
        <div className="filter-header">
          {/* 筛选图标 */}
          <FilterOutlined />
          {/* 筛选面板标题 */}
          <Title level={4}>商品筛选</Title>
        </div>

        {/* 分割线 */}
        <Divider />

        {/* 价格区间筛选区域 */}
        <div className="filter-section">
          {/* 价格区间标题 */}
          <Title level={5}>价格区间</Title>
          {/* 双滑块组件，用于选择价格范围 */}
          <Slider
            range
            min={0}
            max={20000}
            step={100}
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            marks={{
              0: '¥0',
              5000: '¥5,000',
              10000: '¥10,000',
              15000: '¥15,000',
              20000: '¥20,000'
            }}
            className="price-slider"
          />
          {/* 显示当前选择的价格区间 */}
          <div className="price-display">
            ¥{filters.priceRange[0].toLocaleString()} - ¥{filters.priceRange[1].toLocaleString()}
          </div>
        </div>

        {/* 分割线 */}
        <Divider />

        {/* 商品分类筛选区域 */}
        <div className="filter-section">
          {/* 商品分类标题 */}
          <Title level={5}>商品分类</Title>
          {/* 下拉选择框组件，用于选择商品分类 */}
          <Select
            value={filters.category}
            onChange={handleCategoryChange}
            style={{ width: '100%' }}
            options={categories.map(cat => ({ label: cat, value: cat }))}
            className="category-select"
          />
        </div>

        {/* 分割线 */}
        <Divider />

        {/* 排序方式筛选区域 */}
        <div className="filter-section">
          {/* 排序方式标题 */}
          <Title level={5}>排序方式</Title>
          {/* 单选框组组件，用于选择排序方式 */}
          <Radio.Group
            value={filters.sortBy}
            onChange={handleSortChange}
            className="sort-radio-group"
          >
            {/* 垂直方向的间距容器 */}
            <Space direction="vertical">
              {/* 按销量排序选项 */}
              <Radio value="sales">按销量排序</Radio>
              {/* 价格从低到高排序选项 */}
              <Radio value="price_asc">价格从低到高</Radio>
              {/* 价格从高到低排序选项 */}
              <Radio value="price_desc">价格从高到低</Radio>
            </Space>
          </Radio.Group>
        </div>
      </Space>
    </Card>
  );
};

// 导出筛选面板组件
export default FilterPanel;
