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
  Car,
  Smartphone,
  Code,
  Layout,
  Settings,
  Ticket,
  Star,
  Users,
  DollarSign,
  BarChart3,
  Wrench,
  Fuel,
  Droplets,
  Zap
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

// 模拟服务中心数据
const serviceCenters = [
  {
    id: 'SVC-001',
    name: '车管家汽车养护中心',
    location: '成都市高新区天府大道',
    phone: '028-12345678',
    rating: 4.7,
    workingHours: '09:00-18:00',
    status: 'active',
    services: ['保养', '维修', '洗车', '充电'],
    createTime: '2026-01-08'
  },
];

// 模拟保养项目数据
const serviceItems = [
  {
    id: 'SVC-ITEM-001',
    centerId: 'SVC-001',
    name: '标准保养套餐',
    category: '保养',
    price: 398,
    duration: 60,
    stock: 20,
    sold: 1234,
    status: 'active',
    description: '包含机油更换、机滤更换、常规检查',
    image: 'https://via.placeholder.com/200x200?text=标准保养'
  },
  {
    id: 'SVC-ITEM-002',
    centerId: 'SVC-001',
    name: '深度保养套餐',
    category: '保养',
    price: 698,
    duration: 120,
    stock: 10,
    sold: 876,
    status: 'active',
    description: '包含标准保养+空气滤芯+空调滤芯',
    image: 'https://via.placeholder.com/200x200?text=深度保养'
  },
  {
    id: 'SVC-ITEM-003',
    centerId: 'SVC-001',
    name: '精洗服务',
    category: '洗车',
    price: 68,
    duration: 45,
    stock: 50,
    sold: 2345,
    status: 'active',
    description: '精洗+内饰清洁+打蜡',
    image: 'https://via.placeholder.com/200x200?text=精洗服务'
  },
  {
    id: 'SVC-ITEM-004',
    centerId: 'SVC-001',
    name: '充电服务',
    category: '充电',
    price: 1.2,
    unit: '元/度',
    duration: 0,
    stock: 100,
    sold: 5678,
    status: 'active',
    description: '快速充电，支持扫码支付',
    image: 'https://via.placeholder.com/200x200?text=充电服务'
  },
];

// 模拟预订数据
const bookings = [
  {
    id: 'BK-301',
    centerId: 'SVC-001',
    centerName: '车管家汽车养护中心',
    userName: '王五',
    phone: '136****4321',
    carModel: '大众帕萨特',
    carNumber: '川A·12345',
    serviceId: 'SVC-ITEM-001',
    serviceName: '标准保养套餐',
    bookingDate: '2026-01-26',
    bookingTime: '10:00',
    totalPrice: 398,
    status: 'confirmed',
    qrCode: 'BK-301-QR',
    createTime: '2026-01-25 15:30:00',
    notes: '建议更换刹车片'
  },
  {
    id: 'BK-302',
    centerId: 'SVC-001',
    centerName: '车管家汽车养护中心',
    userName: '赵六',
    phone: '137****5432',
    carModel: '丰田凯美瑞',
    carNumber: '川B·67890',
    serviceId: 'SVC-ITEM-004',
    serviceName: '充电服务',
    bookingDate: '2026-01-26',
    bookingTime: '14:00',
    totalPrice: 36,
    status: 'used',
    qrCode: 'BK-302-QR',
    createTime: '2026-01-26 13:00:00',
    notes: ''
  },
];

// 模拟车辆数据
const vehicles = [
  {
    id: 'VEH-001',
    userId: 'U-001',
    userName: '王五',
    carModel: '大众帕萨特',
    carNumber: '川A·12345',
    vin: 'LSV...12345',
    lastServiceDate: '2025-10-15',
    mileage: 85000,
    createTime: '2026-01-01'
  },
];

export default function CarMaintenancePage() {
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
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">车管家汽车养护中心</h1>
                <p className="text-sm text-gray-500 mt-1">系统ID: SYS-004 | 管理员: 管理员D</p>
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
                <p className="text-2xl font-bold text-blue-600">67</p>
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
                <p className="text-2xl font-bold text-blue-700">45</p>
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
                  {Intl.NumberFormat('zh-CN').format(12340)}
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
                <p className="text-sm text-gray-600">服务次数</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {serviceItems.reduce((sum, s) => sum + s.sold, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="services">服务管理</TabsTrigger>
          <TabsTrigger value="bookings">预订管理</TabsTrigger>
          <TabsTrigger value="vehicles">车辆管理</TabsTrigger>
          <TabsTrigger value="h5">H5页面</TabsTrigger>
          <TabsTrigger value="settings">系统设置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* 服务中心基本信息 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>服务中心信息</CardTitle>
                  <CardDescription>车管家汽车养护中心基本信息</CardDescription>
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
                  <p className="text-sm text-gray-500">服务中心名称</p>
                  <p className="font-semibold">{serviceCenters[0]?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">服务中心位置</p>
                  <p className="font-semibold">{serviceCenters[0]?.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">联系电话</p>
                  <p className="font-semibold">{serviceCenters[0]?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">评分</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-yellow-600">{serviceCenters[0]?.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">营业时间</p>
                  <p className="font-semibold">{serviceCenters[0]?.workingHours}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">服务项目</p>
                  <div className="flex gap-2 mt-1">
                    {serviceCenters[0]?.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
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
                  <div className="bg-blue-600 text-white p-4">
                    <div className="flex items-center gap-2">
                      <Car className="w-6 h-6" />
                      <span className="font-semibold">车管家汽车养护</span>
                    </div>
                    <p className="text-xs opacity-90 mt-1">专业养护 · 便捷预约</p>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <img 
                        src="https://via.placeholder.com/400x200?text=服务中心" 
                        alt="服务中心" 
                        className="w-full h-36 object-cover rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">热门服务</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Wrench className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <p className="text-xs font-medium">标准保养</p>
                          <p className="text-sm text-green-600 font-bold">¥398</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Droplets className="w-8 h-8 mx-auto mb-2 text-cyan-600" />
                          <p className="text-xs font-medium">精洗服务</p>
                          <p className="text-sm text-green-600 font-bold">¥68</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      立即预约
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>服务管理</CardTitle>
                  <CardDescription>管理保养、维修、洗车等服务项目</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加服务
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {serviceItems.map((item) => (
                  <Card key={item.id}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-36 object-cover"
                    />
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold text-green-600">
                          {item.unit ? `¥${item.price}/${item.unit}` : `¥${item.price}`}
                        </p>
                        <p className="text-xs text-gray-500">已售{item.sold}</p>
                      </div>
                      {item.duration > 0 && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>耗时约{item.duration}分钟</span>
                        </div>
                      )}
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

        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>预订管理</CardTitle>
                  <CardDescription>查看和管理所有车辆服务预订</CardDescription>
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
                    <TableHead>车主</TableHead>
                    <TableHead>车辆信息</TableHead>
                    <TableHead>服务项目</TableHead>
                    <TableHead>预约时间</TableHead>
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
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.carModel}</p>
                          <p className="text-xs text-gray-500">{booking.carNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.serviceName}</TableCell>
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
                          {booking.status === 'confirmed' ? '已预约' : 
                           booking.status === 'used' ? '已完成' : '已取消'}
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

        <TabsContent value="vehicles" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>车辆管理</CardTitle>
                  <CardDescription>管理车主车辆信息</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加车辆
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>车主</TableHead>
                    <TableHead>车型</TableHead>
                    <TableHead>车牌号</TableHead>
                    <TableHead>上次保养日期</TableHead>
                    <TableHead>里程数</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.userName}</TableCell>
                      <TableCell>{vehicle.carModel}</TableCell>
                      <TableCell className="font-mono">{vehicle.carNumber}</TableCell>
                      <TableCell>{vehicle.lastServiceDate}</TableCell>
                      <TableCell>{vehicle.mileage.toLocaleString()}km</TableCell>
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
                              编辑信息
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除车辆
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

        <TabsContent value="h5" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>H5页面配置</CardTitle>
                <CardDescription>配置用户端H5预约页面</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>页面标题</Label>
                  <Input defaultValue="车管家汽车养护" />
                </div>
                <div className="space-y-2">
                  <Label>页面描述</Label>
                  <Textarea 
                    defaultValue="专业汽车养护，便捷预约"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>主题颜色</Label>
                  <Select defaultValue="blue">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">蓝色</SelectItem>
                      <SelectItem value="red">红色</SelectItem>
                      <SelectItem value="green">绿色</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>页面功能</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">服务中心介绍</p>
                        <p className="text-xs text-gray-500">显示服务中心详细信息</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">服务项目展示</p>
                        <p className="text-xs text-gray-500">展示保养、维修等服务</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">车辆信息</p>
                        <p className="text-xs text-gray-500">录入和管理车辆信息</p>
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
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">到店提醒</p>
                        <p className="text-xs text-gray-500">预约前发送到店提醒</p>
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
                      <div className="bg-blue-600 text-white p-3">
                        <p className="font-semibold text-sm">车管家汽车养护</p>
                      </div>
                      <div className="p-3">
                        <img 
                          src="https://via.placeholder.com/300x150?text=服务中心" 
                          alt="服务中心" 
                          className="w-full h-28 object-cover rounded-lg mb-3"
                        />
                        <div className="mb-3">
                          <h3 className="font-semibold text-sm mb-2">热门服务</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <Wrench className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                              <p className="text-xs font-medium">标准保养</p>
                              <p className="text-xs text-green-600">¥398</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <Droplets className="w-6 h-6 mx-auto mb-1 text-cyan-600" />
                              <p className="text-xs font-medium">精洗服务</p>
                              <p className="text-xs text-green-600">¥68</p>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 text-xs py-2">
                          预约
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
              <CardDescription>配置汽车保养系统参数</CardDescription>
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
                      <Label>最晚预约时间(小时)</Label>
                      <Input type="number" defaultValue="2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">需要实名认证</p>
                      <p className="text-xs text-gray-500">预约时需要验证身份证</p>
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
                    <Input type="number" defaultValue="4" />
                    <p className="text-xs text-gray-500">预约前多少小时内可免费取消</p>
                  </div>
                  <div className="space-y-2">
                    <Label>取消手续费(%)</Label>
                    <Input type="number" defaultValue="10" />
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
