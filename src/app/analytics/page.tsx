'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  MapPin,
  Users,
  CreditCard,
  Store,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDimension, setSelectedDimension] = useState('campaign');

  // 模拟五维分析数据
  const dimensions = [
    { id: 'campaign', name: '活动维度', icon: BarChart3 },
    { id: 'merchant', name: '商户维度', icon: Store },
    { id: 'region', name: '地域维度', icon: MapPin },
    { id: 'time', name: '时间维度', icon: Clock },
    { id: 'card', name: '卡种维度', icon: CreditCard },
  ];

  const campaignAnalysis = [
    { name: '1分钱坐公交地铁', participants: 45230, conversion: 85.2, budget: 447250, total: 500000, roi: 3.2 },
    { name: '中石油加油满200减40', participants: 18234, conversion: 76.8, budget: 201900, total: 300000, roi: 2.8 },
    { name: '瑞幸咖啡随机立减', participants: 28456, conversion: 72.1, budget: 135500, total: 250000, roi: 2.5 },
    { name: '新客办卡立减金', participants: 8934, conversion: 68.5, budget: 91600, total: 200000, roi: 2.1 },
  ];

  const cardTypeAnalysis = [
    { name: '普卡', participants: 42567, conversion: 72.3, avgAmount: 28.50, satisfaction: 85.2 },
    { name: '金卡', participants: 58432, conversion: 78.6, avgAmount: 45.20, satisfaction: 88.5 },
    { name: '白金卡', participants: 21456, conversion: 82.1, avgAmount: 68.90, satisfaction: 91.2 },
    { name: '钻石卡', participants: 6001, conversion: 86.5, avgAmount: 95.60, satisfaction: 94.5 },
  ];

  const regionAnalysis = [
    { name: '成都市', participants: 52341, conversion: 79.5, growth: 15.3 },
    { name: '绵阳市', participants: 18456, conversion: 75.2, growth: 12.8 },
    { name: '德阳市', participants: 12453, conversion: 73.8, growth: 9.5 },
    { name: '宜宾市', participants: 9876, conversion: 71.2, growth: 8.2 },
    { name: '泸州市', participants: 8534, conversion: 69.5, growth: 7.6 },
  ];

  const timeTrendData = [
    { date: '01-15', participants: 12500, conversion: 75.2, budget: 45000 },
    { date: '01-16', participants: 13200, conversion: 76.8, budget: 48000 },
    { date: '01-17', participants: 11800, conversion: 74.5, budget: 42000 },
    { date: '01-18', participants: 14500, conversion: 78.2, budget: 52000 },
    { date: '01-19', participants: 15800, conversion: 79.5, budget: 56000 },
    { date: '01-20', participants: 14200, conversion: 77.8, budget: 51000 },
    { date: '01-21', participants: 16500, conversion: 80.2, budget: 58000 },
  ];

  const keyMetrics = [
    { name: '总参与人数', value: '128,456', change: '+12.5%', trend: 'up', icon: Users },
    { name: '核销率', value: '78.4%', change: '+2.1%', trend: 'up', icon: TrendingUp },
    { name: '平均优惠金额', value: '¥28.50', change: '-1.2%', trend: 'down', icon: CreditCard },
    { name: 'ROI', value: '2.8', change: '+0.3', trend: 'up', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">数据分析</h1>
          <p className="text-sm text-gray-500 mt-1">五维交叉分析，深度洞察活动效果</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            选择时间范围
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            下载报告
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Filter className="w-4 h-4 mr-2" />
            自定义分析
          </Button>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.name}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{metric.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {metric.change}
                      </Badge>
                      <span className="text-xs text-gray-500">较上期</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 维度选择和分析 */}
      <Tabs value={selectedDimension} onValueChange={setSelectedDimension}>
        <TabsList className="grid grid-cols-5 w-full">
          {dimensions.map((dimension) => {
            const Icon = dimension.icon;
            return (
              <TabsTrigger key={dimension.id} value={dimension.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {dimension.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* 活动维度分析 */}
        <TabsContent value="campaign" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>活动转化分析</CardTitle>
                <CardDescription>各活动参与人数与核销率</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignAnalysis.map((campaign) => (
                    <div key={campaign.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{campaign.name}</span>
                        <div className="flex items-center gap-4 text-xs">
                          <span>{campaign.participants.toLocaleString()} 人</span>
                          <span className="text-blue-600 font-semibold">{campaign.conversion}%</span>
                        </div>
                      </div>
                      <Progress value={campaign.conversion} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>预算执行与ROI</CardTitle>
                <CardDescription>预算使用情况与投资回报率</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignAnalysis.map((campaign) => (
                    <div key={campaign.name} className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{campaign.name}</span>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">ROI {campaign.roi}</Badge>
                          <span className="text-gray-500">
                            ¥{campaign.budget.toLocaleString()} / ¥{campaign.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>预算执行</span>
                          <span>{((campaign.budget / campaign.total) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(campaign.budget / campaign.total) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 商户维度分析 */}
        <TabsContent value="merchant" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>商户TOP10排名</CardTitle>
              <CardDescription>按核销金额和交易笔数排序</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: '中石油四川直营', transactions: 15234, amount: 612450, growth: 15.3 },
                  { rank: 2, name: '瑞幸咖啡四川', transactions: 12890, amount: 389670, growth: 12.8 },
                  { rank: 3, name: '7-11便利店四川', transactions: 9876, amount: 245890, growth: 9.5 },
                  { rank: 4, name: '全家便利店四川', transactions: 8543, amount: 212340, growth: 8.2 },
                  { rank: 5, name: '盒马鲜生四川', transactions: 7234, amount: 198450, growth: 7.6 },
                  { rank: 6, name: '滴滴出行四川', transactions: 6521, amount: 185670, growth: 6.8 },
                  { rank: 7, name: '饿了么四川', transactions: 5432, amount: 172340, growth: 6.2 },
                  { rank: 8, name: '淘宝四川', transactions: 4567, amount: 156780, growth: 5.8 },
                  { rank: 9, name: '全家便利店四川', transactions: 3987, amount: 142350, growth: 5.3 },
                  { rank: 10, name: '三网话费充值', transactions: 3256, amount: 125890, growth: 4.9 },
                ].map((merchant) => (
                  <div key={merchant.rank} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
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
        </TabsContent>

        {/* 地域维度分析 */}
        <TabsContent value="region" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>地域热度排行</CardTitle>
                <CardDescription>各地区活动参与热度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionAnalysis.map((region) => (
                    <div key={region.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{region.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">{region.participants.toLocaleString()} 人</span>
                          <span className="text-blue-600 font-semibold">{region.conversion}%</span>
                        </div>
                      </div>
                      <Progress value={region.conversion} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>地域增长趋势</CardTitle>
                <CardDescription>各地区环比增长率</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionAnalysis.map((region) => (
                    <div key={region.name} className="flex items-center gap-4">
                      <span className="w-16 text-sm font-medium">{region.name}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-blue-600">+{region.growth}%</span>
                        </div>
                        <Progress value={region.growth} className="h-2 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 时间维度分析 */}
        <TabsContent value="time" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>时间趋势分析</CardTitle>
              <CardDescription>活动参与人数和核销率时间趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeTrendData.map((item) => (
                  <div key={item.date} className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.date}</span>
                      <div className="flex items-center gap-6">
                        <span className="text-gray-600">{item.participants.toLocaleString()} 人</span>
                        <span className="text-blue-600 font-semibold">{item.conversion}%</span>
                        <span className="text-gray-500">¥{item.budget.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>参与人数</span>
                          <span>{item.participants}</span>
                        </div>
                        <Progress value={(item.participants / 20000) * 100} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>核销率</span>
                          <span>{item.conversion}%</span>
                        </div>
                        <Progress value={item.conversion} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 卡种维度分析 */}
        <TabsContent value="card" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>卡种转化漏斗</CardTitle>
                <CardDescription>不同卡种参与和转化情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cardTypeAnalysis.map((card) => (
                    <div key={card.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{card.name}</span>
                        <div className="flex items-center gap-4 text-xs">
                          <span>{card.participants.toLocaleString()} 人</span>
                          <span className="text-blue-600 font-semibold">{card.conversion}%</span>
                        </div>
                      </div>
                      <Progress value={card.conversion} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>卡种消费与满意度</CardTitle>
                <CardDescription>平均消费金额与客户满意度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cardTypeAnalysis.map((card) => (
                    <div key={card.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-6 rounded flex-shrink-0 ${
                        card.name === '普卡' ? 'bg-blue-500' :
                        card.name === '金卡' ? 'bg-yellow-500' :
                        card.name === '白金卡' ? 'bg-purple-500' :
                        'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{card.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs">
                          <span className="text-gray-500">¥{card.avgAmount}</span>
                          <span className="text-blue-600 font-semibold">满意度 {card.satisfaction}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 完成度指标 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle>活动效果评估指标</CardTitle>
          <CardDescription>37项原子指标、12项复合KPI达标情况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: '参与率目标', current: 85, target: 80, status: 'achieved' },
              { name: '核销率目标', current: 78.4, target: 75, status: 'achieved' },
              { name: '预算执行率', current: 89.5, target: 85, status: 'achieved' },
              { name: '客户满意度', current: 88.5, target: 90, status: 'warning' },
            ].map((metric) => (
              <div key={metric.name} className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <Badge variant={metric.status === 'achieved' ? 'default' : 'secondary'}>
                    {metric.status === 'achieved' ? '已达标' : '预警'}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>当前: {metric.current}%</span>
                    <span>目标: {metric.target}%</span>
                  </div>
                  <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
