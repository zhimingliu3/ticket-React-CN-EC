// 引入 React 核心库和 Hooks
import React, { useEffect, useState } from 'react';
// 引入 createPortal 函数，用于在 DOM 树外部渲染组件
import { createPortal } from 'react-dom';
// 引入购物车图标
import { ShoppingCartOutlined } from '@ant-design/icons';
// 引入购物车动画样式文件
// 为解决“找不到模块或其类型声明”的 TypeScript 报错，将 CSS 文件声明为模块
// @ts-ignore
import '../styles/CartAnimation.css';

// 定义购物车动画组件的属性接口
interface CartAnimationProps {
  // 动画起始位置
  startRect: DOMRect;
  // 动画完成后的回调函数
  onComplete: () => void;
}

// 定义购物车动画函数组件
const CartAnimation: React.FC<CartAnimationProps> = ({ startRect, onComplete }) => {
  // 动画元素的位置状态
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // 动画元素的透明度状态
  const [opacity, setOpacity] = useState(1);
  // 动画元素的缩放状态
  const [scale, setScale] = useState(1);

  // 使用 useEffect Hook 设置动画效果
  useEffect(() => {
    // 查找购物车按钮元素
    const cartButton = document.querySelector('.cart-icon-button');
    // 如果找不到购物车按钮，直接返回
    if (!cartButton) return;

    // 获取购物车按钮的位置信息
    const endRect = cartButton.getBoundingClientRect();
    // 计算动画在 X 轴方向上的移动距离
    const deltaX = endRect.left - startRect.left + endRect.width / 2 - startRect.width / 2;
    // 计算动画在 Y 轴方向上的移动距离
    const deltaY = endRect.top - startRect.top + endRect.height / 2 - startRect.height / 2;

    // 设置动画持续时间为 800 毫秒
    const duration = 800;
    // 记录动画开始时间
    const startTime = performance.now();

    // 定义动画函数
    const animate = (currentTime: number) => {
      // 计算动画已运行的时间
      const elapsed = currentTime - startTime;
      // 计算动画进度，最大值为 1
      const progress = Math.min(elapsed / duration, 1);

      // 定义缓动函数，使用四次方缓出效果
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      // 更新动画元素的位置
      setPosition({
        x: startRect.left + deltaX * easeOutQuart,
        y: startRect.top + deltaY * easeOutQuart
      });

      // 更新动画元素的缩放比例
      setScale(1 - progress * 0.5);
      // 更新动画元素的透明度
      setOpacity(1 - progress * 0.3);

      // 如果动画未完成，继续下一帧
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // 动画完成后，调用完成回调函数
        onComplete();
      }
    };

    // 开始动画
    requestAnimationFrame(animate);
  }, [startRect, onComplete]);

  // 使用 createPortal 将动画元素渲染到 document.body 下
  return createPortal(
    // 动画元素容器
    <div
      className="cart-animation-item"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity,
        transform: `scale(${scale})`
      }}
    >
      {/* 购物车图标，字体大小 24px，颜色为蓝色 */}
      <ShoppingCartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
    </div>,
    document.body
  );
};

// 导出购物车动画组件
export default CartAnimation;
