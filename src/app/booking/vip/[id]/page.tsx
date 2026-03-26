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
  Building,
  Smartphone,
  Code,
  Layout,
  Settings,
  Ticket,
  Star,
  Users,
  DollarSign,
  BarChart3,
  Armchair,
  Coffee as CoffeeIcon,
  Wifi,
  Tv
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

// 模拟贵宾厅数据
const vipLounges = [
  {
    id: 'VIP-001',
    name: '天府机场贵宾厅',
    location: '成都天府国际机场T2航站楼',
    phone: '028-88888888',
    rating: 4.9,
    totalSeats: 50,
    avgPrice: 298,
    status: 'active',
    facilities: ['WiFi', '茶歇', '电视', '按摩椅', '会议室'],
    createTime: '2026-01-12'
  },
];

// 模拟时段数据
const timeSlots = [
  {
    id: 'TS-001',
    loungeId: 'VIP-001',
    time: '08:00-12:00',
    price: 198,
    maxCapacity: 50,
    currentBooked: 15,
    status: 'available'
  },
  {
    id: 'TS-002',
    loungeId: 'VIP-001',
    time: '12:00-16:00',
    price: 298,
    maxCapacity: 50,
    currentBooked: 35,
    status: 'available'
  },
  {
    id: 'TS-003',
    loungeId: 'VIP-001',
    time: '16:00-20:00',
    price: 298,
    maxCapacity: 50,
    currentBooked: 48,
    status: 'busy'
  },
];

// 模拟服务项目数据
const services = [
  {
    id: 'SVC-001',
    loungeId: 'VIP-001',
    name: '基础服务',
    price: 0,
    description: '包含茶水、小食、WiFi',
    included: true
  },
  {
    id: 'SVC-002',
    loungeId: 'VIP-001',
    name: '精致早餐',
    price: 58,
    description: '中式或西式早餐套餐',
    included: false
  },
  {
    id: 'SVC-003',
    loungeId: 'VIP-001',
    name: '按摩服务',
    price: 128,
    description: '30分钟全身按摩',
    included: false
  },
];

// 模拟预订数据
const bookings = [
  {
    id: 'BK-401',
    loungeId: 'VIP-001',
    loungeName: '天府机场贵宾厅',
    userName: '张三',
    phone: '138****5678',
    guests: 3,
    slotId: 'TS-001',
    slotTime: '08:00-12:00',
    bookingDate: '2026-01-26',
    totalPrice: 594,
    status: 'confirmed',
    qrCode: 'BK-401-QR',
    createTime: '2026-01-25 16:30:00',
    notes: '需要早餐服务'
  },
  {
    id: 'BK-402',
    loungeId: 'VIP-001',
    loungeName: '天府机场贵宾厅',
    userName: '李四',
    phone: '139****8765',
    guests: 1,
    slotId: 'TS-002',
    slotTime: '12:00-16:00',
    bookingDate: '2026-01-26',
    totalPrice: 298,
    status: 'used',
    qrCode: 'BK-402-QR',
    createTime: '2026-01-26 12:05:00',
    notes: ''
  },
];

export default function VipLoungePage() {
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
                <Armchair className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">天府机场贵宾厅</h1>
                <p className="text-sm text-gray-500 mt-1">系统ID: SYS-005 | 管理员: 管理员E</p>
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
                <p className="text-2xl font-bold text-blue-600">23</p>
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
                <p className="text-2xl font-bold text-blue-700">18</p>
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
                  {Intl.NumberFormat('zh-CN').format(5670)}
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
                <p className="text-sm text-gray-600">总席位</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {vipLounges[0]?.totalSeats}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="slots">时段管理</TabsTrigger>
          <TabsTrigger value="services">服务配置</TabsTrigger>
          <TabsTrigger value="bookings">预订管理</TabsTrigger>
          <TabsTrigger value="h5">H5页面</TabsTrigger>
          <TabsTrigger value="settings">系统设置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* 贵宾厅基本信息 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>贵宾厅信息</CardTitle>
                  <CardDescription>天府机场贵宾厅基本信息</CardDescription>
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
                  <p className="text-sm text-gray-500">贵宾厅名称</p>
                  <p className="font-semibold">{vipLounges[0]?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">贵宾厅位置</p>
                  <p className="font-semibold">{vipLounges[0]?.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">联系电话</p>
                  <p className="font-semibold">{vipLounges[0]?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">评分</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-yellow-600">{vipLounges[0]?.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">席位数量</p>
                  <p className="font-semibold">{vipLounges[0]?.totalSeats}席</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">人均消费</p>
                  <p className="font-semibold text-green-600">{vipLounges[0]?.avgPrice}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">配套设施</p>
                <div className="flex gap-2 flex-wrap">
                  {vipLounges[0]?.facilities.map((facility) => (
                    <Badge key={facility} variant="outline" className="text-xs">
                      {facility}
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
                  <div className="bg-purple-600 text-white p-4">
                    <div className="flex items-center gap-2">
                      <Armchair className="w-6 h-6" />
                      <span className="font-semibold">天府机场贵宾厅</span>
                    </div>
                    <p className="text-xs opacity-90 mt-1">尊贵体验 · 舒适候机</p>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <img 
                        src="https://via.placeholder.com/400x200?text=贵宾厅环境" 
                        alt="贵宾厅" 
                        className="w-full h-36 object-cover rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">时段选择</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium">08:00-12:00</p>
                            <p className="text-xs text-gray-500">余位35席</p>
                          </div>
                          <p className="text-sm text-green-600 font-bold">¥198</p>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium">12:00-16:00</p>
                            <p className="text-xs text-gray-500">余位15席</p>
                          </div>
                          <p className="text-sm text-green-600 font-bold">¥298</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      立即预订
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="slots" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>时段管理</CardTitle>
                  <CardDescription>管理贵宾厅时段和价格</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加时段
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>时段</TableHead>
                    <TableHead>价格</TableHead>
                    <TableHead>容量</TableHead>
                    <TableHead>已预订</TableHead>
                    <TableHead>余位</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeSlots.map((slot) => (
                    <TableRow key={slot.id}>
                      <TableCell className="font-semibold">{slot.time}</TableCell>
                      <TableCell className="font-semibold text-green-600">{slot.price}</TableCell>
                      <TableCell>{slot.maxCapacity}席</TableCell>
                      <TableCell>{slot.currentBooked}席</TableCell>
                      <TableCell className="font-semibold">
                        {slot.maxCapacity - slot.currentBooked}席
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          slot.status === 'available' ? 'default' : 'secondary'
                        }>
                          {slot.status === 'available' ? '可预订' : '紧张'}
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
                              编辑时段
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除时段
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

        <TabsContent value="services" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>服务配置</CardTitle>
                  <CardDescription>管理贵宾厅服务项目和价格</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加服务
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CoffeeIcon className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{service.name}</h3>
                              {service.included && (
                                <Badge variant="outline" className="text-xs">免费</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            {service.price === 0 ? '免费' : `¥${service.price}`}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3 mr-1" />
                              编辑
                            </Button>
                          </div>
                        </div>
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
                  <CardDescription>查看和管理所有贵宾厅预订</CardDescription>
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
                    <TableHead>时段</TableHead>
                    <TableHead>预订日期</TableHead>
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
                      <TableCell className="font-semibold">{booking.slotTime}</TableCell>
                      <TableCell>{booking.bookingDate}</TableCell>
                      <TableCell className="font-semibold text-green-600">{booking.totalPrice}</TableCell>
                      <TableCell>
                        <Badge variant={
                          booking.status === 'confirmed' ? 'default' : 
                          booking.status === 'used' ? 'outline' : 'secondary'
                        }>
                          {booking.status === 'confirmed' ? '已预订' : 
                           booking.status === 'used' ? '已核销' : '已取消'}
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
                  <Input defaultValue="天府机场贵宾厅" />
                </div>
                <div className="space-y-2">
                  <Label>页面描述</Label>
                  <Textarea 
                    defaultValue="尊贵体验，舒适候机"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>主题颜色</Label>
                  <Select defaultValue="purple">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purple">紫色</SelectItem>
                      <SelectItem value="blue">蓝色</SelectItem>
                      <SelectItem value="gold">金色</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>页面功能</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">贵宾厅介绍</p>
                        <p className="text-xs text-gray-500">显示贵宾厅详细信息</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">时段选择</p>
                        <p className="text-xs text-gray-500">选择预订时段</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">服务展示</p>
                        <p className="text-xs text-gray-500">展示贵宾厅服务</p>
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
                      <div className="bg-purple-600 text-white p-3">
                        <p className="font-semibold text-sm">天府机场贵宾厅</p>
                      </div>
                      <div className="p-3">
                        <img 
                          src="https://via.placeholder.com/300x150?text=贵宾厅环境" 
                          alt="贵宾厅" 
                          className="w-full h-28 object-cover rounded-lg mb-3"
                        />
                        <div className="mb-3">
                          <h3 className="font-semibold text-sm mb-2">时段选择</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div>
                                <p className="text-xs font-medium">08:00-12:00</p>
                                <p className="text-xs text-gray-500">余位35</p>
                              </div>
                              <p className="text-xs text-green-600 font-bold">¥198</p>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-purple-600 text-xs py-2 text-white">
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
              <CardDescription>配置贵宾厅系统参数</CardDescription>
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
                      <p className="font-medium text-sm">需要实名认证</p>
                      <p className="text-xs text-gray-500">预订时需要验证身份证</p>
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
                    <p className="text-xs text-gray-500">预订前多少小时内可免费取消</p>
                  </div>
                  <div className="space-y-2">
                    <Label>取消手续费(%)</Label>
                    <Input type="number" defaultValue="20" />
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
