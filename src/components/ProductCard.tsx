// 引入 React 核心库
import React from 'react';
// 引入 Ant Design 的卡片、按钮、标签和排版组件
import { Card, Button, Tag, Typography } from 'antd';
// 引入购物车图标
import { ShoppingCartOutlined } from '@ant-design/icons';
// 引入商品类型定义
import { Product } from '../data/types';
// 引入商品卡片样式文件
// 为解决“找不到模块或其类型声明”的 TypeScript 报错，将 CSS 文件声明为模块
// @ts-ignore
import '../styles/ProductCard.css';

// 从 Typography 组件中解构出 Title、Text、Paragraph 子组件
const { Title, Text, Paragraph } = Typography;

// 定义商品卡片组件的属性接口
interface ProductCardProps {
  // 商品数据
  product: Product;
  // 添加到购物车的回调函数，接收商品对象和鼠标事件
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

// 定义商品卡片函数组件
const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // 图片加载状态
  const [imageError, setImageError] = React.useState(false);

  // 处理图片加载错误
  const handleImageError = () => {
    setImageError(true);
  };

  // 返回 JSX 元素
  return (
    // Ant Design 卡片组件，hoverable 属性启用悬停效果
    <Card
      hoverable
      className="product-card"
      // 卡片封面区域
      cover={
        // 商品图片容器
        <figure className="product-image-container">
          {/* 如果图片加载失败，显示商品名称 */}
          {imageError ? (
            <div className="product-image-placeholder">
              {product.name}
            </div>
          ) : (
            // 商品图片，alt 属性为图片描述，src 属性为图片地址
            <img
              alt={product.name}
              src={product.image}
              className="product-image"
              onError={handleImageError}
            />
          )}
        </figure>
      }
      // 卡片底部操作按钮区域
      actions={[
        // 添加到购物车按钮
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          // 点击时触发添加到购物车回调函数
          onClick={(e) => onAddToCart(product, e)}
          className="add-to-cart-btn"
        >
          加入购物车
        </Button>
      ]}
    >
      {/* 商品信息区域 */}
      <article className="product-info">
        {/* 商品名称，最多显示 2 行 */}
        <h2 className="product-name">
          <Title level={5} ellipsis={{ rows: 2 }}>
            {product.name}
          </Title>
        </h2>
        {/* 商品描述，最多显示 2 行 */}
        <p className="product-description">
          <Paragraph ellipsis={{ rows: 2 }}>
            {product.description}
          </Paragraph>
        </p>
        {/* 商品元数据区域，包含分类和销量 */}
        <footer className="product-meta">
          {/* 商品分类标签，蓝色 */}
          <Tag color="blue">{product.category}</Tag>
          {/* 商品销量，灰色文本 */}
          <Text type="secondary">销量: {product.sales}</Text>
        </footer>
        {/* 商品价格区域 */}
        <div className="product-price">
          {/* 商品价格，红色加粗文本 */}
          <Text type="danger" strong>
            ¥{product.price.toLocaleString()}
          </Text>
        </div>
      </article>
    </Card>
  );
};

// 导出商品卡片组件
export default ProductCard;
