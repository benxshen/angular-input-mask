# InputMaskDirective 單元測試指南

此文件包含了 `InputMaskDirective` 的完整 Jest/Jasmine 單元測試套件。

## 測試覆蓋範圍

### 📋 基本功能測試

- ✅ 指令創建和初始化
- ✅ 預設參數設置
- ✅ 自定義遮罩參數配置

### 🎭 遮罩行為測試

- ✅ 失去焦點時應用遮罩
- ✅ 獲得焦點時顯示原始值
- ✅ FormControl 值保持原始狀態

### 🧮 遮罩邏輯測試

- ✅ 自定義遮罩字符計算
- ✅ 短字符串不應用遮罩
- ✅ 空值處理

### 📝 Template-driven Forms 測試

- ✅ ngModel 雙向綁定支援
- ✅ 模型值變更響應

### 🔄 程式化值變更測試

- ✅ FormControl 程式化更新
- ✅ 實際值與顯示值分離

## 如何運行測試

### 使用 Angular CLI（推薦）

```bash
# 運行所有測試
npm test

# 運行測試（無頭模式）
npm run test:headless

# 運行測試並生成覆蓋率報告
ng test --code-coverage
```

### 使用 VS Code

1. 安裝 Angular Language Service 擴展
2. 安裝 Jest Runner 或 Test Explorer UI 擴展
3. 在測試文件中點擊測試旁的 "Run" 按鈕

## 測試案例詳細說明

### 基本遮罩行為

```typescript
// 輸入: "test@example.com"
// 遮罩設定: startChars=2, endChars=2
// 聚焦時顯示: "test@example.com"
// 失焦時顯示: "te***********om"
// FormControl 實際值: "test@example.com"
```

### 自定義遮罩字符

```typescript
// 輸入: "test123"
// 遮罩設定: startChars=1, endChars=1, maskChar='#'
// 結果: "t#####3"
```

### 短字符串處理

```typescript
// 輸入: "ab"
// 遮罩設定: startChars=2, endChars=2
// 結果: "ab" (不應用遮罩，因為長度不足)
```

## 測試架構

### 測試組件

- `ReactiveFormTestComponent`: 測試 Reactive Forms 整合
- `TemplateDrivenTestComponent`: 測試 Template-driven Forms 整合

### 測試工具

- Angular Testing Utilities
- Jasmine/Jest 斷言
- DOM 事件模擬

## 注意事項

1. **異步測試**: Template-driven forms 需要使用 `whenStable()` 等待異步操作
2. **事件觸發**: 需要手動觸發 DOM 事件來測試指令行為
3. **變更檢測**: 使用 `detectChanges()` 確保 Angular 變更檢測執行
4. **記憶體管理**: 測試組件銷毀時的資源清理

## 擴展測試

如需增加更多測試案例，可以考慮：

- 不同瀏覽器的相容性測試
- 鍵盤事件測試
- 輔助功能測試
- 效能測試（大量數據）
- 錯誤邊界測試

## 問題排除

### 常見問題

1. **測試超時**: 增加異步操作的等待時間
2. **事件未觸發**: 確保正確觸發 DOM 事件
3. **值未更新**: 檢查是否調用了 `detectChanges()`

### 調試技巧

- 使用 `fixture.debugElement.nativeElement` 查看 DOM 狀態
- 使用 `console.log` 在測試中輸出中間值
- 使用瀏覽器開發者工具檢查測試環境
