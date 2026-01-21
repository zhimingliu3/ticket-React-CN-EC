// 引入 React 核心库和 Hooks
import React, { useState, useMemo, useEffect } from 'react';
// 引入 React Router 的 useNavigate Hook 用于页面跳转
import { useNavigate } from 'react-router-dom';
// 引入 Ant Design 的布局、行、列、徽标、按钮、排版、空状态、消息提示、下拉菜单、分页和弹窗组件
import { Layout, Row, Col, Badge, Button, Typography, Empty, message, Dropdown, Pagination, Modal } from 'antd';
// 引入购物车图标和退出图标
import { ShoppingCartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
// 引入商品卡片组件
import ProductCard from './ProductCard';
// 引入筛选面板组件
import FilterPanel from './FilterPanel';
// 引入购物车抽屉组件
import CartDrawer from './CartDrawer';
// 引入购物车动画组件
import CartAnimation from './CartAnimation';
// 引入模拟商品数据
import { mockProducts } from '../data/mockData';
// 引入类型定义
import { Product, FilterState, CartItem } from '../data/types';
// 引入商品列表样式文件
// 为解决"找不到模块或其类型声明"的 TypeScript 报错，将 CSS 文件声明为模块
// @ts-ignore
import '../styles/ProductList.css';

// 从 Layout 组件中解构出 Header、Content、Sider 子组件
const { Header, Content, Sider } = Layout;
// 从 Typography 组件中解构出 Title 子组件
const { Title } = Typography;

// 定义商品列表函数组件
const ProductList: React.FC = () => {
  // 使用 useNavigate Hook 获取导航函数
  const navigate = useNavigate();
  // 筛选状态，包含价格区间、分类和排序方式
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 20000],
    category: '全部',
    sortBy: 'sales'
  });
  // 当前页码状态
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 每页显示的商品数量
  const pageSize = 6;

  // 购物车商品列表状态
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // 购物车抽屉可见性状态
  const [cartVisible, setCartVisible] = useState(false);
  // 添加到购物车动画状态
  const [animationItem, setAnimationItem] = useState<{ startRect: DOMRect } | null>(null);
  // 用户名状态
  const [username, setUsername] = useState<string>('');
  // 确认弹窗可见性状态
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  // 待添加到购物车的商品状态
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  // 待添加商品的按钮位置状态
  const [pendingButtonRect, setPendingButtonRect] = useState<DOMRect | null>(null);

  // 使用 useEffect Hook 检查用户登录状态
  useEffect(() => {
    // 从 localStorage 获取登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    // 如果未登录，则跳转到登录页面
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/');
      return;
    }
    // 获取用户名
    const storedUsername = localStorage.getItem('username');
    // 设置用户名状态
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate]);

  // 使用 useEffect Hook 监听筛选条件变化，重置页码到第一页
  useEffect(() => {
    // 当筛选条件变化时，将当前页码重置为 1
    setCurrentPage(1);
  }, [filters]);

  // 处理退出登录的函数
  const handleLogout = () => {
    // 清除 localStorage 中的登录状态
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // 显示退出成功消息
    message.success('已退出登录');
    // 跳转到登录页面
    navigate('/');
  };

  // 用户下拉菜单项
  const userMenuItems = [
    {
      // 菜单项键值
      key: 'logout',
      // 菜单项标签
      label: '退出登录',
      // 菜单项图标
      icon: <LogoutOutlined />,
      // 菜单项点击事件
      onClick: handleLogout
    }
  ];

  // 使用 useMemo Hook 优化性能，根据筛选条件计算过滤后的商品列表
  const filteredProducts = useMemo(() => {
    // 复制商品列表
    let result = [...mockProducts];

    // 如果分类不是"全部"，则按分类筛选
    if (filters.category !== '全部') {
      result = result.filter(product => product.category === filters.category);
    }

    // 按价格区间筛选
    result = result.filter(
      product =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // 根据排序方式对商品进行排序
    switch (filters.sortBy) {
      case 'sales':
        // 按销量降序排序
        result.sort((a, b) => b.sales - a.sales);
        break;
      case 'price_asc':
        // 按价格升序排序
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        // 按价格降序排序
        result.sort((a, b) => b.price - a.price);
        break;
    }

    // 返回过滤和排序后的商品列表
    return result;
  }, [filters]);

  // 使用 useMemo Hook 计算当前页的商品列表
  const currentProducts = useMemo(() => {
    // 计算当前页的起始索引
    const startIndex = (currentPage - 1) * pageSize;
    // 计算当前页的结束索引
    const endIndex = startIndex + pageSize;
    // 返回当前页的商品列表
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, pageSize]);

  // 处理添加到购物车的函数
  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    // 获取触发事件的按钮元素
    const button = event.currentTarget;
    // 获取按钮的位置信息
    const rect = button.getBoundingClientRect();

    // 设置待添加的商品
    setPendingProduct(product);
    // 设置待添加商品的按钮位置
    setPendingButtonRect(rect);
    // 显示确认弹窗
    setConfirmModalVisible(true);
  };

  // 处理确认添加到购物车的函数
  const handleConfirmAddToCart = () => {
    // 检查是否有待添加的商品
    if (!pendingProduct || !pendingButtonRect) return;

    // 设置动画起始位置
    setAnimationItem({ startRect: pendingButtonRect });

    // 延迟 800 毫秒后添加商品到购物车
    setTimeout(() => {
      // 更新购物车商品列表
      setCartItems(prevItems => {
        // 查找购物车中是否已存在该商品
        const existingItem = prevItems.find(item => item.product.id === pendingProduct.id);
        if (existingItem) {
          // 如果已存在，则增加数量
          return prevItems.map(item =>
            item.product.id === pendingProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        // 如果不存在，则添加新商品
        return [...prevItems, { product: pendingProduct, quantity: 1 }];
      });

      // 显示成功提示消息
      message.success(`已将 ${pendingProduct.name} 加入购物车`);
    }, 800);

    // 关闭确认弹窗
    setConfirmModalVisible(false);
    // 清除待添加的商品和按钮位置
    setPendingProduct(null);
    setPendingButtonRect(null);
  };

  // 处理取消添加到购物车的函数
  const handleCancelAddToCart = () => {
    // 关闭确认弹窗
    setConfirmModalVisible(false);
    // 清除待添加的商品和按钮位置
    setPendingProduct(null);
    setPendingButtonRect(null);
  };

  // 处理更新购物车商品数量的函数
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    // 如果数量小于等于 0，则移除商品
    if (quantity <= 0) {
      // 从购物车商品列表中移除指定商品
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
      // 显示成功提示消息
      message.success('商品已从购物车移除');
      return;
    }
    // 更新商品数量
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // 计算购物车中商品的总数量
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 返回 JSX 元素
  return (
    // Ant Design 布局组件
    <Layout className="product-list-layout">
      {/* 页面头部 */}
      <Header className="layout-header">
        {/* 头部内容容器 */}
        <div className="header-content">
          {/* 页面标题 */}
          <Title level={3} className="header-title">
            电商平台
          </Title>
          {/* 头部右侧操作区域 */}
          <div className="header-actions">
            {/* 用户下拉菜单 */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              {/* 用户信息按钮 */}
              <Button icon={<UserOutlined />} className="user-info-button">
                {username}
              </Button>
            </Dropdown>
            {/* 购物车按钮，带徽标显示商品数量 */}
            <Badge count={totalItems}>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => setCartVisible(true)}
                className="cart-icon-button"
                size="large"
              >
                购物车
              </Button>
            </Badge>
          </div>
        </div>
      </Header>

      {/* 主内容区域 */}
      <Layout>
        {/* 左侧筛选面板，宽度为 300px */}
        <Sider width={300} className="filter-sider">
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
        </Sider>

        {/* 右侧商品内容区域 */}
        <Content className="product-content">
          {/* 显示筛选结果数量 */}
          <header className="product-count">
            找到 {filteredProducts.length} 件商品
          </header>
          {/* 如果没有符合条件的商品，显示空状态 */}
          {filteredProducts.length === 0 ? (
            <Empty description="没有找到符合条件的商品" />
          ) : (
            // 否则显示商品网格
            <>
              {/* 商品网格布局 */}
              <main className="product-grid">
                {/* 遍历当前页的商品列表，渲染商品卡片 */}
                <Row gutter={[24, 24]}>
                  {currentProducts.map(product => (
                    <Col xs={24} sm={12} md={8} lg={8} xl={8} key={product.id}>
                      <ProductCard product={product} onAddToCart={handleAddToCart} />
                    </Col>
                  ))}
                </Row>
              </main>
              {/* 分页组件 */}
              <nav className="pagination-container">
                <Pagination
                  // 当前页码
                  current={currentPage}
                  // 总商品数量
                  total={filteredProducts.length}
                  // 每页显示的商品数量
                  pageSize={pageSize}
                  // 页码改变时的回调函数
                  onChange={setCurrentPage}
                  // 显示总数
                  showTotal={(total) => `共 ${total} 件商品`}
                  // 显示快速跳转
                  showQuickJumper
                  // 显示页码大小选择器
                  showSizeChanger={false}
                  // 分页器位置居中
                  className="pagination"
                />
              </nav>
            </>
          )}
        </Content>
      </Layout>

      {/* 购物车抽屉组件 */}
      <CartDrawer
        cartItems={cartItems}
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* 确认添加到购物车弹窗 */}
      <Modal
        // 弹窗标题
        title="确认添加到购物车"
        // 弹窗可见性
        open={confirmModalVisible}
        // 点击遮罩层不关闭弹窗
        maskClosable={false}
        // 点击取消按钮的回调函数
        onCancel={handleCancelAddToCart}
        // 弹窗底部按钮
        footer={[
          // 取消按钮
          <div key="footer-buttons" className="confirm-modal-footer">
            <Button key="cancel" onClick={handleCancelAddToCart}>
              取消
            </Button>
            <Button key="confirm" type="primary" onClick={handleConfirmAddToCart}>
              确认
            </Button>
          </div>
        ]}
        // 弹窗宽度
        width={400}
        // 居中显示
        centered
      >
        {/* 弹窗内容 */}
        {pendingProduct && (
          <div className="confirm-modal-content">
            {/* 商品图片 */}
            <img
              src={pendingProduct.image}
              alt={pendingProduct.name}
              className="confirm-modal-image"
            />
            {/* 商品名称 */}
            <div className="confirm-modal-name">{pendingProduct.name}</div>
            {/* 商品价格 */}
            <div className="confirm-modal-price">¥{pendingProduct.price}</div>
          </div>
        )}
      </Modal>

      {/* 添加到购物车动画组件 */}
      {animationItem && (
        <CartAnimation
          startRect={animationItem.startRect}
          onComplete={() => setAnimationItem(null)}
        />
      )}
    </Layout>
  );
};

// 导出商品列表组件
export default ProductList;
