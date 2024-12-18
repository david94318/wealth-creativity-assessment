import React from 'react';
import { calculateResults } from '../utils/calculator';
import ScoreRadar from './RadarChart';

function ResultDisplay({ answers }) {
  const results = calculateResults(answers);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">测评报告</h2>
      
      {/* 总体评分卡片 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">总体评估</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl font-bold">
            {results.totalScore}
            <span className="text-lg text-gray-500">/{results.maxPossibleScore}</span>
          </div>
          <div className={`text-lg font-semibold ${results.totalLevel.color}`}>
            {results.totalLevel.level}
          </div>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full mb-2">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(results.totalScore / results.maxPossibleScore) * 100}%` }}
          />
        </div>
      </div>

      {/* 雷达图 */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">维度分析</h3>
        <ScoreRadar scores={results.categories} categories={results.categoryDetails} />
        
        {/* 维度得分卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {Object.entries(results.categories).map(([category, score]) => (
            <div key={category} className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{results.categoryDetails[category].name}</h4>
                <span className={`${results.scoreLevels[category].color} font-medium`}>
                  {results.scoreLevels[category].level}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {results.categoryDetails[category].description}
              </p>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">{score}</div>
                <div className="text-gray-500">/ {results.categoryDetails[category].maxScore}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 详细分析 */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6">详细分析</h3>
        {Object.entries(results.analysis).map(([category, detail]) => (
          <div key={category} className="mb-8">
            <h4 className="text-lg font-semibold mb-4">
              {results.categoryDetails[category].name}分析
            </h4>
            {detail.strengths.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-green-600 mb-2">优势</h5>
                <ul className="list-disc list-inside space-y-1">
                  {detail.strengths.map((item, i) => (
                    <li key={i} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {detail.weaknesses.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-red-600 mb-2">待改进</h5>
                <ul className="list-disc list-inside space-y-1">
                  {detail.weaknesses.map((item, i) => (
                    <li key={i} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {detail.opportunities.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-blue-600 mb-2">发展机会</h5>
                <ul className="list-disc list-inside space-y-1">
                  {detail.opportunities.map((item, i) => (
                    <li key={i} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 改进建议 */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6">改进建议</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.suggestions.map((suggestion, index) => (
            <div key={index} className="bg-white rounded-lg border p-6">
              <h4 className="font-semibold text-lg mb-4">{suggestion.title}</h4>
              <ul className="space-y-3">
                {suggestion.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultDisplay; 