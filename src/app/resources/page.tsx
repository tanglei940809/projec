'use client';

import { useState } from 'react';
import { 
  Database, 
  Plus, 
  Search, 
  Filter,
  Store,
  Building2,
  Download,
  MapPin,
  Phone,
  Globe,
  CheckCircle,
  AlertCircle,
  Clock,
  LayoutGrid,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// 商户数据
const merchantsData = [
  {
    id: 'M-001',
    name: '中石油四川直营店',
    code: 'PETRO-SICHUAN-001',
    category: '加油服务',
    region: '成都市',
    address: '成都市高新区天府大道',
    contact: '张经理 138****5678',
    status: 'active',
    campaigns: ['中石油加油满200减40'],
    transactions: 15234,
    settlementAmount: 612450,
    contractPeriod: '2026-01-01 ~ 2026-12-31'
  },
  {
    id: 'M-002',
    name: '瑞幸咖啡四川区域',
    code: 'LUCKIN-SICHUAN-001',
    category: '餐饮茶饮',
    region: '成都市',
    address: '成都市春熙路商圈',
    contact: '李经理 139****8765',
    status: 'active',
    campaigns: ['瑞幸咖啡随机立减'],
    transactions: 12890,
    settlementAmount: 389670,
    contractPeriod: '2026-01-01 ~ 2026-06-30'
  },
  {
    id: 'M-003',
    name: '7-11便利店四川',
    code: '7ELEVEN-SICHUAN-001',
    category: '连锁零售',
    region: '绵阳市',
    address: '绵阳市涪城区',
    contact: '王经理 137****2345',
    status: 'active',
    campaigns: ['盒马鲜生满减券'],
    transactions: 9876,
    settlementAmount: 245890,
    contractPeriod: '2026-01-01 ~ 2026-12-31'
  },
  {
    id: 'M-004',
    name: '盒马鲜生四川',
    code: 'HEMA-SICHUAN-001',
    category: '电商平台',
    region: '成都市',
    address: '成都市武侯区',
    contact: '赵经理 136****3456',
    status: 'active',
    campaigns: ['盒马鲜生满减券'],
    transactions: 7234,
    settlementAmount: 198450,
    contractPeriod: '2026-01-01 ~ 2026-03-31'
  },
  {
    id: 'M-005',
    name: '滴滴出行四川',
    code: 'DIDI-SICHUAN-001',
    category: '生活服务',
    region: '成都市',
    address: '线上服务',
    contact: '在线客服',
    status: 'pending',
    campaigns: ['新客办卡立减金'],
    transactions: 6521,
    settlementAmount: 185670,
    contractPeriod: '2026-02-01 ~ 2026-02-28'
  },
];

// 供应商数据
const suppliersData = [
  {
    id: 'S-001',
    name: '中国石油四川分公司',
    type: '直营',
    level: '战略合作伙伴',
    contact: '李总 138****0001',
    email: 'contact@sinopec-sc.com',
    status: 'active',
    merchants: 125,
    rating: 4.8,
    cooperationYears: 5,
    description: '全国性石油公司，四川地区独家合作'
  },
  {
    id: 'S-002',
    name: '瑞幸咖啡中国',
    type: '连锁品牌',
    level: '核心合作伙伴',
    contact: '王总 139****0002',
    email: 'partner@luckincoffee.com',
    status: 'active',
    merchants: 85,
    rating: 4.6,
    cooperationYears: 3,
    description: '国内领先咖啡连锁品牌'
  },
  {
    id: 'S-003',
    name: '全家便利中国',
    type: '连锁品牌',
    level: '重要合作伙伴',
    contact: '张总 137****0003',
    email: 'partner@familymart.com.cn',
    status: 'active',
    merchants: 62,
    rating: 4.5,
    cooperationYears: 4,
    description: '国际知名便利店品牌'
  },
  {
    id: 'S-004',
    name: '国家电网四川',
    type: '国企',
    level: '战略合作伙伴',
    contact: '赵总 136****0004',
    email: 'contact@sgcc-sc.com',
    status: 'active',
    merchants: 45,
    rating: 4.9,
    cooperationYears: 6,
    description: '新能源汽车充电服务提供商'
  },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('merchants');
  const [searchQuery, setSearchQuery] = useState('');
  const [productViewMode, setProductViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // 生成大量产品数据（模拟几百条）
  const generateProducts = () => {
    const products = [];
    const productTypes = [
      { type: '景区门票', color: 'bg-blue-600', image: '🏔️', basePrice: 80 },
      { type: '酒店住宿', color: 'bg-blue-700', image: '🏨', basePrice: 588 },
      { type: '各类卡券', color: 'bg-blue-500', image: '🎫', basePrice: 25 },
      { type: '实物商品', color: 'bg-indigo-600', image: '🎁', basePrice: 128 },
      { type: '各类服务', color: 'bg-sky-600', image: '🚗', basePrice: 88 },
    ];

    const productNames = {
      '景区门票': ['青城山景区', '都江堰景区', '峨眉山景区', '乐山大佛', '九寨沟', '黄龙景区', '海螺沟', '四姑娘山', '西岭雪山', '瓦屋山'],
      '酒店住宿': ['豪华套房', '商务套房', '标准大床房', '标准双床房', '豪华单人间', '总统套房', '行政套房', '精品房', '主题房', '亲子房'],
      '各类卡券': ['代金券', '满减券', '折扣券', '立减券', '免单券', '礼品券', '储值卡', '会员卡', '积分券', '兑换券'],
      '实物商品': ['品牌保温杯', '精美礼品', '定制水杯', '充电宝', '蓝牙耳机', '智能手环', '笔记本', '钢笔', '茶叶礼盒', '酒水礼盒'],
      '各类服务': ['汽车精洗', '汽车保养', '美容美发', '家政服务', '搬家服务', '维修服务', '保洁服务', '摄影服务', '健身服务', '体检服务'],
    };

    for (let i = 1; i <= 200; i++) {
      const typeInfo = productTypes[(i - 1) % productTypes.length];
      const names = productNames[typeInfo.type as keyof typeof productNames];
      const name = names[Math.floor(Math.random() * names.length)];
      const price = typeInfo.basePrice + Math.floor(Math.random() * 50);
      
      products.push({
        id: `PROD-${String(i).padStart(3, '0')}`,
        name: `${name} ${i}`,
        type: typeInfo.type,
        color: typeInfo.color,
        image: typeInfo.image,
        price: `¥${price}`,
        stock: Math.floor(Math.random() * 10000) + 100,
        status: Math.random() > 0.2 ? '已上架' : '已下架',
      });
    }
    return products;
  };

  const allProducts = generateProducts();
  const totalPages = Math.ceil(allProducts.length / pageSize);
  const currentProducts = allProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">权益资源</h1>
          <p className="text-sm text-gray-500 mt-1">管理商户和权益供应商资源</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            下载列表
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            新增资源
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">合作商户</p>
                <p className="text-2xl font-bold text-gray-900">{merchantsData.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">权益供应商</p>
                <p className="text-2xl font-bold text-blue-600">{suppliersData.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">本月交易</p>
                <p className="text-2xl font-bold text-blue-700">
                  {merchantsData.reduce((sum, m) => sum + m.transactions, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">待审核</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {merchantsData.filter(m => m.status === 'pending').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="merchants">商户管理</TabsTrigger>
          <TabsTrigger value="suppliers">权益供应商</TabsTrigger>
          <TabsTrigger value="products">产品库</TabsTrigger>
          <TabsTrigger value="contract">合同管理</TabsTrigger>
        </TabsList>

        {/* 商户管理 */}
        <TabsContent value="merchants" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4 flex-wrap mb-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="搜索商户名称、编码..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="商户类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类别</SelectItem>
                    <SelectItem value="fuel">加油服务</SelectItem>
                    <SelectItem value="food">餐饮茶饮</SelectItem>
                    <SelectItem value="retail">连锁零售</SelectItem>
                    <SelectItem value="ecommerce">电商平台</SelectItem>
                    <SelectItem value="service">生活服务</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="active">合作中</SelectItem>
                    <SelectItem value="pending">待审核</SelectItem>
                    <SelectItem value="inactive">已终止</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  高级筛选
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商户信息</TableHead>
                  <TableHead>商户编码</TableHead>
                  <TableHead>类别</TableHead>
                  <TableHead>地区</TableHead>
                  <TableHead>活动</TableHead>
                  <TableHead>交易数据</TableHead>
                  <TableHead>结算金额</TableHead>
                  <TableHead>合同期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {merchantsData.map((merchant) => (
                  <TableRow key={merchant.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-sm">{merchant.name}</p>
                        <p className="text-xs text-gray-500">{merchant.contact}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{merchant.code}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{merchant.category}</Badge>
                    </TableCell>
                    <TableCell>{merchant.region}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {merchant.campaigns.map((campaign) => (
                          <p key={campaign} className="text-xs text-blue-600">{campaign}</p>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{merchant.transactions.toLocaleString()} 笔</TableCell>
                    <TableCell className="font-semibold">¥{merchant.settlementAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-xs">{merchant.contractPeriod}</TableCell>
                    <TableCell>
                      <Badge variant={merchant.status === 'active' ? 'default' : merchant.status === 'pending' ? 'secondary' : 'destructive'}>
                        {merchant.status === 'active' ? '合作中' : merchant.status === 'pending' ? '待审核' : '已终止'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Filter className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>编辑信息</DropdownMenuItem>
                          <DropdownMenuItem>查看活动</DropdownMenuItem>
                          <DropdownMenuItem>结算管理</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">终止合作</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* 权益供应商 */}
        <TabsContent value="suppliers" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliersData.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{supplier.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{supplier.id}</CardDescription>
                    </div>
                    <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                      {supplier.status === 'active' ? '合作中' : '已终止'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{supplier.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">合作等级</span>
                      <Badge variant="outline">{supplier.level}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">商户数量</span>
                      <span className="font-semibold">{supplier.merchants} 家</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">合作年限</span>
                      <span className="font-semibold">{supplier.cooperationYears} 年</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">评分</span>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-yellow-600">{supplier.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Phone className="w-3 h-3" />
                        {supplier.contact}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Globe className="w-3 h-3" />
                        {supplier.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      查看商户
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Filter className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>编辑信息</DropdownMenuItem>
                        <DropdownMenuItem>查看合同</DropdownMenuItem>
                        <DropdownMenuItem>联系记录</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">终止合作</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              新增供应商
            </Button>
          </div>
        </TabsContent>

        {/* 合同管理 */}
        <TabsContent value="contract" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>合同管理</CardTitle>
              <CardDescription>管理与商户和供应商的合作合同</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 'C-001', merchant: '中石油四川直营店', type: '服务合同', status: 'active', startDate: '2026-01-01', endDate: '2026-12-31', amount: 5000000 },
                  { id: 'C-002', merchant: '瑞幸咖啡四川', type: '合作协议', status: 'active', startDate: '2026-01-01', endDate: '2026-06-30', amount: 2000000 },
                  { id: 'C-003', merchant: '国家电网四川', type: '框架协议', status: 'active', startDate: '2026-01-01', endDate: '2026-12-31', amount: 3000000 },
                ].map((contract) => (
                  <div key={contract.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-sm">{contract.merchant}</h3>
                        <Badge variant="outline">{contract.type}</Badge>
                        <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                          {contract.status === 'active' ? '生效中' : '已终止'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>合同编号: {contract.id}</span>
                        <span>有效期: {contract.startDate} ~ {contract.endDate}</span>
                        <span>金额: ¥{contract.amount.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        查看合同
                      </Button>
                      <Button variant="outline" size="sm">
                        续签
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 产品库 */}
        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>产品库管理</CardTitle>
                  <CardDescription>管理各类权益产品：景区、酒店、卡券、实物、服务等</CardDescription>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  添加产品
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 产品类型筛选 */}
                <div className="flex items-center gap-4 flex-wrap">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="全部类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部类型</SelectItem>
                      <SelectItem value="scenic">景区门票</SelectItem>
                      <SelectItem value="hotel">酒店住宿</SelectItem>
                      <SelectItem value="coupon">各类卡券</SelectItem>
                      <SelectItem value="physical">实物商品</SelectItem>
                      <SelectItem value="service">各类服务</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="全部状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      <SelectItem value="active">已上架</SelectItem>
                      <SelectItem value="inactive">已下架</SelectItem>
                      <SelectItem value="draft">草稿</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={productViewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setProductViewMode('grid')}
                      className={productViewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={productViewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setProductViewMode('list')}
                      className={productViewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* 产品列表 */}
                {productViewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* 景区门票 */}
                  <Card className="hover:shadow-lg transition-all">
                    <div className="relative">
                      <img 
                        src="https://via.placeholder.com/400x200?text=青城山景区" 
                        alt="景区门票"
                        className="w-full h-36 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-blue-600">景区门票</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">青城山景区门票</h3>
                        <Badge variant="outline">已上架</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">包含门票、观光车，当日有效</p>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-blue-600">¥80</p>
                        <p className="text-xs text-gray-500">库存5000</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          下架
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 酒店住宿 */}
                  <Card className="hover:shadow-lg transition-all">
                    <div className="relative">
                      <img 
                        src="https://via.placeholder.com/400x200?text=星级酒店" 
                        alt="酒店住宿"
                        className="w-full h-36 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-blue-700">酒店住宿</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">五星级豪华套房</h3>
                        <Badge variant="outline">已上架</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">含早餐、免费WiFi，舒适体验</p>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-blue-600">¥588</p>
                        <p className="text-xs text-gray-500">库存100</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          下架
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 卡券 */}
                  <Card className="hover:shadow-lg transition-all">
                    <div className="relative">
                      <img 
                        src="https://via.placeholder.com/400x200?text=咖啡代金券" 
                        alt="卡券"
                        className="w-full h-36 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-blue-500">各类卡券</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">瑞幸咖啡50元代金券</h3>
                        <Badge variant="outline">已上架</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">满50可用，全国通用</p>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-blue-600">¥25</p>
                        <p className="text-xs text-gray-500">库存10000</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          下架
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 实物商品 */}
                  <Card className="hover:shadow-lg transition-all">
                    <div className="relative">
                      <img 
                        src="https://via.placeholder.com/400x200?text=精美礼品" 
                        alt="实物商品"
                        className="w-full h-36 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-indigo-600">实物商品</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">品牌保温杯</h3>
                        <Badge variant="outline">已上架</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">304不锈钢，保冷保热24小时</p>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-blue-600">¥128</p>
                        <p className="text-xs text-gray-500">库存500</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          下架
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 服务产品 */}
                  <Card className="hover:shadow-lg transition-all">
                    <div className="relative">
                      <img 
                        src="https://via.placeholder.com/400x200?text=汽车保养" 
                        alt="服务产品"
                        className="w-full h-36 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-sky-600">各类服务</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">汽车精洗服务</h3>
                        <Badge variant="outline">已上架</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">内外清洗+打蜡+内饰护理</p>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-blue-600">¥88</p>
                        <p className="text-xs text-gray-500">无限制</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          下架
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 京东E卡 */}
                  <Card className="hover:shadow-lg transition-all">
                    <div className="relative">
                      <img 
                        src="https://via.placeholder.com/400x200?text=京东E卡" 
                        alt="卡券"
                        className="w-full h-36 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-blue-500">各类卡券</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">京东E卡100元</h3>
                        <Badge variant="outline">已上架</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">京东平台通用，可叠加使用</p>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-green-600">¥100</p>
                        <p className="text-xs text-gray-500">库存2000</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          下架
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                ) : (
                  /* 列表视图 */
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>产品信息</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>价格</TableHead>
                        <TableHead>库存</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: '青城山景区门票', type: '景区门票', price: '¥80', stock: '5000', status: '已上架', image: '🏔️' },
                        { name: '五星级豪华套房', type: '酒店住宿', price: '¥588', stock: '100', status: '已上架', image: '🏨' },
                        { name: '瑞幸咖啡50元代金券', type: '各类卡券', price: '¥25', stock: '10000', status: '已上架', image: '☕' },
                        { name: '品牌保温杯', type: '实物商品', price: '¥128', stock: '500', status: '已上架', image: '🥤' },
                        { name: '汽车精洗服务', type: '各类服务', price: '¥88', stock: '无限制', status: '已上架', image: '🚗' },
                        { name: '京东E卡100元', type: '各类卡券', price: '¥100', stock: '2000', status: '已上架', image: '🎫' },
                      ].map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                {product.image}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{product.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <p className="font-semibold text-green-600">{product.price}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-gray-600">{product.stock}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                              <Button variant="outline" size="sm">
                                编辑
                              </Button>
                              <Button variant="outline" size="sm">
                                下架
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
