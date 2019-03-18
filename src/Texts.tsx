import * as React from 'react';
import { Container, Text } from 'react-pixi-fiber';

interface TextsProps {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
}

export default class Texts extends React.PureComponent<TextsProps, {}> {
  public render(): React.ReactNode {
    const { x, y, width, height, scale } = this.props;
    let texts = [];
    for (let i = 0; i < 100000; i++) {
      const tx = i * 10;
      const ty = i * 10;
      const visible =
        x - width / 2 <= tx &&
        tx <= x + width * 1.5 &&
        (y - height / 2 <= ty && ty <= y + height * 1.5);
      if (!visible) {
        continue;
      }
      const resolution = scale >= 0.8 ? scale : 0.3;
      texts.push(
        <Text
          text={`hello ${i}`}
          x={tx}
          y={ty}
          key={i}
          resolution={resolution}
        />,
      );
    }
    return (
      <Container>
        <Text text="test" />
        {texts}
      </Container>
    );
  }
}
