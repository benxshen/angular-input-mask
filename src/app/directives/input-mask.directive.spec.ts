import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputMaskDirective } from './input-mask.directive';

// 測試用的組件 - Reactive Forms
@Component({
  imports: [ReactiveFormsModule, InputMaskDirective],
  template: `
    <form [formGroup]="testForm">
      <input 
        id="reactive-input"
        type="text" 
        formControlName="testField"
        appInputMask
        [maskStartChars]="startChars"
        [maskEndChars]="endChars"
        [maskChar]="maskChar">
    </form>
  `
})
class ReactiveFormTestComponent {
  testForm: FormGroup;
  startChars = 2;
  endChars = 2;
  maskChar = '*';

  constructor(private fb: FormBuilder) {
    this.testForm = this.fb.group({
      testField: ['', Validators.required]
    });
  }
}

// 測試用的組件 - Template-driven Forms
@Component({
  imports: [FormsModule, InputMaskDirective],
  template: `
    <input 
      id="template-input"
      type="text" 
      [(ngModel)]="modelValue"
      appInputMask
      [maskStartChars]="startChars"
      [maskEndChars]="endChars"
      [maskChar]="maskChar">
  `
})
class TemplateDrivenTestComponent {
  modelValue = '';
  startChars = 2;
  endChars = 2;
  maskChar = '*';
}

describe('InputMaskDirective', () => {
  let reactiveComponent: ReactiveFormTestComponent;
  let templateComponent: TemplateDrivenTestComponent;
  let reactiveFixture: ComponentFixture<ReactiveFormTestComponent>;
  let templateFixture: ComponentFixture<TemplateDrivenTestComponent>;
  let reactiveInputElement: HTMLInputElement;
  let templateInputElement: HTMLInputElement;
  let reactiveInputDebugElement: DebugElement;
  let templateInputDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormTestComponent,
        TemplateDrivenTestComponent
      ]
    }).compileComponents();

    // 設置 Reactive Forms 測試
    reactiveFixture = TestBed.createComponent(ReactiveFormTestComponent);
    reactiveComponent = reactiveFixture.componentInstance;
    reactiveInputDebugElement = reactiveFixture.debugElement.query(By.css('#reactive-input'));
    reactiveInputElement = reactiveInputDebugElement.nativeElement;

    // 設置 Template-driven Forms 測試
    templateFixture = TestBed.createComponent(TemplateDrivenTestComponent);
    templateComponent = templateFixture.componentInstance;
    templateInputDebugElement = templateFixture.debugElement.query(By.css('#template-input'));
    templateInputElement = templateInputDebugElement.nativeElement;

    reactiveFixture.detectChanges();
    templateFixture.detectChanges();
  });

  describe('基本功能測試', () => {
    it('應該創建指令', () => {
      const directive = reactiveInputDebugElement.injector.get(InputMaskDirective);
      expect(directive).toBeTruthy();
    });

    it('應該在初始化時設置預設值', () => {
      const directive = reactiveInputDebugElement.injector.get(InputMaskDirective);
      expect(directive.maskStartChars).toBe(2);
      expect(directive.maskEndChars).toBe(2);
      expect(directive.maskChar).toBe('*');
    });

    it('應該能夠自定義遮罩參數', () => {
      reactiveComponent.startChars = 3;
      reactiveComponent.endChars = 4;
      reactiveComponent.maskChar = '#';
      reactiveFixture.detectChanges();

      const directive = reactiveInputDebugElement.injector.get(InputMaskDirective);
      expect(directive.maskStartChars).toBe(3);
      expect(directive.maskEndChars).toBe(4);
      expect(directive.maskChar).toBe('#');
    });
  });

  describe('遮罩行為測試', () => {
    it('應該在失去焦點時應用遮罩', () => {
      const testValue = 'test@example.com';
      const maskedValue = 'te************om';
      
      // 首先通過 FormControl 設置值
      reactiveComponent.testForm.patchValue({ testField: testValue });
      reactiveFixture.detectChanges();
      
      // 觸發 focus 事件
      reactiveInputElement.dispatchEvent(new Event('focus'));
      reactiveFixture.detectChanges();

      // 驗證聚焦時顯示原始值
      expect(reactiveInputElement.value).toBe(testValue);

      // 觸發 blur
      reactiveInputElement.dispatchEvent(new Event('blur'));
      reactiveFixture.detectChanges();

      // 驗證失焦時應用遮罩 (te************om)
      expect(reactiveInputElement.value).toBe(maskedValue);
    });

    it('應該在聚焦時顯示原始值', () => {
      const testValue = 'user@domain.com';
      const maskedValue = 'us***********om';
      
      // 設置初始值
      reactiveComponent.testForm.patchValue({ testField: testValue });
      reactiveFixture.detectChanges();
      
      // 模擬失焦以應用遮罩
      reactiveInputElement.dispatchEvent(new Event('focus'));
      reactiveInputElement.dispatchEvent(new Event('blur'));
      reactiveFixture.detectChanges();

      // 驗證遮罩已應用
      expect(reactiveInputElement.value).toBe(maskedValue);

      // 聚焦時應該顯示原始值
      reactiveInputElement.dispatchEvent(new Event('focus'));
      reactiveFixture.detectChanges();

      expect(reactiveInputElement.value).toBe(testValue);
    });

    it('應該保持 FormControl 的實際值為原始值', () => {
      const testValue = 'secret@test.com';
      
      // 通過 FormControl 設置值
      reactiveComponent.testForm.patchValue({ testField: testValue });
      reactiveFixture.detectChanges();
      
      // 觸發 focus
      reactiveInputElement.dispatchEvent(new Event('focus'));
      reactiveFixture.detectChanges();
      
      // 模擬用戶輸入變更
      reactiveInputElement.value = testValue;
      reactiveInputElement.dispatchEvent(new Event('input'));
      reactiveFixture.detectChanges();
      
      // 觸發 blur
      reactiveInputElement.dispatchEvent(new Event('blur'));
      reactiveFixture.detectChanges();

      // FormControl 應該包含原始值，不是遮罩值
      expect(reactiveComponent.testForm.get('testField')?.value).toBe(testValue);
    });
  });

  describe('遮罩邏輯測試', () => {
    it('應該正確計算自定義遮罩字符', () => {
      reactiveComponent.startChars = 1;
      reactiveComponent.endChars = 1;
      reactiveComponent.maskChar = '#';
      reactiveFixture.detectChanges();

      const testValue = 'test123';
      
      // 通過 FormControl 設置值
      reactiveComponent.testForm.patchValue({ testField: testValue });
      reactiveFixture.detectChanges();
      
      reactiveInputElement.dispatchEvent(new Event('focus'));
      reactiveFixture.detectChanges();
      reactiveInputElement.dispatchEvent(new Event('blur'));
      reactiveFixture.detectChanges();

      // t#####3
      expect(reactiveInputElement.value).toBe('t#####3');
    });

    it('當字符數不足時不應該應用遮罩', () => {
      const shortValue = 'ab';
      
      // 通過 FormControl 設置值
      reactiveComponent.testForm.patchValue({ testField: shortValue });
      reactiveFixture.detectChanges();
      
      reactiveInputElement.dispatchEvent(new Event('focus'));
      reactiveFixture.detectChanges();
      reactiveInputElement.dispatchEvent(new Event('blur'));
      reactiveFixture.detectChanges();

      // 字符數等於 startChars + endChars 時不應用遮罩
      expect(reactiveInputElement.value).toBe(shortValue);
    });

    it('應該處理空值', () => {
      // 通過 FormControl 設置空值
      reactiveComponent.testForm.patchValue({ testField: '' });
      reactiveFixture.detectChanges();
      
      reactiveInputElement.dispatchEvent(new Event('focus'));
      reactiveFixture.detectChanges();
      reactiveInputElement.dispatchEvent(new Event('blur'));
      reactiveFixture.detectChanges();

      expect(reactiveInputElement.value).toBe('');
    });
  });

  describe('Template-driven Forms 測試', () => {
    it('應該在 ngModel 中正常工作', async () => {
      const testValue = 'model@test.com';
      
      // 設置模型值
      templateComponent.modelValue = testValue;
      templateFixture.detectChanges();
      await templateFixture.whenStable();

      // 模擬失焦
      reactiveInputElement.dispatchEvent(new Event('focus'));
      templateInputElement.dispatchEvent(new Event('blur'));
      templateFixture.detectChanges();

      // 驗證遮罩應用
      expect(templateInputElement.value).toBe('mo**********om');
    });
  });

  describe('程式化值變更測試', () => {
    it('應該響應 FormControl 的程式化值變更', () => {
      const newValue = 'newuser@example.com';
      const maskedValue = 'ne***************om';
      
      // 程式化設置值
      reactiveComponent.testForm.patchValue({ testField: newValue });
      reactiveFixture.detectChanges();

      // 模擬失焦以觸發遮罩
      reactiveInputElement.dispatchEvent(new Event('focus'));
      reactiveInputElement.dispatchEvent(new Event('blur'));
      reactiveFixture.detectChanges();

      // 驗證遮罩應用
      expect(reactiveInputElement.value).toBe(maskedValue);
      
      // 驗證 FormControl 保持原始值
      expect(reactiveComponent.testForm.get('testField')?.value).toBe(newValue);
    });
  });

  describe('記憶體管理測試', () => {
    it('應該在組件銷毀時清理訂閱', () => {
      const directive = reactiveInputDebugElement.injector.get(InputMaskDirective);
      const destroySpy = jest.spyOn(directive['destroy$'], 'next');
      const completeSpy = jest.spyOn(directive['destroy$'], 'complete');

      reactiveFixture.destroy();

      expect(destroySpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
