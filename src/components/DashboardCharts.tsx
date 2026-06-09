import React, { useState } from 'react';
import { EnrollmentStat, StreamStat } from '../types';

interface ChartsProps {
  trends: EnrollmentStat[];
  streams: StreamStat[];
}

export const DashboardCharts: React.FC<ChartsProps> = ({ trends, streams }) => {
  const [hoveredTrendIndex, setHoveredTrendIndex] = useState<number | null>(null);
  const [hoveredStreamIndex, setHoveredStreamIndex] = useState<number | null>(null);

  // Math dimensions for Trend Chart SVG
  const trendWidth = 500;
  const trendHeight = 200;
  const paddingX = 40;
  const paddingY = 35;

  // Compute graph coordinates
  const maxReg = Math.max(...trends.map((t) => t.registrations));
  const minReg = 0;
  const rangeY = maxReg - minReg;

  const getX = (index: number) => paddingX + (index * (trendWidth - paddingX * 2)) / (trends.length - 1);
  const getY = (value: number) => trendHeight - paddingY - ((value - minReg) * (trendHeight - paddingY * 2)) / rangeY;

  // Build curved bezier path
  let pathD = '';
  if (trends.length > 0) {
    pathD = `M ${getX(0)} ${getY(trends[0].registrations)}`;
    for (let i = 0; i < trends.length - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(trends[i].registrations);
      const x2 = getX(i + 1);
      const y2 = getY(trends[i + 1].registrations);
      const controlX1 = x1 + (x2 - x1) / 2;
      const controlY1 = y1;
      const controlX2 = x1 + (x2 - x1) / 2;
      const controlY2 = y2;
      pathD += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`;
    }
  }

  // Build filled area gradient path
  const areaD = trends.length > 0
    ? `${pathD} L ${getX(trends.length - 1)} ${trendHeight - paddingY} L ${getX(0)} ${trendHeight - paddingY} Z`
    : '';

  // Stream Pie/Donut calculations
  const totalStudents = streams.reduce((sum, s) => sum + s.count, 0);
  const radius = 65;
  const strokeWidth = 24;
  const center = 100;

  let accumulatedAngle = -90; // Start at twelve o'clock

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Wave Area Trend Chart */}
      <div className="bg-white p-5 rounded-2xl border border-[#cbd5e1]/40 shadow-xs hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xs font-mono tracking-wider text-brand-slate uppercase font-semibold">Trend Tracker</span>
            <h4 className="text-lg font-display font-bold text-brand-blue">Growth Analytics (Registrations)</h4>
          </div>
          <div className="flex gap-2 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-brand-cyan-light">
              <span className="w-2 H-2 rounded-full bg-brand-cyan-light"></span> Trend Line
            </span>
          </div>
        </div>

        <div className="relative mt-2" style={{ height: `${trendHeight}px` }}>
          <svg viewBox={`0 0 ${trendWidth} ${trendHeight}`} className="w-full h-full overflow-visible">
            {/* Gradients */}
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#172A45" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#172A45" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const yVal = paddingY + ratio * (trendHeight - paddingY * 2);
              const labelVal = Math.round(maxReg - ratio * rangeY);
              return (
                <g key={idx} className="opacity-40">
                  <line
                    x1={paddingX}
                    y1={yVal}
                    x2={trendWidth - paddingX}
                    y2={yVal}
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 10}
                    y={yVal + 4}
                    textAnchor="end"
                    className="text-[9px] font-mono fill-brand-slate font-medium"
                  >
                    {labelVal}
                  </text>
                </g>
              );
            })}

            {/* Area under curve */}
            <path d={areaD} fill="url(#trendGradient)" />

            {/* Bezier Stroke */}
            <path
              d={pathD}
              fill="none"
              stroke="#172A45"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* X-axis ticks & grids */}
            {trends.map((t, idx) => {
              const xVal = getX(idx);
              return (
                <g key={idx}>
                  <line
                    x1={xVal}
                    y1={trendHeight - paddingY}
                    x2={xVal}
                    y2={trendHeight - paddingY + 5}
                    stroke="#cbd5e1"
                    strokeWidth="1.2"
                  />
                  <text
                    x={xVal}
                    y={trendHeight - paddingY + 18}
                    textAnchor="middle"
                    className="text-[10px] font-display font-medium fill-slate-500"
                  >
                    {t.month}
                  </text>

                  {/* Dynamic interactive markers */}
                  <circle
                    cx={xVal}
                    cy={getY(t.registrations)}
                    r={hoveredTrendIndex === idx ? '6.5' : '4'}
                    fill={hoveredTrendIndex === idx ? '#D4AF37' : '#172A45'}
                    stroke="white"
                    strokeWidth="2.2"
                    className="transition-all duration-150 cursor-pointer"
                    onMouseEnter={() => setHoveredTrendIndex(idx)}
                    onMouseLeave={() => setHoveredTrendIndex(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Absolute Tooltip */}
          {hoveredTrendIndex !== null && (
            <div
              className="absolute bg-brand-blue text-white rounded-lg p-2.5 shadow-md border border-brand-gold/30 text-xs font-sans pointer-events-none transition-all duration-150 z-10"
              style={{
                left: `${(getX(hoveredTrendIndex) / trendWidth) * 100}%`,
                top: `${(getY(trends[hoveredTrendIndex].registrations) / trendHeight) * 100 - 30}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="font-mono text-[9px] uppercase tracking-wider text-brand-gold font-bold">
                {trends[hoveredTrendIndex].month} Statistics
              </div>
              <div className="font-semibold text-white mt-0.5">
                Regs: <span className="font-mono text-brand-cream">{trends[hoveredTrendIndex].registrations} Students</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Rev: <span className="font-mono font-medium text-emerald-400">₹{trends[hoveredTrendIndex].revenueInLakhs} Lakhs</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stream Distribution Donut */}
      <div className="bg-white p-5 rounded-2xl border border-[#cbd5e1]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
        <div>
          <span className="text-xs font-mono tracking-wider text-brand-slate uppercase font-semibold">Streams breakdown</span>
          <h4 className="text-lg font-display font-bold text-brand-blue">Enrollment Share</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Radial Donut SVG */}
          <div className="relative flex justify-center py-2">
            <svg width="200" height="200" className="overflow-visible transform rotate-0">
              {streams.map((stream, idx) => {
                const percentage = stream.count / totalStudents;
                const strokeDasharray = `${percentage * 2 * Math.PI * radius} ${2 * Math.PI * radius}`;
                const strokeDashoffset = `${-accumulatedAngle * (Math.PI / 180) * radius}`;

                // Accumulate angle for the next segment
                const currentStartAngle = accumulatedAngle;
                accumulatedAngle += percentage * 360;

                const isHovered = hoveredStreamIndex === idx;

                return (
                  <circle
                    key={idx}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={stream.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredStreamIndex(idx)}
                    onMouseLeave={() => setHoveredStreamIndex(null)}
                    style={{
                      transformOrigin: '100px 100px',
                    }}
                  />
                );
              })}

              {/* Center metrics overlay */}
              <circle cx={center} cy={center} r={radius - strokeWidth / 2 - 4} fill="white" />
              <g className="pointer-events-none">
                <text
                  x={center}
                  y={center - 8}
                  textAnchor="middle"
                  className="text-[12px] font-display font-medium fill-brand-slate uppercase tracking-wider"
                >
                  {hoveredStreamIndex !== null ? streams[hoveredStreamIndex].name.split(' ')[0] : 'Total'}
                </text>
                <text
                  x={center}
                  y={center + 14}
                  textAnchor="middle"
                  className="text-base font-mono font-bold fill-brand-blue"
                >
                  {hoveredStreamIndex !== null
                    ? streams[hoveredStreamIndex].count
                    : totalStudents}
                </text>
                <text
                  x={center}
                  y={center + 26}
                  textAnchor="middle"
                  className="text-[9px] font-sans text-stone-500 fill-slate-400"
                >
                  {hoveredStreamIndex !== null
                    ? `${Math.round((streams[hoveredStreamIndex].count / totalStudents) * 100)}% ratio`
                    : 'Active Enrolled'}
                </text>
              </g>
            </svg>
          </div>

          {/* Custom Side Legends */}
          <div className="flex flex-col gap-2.5">
            {streams.map((stream, idx) => {
              const isHovered = hoveredStreamIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border transition-all duration-300 ${
                    isHovered
                      ? 'bg-[#172a45]/5 border-[#172a45]/30 shadow-2xs scale-102 translate-x-1'
                      : 'bg-stone-50/50 border-transparent'
                  }`}
                  onMouseEnter={() => setHoveredStreamIndex(idx)}
                  onMouseLeave={() => setHoveredStreamIndex(null)}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-display font-semibold text-brand-blue">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stream.color }} />
                      {stream.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700">
                      {stream.count}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1 pl-4.5">
                    <span className="text-[10px] text-brand-slate font-medium">Distribution ratio:</span>
                    <span className="text-[10px] font-mono font-medium text-brand-gold-dark">
                      {Math.round((stream.count / totalStudents) * 100)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
