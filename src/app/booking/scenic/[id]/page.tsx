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
  Mountain,
  Smartphone,
  Code,
  Layout,
  Settings,
  Ticket,
  Calendar as CalendarIcon,
  Users,
  DollarSign,
  BarChart3
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

// 模拟景区数据
const scenicSpots = [
  {
    id: 'SCN-001',
    name: '青城山景区',
    location: '四川省成都市都江堰市',
    status: 'active',
    ticketTypes: ['成人票', '儿童票', '老年票', '套票A', '套票B'],
    dailyLimit: 5000,
    todaySold: 2341,
    priceRange: '¥80-280',
    features: ['索道', '观光车', '讲解服务'],
    createTime: '2026-01-10'
  },
];

// 模拟门票数据
const tickets = [
  {
    id: 'TKT-001',
    scenicId: 'SCN-001',
    name: '成人票',
    type: 'adult',
    price: 80,
    stock: 5000,
    sold: 2341,
    dailyLimit: 1000,
    status: 'active',
    validity: '当日有效',
    description: '适用于18-60周岁成年人'
  },
  {
    id: 'TKT-002',
    scenicId: 'SCN-001',
    name: '儿童票',
    type: 'child',
    price: 40,
    stock: 2000,
    sold: 567,
    dailyLimit: 300,
    status: 'active',
    validity: '当日有效',
    description: '适用于6-18周岁未成年人'
  },
  {
    id: 'TKT-003',
    scenicId: 'SCN-001',
    name: '套票A（门票+索道）',
    type: 'package',
    price: 180,
    stock: 1000,
    sold: 456,
    dailyLimit: 200,
    status: 'active',
    validity: '当日有效',
    description: '门票往返索道票'
  },
];

// 模拟预订数据
const bookings = [
  {
    id: 'BK-001',
    ticketId: 'TKT-001',
    ticketName: '成人票',
    userName: '张三',
    phone: '138****5678',
    quantity: 2,
    totalPrice: 160,
    bookingDate: '2026-01-25',
    bookingTime: '10:30:00',
    visitDate: '2026-01-26',
    status: 'confirmed',
    qrCode: 'BK-001-QR',
    createTime: '2026-01-25 10:30:00'
  },
  {
    id: 'BK-002',
    ticketId: 'TKT-003',
    ticketName: '套票A（门票+索道）',
    userName: '李四',
    phone: '139****8765',
    quantity: 1,
    totalPrice: 180,
    bookingDate: '2026-01-25',
    bookingTime: '09:15:00',
    visitDate: '2026-01-25',
    status: 'used',
    qrCode: 'BK-002-QR',
    createTime: '2026-01-25 09:15:00'
  },
];

export default function ScenicBookingPage() {
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
                <Mountain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">青城山景区预订系统</h1>
                <p className="text-sm text-gray-500 mt-1">系统ID: SYS-001 | 管理员: 管理员A</p>
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
                <p className="text-2xl font-bold text-blue-600">156</p>
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
                <p className="text-2xl font-bold text-blue-700">89</p>
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
                  {Intl.NumberFormat('zh-CN').format(12450)}
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
                <p className="text-sm text-gray-600">门票剩余</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {scenicSpots[0]?.dailyLimit - scenicSpots[0]?.todaySold || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="tickets">门票管理</TabsTrigger>
          <TabsTrigger value="bookings">预订管理</TabsTrigger>
          <TabsTrigger value="h5">H5页面</TabsTrigger>
          <TabsTrigger value="settings">系统设置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* 景区基本信息 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>景区信息</CardTitle>
                  <CardDescription>青城山景区基本信息</CardDescription>
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
                  <p className="text-sm text-gray-500">景区名称</p>
                  <p className="font-semibold">{scenicSpots[0]?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">景区位置</p>
                  <p className="font-semibold">{scenicSpots[0]?.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">每日限流</p>
                  <p className="font-semibold">{scenicSpots[0]?.dailyLimit.toLocaleString()}人</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">价格区间</p>
                  <p className="font-semibold text-green-600">{scenicSpots[0]?.priceRange}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">今日已售</p>
                  <p className="font-semibold text-orange-600">{scenicSpots[0]?.todaySold.toLocaleString()}张</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">景区特色</p>
                  <div className="flex gap-2 mt-1">
                    {scenicSpots[0]?.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
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
                {/* 手机预览 */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-green-600 text-white p-4">
                    <div className="flex items-center gap-2">
                      <Mountain className="w-6 h-6" />
                      <span className="font-semibold">青城山景区</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <img 
                        src="https://via.placeholder.com/400x200?text=青城山景区" 
                        alt="景区图片" 
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">成人票</p>
                          <p className="text-xs text-gray-500">18-60周岁</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">¥80</p>
                          <p className="text-xs text-gray-500">剩余2659张</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">套票A（门票+索道）</p>
                          <p className="text-xs text-gray-500">含往返索道</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">¥180</p>
                          <p className="text-xs text-gray-500">剩余544张</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      立即预订
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>门票管理</CardTitle>
                  <CardDescription>管理景区门票类型和价格</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加门票
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>门票名称</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>价格</TableHead>
                    <TableHead>库存</TableHead>
                    <TableHead>已售</TableHead>
                    <TableHead>日限</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {ticket.type === 'adult' ? '成人票' : 
                           ticket.type === 'child' ? '儿童票' : '套票'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">{ticket.price}</TableCell>
                      <TableCell>{ticket.stock.toLocaleString()}</TableCell>
                      <TableCell>{ticket.sold.toLocaleString()}</TableCell>
                      <TableCell>{ticket.dailyLimit.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={ticket.status === 'active' ? 'default' : 'secondary'}>
                          {ticket.status === 'active' ? '销售中' : '已下架'}
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
                              编辑门票
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除门票
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
                  <CardDescription>查看和管理所有预订订单</CardDescription>
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
                    <TableHead>门票类型</TableHead>
                    <TableHead>预订人</TableHead>
                    <TableHead>数量</TableHead>
                    <TableHead>总价</TableHead>
                    <TableHead>参观日期</TableHead>
                    <TableHead>预订时间</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono">{booking.id}</TableCell>
                      <TableCell>{booking.ticketName}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.userName}</p>
                          <p className="text-xs text-gray-500">{booking.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.quantity}张</TableCell>
                      <TableCell className="font-semibold text-green-600">{booking.totalPrice}</TableCell>
                      <TableCell>{booking.visitDate}</TableCell>
                      <TableCell>{booking.bookingTime}</TableCell>
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
                  <Input defaultValue="青城山景区预订" />
                </div>
                <div className="space-y-2">
                  <Label>页面描述</Label>
                  <Textarea 
                    defaultValue="预订青城山景区门票，享受优惠价格"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>主题颜色</Label>
                  <Select defaultValue="green">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="green">绿色</SelectItem>
                      <SelectItem value="blue">蓝色</SelectItem>
                      <SelectItem value="red">红色</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>页面功能</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">景区介绍</p>
                        <p className="text-xs text-gray-500">显示景区详细信息</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">门票选择</p>
                        <p className="text-xs text-gray-500">选择门票类型和数量</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">日期选择</p>
                        <p className="text-xs text-gray-500">选择参观日期</p>
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
                      <div className="bg-green-600 text-white p-3">
                        <p className="font-semibold text-sm">青城山景区</p>
                      </div>
                      <div className="p-3">
                        <img 
                          src="https://via.placeholder.com/300x150?text=景区图片" 
                          alt="景区" 
                          className="w-full h-28 object-cover rounded-lg mb-3"
                        />
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <p className="text-xs font-medium">成人票</p>
                              <p className="text-xs text-gray-500">¥80/张</p>
                            </div>
                            <Badge variant="outline" className="text-xs">库存2659</Badge>
                          </div>
                        </div>
                        <Button className="w-full bg-green-600 text-xs py-2 text-white">
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
              <CardDescription>配置景区预订系统参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>基础设置</Label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>每日限流人数</Label>
                      <Input type="number" defaultValue="5000" />
                    </div>
                    <div className="space-y-2">
                      <Label>提前预订天数</Label>
                      <Input type="number" defaultValue="7" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">需要实名认证</p>
                      <p className="text-xs text-gray-500">预订时需要填写身份证信息</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">二维码核销</p>
                      <p className="text-xs text-gray-500">使用二维码扫码核销门票</p>
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
                    <Input type="number" defaultValue="24" />
                    <p className="text-xs text-gray-500">预订后多少小时内可免费取消</p>
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
