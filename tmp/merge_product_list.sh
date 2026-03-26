#!/bin/bash

# 由于原文件太大，我们需要分段处理
# 这里我们使用sed命令来替换产品列表部分

# 首先备份原文件
cp src/app/resources/page.tsx src/app/resources/page.tsx.backup

# 使用Python脚本来处理文件替换
cat > /tmp/update_products.py << 'EOF'
import re

# 读取原文件
with open('src/app/resources/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 定义新的产品列表组件
new_product_list = '''                {/* 产品列表 */}
                {productViewMode === 'grid' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentProducts.map((product) => (
                        <Card key={product.id} className="hover:shadow-lg transition-all">
                          <div className="relative">
                            <div className="w-full h-36 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center text-6xl">
                              {product.image}
                            </div>
                            <Badge className={`absolute top-2 right-2 ${product.color}`}>{product.type}</Badge>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-sm">{product.name}</h3>
                              <Badge variant="outline">{product.status}</Badge>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-lg font-bold text-green-600">{product.price}</p>
                              <p className="text-xs text-gray-500">库存{product.stock}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                编辑
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                下架
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* 分页组件 */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        显示 {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, allProducts.length)} 条，共 {allProducts.length} 条
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          上一页
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className={currentPage === pageNum ? 'bg-blue-600 hover:bg-blue-700' : ''}
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          下一页
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* 列表视图 */
                  <>
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>产品信息</TableHead>
                            <TableHead>类型</TableHead>
                            <TableHead>价格</TableHead>
                            <TableHead>库存</TableHead>
                            <TableHead>状态</TableHead>
                            <TableHead className="text-right">操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                    {product.image}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-sm">{product.name}</p>
                                    <p className="text-xs text-gray-500">{product.id}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{product.type}</Badge>
                              </TableCell>
                              <TableCell>
                                <p className="font-semibold text-green-600">{product.price}</p>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm text-gray-600">{product.stock}</p>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{product.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center gap-2 justify-end">
                                  <Button variant="outline" size="sm">
                                    编辑
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    下架
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* 列表视图分页 */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        显示 {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, allProducts.length)} 条，共 {allProducts.length} 条
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          上一页
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className={currentPage === pageNum ? 'bg-blue-600 hover:bg-blue-700' : ''}
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          下一页
                        </Button>
                      </div>
                    </div>
                  </>
                )}'''

# 找到产品列表部分并替换
pattern = r'\{/\* 产品列表 \*/.*?\)'
match = re.search(pattern, content, re.DOTALL)

if match:
    old_content = match.group()
    new_content = new_product_list
    content = content.replace(old_content, new_content)
    
    # 写入新文件
    with open('src/app/resources/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("产品列表更新成功")
else:
    print("未找到产品列表部分")
EOF

# 运行Python脚本
python3 /tmp/update_products.py
