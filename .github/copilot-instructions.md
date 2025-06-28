<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Angular Input Mask Directive Project Instructions

This is an Angular 20 project that implements a custom input mask directive. When providing code suggestions or assistance:

## Project Context
- This project uses Angular 20.0.0 with TypeScript 5.8.3
- The main feature is an input mask directive that shows original text during input and masks middle characters when focus is lost
- Uses both Reactive Forms (FormControl) and Template-driven forms (ngModel)
- The directive responds to programmatic value changes from FormControl or model

## Code Style Guidelines
- Use TypeScript strict mode
- Follow Angular style guide conventions
- Use RxJS operators efficiently
- Implement proper cleanup with takeUntil pattern for subscriptions
- Use Angular lifecycle hooks appropriately

## Key Components
- `InputMaskDirective` in `src/app/directives/input-mask.directive.ts` is the core functionality
- Main demo component in `src/app/app.component.ts` shows usage examples
- Support both FormControl and ngModel value updates

## When suggesting improvements:
- Ensure compatibility with Angular 20
- Maintain reactive programming patterns
- Consider accessibility requirements
- Follow Angular best practices for directives
- Preserve the core functionality of showing original text on focus and masked text on blur
