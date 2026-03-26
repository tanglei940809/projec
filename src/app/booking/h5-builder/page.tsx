'use client';

import { useState } from 'react';
import { 
  Smartphone, 
  Plus, 
  Save, 
  Eye, 
  Code, 
  Layout, 
  Image, 
  Type, 
  List,
  Calendar,
  MapPin,
  Phone,
  Star,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Settings,
  Palette,
  ChevronUp,
  ChevronDown
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

// 组件类型定义
interface PageComponent {
  id: string;
  type: 'header' | 'banner' | 'product' | 'form' | 'footer';
  title: string;
  content: any;
  visible: boolean;
}

// H5页面模板
const h5Templates = [
  {
    id: 'tmpl-scenic-basic',
    name: '景区基础模板',
    type: 'scenic',
    description: '包含景区介绍、门票列表、表单等基础模块',
    preview: '/api/placeholder/200/300',
    components: [
      { type: 'header', title: '景区头部' },
      { type: 'banner', title: '轮播图' },
      { type: 'product', title: '门票列表' },
      { type: 'form', title: '预订表单' },
      { type: 'footer', title: '页面底部' }
    ]
  },
  {
    id: 'tmpl-movie-basic',
    name: '影院基础模板',
    type: 'movie',
    description: '包含影片列表、场次选择、座位选择等模块',
    preview: '/api/placeholder/200/300',
    components: [
      { type: 'header', title: '影院头部' },
      { type: 'banner', title: '影片海报' },
      { type: 'product', title: '场次列表' },
      { type: 'form', title: '选座表单' },
      { type: 'footer', title: '页面底部' }
    ]
  },
  {
    id: 'tmpl-custom',
    name: '自定义模板',
    type: 'custom',
    description: '完全自定义的H5页面模板',
    preview: '/api/placeholder/200/300',
    components: []
  }
];

// 可用组件列表
const availableComponents = [
  {
    type: 'header',
    name: '头部组件',
    icon: Layout,
    description: '页面顶部标题栏'
  },
  {
    type: 'banner',
    name: '轮播图',
    icon: Image,
    description: '图片轮播展示'
  },
  {
    type: 'product',
    name: '产品列表',
    icon: List,
    description: '门票或产品列表'
  },
  {
    type: 'form',
    name: '表单组件',
    icon: Settings,
    description: '预订或信息填写表单'
  },
  {
    type: 'info',
    name: '信息展示',
    icon: Type,
    description: '文本信息展示'
  },
  {
    type: 'footer',
    name: '底部组件',
    icon: Layout,
    description: '页面底部信息'
  }
];

export default function H5BuilderPage() {
  const [activeTab, setActiveTab] = useState('components');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [pageComponents, setPageComponents] = useState<PageComponent[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const addComponent = (componentType: string) => {
    const newComponent: PageComponent = {
      id: `comp-${Date.now()}`,
      type: componentType as any,
      title: `${componentType}组件`,
      content: {},
      visible: true
    };
    setPageComponents([...pageComponents, newComponent]);
  };

  const removeComponent = (componentId: string) => {
    setPageComponents(pageComponents.filter(c => c.id !== componentId));
  };

  const moveComponent = (index: number, direction: 'up' | 'down') => {
    const newComponents = [...pageComponents];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newComponents.length) {
      [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]];
      setPageComponents(newComponents);
    }
  };

  const loadTemplate = (templateId: string) => {
    const template = h5Templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setPageComponents(
        template.components.map((comp, index) => ({
          id: `comp-${Date.now()}-${index}`,
          type: comp.type as any,
          title: comp.title,
          content: {},
          visible: true
        }))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">H5页面搭建</h1>
          <p className="text-sm text-gray-500 mt-1">可视化构建预订系统H5页面</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Code className="w-4 h-4 mr-2" />
            查看代码
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? '编辑模式' : '预览模式'}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                发布页面
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>发布H5页面</DialogTitle>
                <DialogDescription>
                  确认发布此H5页面到生产环境
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>页面名称</Label>
                  <Input placeholder="输入页面名称" />
                </div>
                <div className="space-y-2">
                  <Label>页面路径</Label>
                  <Input placeholder="/booking/scenic/h5" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">立即发布</p>
                    <p className="text-xs text-gray-500">发布后立即生效</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">取消</Button>
                <Button>确认发布</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="template">选择模板</TabsTrigger>
          <TabsTrigger value="components">组件编辑</TabsTrigger>
          <TabsTrigger value="style">样式设置</TabsTrigger>
        </TabsList>

        {/* 模板选择 */}
        <TabsContent value="template" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {h5Templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all border-2 ${
                  selectedTemplate === template.id ? 'border-blue-500 shadow-lg' : 'hover:border-blue-300'
                }`}
                onClick={() => loadTemplate(template.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <Badge variant={template.type === 'custom' ? 'outline' : 'default'}>
                      {template.type === 'scenic' ? '景区' : template.type === 'movie' ? '影院' : '自定义'}
                    </Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-16 h-16 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">包含组件:</p>
                      <div className="flex flex-wrap gap-2">
                        {template.components.map((comp) => (
                          <Badge key={comp.type} variant="outline" className="text-xs">
                            {comp.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 组件编辑 */}
        <TabsContent value="components" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：组件库 */}
            <Card>
              <CardHeader>
                <CardTitle>组件库</CardTitle>
                <CardDescription>拖拽组件到页面中</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {availableComponents.map((component) => {
                    const Icon = component.icon;
                    return (
                      <Button
                        key={component.type}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => addComponent(component.type)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        <div className="text-left">
                          <p className="font-medium text-sm">{component.name}</p>
                          <p className="text-xs text-gray-500">{component.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 中间：页面编辑 */}
            <Card>
              <CardHeader>
                <CardTitle>页面结构</CardTitle>
                <CardDescription>管理页面组件顺序</CardDescription>
              </CardHeader>
              <CardContent>
                {pageComponents.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>暂无组件</p>
                    <p className="text-sm">从左侧组件库添加组件</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pageComponents.map((component, index) => (
                      <div
                        key={component.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedComponent === component.id ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedComponent(component.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveComponent(index, 'up');
                              }}
                              disabled={index === 0}
                            >
                              <ChevronUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveComponent(index, 'down');
                              }}
                              disabled={index === pageComponents.length - 1}
                            >
                              <ChevronDown className="w-3 h-3" />
                            </Button>
                          </div>
                          <span className="flex-1 font-medium text-sm">{component.title}</span>
                          <Badge variant="outline" className="text-xs">{component.type}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeComponent(component.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 右侧：组件属性 */}
            <Card>
              <CardHeader>
                <CardTitle>组件属性</CardTitle>
                <CardDescription>编辑选中组件的属性</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedComponent ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>组件名称</Label>
                      <Input 
                        defaultValue={pageComponents.find(c => c.id === selectedComponent)?.title}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>显示内容</Label>
                      <Textarea 
                        placeholder="输入组件内容..."
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>背景颜色</Label>
                      <Select defaultValue="white">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="white">白色</SelectItem>
                          <SelectItem value="gray">灰色</SelectItem>
                          <SelectItem value="blue">蓝色</SelectItem>
                          <SelectItem value="green">绿色</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">可见性</p>
                        <p className="text-xs text-gray-500">在页面中显示</p>
                      </div>
                      <input 
                        type="checkbox" 
                        defaultChecked={pageComponents.find(c => c.id === selectedComponent)?.visible}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">组件间距</p>
                        <p className="text-xs text-gray-500">设置上下边距</p>
                      </div>
                      <Select defaultValue="normal">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">无</SelectItem>
                          <SelectItem value="small">小</SelectItem>
                          <SelectItem value="normal">正常</SelectItem>
                          <SelectItem value="large">大</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>未选择组件</p>
                    <p className="text-sm">点击组件进行编辑</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 样式设置 */}
        <TabsContent value="style" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>全局样式</CardTitle>
                <CardDescription>设置H5页面的全局样式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>页面标题</Label>
                  <Input placeholder="输入页面标题" />
                </div>
                <div className="space-y-2">
                  <Label>页面描述</Label>
                  <Textarea placeholder="输入页面描述" rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>主题色</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-blue-500" />
                        <span className="text-sm">蓝色</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-green-500" />
                        <span className="text-sm">绿色</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-red-500" />
                        <span className="text-sm">红色</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-purple-500" />
                        <span className="text-sm">紫色</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-orange-500" />
                        <span className="text-sm">橙色</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-blue-900" />
                        <span className="text-sm">深蓝</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>字体大小</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">小</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="large">大</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">圆角样式</p>
                    <p className="text-xs text-gray-500">卡片和按钮圆角</p>
                  </div>
                  <Select defaultValue="normal">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">无</SelectItem>
                      <SelectItem value="small">小</SelectItem>
                      <SelectItem value="normal">正常</SelectItem>
                      <SelectItem value="large">大</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>高级设置</CardTitle>
                <CardDescription>更多页面配置选项</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>页面功能</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">加载动画</p>
                        <p className="text-xs text-gray-500">页面加载时显示动画</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">分享功能</p>
                        <p className="text-xs text-gray-500">允许用户分享页面</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">浏览记录</p>
                        <p className="text-xs text-gray-500">记录用户浏览数据</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>自定义CSS</Label>
                  <Textarea 
                    placeholder="输入自定义CSS代码..."
                    rows={6}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="flex items-center justify-end pt-4">
                  <Button>
                    <Palette className="w-4 h-4 mr-2" />
                    应用样式
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 实时预览 */}
      {previewMode && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>实时预览</CardTitle>
                <CardDescription>H5页面实时预览效果</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setPreviewMode(false)}>
                关闭预览
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="w-80 bg-blue-950 rounded-3xl p-3 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* 模拟手机屏幕 */}
                  <div className="h-[600px] overflow-y-auto">
                    {pageComponents.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-sm">暂无组件</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 p-4">
                        {pageComponents.map((component) => (
                          <div
                            key={component.id}
                            className={`p-4 rounded-lg border-2 border-dashed ${
                              selectedComponent === component.id ? 'border-blue-500' : 'border-gray-200'
                            }`}
                          >
                            <p className="text-sm font-medium">{component.title}</p>
                            <p className="text-xs text-gray-500 mt-1">组件内容区域</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
