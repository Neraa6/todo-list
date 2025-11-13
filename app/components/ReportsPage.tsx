'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTodo } from '../context/TodoContext';

export default function ReportsPage(){
  const { boards } = useTodo();
  // aggregate across all boards
  const totalTasks = boards.reduce((acc, b) => acc + b.tasks.length, 0);
  const doneTasks = boards.reduce((acc, b) => acc + b.tasks.filter(t => t.status === 'done').length, 0);
  const todoCount = boards.reduce((acc, b) => acc + b.tasks.filter(t => t.status === 'todo').length, 0);
  const inProgress = boards.reduce((acc, b) => acc + b.tasks.filter(t => t.status === 'inprogress').length, 0);

  const barData = boards.map(b => ({ name: b.title, tasks: b.tasks.length }));
  const pieData = [
    { name: 'To Do', value: todoCount },
    { name: 'In Progress', value: inProgress },
    { name: 'Done', value: doneTasks }
  ];
  const COLORS = ['#FFB4A2', '#FDE68A', '#C8FACC'];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-2xl shadow">
          <h3 className="font-medium mb-2">Tasks per Board</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#93c5fd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow">
          <h3 className="font-medium mb-2">Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} paddingAngle={2}>
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="p-4 bg-white rounded-2xl shadow">
        <p>Total tasks: <strong>{totalTasks}</strong></p>
        <p>Done: <strong>{doneTasks}</strong></p>
      </div>
    </div>
  );
}
