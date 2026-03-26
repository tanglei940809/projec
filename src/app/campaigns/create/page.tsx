'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Target,
  Dice5,
  Ticket,
  Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// 六段式流程步骤
const flowSteps = [
  { id: 1, title: '基本信息', description: '设置活动基础信息' },
  { id: 2, title: '选择活动类型', description: '选择权益类型' },
  { id: 3, title: '配置规则', description: '设置活动规则参数' },
  { id: 4, title: '投放渠道', description: '选择投放渠道' },
  { id: 5, title: '卡种配置', description: '设置适用卡种' },
  { id: 6, title: '预览发布', description: '确认并发布' },
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [saveAsDraft, setSaveAsDraft] = useState(false);

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
            <h1 className="text-2xl font-bold text-gray-900">创建新活动</h1>
            <p className="text-sm text-gray-500 mt-1">六段式流程编排，快速配置营销活动</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <HelpCircle className="w-4 h-4 mr-2" />
            配置指南
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            保存草稿
          </Button>
          <Button size="sm" className={currentStep === 6 ? '' : 'hidden'}>
            <Eye className="w-4 h-4 mr-2" />
            预览效果
          </Button>
        </div>
      </div>

      {/* 流程进度指示器 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {flowSteps.map((step) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div className={`flex flex-col items-center flex-1 ${step.id < flowSteps.length ? 'relative' : ''}`}>
                  {/* 进度线 */}
                  {step.id < flowSteps.length && (
                    <div className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${
                      step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                  
                  {/* 步骤圆圈 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step.id === currentStep ? 'bg-blue-600 text-white scale-110' :
                    step.id < currentStep ? 'bg-blue-600 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {step.id < currentStep ? '✓' : step.id}
                  </div>
                  
                  {/* 步骤标题 */}
                  <div className="mt-2 text-center">
                    <p className={`font-medium text-sm ${
                      step.id === currentStep ? 'text-blue-600' :
                      step.id < currentStep ? 'text-gray-900' :
                      'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                  </div>
                </div>
                
                {step.id < flowSteps.length && (
                  <div className="flex-shrink-0">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 步骤内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：配置区域 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {flowSteps.find(s => s.id === currentStep)?.title}
              </CardTitle>
              <CardDescription>
                {flowSteps.find(s => s.id === currentStep)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 步骤1: 基本信息 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="campaignName">活动名称 <span className="text-red-500">*</span></Label>
                      <Input id="campaignName" placeholder="请输入活动名称" />
                      <p className="text-xs text-gray-500">建议名称：满减-中石油加油-202602</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="campaignCode">活动编码</Label>
                      <Input id="campaignCode" placeholder="自动生成" disabled value="CAMP-2026-XXX" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaignDesc">活动描述</Label>
                    <Textarea 
                      id="campaignDesc" 
                      placeholder="请输入活动描述..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">开始时间 <span className="text-red-500">*</span></Label>
                      <Input id="startDate" type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">结束时间 <span className="text-red-500">*</span></Label>
                      <Input id="endDate" type="datetime-local" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalBudget">总预算(元) <span className="text-red-500">*</span></Label>
                      <Input id="totalBudget" type="number" placeholder="请输入预算金额" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxQuota">最大名额</Label>
                      <Input id="maxQuota" type="number" placeholder="不限制则留空" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>适用地区</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['成都市', '绵阳市', '德阳市', '宜宾市', '泸州市', '南充市', '达州市', '自贡市'].map((city) => (
                        <div key={city} className="flex items-center space-x-2">
                          <Checkbox id={city} defaultChecked={city === '成都市'} />
                          <Label htmlFor={city} className="text-sm">{city}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 步骤2: 选择活动类型 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                            <Target className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">满减活动</h3>
                            <p className="text-sm text-gray-600 mb-3">
                              用户消费达到指定金额，自动享受固定优惠减免
                            </p>
                            <Badge variant="secondary">推荐</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                            <Dice5 className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">随机立减</h3>
                            <p className="text-sm text-gray-600 mb-3">
                              用户消费达标后，随机获得不同金额的优惠
                            </p>
                            <Badge variant="secondary">热门</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                            <Ticket className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">配券活动</h3>
                            <p className="text-sm text-gray-600 mb-3">
                              向指定用户发放代金券、折扣券等权益券
                            </p>
                            <Badge variant="secondary">常用</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                            <Gift className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">组合优惠</h3>
                            <p className="text-sm text-gray-600 mb-3">
                              满减+随机立减、配券+满减等组合规则
                            </p>
                            <Badge variant="secondary">高级</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* 步骤3: 配置规则 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList>
                      <TabsTrigger value="basic">基本规则</TabsTrigger>
                      <TabsTrigger value="threshold">满减门槛</TabsTrigger>
                      <TabsTrigger value="discount">优惠设置</TabsTrigger>
                      <TabsTrigger value="limit">限制条件</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>触发类型</Label>
                          <RadioGroup defaultValue="payment">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="payment" id="payment" />
                              <Label htmlFor="payment">支付时触发</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="manual" id="manual" />
                                  <Label htmlFor="manual">手动领取</Label>
                                </div>
                              </RadioGroup>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>等级排序</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择等级" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1级</SelectItem>
                                  <SelectItem value="2">2级</SelectItem>
                                  <SelectItem value="3">3级</SelectItem>
                                  <SelectItem value="4">4级</SelectItem>
                                  <SelectItem value="5">5级</SelectItem>
                                  <SelectItem value="6">6级</SelectItem>
                                  <SelectItem value="7">7级</SelectItem>
                                  <SelectItem value="8">8级</SelectItem>
                                  <SelectItem value="9">9级</SelectItem>
                                  <SelectItem value="10">10级</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="threshold" className="space-y-4 mt-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <Label className="text-base font-semibold">满减金额</Label>
                                <p className="text-xs text-gray-500 mt-1">用户消费达到该金额即可触发优惠</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">满</span>
                                <Input type="number" className="w-32" placeholder="200" />
                                <span className="text-gray-500">元</span>
                              </div>
                            </div>
                            
                            <Button variant="outline" size="sm" className="w-full">
                              <Plus className="w-4 h-4 mr-2" />
                              添加更多门槛档位
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="discount" className="space-y-4 mt-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <Label className="text-base font-semibold">优惠金额</Label>
                                <p className="text-xs text-gray-500 mt-1">优惠减免的具体金额</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">减</span>
                                <Input type="number" className="w-32" placeholder="40" />
                                <span className="text-gray-500">元</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <Label className="text-base font-semibold">单日限次</Label>
                                <p className="text-xs text-gray-500 mt-1">每个用户每天可享受的次数</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Input type="number" className="w-32" placeholder="2" defaultValue="2" />
                                <span className="text-gray-500">次/天</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <Label className="text-base font-semibold">单月限次</Label>
                                <p className="text-xs text-gray-500 mt-1">每个用户每月可享受的次数</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Input type="number" className="w-32" placeholder="5" defaultValue="5" />
                                <span className="text-gray-500">次/月</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="limit" className="space-y-4 mt-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label>最高优惠上限</Label>
                              <div className="flex items-center gap-2">
                                <Input type="number" className="w-32" placeholder="2.99" />
                                <span className="text-gray-500">元</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label>最低消费金额</Label>
                              <div className="flex items-center gap-2">
                                <Input type="number" className="w-32" placeholder="0.01" />
                                <span className="text-gray-500">元</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox id="excluded" />
                              <Label htmlFor="excluded">排除特殊商户类别</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox id="weekend" />
                              <Label htmlFor="weekend">周末双倍优惠</Label>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}

                  {/* 步骤4: 投放渠道 */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all border-2 border-blue-500 bg-blue-50">
                          <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-3xl">💬</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">微信支付</h3>
                            <p className="text-xs text-gray-600">支持小程序、公众号、H5</p>
                            <Badge className="mt-3" variant="default">已选择</Badge>
                          </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all border-2">
                          <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-3xl">📱</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">支付宝</h3>
                            <p className="text-xs text-gray-600">支持APP、生活号</p>
                            <Button variant="outline" size="sm" className="mt-3">选择</Button>
                          </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all border-2">
                          <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-3xl">💳</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">云闪付</h3>
                            <p className="text-xs text-gray-600">支持APP、线下POS</p>
                            <Button variant="outline" size="sm" className="mt-3">选择</Button>
                          </CardContent>
                        </Card>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>限流设置</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">每秒限流(TPS)</Label>
                            <Input type="number" placeholder="100" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">熔断阈值(%)</Label>
                            <Input type="number" placeholder="80" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          设置限流和熔断机制，防止活动突发流量导致系统压力
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 步骤5: 卡种配置 */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="p-4 hover:border-blue-500 transition-all border-2 border-blue-500">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">普卡</h3>
                                <Badge variant="default">已选择</Badge>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">基础客户群体</p>
                            </div>
                            <Checkbox checked />
                          </div>
                        </Card>

                        <Card className="p-4 hover:border-blue-500 transition-all border-2 border-blue-500">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-md"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">金卡</h3>
                                <Badge variant="default">已选择</Badge>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">中端客户群体</p>
                            </div>
                            <Checkbox checked />
                          </div>
                        </Card>

                        <Card className="p-4 hover:border-blue-500 transition-all border-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-md"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">白金卡</h3>
                                <Badge variant="secondary">未选择</Badge>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">高端客户群体</p>
                            </div>
                            <Checkbox />
                          </div>
                        </Card>

                        <Card className="p-4 hover:border-blue-500 transition-all border-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-md"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">钻石卡</h3>
                                <Badge variant="secondary">未选择</Badge>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">VIP客户群体</p>
                            </div>
                            <Checkbox />
                          </div>
                        </Card>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>特殊规则</Label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">白名单用户优先</p>
                              <p className="text-xs text-gray-500">白名单用户可享受更高优惠或优先参与</p>
                            </div>
                            <Switch />
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">老客回馈</p>
                              <p className="text-xs text-gray-500">持卡满1年用户享受额外优惠</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 步骤6: 预览发布 */}
                  {currentStep === 6 && (
                    <div className="space-y-6">
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xl">✓</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">活动配置完成</h3>
                              <p className="text-sm text-gray-600">请仔细核对以下信息，确认无误后发布</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <ScrollArea className="h-[400px]">
                        <div className="space-y-4 pr-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-500">活动名称</Label>
                              <p className="font-semibold">中石油加油满200减40</p>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-500">活动编码</Label>
                              <p className="font-mono">CAMP-2026-XXX</p>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-500">活动类型</Label>
                              <Badge variant="default">满减</Badge>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-500">投放渠道</Label>
                              <div className="flex gap-2">
                                <Badge variant="secondary">微信</Badge>
                                <Badge variant="secondary">支付宝</Badge>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-500">活动时间</Label>
                              <p className="font-mono">2026-02-01 ~ 2026-02-28</p>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-500">总预算</Label>
                              <p className="font-semibold">¥300,000</p>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">适用卡种</Label>
                            <div className="flex gap-2">
                              <Badge variant="outline">普卡</Badge>
                              <Badge variant="outline">金卡</Badge>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label className="text-sm text-gray-500">活动规则</Label>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                              <p className="text-sm">• 满200元减40元</p>
                              <p className="text-sm">• 单日限2次，单月限5次</p>
                              <p className="text-sm">• 最高优惠上限2.99元</p>
                              <p className="text-sm">• 限流100 TPS，熔断阈值80%</p>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  )}
            </CardContent>
          </Card>
        </div>

        {/* 右侧：操作面板 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                预览效果
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Save className="w-4 h-4 mr-2" />
                保存草稿
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                查看帮助
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">配置提示</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">1</span>
                  </div>
                  <p className="text-gray-600">活动名称建议包含商户和活动类型，便于检索</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">2</span>
                  </div>
                  <p className="text-gray-600">设置合理的限流值，避免系统过载</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">3</span>
                  </div>
                  <p className="text-gray-600">活动发布后可通过规则配置页面调整参数</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部导航按钮 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              上一步
            </Button>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>步骤 {currentStep}</span>
              <span>/</span>
              <span>共 6 步</span>
            </div>

            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                if (currentStep < 6) {
                  setCurrentStep(currentStep + 1);
                } else {
                  // 发布活动
                  router.push('/campaigns');
                }
              }}
            >
              {currentStep === 6 ? '立即发布' : '下一步'}
              {currentStep < 6 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Switch({ checked }: { checked?: boolean }) {
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
