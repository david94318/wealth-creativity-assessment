import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

function ScoreRadar({ scores, categories }) {
  const data = Object.entries(scores).map(([key, value]) => ({
    category: categories[key].name,
    value: value,
    fullMark: categories[key].maxScore
  }));

  return (
    <div className="w-full h-[400px] mb-8">
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={30} domain={[0, 40]} />
          <Radar
            name="得分"
            dataKey="value"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScoreRadar; 