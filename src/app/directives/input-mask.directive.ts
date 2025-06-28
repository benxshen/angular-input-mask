import { 
  Directive, 
  ElementRef, 
  HostListener, 
  Input, 
  OnInit, 
  OnDestroy,
  Renderer2,
  Optional,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appInputMask]',
})
export class InputMaskDirective implements OnInit, OnDestroy {
  @Input() maskStartChars: number = 2; // 保留開頭字符數
  @Input() maskEndChars: number = 2;   // 保留結尾字符數
  @Input() maskChar: string = '*';     // 遮罩字符

  private originalValue: string = '';
  private isInputFocused: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
    @Optional() @Self() private ngControl: NgControl
  ) {}

  ngOnInit(): void {
    // 監聽 FormControl 值變化
    if (this.ngControl?.valueChanges) {
      this.ngControl.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          if (value !== undefined && value !== null && !this.isInputFocused) {
            this.originalValue = String(value);
            this.applyMask();
          }
        });
    }

    // 初始化元素值
    const elementValue = this.el.nativeElement.value;
    if (elementValue) {
      this.originalValue = elementValue;
      this.applyMask();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    this.isInputFocused = true;
    // 聚焦時顯示原始值
    this.showOriginalValue();
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    this.isInputFocused = false;
    // 失焦時更新原始值並應用遮罩
    this.originalValue = this.el.nativeElement.value;
    this.updateFormControl();
    this.applyMask();
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    if (this.isInputFocused) {
      // 輸入時更新原始值
      this.originalValue = this.el.nativeElement.value;
    }
  }

  private showOriginalValue(): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', this.originalValue);
  }

  private applyMask(): void {
    if (!this.originalValue || this.isInputFocused) {
      return;
    }

    const maskedValue = this.maskValue(this.originalValue);
    this.renderer.setProperty(this.el.nativeElement, 'value', maskedValue);
  }

  private maskValue(value: string): string {
    if (!value || value.length <= this.maskStartChars + this.maskEndChars) {
      return value;
    }

    const start = value.substring(0, this.maskStartChars);
    const end = value.substring(value.length - this.maskEndChars);
    const middleLength = value.length - this.maskStartChars - this.maskEndChars;
    const middle = this.maskChar.repeat(middleLength);

    return start + middle + end;
  }

  private updateFormControl(): void {
    if (this.ngControl.control && this.ngControl.control.value !== this.originalValue) {
      // 更新 FormControl 的值為原始值（非遮罩值）
      this.ngControl.control.setValue(this.originalValue, { emitEvent: false });
    }
  }
}
