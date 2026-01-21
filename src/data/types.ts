// 定义商品接口，用于描述商品的数据结构
export interface Product {
  // 商品唯一标识符
  id: number;
  // 商品名称
  name: string;
  // 商品价格
  price: number;
  // 商品分类
  category: string;
  // 商品销量
  sales: number;
  // 商品图片 URL
  image: string;
  // 商品描述
  description: string;
}

// 定义筛选状态接口，用于描述商品筛选条件
export interface FilterState {
  // 价格区间，包含最小值和最大值
  priceRange: [number, number];
  // 商品分类
  category: string;
  // 排序方式，可以是按销量、价格升序或价格降序
  sortBy: 'sales' | 'price_asc' | 'price_desc';
}

// 定义购物车商品项接口，用于描述购物车中的商品
export interface CartItem {
  // 商品信息
  product: Product;
  // 商品数量
  quantity: number;
}
