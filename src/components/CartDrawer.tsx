// 引入 React 核心库
import React from 'react';
// 引入 Ant Design 的抽屉、按钮、间距、排版和空状态组件
import { Drawer, Button, Space, Typography, Empty } from 'antd';
// 引入购物车商品项类型定义
import { CartItem } from '../data/types';
// 引入购物车抽屉样式文件
// 为解决"找不到模块或其类型声明"的 TypeScript 报错，将 CSS 文件声明为模块
// @ts-ignore
import '../styles/CartDrawer.css';

// 从 Typography 组件中解构出 Title、Text 子组件
const { Title, Text } = Typography;

// 定义购物车抽屉组件的属性接口
interface CartDrawerProps {
  // 购物车商品列表
  cartItems: CartItem[];
  // 抽屉是否可见
  visible: boolean;
  // 关闭抽屉的回调函数
  onClose: () => void;
  // 更新商品数量的回调函数，接收商品 ID 和新数量
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

// 定义购物车抽屉函数组件
const CartDrawer: React.FC<CartDrawerProps> = ({
  cartItems,
  visible,
  onClose,
  onUpdateQuantity
}) => {
  // 计算购物车中所有商品的总价格
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // 计算购物车中所有商品的总数量
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 返回 JSX 元素
  return (
    // Ant Design 抽屉组件，从右侧弹出，宽度为 400px
    <Drawer
      title="购物车"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      className="cart-drawer"
    >
      {/* 如果购物车为空，显示空状态 */}
      {cartItems.length === 0 ? (
        <Empty description="购物车是空的" />
      ) : (
        // 否则显示购物车商品列表
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* 遍历购物车商品列表 */}
          {cartItems.map((item) => (
            // 单个购物车商品项
            <div key={item.product.id} className="cart-item">
              {/* 商品图片 */}
              <img
                src={item.product.image}
                alt={item.product.name}
                className="cart-item-image"
              />
              {/* 商品信息区域 */}
              <div className="cart-item-info">
                {/* 商品名称，最多显示 1 行 */}
                <Title level={5} ellipsis={{ rows: 1 }}>
                  {item.product.name}
                </Title>
                {/* 商品分类，灰色文本 */}
                <Text type="secondary">{item.product.category}</Text>
                {/* 商品价格区域 */}
                <div className="cart-item-price">
                  {/* 商品单价，红色加粗文本 */}
                  <Text type="danger" strong>
                    ¥{item.product.price.toLocaleString()}
                  </Text>
                </div>
                {/* 商品数量控制区域 */}
                <div className="cart-item-quantity">
                  {/* 减少数量按钮 */}
                  <Button
                    size="small"
                    onClick={() => {
                      // 如果数量大于1，则减少数量
                      // 如果数量等于1，则调用onUpdateQuantity传入0，触发删除逻辑
                      onUpdateQuantity(item.product.id, item.quantity - 1);
                    }}
                  >
                    -
                  </Button>
                  {/* 商品数量 */}
                  <Text strong>{item.quantity}</Text>
                  {/* 增加数量按钮 */}
                  <Button
                    size="small"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {/* 购物车总计区域 */}
          <div className="cart-total">
            {/* 垂直方向的间距容器 */}
            <Space direction="vertical" style={{ width: '100%' }}>
              {/* 商品总数行 */}
              <div className="total-row">
                <Text>商品总数:</Text>
                <Text strong>{totalItems} 件</Text>
              </div>
              {/* 总金额行 */}
              <div className="total-row">
                <Text>总金额:</Text>
                {/* 总金额，红色加粗文本，字体大小 20px */}
                <Text type="danger" strong style={{ fontSize: '20px' }}>
                  ¥{totalPrice.toLocaleString()}
                </Text>
              </div>
              {/* 去结算按钮 */}
              <Button type="primary" size="large" block>
                去结算
              </Button>
            </Space>
          </div>
        </Space>
      )}
    </Drawer>
  );
};

// 导出购物车抽屉组件
export default CartDrawer;
