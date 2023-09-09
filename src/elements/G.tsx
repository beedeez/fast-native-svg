import type { ReactNode } from 'react';
import * as React from 'react';
import extractProps, { propsAndStyles } from '../lib/extract/extractProps';
import extractTransform from '../lib/extract/extractTransform';
import type {
  CommonPathProps,
  FontProps,
  NumberProp,
} from '../lib/extract/types';
import Shape from './Shape';
import RNSVGGroup from '../fabric/GroupNativeComponent';

export interface GProps extends CommonPathProps, FontProps {
  children?: ReactNode;
  opacity?: NumberProp;
}

export default class G<P> extends Shape<GProps & P> {
  static displayName = 'G';

  setNativeProps = (
    props: GProps &
      P & {
        matrix?: number[];
      }
  ) => {
    const matrix = !props.matrix && extractTransform(props);
    if (matrix) {
      props.matrix = matrix;
    }
    this.root?.setNativeProps(props);
  };

  render() {
    const { props } = this;
    const prop = propsAndStyles(props);
    const extractedProps = extractProps(prop, this);

    return <RNSVGGroup {...extractedProps}>{props.children}</RNSVGGroup>;
  }
}
