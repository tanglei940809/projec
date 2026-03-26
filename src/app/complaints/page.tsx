'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  Calendar,
  MoreVertical,
  Send,
  Check,
  Headset,
  User,
  Star,
  PhoneCall,
  Video,
  ChevronRight,
  Award,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

// 模拟客服工号数据
const serviceStaffData = [
  {
    id: 'CS001',
    name: '客服小王',
    workId: 'WK001',
    phone: '400-820-8888',
    status: 'online',
    department: '售后服务',
    level: '高级客服',
    satisfaction: 98.5,
    handlingCount: 1234,
    avgResponseTime: 45,
    avatar: '👨'
  },
  {
    id: 'CS002',
    name: '客服小李',
    workId: 'WK002',
    phone: '400-820-8888',
    status: 'busy',
    department: '售后服务',
    level: '资深客服',
    satisfaction: 97.8,
    handlingCount: 1567,
    avgResponseTime: 38,
    avatar: '👩'
  },
  {
    id: 'CS003',
    name: '客服小张',
    workId: 'WK003',
    phone: '400-820-8888',
    status: 'offline',
    department: '售后服务',
    level: '普通客服',
    satisfaction: 96.2,
    handlingCount: 892,
    avgResponseTime: 52,
    avatar: '👨'
  },
];

// 模拟客服工单数据
const complaintsData = [
  {
    id: 'CMP-2026-001',
    customerId: 'U001',
    customerName: '张三',
    customerPhone: '138****5678',
    type: '优惠未到账',
    priority: 'high',
    status: 'pending',
    channel: '400电话',
    createTime: '2026-01-21 10:30:00',
    updateTime: '2026-01-21 10:30:00',
    content: '我今天在云闪付使用1分钱坐公交活动，但是没有享受优惠，仍然扣了2.99元',
    handler: null,
    handlerId: null,
    handleTime: null,
    campaign: '1分钱坐公交地铁',
    duration: 180,
    satisfaction: null
  },
  {
    id: 'CMP-2026-002',
    customerId: 'U002',
    customerName: '李四',
    customerPhone: '139****8765',
    type: '活动名额用完',
    priority: 'medium',
    status: 'processing',
    channel: '400电话',
    createTime: '2026-01-21 09:15:00',
    updateTime: '2026-01-21 10:00:00',
    content: '瑞幸咖啡活动提示名额已用完，但是我看活动说明今天还有名额',
    handler: '客服小李',
    handlerId: 'CS002',
    handleTime: '2026-01-21 09:30:00',
    campaign: '瑞幸咖啡随机立减',
    duration: 240,
    satisfaction: null
  },
  {
    id: 'CMP-2026-003',
    customerId: 'U003',
    customerName: '王五',
    customerPhone: '137****2345',
    type: '规则咨询',
    priority: 'low',
    status: 'completed',
    channel: '400电话',
    createTime: '2026-01-20 16:20:00',
    updateTime: '2026-01-20 17:00:00',
    content: '请问中石油加油满减活动，每月限几次？单次消费多少元可以触发？',
    handler: '客服小王',
    handlerId: 'CS001',
    handleTime: '2026-01-20 16:25:00',
    campaign: '中石油加油满200减40',
    duration: 120,
    satisfaction: 5
  },
  {
    id: 'CMP-2026-004',
    customerId: 'U004',
    customerName: '赵六',
    customerPhone: '136****3456',
    type: '权益补偿',
    priority: 'high',
    status: 'processing',
    channel: '400电话',
    createTime: '2026-01-21 08:45:00',
    updateTime: '2026-01-21 09:30:00',
    content: '系统故障导致我的立减金没有到账，申请补偿',
    handler: '客服小王',
    handlerId: 'CS001',
    handleTime: '2026-01-21 09:00:00',
    campaign: '1分钱坐公交地铁',
    duration: 300,
    satisfaction: null
  },
];

const quickResponses = [
  {
    category: '日常解释',
    responses: [
      { title: '1分钱坐公交地铁', content: 'xx银行"安逸熊猫"信用卡持卡人每月可享[4]次1分钱乘车优惠，单次最高减2.99元，单日限2次，云闪付付款立减' },
      { title: '中石油加油满减', content: '上月消费满1888元，本月可享1次加油满200减40元，微信/支付宝领取红包券后使用，有效期30天' },
      { title: '新客办卡立减金', content: '新客办卡首笔交易立减8元，连续5月每月享4张满10减5元券，微信公众号专区领取' },
    ]
  },
  {
    category: '应急处理',
    responses: [
      { title: '活动名额用完', content: '非常抱歉，本次活动名额已用完，我们会及时反馈银行争取追加名额，后续活动请关注通知' },
      { title: '优惠未到账', content: '因系统临时故障导致优惠未到账，我们会在24小时内为您补录权益，后续有问题请随时联系' },
      { title: '客诉安抚', content: '给您带来不便非常抱歉，我们会立即核实情况，[2]个工作日内给您回复，请您耐心等待' },
    ]
  }
];

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [activeTab, setActiveTab] = useState('list');
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [replyContent, setReplyContent] = useState('');

  const filteredComplaints = complaintsData.filter(complaint => {
    const matchesSearch = complaint.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'completed':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待处理';
      case 'processing':
        return '处理中';
      case 'completed':
        return '已完成';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive' as any;
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'wechat':
        return <MessageCircle className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">400客服中心</h1>
              <p className="text-sm text-gray-500 mt-1">客服工号管理 · 客诉工单处理 · 服务质量监控</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Card className="px-4 py-2 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">400热线</p>
                <p className="text-sm font-bold text-blue-600">400-820-8888</p>
              </div>
            </div>
          </Card>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            处理话术
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            历史记录
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">待处理工单</p>
                <p className="text-2xl font-bold text-blue-600">
                  {complaintsData.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">处理中工单</p>
                <p className="text-2xl font-bold text-blue-700">
                  {complaintsData.filter(c => c.status === 'processing').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Headset className="w-5 h-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日接听</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {complaintsData.filter(c => c.status === 'completed' || c.status === 'processing').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">平均满意度</p>
                <p className="text-2xl font-bold text-sky-600">97.5%</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选栏 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索客户姓名、工单号、客服工号..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="工单状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">待处理</SelectItem>
                <SelectItem value="processing">处理中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="优先级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部优先级</SelectItem>
                <SelectItem value="high">高优先级</SelectItem>
                <SelectItem value="medium">中优先级</SelectItem>
                <SelectItem value="low">低优先级</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              高级筛选
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 主内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">工单列表</TabsTrigger>
          <TabsTrigger value="staff">客服团队</TabsTrigger>
          <TabsTrigger value="statistics">统计分析</TabsTrigger>
          <TabsTrigger value="responses">话术管理</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-gray-900">{complaint.customerName}</h3>
                        <span className="text-sm text-gray-500">{complaint.customerPhone}</span>
                        <Badge variant={getStatusColor(complaint.status)}>
                          {getStatusText(complaint.status)}
                        </Badge>
                        <Badge variant={getPriorityColor(complaint.priority)}>
                          {complaint.priority === 'high' ? '高' : complaint.priority === 'medium' ? '中' : '低'}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <PhoneCall className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-gray-500">工单编号</p>
                          <p className="font-mono">{complaint.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">工单类型</p>
                          <p className="font-semibold">{complaint.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">关联活动</p>
                          <p className="text-blue-600">{complaint.campaign}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">通话时长</p>
                          <p className="font-semibold">{Math.floor(complaint.duration / 60)}分{complaint.duration % 60}秒</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-700">{complaint.content}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span>创建时间: {complaint.createTime}</span>
                        {complaint.handlerId && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            客服工号: {complaint.handlerId} ({complaint.handler})
                          </span>
                        )}
                        {complaint.handleTime && (
                          <span>处理时间: {complaint.handleTime}</span>
                        )}
                        {complaint.satisfaction !== null && (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <Star className="w-3 h-3 fill-current" />
                            满意度: {complaint.satisfaction}/5
                          </span>
                        )}
                      </div>

                      {complaint.status === 'completed' && (
                        <div className="flex items-center gap-2 mt-3 p-2 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-700">工单已处理完成，客户满意度评分: {complaint.satisfaction}/5</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        处理工单
                      </Button>
                      {complaint.status !== 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600"
                        >
                          <PhoneCall className="w-4 h-4 mr-1" />
                          回电
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
                            <FileText className="w-4 h-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            发送短信
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            标记紧急
                          </DropdownMenuItem>
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>转接上级</DropdownMenuItem>
                          <DropdownMenuItem>标记已解决</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">删除记录</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>客诉类型分布</CardTitle>
                <CardDescription>各类客诉数量统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: '优惠未到账', count: 45, percentage: 40 },
                    { type: '活动名额用完', count: 32, percentage: 28 },
                    { type: '规则咨询', count: 20, percentage: 18 },
                    { type: '权益补偿', count: 15, percentage: 14 },
                  ].map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-900">{item.type}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{item.count} 条</span>
                          <span className="text-gray-400">({item.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>处理时效分析</CardTitle>
                <CardDescription>客诉处理响应时间</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: '首次响应', target: '30分钟', actual: '平均25分钟', status: 'good' },
                    { name: '问题解决', target: '2个工作日', actual: '平均1.5工作日', status: 'good' },
                    { name: '客户反馈', target: '12小时内', actual: '平均10小时', status: 'good' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">目标: {item.target}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-sm ${
                          item.status === 'good' ? 'text-blue-600' : 'text-blue-700'
                        }`}>
                          {item.actual}
                        </p>
                        <p className="text-xs text-gray-500">实际</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceStaffData.map((staff) => (
              <Card key={staff.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                        {staff.avatar}
                      </div>
                      <div>
                        <CardTitle className="text-base">{staff.name}</CardTitle>
                        <CardDescription className="text-xs">
                          工号: {staff.workId}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={
                      staff.status === 'online' ? 'default' : 
                      staff.status === 'busy' ? 'secondary' : 'outline'
                    }>
                      {staff.status === 'online' ? '在线' : 
                       staff.status === 'busy' ? '忙碌' : '离线'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">部门</p>
                        <p className="font-medium">{staff.department}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">等级</p>
                        <p className="font-medium">{staff.level}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">满意度</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{staff.satisfaction}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">处理工单</span>
                        <span className="font-semibold">{staff.handlingCount}单</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">平均响应</span>
                        <span className="font-semibold">{staff.avgResponseTime}秒</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <PhoneCall className="w-4 h-4" />
                        <span className="font-mono">{staff.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      消息
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <PhoneCall className="w-3 h-3 mr-1" />
                      呼叫
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>团队整体概况</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">在线客服</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {serviceStaffData.filter(s => s.status === 'online').length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">今日接听</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {serviceStaffData.reduce((sum, s) => sum + s.handlingCount, 0)}
                      </p>
                    </div>
                    <PhoneCall className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">平均响应</p>
                      <p className="text-2xl font-bold text-blue-700 mt-1">
                        {Math.round(serviceStaffData.reduce((sum, s) => sum + s.avgResponseTime, 0) / serviceStaffData.length)}秒
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-700" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">团队满意度</p>
                      <p className="text-2xl font-bold text-indigo-600 mt-1">
                        {(serviceStaffData.reduce((sum, s) => sum + s.satisfaction, 0) / serviceStaffData.length).toFixed(1)}%
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="mt-4">
          <div className="space-y-6">
            {quickResponses.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.responses.map((response) => (
                      <Card key={response.title} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{response.title}</h4>
                          <Button variant="ghost" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">{response.content}</p>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 客诉处理对话框 */}
      <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>处理客诉 - {selectedComplaint?.id}</DialogTitle>
            <DialogDescription>
              客户: {selectedComplaint?.customerName} | 类型: {selectedComplaint?.type}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm text-gray-500 mb-2 block">客诉内容</Label>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                {selectedComplaint?.content}
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-500 mb-2 block">快速回复</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择话术模板" />
                </SelectTrigger>
                <SelectContent>
                  {quickResponses.flatMap(category =>
                    category.responses.map(response => (
                      <SelectItem key={response.title} value={response.content}>
                        {response.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reply" className="text-sm text-gray-500 mb-2 block">
                回复内容
              </Label>
              <Textarea
                id="reply"
                placeholder="请输入回复内容..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedComplaint(null)}>
              取消
            </Button>
            <Button variant="outline">
              暂存
            </Button>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              发送回复
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
