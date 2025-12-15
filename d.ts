declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export = classes;
}

declare module '*.jpg';
declare module '*.png';
