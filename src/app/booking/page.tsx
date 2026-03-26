'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
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
  Film,
  Coffee,
  Car,
  Building,
  PlusCircle,
  Settings,
  Smartphone,
  Code,
  Layout
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// 预订系统类型定义
const bookingSystemTypes = [
  {
    id: 'scenic',
    name: '旅游住宿预订',
    icon: Mountain,
    description: '景区门票、酒店、民宿预订',
    color: 'green',
    features: ['门票预订', '酒店管理', '民宿预订', '时段预约', '二维码核销'],
    h5Features: ['景区介绍', '门票选择', '酒店选择', '时段选择', '支付下单', '订单查询']
  },
  {
    id: 'movie',
    name: '电影票预订',
    icon: Film,
    description: '电影票、影院场次预订',
    color: 'red',
    features: ['影片管理', '场次安排', '座位选择', '电子票'],
    h5Features: ['影片列表', '场次选择', '座位选择', '支付下单', '电子票']
  },
  {
    id: 'dining',
    name: '美食预订',
    icon: Coffee,
    description: '餐厅、美食套餐预订',
    color: 'yellow',
    features: ['餐厅管理', '套餐预订', '桌位管理', '二维码核销'],
    h5Features: ['餐厅列表', '菜品展示', '套餐选择', '桌位选择', '支付下单']
  },
  {
    id: 'car',
    name: '汽车保养预订',
    icon: Car,
    description: '车辆保养、维修、洗车预订',
    color: 'blue',
    features: ['车辆管理', '保养项目', '维修记录', '到店预约'],
    h5Features: ['车辆信息', '保养项目', '预约时间', '支付下单', '到店提醒']
  },
  {
    id: 'vip',
    name: '贵宾厅预订',
    icon: Building,
    description: '贵宾厅、休息室预订',
    color: 'purple',
    features: ['厅室管理', '时段管理', '服务配置', '核销管理'],
    h5Features: ['厅室列表', '时段选择', '服务展示', '支付下单', '二维码核销']
  },
  {
    id: 'parking',
    name: '停车预订',
    icon: Car,
    description: '停车位、充电桩预订',
    color: 'orange',
    features: ['车位管理', '时租/月租', '充电桩', '车牌识别'],
    h5Features: ['车位列表', '时长选择', '车牌输入', '支付下单']
  },
];

// 模拟预订系统数据
const bookingSystems = [
  {
    id: 'SYS-001',
    name: '旅游住宿预订',
    type: 'scenic',
    typeId: 'scenic',
    status: 'active',
    h5Enabled: true,
    createTime: '2026-01-10',
    updateTime: '2026-01-20',
    totalBookings: 15234,
    todayBookings: 156,
    totalRevenue: 456780,
    todayRevenue: 12450,
    adminName: '管理员A',
    h5Url: 'https://example.com/travel/hotel'
  },
  {
    id: 'SYS-002',
    name: '电影票预订',
    type: 'movie',
    typeId: 'movie',
    status: 'active',
    h5Enabled: true,
    createTime: '2026-01-15',
    updateTime: '2026-01-21',
    totalBookings: 28456,
    todayBookings: 234,
    totalRevenue: 890120,
    todayRevenue: 23670,
    adminName: '管理员B',
    h5Url: 'https://example.com/movie/ticket'
  },
  {
    id: 'SYS-003',
    name: '美食预订',
    type: 'dining',
    typeId: 'dining',
    status: 'active',
    h5Enabled: true,
    createTime: '2026-01-05',
    updateTime: '2026-01-18',
    totalBookings: 4567,
    todayBookings: 45,
    totalRevenue: 234560,
    todayRevenue: 8900,
    adminName: '管理员C',
    h5Url: 'https://example.com/dining/restaurant'
  },
  {
    id: 'SYS-004',
    name: '汽车保养预订',
    type: 'car',
    typeId: 'car',
    status: 'active',
    h5Enabled: true,
    createTime: '2026-01-08',
    updateTime: '2026-01-19',
    totalBookings: 3456,
    todayBookings: 67,
    totalRevenue: 456789,
    todayRevenue: 12340,
    adminName: '管理员D',
    h5Url: 'https://example.com/car/maintenance'
  },
  {
    id: 'SYS-005',
    name: '贵宾厅预订',
    type: 'vip',
    typeId: 'vip',
    status: 'active',
    h5Enabled: true,
    createTime: '2026-01-12',
    updateTime: '2026-01-22',
    totalBookings: 1234,
    todayBookings: 23,
    totalRevenue: 345678,
    todayRevenue: 5670,
    adminName: '管理员E',
    h5Url: 'https://example.com/vip/lounge'
  },
  {
    id: 'SYS-006',
    name: '停车预订',
    type: 'parking',
    typeId: 'parking',
    status: 'inactive',
    h5Enabled: false,
    createTime: '2026-01-18',
    updateTime: '2026-01-20',
    totalBookings: 892,
    todayBookings: 0,
    totalRevenue: 12450,
    todayRevenue: 0,
    adminName: '管理员F',
    h5Url: null
  },
];

export default function BookingSystemPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('systems');

  const filteredSystems = bookingSystems.filter(system => {
    const matchesSearch = system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         system.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || system.status === filterStatus;
    const matchesType = filterType === 'all' || system.typeId === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '已启用';
      case 'inactive':
        return '已停用';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">预订系统管理</h1>
          <p className="text-sm text-gray-500 mt-1">定制平台系统搭建 - 支持旅游、观影、美食、汽车、贵宾厅等多种预订</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            导出数据
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusCircle className="w-4 h-4 mr-2" />
                创建预订系统
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建预订系统</DialogTitle>
                <DialogDescription>
                  选择预订系统类型并配置基本信息
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>选择类型 <span className="text-red-500">*</span></Label>
                  <div className="grid grid-cols-2 gap-4">
                    {bookingSystemTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <Card 
                          key={type.id}
                          className="p-4 cursor-pointer hover:border-blue-500 transition-all border-2"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 bg-${type.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-5 h-5 text-${type.color}-600`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{type.name}</h3>
                              <p className="text-xs text-gray-600">{type.description}</p>
                            </div>
                            <Checkbox />
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>系统名称 <span className="text-red-500">*</span></Label>
                    <Input placeholder="输入预订系统名称" />
                  </div>
                  <div className="space-y-2">
                    <Label>管理员 <span className="text-red-500">*</span></Label>
                    <Input placeholder="输入管理员姓名" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>系统描述</Label>
                  <Textarea placeholder="描述该预订系统的用途和特点" rows={3} />
                </div>

                <div className="space-y-3">
                  <Label>启用功能</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">H5页面</p>
                        <p className="text-xs text-gray-500">启用H5预订页面</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">二维码核销</p>
                        <p className="text-xs text-gray-500">支持二维码扫码核销</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">会员积分</p>
                        <p className="text-xs text-gray-500">预订后获得积分</p>
                      </div>
                      <Checkbox />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">取消</Button>
                <Button>创建系统</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">系统总数</p>
                <p className="text-2xl font-bold text-gray-900">{bookingSystems.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Layout className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">启用中</p>
                <p className="text-2xl font-bold text-blue-600">
                  {bookingSystems.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日预订</p>
                <p className="text-2xl font-bold text-blue-700">
                  {bookingSystems.reduce((sum, s) => sum + s.todayBookings, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日收入</p>
                <p className="text-2xl font-bold text-indigo-600">
                  ¥{bookingSystems.reduce((sum, s) => sum + s.todayRevenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-semibold">¥</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="systems">预订系统</TabsTrigger>
          <TabsTrigger value="templates">H5模板</TabsTrigger>
          <TabsTrigger value="settings">系统设置</TabsTrigger>
        </TabsList>

        <TabsContent value="systems" className="mt-4 space-y-6">
          {/* 筛选栏 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="搜索预订系统名称或ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="系统类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="scenic">旅游住宿</SelectItem>
                    <SelectItem value="movie">电影票</SelectItem>
                    <SelectItem value="dining">美食</SelectItem>
                    <SelectItem value="car">汽车保养</SelectItem>
                    <SelectItem value="vip">贵宾厅</SelectItem>
                    <SelectItem value="parking">停车</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="active">已启用</SelectItem>
                    <SelectItem value="inactive">已停用</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  高级筛选
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 预订系统列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSystems.map((system) => {
              const systemType = bookingSystemTypes.find(t => t.id === system.typeId);
              const Icon = systemType?.icon || Calendar;
              return (
                <Card key={system.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{system.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {systemType?.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(system.status)}>
                        {getStatusText(system.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">系统ID</p>
                          <p className="font-mono">{system.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">管理员</p>
                          <p className="font-medium">{system.adminName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">总预订数</p>
                          <p className="font-semibold">{system.totalBookings.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">今日预订</p>
                          <p className="font-semibold text-green-600">{system.todayBookings}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">总收入</p>
                          <p className="font-semibold">¥{system.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">今日收入</p>
                          <p className="font-semibold text-green-600">¥{system.todayRevenue.toLocaleString()}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-500">功能:</span>
                        {system.h5Enabled && (
                          <Badge variant="outline" className="text-xs">
                            <Smartphone className="w-3 h-3 mr-1" />
                            H5页面
                          </Badge>
                        )}
                        {system.h5Enabled && (
                          <Badge variant="outline" className="text-xs">
                            <QrCode className="w-3 h-3 mr-1" />
                            二维码
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Link href={`/booking/${system.typeId}/${system.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Settings className="w-4 h-4 mr-2" />
                            系统管理
                          </Button>
                        </Link>
                        {system.h5Enabled && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <Smartphone className="w-4 h-4 mr-2" />
                            H5页面
                          </Button>
                        )}
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
                              编辑配置
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <QrCode className="w-4 h-4 mr-2" />
                              生成二维码
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除系统
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>H5页面模板</CardTitle>
              <CardDescription>管理各类预订系统的H5页面模板</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookingSystemTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card key={type.id} className="hover:shadow-md transition-all">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-${type.color}-100 rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${type.color}-600`} />
                          </div>
                          <div>
                            <CardTitle className="text-base">{type.name}</CardTitle>
                            <CardDescription className="text-xs">{type.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">H5功能模块</p>
                            <div className="flex flex-wrap gap-2">
                              {type.h5Features.map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-2">后端管理功能</p>
                            <div className="flex flex-wrap gap-2">
                              {type.features.map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Code className="w-4 h-4 mr-2" />
                              编辑模板
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Smartphone className="w-4 h-4 mr-2" />
                              预览效果
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>系统设置</CardTitle>
              <CardDescription>配置预订系统的全局设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>基础设置</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">允许游客预订</p>
                      <p className="text-xs text-gray-500">未注册用户也可以进行预订</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">需要手机验证</p>
                      <p className="text-xs text-gray-500">预订前需要验证手机号</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">需要实名认证</p>
                      <p className="text-xs text-gray-500">预订前需要完成实名认证</p>
                    </div>
                    <Checkbox />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>费用设置</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>预订手续费(%)</Label>
                    <Input type="number" defaultValue="0" />
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
