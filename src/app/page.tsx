'use client';

import { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Calendar,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // 模拟数据
  const stats = [
    {
      title: '参与人数',
      value: '128,456',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      description: '较昨日增加',
      color: 'blue'
    },
    {
      title: '核销金额',
      value: '¥2,847,392',
      change: '+8.3%',
      trend: 'up',
      icon: CreditCard,
      description: '累计优惠金额',
      color: 'green'
    },
    {
      title: '核销率',
      value: '78.4%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      description: '活动整体转化',
      color: 'emerald'
    },
    {
      title: '异常预警',
      value: '3',
      change: '-1',
      trend: 'down',
      icon: AlertTriangle,
      description: '待处理',
      color: 'orange'
    },
  ];

  const activeCampaigns = [
    {
      id: 1,
      name: '1分钱坐公交地铁',
      type: '满减',
      status: 'running',
      participants: 45230,
      conversion: 85.2,
      budget: 89.5,
      startTime: '2026-01-20'
    },
    {
      id: 2,
      name: '中石油加油满200减40',
      type: '满减',
      status: 'running',
      participants: 18234,
      conversion: 76.8,
      budget: 67.3,
      startTime: '2026-01-18'
    },
    {
      id: 3,
      name: '瑞幸咖啡随机立减',
      type: '随机立减',
      status: 'running',
      participants: 28456,
      conversion: 72.1,
      budget: 54.2,
      startTime: '2026-01-15'
    },
    {
      id: 4,
      name: '新客办卡立减金',
      type: '卡券投放',
      status: 'paused',
      participants: 8934,
      conversion: 68.5,
      budget: 45.8,
      startTime: '2026-01-10'
    },
  ];

  const cardTypeStats = [
    { name: '普卡', count: 42567, percentage: 33.2, color: 'bg-blue-500' },
    { name: '金卡', count: 58432, percentage: 45.5, color: 'bg-yellow-500' },
    { name: '白金卡', count: 21456, percentage: 16.7, color: 'bg-purple-500' },
    { name: '钻石卡', count: 6001, percentage: 4.6, color: 'bg-red-500' },
  ];

  const topMerchants = [
    { rank: 1, name: '中石油四川', transactions: 15234, amount: 612450, growth: 15.3 },
    { rank: 2, name: '瑞幸咖啡四川', transactions: 12890, amount: 389670, growth: 12.8 },
    { rank: 3, name: '7-11便利店', transactions: 9876, amount: 245890, growth: 9.5 },
    { rank: 4, name: '全家便利店', transactions: 8543, amount: 212340, growth: 8.2 },
    { rank: 5, name: '盒马鲜生', transactions: 7234, amount: 198450, growth: 7.6 },
  ];

  const alerts = [
    { 
      id: 1, 
      type: 'warning', 
      title: '预算即将耗尽', 
      message: '中石油加油活动预算已使用95%，建议追加预算', 
      time: '10分钟前',
      action: '立即处理'
    },
    { 
      id: 2, 
      type: 'error', 
      title: '系统响应超时', 
      message: '核销网关响应时间超过阈值(2s)，当前平均响应3.5s', 
      time: '25分钟前',
      action: '查看详情'
    },
    { 
      id: 3, 
      type: 'info', 
      title: '活动名额调整', 
      message: '1分钱公交活动今日名额已用完，已自动启用明日名额', 
      time: '1小时前',
      action: '已处理'
    },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">数据监控看板</h1>
          <p className="text-sm text-gray-500 mt-1">净蓝权益云台 - 实时监控活动数据，快速响应异常情况</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            筛选条件
          </Button>
          <Button size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            下载报表
          </Button>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-gray-500">{stat.description}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：活动列表和卡种分析 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 活动列表 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>活动执行监控</CardTitle>
                  <CardDescription>实时跟踪活动执行情况</CardDescription>
                </div>
                <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <TabsList>
                    <TabsTrigger value="today">今日</TabsTrigger>
                    <TabsTrigger value="week">本周</TabsTrigger>
                    <TabsTrigger value="month">本月</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <Badge variant={campaign.status === 'running' ? 'default' : 'secondary'}>
                          {campaign.status === 'running' ? '进行中' : '已暂停'}
                        </Badge>
                        <Badge variant="outline">{campaign.type}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">参与人数</p>
                          <p className="font-semibold">{campaign.participants.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">核销率</p>
                          <p className="font-semibold">{campaign.conversion}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">预算执行</p>
                          <p className="font-semibold">{campaign.budget}%</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={campaign.budget} className="h-2" />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      查看详情
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 卡种转化分析 */}
          <Card>
            <CardHeader>
              <CardTitle>卡种转化漏斗</CardTitle>
              <CardDescription>不同卡种权益使用情况分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cardTypeStats.map((card) => (
                  <div key={card.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">{card.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{card.count.toLocaleString()} 人</span>
                        <span className="text-gray-400">{card.percentage}%</span>
                      </div>
                    </div>
                    <Progress value={card.percentage} className="h-3">
                      <div className={`h-full ${card.color} rounded-full`} />
                    </Progress>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：预警和商户排行 */}
        <div className="space-y-6">
          {/* 异常预警 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                异常预警
              </CardTitle>
              <CardDescription>需要立即处理的问题</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'error' ? 'border-red-500 bg-red-50' :
                      alert.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-sm">{alert.title}</h4>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{alert.message}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        {alert.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* 商户TOP5 */}
          <Card>
            <CardHeader>
              <CardTitle>商户TOP5排名</CardTitle>
              <CardDescription>核销金额排行</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topMerchants.map((merchant) => (
                  <div key={merchant.rank} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      merchant.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                      merchant.rank === 2 ? 'bg-gray-100 text-gray-600' :
                      merchant.rank === 3 ? 'bg-blue-200 text-blue-700' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {merchant.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">{merchant.name}</p>
                      <p className="text-xs text-gray-500">
                        {merchant.transactions.toLocaleString()} 笔 · ¥{merchant.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-blue-600">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        +{merchant.growth}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 地域热力图 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                地域热度
              </CardTitle>
              <CardDescription>各地区活动参与情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { region: '成都市', heat: 95, participants: 52341 },
                  { region: '绵阳市', heat: 78, participants: 18456 },
                  { region: '德阳市', heat: 65, participants: 12453 },
                  { region: '宜宾市', heat: 52, participants: 9876 },
                  { region: '泸州市', heat: 45, participants: 8534 },
                ].map((item) => (
                  <div key={item.region} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-16 text-gray-900">{item.region}</span>
                    <Progress value={item.heat} className="flex-1 h-2" />
                    <span className="text-xs text-gray-500 w-16 text-right">{item.participants.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
