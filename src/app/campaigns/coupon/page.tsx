'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, HelpCircle, Eye, Plus, Trash2, Ticket, Film, Bike, ShoppingCart, Gift, Plane, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

// 卡券类型定义
const couponTypes = [
  {
    id: 'movie',
    name: '电影券',
    icon: Film,
    description: '享受电影观影优惠',
    color: 'red',
    examples: ['2D电影通兑券', '3D电影通兑券', 'IMAX电影券']
  },
  {
    id: 'bike',
    name: '单车券',
    icon: Bike,
    description: '共享单车骑行优惠',
    color: 'green',
    examples: ['月卡骑行券', '日卡骑行券', '单次骑行券']
  },
  {
    id: 'jdcard',
    name: '京东E卡',
    icon: ShoppingCart,
    description: '京东商城购物抵用',
    color: 'orange',
    examples: ['50元E卡', '100元E卡', '200元E卡']
  },
  {
    id: 'gift',
    name: '礼品券',
    icon: Gift,
    description: '兑换指定礼品',
    color: 'purple',
    examples: ['星巴克券', '麦当劳券', '奶茶券']
  },
  {
    id: 'travel',
    name: '出行券',
    icon: Plane,
    description: '机票、火车票优惠',
    color: 'blue',
    examples: ['机票立减券', '火车票抵扣券', '打车券']
  },
  {
    id: 'car',
    name: '用车券',
    icon: Car,
    description: '用车服务优惠',
    color: 'indigo',
    examples: ['洗车券', '加油券', '停车券']
  },
];

export default function CouponCampaignPage() {
  const router = useRouter();
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

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
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎫</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">配券活动配置</h1>
                <p className="text-sm text-gray-500 mt-1">配置代金券、折扣券等卡券发放规则</p>
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
                  <Input placeholder="卡券投放-盒马满减券-202602" />
                </div>
                <div className="space-y-2">
                  <Label>活动编码</Label>
                  <Input placeholder="CAMP-2026-COUP-001" disabled />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>总预算(元) <span className="text-red-500">*</span></Label>
                  <Input type="number" placeholder="200000" />
                </div>
                <div className="space-y-2">
                  <Label>发放名额</Label>
                  <Input type="number" placeholder="10000" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 卡券选择配置 */}
          <Card>
            <CardHeader>
              <CardTitle>选择卡券类型</CardTitle>
              <CardDescription>选择本次活动要投放的卡券类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {couponTypes.map((coupon) => {
                  const Icon = coupon.icon;
                  return (
                    <Card
                      key={coupon.id}
                      className={`p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                        selectedCoupon === coupon.id ? 'border-purple-500 bg-purple-50' : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedCoupon(coupon.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-${coupon.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 text-${coupon.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-sm">{coupon.name}</h3>
                            {selectedCoupon === coupon.id && (
                              <Badge variant="default" className="text-xs">已选择</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{coupon.description}</p>
                          <div className="space-y-1">
                            {coupon.examples.slice(0, 2).map((example, index) => (
                              <Badge key={index} variant="outline" className="text-xs w-full justify-center">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {selectedCoupon && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Ticket className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-sm text-blue-900">
                        已选择：{couponTypes.find(c => c.id === selectedCoupon)?.name}
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        您可以继续配置该卡券的具体面额和发放规则
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 卡券类型配置 */}
          <Card>
            <CardHeader>
              <CardTitle>卡券详情配置</CardTitle>
              <CardDescription>选择卡券类型和面额设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>使用场景 <span className="text-red-500">*</span></Label>
                <RadioGroup defaultValue="voucher">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="voucher" id="voucher" />
                    <Label htmlFor="voucher" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">代金券</p>
                        <p className="text-xs text-gray-500">直接抵扣现金，如满100减20元</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="discount" id="discount" />
                    <Label htmlFor="discount" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">折扣券</p>
                        <p className="text-xs text-gray-500">享受折扣优惠，如8折优惠</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">满免券</p>
                        <p className="text-xs text-gray-500">消费满一定金额免单，如满200免单</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>卡券面额(元) <span className="text-red-500">*</span></Label>
                  <Input type="number" placeholder="20" />
                  <p className="text-xs text-gray-500">折扣券填写折扣率(0.8=8折)</p>
                </div>

                <div className="space-y-2">
                  <Label>满减门槛(元)</Label>
                  <Input type="number" placeholder="100" />
                  <p className="text-xs text-gray-500">使用卡券的最低消费</p>
                </div>

                <div className="space-y-2">
                  <Label>单张卡券上限(元)</Label>
                  <Input type="number" placeholder="50" />
                  <p className="text-xs text-gray-500">单张卡券最高抵扣</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 卡券有效期配置 */}
          <Card>
            <CardHeader>
              <CardTitle>卡券有效期配置</CardTitle>
              <CardDescription>设置卡券领取后的有效期</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="relative">
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="relative" id="relative" />
                  <Label htmlFor="relative" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">相对有效期</p>
                      <p className="text-xs text-gray-500">从领取之日起计算有效期</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">固定有效期</p>
                      <p className="text-xs text-gray-500">设置固定的起止时间</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>有效天数 <span className="text-red-500">*</span></Label>
                  <Input type="number" defaultValue="30" />
                  <p className="text-xs text-gray-500">领取后有效天数</p>
                </div>

                <div className="space-y-2">
                  <Label>每人限领数量</Label>
                  <Input type="number" defaultValue="1" />
                  <p className="text-xs text-gray-500">每个用户最多可领取数量</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 核销规则配置 */}
          <Card>
            <CardHeader>
              <CardTitle>核销规则配置</CardTitle>
              <CardDescription>设置卡券核销规则和限制</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>核销渠道 <span className="text-red-500">*</span></Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择核销渠道" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wechat">微信支付</SelectItem>
                      <SelectItem value="alipay">支付宝</SelectItem>
                      <SelectItem value="yunshanfu">云闪付</SelectItem>
                      <SelectItem value="all">全部渠道</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>适用商户</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择适用商户" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部商户</SelectItem>
                      <SelectItem value="specific">指定商户</SelectItem>
                      <SelectItem value="category">指定类别</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>特殊规则</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">与其他优惠叠加</p>
                      <p className="text-xs text-gray-500">可与商户其他优惠叠加使用</p>
                    </div>
                    <Checkbox />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">不可转赠</p>
                      <p className="text-xs text-gray-500">卡券仅限本人使用</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">过期自动退款</p>
                      <p className="text-xs text-gray-500">过期未使用的卡券自动退款</p>
                    </div>
                    <Checkbox />
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
              <CardTitle className="text-base">配置提示</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">1</span>
                  </div>
                  <p className="text-gray-600">代金券适合满减类活动</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">2</span>
                  </div>
                  <p className="text-gray-600">折扣券适合高客单价商品</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">3</span>
                  </div>
                  <p className="text-gray-600">设置合理的有效期和限领数量</p>
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
