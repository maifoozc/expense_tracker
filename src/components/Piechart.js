import { PieChart,Pie, Legend, Tooltip, Cell, ResponsiveContainer,} from "recharts";

const Piechart = ({userData}) => {
  const compileExpenses = (data) => {
    const categories = {};
    data.forEach((expense) => {
      const category = expense.category;
      if (categories[category]) {
        categories[category] += expense.amount;
      } else {
        categories[category] = expense.amount;
      }
    });
    return Object.keys(categories).map((category) => ({
      category,
      amount: categories[category],
    }));
  };

  const compiledData = compileExpenses(userData);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius,percent,}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (

      <ResponsiveContainer width="100%" height={250}>
      <PieChart width={300} height={250}>
        <Pie dataKey="amount" data={compiledData} cx="50%" cy="50%" outerRadius={80} labelLine={false} label={renderCustomizedLabel}>
          {compiledData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend layout="horizontal" align="center" verticalAlign="bottom"
          payload={compiledData.map((entry) => ({
            value: entry.category,
            type: "rect",
            color: COLORS[compiledData.findIndex((el) => el.category === entry.category) % COLORS.length],
          }))} />
      </PieChart>
      </ResponsiveContainer>

  );
};

export default Piechart;
