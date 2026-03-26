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
  Play, 
  Pause,
  Eye,
  Copy,
  Download,
  Target,
  Dice5,
  Ticket,
  Gift,
  Handshake
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
import { Progress } from '@/components/ui/progress';

// 模拟活动数据
const campaignsData = [
  {
    id: 'CAMP-2026-001',
    name: '1分钱坐公交地铁',
    type: '满减',
    status: 'running',
    startTime: '2026-01-20',
    endTime: '2026-03-31',
    participants: 45230,
    budget: 500000,
    used: 447250,
    conversion: 85.2,
    channels: ['云闪付'],
    cardTypes: ['普卡', '金卡', '白金卡', '钻石卡']
  },
  {
    id: 'CAMP-2026-002',
    name: '中石油加油满200减40',
    type: '满减',
    status: 'running',
    startTime: '2026-01-18',
    endTime: '2026-02-28',
    participants: 18234,
    budget: 300000,
    used: 201900,
    conversion: 76.8,
    channels: ['微信', '支付宝'],
    cardTypes: ['金卡', '白金卡', '钻石卡']
  },
  {
    id: 'CAMP-2026-003',
    name: '瑞幸咖啡随机立减',
    type: '随机立减',
    status: 'running',
    startTime: '2026-01-15',
    endTime: '2026-04-15',
    participants: 28456,
    budget: 250000,
    used: 135500,
    conversion: 72.1,
    channels: ['微信'],
    cardTypes: ['普卡', '金卡']
  },
  {
    id: 'CAMP-2026-004',
    name: '新客办卡立减金',
    type: '卡券投放',
    status: 'paused',
    startTime: '2026-01-10',
    endTime: '2026-06-30',
    participants: 8934,
    budget: 200000,
    used: 91600,
    conversion: 68.5,
    channels: ['微信公众号'],
    cardTypes: ['普卡']
  },
  {
    id: 'CAMP-2026-005',
    name: '盒马鲜生满减券',
    type: '满减',
    status: 'draft',
    startTime: '2026-02-01',
    endTime: '2026-02-28',
    participants: 0,
    budget: 150000,
    used: 0,
    conversion: 0,
    channels: ['支付宝'],
    cardTypes: ['白金卡', '钻石卡']
  },
  {
    id: 'CAMP-2026-006',
    name: '充电桩优惠活动',
    type: '满减',
    status: 'ended',
    startTime: '2025-12-01',
    endTime: '2025-12-31',
    participants: 6543,
    budget: 100000,
    used: 98700,
    conversion: 91.2,
    channels: ['微信', '支付宝'],
    cardTypes: ['普卡', '金卡', '白金卡']
  },
];

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // 活动场景图标映射
  const scenarioIcons: Record<string, React.ElementType> = {
    discount: Target,      // 满减活动
    random: Dice5,         // 随机立减
    coupon: Ticket,        // 配券活动
    lottery: Gift,         // 抽奖活动
    invite: Handshake,     // 邀请活动
  };

  // 活动场景类型
  const activityScenarios = [
    {
      id: 'discount',
      name: '满减活动',
      icon: '🎯',
      description: '消费达标享受固定金额减免',
      color: 'blue',
      examples: ['满200减40', '满100减20', '满500减100']
    },
    {
      id: 'random',
      name: '随机立减',
      icon: '🎲',
      description: '消费达标随机享受金额优惠',
      color: 'green',
      examples: ['随机减1-10元', '随机减5-20元', '随机减10-50元']
    },
    {
      id: 'coupon',
      name: '配券活动',
      icon: '🎫',
      description: '领取配券在指定场景进行使用',
      color: 'purple',
      examples: ['代金券', '折扣券', '满减券']
    },
    {
      id: 'lottery',
      name: '抽奖活动',
      icon: '🎁',
      description: '参与抽奖赢取丰富权益奖品',
      color: 'orange',
      examples: ['积分抽奖', '消费抽奖', '节日抽奖']
    },
    {
      id: 'invite',
      name: '邀请活动',
      icon: '🤝',
      description: '邀请好友获得专属权益奖励',
      color: 'pink',
      examples: ['邀请有礼', '拼团优惠', '推荐奖励']
    },
  ];

  const filteredCampaigns = campaignsData.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || campaign.type === filterType;
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesTab = activeTab === 'all' || campaign.status === activeTab;
    return matchesSearch && matchesType && matchesStatus && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'default';
      case 'paused':
        return 'secondary';
      case 'ended':
        return 'outline';
      case 'draft':
        return 'destructive' as any;
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return '进行中';
      case 'paused':
        return '已暂停';
      case 'ended':
        return '已结束';
      case 'draft':
        return '草稿';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">活动管理</h1>
          <p className="text-sm text-gray-500 mt-1">创建和管理营销活动</p>
        </div>
        <Link href="/campaigns/create">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            创建活动
          </Button>
        </Link>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总活动数</p>
                <p className="text-2xl font-bold text-gray-900">{campaignsData.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">{campaignsData.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">进行中</p>
                <p className="text-2xl font-bold text-blue-600">
                  {campaignsData.filter(c => c.status === 'running').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {campaignsData.filter(c => c.status === 'running').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">已暂停</p>
                <p className="text-2xl font-bold text-blue-700">
                  {campaignsData.filter(c => c.status === 'paused').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-700 font-semibold">
                  {campaignsData.filter(c => c.status === 'paused').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">草稿</p>
                <p className="text-2xl font-bold text-gray-600">
                  {campaignsData.filter(c => c.status === 'draft').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-semibold">
                  {campaignsData.filter(c => c.status === 'draft').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 活动场景展示 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle>活动场景展示</CardTitle>
          <CardDescription>净蓝权益云台支持多种活动形态，满足不同营销需求</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {activityScenarios.map((scenario) => {
              const scenarioLinks: Record<string, string> = {
                'discount': '/campaigns/discount',
                'random': '/campaigns/random',
                'coupon': '/campaigns/coupon',
                'lottery': '/campaigns/lottery',
                'invite': '/campaigns/invite',
              };
              const IconComponent = scenarioIcons[scenario.id];
              return (
                <Link key={scenario.id} href={scenarioLinks[scenario.id] || '/campaigns/create'}>
                  <Card className="p-4 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-500 h-full">
                    <div className="text-center space-y-3">
                      <div className="flex justify-center items-center w-16 h-16 mx-auto bg-blue-50 rounded-lg">
                        <IconComponent className="w-10 h-10 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-sm">{scenario.name}</h3>
                      <p className="text-xs text-gray-600">{scenario.description}</p>
                      <div className="space-y-1">
                        {scenario.examples.slice(0, 2).map((example, index) => (
                          <Badge key={index} variant="outline" className="text-xs w-full justify-center">
                            {example}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full text-xs mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                        配置此场景
                      </Button>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 筛选和搜索 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索活动名称或ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="活动类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="满减">满减</SelectItem>
                <SelectItem value="随机立减">随机立减</SelectItem>
                <SelectItem value="卡券投放">卡券投放</SelectItem>
                <SelectItem value="组合优惠">组合优惠</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="活动状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="running">进行中</SelectItem>
                <SelectItem value="paused">已暂停</SelectItem>
                <SelectItem value="draft">草稿</SelectItem>
                <SelectItem value="ended">已结束</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              高级筛选
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              下载列表
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 活动列表 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">全部活动 ({campaignsData.length})</TabsTrigger>
          <TabsTrigger value="running">进行中 ({campaignsData.filter(c => c.status === 'running').length})</TabsTrigger>
          <TabsTrigger value="paused">已暂停 ({campaignsData.filter(c => c.status === 'paused').length})</TabsTrigger>
          <TabsTrigger value="draft">草稿 ({campaignsData.filter(c => c.status === 'draft').length})</TabsTrigger>
          <TabsTrigger value="ended">已结束 ({campaignsData.filter(c => c.status === 'ended').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                        <Badge 
                          variant={getStatusColor(campaign.status)}
                          className={campaign.status === 'running' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                        >
                          {getStatusText(campaign.status)}
                        </Badge>
                        <Badge variant="outline">{campaign.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">活动ID</p>
                          <p className="text-sm font-mono text-gray-700">{campaign.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">活动时间</p>
                          <p className="text-sm text-gray-700">
                            {campaign.startTime} ~ {campaign.endTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">参与人数</p>
                          <p className="text-sm font-semibold text-gray-900">{campaign.participants.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">核销率</p>
                          <p className="text-sm font-semibold text-blue-600">{campaign.conversion}%</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-gray-500">预算执行进度</p>
                          <p className="text-xs font-semibold text-gray-700">
                            ¥{campaign.used.toLocaleString()} / ¥{campaign.budget.toLocaleString()} 
                            ({((campaign.used / campaign.budget) * 100).toFixed(1)}%)
                          </p>
                        </div>
                        <Progress value={(campaign.used / campaign.budget) * 100} className="h-2" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">投放渠道:</span>
                        {campaign.channels.map((channel) => (
                          <Badge key={channel} variant="secondary" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/campaigns/${campaign.id}`}>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/campaigns/${campaign.id}/configure`}>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            配置规则
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          复制活动
                        </DropdownMenuItem>
                        {campaign.status === 'running' && (
                          <DropdownMenuItem>
                            <Pause className="w-4 h-4 mr-2" />
                            暂停活动
                          </DropdownMenuItem>
                        )}
                        {campaign.status === 'paused' && (
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" />
                            启动活动
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          删除活动
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCampaigns.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无匹配的活动</h3>
                  <p className="text-sm text-gray-500 mb-4">请尝试调整搜索条件或筛选选项</p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setFilterType('all');
                    setFilterStatus('all');
                  }}>
                    清除筛选
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
