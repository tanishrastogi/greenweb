import React from 'react';
import { View } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';

const DoughnutChart = ({ size = 200, strokeWidth = 40, data }) => {
  const total = data.reduce((acc, segment) => acc + segment.percent, 0);

  let startAngle = 0;
  const angles = data.map(segment => {
    const angle = (360 * segment.percent) / total;
    const start = startAngle;
    startAngle += angle;
    return { start, angle };
  });

  return (
    <View>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          fill="transparent"
          strokeWidth={strokeWidth}
          stroke="#fff"
        />
        {angles.map((segment, index) => {
          const start = {
            x: size / 2 + Math.cos((segment.start * Math.PI) / 180) * (size / 2 - strokeWidth / 2),
            y: size / 2 + Math.sin((segment.start * Math.PI) / 180) * (size / 2 - strokeWidth / 2),
          };
          const end = {
            x: size / 2 + Math.cos(((segment.start + segment.angle) * Math.PI) / 180) * (size / 2 - strokeWidth / 2),
            y: size / 2 + Math.sin(((segment.start + segment.angle) * Math.PI) / 180) * (size / 2 - strokeWidth / 2),
          };
          const largeArcFlag = segment.angle > 180 ? 1 : 0;
          const path = `M${start.x},${start.y} A${size / 2 - strokeWidth / 2},${size / 2 - strokeWidth / 2} 0 ${largeArcFlag},1 ${end.x},${end.y}`;
          return (
            <Path key={`segment-${index}`} d={path} fill="none" stroke={data[index].color} strokeWidth={strokeWidth} />
          );
        })}
      </Svg>
    </View>
  );
};

export default DoughnutChart;