'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, HelpCircle, Eye, Share2, Users, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export default function InviteCampaignPage() {
  const router = useRouter();

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
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">邀请活动配置</h1>
                <p className="text-sm text-gray-500 mt-1">配置邀请好友活动规则和奖励机制</p>
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
                  <Input placeholder="邀请好友活动-新春邀请-202602" />
                </div>
                <div className="space-y-2">
                  <Label>活动编码</Label>
                  <Input placeholder="CAMP-2026-INVITE-001" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label>活动描述</Label>
                <Textarea 
                  placeholder="描述活动详情，如：邀请好友注册，双方各得50元优惠券"
                  rows={2}
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
                  <Input type="number" placeholder="500000" />
                </div>
                <div className="space-y-2">
                  <Label>最大邀请人数</Label>
                  <Input type="number" placeholder="10000" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 邀请规则配置 */}
          <Card>
            <CardHeader>
              <CardTitle>邀请规则配置</CardTitle>
              <CardDescription>设置邀请活动的参与条件和流程</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>邀请人资格 <span className="text-red-500">*</span></Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择邀请人资格" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有用户</SelectItem>
                      <SelectItem value="verified">实名认证用户</SelectItem>
                      <SelectItem value="active">活跃用户</SelectItem>
                      <SelectItem value="specific">指定用户群体</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>被邀请人要求 <span className="text-red-500">*</span></Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择被邀请人要求" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="register">仅需注册</SelectItem>
                      <SelectItem value="verify">注册并实名认证</SelectItem>
                      <SelectItem value="transact">注册并完成首单</SelectItem>
                      <SelectItem value="amount">注册并消费满额</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>每人最大邀请数</Label>
                  <Input type="number" placeholder="20" />
                  <p className="text-xs text-gray-500">限制每个用户的最大邀请人数</p>
                </div>

                <div className="space-y-2">
                  <Label>每人最少邀请数</Label>
                  <Input type="number" placeholder="0" />
                  <p className="text-xs text-gray-500">邀请人的最低邀请要求</p>
                </div>

                <div className="space-y-2">
                  <Label>邀请冷却期(天)</Label>
                  <Input type="number" placeholder="0" />
                  <p className="text-xs text-gray-500">两次邀请的最小间隔</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>验证规则</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">手机号验证</p>
                      <p className="text-xs text-gray-500">被邀请人需验证手机号</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">防作弊机制</p>
                      <p className="text-xs text-gray-500">检测重复邀请和虚假注册</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">绑定银行卡</p>
                      <p className="text-xs text-gray-500">被邀请人需绑定银行卡</p>
                    </div>
                    <Checkbox />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 奖励配置 */}
          <Card>
            <CardHeader>
              <CardTitle>奖励配置</CardTitle>
              <CardDescription>设置邀请人、被邀请人及双方奖励</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="inviter">
                <TabsList>
                  <TabsTrigger value="inviter">
                    <Users className="w-4 h-4 mr-2" />
                    邀请人奖励
                  </TabsTrigger>
                  <TabsTrigger value="invitee">
                    <Share2 className="w-4 h-4 mr-2" />
                    被邀请人奖励
                  </TabsTrigger>
                  <TabsTrigger value="both">
                    <Gift className="w-4 h-4 mr-2" />
                    双方奖励
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="inviter" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>奖励类型 <span className="text-red-500">*</span></Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择奖励类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">现金红包</SelectItem>
                          <SelectItem value="coupon">优惠券</SelectItem>
                          <SelectItem value="points">积分</SelectItem>
                          <SelectItem value="percentage">按比例返现</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>奖励金额(元) <span className="text-red-500">*</span></Label>
                      <Input type="number" placeholder="50" />
                    </div>

                    <div className="space-y-2">
                      <Label>单次邀请上限(元)</Label>
                      <Input type="number" placeholder="100" />
                      <p className="text-xs text-gray-500">单次邀请最高奖励</p>
                    </div>

                    <div className="space-y-2">
                      <Label>累计奖励上限(元)</Label>
                      <Input type="number" placeholder="1000" />
                      <p className="text-xs text-gray-500">邀请人最高累计奖励</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>阶梯奖励</Label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge>第1-3人</Badge>
                        <Input type="number" placeholder="50" className="flex-1" />
                        <span className="text-sm text-gray-500">元/人</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge>第4-10人</Badge>
                        <Input type="number" placeholder="80" className="flex-1" />
                        <span className="text-sm text-gray-500">元/人</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge>第11人+</Badge>
                        <Input type="number" placeholder="100" className="flex-1" />
                        <span className="text-sm text-gray-500">元/人</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="invitee" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>奖励类型 <span className="text-red-500">*</span></Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择奖励类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">现金红包</SelectItem>
                          <SelectItem value="coupon">优惠券</SelectItem>
                          <SelectItem value="points">积分</SelectItem>
                          <SelectItem value="discount">首单折扣</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>奖励金额(元) <span className="text-red-500">*</span></Label>
                      <Input type="number" placeholder="30" />
                    </div>

                    <div className="space-y-2">
                      <Label>发放条件 <span className="text-red-500">*</span></Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择发放条件" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="register">注册成功</SelectItem>
                          <SelectItem value="verify">完成实名认证</SelectItem>
                          <SelectItem value="first">完成首单</SelectItem>
                          <SelectItem value="amount">消费达标</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>有效期(天)</Label>
                      <Input type="number" placeholder="7" />
                      <p className="text-xs text-gray-500">奖励发放后的有效期</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="both" className="mt-4 space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>💡 双方奖励说明：</strong>选择双方奖励后，邀请人和被邀请人将同时获得奖励。奖励金额可以分别设置。
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold text-sm mb-3">邀请人奖励</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>奖励金额(元)</Label>
                          <Input type="number" placeholder="50" />
                        </div>
                        <div className="space-y-2">
                          <Label>奖励类型</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">现金红包</SelectItem>
                              <SelectItem value="coupon">优惠券</SelectItem>
                              <SelectItem value="points">积分</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold text-sm mb-3">被邀请人奖励</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>奖励金额(元)</Label>
                          <Input type="number" placeholder="30" />
                        </div>
                        <div className="space-y-2">
                          <Label>奖励类型</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">现金红包</SelectItem>
                              <SelectItem value="coupon">优惠券</SelectItem>
                              <SelectItem value="discount">首单折扣</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* 分享渠道配置 */}
          <Card>
            <CardHeader>
              <CardTitle>分享渠道配置</CardTitle>
              <CardDescription>设置支持分享的渠道和方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>分享渠道</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: '微信', icon: '💬', desc: '分享到微信好友和朋友圈' },
                    { name: 'QQ', icon: '🐧', desc: '分享到QQ好友和空间' },
                    { name: '微博', icon: '📱', desc: '分享到微博' },
                    { name: '链接', icon: '🔗', desc: '复制邀请链接' },
                  ].map((channel) => (
                    <Card key={channel.name} className="p-4 cursor-pointer hover:border-green-500 transition-all border-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{channel.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm">{channel.name}</h3>
                            <Checkbox defaultChecked={channel.name === '微信' || channel.name === '链接'} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{channel.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>邀请文案</Label>
                <Textarea 
                  placeholder="分享给好友的邀请文案，如：我正在使用安逸熊猫信用卡，邀请你一起领取50元优惠券！"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>分享图片</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-500">点击或拖拽上传分享图片</p>
                  <p className="text-xs text-gray-400 mt-1">建议尺寸: 1080x1080，支持 JPG、PNG</p>
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
                  <p className="text-gray-600">设置合理的奖励金额平衡成本</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">2</span>
                  </div>
                  <p className="text-gray-600">开启防作弊机制保障活动公平</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">3</span>
                  </div>
                  <p className="text-gray-600">阶梯奖励可激励用户持续邀请</p>
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
