type TrendingItem = {
  courseId: number;
  chapterId: number;
  title: string;
  count: number;
  lastViewedAt: number;
};

const trendingMap = new Map<string, TrendingItem>();

const TREND_WINDOW = 5 * 60 * 1000; // 5 минут

export function addTrendingView(item: any) {
  const key = `${item.courseId}-${item.id}`;
  const now = Date.now();

  const existing = trendingMap.get(key);

  if (existing) {
    existing.count += 1;
    existing.lastViewedAt = now;
  } else {
    trendingMap.set(key, {
      courseId: item.courseId,
      chapterId: item.id,
      title: item.title,
      count: 1,
      lastViewedAt: now,
    });
  }
}

export function getTrending() {
  const now = Date.now();

  for (const [key, value] of trendingMap) {
    if (now - value.lastViewedAt > TREND_WINDOW) {
      trendingMap.delete(key);
    }
  }

  return Array.from(trendingMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}
