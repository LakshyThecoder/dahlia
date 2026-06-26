import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, Pizza, TrendingUp } from "lucide-react";

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function KitchenStatus() {
  const [stats, setStats] = useState({
    queue: rand(8, 18),
    avgTime: rand(7, 12),
    nextBatch: rand(1, 5),
    ovenTemp: 480,
  });

  useEffect(() => {
    const iv = setInterval(() => {
      setStats((prev) => ({
        queue: Math.max(3, prev.queue + rand(-2, 2)),
        avgTime: Math.max(5, Math.min(15, prev.avgTime + rand(-1, 1))),
        nextBatch: prev.nextBatch <= 1 ? rand(2, 5) : prev.nextBatch - 1,
        ovenTemp: 480,
      }));
    }, 8000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="py-6 px-6 md:px-12 lg:px-16 bg-dahlia-bg" data-testid="kitchen-status">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border border-dahlia-border p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame size={20} className="text-dahlia-red" />
          </motion.div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-dahlia-red font-bold">Live kitchen</div>
            <div className="text-sm text-dahlia-muted mt-0.5">Real-time from the wood-fired oven</div>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-8 flex-wrap">
          <Stat icon={Pizza} value={stats.queue} label="in queue" />
          <Stat icon={Clock} value={`${stats.avgTime}m`} label="avg wait" />
          <Stat icon={TrendingUp} value={`${stats.nextBatch}m`} label="next batch" />
          <Stat icon={Flame} value={`${stats.ovenTemp}°C`} label="oven temp" accent />
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ icon: Icon, value, label, accent }) {
  return (
    <div className="flex items-center gap-2" data-testid={`kitchen-stat-${label.replace(/\s/g, "-")}`}>
      <Icon size={14} className={accent ? "text-dahlia-red" : "text-dahlia-muted"} />
      <div>
        <motion.div
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`font-display text-xl leading-none ${accent ? "text-dahlia-red" : "text-dahlia-text"}`}
        >
          {value}
        </motion.div>
        <div className="text-[9px] uppercase tracking-wider text-dahlia-muted">{label}</div>
      </div>
    </div>
  );
}
