#!/bin/bash

echo "🧪 運行 InputMaskDirective 單元測試"
echo "=================================="

# 檢查 Node.js 版本
echo "Node.js 版本:"
node --version

# 檢查 npm 版本
echo "npm 版本:"
npm --version

# 檢查 Angular CLI 版本
echo "Angular CLI 版本:"
npx ng version --skip-git

echo ""
echo "🏃‍♂️ 開始運行測試..."
echo ""

# 運行測試
npm run test:headless

echo ""
echo "✅ 測試完成！"
