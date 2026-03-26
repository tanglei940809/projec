'use client';

import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  ChevronRight
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

export default function SettlementPage() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchQuery, setSearchQuery] = useState('');

  const transactions = [
    {
      id: 'TXN-20260121-0001',
      orderNo: 'ORD-789456123',
      customerId: 'U001',
      cardNo: '6222****1234',
      merchant: '中石油成都高新店',
      amount: 200.00,
      discount: 40.00,
      actualAmount: 160.00,
      campaign: '中石油加油满200减40',
      channel: '微信支付',
      status: 'success',
      time: '2026-01-21 14:23:56',
      checkStatus: 'checked'
    },
    {
      id: 'TXN-20260121-0002',
      orderNo: 'ORD-789456124',
      customerId: 'U002',
      cardNo: '6222****5678',
      merchant: '瑞幸咖啡春熙路店',
      amount: 28.00,
      discount: 8.50,
      actualAmount: 19.50,
      campaign: '瑞幸咖啡随机立减',
      channel: '微信支付',
      status: 'success',
      time: '2026-01-21 14:15:32',
      checkStatus: 'checked'
    },
    {
      id: 'TXN-20260121-0003',
      orderNo: 'ORD-789456125',
      customerId: 'U003',
      cardNo: '6222****9012',
      merchant: '云闪付公交',
      amount: 3.00,
      discount: 2.99,
      actualAmount: 0.01,
      campaign: '1分钱坐公交地铁',
      channel: '云闪付',
      status: 'success',
      time: '2026-01-21 14:08:15',
      checkStatus: 'checked'
    },
    {
      id: 'TXN-20260121-0004',
      orderNo: 'ORD-789456126',
      customerId: 'U004',
      cardNo: '6222****3456',
      merchant: '7-11便利店',
      amount: 45.00,
      discount: 15.00,
      actualAmount: 30.00,
      campaign: '盒马鲜生满减券',
      channel: '支付宝',
      status: 'pending',
      time: '2026-01-21 14:05:48',
      checkStatus: 'checking'
    },
    {
      id: 'TXN-20260121-0005',
      orderNo: 'ORD-789456127',
      customerId: 'U005',
      cardNo: '6222****7890',
      merchant: '滴滴出行',
      amount: 56.00,
      discount: 12.00,
      actualAmount: 44.00,
      campaign: '新客办卡立减金',
      channel: '微信支付',
      status: 'failed',
      time: '2026-01-21 14:02:21',
      checkStatus: 'error'
    },
  ];

  const reconciliationData = [
    {
      date: '2026-01-21',
      totalTransactions: 15234,
      successRate: 98.5,
      totalAmount: 456789.00,
      totalDiscount: 128456.00,
      checkStatus: 'success',
      difference: 0
    },
    {
      date: '2026-01-20',
      totalTransactions: 14892,
      successRate: 97.8,
      totalAmount: 445234.00,
      totalDiscount: 125678.00,
      checkStatus: 'success',
      difference: 0
    },
    {
      date: '2026-01-19',
      totalTransactions: 14567,
      successRate: 99.2,
      totalAmount: 438901.00,
      totalDiscount: 124890.00,
      checkStatus: 'warning',
      difference: 15.50
    },
    {
      date: '2026-01-18',
      totalTransactions: 14234,
      successRate: 98.9,
      totalAmount: 432456.00,
      totalDiscount: 123456.00,
      checkStatus: 'success',
      difference: 0
    },
  ];

  const summaryStats = [
    {
      name: '今日交易笔数',
      value: '15,234',
      change: '+5.2%',
      icon: FileText,
      color: 'blue'
    },
    {
      name: '今日核销金额',
      value: '¥456,789',
      change: '+8.3%',
      icon: CheckCircle,
      color: 'green'
    },
    {
      name: '今日优惠金额',
      value: '¥128,456',
      change: '+7.5%',
      icon: RefreshCw,
      color: 'purple'
    },
    {
      name: '成功率',
      value: '98.5%',
      change: '+0.3%',
      icon: AlertTriangle,
      color: 'orange'
    },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">核销管理</h1>
          <p className="text-sm text-gray-500 mt-1">交易流水监控和对账管理</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新数据
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            下载报表
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="default" className="text-xs">{stat.change}</Badge>
                      <span className="text-xs text-gray-500">较昨日</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
                  placeholder="搜索订单号、卡号..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select defaultValue="today">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">今日</SelectItem>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="success">成功</SelectItem>
                <SelectItem value="pending">处理中</SelectItem>
                <SelectItem value="failed">失败</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              高级筛选
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 主要内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="transactions">交易流水</TabsTrigger>
          <TabsTrigger value="reconciliation">对账明细</TabsTrigger>
          <TabsTrigger value="consistency">核对校验记录</TabsTrigger>
        </TabsList>

        {/* 交易流水 */}
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>交易ID</TableHead>
                  <TableHead>订单号</TableHead>
                  <TableHead>客户信息</TableHead>
                  <TableHead>商户</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead>优惠</TableHead>
                  <TableHead>活动</TableHead>
                  <TableHead>渠道</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>对账状态</TableHead>
                  <TableHead>时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                    <TableCell className="font-mono text-sm">{txn.orderNo}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{txn.customerId}</p>
                        <p className="text-xs text-gray-500">{txn.cardNo}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{txn.merchant}</TableCell>
                    <TableCell className="text-sm">
                      <div className="space-y-1">
                        <p className="font-semibold">¥{txn.actualAmount.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 line-through">¥{txn.amount.toFixed(2)}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-blue-600">
                      -¥{txn.discount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-blue-600">{txn.campaign}</TableCell>
                    <TableCell>{txn.channel}</TableCell>
                    <TableCell>
                      <Badge variant={txn.status === 'success' ? 'default' : txn.status === 'pending' ? 'secondary' : 'destructive'}>
                        {txn.status === 'success' ? '成功' : txn.status === 'pending' ? '处理中' : '失败'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={txn.checkStatus === 'checked' ? 'default' : txn.checkStatus === 'checking' ? 'secondary' : 'destructive'}>
                        {txn.checkStatus === 'checked' ? '已对账' : txn.checkStatus === 'checking' ? '对账中' : '异常'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{txn.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* 对账明细 */}
        <TabsContent value="reconciliation" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>每日对账汇总</CardTitle>
              <CardDescription>按日期汇总的交易和对账信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reconciliationData.map((data) => (
                  <Card key={data.date} className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{data.date}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={data.checkStatus === 'success' ? 'default' : data.checkStatus === 'warning' ? 'secondary' : 'destructive'}>
                            {data.checkStatus === 'success' ? '对账成功' : data.checkStatus === 'warning' ? '有差异' : '对账失败'}
                          </Badge>
                          {data.difference > 0 && (
                            <span className="text-sm text-blue-600">差异: ¥{data.difference.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        查看详情
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">交易笔数</p>
                        <p className="text-lg font-semibold">{data.totalTransactions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">成功率</p>
                        <p className="text-lg font-semibold text-blue-600">{data.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">核销金额</p>
                        <p className="text-lg font-semibold">¥{data.totalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">优惠金额</p>
                        <p className="text-lg font-semibold text-blue-600">¥{data.totalDiscount.toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 核对校验记录 */}
        <TabsContent value="consistency" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>核对校验规则</CardTitle>
                <CardDescription>配置自动校验规则和阈值</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">订单金额一致性</span>
                    <Badge variant="default">已启用</Badge>
                  </div>
                  <p className="text-xs text-gray-500">校验订单金额与商户结算金额是否一致</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">优惠金额准确性</span>
                    <Badge variant="default">已启用</Badge>
                  </div>
                  <p className="text-xs text-gray-500">校验优惠金额与活动规则是否匹配</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">卡种权限验证</span>
                    <Badge variant="default">已启用</Badge>
                  </div>
                  <p className="text-xs text-gray-500">验证用户卡种是否符合活动规则</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">地域限制检查</span>
                    <Badge variant="secondary">已禁用</Badge>
                  </div>
                  <p className="text-xs text-gray-500">检查交易地域是否符合活动限制</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>校验结果统计</CardTitle>
                <CardDescription>最近7天核对校验结果</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: '2026-01-21', total: 15234, passed: 15180, failed: 54, rate: 99.6 },
                    { date: '2026-01-20', total: 14892, passed: 14845, failed: 47, rate: 99.7 },
                    { date: '2026-01-19', total: 14567, passed: 14512, failed: 55, rate: 99.6 },
                    { date: '2026-01-18', total: 14234, passed: 14195, failed: 39, rate: 99.7 },
                  ].map((result) => (
                    <div key={result.date} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{result.date}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500">{result.total} 笔</span>
                          <span className="text-blue-600">{result.passed} 通过</span>
                          <span className="text-red-600">{result.failed} 失败</span>
                          <span className="font-semibold">{result.rate}%</span>
                        </div>
                      </div>
                      <Progress value={result.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
