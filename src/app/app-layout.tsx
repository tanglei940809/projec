'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  Settings, 
  Users, 
  BarChart3, 
  PhoneCall, 
  Database, 
  GitBranch,
  FileText,
  Bell,
  Search,
  Menu,
  X,
  CreditCard,
  Shield,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const navigation = [
  { name: '数据监控', href: '/', icon: LayoutDashboard, description: '实时监控看板' },
  { name: '活动管理', href: '/campaigns', icon: Target, description: '活动列表与创建' },
  { name: '白名单管理', href: '/whitelist', icon: Shield, description: '白名单配置' },
  { name: '预订系统', href: '/booking', icon: Calendar, description: '定制平台系统搭建' },
  { name: '支付对接', href: '/channels', icon: GitBranch, description: '支付渠道管理' },
  { name: '权益资源', href: '/resources', icon: Database, description: '商户与供应商' },
  { name: '核销管理', href: '/settlement', icon: FileText, description: '交易流水与对账' },
  { name: '数据分析', href: '/analytics', icon: BarChart3, description: '多维度分析' },
  { name: '客诉处理', href: '/complaints', description: '客诉工单处理', icon: PhoneCall },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col shadow-xl`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-900" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg leading-tight">净蓝权益云台</h1>
                <p className="text-xs text-blue-200">配置中心</p>
              </div>
            )}
          </div>
        </div>

        {/* 导航菜单 */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white text-blue-900 shadow-lg' 
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${!sidebarOpen && 'mx-auto'}`} />
                  {sidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      {item.description && (
                        <p className="text-xs opacity-70 truncate">{item.description}</p>
                      )}
                    </div>
                  )}
                  {isActive && sidebarOpen && <Badge className="ml-auto bg-blue-900 text-white">进行中</Badge>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* 底部信息 */}
        <div className="p-4 border-t border-blue-700">
          {sidebarOpen && (
            <div className="text-xs text-blue-200 space-y-1">
              <p>系统状态: <span className="text-green-400">正常运行</span></p>
              <p>版本: v6.0.1</p>
            </div>
          )}
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <h2 className="text-xl font-semibold text-gray-900">
                {navigation.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))?.name || '管理后台'}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索活动、商户、客户..."
                  className="w-80 pl-10"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500">
                  3
                </Badge>
              </Button>
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">管理员</p>
                  <p className="text-xs text-gray-500">超级管理员权限</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
