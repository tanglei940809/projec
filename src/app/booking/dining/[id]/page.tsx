'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2,
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  QrCode,
  Coffee,
  Smartphone,
  Code,
  Layout,
  Settings,
  Ticket,
  Star,
  Users,
  DollarSign,
  BarChart3,
  Utensils,
  Clock as ClockIcon,
  ChefHat
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

// 模拟餐厅数据
const restaurants = [
  {
    id: 'RES-001',
    name: '川味轩餐厅',
    location: '成都市锦江区春熙路',
    cuisine: '川菜',
    rating: 4.8,
    seats: 120,
    avgPrice: 88,
    status: 'active',
    features: ['包间', 'WiFi', '停车'],
    createTime: '2026-01-05'
  },
];

// 模拟菜品数据
const dishes = [
  {
    id: 'DISH-001',
    restaurantId: 'RES-001',
    name: '水煮鱼',
    category: '热菜',
    price: 68,
    stock: 100,
    sold: 3456,
    status: 'active',
    image: 'https://via.placeholder.com/200x200?text=水煮鱼',
    description: '麻辣鲜香，鱼肉嫩滑'
  },
  {
    id: 'DISH-002',
    restaurantId: 'RES-001',
    name: '宫保鸡丁',
    category: '热菜',
    price: 38,
    stock: 150,
    sold: 5678,
    status: 'active',
    image: 'https://via.placeholder.com/200x200?text=宫保鸡丁',
    description: '酸甜微辣，鸡肉鲜嫩'
  },
  {
    id: 'DISH-003',
    name: '夫妻肺片',
    category: '凉菜',
    price: 28,
    stock: 200,
    sold: 2345,
    status: 'active',
    image: 'https://via.placeholder.com/200x200?text=夫妻肺片',
    description: '麻辣爽口，下酒好菜'
  },
  {
    id: 'DISH-004',
    name: '四人套餐A',
    category: '套餐',
    price: 298,
    stock: 50,
    sold: 1234,
    status: 'active',
    image: 'https://via.placeholder.com/200x200?text=四人套餐',
    description: '含4荤2素1汤',
  },
];

// 模拟预订数据
const bookings = [
  {
    id: 'BK-201',
    restaurantId: 'RES-001',
    restaurantName: '川味轩餐厅',
    userName: '张三',
    phone: '138****5678',
    guests: 4,
    tableNumber: 'A05',
    bookingDate: '2026-01-26',
    bookingTime: '18:00',
    totalPrice: 356,
    status: 'confirmed',
    qrCode: 'BK-201-QR',
    createTime: '2026-01-25 14:30:00',
    notes: '靠窗位置'
  },
  {
    id: 'BK-202',
    restaurantId: 'RES-001',
    restaurantName: '川味轩餐厅',
    userName: '李四',
    phone: '139****8765',
    guests: 2,
    tableNumber: 'B03',
    bookingDate: '2026-01-26',
    bookingTime: '19:30',
    totalPrice: 128,
    status: 'used',
    qrCode: 'BK-202-QR',
    createTime: '2026-01-25 16:15:00',
    notes: ''
  },
];

// 模拟桌位数据
const tables = [
  {
    id: 'TBL-001',
    restaurantId: 'RES-001',
    number: 'A01',
    type: '大厅',
    seats: 2,
    status: 'available'
  },
  {
    id: 'TBL-002',
    restaurantId: 'RES-001',
    number: 'A05',
    type: '大厅',
    seats: 4,
    status: 'booked'
  },
  {
    id: 'TBL-003',
    restaurantId: 'RES-001',
    number: 'VIP-01',
    type: '包间',
    seats: 8,
    status: 'available'
  },
];

export default function DiningBookingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Utensils className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">川味轩餐厅预订系统</h1>
                <p className="text-sm text-gray-500 mt-1">系统ID: SYS-003 | 管理员: 管理员C</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Smartphone className="w-4 h-4 mr-2" />
            H5页面
          </Button>
          <Button variant="outline" size="sm">
            <Code className="w-4 h-4 mr-2" />
            编辑模板
          </Button>
          <Button variant="outline" size="sm">
            <QrCode className="w-4 h-4 mr-2" />
            生成二维码
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日预订</p>
                <p className="text-2xl font-bold text-blue-600">45</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日核销</p>
                <p className="text-2xl font-bold text-blue-700">32</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日收入</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Intl.NumberFormat('zh-CN').format(8900)}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">菜品销量</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {dishes.reduce((sum, d) => sum + d.sold, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="dishes">菜品管理</TabsTrigger>
          <TabsTrigger value="tables">桌位管理</TabsTrigger>
          <TabsTrigger value="bookings">预订管理</TabsTrigger>
          <TabsTrigger value="h5">H5页面</TabsTrigger>
          <TabsTrigger value="settings">系统设置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* 餐厅基本信息 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>餐厅信息</CardTitle>
                  <CardDescription>川味轩餐厅基本信息</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  编辑信息
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">餐厅名称</p>
                  <p className="font-semibold">{restaurants[0]?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">餐厅位置</p>
                  <p className="font-semibold">{restaurants[0]?.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">菜系类型</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{restaurants[0]?.cuisine}</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">评分</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-yellow-600">{restaurants[0]?.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">座位数</p>
                  <p className="font-semibold">{restaurants[0]?.seats}个</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">人均消费</p>
                  <p className="font-semibold text-green-600">{restaurants[0]?.avgPrice}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">餐厅特色</p>
                <div className="flex gap-2">
                  {restaurants[0]?.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* H5页面预览 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>H5页面预览</CardTitle>
                  <CardDescription>用户端预订页面展示</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  查看完整页面
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-yellow-500 text-white p-4">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-6 h-6" />
                      <span className="font-semibold">川味轩餐厅</span>
                    </div>
                    <p className="text-xs opacity-90 mt-1">正宗川菜 | 人均¥88</p>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <img 
                        src="https://via.placeholder.com/400x200?text=餐厅环境" 
                        alt="餐厅" 
                        className="w-full h-36 object-cover rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">推荐菜品</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <img 
                            src={dishes[0]?.image} 
                            alt={dishes[0]?.name}
                            className="w-full h-16 object-cover rounded mb-1"
                          />
                          <p className="text-xs font-medium">{dishes[0]?.name}</p>
                          <p className="text-xs text-green-600">{dishes[0]?.price}</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <img 
                            src={dishes[1]?.image} 
                            alt={dishes[1]?.name}
                            className="w-full h-16 object-cover rounded mb-1"
                          />
                          <p className="text-xs font-medium">{dishes[1]?.name}</p>
                          <p className="text-xs text-green-600">{dishes[1]?.price}</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                      立即预订
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dishes" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>菜品管理</CardTitle>
                  <CardDescription>管理餐厅菜品和套餐</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加菜品
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dishes.map((dish) => (
                  <Card key={dish.id}>
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-36 object-cover"
                    />
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{dish.name}</h3>
                        <Badge variant="outline" className="text-xs">{dish.category}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{dish.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-green-600">{dish.price}</p>
                        <p className="text-xs text-gray-500">已售{dish.sold}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          详情
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>桌位管理</CardTitle>
                  <CardDescription>管理餐厅桌位和状态</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加桌位
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>桌位号</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>座位数</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map((table) => (
                    <TableRow key={table.id}>
                      <TableCell className="font-semibold">{table.number}</TableCell>
                      <TableCell>{table.type}</TableCell>
                      <TableCell>{table.seats}人</TableCell>
                      <TableCell>
                        <Badge variant={table.status === 'available' ? 'default' : 'secondary'}>
                          {table.status === 'available' ? '可用' : '已预订'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              查看详情
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              编辑桌位
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除桌位
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>预订管理</CardTitle>
                  <CardDescription>查看和管理所有餐厅预订</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    导出订单
                  </Button>
                  <Button size="sm">
                    <QrCode className="w-4 h-4 mr-2" />
                    扫码核销
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>订单号</TableHead>
                    <TableHead>预订人</TableHead>
                    <TableHead>人数</TableHead>
                    <TableHead>桌位</TableHead>
                    <TableHead>预订时间</TableHead>
                    <TableHead>总价</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono">{booking.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.userName}</p>
                          <p className="text-xs text-gray-500">{booking.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.guests}人</TableCell>
                      <TableCell className="font-semibold">{booking.tableNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p>{booking.bookingDate}</p>
                          <p className="text-xs text-gray-500">{booking.bookingTime}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">{booking.totalPrice}</TableCell>
                      <TableCell>
                        <Badge variant={
                          booking.status === 'confirmed' ? 'default' : 
                          booking.status === 'used' ? 'outline' : 'secondary'
                        }>
                          {booking.status === 'confirmed' ? '已预订' : 
                           booking.status === 'used' ? '已用餐' : '已取消'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <QrCode className="w-4 h-4" />
                          </Button>
                          {booking.status === 'confirmed' && (
                            <Button variant="outline" size="sm" className="text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              核销
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="h5" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>H5页面配置</CardTitle>
                <CardDescription>配置用户端H5预订页面</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>页面标题</Label>
                  <Input defaultValue="川味轩餐厅预订" />
                </div>
                <div className="space-y-2">
                  <Label>页面描述</Label>
                  <Textarea 
                    defaultValue="正宗川菜，美味预订"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>主题颜色</Label>
                  <Select defaultValue="yellow">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yellow">黄色</SelectItem>
                      <SelectItem value="red">红色</SelectItem>
                      <SelectItem value="orange">橙色</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>页面功能</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">餐厅介绍</p>
                        <p className="text-xs text-gray-500">显示餐厅详细信息</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">菜品展示</p>
                        <p className="text-xs text-gray-500">展示菜品图片和价格</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">桌位选择</p>
                        <p className="text-xs text-gray-500">选择桌位和用餐时间</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">在线支付</p>
                        <p className="text-xs text-gray-500">支持微信、支付宝支付</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">保存配置</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>H5页面预览</CardTitle>
                <CardDescription>实时预览H5页面效果</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-sm mx-auto">
                  <div className="border-4 border-gray-800 rounded-3xl p-2 bg-gray-100">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                      <div className="bg-yellow-500 text-white p-3">
                        <p className="font-semibold text-sm">川味轩餐厅</p>
                      </div>
                      <div className="p-3">
                        <img 
                          src="https://via.placeholder.com/300x150?text=餐厅环境" 
                          alt="餐厅" 
                          className="w-full h-28 object-cover rounded-lg mb-3"
                        />
                        <div className="mb-3">
                          <h3 className="font-semibold text-sm mb-2">推荐菜品</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <img 
                                src={dishes[0]?.image} 
                                alt={dishes[0]?.name}
                                className="w-full h-12 object-cover rounded mb-1"
                              />
                              <p className="text-xs font-medium">{dishes[0]?.name}</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <img 
                                src={dishes[1]?.image} 
                                alt={dishes[1]?.name}
                                className="w-full h-12 object-cover rounded mb-1"
                              />
                              <p className="text-xs font-medium">{dishes[1]?.name}</p>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-yellow-500 text-xs py-2">
                          预订
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>系统设置</CardTitle>
              <CardDescription>配置美食预订系统参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>基础设置</Label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>提前预订天数</Label>
                      <Input type="number" defaultValue="7" />
                    </div>
                    <div className="space-y-2">
                      <Label>最晚预订时间(小时)</Label>
                      <Input type="number" defaultValue="2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">需要手机验证</p>
                      <p className="text-xs text-gray-500">预订时需要验证手机号</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">二维码核销</p>
                      <p className="text-xs text-gray-500">使用二维码扫码核销订单</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>退款设置</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>免费取消时长(小时)</Label>
                    <Input type="number" defaultValue="2" />
                    <p className="text-xs text-gray-500">预订前多少小时内可免费取消</p>
                  </div>
                  <div className="space-y-2">
                    <Label>取消手续费(%)</Label>
                    <Input type="number" defaultValue="0" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">保存设置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
