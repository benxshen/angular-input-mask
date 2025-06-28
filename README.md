# Angular 20 Input Mask Directive

![Angular](https://img.shields.io/badge/Angular-20.0.0-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Jest](https://img.shields.io/badge/Jest-Testing-green.svg)
![Standalone](https://img.shields.io/badge/Architecture-Standalone-orange.svg)

一個現代化的 Angular 20 輸入遮罩指令，採用 standalone 架構，支援在輸入時顯示原文，失去焦點後自動遮罩敏感資訊。

## ✨ 功能特點

- 🎯 **智能遮罩**：輸入時顯示原文，失焦時自動遮罩
- ⚙️ **高度可配置**：自定義開頭、結尾保留字符數和遮罩字符
- 📋 **表單整合**：完美支援 Reactive Forms 和 Template-driven Forms
- 🔄 **響應式**：自動響應 FormControl 和 ngModel 的程式化值變更
- 🧪 **完整測試**：100% Jest 單元測試覆蓋
- 🚀 **現代架構**：Angular 20 standalone components，無需 NgModule
- 💾 **值保持**：表單提交獲得原始值，非遮罩值

## 🎬 效果展示

| 狀態   | 輸入值             | 顯示效果           |
| ------ | ------------------ | ------------------ |
| 聚焦時 | `user@example.com` | `user@example.com` |
| 失焦時 | `user@example.com` | `us***********om`  |
| 表單值 | `user@example.com` | `user@example.com` |

## 🚀 快速開始

### 1. 克隆專案

```bash
git clone https://github.com/your-username/angular-input-mask.git
cd angular-input-mask
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 啟動開發服務器

```bash
npm start
```

### 4. 開啟瀏覽器

訪問 `http://localhost:4200` 查看示例

## 📖 使用方法

### 基本用法 (Reactive Forms)

```typescript
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { InputMaskDirective } from "./directives/input-mask.directive";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [ReactiveFormsModule, InputMaskDirective],
  template: `
    <form [formGroup]="form">
      <input
        type="text"
        formControlName="email"
        appInputMask
        placeholder="請輸入 Email"
      />
    </form>
  `,
})
export class ExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [""],
    });
  }
}
```

### Template-driven Forms

```typescript
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputMaskDirective } from "./directives/input-mask.directive";

@Component({
  selector: "app-template-example",
  standalone: true,
  imports: [FormsModule, InputMaskDirective],
  template: `
    <input
      type="text"
      [(ngModel)]="email"
      appInputMask
      [maskStartChars]="3"
      [maskEndChars]="3"
      placeholder="請輸入 Email"
    />
  `,
})
export class TemplateExampleComponent {
  email = "";
}
```

```html
<input
  type="text"
  formControlName="email"
  appInputMask
  placeholder="請輸入Email"
/>
```

### 自定義遮罩參數

```html
<input
  type="text"
  formControlName="creditCard"
  appInputMask
  [maskStartChars]="4"
  [maskEndChars]="4"
  [maskChar]="'#'"
  placeholder="請輸入信用卡號"
/>
<!-- 顯示效果：1234########5678 -->
```

````

## ⚙️ API 參考

| 參數             | 類型   | 預設值 | 說明           |
| ---------------- | ------ | ------ | -------------- |
| `maskStartChars` | number | 2      | 保留開頭字符數 |
| `maskEndChars`   | number | 2      | 保留結尾字符數 |
| `maskChar`       | string | '*'    | 用於遮罩的字符 |

## 🎯 使用案例

### Email 遮罩
```html
<input appInputMask [maskStartChars]="2" [maskEndChars]="2">
<!-- user@example.com → us***********om -->
````

### 信用卡號遮罩

```html
<input appInputMask [maskStartChars]="4" [maskEndChars]="4" maskChar="#" />
<!-- 1234567890123456 → 1234########3456 -->
```

### 電話號碼遮罩

```html
<input appInputMask [maskStartChars]="3" [maskEndChars]="3" />
<!-- 0912345678 → 091****678 -->
```

## 🏗️ 技術架構

### 核心技術

- **Angular**: 20.0.0 (最新版本)
- **TypeScript**: 5.8.3 (嚴格模式)
- **Zone.js**: 0.15.1
- **RxJS**: 7.8.2

### 測試技術

- **Jest**: 單元測試框架
- **jest-preset-angular**: Angular 專用 Jest 預設
- **100% 測試覆蓋**: 包含所有邊界條件

### 架構特點

- ✅ **Standalone Components**: 不需要 NgModule
- ✅ **依賴注入**: 完美支援 Angular DI 系統
- ✅ **響應式編程**: 使用 RxJS 處理異步操作
- ✅ **記憶體管理**: 自動清理訂閱，防止記憶體洩漏

## 🧪 測試

### 執行測試

```bash
# 單元測試
npm test

# 測試覆蓋率
npm run test:coverage

# 建構專案
npm run build
```

### 測試覆蓋範圍

- ✅ 基本功能測試（指令創建、參數設置）
- ✅ 遮罩行為測試（聚焦/失焦切換）
- ✅ 遮罩邏輯測試（字符計算、邊界條件）
- ✅ 表單整合測試（Reactive Forms 和 Template-driven Forms）
- ✅ 程式化值變更測試
- ✅ 記憶體管理測試

## 📁 專案結構

```
src/
├── app/
│   ├── directives/
│   │   ├── input-mask.directive.ts       # 🎯 核心遮罩指令
│   │   └── input-mask.directive.spec.ts  # 🧪 單元測試
│   ├── app.component.ts                  # 📱 主組件 (Standalone)
│   ├── app.component.html                # 🎨 示例模板
│   └── app.component.css                 # 💅 樣式
├── main.ts                               # 🚀 應用啟動點
├── polyfills.ts                          # 🔧 填充檔案
└── styles.css                            # 🎨 全域樣式
```

## 🛠️ 開發指南

### 在你的專案中使用

1. 複製 `input-mask.directive.ts` 到你的專案
2. 在需要的組件中導入：

   ```typescript
   import { InputMaskDirective } from './path/to/input-mask.directive';

   @Component({
     imports: [InputMaskDirective] // 添加到 standalone 組件
   })
   ```

### 自定義開發

指令核心邏輯位於 `src/app/directives/input-mask.directive.ts`，你可以：

- 修改預設遮罩字符
- 調整遮罩算法
- 添加新的配置選項
- 擴展支援的表單類型

## 🔄 版本歷史

### v1.0.0 (2025-06-28)

- ✅ 初始版本發布
- ✅ Angular 20.0.0 支援
- ✅ Standalone 架構
- ✅ Jest 測試框架
- ✅ 完整的 TypeScript 支援

## 🤝 貢獻指南

歡迎貢獻！請遵循以下步驟：

1. Fork 這個專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案

## 🙏 致謝

- Angular 團隊提供優秀的框架
- Jest 社群提供強大的測試工具
- TypeScript 團隊提供型別安全支援

---

<div align="center">

**如果這個專案對你有幫助，請給它一個 ⭐️！**

[🐛 回報問題](https://github.com/your-username/angular-input-mask/issues) • [💡 功能建議](https://github.com/your-username/angular-input-mask/issues) • [📖 文檔](https://github.com/your-username/angular-input-mask#readme)

</div>
