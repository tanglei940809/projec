'use client';

import { useState } from 'react';
import { 
  GitBranch, 
  Plus, 
  Settings, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function ChannelsPage() {
  const [activeTab, setActiveTab] = useState('wechat');

  const channels = [
    {
      id: 'wechat-pay',
      name: '微信支付',
      icon: '💬',
      status: 'active',
      tps: 80,
      limit: 100,
      campaigns: 5,
      transactions: 45678,
      features: ['小程序', '公众号', 'H5']
    },
    {
      id: 'alipay',
      name: '支付宝',
      icon: '📱',
      status: 'active',
      tps: 75,
      limit: 100,
      campaigns: 4,
      transactions: 38976,
      features: ['APP', '生活号']
    },
    {
      id: 'yunshanfu',
      name: '云闪付',
      icon: '💳',
      status: 'active',
      tps: 65,
      limit: 100,
      campaigns: 3,
      transactions: 28543,
      features: ['APP', '线下POS']
    },
  ];

  const strategies = [
    {
      id: 1,
      name: '高价值客户优先策略',
      channels: ['微信支付', '支付宝'],
      rules: 'VIP客户优先分配高优惠活动',
      status: 'active',
      createTime: '2026-01-15'
    },
    {
      id: 2,
      name: '地域负载均衡策略',
      channels: ['全部'],
      rules: '根据地域流量自动调整分发比例',
      status: 'active',
      createTime: '2026-01-10'
    },
    {
      id: 3,
      name: '时间分段策略',
      channels: ['微信支付'],
      rules: '早晚高峰增加预算分配',
      status: 'paused',
      createTime: '2026-01-08'
    },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">支付对接</h1>
          <p className="text-sm text-gray-500 mt-1">配置和管理支付渠道对接</p>
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          新增支付渠道
        </Button>
      </div>

      {/* 渠道配置 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {channels.map((channel) => (
            <TabsTrigger key={channel.id} value={channel.id}>
              <span className="mr-2">{channel.icon}</span>
              {channel.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {channels.map((channel) => (
          <TabsContent key={channel.id} value={channel.id} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 渠道状态 */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-2xl">{channel.icon}</span>
                          {channel.name}支付配置
                        </CardTitle>
                        <CardDescription>配置支付渠道参数和规则</CardDescription>
                      </div>
                      <Badge variant={channel.status === 'active' ? 'default' : 'secondary'}>
                        {channel.status === 'active' ? '运行中' : '已停用'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* 基础配置 */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm">基础配置</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>渠道状态</Label>
                          <div className="flex items-center gap-2">
                            <SwitchToggle checked={channel.status === 'active'} />
                            <span className="text-sm text-gray-600">
                              {channel.status === 'active' ? '已启用' : '已禁用'}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>限流值 (TPS)</Label>
                          <Input type="number" value={channel.limit} />
                        </div>
                      </div>
                    </div>

                    {/* 熔断设置 */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm">熔断设置</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>熔断阈值 (%)</Label>
                          <Input type="number" defaultValue="80" />
                        </div>
                        <div className="space-y-2">
                          <Label>恢复阈值 (%)</Label>
                          <Input type="number" defaultValue="60" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        当渠道负载达到熔断阈值时自动暂停投放，降至恢复阈值时自动恢复
                      </p>
                    </div>

                    {/* 支付活动 */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm">支付活动</h3>
                      <div className="space-y-3">
                        {['1分钱坐公交地铁', '瑞幸咖啡随机立减', '新客办卡立减金'].map((campaign) => (
                          <div key={campaign} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                              <span className="text-sm font-medium">{campaign}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">保存配置</Button>
                  </CardContent>
                </Card>
              </div>

              {/* 实时监控 */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">实时监控</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">当前TPS</span>
                        <span className="font-semibold">{channel.tps}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(channel.tps / channel.limit) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">今日交易</span>
                        <span className="font-semibold">{channel.transactions.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">关联活动</span>
                        <span className="font-semibold">{channel.campaigns} 个</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span>系统状态正常</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">支持功能</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {channel.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="mr-2 mb-2">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* 支付策略 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>支付策略管理</CardTitle>
              <CardDescription>配置自动路由和智能分发策略</CardDescription>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              新增策略
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategies.map((strategy) => (
              <div key={strategy.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{strategy.name}</h3>
                    <Badge variant={strategy.status === 'active' ? 'default' : 'secondary'}>
                      {strategy.status === 'active' ? '生效中' : '已暂停'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{strategy.rules}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>渠道: {strategy.channels.join(', ')}</span>
                    <span>创建: {strategy.createTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SwitchToggle({ checked }: { checked?: boolean }) {
  return (
    <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${
      checked ? 'bg-blue-600' : 'bg-gray-300'
    }`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`} />
    </div>
  );
}
