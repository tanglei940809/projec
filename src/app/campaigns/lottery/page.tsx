'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, HelpCircle, Eye, Plus, Trash2, Gift, RotateCw, Trophy } from 'lucide-react';
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

export default function LotteryCampaignPage() {
  const router = useRouter();
  const [prizes, setPrizes] = useState([
    { name: '一等奖', type: 'value', value: 1000, count: 10, probability: 1, color: 'red' },
    { name: '二等奖', type: 'value', value: 500, count: 50, probability: 5, color: 'yellow' },
    { name: '三等奖', type: 'value', value: 100, count: 200, probability: 15, color: 'blue' },
    { name: '参与奖', type: 'value', value: 10, count: 1000, probability: 30, color: 'gray' },
  ]);

  const totalProbability = prizes.reduce((sum, p) => sum + p.probability, 0);

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
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎰</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">抽奖活动配置</h1>
                <p className="text-sm text-gray-500 mt-1">配置抽奖活动的奖品和规则</p>
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
                  <Input placeholder="抽奖活动-新春好礼-202602" />
                </div>
                <div className="space-y-2">
                  <Label>活动编码</Label>
                  <Input placeholder="CAMP-2026-LOTTERY-001" disabled />
                </div>
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

              <div className="space-y-2">
                <Label>活动描述</Label>
                <Textarea 
                  placeholder="描述活动详情，如：新春抽奖活动，赢取最高1000元大奖"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* 奖品配置 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>奖品配置</CardTitle>
                  <CardDescription>设置奖品类型、数量和中奖概率</CardDescription>
                </div>
                {totalProbability !== 100 && (
                  <Badge variant="destructive">概率总和: {totalProbability}%</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>抽奖次数限制 <span className="text-red-500">*</span></Label>
                  <Input type="number" placeholder="3" />
                  <p className="text-xs text-gray-500">每人每日可抽奖次数</p>
                </div>

                <div className="space-y-2">
                  <Label>参与门槛</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择参与门槛" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">无需门槛</SelectItem>
                      <SelectItem value="consume">消费达标</SelectItem>
                      <SelectItem value="sign">签到活动</SelectItem>
                      <SelectItem value="points">积分兑换</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">奖品列表</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    添加奖品
                  </Button>
                </div>

                {prizes.map((prize, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 bg-${prize.color}-500 rounded-lg flex items-center justify-center text-white font-bold`}>
                            {index + 1}
                          </div>
                          <Input 
                            value={prize.name} 
                            className="w-32"
                            onChange={(e) => {
                              const newPrizes = [...prizes];
                              newPrizes[index].name = e.target.value;
                              setPrizes(newPrizes);
                            }}
                          />
                        </div>
                        {prizes.length > 1 && (
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
                          <Label>奖品类型</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="value">现金红包</SelectItem>
                              <SelectItem value="coupon">优惠券</SelectItem>
                              <SelectItem value="points">积分</SelectItem>
                              <SelectItem value="gift">实物礼品</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>奖品价值</Label>
                          <Input type="number" value={prize.value} />
                        </div>

                        <div className="space-y-2">
                          <Label>奖品数量 <span className="text-red-500">*</span></Label>
                          <Input type="number" value={prize.count} />
                        </div>

                        <div className="space-y-2">
                          <Label>中奖概率(%) <span className="text-red-500">*</span></Label>
                          <div className="space-y-2">
                            <Slider
                              value={[prize.probability]}
                              onValueChange={(value) => {
                                const newPrizes = [...prizes];
                                newPrizes[index].probability = value[0];
                                setPrizes(newPrizes);
                              }}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>0%</span>
                              <span className="font-semibold text-base">{prize.probability}%</span>
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

          {/* 规则配置 */}
          <Card>
            <CardHeader>
              <CardTitle>规则配置</CardTitle>
              <CardDescription>设置抽奖规则和限制</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>抽奖类型</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className={`p-4 cursor-pointer border-2 hover:border-yellow-500`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <RotateCw className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">转盘抽奖</h3>
                        <p className="text-xs text-gray-500 mt-1">经典转盘式抽奖</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                  </Card>

                  <Card className="p-4 cursor-pointer border-2 hover:border-yellow-500">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Gift className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">开宝箱</h3>
                        <p className="text-xs text-gray-500 mt-1">点击宝箱随机开奖</p>
                      </div>
                      <Checkbox />
                    </div>
                  </Card>

                  <Card className="p-4 cursor-pointer border-2 hover:border-yellow-500">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">九宫格抽奖</h3>
                        <p className="text-xs text-gray-500 mt-1">九宫格连线抽奖</p>
                      </div>
                      <Checkbox />
                    </div>
                  </Card>

                  <Card className="p-4 cursor-pointer border-2 hover:border-yellow-500">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Gift className="w-6 h-6 text-blue-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">刮刮乐</h3>
                        <p className="text-xs text-gray-500 mt-1">刮开涂层即可开奖</p>
                      </div>
                      <Checkbox />
                    </div>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>特殊规则</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">保底中奖</p>
                      <p className="text-xs text-gray-500">连续参与N次未中奖后必中</p>
                    </div>
                    <Checkbox />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">时段概率提升</p>
                      <p className="text-xs text-gray-500">特定时段中奖概率提升</p>
                    </div>
                    <Checkbox />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">新用户专享</p>
                      <p className="text-xs text-gray-500">新用户首次抽奖必中</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                </div>
              </div>
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
              <CardTitle className="text-base">奖品统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">奖品数量</span>
                  <span className="font-semibold">1260</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">总价值</span>
                  <span className="font-semibold">¥165,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">中奖概率总和</span>
                  <span className={`font-semibold ${totalProbability === 100 ? 'text-blue-600' : 'text-red-600'}`}>
                    {totalProbability}%
                  </span>
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
