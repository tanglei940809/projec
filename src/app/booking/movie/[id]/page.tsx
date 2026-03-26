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
  Film,
  Smartphone,
  Code,
  Layout,
  Settings,
  Ticket,
  Play,
  Star,
  Users,
  DollarSign,
  BarChart3,
  Popcorn,
  Armchair
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

// 模拟影院数据
const cinemas = [
  {
    id: 'CIN-001',
    name: '万达影城(春熙路店)',
    location: '成都市锦江区春熙路',
    halls: 12,
    totalSeats: 2400,
    status: 'active',
    createTime: '2026-01-15'
  },
];

// 模拟影片数据
const movies = [
  {
    id: 'MOV-001',
    name: '流浪地球3',
    director: '郭帆',
    duration: 148,
    type: '科幻/冒险',
    rating: 9.2,
    status: 'showing',
    poster: 'https://via.placeholder.com/200x300?text=流浪地球3',
    description: '人类开启太空流浪之旅',
    releaseDate: '2026-01-20'
  },
  {
    id: 'MOV-002',
    name: '满江红2',
    director: '张艺谋',
    duration: 159,
    type: '喜剧/悬疑',
    rating: 8.9,
    status: 'showing',
    poster: 'https://via.placeholder.com/200x300?text=满江红2',
    description: '南宋时期的悬疑喜剧',
    releaseDate: '2026-01-18'
  },
  {
    id: 'MOV-003',
    name: '深海',
    director: '田晓鹏',
    duration: 112,
    type: '动画/奇幻',
    rating: 8.7,
    status: 'showing',
    poster: 'https://via.placeholder.com/200x300?text=深海',
    description: '少女与深海冒险',
    releaseDate: '2026-01-22'
  },
];

// 模拟场次数据
const sessions = [
  {
    id: 'SES-001',
    movieId: 'MOV-001',
    movieName: '流浪地球3',
    hallId: 'HALL-001',
    hallName: '1号厅(IMAX)',
    startTime: '2026-01-26 10:30',
    endTime: '2026-01-26 13:00',
    totalSeats: 240,
    soldSeats: 156,
    priceRange: '¥50-80',
    status: 'onsale'
  },
  {
    id: 'SES-002',
    movieId: 'MOV-001',
    movieName: '流浪地球3',
    hallId: 'HALL-002',
    hallName: '2号厅(杜比全景声)',
    startTime: '2026-01-26 14:00',
    endTime: '2026-01-26 16:30',
    totalSeats: 180,
    soldSeats: 89,
    priceRange: '¥45-70',
    status: 'onsale'
  },
  {
    id: 'SES-003',
    movieId: 'MOV-002',
    movieName: '满江红2',
    hallId: 'HALL-001',
    hallName: '1号厅(IMAX)',
    startTime: '2026-01-26 19:00',
    endTime: '2026-01-26 21:45',
    totalSeats: 240,
    soldSeats: 234,
    priceRange: '¥55-85',
    status: 'soldout'
  },
];

// 模拟预订数据
const bookings = [
  {
    id: 'BK-101',
    sessionId: 'SES-001',
    movieName: '流浪地球3',
    hallName: '1号厅(IMAX)',
    userName: '王五',
    phone: '136****4321',
    seats: ['5排8座', '5排9座'],
    quantity: 2,
    totalPrice: 150,
    showTime: '2026-01-26 10:30',
    bookingTime: '2026-01-25 15:30:00',
    status: 'confirmed',
    qrCode: 'BK-101-QR'
  },
  {
    id: 'BK-102',
    sessionId: 'SES-002',
    movieName: '流浪地球3',
    hallName: '2号厅(杜比全景声)',
    userName: '赵六',
    phone: '137****5432',
    seats: ['8排12座'],
    quantity: 1,
    totalPrice: 65,
    showTime: '2026-01-26 14:00',
    bookingTime: '2026-01-25 16:20:00',
    status: 'used',
    qrCode: 'BK-102-QR'
  },
];

export default function MovieBookingPage() {
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
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">万达影城预订系统</h1>
                <p className="text-sm text-gray-500 mt-1">系统ID: SYS-002 | 管理员: 管理员B</p>
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
                <p className="text-sm text-gray-600">今日场次</p>
                <p className="text-2xl font-bold text-blue-600">24</p>
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
                <p className="text-sm text-gray-600">今日预订</p>
                <p className="text-2xl font-bold text-blue-700">234</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日核销</p>
                <p className="text-2xl font-bold text-blue-600">156</p>
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
                <p className="text-sm text-gray-600">今日收入</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {Intl.NumberFormat('zh-CN').format(23670)}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="movies">影片管理</TabsTrigger>
          <TabsTrigger value="sessions">场次管理</TabsTrigger>
          <TabsTrigger value="bookings">预订管理</TabsTrigger>
          <TabsTrigger value="h5">H5页面</TabsTrigger>
          <TabsTrigger value="settings">系统设置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* 影院基本信息 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>影院信息</CardTitle>
                  <CardDescription>万达影城(春熙路店)基本信息</CardDescription>
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
                  <p className="text-sm text-gray-500">影院名称</p>
                  <p className="font-semibold">{cinemas[0]?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">影院位置</p>
                  <p className="font-semibold">{cinemas[0]?.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">放映厅数量</p>
                  <p className="font-semibold">{cinemas[0]?.halls}个</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">总座位数</p>
                  <p className="font-semibold">{cinemas[0]?.totalSeats.toLocaleString()}个</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">在映影片</p>
                  <p className="font-semibold text-green-600">{movies.length}部</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">今日场次</p>
                  <p className="font-semibold text-orange-600">{sessions.length}场</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 热门影片 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>在映影片</CardTitle>
                  <CardDescription>当前正在上映的影片</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加影片
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                  <Card key={movie.id} className="overflow-hidden">
                    <img 
                      src={movie.poster} 
                      alt={movie.name} 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-sm truncate">{movie.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-yellow-600 font-medium">{movie.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{movie.duration}分钟 | {movie.type}</p>
                    </CardContent>
                  </Card>
                ))}
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
                  <div className="bg-red-600 text-white p-4">
                    <p className="font-semibold">万达影城</p>
                    <p className="text-xs opacity-90">在线选座购票</p>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <img 
                        src={movies[0]?.poster} 
                        alt={movies[0]?.name} 
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold">{movies[0]?.name}</h3>
                      <p className="text-xs text-gray-500">{movies[0]?.duration}分钟 | {movies[0]?.type}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">10:30</p>
                        <p className="text-xs font-medium">1号厅</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">14:00</p>
                        <p className="text-xs font-medium">2号厅</p>
                      </div>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      选座购票
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movies" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>影片管理</CardTitle>
                  <CardDescription>管理影院上映的影片</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加影片
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies.map((movie) => (
                  <Card key={movie.id}>
                    <img 
                      src={movie.poster} 
                      alt={movie.name} 
                      className="w-full h-56 object-cover"
                    />
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{movie.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-sm text-yellow-600 font-medium">{movie.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">导演：{movie.director}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">{movie.duration}分钟</Badge>
                        <Badge variant="outline" className="text-xs">{movie.type}</Badge>
                        <Badge 
                          variant={movie.status === 'showing' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {movie.status === 'showing' ? '热映中' : '即将上映'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          编辑
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Play className="w-4 h-4 mr-1" />
                          排期
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>场次管理</CardTitle>
                  <CardDescription>管理放映场次和座位</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加场次
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>场次ID</TableHead>
                    <TableHead>影片</TableHead>
                    <TableHead>放映厅</TableHead>
                    <TableHead>开始时间</TableHead>
                    <TableHead>结束时间</TableHead>
                    <TableHead>座位</TableHead>
                    <TableHead>已售</TableHead>
                    <TableHead>价格</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-mono">{session.id}</TableCell>
                      <TableCell>{session.movieName}</TableCell>
                      <TableCell>{session.hallName}</TableCell>
                      <TableCell>{session.startTime.split(' ')[1]}</TableCell>
                      <TableCell>{session.endTime.split(' ')[1]}</TableCell>
                      <TableCell>{session.totalSeats}</TableCell>
                      <TableCell>{session.soldSeats}</TableCell>
                      <TableCell className="text-green-600 font-medium">{session.priceRange}</TableCell>
                      <TableCell>
                        <Badge variant={
                          session.status === 'onsale' ? 'default' : 'secondary'
                        }>
                          {session.status === 'onsale' ? '在售' : '售罄'}
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
                              查看座位
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              编辑场次
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除场次
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
                  <CardDescription>查看和管理所有电影票预订</CardDescription>
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
                    <TableHead>影片</TableHead>
                    <TableHead>放映厅</TableHead>
                    <TableHead>预订人</TableHead>
                    <TableHead>座位</TableHead>
                    <TableHead>总价</TableHead>
                    <TableHead>放映时间</TableHead>
                    <TableHead>预订时间</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono">{booking.id}</TableCell>
                      <TableCell>{booking.movieName}</TableCell>
                      <TableCell>{booking.hallName}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.userName}</p>
                          <p className="text-xs text-gray-500">{booking.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {booking.seats.map((seat) => (
                            <Badge key={seat} variant="outline" className="text-xs">
                              <Armchair className="w-3 h-3 mr-1" />
                              {seat}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">{booking.totalPrice}</TableCell>
                      <TableCell>{booking.showTime}</TableCell>
                      <TableCell>{booking.bookingTime.split(' ')[1]}</TableCell>
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
                <CardDescription>配置用户端H5订票页面</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>页面标题</Label>
                  <Input defaultValue="万达影城在线选座" />
                </div>
                <div className="space-y-2">
                  <Label>页面描述</Label>
                  <Textarea 
                    defaultValue="在线选座购票，享受最佳观影体验"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>主题颜色</Label>
                  <Select defaultValue="red">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">红色</SelectItem>
                      <SelectItem value="blue">蓝色</SelectItem>
                      <SelectItem value="purple">紫色</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>页面功能</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">影片列表</p>
                        <p className="text-xs text-gray-500">显示正在上映的影片</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">场次选择</p>
                        <p className="text-xs text-gray-500">选择放映场次</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">在线选座</p>
                        <p className="text-xs text-gray-500">可视化座位选择</p>
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
                        <p className="font-medium text-sm">电子票</p>
                        <p className="text-xs text-gray-500">生成电子票二维码</p>
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
                      <div className="bg-red-600 text-white p-3">
                        <p className="font-semibold text-sm">万达影城</p>
                      </div>
                      <div className="p-3">
                        <img 
                          src={movies[0]?.poster} 
                          alt={movies[0]?.name} 
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <div className="mb-3">
                          <h3 className="font-semibold text-sm">{movies[0]?.name}</h3>
                          <p className="text-xs text-gray-500">{movies[0]?.duration}分钟</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="text-xs font-medium">10:30</p>
                            <p className="text-xs text-gray-500">1号厅</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="text-xs font-medium">14:00</p>
                            <p className="text-xs text-gray-500">2号厅</p>
                          </div>
                        </div>
                        <Button className="w-full bg-red-600 text-xs py-2 text-white">
                          选座
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
              <CardDescription>配置影院预订系统参数</CardDescription>
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
                      <Label>最晚购票时间(分钟)</Label>
                      <Input type="number" defaultValue="30" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">需要实名认证</p>
                      <p className="text-xs text-gray-500">购票时需要填写身份证信息</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">二维码核销</p>
                      <p className="text-xs text-gray-500">使用二维码扫码核销电影票</p>
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
                    <Label>免费取消时长(分钟)</Label>
                    <Input type="number" defaultValue="30" />
                    <p className="text-xs text-gray-500">开场前多少分钟内可免费取消</p>
                  </div>
                  <div className="space-y-2">
                    <Label>退票手续费(%)</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>座位设置</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>最小购票数(张)</Label>
                    <Input type="number" defaultValue="1" />
                  </div>
                  <div className="space-y-2">
                    <Label>最大购票数(张)</Label>
                    <Input type="number" defaultValue="6" />
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
