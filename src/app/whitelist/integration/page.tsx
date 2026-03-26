'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckCircle, 
  Copy, 
  Download, 
  Upload, 
  Code, 
  Link, 
  Database, 
  RefreshCw,
  Play,
  Pause,
  AlertCircle,
  Info,
  FileText,
  Key,
  Server,
  Clock,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

export default function WhitelistIntegrationPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [integrationType, setIntegrationType] = useState('api');

  const integrationSteps = [
    {
      id: 1,
      title: '选择对接方式',
      icon: Link,
      description: '选择适合您的白名单对接方式'
    },
    {
      id: 2,
      title: '配置参数',
      icon: Settings,
      description: '填写必要的配置参数'
    },
    {
      id: 3,
      title: '测试连接',
      icon: Zap,
      description: '测试API连接是否正常'
    },
    {
      id: 4,
      title: '完成对接',
      icon: CheckCircle,
      description: '完成配置并启用白名单'
    }
  ];

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
            <h1 className="text-2xl font-bold text-gray-900">白名单对接配置</h1>
            <p className="text-sm text-gray-500 mt-1">配置外部系统与净蓝权益云台的白名单对接</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            查看文档
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            重置配置
          </Button>
        </div>
      </div>

      {/* 步骤进度条 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {integrationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep === step.id 
                      ? 'bg-blue-600 text-white' 
                      : activeStep > step.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {activeStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className={activeStep === step.id ? 'flex-1' : 'flex-1 hidden md:block'}>
                    <p className={`font-semibold text-sm ${activeStep === step.id ? 'text-blue-600' : 'text-gray-700'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
                  </div>
                </div>
                {index < integrationSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    activeStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 主配置区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 步骤1: 选择对接方式 */}
          <Card className={activeStep === 1 ? '' : 'opacity-50'}>
            <CardHeader>
              <CardTitle>选择对接方式</CardTitle>
              <CardDescription>根据您的业务需求选择合适的对接方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                  className={`p-4 cursor-pointer border-2 transition-all ${
                    integrationType === 'api' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                  }`}
                  onClick={() => setIntegrationType('api')}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Code className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">API对接</h3>
                        {integrationType === 'api' && (
                          <Badge variant="default" className="text-xs">已选择</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        通过RESTful API实时同步白名单数据，支持增删改查操作
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>实时同步</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>双向交互</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>灵活扩展</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer border-2 transition-all ${
                    integrationType === 'file' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                  }`}
                  onClick={() => setIntegrationType('file')}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Upload className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">文件导入</h3>
                        {integrationType === 'file' && (
                          <Badge variant="default" className="text-xs">已选择</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        通过Excel/CSV文件批量导入白名单数据，适合大批量初始化
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>批量操作</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>简单易用</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>数据校验</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer border-2 transition-all ${
                    integrationType === 'database' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                  }`}
                  onClick={() => setIntegrationType('database')}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">数据库对接</h3>
                        {integrationType === 'database' && (
                          <Badge variant="default" className="text-xs">已选择</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        直接连接外部数据库，定时同步白名单数据
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-blue-600" />
                          <span>定时同步</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-blue-600" />
                          <span>数据稳定</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-blue-600" />
                          <span>自动化高</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer border-2 transition-all ${
                    integrationType === 'webhook' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                  }`}
                  onClick={() => setIntegrationType('webhook')}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Server className="w-5 h-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">Webhook推送</h3>
                        {integrationType === 'webhook' && (
                          <Badge variant="default" className="text-xs">已选择</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        通过Webhook接口接收外部系统推送的白名单变更
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>实时推送</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>事件驱动</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>低延迟</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button onClick={() => setActiveStep(2)} disabled={!integrationType}>
                  下一步
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 步骤2: 配置参数 */}
          <Card className={activeStep === 2 ? '' : 'opacity-50'}>
            <CardHeader>
              <CardTitle>配置参数</CardTitle>
              <CardDescription>填写白名单对接所需的配置参数</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic">
                <TabsList>
                  <TabsTrigger value="basic">基础配置</TabsTrigger>
                  <TabsTrigger value="advanced">高级配置</TabsTrigger>
                  <TabsTrigger value="security">安全配置</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-4 space-y-4">
                  {integrationType === 'api' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>API服务地址 <span className="text-red-500">*</span></Label>
                          <Input placeholder="https://api.example.com/whitelist" />
                          <p className="text-xs text-gray-500">外部系统API地址</p>
                        </div>

                        <div className="space-y-2">
                          <Label>API版本 <span className="text-red-500">*</span></Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择API版本" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="v1">v1.0</SelectItem>
                              <SelectItem value="v2">v2.0</SelectItem>
                              <SelectItem value="v3">v3.0</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>AppKey <span className="text-red-500">*</span></Label>
                          <div className="flex gap-2">
                            <Input type="password" placeholder="输入AppKey" />
                            <Button variant="outline" size="icon">
                              <Key className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>AppSecret <span className="text-red-500">*</span></Label>
                          <div className="flex gap-2">
                            <Input type="password" placeholder="输入AppSecret" />
                            <Button variant="outline" size="icon">
                              <Key className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>白名单ID映射</Label>
                        <Input placeholder="external_user_id" />
                        <p className="text-xs text-gray-500">外部系统用户ID在系统中的字段名称</p>
                      </div>
                    </div>
                  )}

                  {integrationType === 'file' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>文件格式 <span className="text-red-500">*</span></Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="选择文件格式" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                            <SelectItem value="xls">Excel (.xls)</SelectItem>
                            <SelectItem value="csv">CSV (.csv)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>上传模板</Label>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            下载模板
                          </Button>
                          <span className="text-xs text-gray-500">包含必填字段说明</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>上传文件</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">点击或拖拽文件上传</p>
                          <p className="text-xs text-gray-400 mt-1">支持 .xlsx, .xls, .csv 格式，最大50MB</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>数据导入方式</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="选择导入方式" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="append">追加到现有列表</SelectItem>
                            <SelectItem value="replace">替换现有列表</SelectItem>
                            <SelectItem value="update">更新现有数据</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {integrationType === 'database' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>数据库类型 <span className="text-red-500">*</span></Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择数据库类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mysql">MySQL</SelectItem>
                              <SelectItem value="postgresql">PostgreSQL</SelectItem>
                              <SelectItem value="oracle">Oracle</SelectItem>
                              <SelectItem value="sqlserver">SQL Server</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>字符集</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择字符集" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utf8">UTF-8</SelectItem>
                              <SelectItem value="gbk">GBK</SelectItem>
                              <SelectItem value="utf16">UTF-16</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>数据库地址 <span className="text-red-500">*</span></Label>
                          <Input placeholder="192.168.1.100:3306" />
                        </div>

                        <div className="space-y-2">
                          <Label>数据库名称 <span className="text-red-500">*</span></Label>
                          <Input placeholder="whitelist_db" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>用户名 <span className="text-red-500">*</span></Label>
                          <Input placeholder="输入数据库用户名" />
                        </div>

                        <div className="space-y-2">
                          <Label>密码 <span className="text-red-500">*</span></Label>
                          <Input type="password" placeholder="输入数据库密码" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>SQL查询语句</Label>
                        <Textarea 
                          placeholder="SELECT user_id, user_name, phone FROM whitelist WHERE status = 1"
                          rows={3}
                        />
                        <p className="text-xs text-gray-500">用于查询白名单数据的SQL语句</p>
                      </div>
                    </div>
                  )}

                  {integrationType === 'webhook' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Webhook URL <span className="text-red-500">*</span></Label>
                        <Input placeholder="https://your-domain.com/webhook/whitelist" />
                        <p className="text-xs text-gray-500">接收外部系统推送的URL地址</p>
                      </div>

                      <div className="space-y-2">
                        <Label>Webhook密钥</Label>
                        <div className="flex gap-2">
                          <Input type="password" placeholder="输入Webhook密钥" />
                          <Button variant="outline" size="sm">
                            生成密钥
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>事件类型</Label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">用户添加</p>
                              <p className="text-xs text-gray-500">白名单用户添加事件</p>
                            </div>
                            <Checkbox defaultChecked />
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">用户删除</p>
                              <p className="text-xs text-gray-500">白名单用户删除事件</p>
                            </div>
                            <Checkbox defaultChecked />
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">用户更新</p>
                              <p className="text-xs text-gray-500">白名单用户信息更新事件</p>
                            </div>
                            <Checkbox defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="advanced" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>同步频率</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择同步频率" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">实时同步</SelectItem>
                          <SelectItem value="5min">每5分钟</SelectItem>
                          <SelectItem value="30min">每30分钟</SelectItem>
                          <SelectItem value="1hour">每小时</SelectItem>
                          <SelectItem value="1day">每天</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>重试次数</Label>
                      <Input type="number" defaultValue="3" min="0" max="10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>超时时间(秒)</Label>
                      <Input type="number" defaultValue="30" min="1" max="300" />
                    </div>

                    <div className="space-y-2">
                      <Label>并发数</Label>
                      <Input type="number" defaultValue="5" min="1" max="20" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>错误处理</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">自动重试失败请求</p>
                          <p className="text-xs text-gray-500">同步失败时自动重试</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">失败邮件通知</p>
                          <p className="text-xs text-gray-500">同步失败时发送邮件通知</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">数据校验</p>
                          <p className="text-xs text-gray-500">同步前进行数据校验</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>IP白名单</Label>
                    <Textarea 
                      placeholder="192.168.1.100&#10;192.168.1.101&#10;10.0.0.0/24"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500">每行一个IP地址或IP段，仅允许这些IP访问</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>加密方式</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择加密方式" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aes">AES-256</SelectItem>
                          <SelectItem value="rsa">RSA-2048</SelectItem>
                          <SelectItem value="none">不加密</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>签名算法</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择签名算法" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sha256">SHA256</SelectItem>
                          <SelectItem value="md5">MD5</SelectItem>
                          <SelectItem value="hmac">HMAC-SHA256</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-yellow-800">安全提示</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          请妥善保管AppKey和AppSecret，建议定期更换。生产环境务必启用加密和签名验证。
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Separator />

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" onClick={() => setActiveStep(1)}>
                  上一步
                </Button>
                <Button onClick={() => setActiveStep(3)}>
                  下一步
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 步骤3: 测试连接 */}
          <Card className={activeStep === 3 ? '' : 'opacity-50'}>
            <CardHeader>
              <CardTitle>测试连接</CardTitle>
              <CardDescription>测试白名单对接配置是否正常工作</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-sm">连接测试</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">测试与外部系统的网络连接</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    开始测试
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-sm">数据测试</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">测试数据读写操作是否正常</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    开始测试
                  </Button>
                </Card>
              </div>

              <div className="space-y-3">
                <Label>测试结果</Label>
                <Card className="p-4 bg-gray-50">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">连接状态</span>
                      <Badge variant="default" className="bg-blue-600">连接成功</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">响应时间</span>
                      <span className="text-sm font-semibold">156ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">数据读取</span>
                      <Badge variant="default" className="bg-blue-600">成功</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">数据写入</span>
                      <Badge variant="default" className="bg-blue-600">成功</Badge>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" onClick={() => setActiveStep(2)}>
                  上一步
                </Button>
                <Button onClick={() => setActiveStep(4)}>
                  下一步
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 步骤4: 完成对接 */}
          <Card className={activeStep === 4 ? '' : 'opacity-50'}>
            <CardHeader>
              <CardTitle>完成对接</CardTitle>
              <CardDescription>完成白名单对接配置并启用</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">配置已完成</p>
                    <p className="text-sm text-green-700 mt-1">
                      白名单对接配置已成功完成，点击下方按钮启用对接服务。
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>配置摘要</Label>
                <Card className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">对接方式</p>
                      <p className="font-semibold">{integrationType === 'api' ? 'API对接' : integrationType === 'file' ? '文件导入' : integrationType === 'database' ? '数据库对接' : 'Webhook推送'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">同步频率</p>
                      <p className="font-semibold">实时同步</p>
                    </div>
                    <div>
                      <p className="text-gray-500">加密方式</p>
                      <p className="font-semibold">AES-256</p>
                    </div>
                    <div>
                      <p className="text-gray-500">签名算法</p>
                      <p className="font-semibold">SHA256</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Info className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-gray-700">
                  启用后将开始同步白名单数据，请确保外部系统正常运行。
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" onClick={() => setActiveStep(3)}>
                  上一步
                </Button>
                <Button onClick={() => router.push('/whitelist')}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  完成并启用
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：帮助信息 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">快速帮助</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">1</span>
                  </div>
                  <p className="text-gray-600">选择适合的对接方式</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">2</span>
                  </div>
                  <p className="text-gray-600">填写正确的配置参数</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">3</span>
                  </div>
                  <p className="text-gray-600">测试连接是否正常</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">4</span>
                  </div>
                  <p className="text-gray-600">启用对接服务</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">对接文档</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  API接口文档
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  下载SDK
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Code className="w-4 h-4 mr-2" />
                  查看示例代码
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">联系支持</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">如遇到问题，请联系技术支持</p>
                <p className="text-blue-600">support@example.com</p>
                <p className="text-blue-600">400-XXX-XXXX</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
