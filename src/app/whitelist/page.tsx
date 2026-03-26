'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Upload, 
  Download, 
  Filter, 
  MoreVertical,
  UserPlus,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Link as LinkIcon,
  Zap
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

// 模拟白名单数据
const whitelistData = [
  {
    id: 'WL-001',
    name: '高价值客户标签',
    type: '标签匹配',
    count: 15234,
    status: 'active',
    createdAt: '2026-01-15',
    createdBy: 'admin',
    description: '月消费满5000元的客户',
    tags: ['高消费', '活跃']
  },
  {
    id: 'WL-002',
    name: '新客专享白名单',
    type: '手动导入',
    count: 5000,
    status: 'active',
    createdAt: '2026-01-18',
    createdBy: 'admin',
    description: '2026年新开卡客户',
    tags: ['新客']
  },
  {
    id: 'WL-003',
    name: '成都地区客户',
    type: '地域标签',
    count: 34567,
    status: 'active',
    createdAt: '2026-01-10',
    createdBy: 'system',
    description: '注册地或常用地为成都的客户',
    tags: ['成都']
  },
  {
    id: 'WL-004',
    name: 'VIP客户池',
    type: '卡种匹配',
    count: 6001,
    status: 'active',
    createdAt: '2026-01-05',
    createdBy: 'system',
    description: '持有钻石卡和高端白金卡的客户',
    tags: ['VIP', '钻石卡']
  },
  {
    id: 'WL-005',
    name: '测试白名单',
    type: '手动导入',
    count: 100,
    status: 'inactive',
    createdAt: '2026-01-20',
    createdBy: 'admin',
    description: '用于活动测试的白名单',
    tags: ['测试']
  },
];

const whitelistUsers = [
  {
    id: 'U001',
    name: '张三',
    cardNo: '6222****1234',
    cardType: '白金卡',
    phone: '138****5678',
    whitelistId: 'WL-001',
    addTime: '2026-01-15 10:30:00',
    status: 'active',
    lastUsed: '2026-01-20 14:23:56'
  },
  {
    id: 'U002',
    name: '李四',
    cardNo: '6222****5678',
    cardType: '钻石卡',
    phone: '139****8765',
    whitelistId: 'WL-004',
    addTime: '2026-01-05 09:15:00',
    status: 'active',
    lastUsed: '2026-01-21 09:45:23'
  },
  {
    id: 'U003',
    name: '王五',
    cardNo: '6222****9012',
    cardType: '金卡',
    phone: '137****2345',
    whitelistId: 'WL-002',
    addTime: '2026-01-18 16:20:00',
    status: 'inactive',
    lastUsed: '-'
  },
];

export default function WhitelistPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('list');

  const filteredWhitelists = whitelistData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">白名单管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理白名单用户，配置专属活动规则</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/whitelist/integration">
            <Button variant="outline" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              对接配置
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            下载列表
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                添加白名单
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建白名单</DialogTitle>
                <DialogDescription>
                  选择创建方式并配置白名单规则
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="cursor-pointer hover:border-blue-500 transition-all border-2">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Tag className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-sm">标签匹配</h3>
                      <p className="text-xs text-gray-500 mt-1">根据客户标签自动生成</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-blue-500 transition-all border-2">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-sm">批量导入</h3>
                      <p className="text-xs text-gray-500 mt-1">Excel/CSV文件导入</p>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-blue-500 transition-all border-2">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-6 h-6 text-blue-700" />
                      </div>
                      <h3 className="font-semibold text-sm">CEP触发</h3>
                      <p className="text-xs text-gray-500 mt-1">交易流水T+0触发</p>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-blue-500 transition-all border-2">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Search className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-sm">外部API</h3>
                      <p className="text-xs text-gray-500 mt-1">API接口实时同步</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">取消</Button>
                <Button>下一步</Button>
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
                <p className="text-sm text-gray-600">白名单总数</p>
                <p className="text-2xl font-bold text-gray-900">{whitelistData.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">覆盖用户</p>
                <p className="text-2xl font-bold text-blue-600">
                  {whitelistData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">生效中</p>
                <p className="text-2xl font-bold text-blue-600">
                  {whitelistData.filter(w => w.status === 'active').length}
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
                <p className="text-sm text-gray-600">已停用</p>
                <p className="text-2xl font-bold text-gray-600">
                  {whitelistData.filter(w => w.status === 'inactive').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-gray-600" />
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
                  placeholder="搜索白名单名称或ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="生成方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部方式</SelectItem>
                <SelectItem value="标签匹配">标签匹配</SelectItem>
                <SelectItem value="手动导入">手动导入</SelectItem>
                <SelectItem value="地域标签">地域标签</SelectItem>
                <SelectItem value="卡种匹配">卡种匹配</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">生效中</SelectItem>
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

      {/* 主要内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">白名单列表</TabsTrigger>
          <TabsTrigger value="users">用户明细</TabsTrigger>
          <TabsTrigger value="tags">标签管理</TabsTrigger>
          <TabsTrigger value="sync">同步记录</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWhitelists.map((whitelist) => (
              <Card key={whitelist.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{whitelist.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{whitelist.id}</CardDescription>
                    </div>
                    <Badge variant={whitelist.status === 'active' ? 'default' : 'secondary'}>
                      {whitelist.status === 'active' ? '生效中' : '已停用'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{whitelist.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">类型</span>
                      <Badge variant="outline">{whitelist.type}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">用户数</span>
                      <span className="font-semibold">{whitelist.count.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">创建时间</span>
                      <span className="text-gray-700">{whitelist.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500">标签:</span>
                      {whitelist.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      查看用户
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>编辑规则</DropdownMenuItem>
                        <DropdownMenuItem>同步用户</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">删除白名单</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户姓名</TableHead>
                  <TableHead>卡号</TableHead>
                  <TableHead>卡种</TableHead>
                  <TableHead>手机号</TableHead>
                  <TableHead>白名单</TableHead>
                  <TableHead>加入时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>最后使用</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {whitelistUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="font-mono text-sm">{user.cardNo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.cardType}</Badge>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.whitelistId}</TableCell>
                    <TableCell>{user.addTime}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status === 'active' ? '生效中' : '已停用'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastUsed}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="tags" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>标签管理</CardTitle>
              <CardDescription>管理客户标签，用于白名单匹配</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: '高消费', count: 15234, color: 'blue' },
                  { name: '活跃', count: 28456, color: 'green' },
                  { name: '新客', count: 5000, color: 'purple' },
                  { name: '成都', count: 34567, color: 'orange' },
                  { name: 'VIP', count: 6001, color: 'red' },
                  { name: '钻石卡', count: 6001, color: 'indigo' },
                ].map((tag) => (
                  <Card key={tag.name} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-${tag.color}-100 rounded-lg flex items-center justify-center`}>
                          <Tag className={`w-5 h-5 text-${tag.color}-600`} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{tag.name}</p>
                          <p className="text-xs text-gray-500">{tag.count.toLocaleString()} 用户</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  创建新标签
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>同步记录</CardTitle>
              <CardDescription>白名单用户同步历史</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, whitelist: '高价值客户标签', type: '标签匹配', time: '2026-01-20 10:00:00', status: 'success', count: 15234 },
                  { id: 2, whitelist: '新客专享白名单', type: '批量导入', time: '2026-01-18 15:30:00', status: 'success', count: 5000 },
                  { id: 3, whitelist: '成都地区客户', type: '外部API', time: '2026-01-16 09:15:00', status: 'failed', count: 0 },
                ].map((record) => (
                  <div key={record.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      record.status === 'success' ? 'bg-blue-100' : 'bg-red-100'
                    }`}>
                      {record.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{record.whitelist}</p>
                        <Badge variant="outline">{record.type}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {record.time} · 同增 {record.count} 用户
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">查看详情</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
