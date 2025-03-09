export function predictGrowth(stars: number, createdAt: string): number {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const daysActive = Math.max(1, Math.round((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)));
    const avgDailyStars = stars / daysActive;
    const predictedStarsNextWeek = stars + avgDailyStars * 7;
    return Math.round(predictedStarsNextWeek);
  }