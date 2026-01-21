// 引入商品类型定义
import { Product } from './types';

// 导出模拟商品数据数组
export const mockProducts: Product[] = [
  {
    // 商品 ID
    id: 1,
    // 商品名称
    name: 'iPhone 15 Pro Max',
    // 商品价格
    price: 9999,
    // 商品分类
    category: '手机',
    // 商品销量
    sales: 5200,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro+Max',
    // 商品描述
    description: '苹果最新旗舰手机，A17 Pro芯片，钛金属边框'
  },
  {
    // 商品 ID
    id: 2,
    // 商品名称
    name: 'MacBook Pro 14英寸',
    // 商品价格
    price: 14999,
    // 商品分类
    category: '电脑',
    // 商品销量
    sales: 3200,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=MacBook+Pro',
    // 商品描述
    description: 'M3 Pro芯片，14英寸Liquid Retina XDR显示屏'
  },
  {
    // 商品 ID
    id: 3,
    // 商品名称
    name: 'AirPods Pro 2',
    // 商品价格
    price: 1899,
    // 商品分类
    category: '耳机',
    // 商品销量
    sales: 8900,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=AirPods+Pro+2',
    // 商品描述
    description: '主动降噪，空间音频，MagSafe充电盒'
  },
  {
    // 商品 ID
    id: 4,
    // 商品名称
    name: 'iPad Pro 12.9英寸',
    // 商品价格
    price: 8999,
    // 商品分类
    category: '平板',
    // 商品销量
    sales: 2800,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=iPad+Pro',
    // 商品描述
    description: 'M2芯片，12.9英寸Liquid Retina XDR显示屏'
  },
  {
    // 商品 ID
    id: 5,
    // 商品名称
    name: 'Apple Watch Ultra 2',
    // 商品价格
    price: 6499,
    // 商品分类
    category: '手表',
    // 商品销量
    sales: 2100,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=Apple+Watch+Ultra',
    // 商品描述
    description: '钛金属表壳，双频GPS，100米防水'
  },
  {
    // 商品 ID
    id: 6,
    // 商品名称
    name: '华为 Mate 60 Pro',
    // 商品价格
    price: 6999,
    // 商品分类
    category: '手机',
    // 商品销量
    sales: 7500,
    // 商品图片 URL
    image: 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/482973/item/usgoods_03_482973_3x4.jpg',
    // 商品描述
    description: '麒麟9000S芯片，卫星通话功能'
  },
  {
    // 商品 ID
    id: 7,
    // 商品名称
    name: '小米 14 Ultra',
    // 商品价格
    price: 6499,
    // 商品分类
    category: '手机',
    // 商品销量
    sales: 4300,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=Xiaomi+14+Ultra',
    // 商品描述
    description: '徕卡光学镜头，骁龙8 Gen 3处理器'
  },
  {
    // 商品 ID
    id: 8,
    // 商品名称
    name: '戴森 V15 吸尘器',
    // 商品价格
    price: 4999,
    // 商品分类
    category: '家电',
    // 商品销量
    sales: 1800,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=Dyson+V15',
    // 商品描述
    description: '激光探测，LCD显示，60分钟续航'
  },
  {
    // 商品 ID
    id: 9,
    // 商品名称
    name: '索尼 WH-1000XM5',
    // 商品价格
    price: 2499,
    // 商品分类
    category: '耳机',
    // 商品销量
    sales: 5600,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=Sony+WH-1000XM5',
    // 商品描述
    description: '业界领先降噪，30小时续航'
  },
  {
    // 商品 ID
    id: 10,
    // 商品名称
    name: '联想 ThinkPad X1 Carbon',
    // 商品价格
    price: 12999,
    // 商品分类
    category: '电脑',
    // 商品销量
    sales: 1500,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=ThinkPad+X1',
    // 商品描述
    description: '碳纤维机身，14英寸2.8K OLED屏'
  },
  {
    // 商品 ID
    id: 11,
    // 商品名称
    name: '三星 Galaxy S24 Ultra',
    // 商品价格
    price: 9699,
    // 商品分类
    category: '手机',
    // 商品销量
    sales: 3800,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=Galaxy+S24+Ultra',
    // 商品描述
    description: '骁龙8 Gen 3，200MP主摄，S Pen'
  },
  {
    // 商品 ID
    id: 12,
    // 商品名称
    name: '任天堂 Switch OLED',
    // 商品价格
    price: 2099,
    // 商品分类
    category: '游戏',
    // 商品销量
    sales: 6200,
    // 商品图片 URL
    image: 'https://via.placeholder.com/300x300?text=Switch+OLED',
    // 商品描述
    description: '7英寸OLED屏幕，64GB存储'
  }
];

// 导出商品分类列表数组
export const categories = ['全部', '手机', '电脑', '平板', '耳机', '手表', '家电', '游戏'];
