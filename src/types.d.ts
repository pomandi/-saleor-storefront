// Global type declarations for the project

declare module 'react' {
  // React hooks
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
  
  export = React;
}

declare namespace React {
  export type FC<P = {}> = FunctionComponent<P>;
  export interface FunctionComponent<P = {}> {
    (props: P): React.ReactNode;
  }
  
  export type ReactNode = 
    | React.ReactElement
    | string
    | number
    | boolean
    | null
    | undefined;
    
  export interface ReactElement<P = any> {
    type: any;
    props: P;
    key: string | null;
  }
  
  export interface TouchEvent extends React.SyntheticEvent {
    targetTouches: {
      clientX: number;
      clientY: number;
    }[];
    changedTouches: {
      clientX: number;
      clientY: number;
    }[];
  }
  
  export interface SyntheticEvent {
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget;
  }
}

// Add JSX namespace to fix JSX type errors
declare namespace JSX {
  interface IntrinsicElements {
    div: any;
    button: any;
    svg: any;
    path: any;
    h2: any;
    p: any;
  }
} 