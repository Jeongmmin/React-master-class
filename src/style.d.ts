import 'styled-components';

// 내가 사용할 테마 
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
    };
  }
