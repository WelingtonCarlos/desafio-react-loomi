export const kpiData = {
  arpu: {
    name: "ARPU",
    color: "#06b6d4",
    data: [120000, 135000, 160000, 190000, 150000, 110000, 130000, 160000, 210000, 250000, 300000, 340000],
  },
  conversion: {
    name: "Conversão",
    color: "#f59e0b",
    data: [50, 55, 53, 58, 56, 54, 60, 59, 63, 62, 67, 70],
  },
  churn: {
    name: "Churn",
    color: "#ef4444",
    data: [5, 4.8, 5.2, 4.5, 4.7, 4.4, 4.2, 4.3, 4.0, 4.1, 3.9, 3.8],
  },
  retention: {
    name: "Retenção",
    color: "#22c55e",
    data: [70, 72, 69, 75, 73, 71, 78, 76, 82, 80, 85, 88],
  },
} as const;

