import { useEffect, useState } from "react";

/**
 * Calculate the number of working hours
 * Based on 8-hour workdays (Mon-Fri), 32 days off per year
 */
const calculateWorkingHours = (): number => {
	// Start date: December 20, 2020
	const startDate = new Date(2020, 11, 20);
	const currentDate = new Date();

	// Calculate total days between dates
	const totalDays = Math.floor(
		(currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
	);

	// Calculate number of weeks
	const totalWeeks = Math.floor(totalDays / 7);

	// Calculate weekdays (5 per week) plus remaining weekdays
	const weekdaysFromCompleteWeeks = totalWeeks * 5;

	// Calculate remaining days
	const remainingDays = totalDays % 7;
	let startDayOfWeek = startDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
	if (startDayOfWeek === 0) startDayOfWeek = 7; // Adjust Sunday to be 7

	// Count remaining weekdays
	let extraWeekdays = 0;
	for (let i = 0; i < remainingDays; i++) {
		const currentDayOfWeek = (startDayOfWeek + i) % 7;
		// Count Monday (1) through Friday (5)
		if (currentDayOfWeek >= 1 && currentDayOfWeek <= 5) {
			extraWeekdays++;
		}
	}

	// Total weekdays
	const totalWeekdays = weekdaysFromCompleteWeeks + extraWeekdays;

	// Subtract vacation days (32 days per year)
	const yearsWorked = Math.floor(totalDays / 365);
	const remainingDaysInYear = totalDays % 365;

	// Prorated vacation days
	const vacationDays =
		yearsWorked * 32 + Math.floor((remainingDaysInYear / 365) * 32);

	// Final working days
	const workingDays = totalWeekdays - vacationDays;

	// Hours worked (8 hours per day)
	const hoursWorked = workingDays * 8;

	// Add current day hours if it's a weekday and during working hours
	if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
		const currentHour = currentDate.getHours();
		if (currentHour >= 9 && currentHour < 17) {
			// 9 AM to 5 PM
			const extraHours = currentHour - 9;
			return hoursWorked + extraHours;
		}
	}

	return hoursWorked;
};

/**
 * Custom hook to calculate and update working hours
 * Updates hourly
 */
export function useWorkingHours() {
	const [workHours, setWorkHours] = useState<number>(calculateWorkingHours());

	// Update work hours every hour
	useEffect(() => {
		const updateHours = () => {
			setWorkHours(calculateWorkingHours());
		};

		// Update hourly
		const interval = setInterval(updateHours, 1000 * 60 * 60);

		return () => clearInterval(interval);
	}, []);

	// Round down to nearest thousand
	return Math.floor(workHours / 1000) * 1000;
}
