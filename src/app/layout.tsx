import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import AppLayout from './app-layout';

export const metadata: Metadata = {
  title: {
    default: '净蓝权益云台配置中心',
    template: '%s | 净蓝权益云台',
  },
  description: 'xx银行"安逸熊猫"信用卡权益配置平台 - 净蓝权益云台',
  keywords: [
    '银行权益',
    '营销活动配置',
    '信用卡',
    '安逸熊猫',
    '满减活动',
    '卡券投放',
    '净蓝权益云台',
  ],
  authors: [{ name: '净蓝权益云台团队' }],
  generator: '净蓝权益云台',
  openGraph: {
    title: '净蓝权益云台 - 配置中心',
    description: '为xx银行专属定制的营销活动配置平台',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
