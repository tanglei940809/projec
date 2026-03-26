'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, HelpCircle, Eye, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

export default function RandomDiscountPage() {
  const router = useRouter();
  const [probabilityConfig, setProbabilityConfig] = useState([
    { range: '1-5', amount: [1, 5], probability: 30 },
    { range: '6-10', amount: [6, 10], probability: 40 },
    { range: '11-20', amount: [11, 20], probability: 20 },
    { range: '21-30', amount: [21, 30], probability: 10 },
  ]);

  const totalProbability = probabilityConfig.reduce((sum, p) => sum + p.probability, 0);

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
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎲</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">随机立减活动配置</h1>
                <p className="text-sm text-gray-500 mt-1">配置随机立减金额范围和概率分布</p>
              </div>
            </div>
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
          <Button size="sm">
            <Eye className="w-4 h-4 mr-2" />
            预览效果
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主配置区域 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>设置活动基础信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>活动名称 <span className="text-red-500">*</span></Label>
                  <Input placeholder="随机立减-瑞幸咖啡-202602" />
                </div>
                <div className="space-y-2">
                  <Label>活动编码</Label>
                  <Input placeholder="CAMP-2026-RAND-001" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label>活动描述</Label>
                <Textarea 
                  placeholder="描述活动详情，如：瑞幸咖啡随机立减活动，消费后随机获得1-30元优惠"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>开始时间 <span className="text-red-500">*</span></Label>
                  <Input type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label>结束时间 <span className="text-red-500">*</span></Label>
                  <Input type="datetime-local" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>总预算(元) <span className="text-red-500">*</span></Label>
                  <Input type="number" placeholder="250000" />
                </div>
                <div className="space-y-2">
                  <Label>最大名额</Label>
                  <Input type="number" placeholder="50000" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 随机立减规则 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>随机立减规则</CardTitle>
                  <CardDescription>配置金额范围和概率分布</CardDescription>
                </div>
                {totalProbability !== 100 && (
                  <Badge variant="destructive">概率总和: {totalProbability}%</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>💡 提示：</strong>各档位概率总和必须等于100%。系统将根据概率随机分配优惠金额
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>消费门槛(元) <span className="text-red-500">*</span></Label>
                  <Input type="number" placeholder="10" />
                  <p className="text-xs text-gray-500">用户需达到的消费金额</p>
                </div>

                <div className="space-y-2">
                  <Label>最低优惠(元) <span className="text-red-500">*</span></Label>
                  <Input type="number" placeholder="1" />
                  <p className="text-xs text-gray-500">最低优惠金额</p>
                </div>

                <div className="space-y-2">
                  <Label>最高优惠(元) <span className="text-red-500">*</span></Label>
                  <Input type="number" placeholder="30" />
                  <p className="text-xs text-gray-500">最高优惠金额</p>
                </div>

                <div className="space-y-2">
                  <Label>平均优惠(元)</Label>
                  <Input type="number" placeholder="12.5" />
                  <p className="text-xs text-gray-500">系统自动计算平均优惠</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">概率分布配置</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    添加档位
                  </Button>
                </div>

                {probabilityConfig.map((prob, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="default">档位 {index + 1}</Badge>
                          <span className="text-sm text-gray-500">
                            {prob.range}元
                          </span>
                        </div>
                        {probabilityConfig.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>金额范围(元)</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={prob.amount[0]}
                              className="flex-1"
                            />
                            <span>-</span>
                            <Input
                              type="number"
                              value={prob.amount[1]}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>概率分布(%) <span className="text-red-500">*</span></Label>
                          <div className="space-y-2">
                            <Slider
                              value={[prob.probability]}
                              onValueChange={(value) => {
                                const newConfig = [...probabilityConfig];
                                newConfig[index].probability = value[0];
                                setProbabilityConfig(newConfig);
                              }}
                              max={100}
                              step={5}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>0%</span>
                              <span className="font-semibold text-base">{prob.probability}%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {totalProbability !== 100 && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-600">
                      ⚠️ 概率总和必须等于100%，当前总和为 {totalProbability}%
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 使用限制配置 */}
          <Card>
            <CardHeader>
              <CardTitle>使用限制配置</CardTitle>
              <CardDescription>设置活动使用频次和其他限制条件</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>单日限次</Label>
                  <Input type="number" defaultValue="3" />
                  <p className="text-xs text-gray-500">每个用户每天可参与次数</p>
                </div>

                <div className="space-y-2">
                  <Label>单月限次</Label>
                  <Input type="number" defaultValue="10" />
                  <p className="text-xs text-gray-500">每个用户每月可参与次数</p>
                </div>

                <div className="space-y-2">
                  <Label>活动总限次</Label>
                  <Input type="number" placeholder="不限制则留空" />
                  <p className="text-xs text-gray-500">整个活动可参与总次数</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>最低优惠金额(元)</Label>
                  <Input type="number" defaultValue="1" />
                  <p className="text-xs text-gray-500">最低优惠金额（保底）</p>
                </div>

                <div className="space-y-2">
                  <Label>保底概率(%)</Label>
                  <Input type="number" defaultValue="5" />
                  <p className="text-xs text-gray-500">最低优惠金额出现的概率</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>特殊规则</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">周末惊喜概率提升</p>
                      <p className="text-xs text-gray-500">周六、周日高金额概率提升10%</p>
                    </div>
                    <Checkbox />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">节假日大奖概率提升</p>
                      <p className="text-xs text-gray-500">法定节假日最高金额概率提升20%</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">新用户专享高概率</p>
                      <p className="text-xs text-gray-500">新用户高金额概率提升30%</p>
                    </div>
                    <Checkbox />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">连续参与奖励</p>
                      <p className="text-xs text-gray-500">连续参与3次以上概率逐步提升</p>
                    </div>
                    <Checkbox />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 适用范围配置 */}
          <Card>
            <CardHeader>
              <CardTitle>适用范围配置</CardTitle>
              <CardDescription>设置活动适用的卡种、商户和地区</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="card">
                <TabsList>
                  <TabsTrigger value="card">卡种配置</TabsTrigger>
                  <TabsTrigger value="merchant">商户配置</TabsTrigger>
                  <TabsTrigger value="region">地区配置</TabsTrigger>
                </TabsList>

                <TabsContent value="card" className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: '普卡', color: 'blue', description: '基础客户群体' },
                      { name: '金卡', color: 'yellow', description: '中端客户群体' },
                      { name: '白金卡', color: 'purple', description: '高端客户群体' },
                      { name: '钻石卡', color: 'red', description: 'VIP客户群体' },
                    ].map((card) => (
                      <Card key={card.name} className="p-4 cursor-pointer hover:border-green-500 transition-all border-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-8 bg-gradient-to-r from-${card.color}-500 to-${card.color}-700 rounded-md`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-sm">{card.name}</h3>
                              <Checkbox defaultChecked />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="merchant" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>适用商户</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择商户或商户类别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部商户</SelectItem>
                        <SelectItem value="petrol">加油服务</SelectItem>
                        <SelectItem value="food">餐饮茶饮</SelectItem>
                        <SelectItem value="retail">连锁零售</SelectItem>
                        <SelectItem value="ecommerce">电商平台</SelectItem>
                        <SelectItem value="service">生活服务</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="region" className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['成都市', '绵阳市', '德阳市', '宜宾市', '泸州市', '南充市', '达州市', '自贡市'].map((city) => (
                      <div key={city} className="flex items-center space-x-2 p-2 border rounded-lg">
                        <Checkbox id={`rand-${city}`} defaultChecked />
                        <Label htmlFor={`rand-${city}`} className="text-sm cursor-pointer">{city}</Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：配置面板 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
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
                  <p className="text-gray-600">概率总和必须等于100%</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">2</span>
                  </div>
                  <p className="text-gray-600">设置合理的金额范围避免用户失望</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">3</span>
                  </div>
                  <p className="text-gray-600">高低金额搭配可提升用户参与度</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">4</span>
                  </div>
                  <p className="text-gray-600">设置保底金额确保用户最低收益</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">配置预览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">概率总和</span>
                  <span className={`font-semibold ${totalProbability === 100 ? 'text-blue-600' : 'text-red-600'}`}>
                    {totalProbability}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">最高优惠</span>
                  <span className="font-semibold text-blue-600">30元</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">最低优惠</span>
                  <span className="font-semibold">1元</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">平均优惠</span>
                  <span className="font-semibold">约12.5元</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部操作栏 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              取消
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                保存草稿
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                立即发布
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
